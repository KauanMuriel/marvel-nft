import { genericUuidSchemaParams, simpleResponse } from "./generic.schema";

const createComicSchema = {
    tags: ['comic'],
    body: {
        type: 'object',
        required: ['title', 'sufix', 'isbn', 'creator'],
        properties: {
            title: { type: 'string' },
            variantDescription: {},
            isbn: { type: 'string' },
            creator: { type: 'string', format: 'uuid' }
        }
    },
    response: simpleResponse
};

const updateComicSchema = {
    tags: ['comic'],
    params: genericUuidSchemaParams,
    body: {
        type: 'object',
        required: ['title', 'isbn', 'creator'],
        properties: {
            title: { type: 'string' },
            isbn: { type: 'string' },
            creator: { type: 'string', format: 'uuid' }
        }
    },
    response: simpleResponse
};

export { createComicSchema, updateComicSchema };