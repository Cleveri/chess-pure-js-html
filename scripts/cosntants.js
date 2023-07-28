var BOARD_SIZE = 0;
var SQUARE_SIZE = 0;
var LIGHT_COLOR = "";
var DARK_COLOR = "";
var HIGH_LIGHT_COLOR = "";
var HIGH_LIGHT_COLOR_SECONDARY = "";
var DEBUG_CHESS = false;

var columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
var rows    = ['8', '7', '6', '5', '4', '3', '2', '1'];

var whitePawnPromotionSqaures = ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'];
var blackPawnPromotionSqaures = ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'];

var castlingPositions = {"e8":"h8,a8", "e1": "h1,a1"}

var BOARD_PIECES = 
[   ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
    ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
    ["", "", "", "", "", "" , "", ""],
    ["", "", "", "", "", "" , "", ""],
    ["", "", "", "", "", "" , "", ""],
    ["", "", "", "", "", "" , "", ""],
    ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
    ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"]
];

// var BOARD_PIECES = 
// [   ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
//     ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
//     ["", "", "", "", "", "" , "", ""],
//     ["", "", "", "", "", "" , "", ""],
//     ["", "", "", "", "", "" , "", ""],
//     ["", "", "", "", "", "" , "", ""],
//     ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
//     ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"]
// ];

// var BOARD_PIECES = 
// [   ["bR", "bN", "bB", "bQ", "bK", "bB", "", "bR"],
//     ["bP", "bP", "bP", "", "", "", "bP", "bP"],
//     ["", "", "", "", "", "bP" , "", ""],
//     ["", "", "", "", "bP", "" , "", ""],
//     ["", "", "", "", "wN", "" , "", ""],
//     ["", "", "", "wP", "", "" , "", ""],
//     ["wP", "wP", "wP", "", "wP", "wP", "wP", "wP"],
//     ["wR", "", "wB", "wQ", "wK", "wB", "", "wR"]
// ];

// var BOARD_PIECES = 
// [   ["", "", "", "", "", "", "", ""],
//     ["", "", "", "", "", "", "", ""],
//     ["", "", "", "", "", "" , "", ""],
//     ["", "", "", "", "", "" , "", ""],
//     ["", "", "", "", "", "" , "", ""],
//     ["", "", "", "", "", "" , "", ""],
//     ["", "", "", "", "", "", "", ""],
//     ["", "", "", "", "", "", "", ""]
// ];


async function prepareJson() {
    const response = await fetch("./scripts/properties.json");
    const json = await response.json();
    BOARD_SIZE = json.BOARD_SIZE;
    SQUARE_SIZE = json.BOARD_SIZE / 8;
    LIGHT_COLOR = json.LIGHT_COLOR;
    DARK_COLOR = json.DARK_COLOR;
    HIGH_LIGHT_COLOR = json.HIGH_LIGHT_COLOR;
    DEBUG_CHESS = json.DEBUG_CHESS;
}

 