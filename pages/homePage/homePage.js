// import AccountService from '../'
const AccountService = require('../modules/accountService');
import {kUserRoleType, kUserSexType, kUserFootBallPositionType} from '../modules/util/constants'
const app = getApp()
const LOG_TAG = 'HomePage ';

Page({
    data: {
        userInfo: {
            role: kUserRoleType.Visitor.value,
            sex: kUserSexType.Male.value,
            name: '',
            userId: '',
            footballPosition: '',
            age: 18,
        },
        hasUserInfo: false,
        wxInfo: {},
        hasWxInfo: false,

        userStatus: '',
        isClubMember: false,
        userInfoTabChooseIdx: 0,
        userInfoTabConfig: ['资料', '数据', '能力'],
        userInfoDisplayArr: [],
    },

    onLoad: function () {
        AccountService.getWxUserInfo().then((res) => {
            console.log(LOG_TAG + JSON.stringify(res));
            this.setData({
                wxInfo: res,
                hasWxInfo: true
            })
        })

        AccountService.getUserInfo().then((res) => {
            console.log(LOG_TAG + JSON.stringify(res));
            res.role = 0;
            let userStatus = kUserRoleType.Visitor.desc;
            if (res.role == kUserRoleType.Admin.value) {
                userStatus = kUserRoleType.Admin.desc;
            } else if (res.role == kUserRoleType.Member.value) {
                userStatus = kUserRoleType.Member.desc;
            } else if (res.role == kUserRoleType.MemberUnCheck.value) {
                userStatus = kUserRoleType.MemberUnCheck.desc;
            }

            let isClubMember = kUserRoleType.Visitor.value !== res.role;
            this.setData({
                userInfo: res,
                hasUserInfo: true,
                userStatus: userStatus,
                isClubMember: isClubMember,
                userInfoDisplayArr: this.getDisplayInfoArr(0),
            })
            AccountService.queryMatchData().then((res) => {
                console.log(LOG_TAG + 'queryMatchData');
            })
        });
    },

    bindChangeUserInfoTap: function(e) {
        let clickIdx = parseInt(e.currentTarget.id);
        if (parseInt(this.data.userInfoTabChooseIdx) != clickIdx) {
            this.setData({
                userInfoTabChooseIdx: clickIdx,
                userInfoDisplayArr: this.getDisplayInfoArr(clickIdx),
            });
        }
    },

    bindGotoSetting: function(e) {
        wx.navigateTo({
            url: "../accountSetting/accountSetting"
        })
    },

    bindJoinClub: function (e) {
        AccountService.joinClub().then((res) => {
            console.log(LOG_TAG + 'joinClub');
        })
    },

    getDisplayInfoArr: function (index) {
        let info = [];
        if (index == 0) {
            let sex = kUserSexType.Male.desc;
            if (this.data.userInfo.sex == kUserSexType.Female.value) {
                sex = kUserSexType.Female.desc;
            }
            let position = kUserFootBallPositionType.Keeper.desc;
            let fPosi = this.data.userInfo.footballPosition;
            if (fPosi == kUserFootBallPositionType.CenterBack.value) {
                position = kUserFootBallPositionType.CenterBack.desc;
            } else if (fPosi == kUserFootBallPositionType.LeftSideBack.value) {
                position = kUserFootBallPositionType.LeftSideBack.desc;
            } else if (fPosi == kUserFootBallPositionType.RightSideBack.value) {
                position = kUserFootBallPositionType.RightSideBack.desc;
            } else if (fPosi == kUserFootBallPositionType.Forward.value) {
                position = kUserFootBallPositionType.Forward.desc;
            } else if (fPosi == kUserFootBallPositionType.LeftWinger.value) {
                position = kUserFootBallPositionType.LeftWinger.desc;
            } else if (fPosi == kUserFootBallPositionType.RightWinger.value) {
                position = kUserFootBallPositionType.RightWinger.desc;
            } else if (fPosi == kUserFootBallPositionType.CenterForward.value) {
                position = kUserFootBallPositionType.CenterForward.desc;
            }
            info = [{'title': '年龄', 'value': this.data.userInfo.age},
                {'title': '性别', 'value': sex},
                {'title': '擅长位置', 'value': position},
            ];
        } else if (index == 1) {
            info = [{'title': '出场次数', 'value': 30},
                {'title': '迟到次数', 'value': 3},
                {'title': '出勤率', 'value': '90%'},
                {'title': '进球', 'value': 9},
                {'title': '助攻', 'value': 3},
            ];
        } else if (index == 2) {

        }
        return info;
    }

})