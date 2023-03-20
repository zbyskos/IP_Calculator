import React from 'react'
import { ResultsType } from '../App'
type props = {
    result: ResultsType | undefined
}
const Results = ({ result }: props) => {
    return (
        <div className='results'>
            <p>Network: {result?.network.toString().replaceAll(",", ".")}</p>
            <p>Broadcast: {result?.broadcast.toString().replaceAll(",", ".")}</p>
            <p>Min host: {result?.minHost.toString().replaceAll(",", ".")}</p>
            <p>Max host: {result?.maxHost.toString().replaceAll(",", ".")}</p>
            <p>Hosts in Network: {result?.hostsInNetwork}</p>
        </div>
    )
}

export default Results