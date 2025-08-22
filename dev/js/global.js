export const GAME = {
    board: [],
    mouse: {
        x: 0,
        y: 0,
        lmb: 0
    },
    player:{
        currentHealth: 50,
        maximumHealth: 100,
        sprite: null,
        pouch: [],
        hand: [],
        lastPointPlayed: 0,
    },
    enemies: [],
    selectedTile: null,
    boardSize: 3,
    tilewidth: 40,
    pouch: [],
    maximumHand: 5,
    hasInvalidWords: 0,
    points: 0,
    round: 0,
    currentActiveTile: 0,
    isPlayerTurn: 1,
    playerHealth: 100
};