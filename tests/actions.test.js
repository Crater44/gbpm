const fs = require('./__mocks__/fs');
const readline = require('./__mocks__/readline');
const { actions, userHandler, constants, messages } = require('../src/exports');

describe('init function', () => {
  it('should not create pkg_file if it already exists', async () => {
    fs.existsSync.mockReturnValue(true);
    await actions.init({ 
      fs: fs,
      userHandler: userHandler,
      messages: messages,
      pkgData: constants.pkgDefaultData,
      pkgFileName: constants.pkgFileName
    })();
    expect(fs.existsSync).toHaveBeenCalledWith(constants.pkgFileName);
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });
  
  it('should create pkg_file with default values', async () => {
      fs.existsSync.mockReturnValue(false);
      readline._mockQuestion.mockResolvedValue('')
      userHandler.config({ readline })
      await actions.init({ 
        fs: fs,
        userHandler: userHandler,
        messages: messages,
        pkgData: constants.pkgDefaultData,
        pkgFileName: constants.pkgFileName
      })();
      expect(readline.createInterface).toHaveBeenCalledTimes(1);
      expect(fs.existsSync).toHaveBeenCalledWith(constants.pkgFileName);
      const defaultData = JSON.stringify(constants.pkgDefaultData, null, 2);
      expect(fs.writeFileSync).toHaveBeenCalledWith(constants.pkgFileName, defaultData);
    });
});

describe('set token function', () => {
  it.todo('should set the token')
  it.todo('can\'t set empty token')
});

describe('get token function', () => {
  it('should print the token', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    authToken = 'test'
    actions.getAuthToken({messages: messages, authToken: authToken})()
    expect(consoleLogSpy).toHaveBeenCalledWith(messages.current_token(authToken));
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    consoleLogSpy.mockRestore();
  })
  it('should print default message if token is empty', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    actions.getAuthToken({messages: messages, authToken: ''})()
    expect(consoleLogSpy).toHaveBeenCalledWith(messages.empty_token);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    consoleLogSpy.mockRestore();
  })
})
