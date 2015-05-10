var mongoose = require('mongoose'),
    Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

module.exports = function (config) {
    mongoose.connect(config.db);
    var connection = mongoose.connection;

    connection.once('open', function (err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return;
        }

        var gfs = Grid(connection.db);

        console.log('Database up and running...')
    });

    connection.on('error', function (err) {
        console.log('Database error: ' + err);
    });
};