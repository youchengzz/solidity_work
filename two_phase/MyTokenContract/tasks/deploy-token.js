const { task } = require("hardhat/config")

task("deploy-token", "deploy my token")
    .setAction(async(taskArgs, hre) => {    
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
    })

module.exports = {}