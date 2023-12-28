import ScoreCalculator from './utils.ts'
import {useState, useEffect} from 'react'

function ScoreDisplay({deck, winningTile, config, seatWind, roundWind}) {
    const [result, setResult] = useState('')
    const [yakuList, setYakuList] = useState([])

    useEffect(() => {
        const newResult = ScoreCalculator(deck, winningTile, config, seatWind, roundWind);
        setResult(newResult);
        const newYakuList = Object.entries(newResult.yaku).map(([key, value]) => ({key,value}))
        setYakuList(newYakuList);
    }, [deck, winningTile, config, seatWind, roundWind])

    console.log(result);
    console.log(yakuList);

    return (
        <>
            <h2>Han Display</h2>
            <h3>Total Han: {result.han}</h3>
            <h3>Yaku List:</h3>
            {yakuList.map((yaku) => (
                <p key={yaku.key}>{yaku.key.charAt(0).toUpperCase() + yaku.key.slice(1)}: {yaku.value}</p>
            ))}
        </>
    )
}

export default ScoreDisplay;