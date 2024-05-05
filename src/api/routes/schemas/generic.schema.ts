const genericUuidSchemaParams = {
    type: 'object',
    required: ['uuid'],
    properties: {
        uuid: { type: 'string', format: "uuid" },
    }
};

const simpleResponse = {
    '200': {
        type: 'object',
        properties: {
            uuid: { type: 'string' }
        }
    }
}


export { genericUuidSchemaParams, simpleResponse };