const art = require('art-template');
const path = require('path');
const utils = require('../utils/index');

const register = () => {
    art.defaults.imports.utils = utils;
    art.defaults.debug=true;
}

const patch = (str) => {
    const res = str.replace('&#62;', '>')
    return res
}

const compileTemplate = (Container) => {
    register();
    const templatePath = path.resolve(__dirname, '../template/container.art');
    return patch(art(templatePath, Container))
}

module.exports = {
    compileTemplate
}