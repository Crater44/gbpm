const exec = require('util').promisify(require('child_process').exec);
const fs = require('fs');
const readline = require('readline');
const { program } = require('commander');
const axios = require('axios');
const { baseURL, apiKey } = require('dotenv').config().parsed;
const { name, description, version } = require('./package.json');
const { actions, api, setProgramCommands, setProgramConfig, middleware, user_handler } = require('./src/exports.js');
const { gitIsInstalled } = require('git-is-installed');

api.config({ baseURL, apiKey, axios });
user_handler.config({ readline });

setProgramConfig({ program, name, description, version });
setProgramCommands({ program, fs, user_handler, actions, middleware, api });

program.parse(process.argv);