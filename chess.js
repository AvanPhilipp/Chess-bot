// const assert = require('chai').assert;
const Canvas = require('canvas');
const fs = require('fs');
const drawer = require('./chessDrawer');

console.log("Game starts");

module.exports = {
init: function(){
    console.log("init(); called");
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
        let peace_array = rank.split('');
        // console.log(peace_array);
        let file = [];
        peace_array.forEach((obj)=>{
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

    // console.log(GAME);
    // console.log("FEN parsed");
    return GAME;
},

moveCalc: function(){

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