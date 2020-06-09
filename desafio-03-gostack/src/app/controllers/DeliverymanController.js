import { format, startOfDay, endOfDay, setHours, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Op } from 'sequelize';
import Courier from '../models/Courier';
import Order from '../models/Order';
import Recipient from '../models/Recipient';

import Mail from '../../lib/Mail';

class DeliverymanController {
  async index(req, res) {
    const { id } = req.body;

    const exists = await Courier.findOne({
      where: { id },
    });

    if (!exists) {
      return res.status(401).json({ error: 'Deliveryman does not exist' });
    }

    const orders = await Order.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: null,
      },
    });

    return res.json(orders);
  }

  async store(req, res) {
    const order = await Order.findByPk(req.params.id);
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const searchDate = Number(date);

    if (order.canceled_at !== null || order.start_date !== null) {
      return res.status(401).json({ error: 'Order unavailable' });
    }

    const withdrawals = await Order.count({
      where: {
        deliveryman_id: order.deliveryman_id,
        canceled_at: null,
        start_date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    if (withdrawals === 5) {
      return res
        .status(401)
        .json({ error: 'time unavailable for withdrawals' });
    }

    if (
      isBefore(new Date(), setHours(startOfDay(searchDate), 8)) ||
      isBefore(new Date(), setHours(startOfDay(searchDate), 18))
    ) {
      order.start_date = new Date();

      await order.save();

      return res.json(order);
    }
    return res.status(401).json({ error: 'Schedule not allowed' });
  }

  async update(req, res) {
    const { signature_id } = req.body;

    const isDeliveryman = await Courier.findOne({
      where: { id: req.userId },
    });

    if (!isDeliveryman) {
      return res
        .status(401)
        .json({ error: 'this deliveryman does not exists' });
    }

    const order = await Order.findByPk(req.params.id);

    // if (order.deliveryman_id !== req.userId) {
    //   return res
    //     .status(401)
    //     .json({ error: "You don't have permission to start this order." });
    // }

    order.signature_id = signature_id;

    order.end_date = new Date();

    await order.save();

    return res.json(order);
  }

  async delete(req, res) {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'city'],
        },
        {
          model: Courier,
          as: 'deliveryman',
          attributes: ['name'],
        },
      ],
    });

    // if (order.deliveryman_id !== req.userId) {
    //   return res
    //     .status(401)
    //     .json({ error: "You don't have permission to cancel this order." });
    // }

    if (confirm('Tem certeza que deseja excluir esta encomenda')) {
      order.canceled_at = new Date();

      await order.save();

      await Mail.sendMail({
        to: `${order.recipient.name} <${order.recipient.city}>`,
        subject: 'Encomenda cancelada',
        template: 'cancellation',
        context: {
          recipient: order.recipient.name,
          deliveryman: order.deliveryman.name,
          canceled: format(
            order.canceled_at,
            "'dia' dd 'de' MMMM', às' H:mm'h",
            {
              locale: pt,
            }
          ),
        },
      });

      return res.json(order);
    }
  }
}

export default new DeliverymanController();
