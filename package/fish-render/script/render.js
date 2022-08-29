const art = require('art-template');
const path = require('path');

const compileTemplate = (Container) => {
    const templatePath = path.resolve(__dirname, '../template/container.art');
    return art(templatePath, Container)
}

module.exports = {
    compileTemplate
}