const config = require("./local.config");
const Discord = require("discord.js");
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
    let args = msg.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case "Hello":
            msg.channel.send("Hello");
            break;
    
        default:
            // msg.channel.send("Wannaplay??");
            break;
    }
});

client.login(token);