var highlighted = null;
var highlightedSecondary = null;
var whiteToMove = true;

var movesToRemove = []

var whiteKingPosition = "";
var blackKingPosition = "";

var whiteKingCheck = false;
var blackKingCheck = false;

var whitePiecesPositions = [];
var blackPiecesPositions = [];

var possibleMovesToSaveCheck = {};

var checkedBy = {knight: false, position: "", direction: "", piece: ""};

function getKingPosition(){
    for(var i = 0; i < rows.length; i++){
        for(var y = 0; y < columns.length; y++){
            var piece = getPiece(document.getElementById(columns[y] + rows[i]));
            if(piece != null){
                if(piece.piece == "bK"){
                    blackKingPosition = piece.position;
                } else if(piece.piece == "wK"){
                    whiteKingPosition = piece.position;
                }
            }
        }
    }


}

function validateChecks(changeKingState, position){
    var checked = false;
    if(position == ""){
        position = whiteToMove ? whiteKingPosition : blackKingPosition;
    }
    position = position.length == 3 ? position.substring(0,2) : position;
    var exposedBy = getExposedBy(document.getElementById(position), "");
    checked = isKingChecked(exposedBy, whiteToMove, position, changeKingState);
    kingState(whiteToMove, checked, changeKingState);
    if(checked && changeKingState){
        possibleMovesToSaveCheck = {};
        getAllPiecesPosition();
    }
    return checked;
}


function kingState(isWhite, checked, changeKingState){
    if(isWhite && changeKingState){
        whiteKingCheck = checked;
    } else if(changeKingState) {
        blackKingCheck = checked;
    }
    if(checked && changeKingState){
        playChessAudio("check");

    }
}


function isKingChecked(exposedBy, isWhite, position, changeKingState) {
    var checked = false;
    var enemy = isWhite ? 'b' : 'w';

    for (var i = 0; i < exposedBy.length; i++) {
        if ((exposedBy[i].piece == enemy + "R" || exposedBy[i].piece == enemy + "Q") && !exposedBy[i].diagonal) {
            checked = true;
            if(changeKingState){
                checkedBy = {knight: false, position: exposedBy[i].position, direction: exposedBy[i].direction, piece: exposedBy[i].piece};
            }
            break;
        } else if ((exposedBy[i].piece == enemy + "B" || exposedBy[i].piece == enemy + "Q") && exposedBy[i].diagonal) {
            checked = true;
            if(changeKingState){
                checkedBy = {knight: false, position: exposedBy[i].position, direction: exposedBy[i].direction, piece: exposedBy[i].piece};
            }
            break;
        } else if(exposedBy[i].piece == enemy + "P"  && exposedBy[i].diagonal && isOneRowDifference(position, exposedBy[i].position)){
            if(isWhite && !exposedBy[i].direction.indexOf("down") != -1){
                checked = true;
                if(changeKingState){
                    checkedBy = {knight: false, position: exposedBy[i].position, direction: exposedBy[i].direction, piece: exposedBy[i].piece};
                }
                break;
            } else if(exposedBy[i].direction.indexOf("down") != -1) {
                checked = true;
                if(changeKingState){
                    checkedBy = {knight: false, position: exposedBy[i].position, direction: exposedBy[i].direction, piece: exposedBy[i].piece};
                }
                break;
            }
        } else if(exposedBy[i].piece == enemy + "N" && exposedBy[i].direction.indexOf("Knight") != -1){
            checked = true;
            if(changeKingState){
                checkedBy = {knight: true, position: exposedBy[i].position, direction: exposedBy[i].direction, piece: exposedBy[i].piece};
            }
            break;
        } else if(exposedBy[i].piece == enemy + "K" && (kingChecksKing(position, exposedBy[i].position))){
            checked = true;
            if(changeKingState){
                checkedBy = {knight: true, position: exposedBy[i].position, direction: exposedBy[i].direction, piece: exposedBy[i].piece};
            }
            break;
        } else {
            checked = false;
        }
    }
    return checked;
}


function kingChecksKing(position, enemyPosition){
    var kingChecked = false;
    kingChecked = (isSameRow(position, enemyPosition) && isOneColumnDifference(position, enemyPosition)) ||
                  (isOneRowDifference(position, enemyPosition) && isOneColumnDifference(position, enemyPosition)) || 
                  (isOneRowDifference(position, enemyPosition) && isSameColumn(position, enemyPosition));
    return kingChecked;
}


function isOneRowDifference(positionToCheck, enemyPosition){
    var positionToCheckRow = Number(positionToCheck.split("")[1]);
    var enemyPositionRow = Number(enemyPosition.split("")[1]);
    return positionToCheckRow - enemyPositionRow == -1 || positionToCheckRow - enemyPositionRow == 1;
}

