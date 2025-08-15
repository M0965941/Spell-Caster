import { PlayerTile } from "./classes";
import { GAMESTATE } from "./global";

GAMESTATE.playerHand.push(new PlayerTile(
    50,
    590,
    50,
    50,
    { 'letter': 'A', 'points': 1, id:1}
))


GAMESTATE.playerHand.push(new PlayerTile(
    110,
    590,
    50,
    50,
    { 'letter': 'B', 'points': 2, id:3}
))

// GAMESTATE.playerHand.push(new PlayerTile(
//     170,
//     590,
//     50,
//     50,
//     { 'letter': 'C', 'points': 3, id:4}
// ))
// GAMESTATE.playerHand.push(new PlayerTile(
//     230,
//     590,
//     50,
//     50,
//     { 'letter': 'D', 'points': 5, id:5}
// ))
// GAMESTATE.playerHand.push(new PlayerTile(
//     290,
//     590,
//     50,
//     50,
//     { 'letter': 'E', 'points': 6, id:6}
// ))