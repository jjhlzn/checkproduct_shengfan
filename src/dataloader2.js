let service = require('./service').Service
let utils = require('./utils.js').utils

let getMoreData = function (page) {
  let self = page
  if (self.data.items.length < self.data.totalCount) {
    // this.loadData(self.data.request.pageNo + 1);
    loadData(self, self.data.request.pageNo + 1)
  } else {
    self.setData({ isLoadAll: true })
  }
}

let getMoreData2 = function (successCallback, failCallback) {
  loadData2(successCallback, failCallback)
}

let reset = function(page) {
  let self = page
  self.setData({
    request: {
      pageNo: 0,
      pageSize: 100
    },
    totalCount: 0,
    items: [],
    isLoadAll: false,
    isBackFromSearch: false
  })
}

let loadData2 = function (request, successCallback, failCallback) {
  wx.request({
    url: service.searchContractsUrl(),
    method: 'POST',
    data: request,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res)

      successCallback(res.data.items, res.data.totalCount)
    },
    fail: function (err) {
      console.error(err)
      failCallback()
    },
    complete: function () {
    }
  })
}

let loadData = function (page, pageNo) {
  var self = page
  self.data.request.pageNo = pageNo

  if (self.data.loading) {
    console.log('正在加载数据中')
    return
  }

  self.setData({ loading: true })
  self.data.loading = true
  console.log(service.searchContractsUrl())

  const queryParams = {
    pageNo: self.data.request.pageNo,
    pageSize: self.data.request.pageSize,
    startDate: self.data.queryParams.startDate,
    endDate: self.data.queryParams.endDate,
    ticketNo: self.data.queryParams.ticketNo,
    checker: self.data.queryParams.checker ? self.data.queryParams.checker : '-1',
    status: self.data.status,
    username: utils.getMyUserName()
  }

  console.log(queryParams)

  wx.request({
    url: service.searchContractsUrl(),
    method: 'POST',
    data: queryParams,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res)
      let items = self.data.items
      res.data.items.forEach((item) => {
        if (item.outDate) {
          item.outDate = item.outDate.substr(0, item.outDate.indexOf(' '))
        }
      })
      items.push.apply(items, res.data.items)
      console.log('res:', res)
      self.setData({ items: items, totalCount: res.data.totalCount })
      console.log(items.length)
      console.log(res.data.totalCount)
      if (items.length === res.data.totalCount) {
        self.setData({ isLoadAll: true })
      }
    },
    fail: function (err) {
      console.error(err)
      wx.showToast({
        title: '加载失败'
      })
    },
    complete: function () {
      self.setData({ loading: false })
    }
  })
}

let reloadOrder = function(page, orderNo, contractNo) {
  console.log('ticketNo: ' + orderNo + ', contractNo: ' + contractNo)
  wx.request({
    url: service.getContractInfoUrl(),
    method: 'POST',
    data: {
      ticketNo: orderNo,
      contractNo: contractNo
    },
    header: {
      'content-type': 'application/json'
    },
    complete: function (res) {
      console.log('reloadOrder: ' + JSON.stringify(res))
      // eslint-disable-next-line eqeqeq
      if (res.data.status != 0) {
        return
      }
      let order = res.data.contract
      let orders = page.data.items
      console.log(JSON.stringify(page.data))
      for (var i = 0; i < orders.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (orders[i].ticketNo == order.ticketNo && orders[i].contractNo == order.contractNo) {
          orders[i] = order
          page.setData({items: orders})
          console.log('find order: ' + order.ticketNo)
          break
        }
      }
    },
    // eslint-disable-next-line handle-callback-err
    fail: function (err) {
    }
  })
}

module.exports = {
  loadData: loadData,
  loadData2: loadData2,
  getMoreData: getMoreData,
  getMoreData2: getMoreData2,
  reset: reset,
  reloadOrder: reloadOrder
}
