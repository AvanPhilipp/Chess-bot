const config = require("./local.config");
const Discord = require("discord.js");
const chess = require("./chess");


const client = new Discord.Client();
const token = config.discordToken;

const PREFIX = "chess ";

client.on('ready', ()=>{console.log("Chessbot online");});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

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
            board = chess.init();
            boardCanvas = new Discord.MessageAttachment(board.canvas.toBuffer(),"Start.png");
            msg.channel.send('New Chess game started', boardCanvas);
            break;
        case "cont":
            FEN = args[1]+" "+args[2]+" "+args[3]+" "+args[4]+" "+args[5]+" "+args[6];
            board = chess.displayBoard(chess.newGame(FEN));
            boardCanvas = new Discord.MessageAttachment(board.canvas.toBuffer(),"act.png");
            msg.channel.send('Chess game resumes', boardCanvas);
            break;
        case "test":
            board = chess.displayBoard(chess.moveInGame(chess.newGame(), chess.moveCalc("d4")));
            boardCanvas = new Discord.MessageAttachment(board.canvas.toBuffer(),"act.png");
            msg.channel.send('Chess game resumes', boardCanvas);
            break;
        case "gameTest":
            chess.animate();
            break;
        default:
            msg.channel.send("Unknown command");
            break;
    }
});

client.login(token);