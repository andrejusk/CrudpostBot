const file_handler = require("../imports/file_handler.js");

const post_command = "!sticker";
const list_command = "!liststickers";

/** Sets up listener to listen for messages.
 *  Also implements handlers for commands.
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

        /* Checks if "!sticker" */
        if (startsWith(contents, post_command)) {
            messageInformation(message);
            /* Gets tags */
            var tags = trimCommand(contents, post_command);

            /* Gets user */
            if(hasUser(tags)) {
                var user = getUser(tags);
                console.log("[DBG]".bgYellow + " Has user: " + user);
                tags = trimTag(message);
            }
            else {
                console.log("[DBG]".bgYellow + " Doesn't have user.");
                var user = message.author.id;
            }

            console.log("[CMD]".bgMagenta + " !sticker called, user: " + user + ",  tags: " + tags);
            
            /* Finds image */
            var image = file_handler.findImage(user, tags);

            
            /* Handles exceptions */
            if (image == "-1") {
                message.reply("you don't have any stickers, mate.");
            } else if (image == "-2") {
                message.reply("sticker not found, mate.");
            } else {
                message.channel.sendFile(image, "sticker.png", "", (err, m) => {
                    if (err) console.log("[ERR]".bgRed + err);
                });
            }
        }

        else if (startsWith(contents, list_command)) {
            messageInformation(message);
            /* Gets user */
            if(hasUser(message)) {
                console.log("[DBG]".bgYellow + " Has user: " + user);
                var user = getUser(message);
                var own_stickers = false;
            }
            else {
                console.log("[DBG]".bgYellow + " Doesn't have user.");
                var own_stickers = true;
                var user = message.author.id;
            }

            console.log("[CMD]".bgMagenta + " !liststickers called, user: " + user);    
            
            /* Gets list of stickers */
            var output = file_handler.listStickers(user);

            if(own_stickers) {
                message.author.send("Here are your stickers: " + output);
            } else {
                message.author.send("Here are <@" + user + ">'s stickers: " + output);
            }

            if(message.channel.type != "dm") {
                message.reply("check DMs ;)");
            }

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

            console.log("[CMD]".bgMagenta + " !addsticker called, user: " + user + ", tags: \'" + tags + "\', url: " + image);
            
            /* Saves image to database */
            file_handler.saveImage(user.id, tags, image);
        }

    /* Stock response */
    if (message.content === 'ping') {
        message.reply('pong');
    }

    });

}


/** Outputs information about a message */
function messageInformation(message) {
        console.log("[MSG]".bgGreen 
            + " Received message from: @" + message.author.username 
            + "#" + message.author.discriminator 
            + " <" + message.author.id + ">");
        console.log("[MSG]".bgGreen + " Message contents: " + message.content);
        console.log("[MSG]".bgGreen + " Message channel: " + message.channel + " (" + message.channel.type + ")");
}

/** Checks whether message starts with command */
function startsWith(message, command) {
        var regex = new RegExp("(" + command + ").*");
        return regex.test(message);
}
/** Trims command from message */
function trimCommand(message, command) {
        var regex = new RegExp("(" + command + ") (.*)");
        return regex.exec(message)[2];
}

/** Checks whether message has a tagged user */
function hasUser(message) {
        var reg = new RegExp(".*<@(.*)>.*");
        return reg.test(message);
}
/** Returns tagged user from message */
function getUser(message) {
        var reg = new RegExp("<@(.*)>");
        return reg.exec(message)[1];
}
/** Trims tagged user from message */
function trimTag(message) {
        var reg = new RegExp("<@(.*)>.(.*)");
        return reg.exec(message)[2];
}

/* Sets up export */
module.exports.setupPrompts = setupPrompts;