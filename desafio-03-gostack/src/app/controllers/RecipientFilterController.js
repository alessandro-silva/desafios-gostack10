import User from '../models/User';
import Recipient from '../models/Recipient';

const { Op } = require('sequelize');

class RecipientController {
  async index(req, res) {
    const isAdmin = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!isAdmin) {
      return res.status(401).json({ error: 'You are not is administrador' });
    }

    const { name } = req.query;

    const recipient = await Recipient.findAll({
      where: {
        name: {
          [Op.iLike]: name ? `%${name}%` : '%%',
        },
      },
    });

    return res.json(recipient);
  }
}

export default new RecipientController();
