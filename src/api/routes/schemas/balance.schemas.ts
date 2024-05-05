const genericBalanceBody = {
    type: 'object',
    required: ['value'],
    properties: {
        value: { type: 'number' },
    }
};

const genericBalanceResponse = {
    '200': {
        type: 'object',
        properties: {
            balance: { type: 'number' }
        }
    }
}

const balanceOperationSchema = {
    tags: ['balance'],
    body: genericBalanceBody,
};

export { genericBalanceBody, genericBalanceResponse, balanceOperationSchema };