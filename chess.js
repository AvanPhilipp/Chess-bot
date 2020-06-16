// const assert = require('chai').assert;
const Canvas = require('canvas');
const fs = require('fs');
const drawer = require('./chessDrawer');

console.log("Game starts");

module.exports = {
init: function(){
    // console.log("init(); called");
    return 1;
},

// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
FENconverter: function (FENdata){
    // console.log(FENdata);
    const FENargs = FENdata.split(' ');
    const GAME = {};
    // console.log(FENargs);
    if(FENargs.length !== 6)
        throw new Error("Input not correct. 6 arguments expected, recived " + FENargs.length);
    // assert.equal(, "Input not correct. Arguments ");

    const table = FENargs[0].split('/');
    if(table.length !== 8)
        throw new Error("Input not correct. Incorrect number of ranks: " + table.length);

    GAME.table = table.map((rank)=>{
        // console.log(rank);
        let piece_array = rank.split('');
        // console.log(piece_array);
        let file = [];
        piece_array.forEach((obj)=>{
            // console.log(obj);
            let num = parseInt(obj);
            // console.log(num);
            if(isNaN(num)){
                file.push(obj);
                // console.log('NaN');
            }
            else{
                for (let index = 0; index < num; index++) {
                    file.push('e');
                }
                // console.log("number")
            }
        });
        // console.log(temp_table);
        if(file.length !== 8)
            throw new Error("Input not correct. Incorrect number of file: " + file.length);
           
        return file;
    });

    GAME.nextPlayer = FENargs[1];
    if((GAME.nextPlayer !== 'b') && (GAME.nextPlayer !== 'w'))
        throw new Error("Input not correct. Unknown player: " + GAME.nextPlayer);
        
    GAME.castling = {};
    const castlingArgs = FENargs[2].split('');
    castlingArgs.forEach((opt)=>{
        switch (opt) {
            case 'Q':
                GAME.castling.whiteQueen = true;
                break;
            case 'K':
                GAME.castling.whiteKing = true;
                break;
            case 'q':
                GAME.castling.blackQueen = true;
                break;
            case 'k':
                GAME.castling.blackKing = true;
                break;
        }
    });
    if(!GAME.castling.whiteQueen)
        GAME.castling.whiteQueen = false;
    if(!GAME.castling.whiteKing)
        GAME.castling.whiteKing = false;
    if(!GAME.castling.blackQueen)
        GAME.castling.blackQueen = false;
    if(!GAME.castling.blackKing)
        GAME.castling.blackKing = false;
    // console.log(GAME.castling);

    GAME.enPassant = {};
    const enPassantargs = FENargs[3].split('');
    if(enPassantargs[0] == '-'){
        GAME.enPassant.file = null;
        GAME.enPassant.rank = null;
    }else{
        GAME.enPassant.file = enPassantargs[0];
        GAME.enPassant.rank = parseInt(enPassantargs[1]);
    }
    // console.log(GAME.enPassant);

    GAME.fiftyMove = parseInt(FENargs[4]);
    if(isNaN(GAME.fiftyMove))
        throw new Error("Input not correct. Halfmoves must be an integer: " + GAME.fiftyMove);
    
    GAME.moves = parseInt(FENargs[5]);
    if(isNaN(GAME.moves))
        throw new Error("Input not correct. Fullmoves must be an integer: " + GAME.moves);

    // console.log("FEN parsed");
    this.getPieces(GAME);
    // console.log(GAME);
    return GAME;
},

getPieces: function(GAME){
    GAME.whitePieces = [];
    GAME.blackPieces = [];
    GAME.table.forEach((rank, x_index)=>{
        rank.forEach((piece,y_index)=>{
            switch (piece) {
                case "K":
                    GAME.whitePieces.push({piece: "K", x: x_index,y: y_index});
                    break;
                case "Q":
                    GAME.whitePieces.push({piece: "Q", x: x_index,y: y_index});
                    break;
                case "B":
                    GAME.whitePieces.push({piece: "B", x: x_index,y: y_index});
                    break;
                case "N":
                    GAME.whitePieces.push({piece: "N", x: x_index,y: y_index});
                    break;
                case "R":
                    GAME.whitePieces.push({piece: "R", x: x_index,y: y_index});
                    break;
                case "P":
                    GAME.whitePieces.push({piece: "P", x: x_index,y: y_index});
                    break;
                case "k":
                    GAME.blackPieces.push({piece: "k", x: x_index,y: y_index});
                    break;
                case "q":
                    GAME.blackPieces.push({piece: "q", x: x_index,y: y_index});
                    break;
                case "b":
                    GAME.blackPieces.push({piece: "b", x: x_index,y: y_index});
                    break;
                case "n":
                    GAME.blackPieces.push({piece: "n", x: x_index,y: y_index});
                    break;
                case "r":
                    GAME.blackPieces.push({piece: "r", x: x_index,y: y_index});
                    break;
                case "p":
                    GAME.blackPieces.push({piece: "p", x: x_index,y: y_index});
                    break;
                case "e":
                    break;
                default:
                    throw new Error("Unknown Piece");
            }
        });
    });
    return GAME;
},

moveCalc: function(moveString){
    // console.log("moveString: ",moveString);
    const move = {};
    if(moveString.includes("e.p.")){
        move.enPassant = true;
        moveString = moveString.replace("e.p.","");
    }
    // console.log("enPassant removed: ",moveString);
    const moveArgs = moveString.split('');
    // console.log("moveArgs: ",moveArgs);
    if(moveArgs[moveArgs.length-1]==="+"){
        move.check = true;
        moveArgs.splice(moveArgs.length-1,1);
    }
    if(moveArgs[moveArgs.length-1]==="#"){
        move.mate = true;
        moveArgs.splice(moveArgs.length-1,1);
    }
    // console.log("Check/Mate spliced: ",moveArgs);

    if(moveArgs.includes("=")){
        move.promote = moveArgs[moveArgs.indexOf("=")+1];
        moveArgs.splice(moveArgs.length-2,);
    }
    // console.log("Promote spliced: ",moveArgs);


    if(moveArgs[0] === "O"){
        if(moveString.match(/O-O-O[+#]?$/)){
            move.castle = "Queen";
            // console.log(move);
            return move;
        }
        else if(moveString.match(/O-O[+#]?$/)){
            move.castle = "King";
            // console.log(move);
            return move;
        }
        else
            throw new Error("Wrong move format: " + moveString);
    }
    else if(moveArgs[0] === "K" ||
        moveArgs[0] === "Q" ||
        moveArgs[0] === "R" ||
        moveArgs[0] === "B" ||
        moveArgs[0] === "N"){
        move.piece = moveArgs[0];
        moveArgs.splice(0,1);
    }
    else{
        move.piece = "P";
    }
    // console.log("Piece spliced: ",moveArgs);

    // console.log(moveArgs.indexOf("x"));
    if(moveArgs.includes("x")){
        move.take = true;
        moveArgs.splice(moveArgs.indexOf("x"),1);
    }


    if(moveArgs.length === 2){
        move.moves = {};
        move.moves.file = moveArgs[0];
        move.moves.rank = parseInt(moveArgs[1],10);
    }
    else if(moveArgs.length === 3){
        move.from = {};
        move.from.file = moveArgs[0];
        move.moves = {};
        move.moves.rank = parseInt(moveArgs[2],10);
        move.moves.file = moveArgs[1];
    }
    else if(moveArgs.length === 4){
        move.from = {};
        move.from.file = moveArgs[0];
        move.from.rank = parseInt(moveArgs[1],10);
        move.moves = {};
        move.moves.file = moveArgs[2];
        move.moves.rank = parseInt(moveArgs[3],10);
    }
    else{
        throw new Error("Wrong move format: " + moveString);
    }
    // console.log("final: ",move);
    return move;
},

displayBoard: function(FEN){
    const GAME = this.FENconverter(FEN);
    const board = drawer.createCanvas();
    drawer.drawBoard(board.context);
    GAME.table.forEach((rank,x_index)=>{
        rank.forEach((file,y_index)=>{
            if(file !== 'e') {
                drawer.drawPiece(board.context,file,y_index,x_index);
            }
        });
    });
    return board;
}

}