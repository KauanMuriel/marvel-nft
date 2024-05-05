const buyTokenSchema = {
    tags: ['marketplace'],
    body: {
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

const sellTokenSchema = {
    tags: ['marketplace'],
    body: {
        type: 'object',
        properties: {
            uuid: { type: 'string', format: 'uuid' },
            price: { type: 'number', minimum: 0 }
        }
    },
    response: {
        '200': {
            type: 'object',
            properties: {
                uuid: { type: 'string' },
                status: { type: 'string', enum: ['Claimed', 'For sale', 'For exchange'] }
            }
        }
    }
};

export { buyTokenSchema, sellTokenSchema };