const request = require("graphql-request").request;
const fs = require("fs");
const config = require("../../config/config");
const querySwapData = require("../queries/Amm_queries/Swap");
const queryAddLiquidityData = require("../queries/Amm_queries/Add_liquidity");
const queryRemoveLiquidityData = require("../queries/Amm_queries/Remove_liquidity");
const queryBurnData = require("../queries/Main_queries/Burn");
const queryMintData = require("../queries/Main_queries/Mint");
const queryDepositData = require("../queries/Main_queries/Deposit");
const queryWithdrawData = require("../queries/Main_queries/Withdraw");

module.exports = function startTokenDataHandler() {
// ------------------------------------- AMM Transactions ---------------------------------------------------------------

  // Swap Queries

  request(`${config.GRAPHQL_API}/v1/graphql`, querySwapData).then(
    async (data) => {
      // console.log(data);
      fs.writeFileSync(config.Swap_DATA, JSON.stringify(data.trade));
    }
  ).catch((err) => {
    console.log(err);
  });

  // Add Liquidity Queries

  request(`${config.GRAPHQL_API}/v1/graphql`, queryAddLiquidityData).then(
    async (data) => {
      // console.log(data);
      fs.writeFileSync(config.AddLiquidity_DATA, JSON.stringify(data.position));
    }
  ).catch((err) => {
    console.log(err);
  });

  // Remove Liquidity Queries

  request(`${config.GRAPHQL_API}/v1/graphql`, queryRemoveLiquidityData).then(
    async (data) => {
      // console.log(data);
      fs.writeFileSync(config.RemoveLiquidity_DATA, JSON.stringify(data.position));
    }
  ).catch((err) => {
    console.log(err);
  });

    // ------------------------------------- Main Transactions ---------------------------------------------------------------

    // Mint Queries

    request(`${config.GRAPHQL_API}/v1/graphql`, queryMintData).then(
      async (data) => {
        // console.log(data);
        fs.writeFileSync(config.Mint_DATA, JSON.stringify(data.mintBurnData));
      }
    ).catch((err) => {
      console.log(err);
    });

    // Burn Queries

    request(`${config.GRAPHQL_API}/v1/graphql`, queryBurnData).then(
      async (data) => {
        // console.log(data);
        fs.writeFileSync(config.Burn_DATA, JSON.stringify(data.mintBurnData));
      }
    ).catch((err) => {
      console.log(err);
    });

    // Deposit Queries

    request(`${config.GRAPHQL_API}/v1/graphql`, queryDepositData).then(
      async (data) => {
        // console.log(data);
        fs.writeFileSync(config.Deposit_DATA, JSON.stringify(data.depositWithdrawData));
      }
    ).catch((err) => {
      console.log(err);
    });

    // Withdraw Queries
    
    request(`${config.GRAPHQL_API}/v1/graphql`, queryWithdrawData).then(
      async (data) => {
        // console.log(data);
        fs.writeFileSync(config.Withdraw_DATA, JSON.stringify(data.depositWithdrawData));
      }
    ).catch((err) => {
      console.log(err);
    });
     

}