import React, { useState } from 'react'
import { ResultsType } from '../App'
import calcUtils from '../utils/calculationUtils'
type params = {
    setResult: React.Dispatch<React.SetStateAction<ResultsType | undefined>>
}

const InputForm = ({ setResult }: params) => {
    const [inputError, setInputError] = useState(false);

    const subnetMaskOptions = [
        "255.255.255.254 /31",
        "255.255.255.252 /30",
        "255.255.255.248 /29",
        "255.255.255.240 /28",
        "255.255.255.224 /27",
        "255.255.255.192 /26",
        "255.255.255.128 /25",
        "255.255.255.0 /24",
        "255.255.254.0 /23",
        "255.255.252.0 /22",
        "255.255.248.0 /21",
        "255.255.240.0 /20",
        "255.255.224.0 /19",
        "255.255.192.0 /18",
        "255.255.128.0 /17",
        "255.255.0.0 /16",
        "255.254.0.0 /15",
        "255.252.0.0 /14",
        "255.248.0.0 /13",
        "255.240.0.0 /12",
        "255.224.0.0 /11",
        "255.192.0.0 /10",
        "255.128.0.0 /9",
        "255.0.0.0 /8",
        "254.0.0.0 /7",
        "252.0.0.0 /6",
        "248.0.0.0 /5",
        "240.0.0.0 /4",
        "224.0.0.0 /3",
        "192.0.0.0 /2",
        "128.0.0.0 /1"

    ]

    const calculateResults = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const reg = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
        const formData = new FormData(event.target as HTMLFormElement);
        const { ipAddress, subnetMask } = Object.fromEntries(formData.entries()) as { ipAddress: string, subnetMask: string };
        if (reg.test(ipAddress)) {
            setInputError(false);
            const ipAddressArray = new Uint8Array(ipAddress.split(".").map((val) => Number.parseInt(val)));
            const subnetMaskArray = new Uint8Array(subnetMask.split(".").map((val) => Number.parseInt(val)));

            const networkAddress = calcUtils.calculateNetworkAddress(ipAddressArray, subnetMaskArray);
            const broadcastAddress = calcUtils.calculateBroadcastAddress(networkAddress, subnetMaskArray);
            const minHost = calcUtils.getMinHost(networkAddress);
            const maxHost = calcUtils.getMaxHost(broadcastAddress);
            const hostsInNetwork = calcUtils.getHostsNumber(ipAddressArray, subnetMaskArray);

            setResult({
                network: networkAddress,
                broadcast: broadcastAddress,
                minHost: minHost,
                maxHost: maxHost,
                hostsInNetwork: hostsInNetwork
            })
        } else {
            setInputError(true);
        }
    }
    return (
        <div className='inputForm'>
            <form onSubmit={(e) => calculateResults(e)}>
                <label htmlFor='ipAddress'>IP Address: </label>
                <input name="ipAddress" id="ipAddress" required className={inputError ? "wrongInput" : ""} autoFocus />
                {inputError && <p className="errorMsg">Wrong IP addres</p>}
                <label htmlFor='subnetMask'>Subnet Mask:</label>
                <select name="subnetMask" id="subnetMask" defaultValue="255.255.255.0">
                    {subnetMaskOptions.map((val) => {
                        return <option key={val} value={val.split(" ")[0]}>{val}</option>
                    })}
                </select>
                <button className='calcButton' type='submit'>Calculate</button>
            </form>
        </div>
    )
}

export default InputForm