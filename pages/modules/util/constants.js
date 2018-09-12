/**
 * Created by yongqiang on 2018/8/13.
 */

const kNetworkRequestHeader = "https://www.995078.com/";
const kNRWxLogin = kNetworkRequestHeader + 'wx/login';
const kNRUpdateUserInfo = kNetworkRequestHeader + 'user/update';
const kNRSaveUserInfo = kNetworkRequestHeader + 'user/save';
const kNRActivityPublish = kNetworkRequestHeader + 'activity/save';
const kNRActivityQueryAll = kNetworkRequestHeader + 'activity/queryAll';
const kNRQueryMatchData = kNetworkRequestHeader + 'user/queryMatchData';


let kUserSexType = {
    Female: {value: 0, desc: '女'},
    Male: {value: 1, desc: '男'}
};

let kUserRoleType = {
    Admin: {value: 0, desc: '管理员'},
    Member: {value: 1, desc: '会员'},
    MemberUnCheck: {value: 2, desc: '待审会员'},
    Visitor: {value: 3, desc: '访客'}
};

let kUserFootBallPositionType = {
    Keeper: {value: 0, desc: '门将'},
    CenterBack: {value: 1, desc: '中后卫'},
    LeftSideBack: {value: 2, desc: '左边后卫'},
    RightSideBack: {value: 3, desc: '右边后卫'},
    Forward: {value: 4, desc: '前锋'},
    LeftWinger: {value: 5, desc: '左边锋'},
    RightWinger: {value: 6, desc: '右边锋'},
    CenterForward: {value: 7, desc: '中锋'},
};


export {
    kUserSexType,
    kUserRoleType,
    kUserFootBallPositionType,
    kNetworkRequestHeader,
    kNRWxLogin,
    kNRUpdateUserInfo,
    kNRSaveUserInfo,
    kNRQueryMatchData,
    kNRActivityPublish,
    kNRActivityQueryAll,
}