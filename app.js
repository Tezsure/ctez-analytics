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

app.get('/main_data/drift_all', (req, res)=>{
  const data = fs.readFileSync(config.Drift_DATA_All);
  res.json(JSON.parse(data));
})

app.get('/main_data/target', (req, res)=>{
  const data = fs.readFileSync(config.Target_DATA_One);
  res.json(JSON.parse(data));
})

app.get('/main_data/target_all', (req, res)=>{
  const data = fs.readFileSync(config.Target_DATA_One_All);
  res.json(JSON.parse(data));
})

app.get('/tvl', (req, res)=>{
  const data = fs.readFileSync(config.Tvl_DATA);
  res.json(JSON.parse(data));
})

app.get('/tvl_all', (req, res)=>{
  const data = fs.readFileSync(config.Tvl_DATA_All);
  res.json(JSON.parse(data));
})

app.get('/volume_stats', (req, res)=>{
  const data = fs.readFileSync(config.Volume_DATA);
  res.json(JSON.parse(data));
})

app.get('/volume_stats_month', (req, res)=>{
  const data = fs.readFileSync(config.Volume_DATA_Months);
  res.json(JSON.parse(data));
})

app.get('/ovens_graph', (req, res)=>{
  const data = fs.readFileSync(config.Oven_Graph_DATA);
  res.json(JSON.parse(data));
})

app.get('/summary', (req, res)=>{
  const data = fs.readFileSync(config.Summary_DATA);
  res.json(JSON.parse(data));
})

app.get('/price_stats', (req, res)=>{
  const data = fs.readFileSync(config.Price_DATA);
  res.json(JSON.parse(data));
})

app.get('/price_stats_all', (req, res)=>{
  const data = fs.readFileSync(config.Price_DATA_ALL);
  res.json(JSON.parse(data));
})


  app.listen(config.PORT);
  
}