const config = require("@spellbook/linter-config");

config.rules["unicorn/prevent-abbreviations"][1].replacements["dev"] = false;
delete config.parserOptions.babelOptions;

module.exports = config;
