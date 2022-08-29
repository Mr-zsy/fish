const art = require('art-template');

/**
 * 第一个字母大写
 * @param {*} str 
 * @returns 
 */
function firstToUpper(str) {
    const first = str.slice(0, 1);
    const after = str.slice(1);
    return first.toLocaleUpperCase() + after;
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
    if(start && end) {
        return str.slice(start + 1, end);
    }
    const arrow = funcStr.indexOf('=>');
    if(!start && arrow) {
        return str.slice(start + 2);
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

function getFunc(funcContent, params) {
    if(Array.isArray(params) && params.length) {
        const formateFuncStr = (funcStr) => {
            const start = funcStr.indexOf('(');
            const end = funcStr.lastIndexOf(')');
            if(start && end) {
                const paramsList = str.slice(start + 1, end).replace(/\s*/g, '').split(',');
                paramsList.map((paramName, index) => {
                    const typeItem = params.find(item => item.name === paramName);
                    if(typeItem) {
                        return `${paramName}: ${typeItem.type}${index != paramsList.length - 1 ? ',' : ''}`
                    }
                })
            }
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
function formateComponentJSX(XReturn) {
    return XReturn.map(item => art.template('../template/component.art', item))
}

module.exports = {
    firstToUpper,
    getFuncBody,
    formateComponentJSX
}


