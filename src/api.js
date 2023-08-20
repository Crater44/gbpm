exports.api = {
  config: function({baseURL, authToken, axios}) {
    axios.defaults.baseURL = baseURL
    axios.defaults.headers.common = {'Authorization': `bearer ${authToken}`}
    this.axios = axios
  },
}