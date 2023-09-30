var originalHtml = "";

async function loadBoard(){
    await prepareJson();
    var chessBody = document.getElementById("chessBody");
    originalHtml = chessBody.innerHTML;
    var board = document.getElementById("board");
    var innerBoard = document.getElementById("innerBoard");
    var winningBoard = document.getElementById("winningBoard");
    var overlayBoard = document.getElementById("overlayBoard");
    var rowsElement = document.getElementById("rows");
    var columnsElement = document.getElementById("columns");
    if(board == null){
        alert("failed to initialize board, board div element not found");
    }
    board.style.width = BOARD_SIZE + "px";
    board.style.height = BOARD_SIZE + "px";
    board.style.display = "flex";
    board.style.flexWrap = "wrap";
    board.style.alignContent = "baseline";
    board.style.backgroundColor = "gray";



    rowsElement.style.float = "left";
    rowsElement.style.height = BOARD_SIZE + "px";
    rowsElement.style.width = BOARD_SIZE/20 + "px";
    rowsElement.style.display = "flex";
    rowsElement.style.flexWrap = "wrap";
    rowsElement.style.alignContent = "baseline";
    rowsElement.style.flexDirection = "column";

    
    columnsElement.style.height = BOARD_SIZE/20 + "px";
    columnsElement.style.width = BOARD_SIZE + "px";
    columnsElement.style.display = "flex";
    columnsElement.style.flexWrap = "wrap";
    columnsElement.style.alignContent = "baseline";
    columnsElement.style.flexDirection = "column";

    loadInnerBoard(innerBoard, overlayBoard);
    loadWinningBoard(winningBoard);
    loadSquares(board);
    loadImages(board);
    loadRowsAndColumns(rowsElement, columnsElement);
    getKingPosition();
    return true;
}

function restartGame(){
    var chessBody = document.getElementById("chessBody");
    chessBody.innerHTML = originalHtml;

    highlighted = null;
    highlightedSecondary = null;
    whiteToMove = true;
    
    movesToRemove = []
    
    whiteKingPosition = "";
    blackKingPosition = "";
    
    whiteKingCheck = false;
    blackKingCheck = false;
    
    checkedBy = {knight: false, position: "", direction: "", piece: ""};

    loadBoard();
}


function loadInnerBoard(innerBoard, overlayBoard){
    innerBoard.style.position = "absolute";
    innerBoard.style.width = BOARD_SIZE + "px";
    innerBoard.style.height = BOARD_SIZE + "px";
    innerBoard.style.display = "flex";
    innerBoard.style.justifyContent = "center";
    innerBoard.style.alignItems = "center";
    innerBoard.style.zIndex = "9999999999";
    innerBoard.style.display = "none";


    overlayBoard.style.position = "absolute";
    overlayBoard.style.width = BOARD_SIZE + "px";
    overlayBoard.style.height = BOARD_SIZE + "px";
    overlayBoard.style.backgroundColor = "black";
    overlayBoard.style.opacity = "70%";
    overlayBoard.style.display = "none";

    var promoteContainer = document.createElement("div");
    promoteContainer.id = "promote";
    promoteContainer.style.width = "60%";
    promoteContainer.style.height = "60%";
    promoteContainer.style.display = "flex";
    promoteContainer.style.flexWrap = "wrap";
    promoteContainer.style.gap = "60px";

    promoteContainer.appendChild(createPromotionTab("bQ"));
    promoteContainer.appendChild(createPromotionTab("bB"));
    promoteContainer.appendChild(createPromotionTab("bN"));
    promoteContainer.appendChild(createPromotionTab("bR"));

    promoteContainer.appendChild(createPromotionTab("wQ"));
    promoteContainer.appendChild(createPromotionTab("wB"));
    promoteContainer.appendChild(createPromotionTab("wN"));
    promoteContainer.appendChild(createPromotionTab("wR"));

    innerBoard.appendChild(promoteContainer);
}


