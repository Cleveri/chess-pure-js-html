function getAllPiecesPosition(){
    for(var i = 0; i < rows.length; i++){
        for(var j = 0; j < columns.length; j++){
            var pieceFound = getPiece(document.getElementById(columns[j] + rows[i]));
            if(pieceFound != null){
                if(pieceFound.piece.indexOf("w") != -1){
                    whitePiecesPositions.push(pieceFound);
                } else {
                    blackPiecesPositions.push(pieceFound);
                }
            }
        }
    }
    getPossibleMovesToSaveCheck(whiteToMove);

}

function getPossibleMovesToSaveCheck(white){
    if(white){
        getPossibleMovesToSaveCheckByPositions(whitePiecesPositions);
    } else {
        getPossibleMovesToSaveCheckByPositions(blackPiecesPositions);
    }
}

function getPossibleMovesToSaveCheckByPositions(positions){
    var possibleFound
    if(!checkedBy.knight){
        getBlockingDirection(checkedBy);
    }

    for(var i = 0; i < positions.length; i++){
        possibleFound = pieceMoves(positions[i], true);
        for(var j = 0; j < possibleFound.length; j++){
            var moveToCapture = possibleFound[j].length === 3 ? possibleFound[j].substring(0, 2) : possibleFound[j];
            if(moveToCapture == checkedBy.position){
                appendToPossibleMoves( positions[i].position, checkedBy.position)
            }
        }
    }
}


function appendToPossibleMoves(positionFrom, positionTo){
    if(possibleMovesToSaveCheck[positionFrom] == null){
        possibleMovesToSaveCheck[positionFrom] = [];
    }
    possibleMovesToSaveCheck[positionFrom].push(positionTo);
}


function getBlockingDirection(checkedByPosition){

    var positionToSplit = whiteToMove ? whiteKingPosition : blackKingPosition;
    var position =  positionToSplit.split("");
    var column = notationToColumns(position[0]);
    var row = Number(position[1]);

    var counter = 1;
    if(checkedByPosition.direction == "up"){
        for(var i = row; i < rows.length; i++) {
            var squareId = columnsToNotation(column) + (Number(row)+counter);
            appendToPossibleMoves("any" , squareId);
            if(squareId == checkedByPosition.position){
                break;
            }
            counter++;
        }
    }

    counter = 1;
    if(checkedByPosition.direction == "down"){
        for(var i = row; i >= 0; i--) {
            var squareId = columnsToNotation(column) + (Number(row)-counter);
            appendToPossibleMoves("any" , squareId);
            if(squareId == checkedByPosition.position){
                break;
            }
            counter++;
        }
    }

    counter = 1;
    if(checkedByPosition.direction == "left"){
        for(var i = column; i >= 0; i--){
            var squareId = columnsToNotation(Number(column)-counter) + (Number(row));
            appendToPossibleMoves("any" , squareId);
            if(squareId == checkedByPosition.position){
                break;
            }
            counter++;
        }
    }

    counter = 1;
    if(checkedByPosition.direction == "right"){
        for(var i = column; i < columns.length; i++){
            var squareId = columnsToNotation(Number(column)+counter) + (Number(row));
            appendToPossibleMoves("any" , squareId);
            if(squareId == checkedByPosition.position){
                break;
            }
            counter++;
        }
    }

    counter = 1;
    if(checkedByPosition.direction == "upRight"){
        for(var i = row; i < rows.length; i++){
            var squareId = columnsToNotation(column+counter) + (Number(row)+counter);
            appendToPossibleMoves("any" , squareId);
            if(squareId == checkedByPosition.position){
                break;
            }
            counter++;
        }
    }

    counter = 1;
    if(checkedByPosition.direction == "upLeft"){
        for(var i = row; i < rows.length; i++){
            var squareId = columnsToNotation(column-counter) + (Number(row)+counter);
            appendToPossibleMoves("any" , squareId);
            if(squareId == checkedByPosition.position){
                break;
            }
            counter++;
        }
    }

    counter = 1;
    if(checkedByPosition.direction == "downLeft"){
        for(var i = row; i >= 0; i--){
            var squareId = columnsToNotation(column-counter) + (Number(row)-counter);
            appendToPossibleMoves("any" , squareId);
            if(squareId == checkedByPosition.position){
                break;
            }
            counter++;
        }
    }


    counter = 1;
    if(checkedByPosition.direction == "downRight"){
        for(var i = row; i >= 0; i--){
            var squareId = columnsToNotation(column+counter) + (Number(row)-counter);
            appendToPossibleMoves("any" , squareId);
            if(squareId == checkedByPosition.position){
                break;
            }
            counter++;
        }
    }

}