
module.exports = async ({getNamedAccounts, deployments}) => {
    const {firstAccount} = await getNamedAccounts()
    const {deploy} = deployments
    await deploy("MyToken", {
        from: firstAccount,
        args: [],
        log: true
    })
}

module.exports.tags = ["all", "mytoken"]