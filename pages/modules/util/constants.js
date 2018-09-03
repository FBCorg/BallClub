/**
 * Created by yongqiang on 2018/8/13.
 */

const kNetworkRequestHeader = "https://www.995078.com/";
const kNRWxLogin = kNetworkRequestHeader + 'wx/login';
const kNRUpdateUserInfo = kNetworkRequestHeader + 'user/update';
const kNRPublishActivity = kNetworkRequestHeader + 'activity/save';


let kUserSexType = {
    Male: {value: 0, desc: 'Male'},
    Female: {value: 1, desc: 'Female'}
};

let kUserRoleType = {
    Admin: {value: 0, desc: 'Admin'},
    Member: {value: 1, desc: 'Member'},
    MemberUnCheck: {value: 2, desc: 'MemberUnCheck'},
    Visitor: {value: 3, desc: 'Visitor'}
};

let kUserFootBallPositionType = {
    Keeper: {value: 0, desc: 'Admin'},
    CenterBack: {value: 1, desc: 'CenterBack'},
    LeftSideBack: {value: 2, desc: 'LeftSideBack'},
    RightSideBack: {value: 3, desc: 'RightSideBack'},
    Forward: {value: 4, desc: 'Forward'},
    LeftWinger: {value: 5, desc: 'LeftWinger'},
    RightWinger: {value: 6, desc: 'RightWinger'},
    CenterForward: {value: 7, desc: 'CenterForward'},
};


export {
    kUserSexType,
    kUserRoleType,
    kUserFootBallPositionType,
    kNetworkRequestHeader,
    kNRWxLogin,
    kNRUpdateUserInfo,
    kNRPublishActivity
}