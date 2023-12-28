import { Riichi } from 'riichi-ts';

function mapTile(tileName: string): number{
  return mapTileNames([...tileName])[0]
};

function mapTileNames(tileNames: string[]): number[] {
    return tileNames.map((tileName) => {
      const match = tileName.match(/^(\d+)([mps]|man|pin|sou)$/);
      const honorMatch = tileName.match(/^(east|south|west|north|haku|hatsu|chun)$/);
  
      if (match) {
        const number = parseInt(match[1], 10);
        const suit = match[2];
  
        switch (suit) {
          case 'man':
            return number - 1;
          case 'pin':
            return number + 8;
          case 'sou':
            return number + 17;
          default:
            return -1; // Invalid suit
        }
      } else if (honorMatch) {
        const honor = honorMatch[1];
        
        switch (honor) {
          case 'east':
            return 27;
          case 'south':
            return 28;
          case 'west':
            return 29;
          case 'north':
            return 30;
          case 'haku':
            return 31;
          case 'hatsu':
            return 32;
          case 'chun':
            return 33;
          default:
            return -1; // Invalid honor
        }
      } else {
        return -1; // Invalid tile name
      }
    });
  }

function windUtils(wind: string): number {
    switch (wind) {
        case 'east':
          return 27;
        case 'south':
          return 28;
        case 'west':
          return 29;
        case 'north':
          return 30;
        default:
        return -1;
    }
}

function ScoreCalculator(deck, winningTile, config, seatWind, roundWind) {
    
    const winningTileHandler = tile => tile === winningTile;

    const winningTileIndex = deck.findIndex(winningTileHandler);
    const noWinningTileDeck = deck.toSpliced(winningTileIndex, 1)
    const ronDeck = [...noWinningTileDeck, winningTile]

    console.log(ronDeck)

    const numberDeck = mapTileNames(ronDeck);

    let winningTileParameter;

    if(config.Tsumo === true) {
      winningTileParameter = null;
    } else {
      winningTileParameter = numberDeck[-1];
    }

    const hand = new Riichi(
        numberDeck, // closed part of the hand.  Taken tile from the wall should be the last here in case of tsumo.
        [ // melds
          
        ],
        { 
          bakaze: windUtils(roundWind), // round wind
          jikaze: windUtils(seatWind) // seat wind
        },
        winningTileParameter, // tile taken from someone's discard. In case of tsumo, set this to null. 
        config.FirstTake, // was this the first take? Used to determine tenhou/chinou/renhou
        config.Riichi, // does this hand have riichi?
        config.Ippatsu, // does this hand have ippatsu?
        config.DoubleRiichi, // does this hand have daburu-riichi?
        config.HaiteiHoutei, // is it the last taken tile? Used to determine haitei/houtei
        false, // was it agari after a kan? Used to determine rinshan/chankan
        0, // akadora count in hand
        false, // allow akadora; if this is false, previous parameter is ignored
        false, // allow kuitan?
        false, // use kiriage mangan?
      );
      //hand.disableDoubleyakuman(); // call this to count all yakumans as single
      //hand.disableYaku('yaku name'); // You can also disable some of the yaku
      //hand.disableHairi(); // Don't calculate improvements for the non-winning hand
      const result = hand.calc();
      /*
          Result format:
          {
            error: false, // true if hand couldn't be parsed
            fu: 30,
            han: 6,
            isAgari: true, // will be false if the hand is not winning
            ten: 12000, // amount of points won by the hand
            text: '', // additional info. Will contain 'no yaku' if the hand has no winning points 
            yaku: { // list of found yaku in the hand
             chinitsu: 5, // yaku name and amount of han for certain yaku
             tanyao: 1 
            },
            yakuman: 0, // Count of yakumans found
            hairi: { // shanten count and waits info
               now: 0, // current shanten count. 0 for tenpai.
               wait: [12], // tiles this hand is waiting for to improve or win
               waitsAfterDiscard: { // waits after discarding a certain tile
                12: [13, 14] 
               } 
            }
            hairi7and13: { // same as above but only for chiitoitsu and kokushimusou.
               now: 0,
               wait: [12],
               waitsAfterDiscard: { 12: [13, 14] }
            }
          }
       */
    console.log(hand)
    return result;
};

export default ScoreCalculator;