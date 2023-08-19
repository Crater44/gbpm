exports.programHelper = {
  config: function({ name, description, version }) {
    this
    .name(name)
    .description(description)
    .version(version);
  },
  setCommands: function({ fs, constants, messages, userHandler, actions, api, middleware }) {
    const commands = {
      set_auth_token: { argument: 'required_arg_token', action: () => actions.setAuthToken() },
      get_auth_token: { action: () => actions.getAuthToken({ messages, authToken: constants.auth}) },
      init: { action: () => actions.init({ fs, userHandler, messages, pkgData: constants.gbpackage_default_data }) },
      list: { action: () => actions.list(api) },
      description: { argument: 'required_arg_package', action: () => actions.getDescription() },
      author: { argument: 'required_arg_package', action: () => actions.getAuthor() },
      install: { argument: 'optional_arg_package', action: () => actions.install() },
    }
    for (const [name, command] of Object.entries(commands)) {
        const ctx = this.command(messages.commands[name].name);
        ctx.description(messages.commands[name].description);
        ctx.action(command.action());
        if (command.argument) ctx.arguments(messages[command.argument]);
    }
  }
}