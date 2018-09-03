const ActivityService = require('../modules/activityService');

Page({
    data: {
        publishBtnEnabled: true,
    },

    onLoad: function () {

    },

    bindPublishButton: function (e) {
        let info = {
            title: '不服就干',
            content: '干一场',
            positionLatitude: 232,
            positionLongitude: 232,
            endingTime: Date.now() + 100000,
        };
        ActivityService.publishActivity(info);
    }
})