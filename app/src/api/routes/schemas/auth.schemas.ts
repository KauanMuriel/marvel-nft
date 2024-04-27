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

export { signupSchema }