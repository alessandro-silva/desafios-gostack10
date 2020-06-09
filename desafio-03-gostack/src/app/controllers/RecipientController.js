import User from '../models/User';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const IsAdmin = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!IsAdmin) {
      return res.status(401).json({ error: 'You are not administrador' });
    }

    const recipients = await Recipient.findAll();

    return res.json(recipients);
  }

  async store(req, res) {
    const IsAdmin = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!IsAdmin) {
      return res.status(401).json({ error: 'You are not administrador' });
    }

    // const recipientExists = await Recipient.findOne({
    //   where: { name: req.body.name },
    // });

    // if (recipientExists) {
    //   return res.status(400).json({ error: 'Recipient already exists' });
    // }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });
  }
}

export default new RecipientController();
