export default{

    GENERAL:{
        code: 1,
        message: 'Something went wrong'
    },
    BOOKMARK_ALREADY_EXISTS:{
        code: 2,
        message: 'This bookmark already exists'
    },
    BOOKMARK_NOT_EXISTS:{
        code: 3,
        message:' This bookmark doesn\'t exist'
    },
    INVALID_REGISTRATION_FIELDS:{
        code: 4,
        message: 'You have entered invalid registration fields'
    },
    USER_EXISTS: {
        code: 5,
        message: 'A user with this e-mail already exists'
    },
    COMPLETE_ALL_FIELDS:{
        code: 7,
        message: 'You did not send all the required fields'
    },
    USER_NOT_EXISTS:{
        code: 8,
        message: 'There is no user with this e-mail'
    },
    INVALID_CREDENTIALS: {
        code: 9,
        message: 'The credentials you have entered are invalid'
    },
    NO_TOKEN:{
        code: 10,
        message: 'Invalid user token'
    },
    TOKEN_EXPIRED:{
        code: 11,
        message:'Your access token has expired'
    },
    UNAUTHORIZED: {
        code: 12,
        message: 'You are not authorized to access or edit this resource.'

    }
}