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
  setAuthToken: () => (token) => {},
  getAuthToken: ({messages, authToken}) => () => {
    if (!authToken) {
      console.log(messages.empty_token);
      return null;
    }
    console.log(messages.current_token(authToken));
  },
}