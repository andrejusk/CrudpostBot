const file_handler = require("../imports/file_handler.js");

/** Sets up listener to listen for messages.
 * Also implements handlers for commands.
 */
function setupPrompts(client) {

    /* On message received */
    client.on("message", message => {

        /* Handles message */
        var contents = message.content;
        console.log("[MSG]".bgGreen 
            + " Received message from: @" + message.author.username 
            + "#" + message.author.discriminator 
            + " <" + message.author.id + ">");
        console.log("[MSG]".bgGreen + " Message contents: " + contents);
        console.log("[MSG]".bgGreen + " Message channel: " + message.channel + " (" + message.channel.type + ")");

        /* Checks if '!sticker' */
        var get_sticker_regex = new RegExp("(!sticker) (.*)");
        if (get_sticker_regex.test(contents)) {

            /* Gets user */
            var user = message.author; //TODO: implement custom user

            /* Gets tags */
            var tags = get_sticker_regex.exec(contents)[2];

            /* Finds image */
            var image = file_handler.findImage(user, tags);
            
            /* Sends image */
            message.channel.sendFile(image, "sticker.png", "", (err, m) => {
                if (err) console.log(err);
            });

            console.log("[CMD]".bgMagenta + " !sticker called, user: " + user.id + ",  tags: " + tags);

        }

        /* Checks if (image attachment exists) and (in direct message) and (not from self) */
        else if (message.attachments.array().length != 0 && (message.channel.type == "dm" && message.author != client.user)) {
            
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


/* Sets up export */
module.exports.setupPrompts = setupPrompts;