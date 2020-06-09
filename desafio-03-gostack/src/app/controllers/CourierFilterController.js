import User from '../models/User';
import Courier from '../models/Courier';
import File from '../models/File';

const { Op } = require('sequelize');

class CourierFilterController {
  async index(req, res) {
    const IsAdmin = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!IsAdmin) {
      return res.status(401).json({ error: 'You are not is administrador' });
    }

    const { name } = req.query;

    const deliveryman = await Courier.findAll({
      where: {
        name: {
          [Op.iLike]: name ? `%${name}%` : '%%',
        },
      },
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveryman);
  }
}

export default new CourierFilterController();
