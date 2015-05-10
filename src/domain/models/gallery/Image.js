/**
 * A model for our user
 */
'use strict';
var mongoose = require('mongoose'),
    Q = require('q'),
    Locking = require('./../common/Locking'),
    EventGenerator = require('./../common/EventGenerator'),
    ImageHasBeenAdded = require('../../events/gallery/ImageHasBeenAdded');

var db = mongoose.connection.db,
    GridStore = mongoose.mongo.GridStore,
    Grid = require('gridfs-stream');

var parse = function (options) {
    var opts;
    opts = {};
    if (options.length > 0) {
        opts = options[0];
    }
    if (!opts.metadata) {
        opts.metadata = {};
    }
    return opts;
};

var ImageModel = function () {
    var imageSchema = mongoose.Schema({
        title: {
            type: String,
            default: ''
        },
        file: {type: mongoose.Schema.Types.ObjectId},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        }
    });

    //imageSchema.static('add', function (user, title, image, options) {
    //    var deferred = Q.defer();
    //
    //    var newImage = new this();
    //    newImage.user = user;
    //    newImage.title = title;
    //
    //    options = parse(options);
    //    options.metadata.filename = image.name;
    //    options.dater = new Date();
    //
    //    var gridIn = new GridStore(db, newImage.id, null, "w", options);
    //    gridIn.open(function (err, file) {
    //        if (err) {
    //            console.log('Error - open');
    //            gridIn.close(function (err, resss) {
    //                file.close();
    //            });
    //
    //            return deferred.reject(err);
    //        }
    //
    //        return file.writeFile(image.path, function (err, savedImage) {
    //            if (err) {
    //                console.log('error - write');
    //                gridIn.close(function (err, resss) {
    //                    file.close();
    //                    savedImage.close();
    //                });
    //                return deferred.reject(err);
    //            }
    //
    //            gridIn.close(function (err, resss) {
    //                file.close();
    //                savedImage.close();
    //            });
    //            console.log('Attaching');
    //            newImage.file = savedImage.fileId;
    //            deferred.resolve(newImage);
    //        });
    //    });
    //
    //    //TODO: Rename the ImageHasBeenAdded
    //    newImage.raise(new ImageHasBeenAdded(newImage.id, user.id, title));
    //
    //    return deferred.promise;
    //});

    imageSchema.static('add', function (user, title, image, options) {
        var deferred = Q.defer();

        var newImage = new this();
        newImage.user = user;
        newImage.title = title;

        options = parse(options);
        options.metadata.filename = image.name;
        options.dater = new Date();

        var fileId = mongoose.Types.ObjectId();

        var gridStore = new GridStore(db, fileId, "w");
        gridStore.open(function (err, gridStore) {
            if (err) {
                console.log('Error - open');

                return deferred.reject(err);
            }

            return gridStore.writeFile(image.path, function (err, gridStore) {
                gridStore.close(function (err, result) {
                    if (err) {
                        console.log('error - write');
                        return deferred.reject(err);
                    }

                    console.log('Attaching');
                    newImage.file = gridStore.fileId;
                    deferred.resolve(newImage);
                });
            });
        });

        //TODO: Rename the ImageHasBeenAdded
        newImage.raise(new ImageHasBeenAdded(newImage.id, user.id, title));

        return deferred.promise;
    });

    imageSchema.static('getFile', function (fileId) {
        var deferred = Q.defer();

        console.log('In ' + fileId);
        var _id = '1431232379751.jpg';
        //var gridStore2 = new GridStore(db, new mongoose.ObjectId(fileId), "r");
        var gfs = Grid(db, mongoose.mongo);
        console.log('Testtt');
        var id = gfs.tryParseObjectId(fileId);
        console.log('BIn ');
        //note that options now includes 'root'
        var options = {_id: id};

        //var gridStore2 = new GridStore(db, id, 'r');
        //gridStore2.open(function(err, gridStore) {
        //    console.log('Opened');
        //    console.log(arguments);
        //    deferred.resolve(gridStore);
        //    //var readstream = gfs.createReadStream(options);
        //    //deferred.resolve(pipe(response));
        //});

        //new GridStore(db, null, null, "r", options)
        //    .open(function (err, ress) {
        //        console.log('Opened');
        //        console.log(arguments);
        //        ress.read(db, id, function (err, fileData) {
        //            console.log('Opened');
        //            console.log(arguments);
        //            deferred.resolve(fileData);
        //        });
        //    });

        //deferred.reject();

        //gfs.findOne(options, function (err, file) {
        //    console.log('=======');
        //    console.log(arguments);
        //    console.log('=======');
        //});


        //GridStore.read(db, id, function (err, fileData) {
        //    console.log('Inin');
        //    console.log(arguments);
        //    deferred.resolve(fileData);
        //
        //
        //});


        //var gridder = new GridStore(db, id, 'r');

        //GridStore.read(db, id, function(err, data) {
        //    if (err) {
        //        console.log('Error - open');
        //
        //        return deferred.reject(err);
        //    }
        //
        //    console.log(arguments);
        //    deferred.resolve({});
        //});

        //var rstream = gfs.createReadStream(options);
        //var bufs = [];
        //
        //rstream.on('data', function (chunk) {
        //
        //    bufs.push(chunk);
        //
        //}).on('end', function () { // done
        //
        //    var fbuf = Buffer.concat(bufs);
        //
        //    var base64 = (fbuf.toString('base64'));
        //
        //    deferred.resolve('<img src="data:image/jpeg;base64,' + base64 + '">');
        //});


        var gridStore2 = new GridStore(db, id, "r");
        gridStore2.open(function (err, gridStore) {
            if(err){
                return deferred.reject(err);
            }

            gridStore.seek(0, function () {
                gridStore.read(function (err, data) {
                    console.log(arguments);
                    if (err) {
                        console.log('Error - open');

                        return deferred.reject(err);
                    }

                    //console.log(arguments);
                    //var stream = data.stream(true);
                    deferred.resolve(data);
                });
            });
        });


        //GridStore.read(db,id, function (err, data) {
        //    console.log(arguments);
        //    deferred.resolve(data);
        //});

        //var readstream = gfs.createReadStream(options);
        //deferred.resolve(readstream);


        //var gridIn = new GridStore(db, id, null, "r");
        //gridIn.open(function (err, file) {
        //    console.log(arguments);
        //    if (err) {
        //        console.log('Error - open');
        //
        //        return deferred.reject(err);
        //    }
        //
        //    console.log(arguments);
        //    deferred.resolve(file);
        //});

        //gridder.open(function (err, gridStore) {
        //    console.log(arguments);
        //    deferred.resolve(gridStore);
        //});


        //GridStore.read(db, new mongoose.ObjectId(fileId), function (err, fileData) {
        //    deferred.resolve(fileData);
        //
        //    db.close();
        //});
        //gridStore2.open(function(err, gridStore) {
        //    deferred.resolve(gridStore);
        //});
        //var gfs = GridStore(db);
        //deferred.resolve(gfs.createReadStream({
        //    _id: fileId
        //}));

        //var gridStore = GridStore.read(db, new mongoose.ObjectId(fileId),
        //    function (err, file) {
        //        console.log('Read');
        //        if (err) {
        //            return deferred.reject(err);
        //        }
        //
        //        deferred.resolve(file);
        //    });
        //.open(function (err, file) {
        //    console.log('Open');
        //    if (err) {
        //        return deferred.reject(err);
        //    }
        //
        //    console.log('Read');
        //    file.read(function (error, data) {
        //        if (error) {
        //            deferred.reject(error);
        //        }
        //
        //        deferred.resolve(data);
        //        file.close(function (err) {
        //        });
        //    });
        //});

        return deferred.promise;
    });

    imageSchema.plugin(EventGenerator);

    return mongoose.model('Image', imageSchema);
};

module.exports = ImageModel();
