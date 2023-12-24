import {useState} from 'react';
import ScoreDisplay from './ScoreDisplay';

function Scorer({response}) {
    const [json, setJson] = useState(JSON.parse(response));
    const [deck, setDeck] = useState(json.predictions.map(tile => tile.class));
    const [tileList, setTileList] = useState([...new Set(deck)].sort());
    
    const [seatWind, setSeatWind] = useState("east");
    const [roundWind, setRoundWind] = useState("east");

    const [selectedWinningTile, setSelectedWinningTile] = useState(tileList[0]);

    const initialConfig = {
        Tsumo: false,
        FirstTake: false,
        Riichi: false,
        Ippatsu: false,
        DoubleRiichi: false,
        HaiteiHoutei: false,
    }

    const wind = ["east", "south", "north", "west"];

    const [config, setConfig] = useState(initialConfig);
    const situationalYakuList = Object.keys(initialConfig);

    //console.log(deck);
    //console.log(config);

    return (
        <>
            <h3>Select the winning tile</h3>
            <select
                value={selectedWinningTile}
                onChange={event => {
                    setSelectedWinningTile(event.target.value);
                }}
            >
                {
                    tileList.map(tile => {
                        return (
                            <option value={tile}> {tile} </option>
                        )
                    })
                }
            </select>

            <form
                onSubmit={(event) => {
                    event.preventDefault();
                }}
            >
                <fieldset>
                    <legend>
                        Situational Yaku:
                    </legend>
                    
                    {situationalYakuList.map(option => (
                        <div key={option}>
                        <input
                            type="checkbox"
                            id={option}
                            value={option}
                            checked={config[option] === true}
                            onChange={event => {
                            setConfig({
                                ...config,
                                [option]: event.target.checked,
                            })
                            }}
                        />
                        <label htmlFor={option}>
                            {option}
                        </label>
                        </div>
                    ))}
                </fieldset>
            </form>
            
            <h3>Seat Wind</h3>
            <select
                value={seatWind}
                onChange={event => {
                    setSeatWind(event.target.value);
                }}
            >
                {
                    wind.map(wind => {
                        return (
                            <option value={wind}> {wind} </option>
                        )
                    })
                }
            </select>

            <h3>Round Wind</h3>
            <select
                value={roundWind}
                onChange={event => {
                    setRoundWind(event.target.value);
                }}
            >
                {
                    wind.map(wind => {
                        return (
                            <option value={wind}> {wind} </option>
                        )
                    })
                }
            </select>

            <ScoreDisplay deck={deck} winningTile={selectedWinningTile} config={config} seatWind={seatWind} roundWind={roundWind}/>
        </>
    )
}

export default Scorer