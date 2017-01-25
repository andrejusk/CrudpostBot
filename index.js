/* Imports */
/* Discord bot */
const Discord = require('discord.js');
const client = new Discord.Client();
/* Console colors */
var colors = require('colors');

/* Bot token */
const token = process.argv[2];

/* Prompts */
const prompts = require("./imports/prompts.js");


/* On ready */
client.on('ready', () => {
    prompts.setupPrompts(client);
    prompts.changeStatus(client.user);
    
    process.stdout.write('\033c');
    console.log("[LOG]".bgCyan + " Bot initialized.");
});

/* Start */
client.login(token);