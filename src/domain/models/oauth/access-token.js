'use strict';
var mongoose = require('mongoose'),
    Locking = require('../common/Locking'),
    EventGenerator = require('../common/EventGenerator'),
    AccessTokenHasBeenCreated = require('../../events/oauth/AccessTokenHasBeenCreated');

var AccessTokenModel = function () {
    var Schema = mongoose.Schema,
        ObjectId = Schema.Types.ObjectId;

    var AccessTokenSchema = new Schema({
        user: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        expirationDate: {
            type: Date
        },
        token: {
            type: String,
            unique: true,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        }
    });

    AccessTokenSchema.static('generate', function (user, expirationDate, token) {
        var newAccessToken = new this();
        newAccessToken.user = user;
        newAccessToken.expirationDate = expirationDate;
        newAccessToken.token = token;

        newAccessToken.raise(new AccessTokenHasBeenCreated(user.id, newAccessToken.id));

        return newAccessToken;
    });

    AccessTokenSchema.virtual('userId')
        .get(function () {
            return this.populated('user') || this.user;
        })
        .set(function (value) {
            this.user = value;
        });

    AccessTokenSchema.plugin(Locking);
    AccessTokenSchema.plugin(EventGenerator);

    return mongoose.model('accesstoken', AccessTokenSchema);
};

module.exports = AccessTokenModel();
