var cluster = require("cluster");
const express = require("express");
const fs = require("fs");
const rateLimit = require("express-rate-limit");
const config = require("./config/config");
const { json } = require("express/lib/response");

const limiter = rateLimit({ 
  windowMs: config.WINDOW_MS, 
  max: config.MAX_API_LIMITER, 
});

if (cluster.isMaster) {
  require("./src/request_handler/request_handler").startRequestHandler();

  for (let i = 0; i < 8; i++) {
    cluster.fork();
  }

  cluster.on("online", function (worker) {
    console.log("Worker " + worker.process.pid + " is online.");
  });

  cluster.on("exit", function (worker, code, signal) {
    console.log("worker " + worker.process.pid + " died.");
    cluster.fork();
  });
} else {
  const app = express();
  app.use(limiter);
  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS");

    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
app.get('/', (req, res)=>{
   res.send("Hello")
})
app.get('/amm_transaction/swap', (req, res)=>{
  const data = fs.readFileSync(config.Swap_DATA);
  res.json(JSON.parse(data));
})
app.get('/amm_transaction/add_liquidity', (req, res)=>{
  const data = fs.readFileSync(config.AddLiquidity_DATA);
  res.json(JSON.parse(data));
})
app.get('/amm_transaction/remove_liquidity', (req, res)=>{
  const data = fs.readFileSync(config.RemoveLiquidity_DATA);
  res.json(JSON.parse(data));
})

app.get('/main_transaction/mint', (req, res)=>{
  const data = fs.readFileSync(config.Mint_DATA);
  res.json(JSON.parse(data));
})

app.get('/main_transaction/burn', (req, res)=>{
  const data = fs.readFileSync(config.Burn_DATA);
  res.json(JSON.parse(data));
})

app.get('/main_transaction/deposit', (req, res)=>{
  const data = fs.readFileSync(config.Deposit_DATA);
  res.json(JSON.parse(data));
})

app.get('/main_transaction/withdraw', (req, res)=>{
  const data = fs.readFileSync(config.Withdraw_DATA);
  res.json(JSON.parse(data));
})

app.get('/ovens', (req, res)=>{
  const data = fs.readFileSync(config.Oven_DATA);
  res.json(JSON.parse(data));
})

app.get('/main_data/drift', (req, res)=>{
  const data = fs.readFileSync(config.Drift_DATA);
  res.json(JSON.parse(data));
})

app.get('/main_data/target', (req, res)=>{
  const data = fs.readFileSync(config.Target_DATA_One);
  res.json(JSON.parse(data));
})
  // app.get("/tokens_statistical_data", async function (req, res) {
  //   const data = fs.readFileSync(config.TOKEN_PAGE_STATISTICAL_DATA);
  //   res.json(JSON.parse(data));
  // });
  // app.get("/tokens_price_scatter", async function (req, res) {
  //   const data = fs.readFileSync(config.TOKEN_PAGE_PRICE_GRAPH_DATA);
  //   res.json(JSON.parse(data));
  // });
  // app.get("/liquidity", async function (req, res) {
  //   const data = fs.readFileSync(config.LIQUIDITY_PAGE_DATA);
  //   res.json(JSON.parse(data));
  // });
  // app.get("/data", async function (req, res) {
  //   const data = fs.readFileSync(config.TOKEN_PAGE_STATISTICAL_DATA);
  //   res.json(JSON.parse(data));
  // });
  // app.get("/datachange", async function (req, res) {
  //   const data = fs.readFileSync(config.TOKEN_PAGE_PRICE_GRAPH_DATA);
  //   res.json(JSON.parse(data));
  // });
  // app.get("/dataliquidity", async function (req, res) {
  //   const data = fs.readFileSync(config.LIQUIDITY_PAGE_DATA);
  //   res.json(JSON.parse(data));
  // });
  app.listen(config.PORT);
}