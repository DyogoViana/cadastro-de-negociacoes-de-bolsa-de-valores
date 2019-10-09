const api = require('../index')

jest.mock('../../mocks/data', () => {
    return () => [{data: new Date('2019-10-04T02:18:47.666Z')}]
})

describe('api', () => {
    it('listaSemana deve responder com negociações filtradas', () => {
        const res = {json: jest.fn()}
        api.listaSemana(undefined, res)
        expect(res.json).toBeCalledWith([{data: new Date('2019-10-04T02:18:47.666Z')}])
    })
})