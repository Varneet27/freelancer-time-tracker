const Client = require("../models/Client.model");

/**
 * CREATE client (owned by logged-in user)
 */
exports.createClient = async (req, res) => {
  try {
    const client = await Client.create({
      ...req.body,
      user: req.user._id
    });

    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET all clients for logged-in user
 */
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find({ user: req.user._id }).sort({
      createdAt: -1
    });

    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * UPDATE client (ownership enforced)
 */
exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * DELETE client (ownership enforced)
 */
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
