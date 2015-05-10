/**
 * A model for our user
 */
'use strict';
var mongoose = require('mongoose'),
    Q = require('q'),
    EventGenerator = require('./../common/EventGenerator');

var CommentModel = function () {
    var commentSchema = mongoose.Schema({
        comment: {
            type: String,
            required: true
        },
        image: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
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

    commentSchema.static('add', function (user, image, comment) {
        var newComment = new this();
        newComment.user = user;
        newComment.image = image;
        newComment.comment = comment;

        //TODO: Raise event

        return newComment;
    });

    commentSchema.plugin(EventGenerator);

    return mongoose.model('Comment', commentSchema);
};

module.exports = CommentModel();
