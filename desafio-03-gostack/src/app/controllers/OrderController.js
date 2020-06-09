import User from '../models/User';
import Recipient from '../models/Recipient';
import Courier from '../models/Courier';
import Order from '../models/Order';
import File from '../models/File';
import Notification from '../schemas/Notification';

class OrderController {
  async index(req, res) {
    const isAdmin = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!isAdmin) {
      return res.status(400).json({ error: 'You are not is administrador' });
    }

    const orders = await Order.findAll({
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        },
        {
          model: Courier,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(orders);
  }

  async store(req, res) {
    const isAdmin = await User.findOne({
      where: { id: req.userId, admin: false },
    });

    if (isAdmin) {
      return res.status(400).json({ error: 'You are not is administrador' });
    }

    const { recipient_id, deliveryman_id, product } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }

    const deliveryman = await Courier.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    const order = await Order.create({
      recipient_id,
      deliveryman_id,
      product,
    });

    await Notification.create({
      content: `Nova encomenda de ${recipient.name} já está disponível para retirada`,
      user: deliveryman_id,
    });

    return res.json(order);
  }

  async update(req, res) {
    const isAdmin = await User.findOne({
      where: { id: req.userId, admin: false },
    });

    if (isAdmin) {
      return res.status(400).json({ error: 'You are not is administrador' });
    }

    const {
      id,
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
    } = req.body;

    const order = await Order.findByPk(id);

    await order.update(req.body);

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
    });
  }

  async delete(req, res) {
    const isAdmin = await User.findOne({
      where: { id: req.userId, admin: false },
    });

    if (isAdmin) {
      return res.status(400).json({ error: 'You are not is administrador' });
    }

    const { id, recipient_id, deliveryman_id } = req.body;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ error: 'This id already exists' });
    }

    if (recipient_id !== order.recipient_id) {
      return res.status(401).json({ error: 'This recipient already exists' });
    }

    const recipient = await Recipient.findByPk(order.recipient_id);

    if (deliveryman_id !== order.deliveryman_id) {
      return res.status(401).json({ error: 'This deliveryman already exists' });
    }

    if (confirm('Tem certeza que deseja cancelar está encomenda')) {
      order.canceled_at = new Date();

      await order.save();

      await Notification.create({
        content: `A encomenda de ${recipient.name} foi cancelada devido a causa de problema com a entrega`,
        user: order.deliveryman_id,
      });

      return res.json(order);
    }
  }
}

export default new OrderController();
