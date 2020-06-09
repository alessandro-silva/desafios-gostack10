import Courier from '../models/Courier';
import Order from '../models/Order';

class DeliveriesController {
  async index(req, res) {
    const exists = await Courier.findOne({
      where: { id: req.params.id },
    });

    if (!exists) {
      return res.status(401).json({ error: 'Deliveryman does not exist' });
    }

    const orders = await Order.findAll({
      where: {
        deliveryman_id: req.params.id,
      },
    });

    return res.json(orders);
  }
}

export default new DeliveriesController();
