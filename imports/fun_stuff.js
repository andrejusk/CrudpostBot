const states = [
    "Linkin Park",
    "Half-Life 3",
    "their mixtape",
    "Stack Overflow",
    "Shitposts"
];

function changeStatus(client) {
    var number = Math.floor(Math.random() * states.length);
    client.setGame(states[number]);
    console.log("[LOG]".bgCyan + " Set game to: " + states[number]);
    setTimeout(() => { changeStatus(client) }, 30*60*1000);
}


module.exports.changeStatus = changeStatus;