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
                                console.log(arguments);
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
};