# First DApp: Interacting with ERC-20 Token
# you need two projects 
# 1. DApp project that is a Hardhat project
# 2. frontend project that is a web application for front end

# instructions for DApp project
First cd MyDapp
run Hardhat Server with ERC20 contract by running following command in WindowsPowerShell
>>npx hardhat node

You will see output like this 
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========

WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.

Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

# instructions for web project
now, cd frontend
run web server  using following command
>> python -m http.server

# Google Chrome web browser to access user interface
Access web server from browser http://localhost:8000/

# Metamask to add accounts
Now goto Metamask
Add accounts to metamask to transfer money  from account and to account. it means add two accounts.
Add above two account "Account #0" and "Account #1" into metamask.

# Metamask to web page account address
Now take address of first account (sender account) from Metamask and paste it in textbox for "Check Balance" on web page
Then copy address of second account (recipient account) from Metamask and paste it in textbox
for recipient address, and put amount in amount text box
now click on "Transfer Tokens" button.
you will message "Transfer Successful!"

