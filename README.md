# Wrapped Smart Contract 🍬

This is the official repository for Wrapped Smart Contract using Truffle Framework. <br />
Wrapped contract allow wrap any ERC20 and extend its functionalities.

<br />
To extend its functionalities, I have developed a smart contract that allows deposit(wrap) an ERC20, and mint same amount in the extended ERC777 token. See [Wrapped ETH](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code) to understand how wrapped tokens work.

## Table of Contents

- [🛠️ Pre-requisites](#%EF%B8%8F-pre-requisites)
  - [Node.js](#1-nodejs)
  - [Truffle CLI](#2-truffle)
- [👨‍💻 Getting Started](#👨‍💻-getting-started)
  - [Install Dependencies](#-install-dependencies)
- [⚗️ Testing](#⚗️-testing)
- [⌨️ Playground](#⌨️-playground)


### 🛠️ Pre-requisites

#### 1. Node.js

To install the latest version of Node.js, click [here](https://nodejs.org/en/) and follow the steps.

#### 2. Truffle

To install truffle, run the following command:

```bash
npm i -g truffle
```

### 👨‍💻 Getting Started

#### Install Dependencies

```sh
npm i
```

### ⚗️ Testing

All the testing scripts are under the `test` folder. To run the test run the following commands:

```bash
$ truffle test
```

### ⌨️ Playground

#### Ethereum - Goerli testnet

I have already deployed a sample contract to [Goerli testnet](https://goerli.etherscan.io/) network. You can play with it. In this test version of the contract, anybody can `mint` and `wrap` the token.

| Contract                                                     | Token address |
| ------------------------------------------------------------ | ------------- |
| [`ERC20Token`](contracts/ERC20Token.sol)          | [0x1b0B584367f7e3a41fCa48a23e6F54Fe9fEC2E79](https://goerli.etherscan.io/address/0x1b0B584367f7e3a41fCa48a23e6F54Fe9fEC2E79)
| [`ERC777Token`](contracts/ERC777Token.sol)          | [0x183D7515fAD3DA55D33BD2e376f6fD813D00780C](https://goerli.etherscan.io/address/0x183D7515fAD3DA55D33BD2e376f6fD813D00780C)

