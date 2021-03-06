import JsonP from 'jsonp'
import axios from 'axios'
import {Modal} from 'antd'
import utils from "./utils";
const baseUrl = 'https://easy-mock.com/mock/5cca3e9748225f49a0e042e4/api'

export default class Axios {
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JsonP(options.url, {param: 'callback'}, function (err, response) {
        if (response.status === 'success') {
          resolve(response);
        } else {
          reject(response.messsage);
        }
      })
    })
  }

  static requestList(_this, url) {
    this.ajax({
      url,
      data: {
        params: _this.params
      }
    }).then(res => {
      let list = res.result.list.map((item, index) => {
        item.key = index
        return item
      })
      _this.setState({
        list,
        pagination: utils.pagination(res, (current) => {
          _this.params.page = current
          _this.requestList()
        })
      })
    })
  }

  static ajax(options) {
    let loading
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading')
      loading.style.display = 'block'
    }
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: options.method || 'get',
        baseURL: baseUrl,
        timeout: 5000,
        params: (options.data && options.data.params) || ''
      }).then(response => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading')
          loading.style.display = 'none'
        }
        if (response.status === 200) {
          let res = response.data
          if (res.code === 0) {
            resolve(res)
          } else {
            Modal.info({
              title: '提示',
              content: res.msg
            })
          }
        } else {
          reject(response.data)
        }
      })
    })
  }
}