const assert = require('chai').assert;

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
        it("throws error on unknown piece",()=>{
            assert.throws(()=>{
                const tmp_board = drawer.drawPiece(drawer.createCanvas(),"X",1,1);    
            },/Unknown Piece: \w$/);
        });
        it("throws error on coordinates below 0",()=>{
            assert.throws(()=>{
                const tmp_board = drawer.drawPiece(drawer.createCanvas(),"P",-1,1);
            },/Wrong coordinates: \(.*;.*\)$/);
        });
        it("throws error on coordinates above 7",()=>{
            assert.throws(()=>{
                const tmp_board = drawer.drawPiece(drawer.createCanvas(),"P",1,8);    
            },/Wrong coordinates: \(.*;.*\)$/);
        });
    });
});