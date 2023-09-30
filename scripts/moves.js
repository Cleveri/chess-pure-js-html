function pieceMoves(piece, allMoves){
    var position = piece.position.split("");
    var column = notationToColumns(position[0]);
    var row = position[1];
    var checkersOnMove = checkKingCheckedAfterMoving(piece.position);
    if(checkersOnMove != null){
        for(var i = 0; i < checkersOnMove.length; i++){
            var checkedByOnMove = {knight: false, position: checkersOnMove[i].position, direction: checkersOnMove[i].direction, piece:  checkersOnMove[i].piece};
            getBlockingDirection(checkedByOnMove);
        }

    }
    
    if(piece.piece == "wP" || piece.piece == "bP"){
        if(!canMove(allMoves, piece.position) || checkersOnMove.length != 0){
            return removeUnMoveableSquares(piece.position, getPawnMoves(column, row, piece), possibleMovesToSaveCheck);
        }
        return getPawnMoves(column, row, piece);
    } else if(piece.piece == "wR" || piece.piece == "bR"){
        if(!canMove(allMoves, piece.position) || checkersOnMove.length != 0){
            return removeUnMoveableSquares(piece.position, getRookMoves(column, row, piece), possibleMovesToSaveCheck);
        }
        return getRookMoves(column, row, piece);
    } else if(piece.piece == "wB" || piece.piece == "bB"){
        if(!canMove(allMoves, piece.position) || checkersOnMove.length != 0){
            return removeUnMoveableSquares(piece.position, getBishopMoves(column, row, piece), possibleMovesToSaveCheck);
        }
        return getBishopMoves(column, row, piece);
    } else if(piece.piece == "wN" || piece.piece == "bN"){
        if(!canMove(allMoves, piece.position) || checkersOnMove.length != 0){
            return removeUnMoveableSquares(piece.position, getKnightMoves(column, row, piece), possibleMovesToSaveCheck);
        }
        return getKnightMoves(column, row, piece);
    } else if(piece.piece == "wQ" || piece.piece == "bQ"){
        if(!canMove(allMoves, piece.position) || checkersOnMove.length != 0){
            return removeUnMoveableSquares(piece.position, getQueenMoves(column, row, piece), possibleMovesToSaveCheck);
        }
        return getQueenMoves(column, row, piece);
    } else if(piece.piece == "wK" || piece.piece == "bK"){
        return getKingMoves(column, row, piece);
    }

    return [];
}

function canMove(allMoves, piecePosition){
    if(allMoves){
        return true;
    }
    if(whiteKingCheck && whiteToMove){
        return false;
    } else if(blackKingCheck && !whiteToMove){
        return false;
    }

    return true;
}


function removeUnMoveableSquares(piecePosition, moves, movesToKeep){
    if(movesToKeep[piecePosition] == null){
        movesToKeep[piecePosition] = [];
    }
    if(movesToKeep["any"] == null){
        movesToKeep["any"] = [];
    }
    var copyOfMoves = [...moves];
    for (let i = 0; i < moves.length; i++) {
        var moveToCheck = moves[i].length == 3 ? moves[i].substring(0, 2) : moves[i];
        if(movesToKeep[piecePosition].indexOf(moveToCheck) == -1 && movesToKeep["any"].indexOf(moveToCheck) == -1) {
            var indexToRemove = copyOfMoves.indexOf(moveToCheck);
            copyOfMoves.splice(indexToRemove == -1 ? copyOfMoves.indexOf(moveToCheck + "-") : indexToRemove,1);
        }
    }
    return copyOfMoves;
}


function getPawnMoves(column, row, piece){
    var movesFound = []
    
    var position = piece.white ? 1 : -1

    if(piece.firstTime){
        for(var i = 1; i < 3; i++){
            var squareId = columnsToNotation(column) + (Number(row)+(i * position));
            var moveResult = squareAvailable(squareId, piece, false, true);
            if(moveResult.move){
                movesFound.push(squareId);
            }
            if(moveResult.pieceInside){
                break;
            }
            
        }
    } else {
        var squareId = columnsToNotation(column) + (Number(row)+(1 * position));
            if(squareAvailable(squareId, piece, false, true).move){
                movesFound.push(squareId);
            }
    }

    var diagonalRight = columnsToNotation(Number(column)+1) + (Number(row)+(1 * position));
    var diagonalLeft = columnsToNotation(Number(column)-1) + (Number(row)+(1 * position));
    
    if(squareAvailable(diagonalRight, piece, true, false).move){
        movesFound.push(diagonalRight+"-");
    }
    if(squareAvailable(diagonalLeft, piece, true, false).move){
        movesFound.push(diagonalLeft+"-");
    }

    return movesFound;
}