function loadWinningBoard(winningBoard){
    
    winningBoard.style.position = "absolute";
    winningBoard.style.width = BOARD_SIZE + "px";
    winningBoard.style.height = BOARD_SIZE + "px";
    winningBoard.style.display = "flex";
    winningBoard.style.justifyContent = "center";
    winningBoard.style.alignItems = "center";
    winningBoard.style.flexDirection = "column";
    winningBoard.style.color = "white";
    winningBoard.style.fontSize = BOARD_SIZE / 25 + "px"; ;
    winningBoard.style.zIndex = "9999999999";
    winningBoard.style.display = "none";

    var header = document.createElement("span");
    header.id = "winningBoardHeader";
    header.innerHTML = "";
    header.style.textShadow = "2px 2px #000000";
    header.style.fontWeight = "bold";
     var buttonsContainer = document.createElement("div");
    buttonsContainer.id = "buttons";
    buttonsContainer.style.width = "60%";
    buttonsContainer.style.height = "60%";
    buttonsContainer.style.display = "flex";
    buttonsContainer.style.flexWrap = "wrap";
    buttonsContainer.style.justifyContent = "center";
    buttonsContainer.style.alignItems = "center";
    buttonsContainer.style.gap = "60px";

    buttonsContainer.appendChild(createButton("Restart", "restartGame()", "red", "white"));

    winningBoard.appendChild(header);
    winningBoard.appendChild(buttonsContainer);

}


function createButton(text, onCallFunction, color, textColor) {
    var element = document.createElement("div");
    element.innerHTML = text;
    element.style.width = BOARD_SIZE / 4 + "px";
    element.style.height = BOARD_SIZE / 10 + "px";
    element.style.display = "flex";
    element.style.justifyContent = "center";
    element.style.alignItems = "center";
    element.style.borderRadius = "20px";
    element.style.backgroundColor = color;
    element.style.color = textColor;
    element.style.fontWeight = "bold";
    element.style.fontSize = BOARD_SIZE / 25 + "px";
    element.style.boxShadow = "rgb(136, 136, 136) 0px 5px 45px 5px";
    element.style.opacity = "100%";
    element.setAttribute("onclick", onCallFunction);

   
    return element;
}


function createPromotionTab(piece) {
    var element = document.createElement("div");
    element.style.width = BOARD_SIZE / 4 + "px";
    element.style.height = BOARD_SIZE / 4 + "px";
    element.style.display = "flex";
    element.style.justifyContent = "center";
    element.style.alignItems = "center";
    element.style.borderRadius = "20px";
    element.style.backgroundColor = "white";
    element.style.boxShadow = "rgb(136, 136, 136) 0px 5px 45px 5px";
    element.style.opacity = "100%";
    element.id = piece + "Promotion";
    element.setAttribute("onclick", "promotePiece('" + piece + "')");


    var img = document.createElement("img");
    img.src = "./images/" + piece + ".png";
    img.style.width = BOARD_SIZE / 6 + "px";
    img.style.height = BOARD_SIZE / 6 + "px";
    img.setAttribute("piece", piece);
    
    element.appendChild(img);
    return element;
}

function showPromotionOptions(isWhite){
    document.getElementById("innerBoard").style.display = "flex";
    document.getElementById("overlayBoard").style.display = "flex";

    showBox("QPromotion", isWhite);
    showBox("NPromotion", isWhite);
    showBox("RPromotion", isWhite);
    showBox("BPromotion", isWhite);
}

function hidePromotionOptions(){
    document.getElementById("innerBoard").style.display = "none";
    document.getElementById("overlayBoard").style.display = "none";
}


function showBox(piece, isWhite){
    var color = isWhite ? "w" : "b";
    var enemyColor = isWhite ? "b" : "w";
    document.getElementById(color + piece).style.display = "flex";
    document.getElementById(enemyColor + piece).style.display = "none";
}


function loadRowsAndColumns(rowsElement, columnsElement){
    for(var i = rows.length; i > 0; i--){
       var row = document.createElement("div");
       row.style.height = SQUARE_SIZE + "px";
       row.style.width = BOARD_SIZE/20 + "px";
       row.style.display = "flex";
       row.style.alignItems = "center";
       row.style.justifyContent = "center";
       row.style.backgroundColor = "#52141487";
       row.style.fontSize = SQUARE_SIZE/3.5 +  "px";
       row.style.fontWeight = "bold";
       row.innerHTML = "<p>" + (i) + "</p>";
       rowsElement.appendChild(row);
    }

    var tempColumn = document.createElement("div");
    tempColumn.style.width = SQUARE_SIZE/2.5 + "px";
    tempColumn.style.height = BOARD_SIZE/20 + "px";
    tempColumn.style.backgroundColor = "#52141487";
    columnsElement.appendChild(tempColumn);
    for(var i = 0; i < columns.length; i++){
        var column = document.createElement("div");
        column.style.height = BOARD_SIZE/20 + "px";
        column.style.width = SQUARE_SIZE + "px";
        column.style.display = "flex";
        column.style.alignItems = "center";
        column.style.justifyContent = "center";
        column.style.backgroundColor = "#52141487";
        column.style.fontSize = SQUARE_SIZE/3.5 +  "px";
        column.style.fontWeight = "bold";
        column.innerHTML = "<p>" + columnsToNotation(i) + "</p>";
        columnsElement.appendChild(column);
     }
}

