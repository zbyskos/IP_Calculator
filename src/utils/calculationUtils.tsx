const calculateNetworkAddress = (ipAddress: Uint8Array, subnetMask: Uint8Array): Uint8Array => {
    const networkAddress = new Uint8Array(4);

    for (let i = 0; i < 4; i++) {
        networkAddress[i] = ipAddress[i] & subnetMask[i];
    }
    return networkAddress
}

const calculateBroadcastAddress = (networkAddress: Uint8Array, subnetMask: Uint8Array): Uint8Array => {
    const broadcastAddress = new Uint8Array(4);
    const revereSubnetMask = subnetMask.map((val) => (~val));

    for (let i = 0; i < 4; i++) {
        broadcastAddress[i] = networkAddress[i] + revereSubnetMask[i];
    }
    return broadcastAddress;
}

const countOnes = (address: Uint8Array): number => {
    let mask = 1;
    let ones = 0
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 8; i++) {
            if (address[j] & mask) ones++;
            mask = mask << 1;
        }
        mask = 1;
    }
    return ones;
}

const getHostsNumber = (ipAddress: Uint8Array, subnetMask: Uint8Array) => {
    return Math.pow(2, 32 - countOnes(subnetMask)) - 2;
}

const getMinHost = (networkAddress: Uint8Array): Uint8Array => {
    const minHost = new Uint8Array(networkAddress);
    minHost[3]++;
    return minHost;
}

const getMaxHost = (broadcastAddress: Uint8Array): Uint8Array => {
    const maxHost = new Uint8Array(broadcastAddress)
    maxHost[3]--;
    return maxHost;
}


export default { calculateNetworkAddress, calculateBroadcastAddress, getHostsNumber, getMaxHost, getMinHost }