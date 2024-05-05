import { simpleResponse } from "./generic.schema";

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
    body: {
        type: 'object',
        required: ['uuid', 'name', 'thumbnail'],
        properties: {
            uuid: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string', minLength: 10 },
            thumbnail: { type: 'string' }
        }
    },
    response: simpleResponse
}

export { createCharacterSchema , updateCharacterSchema };