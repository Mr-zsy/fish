const art = require('art-template');
const chalk = require('chalk');
const path = require('path');

function greenLog(msg) {
    console.log(chalk.red(msg));
}

function redLog(msg) {
    console.log(chalk.red(msg));
}

/**
 * 第一个字母大写
 * @param {*} str 
 * @returns 
 */
function firstToUpper(str) {
    if(str && typeof str === 'string') {
        const first = str.slice(0, 1);
        const after = str.slice(1);
        return first.toLocaleUpperCase() + after;
    } else {
        return str
    }
    
};

/**
 * 获取函数体内容
 * @param {*} func 
 * () => {}
 * function() {}
 */
function getFuncBody(funcStr) {
    const start = funcStr.indexOf('{');
    const end = funcStr.lastIndexOf('}');
    if(![start, end].includes(-1)) {
        return funcStr.slice(start + 1, end);
    }
    const arrow = funcStr.indexOf('=>');
    if(start == -1 && arrow != -1) {
        return funcStr.slice(arrow + 2);
    }
}

function isFuncStr(str) {
    if(typeof(str) === 'string') {
        const res = eval(str);
        return typeof(res) === 'function';
    } else {
        return false
    };
}

function isFunc(str) {
    return typeof(str) === 'function';
}

function isAsyncFunc(funcContent) {
    return funcContent.replace(/\s*/g, '').indexOf('async') === 0
}


function getFuncParams(funcContent, params) {
    if(Array.isArray(params) && params.length) {
        const formateFuncStr = (funcStr) => {

            let resultParams = '';
            // 查找括号的最大长度，在 => 和 {之前找参数
            let searchParamsMax;
            if(funcStr.indexOf('=>') != -1) {
                searchParamsMax = funcStr.indexOf('=>');
            } else if(funcStr.indexOf('{') != -1) {
                searchParamsMax = funcStr.indexOf('{');
            }
            const searchParamsStr = funcStr.slice(0, searchParamsMax)
            const start = searchParamsStr.indexOf('(');
            const end = searchParamsStr.indexOf(')');
            const isAsync = searchParamsStr.indexOf('async') != -1;
            let searchParamsStrWithoutBlank = searchParamsStr.replace(/\s*/g, '').replace('async', '');


            if(![start, end].includes(-1)) {
                const paramsStr = funcStr.slice(start + 1, end).replace(/\s*/g, '');
                const paramsList = paramsStr.indexOf(',') != -1 
                                    ? paramsStr.split(',') 
                                    : [paramsStr];
                resultParams = paramsList.map((paramName, index) => {
                    const typeItem = params.find(item => item.name === paramName);
                    redLog(typeItem)
                    
                    
                    if(typeItem) {
                        return `${paramName}: ${typeItem.type}`
                    } else {
                        return paramName
                    }
                }).join(',');
            // 箭头函数，无括号,去掉空白和acync 字符串还有长度，证明有参数
            } else if (start + end == -2 && searchParamsStrWithoutBlank.length){
                const typeItem = params.find(item => item.name === searchParamsStrWithoutBlank);
                if(typeItem) {
                    resultParams = `${typeItem.name}: ${typeItem.type}`
                } else {
                    resultParams =  searchParamsStrWithoutBlank
                }

            } else {
                throw new Error('funcContent 不是函数或者函数格式字符串');
            }
            return resultParams
        }

        if(isFuncStr(funcContent)) {
            return formateFuncStr(funcContent)
        } else if(isFunc(funcContent)) {
            return formateFuncStr(funcContent.toString());
        } else {
            throw new Error('funcContent 不是函数或者函数格式字符串');
        }
    } else {
        if(isFuncStr(funcContent)) {
            return funcContent
        } else if(isFunc(funcContent)) {
            return funcContent.toString()
        } else {
            throw new Error('funcContent 不是函数或者函数格式字符串');
        }
    } 
}

/**
 * 
 * @param {import('../types/index').Component[]} XReturn 
 */
function formateComponentJSX(Return) {
    const templatePath = path.resolve(__dirname, '../template/component.art');
    return Return.map(item => art(templatePath, item))
}
// 
// {{$imports.utils.formateComponentJSX($data.Return)}}
// 
// function formateComponentJSX(Return) {
//     // const templatePath = path.resolve(__dirname, '../template/component.art');
//     return Return.map(item => art.render(
//         `<{{$data.data.name}} {{each $data.data.props}}{{$value.name}}={{if $value.valueType === 'string'}}'{{$value.value}}'{{else}}{{{$value.value}}}{{/if}}{{/each}}>
//         {{if $data.data.children.length}}{{$import.utils.formateComponentJSX($data.data.children)}}{{/if}}
//     </{{$data.data.name}}>`, item
//     ))
// }


function objectKeys(obj) {
    return Object.keys(obj)
}

module.exports = {
    firstToUpper,
    getFuncBody,
    isAsyncFunc,
    formateComponentJSX,
    getFuncParams,
    redLog,
    greenLog,
    objectKeys
}