function isOneColumnDifference(positionToCheck, enemyPosition){
    var positionToCheckColumn = Number(notationToColumns(positionToCheck.split("")[0]));
    var enemyPositionColumn = Number(notationToColumns(enemyPosition.split("")[0]));
    return positionToCheckColumn - enemyPositionColumn == -1 || positionToCheckColumn - enemyPositionColumn == 1;
}


function isSameRow(positionToCheck, enemyPosition){
    var positionToCheckRow = Number(positionToCheck.split("")[1]);
    var enemyPositionRow = Number(enemyPosition.split("")[1]);
    return positionToCheckRow - enemyPositionRow == 0;
}

function isSameColumn(positionToCheck, enemyPosition){
    var positionToCheckColumn = Number(notationToColumns(positionToCheck.split("")[0]));
    var enemyPositionColumn = Number(notationToColumns(enemyPosition.split("")[0]));
    return positionToCheckColumn - enemyPositionColumn == 0;
}

function highlightSquare(square, light, event){
    var leftClick = event.which == 1;
     var movesFound = [];
     hideAllAvailableMoves();
     if(highlighted == null && leftClick){
        movesFound = getPossibleMoves(square);
        showAllAvailableMoves(movesFound);
        movesToRemove = movesFound;
        
    }
    if(highlighted != null){
        movesFound = getPossibleMoves(highlighted);
        movesToRemove = movesFound;
        var pieceFound = highlighted.children[1];
        var wasFirstTime = pieceFound.getAttribute("firstTime") == "true";
        var oldPosition = pieceFound.getAttribute("position");
        var toUnHighLight = highlighted;
        var captured = false;
        var pieceCaptured = {};
        highlighted = null;
        toUnHighLight.click();
        if(leftClick && movesFound != null && (movesFound.includes(square.id+"-") || movesFound.includes(square.id))){
                if(square.children[1] != null) {
                    pieceCaptured = getPiece(square);
                    square.children[1].remove();
                    playChessAudio('capture');
                    captured = true;
                }
                pieceFound.setAttribute("position", square.id);
                pieceFound.setAttribute("firstTime", "false");
                var pieceName = pieceFound.getAttribute("piece");
                if(pieceName == "wK"){
                    whiteKingPosition = square.id;
                } else if(pieceName == "bK") {
                    blackKingPosition = square.id;
                }
                square.appendChild(pieceFound);
                if(pieceName.indexOf("P") != -1){
                    if(whiteToMove){
                        if(whitePawnPromotionSqaures.indexOf(square.id) != -1){
                            showPromotion(square.id);
                        }
                    } else {
                        if(blackPawnPromotionSqaures.indexOf(square.id) != -1){
                            showPromotion(square.id);
                        }
                    }
                }
                whiteToMove = !whiteToMove;
                if(validateChecks(true, "")){
                    checkWinner();
                }
                if(!whiteKingCheck && !blackKingCheck && !captured){
                    playChessAudio('move');
                }
                registerMove(oldPosition, square.id, getPiece(square), wasFirstTime, captured, pieceCaptured);
                return;
        } else if(leftClick) {
            movesFound = getPossibleMoves(square);
            movesToRemove = movesFound;
            showAllAvailableMoves(movesFound);
            var previousSelectedPiece = getPiece(toUnHighLight);
            var rookPosition = castlingPositions[previousSelectedPiece.position];
            if(rookPosition){
                var selectedPiece = getPiece(square);
                if(selectedPiece != null && rookPosition.includes(selectedPiece.position)){
                    if(selectedPiece.piece.includes("R") && previousSelectedPiece.firstTime && selectedPiece.firstTime){
                        console.log("can castle");
                    }
                }
                
            }

        }
    }
    if(highlightedSecondary != null){
        highlightedSecondary.click();
        highlightedSecondary = null;

    }
    if(leftClick){
        highlighted = square;
    } else {
        highlightedSecondary = square;
    }
    var piece = getPiece(square);
    if(piece == null && leftClick){
        highlighted = null;
        return;
    } else if(leftClick && piece != null && ((piece.white && !whiteToMove) || (!piece.white && whiteToMove))) {
        highlighted = null;
        return;
    }
    if(leftClick){
        square.style.backgroundColor = HIGH_LIGHT_COLOR;
    } else {
        square.style.backgroundColor = HIGH_LIGHT_COLOR_SECONDARY;
    }
    square.setAttribute("onclick", "unHighlightSquare(this, " + light + ")");
    
}

function checkWinner(){
    if(!whiteToMove){
        if(playerCheckMated(blackKingPosition) && !canAnyoneCaptureChecker(blackPiecesPositions)){
            showOverlay(true);
            showWinningBoard(true);
            setHeader("White Won By Checkmate");
        }
    } else if(playerCheckMated(whiteKingPosition) && !canAnyoneCaptureChecker(whitePiecesPositions)){
            showOverlay(true);
            showWinningBoard(true);
            setHeader("Black Won By Checkmate");
        }

    }



