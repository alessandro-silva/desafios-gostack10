import Problem from '../models/Problem';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Notification from '../schemas/Notification';

class ProblemController {
  async index(req, res) {
    const problems = await Problem.findAll();

    return res.json(problems);
  }

  async store(req, res) {
    const { description } = req.body;

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(401).json({ error: 'Order not exists' });
    }

    const problem = await Problem.create({
      delivery_id: req.params.id,
      description,
    });

    return res.json(problem);
  }

  async delete(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (order.canceled_at !== null) {
      return res.status(401).json({ error: 'Order is canceled' });
    }

    const recipient = await Recipient.findByPk(order.recipient_id);

    order.canceled_at = new Date();

    await order.save();

    await Notification.create({
      content: `A encomenda de ${recipient.name} foi cancelada devido a causa de problema com a entrega`,
      user: order.deliveryman_id,
    });

    return res.json(order);
  }
}

export default new ProblemController();
