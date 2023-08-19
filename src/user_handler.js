exports.user_handler = {
  config: function ({readline}) {
    this.readline = readline;
  },
  createInterface: function () {
    return this.readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  },
  ask: function (readlineInterface, questionText) {
    return new Promise((resolve, reject) => {
      readlineInterface.question(questionText, (input) => resolve(input));
    });
  },
};