import { simpleResponse } from "./generic.schema";

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
    body: {
        type: 'object',
        required: ['uuid', 'title', 'sufix', 'isbn', 'creator'],
        properties: {
            uuid: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            variantDescription: {},
            isbn: { type: 'string' },
            creator: { type: 'string', format: 'uuid' }
        }
    },
    response: simpleResponse
};

export { createComicSchema, updateComicSchema };