exports.messages = {
  current_token: token => `Your current token is: ${token}`,
  empty_token: "Your token is empty",
  packageDefaultDataPrompt: (key, value) => `${key} (default: ${value}): `,
  required_arg_token: "<token>",
  required_arg_package: "<pkg>",
  optional_arg_package: "[pkg]",
  commands: {
    set_auth_token: {
      name: "set-auth-token",
      description: "Set the auth token\n\n",
    },
    get_auth_token: {
      name: "get-auth-token",
      description: "Display the current token\n\n"    
    },
    init: {
      name: "init",
      description: "Create a greypackage.json file to write down the installed dependencies\n\n"
    },
    list: {
      name: "list",
      description: "List all the github repositories containing the file greypackage.json\n\n"
    },
    description: {
      name: "description",
      description: "Show the description of a package\n\n",
    },
    author: {
      name: "author",
      description: "Show the name of the author of a package\n\n",
    },
    install: {
      name: "install",
      description: "Install a package into your vendor folder. If the folder doesn't exist, it'll be created.\nAlternatively, when invoked without arguments, the command installs the necessary dependencies.\n\n",
    },
  }
};