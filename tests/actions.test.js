const fsMock = require('fs');
const rlMock = require('readline');
const { actions } = require('../src/actions');
const { user_handler } = require('../src/user_handler');

jest.mock('fs');
jest.mock('readline');
jest.mock('../src/user_handler');

describe('init function', () => {
  it('should create gbpackage.json with default values', async () => {
    /*
      1. Check if file exists, force behavior to false and create rlInterface
      2. Calls 4 times to readlineInterface.question if nothing entered generates default data
      3. Calls 1 time to readlineInterface.close
      4. Calls filesystem with given data
    */
    const fileName = 'gbpackage.json';
    const mockWriteFileSync = jest.spyOn(fsMock, 'writeFileSync');
    const mockExistsSync = jest.spyOn(fsMock, 'existsSync').mockReturnValue(false);
    const closeMock = jest.fn();
    const questionMock = jest.fn();
    const rlInstanceMock = { question: questionMock, close: closeMock };
    jest.spyOn(user_handler, 'createInterface').mockReturnValue(rlInstanceMock);
    
    await actions.init({ fs: fsMock, user_handler: user_handler })();
    
    // TODO: This doesn't work
    questionMock.mock.calls[0][1]('');
    questionMock.mock.calls[1][1]('');
    questionMock.mock.calls[2][1]('');
    questionMock.mock.calls[3][1]('');

    expect(closeMock).toHaveBeenCalledTimes(1);

    expect(mockExistsSync).toHaveBeenCalledWith(fileName);
    const defaultData = JSON.stringify({
      author: "Your Name",
      description: "Your Project Description",
      version: "1.0.0",
      name: "Your Project Name"
    }, null, 2);
    expect(mockWriteFileSync).toHaveBeenCalledWith(fileName, defaultData);
  });

  xit('should not create gbpackage.json if it already exists', async () => {
    const fileName = 'gbpackage.json';
    const mockExistsSync = jest.spyOn(fsMock, 'existsSync').mockReturnValue(true);

    await actions.init({ fs: fsMock, rl: rlMock })();

    expect(mockExistsSync).toHaveBeenCalledWith(fileName);
    expect(fsMock.writeFileSync).not.toHaveBeenCalled();
  });
});
