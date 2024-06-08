const express = require("express");
const loaders = require("./loaders/index");
const config = require("./config/index");

async function start() {
  const app = express();

  /** init으로 여러 함수 한번에 받은 */
  await loaders.init({app: app});

  app.listen(config.port, () => {
    console.log(config.port, " 포트로 서버가 열렸어요!");
  });
}

start();
