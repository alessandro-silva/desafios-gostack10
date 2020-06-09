import Problem from '../models/Problem';

class ProblemFilterController {
  async index(req, res) {
    const problem = await Problem.findOne({
      where: {
        delivery_id: req.params.id,
      },
    });

    if (!problem) {
      return res.status(400).json({ error: 'Order not found' });
    }

    return res.json(problem);
  }
}

export default new ProblemFilterController();
