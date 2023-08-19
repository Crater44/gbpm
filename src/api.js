exports.api = {
  config: function({baseURL, apiKey, axios}) {
    axios.defaults.baseURL = baseURL
    axios.defaults.headers.common = {'Authorization': `bearer ${apiKey}`}
    this.axios = axios
  },
}