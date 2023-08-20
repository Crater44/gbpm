exports.constants = {
  config: function ({ ...properties }) {
    for (const [key, value] of Object.entries(properties)) {
      this[key] = value;
    }
  },
  pkgDefaultData: {
    author: 'Your Name',
    description: 'Your Project Description',
    version: '1.0.0',
    name: 'Your Project Name'
  },
  pkgFileName: 'gbpmrc',
  baseURL: '',
  authToken: '',
};