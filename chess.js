// const assert = require('chai').assert;
const drawer = require('./chess.drawer');
const utils = require('./chess.utils');

console.log("Game starts");

const chess = {};

chess.init= function(){
    // console.log("init(); called");
    const GAME = this.newGame();
    return drawer.displayBoard(GAME);
};

chess.newGame= function(FENData) {
    let GAME;
    if(FENData)
        GAME = this.FENconverter(FENData);
    else
        GAME = this.FENconverter("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
        // GAME = this.FENconverter("4k3/8/8/8/8/8/8/4K3 w KQkq - 0 1");
    return GAME;
}

// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
chess.FENconverter= function (FENdata){
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
        let tmp_rank = [];
        piece_array.forEach((obj)=>{
            // console.log(obj);
            let num = parseInt(obj);
            // console.log(num);
            if(isNaN(num)){
                tmp_rank.push(obj);
                // console.log('NaN');
            }
            else{
                for (let index = 0; index < num; index++) {
                    tmp_rank.push('e');
                }
                // console.log("number")
            }
        });
        if(tmp_rank.length !== 8)
            throw new Error("Input not correct. Incorrect number of file: " + tmp_rank.length);
        // console.log(tmp_rank);
        return tmp_rank;
    });
    GAME.table = utils.transpose(GAME.table);
    // printBoard(GAME);
    // console.log(GAME);

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
    // if(!GAME.castling.whiteQueen)
    //     GAME.castling.whiteQueen = false;
    // if(!GAME.castling.whiteKing)
    //     GAME.castling.whiteKing = false;
    // if(!GAME.castling.blackQueen)
    //     GAME.castling.blackQueen = false;
    // if(!GAME.castling.blackKing)
    //     GAME.castling.blackKing = false;
    // // console.log(GAME.castling);

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
    GAME.pieces = this.getPieces(GAME);
    // console.log(GAME);
    return GAME;
},

chess.getPieces= function(GAME){
    const PIECES = {};
    PIECES.white = [];
    PIECES.black = [];
    GAME.table.forEach((rank, x_index)=>{
        rank.forEach((piece,y_index)=>{
            switch (piece) {
                case "K":
                    PIECES.white.push({piece: "K", x: x_index,y: y_index});
                    break;
                case "Q":
                    PIECES.white.push({piece: "Q", x: x_index,y: y_index});
                    break;
                case "B":
                    PIECES.white.push({piece: "B", x: x_index,y: y_index});
                    break;
                case "N":
                    PIECES.white.push({piece: "N", x: x_index,y: y_index});
                    break;
                case "R":
                    PIECES.white.push({piece: "R", x: x_index,y: y_index});
                    break;
                case "P":
                    PIECES.white.push({piece: "P", x: x_index,y: y_index});
                    break;
                case "k":
                    PIECES.black.push({piece: "k", x: x_index,y: y_index});
                    break;
                case "q":
                    PIECES.black.push({piece: "q", x: x_index,y: y_index});
                    break;
                case "b":
                    PIECES.black.push({piece: "b", x: x_index,y: y_index});
                    break;
                case "n":
                    PIECES.black.push({piece: "n", x: x_index,y: y_index});
                    break;
                case "r":
                    PIECES.black.push({piece: "r", x: x_index,y: y_index});
                    break;
                case "p":
                    PIECES.black.push({piece: "p", x: x_index,y: y_index});
                    break;
                case "e":
                    break;
                default:
                    throw new Error("Unknown Piece: " + piece);
            }
        });
    });
    return PIECES;
},

