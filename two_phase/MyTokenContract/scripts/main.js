const { ethers } = require("hardhat")

async function main() {
    const myTokenFactory = await ethers.getContractFactory("MyToken")
    console.log("create contract factory")
    const myToken = await myTokenFactory.deploy()

    await myToken.waitForDeployment()
    console.log(`deploy mytoken contract successfully, address is ${myToken.target}`)
    console.log("waiting for verify") 
    await myToken.deploymentTransaction().wait(6)
    
    await hre.run("verify:verify", {
        address: myToken.target
    });

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

    
}

main().then().catch((error) => {
    console.error(error)
    process.exit(1)
})