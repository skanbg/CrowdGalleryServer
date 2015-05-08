module.exports = {
    DomainError: require('./DomainError'),
    DescriptiveDomainError: require('./DescriptiveDomainError'),
    CommonDomainError: require('./common/CommonDomainError'),
    UserDoesNotExistsError: require('./account/UserDoesNotExistError'),
    UserAccountIsLockedError: require('./account/UserAccountIsLockedError'),
    InvalidCredentialsError: require('./account/InvalidCredentialsError'),
    InvalidEmailError: require('./account/InvalidEmailError'),
    InvalidFirstNameError: require('./account/InvalidFirstNameError'),
    InvalidLastNameError: require('./account/InvalidLastNameError'),
    InvalidPasswordError: require('./account/InvalidPasswordError'),
    InvalidEnumValueError: require('./common/InvalidEnumValueError'),
    ValueRequiredError: require('./common/ValueRequiredError'),
    ValueRangeError: require('./common/ValueRangeError'),
    InvalidAccessTokenError: require('./oauth/InvalidAccessTokenError')
};
