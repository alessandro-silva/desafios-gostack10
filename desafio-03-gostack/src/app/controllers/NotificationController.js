import Notification from '../schemas/Notification';
import Courier from '../models/Courier';

class NotificationController {
  async index(req, res) {
    const deliveryman = await Courier.findByPk(req.userId);

    if (!deliveryman) {
      return res.status(401).json({ error: 'You are not is deliveryman' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
