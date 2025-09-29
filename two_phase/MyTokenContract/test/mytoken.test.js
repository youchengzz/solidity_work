const { ethers, deployments, getNamedAccounts } = require("hardhat")
const { assert } = require("chai")

describe("mytoken", function() {
    let firstAccount
    let myToken
    beforeEach(async function() {
        await deployments.fixture(["all"])
        firstAccount = (await getNamedAccounts()).firstAccount
        const myTokenDeployments = await deployments.get("MyToken")
        myToken = await ethers.getContractAt("MyToken", myTokenDeployments.address)
    }) 
    it("test msg.sender equal owner", async function() {
        await myToken.waitForDeployment()

        assert.equal((await myToken.owner()), firstAccount)
    })

})