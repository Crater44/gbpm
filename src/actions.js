exports.actions = {
  list: (api) => () => {},
  install: () => (pkg) => {
    if (!pkg) {
      // install dependencies
    }
    // Install pkg and add it to the dependencies
  },
  init: ({ fs, user_handler }) => async () => {
    const fileName = 'gbpackage.json';
    if (fs.existsSync(fileName)) {
      console.log('gbpackage.json already exists.');
      return;
    }
    const pkgData = {
      author: 'Your Name',
      description: 'Your Project Description',
      version: '1.0.0',
      name: 'Your Project Name'
    };
    const readlineInterface = user_handler.createInterface();
    for (const [key, value] of Object.entries(pkgData)) {
      pkgData[key] = await user_handler.ask(readlineInterface, `${key} (default: ${value}): `) || value
    }
    fs.writeFileSync(fileName, JSON.stringify(pkgData, null, 2));
    console.log('gbpackage.json created successfully.');
    readlineInterface.close();
  },
  getDescription: () => (pkg) => {},
  getAuthor: () => (pkg) => {},
  setAuthToken: () => (token) => {},
  getAuthToken: () => () => {},
}