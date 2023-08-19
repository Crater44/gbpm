const fs = require('fs');
const readline = require('readline');
const { program } = require('commander');
const axios = require('axios');
const { baseURL, authToken } = require('dotenv').config().parsed;
const { name, description, version } = require('./package.json');
const { actions, constants, messages, api, programHelper, middleware, userHandler } = require('./src/exports');
// const { gitIsInstalled } = require('git-is-installed'); try with fs

constants.config({ baseURL, authToken });

api.config({ baseURL, authToken, axios });
userHandler.config({ readline });

programHelper.config.call(program, {name, description, version});
programHelper.setCommands.call(program, {fs, constants, messages, userHandler, actions, api, middleware});

program.parse(process.argv);