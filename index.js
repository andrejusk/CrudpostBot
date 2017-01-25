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
const fun_stuff = require("./imports/fun_stuff.js");

/* On ready */
client.on('ready', () => {
    process.stdout.write('\033c');

    prompts.setupPrompts(client);
    fun_stuff.changeStatus(client.user);
    
    console.log("[LOG]".bgCyan + " Bot initialized.");
});

/* Start */
client.login(token);