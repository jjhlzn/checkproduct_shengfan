let service = require('../service').Service

function handleImageUploadFail() {
  wx.hideLoading()
  wx.showToast({
    title: '图片上传失败',
    duration: 3000
  })
}

function uploadFiles(files, controller, uploadCompleteHandler, formData) {
  let self = controller
  self.data.uploadedCount = 0

  if (files.length === 0) {
    self.uploadCompleteHandler()
  } else {
    for (var i = 0; i < files.length && i < self.data.maxUploadCount; i++) {
      upload(files, i, self, uploadCompleteHandler, formData)
    }
  }
}

function upload(files, index, controller, uploadCompleteHandler, formData) {
  formData = formData || {}
  var self = controller
  // console.log("self: " + self);
  var filePath = files[index]
  console.log(files[index])
  console.log(typeof (files[index]))
  if (typeof (files[index]) !== 'string') {
    formData['type'] = files[index][0] + ''
    filePath = files[index][1]
  }
  console.log('formdata: ' + JSON.stringify(formData))
  console.log(service.uploadFileUrl())
  wx.uploadFile({
    url: service.uploadFileUrl(),
    filePath: filePath,
    name: filePath,
    formData: formData,
    success: function (res) {
      console.log(res)
      
      let json = null
      try {
        json = JSON.parse(res.data)
      } catch (ex) {
        console.log('exception: ' + ex)
        handleImageUploadFail()
        return
      }
      console.log(json)
      if (json.status !== 0) {
        self.handleImageUploadFail()
        return
      }
      let newItem = {
        originName: json.orginNames[0],
        fileName: json.fileNames[0],
        hasAddToDB: false,
        index: index
      }
      self.data.addImages.push(newItem)
      self.data.uploadedCount++
      console.log('完成第' + self.data.uploadedCount + '张')

      if (controller.data.uploadImageError) {
        wx.hideLoading()
        return
      }

      if (self.data.uploadedCount === files.length) {
        wx.hideLoading()
        self.uploadCompleteHandler()
      } else {
        wx.showLoading({
          title: '上传中( ' + (self.data.uploadedCount + 1) + '/' + files.length + ' )'
        })
        let next = index + self.data.maxUploadCount
        if (next < files.length) {
          upload(files, index + self.data.maxUploadCount, self)
        }
      }
    },
    fail: function (err) {
      console.log(err)
      controller.data.uploadImageError = true
      handleImageUploadFail()
    }
  })
}

module.exports = {
  uploadFiles: uploadFiles
}
