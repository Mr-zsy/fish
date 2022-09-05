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
                    children: []
                }
            }
        ]
    }
}

const testContainer = {
    componentName: 'Test',
    Hooks: {
        useState: [
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
        useRef: [
            {
                refName: 'timer',
                type: 'any',
                default: null
            }
        ],
        useMemo: [],
        useEffect: [
            {
                funcContent: (() => {console.log(name)}).toString(),
                deps: ['name']
            }
        ],
        useLayoutEffect: [],
        useCallback: [
            {
                funcName: 'test',
                funcContent: (async (a) => console.log(1)).toString(),
                params: [
                    {
                        name: 'a',
                        type: 'string'
                    }
                ],
                deps: ['age']
    
            },
            {
                funcName: 'test1',
                funcContent: (() => {const a = () => 1}).toString(),
                params: [
                    {
                        name: 'a',
                        type: 'string'
                    }
                ],
                deps: ['age']
    
            }
        ],
    },
    Return: [testComponent]
}

console.log(compileTemplate(testContainer))

// {{$imports.utils.formateComponentJSX($data.Return)}}
