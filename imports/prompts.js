const file_handler = require("../imports/file_handler.js");
const states = [
    "Linkin Park",
    "Half-Life 3",
    "their mixtape",
    "Stack Overflow"
];
/** Sets up listener to listen for messages.
 * Also implements handlers for commands.
 */
function setupPrompts(client) {

    /* On message received */
    client.on("message", message => {

        /* Ignores own messages */
        if(message.author == client.user) { 
            return;
        }

        /* Handles message */
        var contents = message.content;
        console.log("[MSG]".bgGreen + " Message from " + message.author.username + ", contents: " + contents);
        /*
        console.log("[MSG]".bgGreen 
            + " Received message from: @" + message.author.username 
            + "#" + message.author.discriminator 
            + " <" + message.author.id + ">");

        console.log("[MSG]".bgGreen + " Message channel: " + message.channel + " (" + message.channel.type + ")");
        */

        /* Checks if '!sticker' */
        var get_sticker_regex = new RegExp("(!sticker) (.*)");
        if (get_sticker_regex.test(contents)) {
            /* Gets user */
            var user = message.author; //TODO: implement custom user
            /* Gets tags */
            var tags = get_sticker_regex.exec(contents)[2];
            /* Finds image */
            var image = file_handler.findImage(user, tags);

            /* Handles exceptions */
            if (image == "-1") {
                message.reply("you don't have any stickers, mate.");
            }
            else if (image == "-2") {
                message.reply("sticker not found, mate.");
            }
            else {
                /* Sends image */
                message.channel.sendFile(image, "sticker.png", "", (err, m) => {
                    if (err) console.log("[ERR]".bgRed + err);
                });
            }
            
            console.log("[CMD]".bgMagenta + " !sticker called, user: " + user.id + ",  tags: " + tags);
        }

        /* Handles adding stickers by:
         * Checking if (image attachment exists) and (in direct message) */
        else if (message.attachments.array().length != 0 && message.channel.type == "dm") {
            /* Gets user */
            var user = message.author;
            /* Gets tags */
            var tags = contents;
            /* Gets image attachment url */
            var image = message.attachments.first().url;
            /* Saves image to database */
            file_handler.saveImage(user, tags, image);
            console.log("[CMD]".bgMagenta + " !addsticker called, user: " + user.id + ", tags: \'" + tags + "\', url: " + image);
        }

    /* Stock response */
    if (message.content === 'ping') {
        message.reply('pong');
    }

    });

}

function changeStatus(client) {
    var number = Math.floor(Math.random() * states.length);
    client.setGame(states[number]);
    console.log("[LOG]".bgCyan + " Set game to: " + states[number]);
    setTimeout(() => { changeStatus(client) }, 30*60*1000);
}


/* Sets up export */
module.exports.setupPrompts = setupPrompts;
module.exports.changeStatus = changeStatus;