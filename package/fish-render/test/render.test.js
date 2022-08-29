const {compileTemplate} = require('../script/render');


const testComponent = {
    data: {
        name: 'Test',
        props: [
            {
                name: 'name',
                value: 'name',
                valueType: 'other'
            },
            {
                name: 'age',
                value: '1',
                valueType: 'string'
            }
        ],
        children: [
            {
                data: {
                    name: 'Child',
                    props: [
                        {
                            name: 'childName',
                            value: 'name',
                            valueType: 'other'
                        },
                        {
                            name: 'childAge',
                            value: '2',
                            valueType: 'string'
                        }
                    ],
                }
            }
        ]
    }
}

const testContainer = {
    xState: [
        {
            stateName: 'name',
            type: 'string',
            default: 'tim'
        },
        {
            stateName: 'age',
            type: 'string',
            default: () => 2
        }
    ],
    XRef: [
        {
            refName: 'timer',
            type: 'any',
            default: null
        }
    ],
    XEffect: [
        {
            effectContent: () => {console.log(name)},
            deps: ['name']
        }
    ],
    XCallback: [
        {
            funcName: 'test',
            funcContent: async (a) => console.log(1),
            params: [
                {
                    name: 'a',
                    type: 'string'
                }
            ],
            deps: ['age']

        }
    ],
    XReturn: [testComponent]
}

console.log(compileTemplate(testContainer))