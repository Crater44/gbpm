exports.programHelper = {
  config: function({name, description, version}) {
    this
    .name(name)
    .description(description)
    .version(version);
  },
  setCommands: function({fs, constants, messages, userHandler, actions, api, middleware}) {
    this.command("set-auth-token")
    .description("Set the auth token\n\n")
    .action(actions.setAuthToken());
    
    this.command("get-auth-token")
    .description("Display the current token\n\n")
    .action(actions.getAuthToken({messages: messages, authToken: constants.authToken}));
    
    this.command("init")
    .description("Create a greypackage.json file to write down the installed dependencies\n\n")
    .action(actions.init({ fs, userHandler }));
    
    this.command("list")
    .description("List all the github repositories containing the file greypackage.json\n\n")
    .action(actions.list(api));
    
    this.command("description")
    .description("Show the description of a package\n\n")
    .argument("<pkg>", "package name")
    .action(actions.getDescription());
    
    this.command("author")
    .description("Show the name of the author of a package\n\n")
    .argument("<pkg>", "package name")
    .action(actions.getAuthor());
    
    this.command("install")
    .description("Install a package into your vendor folder. If the folder doesn't exist, it'll be created.\nAlternatively, when invoked without arguments, the command installs the necessary dependencies.\n\n")
    .argument("[pkg]", "package name")
    .action(actions.install());
  },
}