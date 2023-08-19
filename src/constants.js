exports.constants = {
  config: function ({ ...properties }) {
    for (const [key, value] of Object.entries(properties)) {
      this[key] = value;
    }
  },
  gbpackage_default_data: {
    author: 'Your Name',
    description: 'Your Project Description',
    version: '1.0.0',
    name: 'Your Project Name'
  },
  baseURL: '',
  authToken: '',
};