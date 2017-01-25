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
prompts.setupPrompts(client);


/* On ready */
client.on('ready', () => {
    console.log("[LOG]".bgCyan + " Bot initialized.");
});

/* Start */
client.login(token);