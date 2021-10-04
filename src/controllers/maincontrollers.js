require("dotenv").config();

const application = require("../services/mainservices");

module.exports = {
  banksva: async (req, res) => {
    // xendit testing get available va banks
    try {
      const getpayment = await application.vabank();
      res.status(200).send(getpayment);
    } catch (error) {
      console.log(error);
    }
  },

  createva: async (req, res) => {
    const { external_id, name, bank_code } = req.body;
    //   create va account
    const data = {
      id: external_id,
      name: name,
      bank_code: bank_code,
    };

    try {
      const createva = await application.createva(data);
      res.status(200).send(createva);
    } catch (error) {
      console.log(error);
    }
  },

  subscription: async (req, res) => {
    const { external_id, name, email, amount, description, currency } =
      req.body;
    //   create va account
    const data = {
      id: external_id,
      name: name,
      email: email,
      amount: amount,
      description: description,
      currency: currency,
    };

    try {
      const subscription = await application.subscription(data);
      res.status(200).send(subscription);
    } catch (error) {
      console.log(error);
    }
  },

  checksubs: async (req, res) => {
    // checking reccuring
    const { id } = req.query;
    console.log(id);
    console.log(req);

    try {
      const check = await application.checksubs(id);
      res.status(200).send(check);
    } catch (error) {
      console.log(error);
    }
  },

  stopsubs: async (req, res) => {
    // checking reccuring
    const { id } = req.body;

    try {
      const stop = await application.stopsubs(id);
      res.status(200).send(stop);
    } catch (error) {
      console.log(error);
    }
  },

  changesubs: async (req, res) => {
    // checking reccuring
    const { id, amount } = req.body;
    const data = {
      id: id,
      amount: amount,
    };

    try {
      const change = await application.changesubs(data);
      res.status(200).send(change);
    } catch (error) {
      console.log(error);
    }
  },
};
