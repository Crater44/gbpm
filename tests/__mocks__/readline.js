const readline = jest.createMockFromModule('readline');

readline._mockQuestion = jest.fn();
readline.createInterface = jest.fn(() => {
  return {
    question: (_text, cb) => cb(readline._mockQuestion()),
    close: jest.fn()
  };
});

module.exports = readline;