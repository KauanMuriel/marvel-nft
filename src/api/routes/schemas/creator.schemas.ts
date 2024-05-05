import { genericUuidSchemaParams, simpleResponse } from "./generic.schema";

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
    params: genericUuidSchemaParams,
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
}

export { createCreatorSchema, updateCreatorSchema };