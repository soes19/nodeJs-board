module.exports = function(database, callback){
    var collection = database.collection('test');
    collection.find({}).toArray(function(err, result) {
        console.log("Found the following records");
        callback(err, result);
    });
}