const fsMock = require('fs');
const rlMock = require('readline');
const { actions, userHandler, constants, messages } = require('../src/exports');

jest.mock('fs');
jest.mock('readline');
jest.mock('../src/user_handler');

describe('init function', () => {
  it.only('should create gbpackage.json with default values', async () => {
    /*
      1. Check if file exists, force behavior to false and create rlInterface
      2. Calls 4 times to readlineInterface.question if nothing entered generates default data
      3. Calls 1 time to readlineInterface.close
      4. Calls filesystem with given data
    */
    const fileName = constants.pkg_file_name;
    const mockWriteFileSync = jest.spyOn(fsMock, 'writeFileSync');
    const mockExistsSync = jest.spyOn(fsMock, 'existsSync').mockReturnValue(false);
    // const closeMock = jest.fn();
    // const questionMock = jest.fn();
    // const rlInterfaceMock = { question: questionMock, close: closeMock }
    // rlMock.createInterface.mockReturnValue(rlInterfaceMock)
    // const rlInterfaceMock = jest.spyOn(userHandler, 'createInterface').mockReturnValue({
    //   question: questionMock,
    //   close: closeMock
    // });
    const mockCreateInterface = jest.spyOn(rlMock, 'createInterface')
    userHandler.config({rlMock})
    
    
    await actions.init({ fs: fsMock, userHandler, messages, pkgData: constants.gbpackage_default_data })();
    
    // // TODO: This doesn't work
    // console.log(questionMock.mock.calls[0]);
    // return ;
    // questionMock.mock.calls[0][1]('');
    // questionMock.mock.calls[1][1]('');
    // questionMock.mock.calls[2][1]('');
    // questionMock.mock.calls[3][1]('');

    expect(mockCreateInterface).toHaveBeenCalledTimes(1);
    expect(closeMock).toHaveBeenCalledTimes(1);
    // expect(questionMock).toHaveBeenCalledTimes(4);

    expect(mockExistsSync).toHaveBeenCalledWith(fileName);
    const defaultData = JSON.stringify(constants.gbpackage_default_data, null, 2);
    expect(mockWriteFileSync).toHaveBeenCalledWith(fileName, defaultData);
  });

  xit('should not create gbpackage.json if it already exists', async () => {
    const fileName = constants.pkg_file_name;
    const mockExistsSync = jest.spyOn(fsMock, 'existsSync').mockReturnValue(true);

    await actions.init({ fs: fsMock, rl: rlMock })();

    expect(mockExistsSync).toHaveBeenCalledWith(fileName);
    expect(fsMock.writeFileSync).not.toHaveBeenCalled();
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
