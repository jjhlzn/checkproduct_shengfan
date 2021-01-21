class Service {
  constructor() {
    this.isTest = true
    this.isLocal = false
    if (this.isLocal) {
      this.http = 'http'
      this.host = 'localhost'
      this.port = ':2002'
      //this.port = ':5001'
      this.prefix = ''
    } else {
      if (this.isTest) {
        this.http = 'https'
       //this.host = 'xcx.yarunaccessories.com'
        this.host = 'fanzhi.hengdianworld.com'
        this.port = ''
        this.prefix = ''
      } else {
        this.http = 'http'
        this.host = '10.211.55.6'
        this.port = ':80'
        this.prefix = ''
      }
    }
  } 
  loginUrl() {
    return `${this.http}://${this.host}${this.port}/login${this.prefix}`
  }

  modifyPasswordUrl() {
    return `${this.http}://${this.host}${this.port}/modifypassword${this.prefix}`
  }

  uploadFileUrl() {
    return `${this.http}://${this.host}${this.port}/upload${this.prefix}`
  }

  checkProductUrl() {
    return `${this.http}://${this.host}${this.port}/checkproduct${this.prefix}`
  }

  checkOrderUrl() {
    return `${this.http}://${this.host}${this.port}/checkorder${this.prefix}`
  }

  getCheckOrdersUrl() {
    return `${this.http}://${this.host}${this.port}/getcheckorders${this.prefix}`
  }

  getNotCheckListUrl() {
    return `${this.http}://${this.host}${this.port}/getnotchecklist${this.prefix}`
  }

  getCheckListUrl() {
    return `${this.http}://${this.host}${this.port}/getchecklist${this.prefix}`
  }

  getCheckItemUrl() {
    return `${this.http}://${this.host}${this.port}/getcheckitem${this.prefix}`
  }

  getCheckFileUrl() {
    return `${this.http}://${this.host}${this.port}/getcheckfile${this.prefix}`
  }

  getCheckImagesUrl() {
    return `${this.http}://${this.host}${this.port}/getcheckimages${this.prefix}`
  }

  getCheckImageUrl(filename) {
    return `${this.http}://${this.host}${this.port}/uploads/${filename}`
  }

  getCheckItemResultUrl() {
    return `${this.http}://${this.host}${this.port}/getcheckitemresult${this.prefix}`
  }

  getAllCheckersUrl() {
    return `${this.http}://${this.host}${this.port}/getallcheckers${this.prefix}`
  }

  assignCheckerUrl() {
    return `${this.http}://${this.host}${this.port}/assignchecker${this.prefix}`
  }

  getCheckOrderContractsUrl() {
    return `${this.http}://${this.host}${this.port}/getcheckordercontracts${this.prefix}`
  }

  searchContractsUrl() {
    return `${this.http}://${this.host}${this.port}/searchcontracts${this.prefix}`
  }

  getContractInfoUrl() {
    return `${this.http}://${this.host}${this.port}/getcontractinfo${this.prefix}`
  }

  getProductInfoUrl() {
    return `${this.http}://${this.host}${this.port}/getproductinfo${this.prefix}`
  }

  getProductsUrl() {
    return `${this.http}://${this.host}${this.port}/getproducts${this.prefix}`
  }

  getCheckOrderInfoUrl() {
    return `${this.http}://${this.host}${this.port}/getcheckorderinfo${this.prefix}`
  }

  clearCheckResultUrl() {
    return `${this.http}://${this.host}${this.port}/clearproductcheckresult${this.prefix}`
  }

  saveZiliaoUrl() {
    return `${this.http}://${this.host}${this.port}/saveziliaoku${this.prefix}`
  }

  geoReverseUrl() {
    return `${this.http}://${this.host}${this.port}/georeverse${this.prefix}`
  }

  getCheckReportUrl(ticketNo, contractNo, spid, productNo) {
    return `${this.http}://${this.host}${this.port}/report.html?ticketNo=${ticketNo}&contractNo=${contractNo}&spid=${spid}&productNo=${productNo}`
  }

  makeImageUrl(item) {
    console.log('makeImageUrl, item: ' + item)
    if (item.fileName) {
      return `${this.http}://${this.host}${this.port}/images/${item.fileName}`
    } else {
      return `${this.http}://${this.host}${this.port}/images/${item}`
    }
  }

  makeProductImageUrl(item) {
    return `${this.http}://${this.host}${this.port}/${item}`
  }
  takeOrderUrl() {
    return `${this.http}://${this.host}${this.port}/takeorder${this.prefix}`
  }

  uploadTmpFileUrl() {
    return `${this.http}://${this.host}${this.port}/uploadtmpfile${this.prefix}`
  }
}

module.exports = {
  Service: new Service()
}
