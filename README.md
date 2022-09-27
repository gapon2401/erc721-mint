# Mint with WalletConnect + Web3Modal

This demo package shows, how to embed a button on your website that can mint a token (ERC-721) in Ethereum blockchain.

Before you start, make sure to deploy a smartcontract. Use [instruction](https://medium.com/@igaponov/create-deploy-and-mint-smart-contract-erc-721-with-nodejs-hardhat-walletconnect-web3modal-57e21b2d2abc), if you have problems with that.

We will use [ethers](https://www.npmjs.com/package/ethers), 
[walletconnect](https://www.npmjs.com/package/@walletconnect/web3-provider), 
[web3modal](https://www.npmjs.com/package/web3modal)

[**Live Demo**](https://gapon2401.github.io/erc721-mint/)

## How to use it?

1. Clone the repository
2. Install all dependencies `yarn install`
3. Specify environmental variables in `.env`:
- `NEXT_PUBLIC_SMARTCONTRACT_ADDRESS` - Smartcontract address in blockchain. You will get it after the deployment
- `NEXT_PUBLIC_SMARTCONTRACT_NETWORK` - network, which you are going to use. In this demo I suggest, that you are using `goerli` or `mainnet`. 
We need this to switch the network.
- `NEXT_PUBLIC_SMARTCONTRACT_INFURA_URL` - network endpoint. You can use [https://infura.io](https://infura.io) to get the url
4. Replace `abi` in file `src/components/smartcontract.ts`
5. Make changes, if you need in `mint` function inside file `src/components/MintForm.tsx`
6. Run `yarn dev` to start the development server on [http://localhost:3000](http://localhost:3000)

If you feel, that some steps are not clear for you, follow the [instruction](https://medium.com/@igaponov/create-deploy-and-mint-smart-contract-erc-721-with-nodejs-hardhat-walletconnect-web3modal-57e21b2d2abc), it may help.