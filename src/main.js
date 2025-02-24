import Web3 from "web3";
import { contractABI } from "./abi.js";

const contractAddress = "0x362B25F5994A7345Dd03188F2bd6F478Ca78Ea3a";

let web3; // Will hold the web3 object instance
let contractInstance; // Will hold the contract instance
const connectButton = document.getElementById("connectButton");
connectButton.addEventListener("click", async () => { 
  // Check if MetaMask or other web3 wallet is installed
  if (typeof window.ethereum !== "undefined") {
    // Set up the wallet
    try {
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Set up web3 object (connect to current MetaMask network)
      web3 = new Web3(window.ethereum);

      // print the current account
      const accounts = await web3.eth.getAccounts();
      console.log("Connected account", accounts[0]);

      // Set up the contract instance
      contractInstance = new web3.eth.Contract(contractABI, contractAddress);
    } catch (error) {
      console.error(error);
      alert("Could not connect to the wallet!, please check console for error or try again.");
    }
  } else {
    alert("Please install MetaMask or other web3 wallet!");
  }
}); 

const readMessageButton = document.getElementById("readMessageButton");
const currentMessageSpan = document.getElementById("currentMessage");

readMessageButton.addEventListener("click", async () => {
  if (!contractInstance) {
    alert("Please click on [Connect Wallet] first.");
    return;
  }
  try {
    const message = await contractInstance.methods.message().call();
    console.log("Message from the contract is: ", message);
    currentMessageSpan.textContent = message;
  } catch (error) {
    console.error(error);
    alert("Error reading the message!");
  }
});

// Write contract message
const setMessageButton = document.getElementById("setMessageButton");
const newMessageInput = document.getElementById("newMessageInput");

setMessageButton.addEventListener("click", async () => {
  if (!contractInstance) {
    alert("Please click on [Connect Wallet] first.");
    return;
  }
  const newMessage = newMessageInput.value;
  if (!newMessage) {
    alert("Please enter a new message then try again.");
    return;
  }
  try {
    // To send the transaction, you need to select the account as from
    const accounts = await web3.eth.getAccounts();
    const usedAccount = accounts[0];
    const receipt = await contractInstance.methods
      .setMessage(newMessage)
      .send({ from: usedAccount });

    console.log("Transaction receipt: ", receipt);
    alert("Message updated successfully, please click on [Read contract message] again to see the new message.");
  } catch (error) {
    console.error(error);
    alert("Error writing to contract message, please check console for error.");
  }
});

// Read contract number
const readNumberButton = document.getElementById("readNumberButton");
const currentNumberSpan = document.getElementById("currentNumber");

readNumberButton.addEventListener("click", async () => {
  if (!contractInstance) {
    alert("Please click on [Connect Wallet] first.");
    return;
  }
  try {
    const number = await contractInstance.methods.getNumber().call();
    console.log("Number from the contract is: ", number);
    currentNumberSpan.textContent = number;
  } catch (error) {
    console.error(error);
    alert("Error reading the number!");
  }
});

// Write contract number
const setNumberButton = document.getElementById("setNumberButton");
const newNumberInput = document.getElementById("newNumberInput");

setNumberButton.addEventListener("click", async () => {
  if (!contractInstance) {
    alert("Please click on [Connect Wallet] first.");
    return;
  }
  const newNumber = newNumberInput.value;
  if (!newNumber) {
    alert("Please enter a new number then try again.");
    return;
  }
  try {
    // To send the transaction, you need to select the account as from
    const accounts = await web3.eth.getAccounts();
    const usedAccount = accounts[0];
    const receipt = await contractInstance.methods
      .setNumber(newNumber)
      .send({ from: usedAccount });

    console.log("Transaction receipt: ", receipt);
    alert("Number updated successfully, please click on [Read contract number] again to see the new number.");
  } catch (error) {
    console.error(error);
    alert("Error writing to contract number, please check console for error.");
  }
});