/**
 * Created by yongqiang on 2018/8/12.
 */

import {kNRPublishActivity} from './util/constants'
const network = require('./util/network');
const extend = require('./util/extend');
const Promise = require('./util/promise');
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
    doRequest({
        url: kNRPublishActivity,
        method: 'POST',
        data: extend(info, {_: Date.now()})
    }).then((res) => {
        console.log(LOG_TAG + JSON.stringify(res));
        return res;
    }).catch((e) => {
        console.log(LOG_TAG + JSON.stringify(e));
    });
}

module.exports = activityService;