function loadSquares(board){
    var reverse = true;
    for(var i = 0; i < rows.length; i++){
        for(var j = 0; j < columns.length; j++){
            reverse = !reverse;
            loadSquare(board, i, j, reverse);
        }
        reverse = !reverse;
    }
}

function loadSquare(board, row, column, reverse){
    var square = document.createElement("div");
    square.style.width = SQUARE_SIZE + "px";
    square.style.height = SQUARE_SIZE + "px";
    square.id =  columns[column] + rows[row];
    square.style.backgroundColor = reverse ?
    DARK_COLOR : LIGHT_COLOR;

    var squareMoveable = document.createElement("div");
    squareMoveable.style.width = SQUARE_SIZE + "px";
    squareMoveable.style.height = SQUARE_SIZE + "px";
    squareMoveable.style.position = "absolute";
    squareMoveable.style.display = "flex";
    squareMoveable.style.alignItems = "center";
    squareMoveable.style.justifyContent = "center";

    var squareMoveableDot = document.createElement("div");
    squareMoveableDot.style.width = SQUARE_SIZE/4 + "px";
    squareMoveableDot.style.height = SQUARE_SIZE/4 + "px";
    squareMoveableDot.id =  (columns[column] + rows[row]) + "Dot";
    squareMoveableDot.style.backgroundColor = "black";
    squareMoveableDot.style.borderRadius = "50px";
    squareMoveableDot.style.display = "none";
    squareMoveableDot.style.opacity = "50%";

    
    squareMoveable.appendChild(squareMoveableDot);
    square.appendChild(squareMoveable);

    square.setAttribute("onclick", "highlightSquare(this, " + !reverse + ", event)");
    square.setAttribute("oncontextmenu", "highlightSquare(this, " + !reverse + ", event); return false");
    
    board.appendChild(square);

}


function loadImages(){
    for(var i = 0; i < rows.length; i++){
        for(var j = 0; j < columns.length; j++){
         var img = document.createElement("img");
         img.style.width = SQUARE_SIZE + "px";
         img.style.height = SQUARE_SIZE + "px";
         loadImage(img, i, j);
        }
    }
}

function loadImage(img, row, column){
    if(BOARD_PIECES[row][column] == "" || BOARD_PIECES[row][column] == "--"){
        return;
    }
    img.src = "./images/" + BOARD_PIECES[row][column] + ".png";
    img.setAttribute("piece", BOARD_PIECES[row][column]);
    img.setAttribute("position", columns[column] + rows[row]);
    img.setAttribute("firstTime", "true");
    var square = document.getElementById(columns[column] + rows[row]);
    square.appendChild(img);
}




function showOverlay(show){
    document.getElementById("overlayBoard").style.display = show ? "flex" : "";
}


function showWinningBoard(show){
    document.getElementById("winningBoard").style.display = show ? "flex" : "";
}

function setHeader(text){
    document.getElementById("winningBoardHeader").innerText = text;
}




function generatePositions() {
    var test = "["
    for(var i = 0; i < rows.length; i++){
        for(var j = 0; j < columns.length; j++){
            if(j == 0 && i == 0){
                test += `   [`
            } else if(j == 0){
                test += `    [`
            }
            var pieceFound = getPiece(document.getElementById(columns[j] + rows[i]));
            if(pieceFound != null){
                test += `"${pieceFound.piece}", `
            } else {
                test += `"--", `
            }
        }
        test= test.substring(0, test.length - 2);
        test += `],\n`
    }
    test += "];";



    document.getElementById('generatePositions').value = test;
}