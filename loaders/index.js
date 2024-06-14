const express = require("./express");
const mongoose = require("./mongoose");

module.exports.init = async ({app}) => {
  await mongoose();
  express({app: app});
};
