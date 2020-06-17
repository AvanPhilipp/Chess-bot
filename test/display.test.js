const chess = require('../chess');
const drawer = require('../chess.drawer');
const utils = require('../chess.utils');
const Canvas = require('canvas');
const fs = require('fs');
const FENStrings = require('./test.config').FENStrings;
const doRender = require('./test.config').doRender;

FENStrings.forEach((FEN, index)=>{
    const GAME = chess.newGame(FEN);
    const board = drawer.displayBoard(GAME);
    
    utils.ASCIIBoard(GAME);

    if(doRender){
        let out = fs.createWriteStream('./test/img/state_'+ index+'.png'),
            stream = board.canvas.createPNGStream();
        
        stream.on('data', function(chunk){ out.write(chunk); });
    }
});