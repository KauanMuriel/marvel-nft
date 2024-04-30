const simpleGetSchemaParams = {
    type: 'object',
    required: ['uuid'],
    properties: {
        uuid: { type: 'string', format: "uuid" },
    }
};

export { simpleGetSchemaParams };