function canAnyoneCaptureChecker(positions){
    for(var i = 0; i < positions.length; i++){
        possibleFound = pieceMoves(positions[i], true);
        console.log(possibleFound);
        for(var j = 0; j < possibleFound.length; j++){
            var squareToGo = possibleFound[j].length === 3 ? possibleFound[j].substring(0, 2) : possibleFound[j];
            if(possibleMovesToSaveCheck["any"].indexOf(squareToGo) != -1){
                return true;
            }
        }
    }
    return false;
}

function playerCheckMated(position){
    var column = notationToColumns(position[0]);
    var row = position[1];
    var movesFound = getKingMoves(column, row, getPiece(document.getElementById(position)));
    console.log(movesFound);
    if(whiteToMove){
        if(movesFound.length == 0 && whiteKingCheck){
            return true;
        }
    } else {
        if(movesFound.length == 0 && blackKingCheck){
            return true;
        }
    }

    return false;
    
}


function unHighlightSquare(square, light){
    if(highlighted === square){
        return;
    }
    square.style.backgroundColor = light ? LIGHT_COLOR : DARK_COLOR;
    square.setAttribute("onclick", "highlightSquare(this, " + light + ", event)");
    highlighted = null;
    return true;
}


function hideAllAvailableMoves(){
    if(movesToRemove == null){
        return;
    }
    for(var i = 0; i < movesToRemove.length; i++){
        var move = movesToRemove[i];
        if(move.length > 2){
            move = move.substring(0, 2);
        }
        var dot =  document.getElementById(move+ "Dot");
        dot.style.display = "none";
    }
}

var promotionPosition = ""
function showPromotion(position){
    showPromotionOptions(whiteToMove);
    promotionPosition = position
}

function promotePiece(newPiece){
    document.getElementById(promotionPosition).children[1].remove();
    var img = document.createElement("img");
    img.src = "./images/" + newPiece + ".png";
    img.style.width = SQUARE_SIZE + "px";
    img.style.height = SQUARE_SIZE + "px";
    img.setAttribute("piece", newPiece);
    img.setAttribute("position", promotionPosition);
    img.setAttribute("firstTime", "false");
    document.getElementById(promotionPosition).appendChild(img);
    hidePromotionOptions();
    validateChecks(true, "");

    if(!whiteKingCheck && !blackKingCheck){
        playChessAudio('promote');
    }

}


function showAllAvailableMoves(movesFound){
    if(movesFound == null){
        return;
    }
    for(var i = 0; i < movesFound.length; i++){
        var move = movesFound[i];
        var canEat = false;
        if(move.length > 2){
            move = move.substring(0, 2);
            canEat = true;
        }
        var dot =  document.getElementById(move+ "Dot");
        if(canEat){
            dot.style.border = "solid 5px black";
            dot.style.backgroundColor = "";
            dot.style.width = SQUARE_SIZE/1.3 + "px";
            dot.style.height = SQUARE_SIZE/1.3 + "px";
            
        } else {
            dot.style.backgroundColor = "black";
            dot.style.border = "";
            dot.style.borderRadius = "50px";
            dot.style.width = SQUARE_SIZE/4 + "px";
            dot.style.height = SQUARE_SIZE/4 + "px";}
        dot.style.display = "";
        
    }
}

function getPossibleMoves(square){
    var piece = getPiece(square);
    if(piece == null || (piece.white && !whiteToMove) || (!piece.white && whiteToMove)){
        return;
    }
    var pieceMovesFound = pieceMoves(piece, false);
    return pieceMovesFound;
    
}



function getPiece(square){
    if(square == null){
        return null;
    }

    var pieceFound = square.children[1];
    if(pieceFound == null){
        return null;
    }
    pieceData = { position: pieceFound.getAttribute("position"),
                  piece:   pieceFound.getAttribute("piece"),
                  white: pieceFound.getAttribute("piece").includes("w"),
                  firstTime: pieceFound.getAttribute("firstTime").includes("true")
                }
    return pieceData;
}




function pieceIntoName(piece){
    var names = piece.split("");

    var color = names[0] == "w" ? "White" : "Black";
    var pieceName = "Pawn";

    if(names[1] == "Q"){
        var pieceName = "Queen";
    } else if(names[1] == "B"){
        var pieceName = "Bishop";
    } else if(names[1] == "R"){
        var pieceName = "Rook";
    } else if(names[1] == "K"){
        var pieceName = "King";
    } else if(names[1] == "N"){
        var pieceName = "Knight";
    }

    return color + " " + pieceName;
}
