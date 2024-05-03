const balanceSchema = {
    type: 'object',
    required: ['value'],
    properties: {
        value: { type: 'number'},
    }
};

// const balanceSchema = {
//     tags: ['auth'],
//     params: {
        
//     }
//     body: {
//         type: 'object',
//         required: ['username', 'password', 'email', 'favoriteCreator', 'favoriteCharacter', 'favoriteComic'],
//         properties: {
//             username: { type: 'string', minLength: 8 },
//             password: { type: 'string', minLength: 8 },
//             favoriteCharacter: { type: 'string', format: 'uuid'},
//             favoriteCreator: { type: 'string', format: 'uuid' },
//             favoriteComic: { type: 'string', format: 'uuid' },
//             email: { type: 'string', format: "email" }
//         }
//     },
//     response: {
//         '200': {
//             type: 'object',
//             properties: {
//                 uuid: { type: 'string' }
//             }
//         }
//     }
// };

export { balanceSchema };