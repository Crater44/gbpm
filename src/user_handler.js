exports.userHandler = {
  readlineInterface: null,
  readline: null,
  config: function ({readline}) {
    this.readline = readline;
  },
  createInterface: function () {
    this.readlineInterface = this.readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  },
  ask: function (questionText) {
    return new Promise((resolve, reject) => {
      this.readlineInterface.question(questionText, (input) => resolve(input));
    });
  },
  close: function() {
    this.readlineInterface.close();
    this.readlineInterface = null
  }
};