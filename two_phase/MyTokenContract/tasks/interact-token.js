const { task } = require("hardhat/config")

task("interact-token", "interact my token")
    .addParam("addr", "constanct address") 
    .setAction(async(taskArgs, hre) => {
        const myTokenFactory = await ethers.getContractFactory("MyToken")
        const myToken = myTokenFactory.attach(taskArgs.addr) 

        // 监听事件
        myToken.on("Transfer(address,uint256)", (sender, amount, event) => {
            console.log("📥 Transfer Event Detected:");
            console.log("Sender:", sender);
            console.log("Amount (wei):", amount.toString());
            console.log("Tx Hash:", event.transactionHash);
        });

        // create two account
        const [firstAccount, secondAccount] = await ethers.getSigners()
        // mint 1000
        const mintTx = await myToken.mint(1000)
        await mintTx.wait()
        console.log("mint MTK")
        // get balance with account1
        const firstAccountBalances = await myToken.balances(firstAccount.address)
        console.log(`first account with address ${firstAccount.address} and balances ${firstAccountBalances}`)
        // transfer to account2 100
        const transferTx = await myToken.transfer(secondAccount.address, 500)
        await transferTx.wait()
        // get second account balances
        const secondAccountBalances = await myToken.balances(secondAccount.address)
        console.log(`second account with address ${secondAccount.address} and balances ${secondAccountBalances}`)
        
    });


    module.exports = {}