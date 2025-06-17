const { User } = require('../models'); // <-- CORRIGIDO AQUI
const jwt = require('jsonwebtoken');

function generateToken(params = {}) {
  return jwt.sign(params, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

module.exports = {
  async register(req, res) {
    const { email, name, password } = req.body;
    try {
      if (await User.findOne({ where: { email } })) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const user = await User.create({ email, name, password });

      user.password = undefined;

      return res.status(201).json({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(400).json({ error: 'User registration failed', details: err.message });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      
      user.password = undefined;

      return res.json({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(400).json({ error: 'Login failed', details: err.message });
    }
  },

  async getProfile(req, res) {
    const userId = req.userId;
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.password = undefined;
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to retrieve profile', details: err.message });
    }
  },

  async update(req, res) {
    const userId = req.userId;
    const { name, email } = req.body;
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (email && email !== user.email) {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
          return res.status(400).json({ error: 'Email already in use by another account.' });
        }
      }

      await user.update({ name, email });

      user.password = undefined;

      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update profile', details: err.message });
    }
  },

  async destroy(req, res) {
    const userId = req.userId;
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.destroy();

      return res.status(200).json({ message: 'User account deleted successfully.' });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to delete account', details: err.message });
    }
  }
};