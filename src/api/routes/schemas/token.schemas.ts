const getTokensSchema = {
    tags: ['token'],
    response: {
        '200': {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    uuid: { type: 'string' },
                    contentType: { enum: ["Character", "Creator", "Comic"] },
                    contentId: { type: 'string', format: 'uuid' },
                    owner: {
                        type: 'object',
                        properties: {
                            uuid: { type: 'string', format: 'uuid' }
                        }
                    }
                }
            }
        }
    }
};

const getTokenDetailsSchema = {
    tags: ['token'],
    params: {
        type: 'object',
        properties: {
            uuid: { type: 'string', format: 'uuid' }
        }
    },
    response: {
        '200': {
            type: 'object',
            properties: {
                uuid: { type: 'string' },
                contentType: { enum: ["Character", "Creator", "Comic"] },
                contentData: { },
                contentId: { type: 'string', format: 'uuid' },
                owner: {
                    type: 'object',
                    properties: {
                        uuid: { type: 'string', format: 'uuid' }
                    }
                }
            }
        }
    }
};

export { getTokensSchema, getTokenDetailsSchema };