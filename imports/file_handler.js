/* Imports */
const jsonfile = require("jsonfile");
const fs = require('fs');

/** Returns URL of sticker
 *  from user and tags
 */
function findImage(user, tags) {

    /* File path */
    var file = __dirname + "/../stickers/" + user.id + ".json";

    /* If file exists */
    if(fs.existsSync(file)) {
        stickers = getStickers(file);
        //console.log("[DBG]".bgYellow + " Read: " + JSON.stringify(stickers));
        
        /* Compare every sticker against given tags */
        for(var iterator = 0; iterator < stickers.length; iterator++) {
            //console.log("[DBG]".bgYellow + " Comparing: " + stickers[iterator].tags + " to " + tags);
            if(stickers[iterator].tags == tags) {
                console.log("[DBG]".bgYellow + " Sticker found");
                return stickers[iterator].image;
            }
        }
        /* Sticker not found */
        console.log("[DBG]".bgYellow + " Sticker not found.");
        return "-2";
    }
    else {
        /* No stickers exist */
        console.log("[DBG]".bgYellow + " No stickers exist.");
        return "-1";
    }

}

/** Saves URL of sticker
 *  with user and tags
 */
function saveImage(user, tags, image) {

    /* File path */
    var file = __dirname + "/../stickers/" + user.id + ".json";

    /* Sticker to be added */
    sticker = new makeSticker(tags, image);

    /* If file exists */
    if(fs.existsSync(file)) {
        stickers = getStickers(file);
        //console.log("[DBG]".bgYellow + " Read: " + JSON.stringify(stickers));
    }
    else {
        stickers = [];
        /* Create new .json file */
        fs.writeFile(file, {flat: "wx"}, function (err) {
            if (err) console.log("[ERR]".bgRed + err);
        });
    }

    stickers.push(sticker);
    
    /* Updates .json file */
    jsonfile.spaces = 4;
    jsonfile.writeFile(file, stickers, function (err) {
        if (err) console.log("[ERR]".bgRed + err);
    });

    //console.log("[DBG]".bgYellow + " Wrote: " + JSON.stringify(stickers));
    //console.log("[DBG]".bgYellow + " to: " + file);

}

/** Returns all stickers from a filepath */
function getStickers(file) {
    return jsonfile.readFileSync(file);
}

/** Creates Sticker object
 *  from user, tags and URL 
 */
function makeSticker(tags, image) {
    this.tags = tags;
    this.image = image;
}

/* Sets up export */
module.exports.findImage = findImage;
module.exports.saveImage = saveImage;