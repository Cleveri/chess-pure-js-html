var piecesMoves = [];


function registerMove(oldPosition, newPosition, piece, firstTime, captured, pieceCaptured){
    console.log("moved  from: " + oldPosition);
    console.log("moved  to  : " + newPosition);
    console.log("first Move : " + firstTime);
    console.log(piece);
    if(captured){
        console.log(pieceCaptured);
    }
}