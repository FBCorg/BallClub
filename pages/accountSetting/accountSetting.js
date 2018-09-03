/**
 * Created by yongqiang on 2018/9/2.
 */

const AccountService = require('../modules/accountService');

Page({
    data: {
        saveBtnEnabled: true,
    },

    onLoad: function () {

    },

    bindSaveButton: function (e) {
        let info = {
            name: AccountService.getNickName(),
            sex: AccountService.getSex(),
            age: AccountService.getAge(),
        };
        AccountService.updateUserInfo(info);
    }
})
