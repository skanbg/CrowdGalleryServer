module.exports = {
    ParameterRequiredError: require('./common/ParameterRequiredError'),
    CommonCommandError: require('./common/CommonCommandError'),
    DescriptiveCommandError: require('./DescriptiveCommandError'),
    UserAlreadyExistsError: require('./account/UserAlreadyExistsError'),
    InvalidCredentialsError: require('./account/InvalidCredentialsError'),
    MissingImageError: require('./gallery/MissingImageError')
};