function getKnightMoves(column, row, piece){
    var movesFound = []
    

    var diagonalUpRightU = columnsToNotation(Number(column)+1) + (Number(row)+(2));
    var diagonalUpRightR = columnsToNotation(Number(column)+2) + (Number(row)+(1));

    var diagonalUpLeftU = columnsToNotation(Number(column)-1) + (Number(row)+(2));
    var diagonalUpLeftL = columnsToNotation(Number(column)-2) + (Number(row)+(1));

    var diagonalDownRightD = columnsToNotation(Number(column)+1) + (Number(row)-(2));
    var diagonalDownRightR = columnsToNotation(Number(column)+2) + (Number(row)-(1));

    var diagonalDownLeftD = columnsToNotation(Number(column)-1) + (Number(row)-(2));
    var diagonalDownLeftL = columnsToNotation(Number(column)-2) + (Number(row)-(1));


    mvoesFound = pushKnightMove(diagonalUpRightU, movesFound, squareAvailable(diagonalUpRightU, piece, true, true))
    mvoesFound = pushKnightMove(diagonalUpRightR, movesFound, squareAvailable(diagonalUpRightR, piece, true, true))
    mvoesFound = pushKnightMove(diagonalUpLeftU, movesFound, squareAvailable(diagonalUpLeftU, piece, true, true))
    mvoesFound = pushKnightMove(diagonalUpLeftL, movesFound, squareAvailable(diagonalUpLeftL, piece, true, true))
    mvoesFound = pushKnightMove(diagonalDownRightD, movesFound, squareAvailable(diagonalDownRightD, piece, true, true))
    mvoesFound = pushKnightMove(diagonalDownRightR, movesFound, squareAvailable(diagonalDownRightR, piece, true, true))
    mvoesFound = pushKnightMove(diagonalDownLeftD, movesFound, squareAvailable(diagonalDownLeftD, piece, true, true))
    mvoesFound = pushKnightMove(diagonalDownLeftL, movesFound, squareAvailable(diagonalDownLeftL, piece, true, true))



    
    return movesFound;
}

function pushKnightMove(id, movesFound, result){
    if(result.move && result.pieceInside){
        movesFound.push(id+"-");
    } else if(result.move){
        movesFound.push(id);
    }
    return movesFound;
}


function getRookMoves(column, row, piece){
    var movesFound = []
    movesFound = getFrontColumn(column, row, piece, movesFound);
    movesFound = getBackColumn(column, row, piece, movesFound);
    movesFound = getRightRow(column, row, piece, movesFound);
    movesFound = getLeftRow(column, row, piece, movesFound);
    
    return movesFound;
}



function getBishopMoves(column, row, piece){
    var movesFound = []
    movesFound = getFrontRightDiagonalColumn(column, row, piece, movesFound);
    movesFound = getFrontLeftDiagonalColumn(column, row, piece, movesFound);
    movesFound = getBackRightDiagonalColumn(column, row, piece, movesFound);
    movesFound = getBackLeftDiagonalColumn(column, row, piece, movesFound);
    


    
    return movesFound;
}



function getQueenMoves(column, row, piece){
    var rookMovesFound = getRookMoves(column, row, piece);
    var bishopMovesFound = getBishopMoves(column, row, piece);
    return rookMovesFound.concat(bishopMovesFound);
}

function getKingMoves(column, row, piece){
    var movesFound = []
    var Up = columnsToNotation(Number(column)) + (Number(row)+(1));
    var Down = columnsToNotation(Number(column)) + (Number(row)-1);
    var Left = columnsToNotation(Number(column)-1) + (Number(row));
    var Right = columnsToNotation(Number(column)+1) + (Number(row));
    
    var UpRight = columnsToNotation(Number(column)+1) + (Number(row)+(1));
    var UpLeft = columnsToNotation(Number(column)-1) + (Number(row)+(1));
    var DownRight = columnsToNotation(Number(column)+1) + (Number(row)-(1));
    var DownLeft = columnsToNotation(Number(column)-1) + (Number(row)-(1));
    
    movesFound = pushKnightMove(Up, movesFound, squareAvailable(Up, piece, true, true))
    movesFound = pushKnightMove(Down, movesFound, squareAvailable(Down, piece, true, true))
    movesFound = pushKnightMove(Left, movesFound, squareAvailable(Left, piece, true, true))
    movesFound = pushKnightMove(Right, movesFound, squareAvailable(Right, piece, true, true))
    movesFound = pushKnightMove(UpRight, movesFound, squareAvailable(UpRight, piece, true, true))
    movesFound = pushKnightMove(UpLeft, movesFound, squareAvailable(UpLeft, piece, true, true))
    movesFound = pushKnightMove(DownRight, movesFound, squareAvailable(DownRight, piece, true, true))
    movesFound = pushKnightMove(DownLeft, movesFound, squareAvailable(DownLeft, piece, true, true))

    var toRemove = [];
        for (var i = 0; i < movesFound.length; i++) {
            if(validateChecks(false, movesFound[i])){
                toRemove.push(movesFound[i]);
            }
        }
        for (var i = 0; i < toRemove.length; i++) {
            var index = movesFound.indexOf(toRemove[i]);
            if(index != -1){
                movesFound.splice(index, 1);
            }
        }
    return movesFound;
}









