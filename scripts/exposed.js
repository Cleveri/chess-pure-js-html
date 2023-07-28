function getExposedBy(square, positionToIgnore){
    var exposedBy = [];
    var piece = getPiece(square);
    var position =  square.id.split("");
    var column = notationToColumns(position[0]);
    var row = position[1];

    exposedBy = exposedUp(column, row, exposedBy, positionToIgnore);
    exposedBy = exposedDown(column, row, exposedBy, positionToIgnore);
    exposedBy = exposedRight(column, row, exposedBy, positionToIgnore);
    exposedBy = exposedLeft(column, row, exposedBy, positionToIgnore);

    exposedBy = exposedUpRight(column, row, exposedBy, positionToIgnore);
    exposedBy = exposedUpLeft(column, row, exposedBy, positionToIgnore);
    exposedBy = exposedDownLeft(column, row, exposedBy, positionToIgnore);
    exposedBy = exposedDownRight(column, row, exposedBy, positionToIgnore);
    exposedBy = exposedByKnight(column, row, exposedBy, positionToIgnore);
    return exposedBy;
}

function exposedByKnight(column, row, exposedBy, positionToIgnore){

    var diagonalUpRightU = columnsToNotation(Number(column)+1) + (Number(row)+(2));
    var diagonalUpRightR = columnsToNotation(Number(column)+2) + (Number(row)+(1));

    var diagonalUpLeftU = columnsToNotation(Number(column)-1) + (Number(row)+(2));
    var diagonalUpLeftL = columnsToNotation(Number(column)-2) + (Number(row)+(1));

    var diagonalDownRightD = columnsToNotation(Number(column)+1) + (Number(row)-(2));
    var diagonalDownRightR = columnsToNotation(Number(column)+2) + (Number(row)-(1));

    var diagonalDownLeftD = columnsToNotation(Number(column)-1) + (Number(row)-(2));
    var diagonalDownLeftL = columnsToNotation(Number(column)-2) + (Number(row)-(1));

    var exposedByKnightPositions = [diagonalUpRightU, diagonalUpRightR, diagonalUpLeftU, diagonalUpLeftL,
                                    diagonalDownRightD, diagonalDownRightR, diagonalDownLeftD, diagonalDownLeftL]
    var counter = 1;
    counter = 1;
    for(var i = 0; i < exposedByKnightPositions.length; i++){
        var squareId = exposedByKnightPositions[i];
        counter++;
        var pieceFound = getPiece(document.getElementById(squareId));
        if(pieceFound != null && pieceFound.piece.indexOf("N") != -1 && ((!pieceFound.white && whiteToMove) || (pieceFound.white && !whiteToMove))){
            exposedBy.push({piece: pieceFound.piece, position: pieceFound.position, diagonal: false, direction: i > 3 ? "downKnight" : "upKnight"})
            break;
        }
        
    }

    return exposedBy;
}


function exposedUp(column, row, exposedBy, positionToIgnore){
    var self = whiteToMove ? "wK" : "bK";
    var counter = 1;
    counter = 1;
    for(var i = row; i < rows.length; i++){
        var squareId = columnsToNotation(column) + (Number(row)+counter);
        counter++;
        var pieceFound = getPiece(document.getElementById(squareId));
        if(pieceFound != null && ((!pieceFound.white && whiteToMove) || (pieceFound.white && !whiteToMove))){
            exposedBy.push({piece: pieceFound.piece, position: pieceFound.position, diagonal: false, direction: "up"})
            break;
        } else if(pieceFound != null){
            if(pieceFound.piece == self) {
                continue;
            }
            if(positionToIgnore == pieceFound.position){
                continue;
            }
            break;
        }
    }

    return exposedBy;
}

function exposedDown(column, row, exposedBy, positionToIgnore){
    var self = whiteToMove ? "wK" : "bK";
    var counter = 1;
    counter = 1;
    for(var i = row; i >= 0; i--){
        var squareId = columnsToNotation(column) + (Number(row)-counter);
        counter++;
        var pieceFound = getPiece(document.getElementById(squareId));
        if(pieceFound != null && ((!pieceFound.white && whiteToMove) || (pieceFound.white && !whiteToMove))){
            exposedBy.push({piece: pieceFound.piece, position: pieceFound.position, diagonal: false, direction: "down"})
            break;
        } else if(pieceFound != null){
            if(pieceFound.piece == self) {
                continue;
            }
            if(positionToIgnore == pieceFound.position){
                continue;
            }
            break;
        }
    }

    return exposedBy;
}

