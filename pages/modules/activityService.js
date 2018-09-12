/**
 * Created by yongqiang on 2018/8/12.
 */

import {kNRActivityPublish, kNRActivityQueryAll} from './util/constants'
const network = require('./util/network');
const BDError = require('./util/BDError');
const StorageService = require('./storage/StorageService');
const StorageKeys = require('./storage/StorageKeys');
const LOG_TAG = 'ActivityService ';


let activityService = {};

let doRequest = (options) => {
    options.isFail = function(data) {
        if (!data.error) {
            return false;
        }
        // FtLog.e(TAG, "doRequest()", "e: ", data.error);
        return true;
    };
    options.getError = (data) => {
        let error = data.error;
        return new BDError(error.error_msg, error.error_code);
    }
    return network.doRequest(options);
}

activityService.publishActivity = function (info) {
    return doRequest({
        url: kNRActivityPublish,
        method: 'POST',
        data: info
    }).then((res) => {
        console.log(LOG_TAG + 'publishActivity' + JSON.stringify(res));
        return res;
    }).catch((e) => {
        console.log(LOG_TAG + 'publishActivity' + JSON.stringify(e));
    });
}

activityService.queryAllActivity = function () {
    return doRequest({
        url: kNRActivityQueryAll,
        method: 'POST',
        data: {}
    }).then((res) => {
        console.log(LOG_TAG + 'queryAllActivity' + JSON.stringify(res));
        return res;
    }).catch((e) => {
        console.log(LOG_TAG + 'queryAllActivity' + JSON.stringify(e));
    })
}

module.exports = activityService;