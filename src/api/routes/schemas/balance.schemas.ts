const balanceSchema = {
    type: 'object',
    required: ['value'],
    properties: {
        value: { type: 'number'},
    }
};

export { balanceSchema };