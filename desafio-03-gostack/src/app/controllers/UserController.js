import User from '../models/User';

class UserController {
  async store(req, res) {
    const UserExists = await User.findOne({ where: { email: req.body.email } });

    if (UserExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const { id, name, email, admin } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      admin,
    });
  }
}

export default new UserController();
