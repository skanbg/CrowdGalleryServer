var commander = require('../../src/infrastructure/commands/Commander'),
    commandsList = require('../../src/application/commands'),
    formidable = require('formidable'),
    Image = require('../../src/domain/models/gallery/Image'),
    Comment = require('../../src/domain/models/gallery/Comment'),
    MissingImageError = require('../../src/application/errors/index').MissingImageError,
    bearerAuthenticator = require('../../src/application/oauth/bearerAuthenticator');

module.exports = function (app) {

    app.post('/', function (req, res, next) {
        //TODO: Use command
        bearerAuthenticator(req, res, next)
            .then(function (data) {
                var form = new formidable.IncomingForm();

                form.parse(req, function (err, fields, files) {
                    console.log(fields);
                    console.log(files);
                    console.log(err);

                    if (!files.image && !fields.image) {
                        return next(new MissingImageError());
                    }

                    var parsedFile = fields.image || files.image;

                    var opts = {
                        content_type: parsedFile.type
                    };

                    Image.add(data.user, fields.title, parsedFile, opts)
                        .then(function (createdImage) {
                            console.log('create - passed');
                            createdImage.save(function (err) {
                                console.log('save');
                                res.json({
                                    image: {
                                        id: createdImage.id,
                                        user: data.user.id,
                                        title: createdImage.title
                                    }
                                });
                            });
                        })
                        .catch(function (err) {
                            next(err);
                        });
                });
            }, function (err) {
                next(err);
            });
    });

    app.get('/', function (req, res, next) {
        bearerAuthenticator(req, res, next)
            .then(function (data) {
                Image
                    .find({}, {}, {limit: 10})
                    .sort({'created': 'desc'})
                    .populate({
                        path: 'user',
                        select: 'firstName lastName'
                    })
                    .exec(function (err, images) {
                        res.json({
                            lastUploads: images
                        })
                    });
            }, function (err) {
                next(err);
            });
    });

    app.get('/personal', function (req, res, next) {
        bearerAuthenticator(req, res, next)
            .then(function (data) {
                Image
                    .find({user: data.user}, {}, {limit: 10})
                    .sort({'created': 'desc'})
                    .populate({
                        path: 'user',
                        select: 'firstName lastName'
                    })
                    .exec(function (err, images) {
                        res.json({
                            lastUploads: images
                        })
                    });
            }, function (err) {
                next(err);
            });
    });

    app.get('/image/view/:id', function (req, res, next) {
        //bearerAuthenticator(req, res, next)
        //    .then(function (data) {
        Image
            .getFile(req.params.id)
            .then(function (file) {
                res.writeHead('200', {'Content-Type': 'image/png'});
                res.end(file, 'binary');
            })
            .catch(function (err) {
                console.log(err);
                next(err);
            });
        //}, function (err) {
        //    next(err);
        //});
    });

    app.get('/image/:id', function (req, res, next) {
        bearerAuthenticator(req, res, next)
            .then(function (data) {
                Image
                    .findOne(req.params.id, function (err, result) {
                        if (err) {
                            return next(err);
                        }

                        res.json(result);
                    })
            }, function (err) {
                next(err);
            });
    });

    app.get('/image/:id/comments', function (req, res, next) {
        bearerAuthenticator(req, res, next)
            .then(function (data) {
                Comment
                    .find({image: req.params.id})
                    .sort({'created': 'desc'})
                    .populate({
                        path: 'user',
                        select: 'firstName lastName'
                    })
                    .exec(function (err, result) {
                        if (err) {
                            return next(err);
                        }

                        res.json(result);
                    })
            }, function (err) {
                next(err);
            });
    });

    app.post('/image/:id/comment/add', function (req, res, next) {
        bearerAuthenticator(req, res, next)
            .then(function (data) {
                Comment
                    .add(data.user, req.params.id, req.body.commentBody)
                    .save(function (err, result) {
                        if (err) {
                            return next(err);
                        }

                        res.json(result);
                    });
            }, function (err) {
                next(err);
            });
    });
};