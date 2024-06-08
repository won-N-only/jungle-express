const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.port,
  secretKey: process.env.secretKey,
  mongoURI: process.env.mongoURI,
};
