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

        /* Checks if '!sticker' */
        var get_sticker_regex = new RegExp("(!sticker) (.*)");
        if (get_sticker_regex.test(contents)) {

            /* Gets user */
            var user = message.author; //TODO: implement custom user

            /* Gets tags */
            var tags = get_sticker_regex.exec(contents)[2];

            console.log("[CMD]".bgMagenta + " !sticker called, user: " + user.id + ",  tags: " + tags);

            /* Finds image */
            var image = file_handler.findImage(user, tags);
            
            /* Sends image */
            message.channel.sendFile(image, "sticker.png", "", (err, m) => {
                if (err) console.log(err);
            });

        }


    
    if (message.content === 'ping') {
        message.reply('pong');
    }
    });

    




}


/* Sets up export */
module.exports.setupPrompts = setupPrompts;