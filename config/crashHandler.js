var appErrors = require('../src/application/errors/index'),
    domainErrors = require('../src/domain/errors/index');

var errorHandler = function (res, status, errData) {
    res
        .status(status)
        .json({
            error: errData
        });
};

module.exports = function (config, app) {

    app.use(function (err, req, res, next) {
        if (!err) {
            return next();
        }

        if (err instanceof domainErrors.DescriptiveDomainError) {
            return errorHandler(res, 400, {
                message: err.message,
                name: err.name
            });
        } else if (err instanceof appErrors.DescriptiveCommandError) {
            return errorHandler(res, 400, {
                message: err.message,
                name: err.name
            });
        } else if (err instanceof appErrors.CommonCommandError) {
            return errorHandler(res, 400, {
                message: err.message,
                name: err.name,
                errorPath: err.errorPath
            });
        }

        //return errorHandler(res, 400, {
        //    name: 'GeneralAppError'
        //});

        next(err);
    });

};