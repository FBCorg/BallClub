const ActivityService = require('../modules/activityService');
const LOG_TAG = 'Activity ';


Page({
    data: {
        publishBtnEnabled: true,
    },

    onLoad: function () {
        ActivityService.queryAllActivity().then((res) => {
            console.log(LOG_TAG + JSON.stringify(res));
        });
    },

    bindPublishButton: function (e) {
        wx.navigateTo({
            url: "../activityPublish/activityPublish"
        })
    }
})