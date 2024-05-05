import { simpleResponse } from "./generic.schema";

const createCreatorSchema = {
    tags: ['creator'],
    body: {
        type: 'object',
        required: ['fullname', 'sufix', 'thumbnail'],
        properties: {
            fullname: { type: 'string' },
            sufix: { type: 'string' },
            thumbnail: { type: 'string' }
        }
    },
    response: simpleResponse
};

const updateCreatorSchema = {
    tags: ['creator'],
    body: {
        type: 'object',
        required: ['uuid', 'fullname', 'sufix', 'thumbnail'],
        properties: {
            uuid: { type: 'string', format: 'uuid' },
            fullname: { type: 'string' },
            sufix: { type: 'string' },
            thumbnail: { type: 'string' }
        }
    },
    response: simpleResponse
}

export { createCreatorSchema, updateCreatorSchema };