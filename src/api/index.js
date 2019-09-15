import axios from '@/axios'

const api = {
  getSearchHotList (params) {
    return axios.get('/header/searchHotWords.json', params)
  },
  getMenuList (params) {
    return axios.get('/nav/nav.json', params)
  },
  getSearchList (params) {
    return axios.get('/header/search.json', params)
  },
  getCurPoisition(params) {
    return axios.get('/city/getPosition.json', params)
  },
  getProvinceList(params) {
    return axios.get('/city/province.json', params)
  },
  getCityList(params){
      return axios.get('/city/cityList.json', params)
  },
  getHotCity(params) {
      return axios.get('/city/hot.json', params)
  },
  getRecentCity(params) {
      return axios.get('/city/recents.json', params)
  },
  resultsByKeywords(params) {
      return axios.get('/index/resultsByKeywords.json', params)
  },
  register(params) {
    return axios.post('/register', params)
  },
  login(params) {
    return axios.post('/login', params)
  },
  getProducts(params) {
    return axios.get('/list/goodsList.json');
  }
}

export default api
