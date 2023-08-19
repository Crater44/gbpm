exports.actions = {
  list: (api) => () => {},
  install: () => (pkg) => {
    if (!pkg) {
      // install dependencies
    }
    // Install pkg and add it to the dependencies
  },
  init: ({ fs, userHandler, messages, pkgData }) => async () => {
    const fileName = messages.pkg_file_name;
    if (fs.existsSync(fileName)) {
      console.log(messages.pkg_file_already_exists);
      return;
    }
    userHandler.createInterface();
    for (const [key, value] of Object.entries(pkgData)) {
      const question = messages.packageDefaultDataPrompt(key, value);
      const answer = await userHandler.ask(question) || value;
      pkgData[key] = answer;
    }
    fs.writeFileSync(fileName, JSON.stringify(pkgData, null, 2));
    console.log(messages.pkg_file_created_successfully);
    userHandler.close();
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