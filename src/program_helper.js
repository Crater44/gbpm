// TODO: Extend the program class instead of export this functions

exports.setProgramConfig = function({program, name, description, version}) {
  program
    .name(name)
    .description(description)
    .version(version);
}
exports.setProgramCommands = function({program, fs, rl, actions, api, middleware}) {
  program
    .command("set-auth-token")
    .description("Set the auth token\n\n")
    .action(actions.setAuthToken());

  program
    .command("get-auth-token")
    .description("Display the current token\n\n")
    .action(actions.getAuthToken());

  program
    .command("init")
    .description("Create a greypackage.json file to write down the installed dependencies\n\n")
    .action(actions.init({ fs, rl }));

  program
    .command("list")
    .description("List all the github repositories containing the file greypackage.json\n\n")
    .action(actions.list(api));

  program
    .command("description")
    .description("Show the description of a package\n\n")
    .argument("<pkg>", "package name")
    .action(actions.getDescription());

  program
    .command("author")
    .description("Show the name of the author of a package\n\n")
    .argument("<pkg>", "package name")
    .action(actions.getAuthor());

  program
    .command("install")
    .description("Install a package into your vendor folder. If the folder doesn't exist, it'll be created.\nAlternatively, when invoked without arguments, the command installs the necessary dependencies.\n\n")
    .argument("[pkg]", "package name")
    .action(actions.install());

};