function exposedRight(column, row, exposedBy, positionToIgnore){
    var self = whiteToMove ? "wK" : "bK";
    var counter = 1;
    counter = 1;
    for(var i = column; i < columns.length; i++){
        var squareId = columnsToNotation(Number(column)+counter) + (Number(row));
        counter++;
        var pieceFound = getPiece(document.getElementById(squareId));
        if(pieceFound != null && ((!pieceFound.white && whiteToMove) || (pieceFound.white && !whiteToMove))){
            exposedBy.push({piece: pieceFound.piece, position: pieceFound.position, diagonal: false, direction: "right"})
            break;
        } else if(pieceFound != null){
            if(pieceFound.piece == self) {
                continue;
            }
            if(positionToIgnore == pieceFound.position){
                continue;
            }
            break;
        }
    }
    return exposedBy;
}

function exposedLeft(column, row, exposedBy, positionToIgnore){
    var self = whiteToMove ? "wK" : "bK";
    var counter = 1;
    counter = 1;
    for(var i = column; i >= 0; i--){
        var squareId = columnsToNotation(Number(column)-counter) + (Number(row));
        counter++;
        var pieceFound = getPiece(document.getElementById(squareId));
        if(pieceFound != null && ((!pieceFound.white && whiteToMove) || (pieceFound.white && !whiteToMove))){
            exposedBy.push({piece: pieceFound.piece, position: pieceFound.position, diagonal: false, direction: "left"})
            break;
        } else if(pieceFound != null){
            if(pieceFound.piece == self) {
                continue;
            }
            if(positionToIgnore == pieceFound.position){
                continue;
            }
            break;
        }
    }
    return exposedBy;
}

function exposedUpRight(column, row, exposedBy, positionToIgnore){
    var self = whiteToMove ? "wK" : "bK";
    var counter = 1;
    counter = 1;
    for(var i = row; i < rows.length; i++){
        var squareId = columnsToNotation(column+counter) + (Number(row)+counter);
        counter++;
        var pieceFound = getPiece(document.getElementById(squareId));
        if(pieceFound != null && ((!pieceFound.white && whiteToMove) || (pieceFound.white && !whiteToMove))){
            exposedBy.push({piece: pieceFound.piece, position: pieceFound.position, diagonal: true, direction: "upRight"})
            break;
        } else if(pieceFound != null){
            if(pieceFound.piece == self) {
                continue;
            }
            if(positionToIgnore == pieceFound.position){
                continue;
            }
            break;
        }
    }

    return exposedBy;
}


function exposedUpLeft(column, row, exposedBy, positionToIgnore){
    var self = whiteToMove ? "wK" : "bK";
    var counter = 1;
    counter = 1;
    for(var i = row; i < rows.length; i++){
        var squareId = columnsToNotation(column-counter) + (Number(row)+counter);
        counter++;
        var pieceFound = getPiece(document.getElementById(squareId));
        if(pieceFound != null && ((!pieceFound.white && whiteToMove) || (pieceFound.white && !whiteToMove))){
            exposedBy.push({piece: pieceFound.piece, position: pieceFound.position, diagonal: true, direction: "upLeft"})
            break;
        } else if(pieceFound != null){
            if(pieceFound.piece == self) {
                continue;
            }
            if(positionToIgnore == pieceFound.position){
                continue;
            }
            break;
        }
    }

    return exposedBy;
}

function exposedDownLeft(column, row, exposedBy, positionToIgnore){
    var self = whiteToMove ? "wK" : "bK";
    var counter = 1;
    counter = 1;
    for(var i = row; i >= 0; i--){
        var squareId = columnsToNotation(column-counter) + (Number(row)-counter);
        counter++;
        var pieceFound = getPiece(document.getElementById(squareId));
        if(pieceFound != null && ((!pieceFound.white && whiteToMove) || (pieceFound.white && !whiteToMove))){
            exposedBy.push({piece: pieceFound.piece, position: pieceFound.position, diagonal: true, direction: "downLeft"})
            break;
        } else if(pieceFound != null){
            if(pieceFound.piece == self) {
                continue;
            }
            if(positionToIgnore == pieceFound.position){
                continue;
            }
            break;
        }
    }

    return exposedBy;
}


function exposedDownRight(column, row, exposedBy, positionToIgnore){
    var self = whiteToMove ? "wK" : "bK";
    var counter = 1;
    counter = 1;
    for(var i = row; i >= 0; i--){
        var squareId = columnsToNotation(column+counter) + (Number(row)-counter);
        counter++;
        var pieceFound = getPiece(document.getElementById(squareId));
        if(pieceFound != null && ((!pieceFound.white && whiteToMove) || (pieceFound.white && !whiteToMove))){
            exposedBy.push({piece: pieceFound.piece, position: pieceFound.position, diagonal: true, direction: "downRight"})
            break;
        } else if(pieceFound != null){
            if(pieceFound.piece == self) {
                continue;
            }
            if(positionToIgnore == pieceFound.position){
                continue;
            }
            break;
        }
    }

    return exposedBy;
}