function getFrontColumn(column, row, piece, movesFound){
    counter = 1;
    for(var i = row; i < rows.length; i++){
        var squareId = columnsToNotation(column) + (Number(row)+counter);
        counter++;
        var moveResult = squareAvailable(squareId, piece, true, true);
        if(moveResult.move){
            movesFound.push(squareId);
        } 
        if(moveResult.pieceInside && moveResult.move) {
            if(movesFound.indexOf(squareId) != -1){
                movesFound.splice(movesFound.indexOf(squareId), 1);
            }
            movesFound.push(squareId+"-");
            break;
        } else if(moveResult.pieceInside) {
            break;
        }
    }
    return movesFound;
}

function getFrontRightDiagonalColumn(column, row, piece, movesFound){
    counter = 1;
    for(var i = row; i < rows.length; i++){
        var squareId = columnsToNotation(column+counter) + (Number(row)+counter);
        counter++;
        var moveResult = squareAvailable(squareId, piece, true, true);
        if(moveResult.move){
            movesFound.push(squareId);
        } 
        if(moveResult.pieceInside && moveResult.move) {
            if(movesFound.indexOf(squareId) != -1){
                movesFound.splice(movesFound.indexOf(squareId), 1);
            }
            movesFound.push(squareId+"-");
            break;
        } else if(moveResult.pieceInside) {
            break;
        }
    }
    return movesFound;
}

function getFrontLeftDiagonalColumn(column, row, piece, movesFound){
    counter = 1;
    for(var i = row; i < rows.length; i++){
        var squareId = columnsToNotation(column-counter) + (Number(row)+counter);
        counter++;
        var moveResult = squareAvailable(squareId, piece, true, true);
        if(moveResult.move){
            movesFound.push(squareId);
        } 
        if(moveResult.pieceInside && moveResult.move) {
            if(movesFound.indexOf(squareId) != -1){
                movesFound.splice(movesFound.indexOf(squareId), 1);
            }
            movesFound.push(squareId+"-");
            break;
        } else if(moveResult.pieceInside) {
            break;
        }
    }
    return movesFound;
}


function getBackColumn(column, row, piece, movesFound){
    counter = 1;
    for(var i = row; i >= 0; i--){
        var squareId = columnsToNotation(column) + (Number(row)-counter);
        counter++;
        var moveResult = squareAvailable(squareId, piece, true, true);
        if(moveResult.move){
            movesFound.push(squareId);
        } 
        if(moveResult.pieceInside && moveResult.move) {
            if(movesFound.indexOf(squareId) != -1){
                movesFound.splice(movesFound.indexOf(squareId), 1);
            }
            movesFound.push(squareId+"-");
            break;
        } else if(moveResult.pieceInside) {
            break;
        }
    }
    return movesFound;
}

function getBackLeftDiagonalColumn(column, row, piece, movesFound){
    counter = 1;
    for(var i = row; i >= 0; i--){
        var squareId = columnsToNotation(column-counter) + (Number(row)-counter);
        counter++;
        var moveResult = squareAvailable(squareId, piece, true, true);
        if(moveResult.move){
            movesFound.push(squareId);
        } 
        if(moveResult.pieceInside && moveResult.move) {
            if(movesFound.indexOf(squareId) != -1){
                movesFound.splice(movesFound.indexOf(squareId), 1);
            }
            movesFound.push(squareId+"-");
            break;
        } else if(moveResult.pieceInside) {
            break;
        }
    }
    return movesFound;
}

function getBackRightDiagonalColumn(column, row, piece, movesFound){
    counter = 1;
    for(var i = row; i >= 0; i--){
        var squareId = columnsToNotation(column+counter) + (Number(row)-counter);
        counter++;
        var moveResult = squareAvailable(squareId, piece, true, true);
        if(moveResult.move){
            movesFound.push(squareId);
        } 
        if(moveResult.pieceInside && moveResult.move) {
            if(movesFound.indexOf(squareId) != -1){
                movesFound.splice(movesFound.indexOf(squareId), 1);
            }
            movesFound.push(squareId+"-");
            break;
        } else if(moveResult.pieceInside) {
            break;
        }
    }
    return movesFound;
}

