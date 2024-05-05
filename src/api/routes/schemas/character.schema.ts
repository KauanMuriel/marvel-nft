import { genericUuidSchemaParams, simpleResponse } from "./generic.schema";

const createCharacterSchema = {
    tags: ['character'],
    body: {
        type: 'object',
        required: ['name', 'thumbnail'],
        properties: {
            name: { type: 'string' },
            description: { type: 'string', minLength: 10 },
            thumbnail: { type: 'string' }
        }
    },
    response: simpleResponse
};

const updateCharacterSchema = {
    tags: ['character'],
    params: genericUuidSchemaParams,
    body: {
        type: 'object',
        required: ['name', 'thumbnail'],
        properties: {
            name: { type: 'string' },
            description: { type: 'string', minLength: 10 },
            thumbnail: { type: 'string' }
        }
    },
    response: simpleResponse
};

export { createCharacterSchema , updateCharacterSchema };