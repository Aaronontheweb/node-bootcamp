/* Exports the current time in the form of a string-based timestamp */
exports.currentTime = function(){
    return Math.round((new Date()).getTime() / 1000).toString(); //Returns a string
}