function getRightRow(column, row, piece, movesFound){
    counter = 1;
    for(var i = column; i < columns.length; i++){
        var squareId = columnsToNotation(Number(column)+counter) + (Number(row));
        counter++;
        var moveResult = squareAvailable(squareId, piece, true, true);
        if(moveResult.move){
            movesFound.push(squareId);
        } 
        if(moveResult.pieceInside && moveResult.move) {
            if(movesFound.indexOf(squareId) != -1){
                movesFound.splice(movesFound.indexOf(squareId), 1);
            }
            movesFound.push(squareId+"-");
            break;
        } else if(moveResult.pieceInside) {
            break;
        }
    }
    return movesFound;
}


function getLeftRow(column, row, piece, movesFound){
    counter = 1;
    for(var i = column; i >= 0; i--){
        var squareId = columnsToNotation(Number(column)-counter) + (Number(row));
        counter++;
        var moveResult = squareAvailable(squareId, piece, true, true);
        if(moveResult.move){
            movesFound.push(squareId);
        } 
        if(moveResult.pieceInside && moveResult.move) {
            if(movesFound.indexOf(squareId) != -1){
                movesFound.splice(movesFound.indexOf(squareId), 1);
            }
            movesFound.push(squareId+"-");
            break;
        } else if(moveResult.pieceInside) {
            break;
        }
    }
    return movesFound;
}





function notationToColumns(characterFound){
    return (characterFound + "").charCodeAt(0) - 97;
}

function columnsToNotation(characterFound){
    return String.fromCharCode(characterFound + 97);
}



function squareAvailable(id, piece, canEat, canMoveIfEmpty){
    var squareFound = document.getElementById(id);
    if(squareFound == null){
        return { move: false, pieceInside: false};
    }
    var enemyPiece = getPiece(squareFound);
    if(enemyPiece == null){
        return { move: canMoveIfEmpty, pieceInside: false};
    }
    if(enemyPiece.white && piece.white){
        return { move: false, pieceInside: true};
    } else if(!enemyPiece.white && !piece.white){
        return { move: false, pieceInside: true};
    }
    return { move: canEat && areEnemeies(piece, enemyPiece), pieceInside: true};
}


function areEnemeies(piece, piece2){
    return (piece.white && !piece2.white) || (!piece.white && piece2.white)
}


function checkKingCheckedAfterMoving(piecePosition){
    var position = whiteToMove ? whiteKingPosition : blackKingPosition;
    var exposedBy = getExposedBy(document.getElementById(position), piecePosition);
    var pieceToMovePos = getDirectionOfTheOtherPiece(position, piecePosition);
    var tempExposedBy = [];
    for(var i = 0; i < exposedBy.length; i++){
        if(checkedBy.piece !== ""){
            break;
        }
        if(exposedBy[i].direction == pieceToMovePos){
            tempExposedBy.push(exposedBy[i]);
        } else if(pieceToMovePos.indexOf(exposedBy[i].direction) != -1){
            if(exposedBy[i].piece.indexOf("Q") != -1 || exposedBy[i].piece.indexOf("B") != -1){
                tempExposedBy.push(exposedBy[i]);
            }
        }
    }

    var checked = isKingChecked(tempExposedBy, whiteToMove, whiteKingPosition, false);
    if(checked){
        return tempExposedBy;
    }
    return []
}



var directions = 
{
    "0,1":"up",
    "0,-1":"down",
    "1,0":"right",
    "-1,0":"left",
    "1,1":"upRight",
    "1,-1":"downRight",
    "-1,1":"upLeft",
    "-1,1":"downLeft",
}

function getDirectionOfTheOtherPiece(piecePosition, piecePositionToCheck){
    var piecePos = getRowColumn(piecePosition);
    var piecePosToCheck = getRowColumn(piecePositionToCheck);
    var rowDiff = piecePos.row - piecePosToCheck.row;
    var columnDiff = piecePos.column - piecePosToCheck.column;
    if(rowDiff == 0){
        if(columnDiff < 0){
            return "right";
        } else if(columnDiff > 0){
            return "left";
        }
    } else if(rowDiff < 0){
        if(columnDiff == 0){
            return "up";
        } else if(columnDiff < 0){
            if(columnDiff < -1 || rowDiff < -1){
                return "upRightFar";
            }
            return "upRight";
        } else if(columnDiff > 0){
            if(columnDiff > 1 || rowDiff < -1){
                return "upLeftFar";
            }
            return "upLeft";
        }
    } else if(rowDiff > 0) {
        if(columnDiff == 0){
            return "down";
        } else if(columnDiff > 0){
            if(columnDiff > 1 || rowDiff > 1){
                return "downLeftFar";
            }
            return "downLeft";
        } else if(columnDiff < 0){
            if(columnDiff < -1 || rowDiff > 1){
                return "downRightFar";
            }
            return "downRight";
        }
    }
    return "none";
}


function getRowColumn(position){
    var data = position.split("");
    return {row:Number(data[1]), column:Number(notationToColumns(data[0]))};
}