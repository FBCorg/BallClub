// import AccountService from '../'
const AccountService = require('../modules/accountService');
const app = getApp()
const LOG_TAG = 'HomePage ';

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        userName: 'dick',
        userStatus: '管理员',
        userHeadUrl: "https://cdn.futu5.com/images/index/logo.png?2vVjrXqjwJd5kznkqINu3bE0.cn",

        userInfoTabChooseIdx: 0,
        userInfoTabConfig: ['资料', '数据', '能力']
    },

    onLoad: function () {
       if (this.data.canIUse){
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                // console.log('userInfoReadyCallback '+JSON.stringify(res));
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
                AccountService.setWxInfo(res.userInfo);
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理

        }

        AccountService.getUserInfo().then((res) => {
            console.log(LOG_TAG + JSON.stringify(res));
        });


    },

    bindChangeUserInfoTap: function(e) {
        let clickIdx = parseInt(e.currentTarget.id);
        if (parseInt(this.data.userInfoTabChooseIdx) != clickIdx) {
            this.setData({
                userInfoTabChooseIdx: clickIdx
            });
        }
    },

    bindGotoSetting: function(e) {
        wx.navigateTo({
            url: "../accountSetting/accountSetting"
        })
        // console.log(e)
        // app.globalData.userInfo = e.detail.userInfo
        // this.setData({
        //     userInfo: e.detail.userInfo,
        //     hasUserInfo: true
        // })
    },

    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})