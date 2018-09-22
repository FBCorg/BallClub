const ActivityService = require('../modules/activityService');
const LOG_TAG = 'ActivityPublish ';


Page({
    data: {
        publishBtnEnabled: true,
        placeholder: '活动标题',
        focus: false,
        type: 'text',
        disabled: false,
        maxlength: 30,
        value: '',
        bindchange: 'bindTitleInputChanged',
        bindinput: 'bindTitleInputFocus',
        bindfocus: 'bindTitleInputInput',
        bindblur: 'bindTitleInputBlur',
    },

    onLoad: function () {

    },

    bindTitleInputChanged: function(e) {},

    bindTitleInputFocus: function(e) {},

    bindTitleInputInput: function(e) {
        let searchText = e.detail.value;
    },

    bindTitleInputBlur: function(e) {},

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