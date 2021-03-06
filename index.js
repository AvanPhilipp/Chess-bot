const config = require("./local.config");
const Discord = require("discord.js");
const chess = require("./chess");
const drawer = require("./chess.drawer");


const client = new Discord.Client();
const token = config.discordToken;

const PREFIX = "chess ";

client.on('ready', ()=>{console.log("Chessbot online");});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
    // if(msg.content === 'print'){
    //     console.log(msg.author);
    //     msg.reply(" data printed");
    // }
    // if(msg.mentions){
    //     console.log(msg.mentions);
    // }
});

let GAME;

client.on('message', (msg)=>{
    if(!msg.content.startsWith(PREFIX)) return;
    let args = msg.content.substring(PREFIX.length).split(" ");

    let board;
    let boardCanvas;
    let FEN;
    
    switch (args[0]) {
        case "Hello":
            msg.channel.send("Hello");
            break;
        case "new":
            GAME = chess.newGame();
            board = drawer.displayBoard(GAME);
            boardCanvas = new Discord.MessageAttachment(board.canvas.toBuffer(),"Start.png");
            msg.channel.send('New Chess game started', boardCanvas);
            break;
        case "cont":
            FEN = args[1]+" "+args[2]+" "+args[3]+" "+args[4]+" "+args[5]+" "+args[6];
            board = chess.displayBoard(chess.newGame(FEN));
            boardCanvas = new Discord.MessageAttachment(board.canvas.toBuffer(),"act.png");
            msg.channel.send('Chess game resumes', boardCanvas);
            break;
        // case "gameTest":
        //     chess.animate();
        //     break;
        case "move":
            try {
                chess.moveInGame(GAME, chess.moveCalc(args[1]));
                board = drawer.displayBoard(GAME);
                boardCanvas = new Discord.MessageAttachment(board.canvas.toBuffer(),"Start.png");
                msg.channel.send('Nexp Player: ' + (GAME.nextPlayer == "w"?"White":"Black"), boardCanvas);
            } catch (error) {
                msg.reply(""+error);
            }
            break;
        default:
            msg.channel.send("Unknown command");
            break;
    }
});

client.login(token);