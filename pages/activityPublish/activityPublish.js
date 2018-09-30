const ActivityService = require('../modules/activityService');
const LOG_TAG = 'ActivityPublish ';


Page({
    data: {
        publishBtnEnabled: true,
        type: 'text',
        disabled: false,
        value: '',
        bindTitleInput: 'bindTitleInputInput',
        bindContentInput: 'bindContentInputInput',
        date: '2018-09-30',
        time: '23:59',
    },

    onLoad: function () {

    },

    bindTitleInputInput: function(e) {
        let searchText = e.detail.value;
    },

    bindContentInputInput: function(e) {},

    bindDateChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },

    bindTimeChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            time: e.detail.value
        })
    },

    bindPublishButton: function (e) {
        let info = {
            title: '不服就干',
            content: '干一场',
            positionLatitude: 232,
            positionLongitude: 232,
            endingTime: Date.now() + 100000,
        };
        ActivityService.publishActivity(info).then((res) => {
            console.log(LOG_TAG + JSON.stringify(res));
        });
    }
})