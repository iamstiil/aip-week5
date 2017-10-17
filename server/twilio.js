const Twilio = require('twilio');
const constants = require('../src/constants');
const db = require('./db');

const client = new Twilio(constants.twilioAccountSid, constants.twilioAuthToken);

function sendMessage(userid, message) {
  db.getUserById(userid).then((user) => {
    if (user.phone && user.phone !== '') {
      return client.messages.create({
        body: message,
        to: user.phone, // Text this number
        from: constants.twilioPhone, // From a valid Twilio number
      });
    } else {
      return new Promise((resolve, reject) => {
        reject({ error: 'No phone number for user' });
      });
    }
  });
}

module.exports = sendMessage;
