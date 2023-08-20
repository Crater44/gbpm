const fs = require('./__mocks__/fs');
const readline = require('./__mocks__/readline');
const { actions, userHandler, constants, messages } = require('../src/exports');

describe('Command init', () => {
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
  
  it('can create pkg_file with default values', async () => {
    fs.existsSync.mockReturnValue(false);
    userHandler.config({ readline })
    await actions.init({ 
      fs: fs,
      userHandler: userHandler,
      messages: messages,
      pkgData: constants.pkgDefaultData,
      pkgFileName: constants.pkgFileName,
    })();
    expect(readline.createInterface).toHaveBeenCalledTimes(1);
    expect(fs.existsSync).toHaveBeenCalledWith(constants.pkgFileName);
    const defaultData = JSON.stringify(constants.pkgDefaultData, null, 2);
    expect(fs.writeFileSync).toHaveBeenCalledWith(constants.pkgFileName, defaultData);
  });
  
  it('can create pkg_file with custom values', async () => {
    fs.existsSync.mockReturnValue(false);
    readline._mockQuestion
      .mockResolvedValueOnce('test_value_1')
      .mockResolvedValueOnce('test_value_2')
      .mockResolvedValueOnce('test_value_3')
      .mockResolvedValueOnce('test_value_4')
    userHandler.config({ readline })
    await actions.init({ 
      fs: fs,
      userHandler: userHandler,
      messages: messages,
      pkgData: constants.pkgDefaultData,
      pkgFileName: constants.pkgFileName,
    })();
    const data = JSON.stringify({
      author: 'test_value_1',
      description: 'test_value_2',
      version: 'test_value_3',
      name: 'test_value_4'
    }, null, 2);
    expect(fs.writeFileSync).toHaveBeenCalledWith(constants.pkgFileName, data);
  });
});

describe('Command set-auth-token token', () => {
  it('should not set an empty token', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const token = '';
    actions.setAuthToken({fs, messages})(token);
    expect(consoleLogSpy).toHaveBeenCalledWith(messages.token_param_cant_be_empty);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    consoleLogSpy.mockRestore();
  });
  it('should set the token in .env', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const token = 'new_value';
    const mockEnv = 'TEST=some_var\nAUTH_TOKEN=old_value'
    fs.readFileSync.mockReturnValue(mockEnv);
    actions.setAuthToken({fs, messages})(token);
    expect(fs.writeFileSync).toHaveBeenCalledWith('.env', 'TEST=some_var\nAUTH_TOKEN='+token);
    expect(fs.readFileSync).toHaveBeenCalledWith('.env', 'utf8');
    expect(consoleLogSpy).toHaveBeenCalledWith(messages.auth_token_set_successfully);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    consoleLogSpy.mockRestore();
  });
});

describe('Command get-auth-token token', () => {
  it('should print the token', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const authToken = 'test'
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
