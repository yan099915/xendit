require("dotenv").config();
var btoa = require("btoa");
const axios = require("axios").default;
const Xendit = require("xendit-node");

const { key } = process.env;

const x = new Xendit({
  secretKey: key,
});

const VirtualAcc = x.VirtualAcc;
const va = new VirtualAcc({});
const { RecurringPayment } = x;
const rpSpecificOptions = {};
const rp = new RecurringPayment(rpSpecificOptions);

module.exports = {
  vabank: async (data) => {
    try {
      const banks = await va.getVABanks();
      console.log("available va banks:", banks);
      return banks;
    } catch (error) {
      console.log(error);
    }
  },

  // createva: async (data) => {
  //   try {
  //     const banks = await va.getVABanks();
  //     console.log("available va banks:", banks); // eslint-disable-line no-console

  //     const fixedAcc = await va.createFixedVA({
  //       externalID: "123", // dont hard code
  //       bankCode: banks[0].code,
  //       name: "Stanley Nguyen", // dont hard code this
  //     });
  //     // eslint-disable-next-line no-console
  //     console.log("fixed va created:", fixedAcc);

  //     const { id } = fixedAcc;
  //     const retrievedAcc = await va.getFixedVA({ id });
  //     // eslint-disable-next-line no-console
  //     console.log("fixed va details:", retrievedAcc);

  //     const updatedAcc = await va.updateFixedVA({
  //       id,
  //       suggestedAmt: 200000, //dont hard code this
  //     });
  //     // eslint-disable-next-line no-console
  //     console.log("updated va details:", updatedAcc);

  //     process.exit(0);
  //   } catch (e) {
  //     console.error(e); // eslint-disable-line no-console
  //     process.exit(1);
  //   }
  // },

  subscription: async (data) => {
    try {
      // console.log(data);
      let subsid = "";

      const createsubs = await rp
        .createPayment({
          should_send_email: true,
          externalID: data.id,
          payerEmail: data.email,
          description: data.description,
          amount: data.amount,
          interval: RecurringPayment.Interval.Month,
          intervalCount: 1,
          shouldSendEmail: true,
        })
        .then(({ id }) => {
          console.log(`Recurring payment created with ID: ${id}`);
          subsid = id;
          console.log("subsid =" + subsid);
        })
        .catch((e) => {
          console.error(
            `Recurring payment creation failed with message: ${e.message}`
          );
        });
      const subs = await rp.getPayment({ id: subsid });
      console.log(subs);

      return subs;
    } catch (error) {
      console.log(error);
    }
  },

  checksubs: async (id) => {
    // checking recurring
    try {
      const resp = await rp.getPayment({ id: id });
      console.log(resp);
      return resp;
    } catch (error) {
      console.log(error);
    }
  },

  stopsubs: async (id) => {
    // stop recurring
    try {
      const resp = await rp.stopPayment({ id: id });
      console.log(resp);
      return resp;
    } catch (error) {
      console.log(error);
    }
  },

  changesubs: async (data) => {
    // change recurring
    const resp = await rp.editPayment({
      id: data.id,
      amount: data.amount,
      interval: RecurringPayment.Interval.Month,
      intervalCount: 1,
      shouldSendEmail: true,
      missedPaymentAction: RecurringPayment.Action.Stop,
    });
    console.log(resp);
    return resp;
  },
};
