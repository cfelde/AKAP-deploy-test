async function getProvider() {
    let web3Provider;

    // Modern dapp browsers...
    if (window.ethereum) {
        web3Provider = window.ethereum;

        try {
            // Request account access
            await window.ethereum.enable();
        } catch (error) {
            // User denied account access...
            console.error("User denied account access")
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, return null..
    else {
        web3Provider = null;
    }

    return web3Provider;
}

async function run() {
    let akap = await window.fetch("IAKAP.json").then((r) => r.json());
    let contract = TruffleContract(akap);

    contract.setProvider(await getProvider())

    try {
        let instance = await contract.deployed();

        // Make a simple test call..
        await instance.exists("0x0")

        document.write("Found contract on " + instance.address)
    } catch (ex) {
        document.write("Could not find contract on current network");
    }
}
