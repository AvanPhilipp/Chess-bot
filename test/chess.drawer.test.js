const chess = require('../chess');
const drawer = require('../chess.drawer');
const utils = require('../chess.utils');
const fs = require('fs');
const FENStrings = require('./test.config').FENStrings;
const doRender = require('./test.config').doRender;


describe('display test',()=>{
    FENStrings.forEach((FEN, index)=>{
        const GAME = chess.newGame(FEN);
        const board = drawer.displayBoard(GAME);
        
        // utils.printBoard(GAME);

        if(doRender){
            let out = fs.createWriteStream('./test/img/state_'+ index+'.png'),
                stream = board.canvas.createPNGStream();
            
            stream.on('data', function(chunk){ out.write(chunk); });
        }
    });
    describe("drawPiece(context, piece, pos_x, pos_y)",()=>{

    });
});