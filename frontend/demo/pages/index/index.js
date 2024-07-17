// index.js
Page({
    data: {
        photoLink: '',
        videoLink: '',
    },

    //拍摄照片
    photoCapture() {
        let that = this
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: ['camera'],
            camera: 'back',
            success(res) {
                that.setData({
                    photoLink: res.tempFiles[0].tempFilePath,
                })
                console.log(res.tempFiles[0].tempFilePath)
                console.log('图片拍摄成功')
                wx.showLoading({
                    title: '正在上传图片',
                    mask: true
                })

                //图片上传
                wx.uploadFile({
                    url:'http://localhost:5000/uploadImage',
                    filePath: res.tempFiles[0].tempFilePath,
                    name: 'photo',
                    formData: {
                       fileName:'photoTest.png'
                    },
                    success(res) {
                        wx.showToast({
                            title: res.data,
                        })
                    }
                })
            },
            fail(res) {
                console.log('图片拍摄失败')
            }
        })
    },

    //拍摄视频
    videoCapture() {
        let that = this
        wx.chooseMedia({
            count: 1,
            mediaType: ['video'],
            sourceType: ['camera'],
            maxDuration: 60,
            camera: 'back',
            success(res) {
                that.setData({
                    videoLink: res.tempFiles[0].thumbTempFilePath
                })
                console.log('视频拍摄成功')
                console.log(res.tempFiles[0].tempFilePath)
                wx.showLoading({
                    title: '正在上传视频',
                    mask: true
                })

                //视频上传
                wx.uploadFile({
                    url:'http://localhost:5000/uploadVideo',
                    filePath: res.tempFiles[0].tempFilePath,
                    name: 'video',
                    formData: {
                       fileName:'videoTest.mp4'
                    },
                    success(res) {
                        wx.showToast({
                            title: res.data,
                        })
                    }
                })
            },
            fail(res) {
                console.log('图片拍摄失败')
            }
        })
    }
})