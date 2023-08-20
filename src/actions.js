exports.actions = {
  list: (api) => () => {},
  install: () => (pkg) => {
    if (!pkg) {
      // install dependencies
    }
    // Install pkg and add it to the dependencies
  },
  init: ({ fs, userHandler, messages, pkgData, pkgFileName }) => async () => {
    if (fs.existsSync(pkgFileName)) {
      console.log(messages.file_already_exists(pkgFileName));
      return;
    }
    userHandler.createInterface();
    for (const [key, value] of Object.entries(pkgData)) {
      const question = messages.package_default_data_prompt(key, value);
      const answer = await userHandler.ask(question) || value;
      pkgData[key] = answer;
    }
    fs.writeFileSync(pkgFileName, JSON.stringify(pkgData, null, 2));
    userHandler.close();
    console.log(messages.file_created_successfully(pkgFileName));
  },
  getDescription: () => (pkg) => {},
  getAuthor: () => (pkg) => {},
  setAuthToken: ({fs, messages}) => (token) => {
    if (!token) {
      console.log(messages.token_param_cant_be_empty);
      return null;
    }
    const data = fs.readFileSync('.env', 'utf8');
    const modifiedData = data.replace(/^AUTH_TOKEN=.*/gm, `AUTH_TOKEN=${token}`);
    fs.writeFileSync('.env', modifiedData);
    console.log(messages.auth_token_set_successfully);
  },
  getAuthToken: ({messages, authToken}) => () => {
    if (!authToken) {
      console.log(messages.empty_token);
      return null;
    }
    console.log(messages.current_token(authToken));
  },
}