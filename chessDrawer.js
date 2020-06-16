const Canvas = require('canvas');
const fs = require('fs');

const config = require('./chess.config');


const drawer = {};

drawer.createCanvas = function(){
    const canvas = Canvas.createCanvas(900,900);
    const context = canvas.getContext('2d');
    
    return context;
}

drawer.drawBoard = function(context){
    context.fillStyle = "#333";
    context.fillRect(0, 0, 900, 900);

    for (let width = 0; width < 8; width++) {
        for (let height = 0; height < 8; height++) {
            context.fillStyle = (height + width) % 2 ? config.chessWhite : config.chessBlack; 
            context.fillRect((100*width)+50, (100*height)+50, 100, 100);
        }
    }

    context.fillStyle = "#FFF";
    context.font = "bold 30px verdana";
    context.fillText("A",  90, 40);
    context.fillText("B", 190, 40);
    context.fillText("C", 290, 40);
    context.fillText("D", 390, 40);
    context.fillText("E", 490, 40);
    context.fillText("F", 590, 40);
    context.fillText("G", 690, 40);
    context.fillText("H", 790, 40);

    context.fillText("A",  90, 890);
    context.fillText("B", 190, 890);
    context.fillText("C", 290, 890);
    context.fillText("D", 390, 890);
    context.fillText("E", 490, 890);
    context.fillText("F", 590, 890);
    context.fillText("G", 690, 890);
    context.fillText("H", 790, 890);

    context.fillText("8", 15, 115);
    context.fillText("7", 15, 215);
    context.fillText("6", 15, 315);
    context.fillText("5", 15, 415);
    context.fillText("4", 15, 515);
    context.fillText("3", 15, 615);
    context.fillText("2", 15, 715);
    context.fillText("1", 15, 815);
    
    context.fillText("8", 865, 115);
    context.fillText("7", 865, 215);
    context.fillText("6", 865, 315);
    context.fillText("5", 865, 415);
    context.fillText("4", 865, 515);
    context.fillText("3", 865, 615);
    context.fillText("2", 865, 715);
    context.fillText("1", 865, 815);

    context.save();
}

drawer.drawPiece = function(context, piece, pos_x, pos_y){
    const sprites = new Canvas.Image();
    sprites.src = "./asset/Chess_Pieces_Sprite.png";
    switch (piece) {
        case "K":
            context.drawImage(sprites, 0,0,100,100,50+(pos_x*100),50+(pos_y*100),100,100);
            break;
        case "Q":
            context.drawImage(sprites, 100,0,100,100,50+(pos_x*100),50+(pos_y*100),100,100);
            break;
        case "B":
            context.drawImage(sprites, 200,0,100,100,50+(pos_x*100),50+(pos_y*100),100,100);
            break;
        case "N":
            context.drawImage(sprites, 300,0,100,100,50+(pos_x*100),50+(pos_y*100),100,100);
            break;
        case "R":
            context.drawImage(sprites, 400,0,100,100,50+(pos_x*100),50+(pos_y*100),100,100);
            break;
        case "P":
            context.drawImage(sprites, 500,0,100,100,50+(pos_x*100),50+(pos_y*100),100,100);
            break;
        case "k":
            context.drawImage(sprites, 0,100,100,100,50+(pos_x*100),50+(pos_y*100),100,100);
            break;
        case "q":
            context.drawImage(sprites, 100,100,100,100,50+(pos_x*100),50+(pos_y*100),100,100);
            break;
        case "b":
            context.drawImage(sprites, 200,100,100,100,50+(pos_x*100),50+(pos_y*100),100,100);
            break;
        case "n":
            context.drawImage(sprites, 300,100,100,100,50+(pos_x*100),50+(pos_y*100),100,100);
            break;
        case "r":
            context.drawImage(sprites, 400,100,100,100,50+(pos_x*100),50+(pos_y*100),100,100);
            break;
        case "p":
            context.drawImage(sprites, 500,100,100,100,50+(pos_x*100),50+(pos_y*100),100,100);
            break;
        default:
            throw new Error("Unknown Piece");
    }
}

module.exports = drawer;

// const board = drawer.createCanvas();
// drawer.drawBoard(board.context);

// drawer.drawPiece(board.context,"r",0,0);
// drawer.drawPiece(board.context,"n",1,0);
// drawer.drawPiece(board.context,"b",2,0);
// drawer.drawPiece(board.context,"k",3,0);
// drawer.drawPiece(board.context,"q",4,0);
// drawer.drawPiece(board.context,"b",5,0);
// drawer.drawPiece(board.context,"n",6,0);
// drawer.drawPiece(board.context,"r",7,0);
// drawer.drawPiece(board.context,"p",0,1);
// drawer.drawPiece(board.context,"p",1,1);
// drawer.drawPiece(board.context,"p",2,1);
// drawer.drawPiece(board.context,"p",3,1);
// drawer.drawPiece(board.context,"p",4,1);
// drawer.drawPiece(board.context,"p",5,1);
// drawer.drawPiece(board.context,"p",6,1);
// drawer.drawPiece(board.context,"p",7,1);

// drawer.drawPiece(board.context,"R",0,7);
// drawer.drawPiece(board.context,"N",1,7);
// drawer.drawPiece(board.context,"B",2,7);
// drawer.drawPiece(board.context,"K",3,7);
// drawer.drawPiece(board.context,"Q",4,7);
// drawer.drawPiece(board.context,"B",5,7);
// drawer.drawPiece(board.context,"N",6,7);
// drawer.drawPiece(board.context,"R",7,7);
// drawer.drawPiece(board.context,"P",0,6);
// drawer.drawPiece(board.context,"P",1,6);
// drawer.drawPiece(board.context,"P",2,6);
// drawer.drawPiece(board.context,"P",3,6);
// drawer.drawPiece(board.context,"P",4,6);
// drawer.drawPiece(board.context,"P",5,6);
// drawer.drawPiece(board.context,"P",6,6);
// drawer.drawPiece(board.context,"P",7,6);

// var out = fs.createWriteStream('./state.png'), stream = board.canvas.createPNGStream();

// stream.on('data', function(chunk){
//   out.write(chunk);
// });