chess.moveCalc= function(moveString){
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

chess.searchPiece = function(GAME, MOVE){
    if(!MOVE.from)
        MOVE.from = {};

    const moveFileIDX = utils.FILES[MOVE.moves.file]-1;
    const moveRankIDX = 8-MOVE.moves.rank;

    if(MOVE.piece === "P"){
        if(!MOVE.from.file){

            console.log("no File");
            MOVE.from.file = MOVE.moves.file;
        }
        if((MOVE.moves.rank === 4) && GAME.nextPlayer==="w") {

            console.log("white R4");
            if(GAME.table[moveFileIDX][3]){
                MOVE.moves.rank = 3;}
            else
                MOVE.moves.rank =2;
            return MOVE;
        }
        if(MOVE.moves.rank === 5 && GAME.nextPlayer==="b"){

            console.log("black R5");
            if(GAME.table[moveFileIDX][6])
                MOVE.moves.rank = 6;
            else
                MOVE.moves.rank =7;
            return MOVE;
        }

        console.log("otherwhise");
        MOVE.from.rank = GAME.nextPlayer == "w" ? MOVE.moves.rank-1 : MOVE.moves.rank+1

            
    }
    if(MOVE.piece === "N"){
        
    }
    if(MOVE.piece === "B"){
        
    }
    if(MOVE.piece === "Q"){
        
    }
    if(MOVE.piece === "K"){
        const actualPiece = (GAME.nextPlayer==="w") ? "K":"k";
        // let toPrint = "";
        for (let fileIndex = moveFileIDX-1; fileIndex <= moveFileIDX+1; fileIndex++) {
            for (let rankIndex = moveRankIDX-1; rankIndex <= moveRankIDX+1; rankIndex++) {
                if(GAME.table[fileIndex][rankIndex] === actualPiece){
                    MOVE.from.file = utils.deFILE(fileIndex+1);
                    MOVE.from.rank = 8-rankIndex;
                }
                // toPrint = toPrint.concat(GAME.table[fileIndex][rankIndex]);
            }   
            // toPrint = toPrint.concat('\n');
        }
        // console.log(toPrint);
    }
    // console.log(MOVE);
    if(!MOVE.from || !MOVE.from.rank)
        throw new Error("Illegal Move: ");
    return MOVE;
}

chess.moveInGame = function(GAME, MOVE){
    // console.log(MOVE);
    const moveFileIDX = utils.FILES[MOVE.moves.file]-1;
    const moveRankIDX = 8-MOVE.moves.rank;
    let fromFileIDX;
    let fromRankIDX;
    if(!MOVE.from || !MOVE.from.rank){
        this.searchPiece(GAME, MOVE);
    }

    MOVE.piece = GAME.nextPlayer === "w" ? MOVE.piece.toUpperCase() : MOVE.piece.toLowerCase();
    console.log(MOVE);
    fromFileIDX = utils.FILES[MOVE.from.file]-1;
    if(MOVE.from.rank){
        fromRankIDX = 8-MOVE.from.rank;
        GAME.table[fromFileIDX][fromRankIDX] = "e";
    }
    else{
        GAME.table[fromFileIDX][GAME.table[fromFileIDX].indexOf(MOVE.piece)] = "e";
    }
    GAME.table[moveFileIDX][moveRankIDX] = MOVE.piece;

    GAME.nextPlayer = GAME.nextPlayer === "w" ? "b" : "w";

    return GAME;
}

const validMoves = require("./test/test.config").validMoves;

module.exports = chess;
//  this.FENconverter("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

// const GAME = chess.newGame("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
// utils.printBoard(GAME);
// chess.moveInGame(GAME, chess.moveCalc("Bcf4"));
// utils.printBoard(GAME);
// chess.moveInGame(GAME, chess.moveCalc("e4"));
// console.log(GAME.table);
// utils.printBoard(GAME);
// chess.moveInGame(GAME, chess.moveCalc("d3"));
// utils.printBoard(GAME);
// chess.moveInGame(GAME, chess.moveCalc("Bcf6"));
// utils.printBoard(GAME);
// validMoves.forEach((move)=>{
//     this.moveInGame(this.newGame(), this.moveCalc(move));
//     printBoard();
// });