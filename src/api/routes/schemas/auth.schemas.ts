const signupSchema = {
    tags: ['auth'],
    body: {
        type: 'object',
        required: ['username', 'password', 'email'],
        properties: {
            username: { type: 'string', minLength: 8 },
            password: { type: 'string', minLength: 8 },
            email: { type: 'string', format: "email" }
        }
    },
    response: {
        '200': {
            type: 'object',
            properties: {
                uuid: { type: 'string' }
            }
        }
    }
};

const signinSchema = {
    tags: ['auth'],
    body: {
        type: 'object',
        required: ['password', 'email'],
        properties: {
            password: { type: 'string' },
            email: { type: 'string', format: "email" }
        }
    },
    response: {
        '200': {
            type: 'object',
            properties: {
                accessToken: { type: 'string' }
            }
        }
    }
}

export { signupSchema, signinSchema }