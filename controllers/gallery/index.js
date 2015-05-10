var commander = require('../../src/infrastructure/commands/Commander'),
    commandsList = require('../../src/application/commands'),
    formidable = require('formidable'),
    Image = require('../../src/domain/models/gallery/Image'),
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
                        path: 'file',
                        select: 'title file created'
                    })
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

    app.get('/image/:id', function (req, res, next) {
        //bearerAuthenticator(req, res, next)
        //    .then(function (data) {
                Image
                    .getFile(req.params.id)
                    .then(function (file) {
                        res.writeHead('200', {'Content-Type': 'image/png'});
                        res.end(file,'binary');
                        //res.setHeader('Content-Length', file.length);
                        //res.setHeader('Content-Disposition', 'inline; filename="' + 'img1.gif' + '"');
                        //res.setHeader('Content-Type', file['contentType']);
                        //file.pipe(res);
                        //console.log(file);
                        //var stream = file.stream(true);
                        //console.log(stream);
                        //console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

                        //var img = new Buffer(file, 'base64');
                        //res.end('data:image/gif;base64,' +img);
                        //res.send(file);
                    })
                    .catch(function (err) {
                        next(err);
                    });
            //}, function (err) {
            //    next(err);
            //});
    });
};