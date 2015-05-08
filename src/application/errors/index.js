module.exports = {
    ParameterRequiredError: require('./common/ParameterRequiredError'),
    CommonCommandError: require('./common/CommonCommandError'),
    DescriptiveCommandError: require('./DescriptiveCommandError'),
    UserAlreadyExistsError: require('./account/UserAlreadyExistsError'),
    IncorrectLoginDetails: require('./account/IncorrectLoginDetails')
};
