const utils = require('../utils').utils
import { checkPermission } from '../model/user.js'
const loadData = require('../dataloader2').loadData
const getMoreData = require('../dataloader2').getMoreData
const reset = require('../dataloader2').reset

export default {
  data: {
    loading: false,
    totalCount: 0,
    items: [],
    request: {
      pageNo: 0,
      pageSize: 100
    },
    isLoadAll: false,
    isBackFromSarch: false,
    queryParams: {
      startDate: '',
      endDate: '',
      ticketNo: '',
      hasChecked: false,
      checker: '-1'
    }
  },
  methods: {
    onLoad: function (options) {
      var endDate = utils.getEndDate()
      var startDate = utils.getStartDate()
      this.setData({
        queryParams: {
          startDate: startDate,
          endDate: endDate,
          ticketNo: '',
          hasChecked: false,
          checker: '-1'
        }
      })
    },
    onReady: function () {
      checkPermission()
      loadData(this, 0)
    },

    onReachBottom: function () {
      getMoreData(this)
    },

    onPullDownRefresh: function () {
      reset(this)
      this.data.queryParams.ticketNo = ''
      loadData(this, 0)
      wx.stopPullDownRefresh()
    },

    updateDataList: function() {
      reset(this)
      loadData(this, 0)
    },

    reload: function() {
    }

  }
}
