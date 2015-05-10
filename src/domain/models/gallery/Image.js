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
    GridStore = mongoose.mongo.GridStore;

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
        }
    });

    imageSchema.static('add', function (user, title, image, options) {
        var deferred = Q.defer();

        var newImage = new this();
        newImage.user = user;
        newImage.title = title;

        options = parse(options);
        options.metadata.filename = image.name;
        options.dater = new Date();

        var gridIn = new GridStore(db, newImage.id, image.name, "w", options)
            .open(function (err, file) {
                if (err) {
                    console.log('Error - open');
                    return deferred.reject(err);
                }

                return file.writeFile(image.path, function (err, savedImage) {
                    if (err) {
                        console.log('error - write');
                        deferred.reject(err);
                    }

                    console.log('Attaching');
                    newImage.file = savedImage.fileId;
                    deferred.resolve(newImage);
                });
            });

        //TODO: Rename the ImageHasBeenAdded
        newImage.raise(new ImageHasBeenAdded(newImage.id, user.id, title));

        return deferred.promise;
    });

    imageSchema.plugin(EventGenerator);

    return mongoose.model('Image', imageSchema);
};

module.exports = ImageModel();
