import config from "config";
/*
    share_state :{
        shared : "已分享"
        un_share : "未分享"
        share_succes :"分享成功"
    };
*/
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    //打开右上角3个点转发
    open_share: function () {
        if (typeof (wx) !== "undefined") {
            //显示当前页面右上角的转发按钮
            wx.showShareMenu({ withShareTicket: true })
            wx.onShareAppMessage(function () {
                return {
                    //
                }
            });
        };
    },

    //手动拉起转发调用
    manual_share: function (tag) {
        if (typeof (tt) !== "undefined") {
            //记录是什么分享
            this.share_tag = tag;
            this.share_state = "shared";
            this.share_time = new Date().getTime(); // 记录当前时间
            let self = this;
            switch (tag) {
                case "offline_profit":
                    tt.shareAppMessage({
                        templateId: "u764x7bp9v2d3k16ij", // 替换成通过审核的分享ID
                        title: "Leisure farm, hang up",
                        desc: "A relaxing and casual business simulation game。",
                        imageUrl: "",
                        query: "",
                        success() {
                            console.log("分享视频成功");
                            self.share_sucess();
                        },
                        fail(e) {
                            console.log("分享视频失败");
                            self.share_fail();
                        }
                    });
                    break;
                case "pet":
                    tt.shareAppMessage({
                        templateId: "", // 替换成通过审核的分享ID
                        title: "Do you like me?",
                        desc: "I want this little pet, please click for me！",
                        imageUrl: "",
                        query: "",
                        success() {
                            console.log("分享视频成功");
                            self.share_sucess();
                        },
                        fail(e) {
                            console.log("分享视频失败");
                            self.share_fail();
                        }
                    });
                    break;
            };
        };

    },
    //微信回到前台分享判断
    share_judge: function () {
        if (typeof (wx) !== "undefined") {
            let self = this;
            wx.onShow(function () {
                //标签不能为空并且分享状态为已分享
                if (self.share_state == "shared" && self.share_tag !== null) {
                    var now_time = new Date().getTime();
                    if (now_time - self.share_time >= 3000) {
                        self.share_sucess(self.share_tag);
                    } else {
                        self.share_fail();
                    };
                } else {
                    return;
                }
            });
        }
    },
    //分享成功
    share_sucess: function () {
        this.share_state = "share_succes";
        this.game_scene_js.create_tips_ui(this.game_scene_js.node, "share_succes");
    },

    //分享失败
    share_fail: function () {
        this.ini_share();
        this.game_scene_js.create_tips_ui(this.game_scene_js.node, "share_fail");

    },

    //初始化分享
    ini_share: function () {
        this.share_tag = null; //分享的标签
        this.share_time = null; //分享时的时间
        this.share_state = "un_share";
    },

    //===========================================================
    //===========================================================
    //创建视频广告
    create_videoAd: function () {
        if (config.ad_state == 0) {
            return;
        };
        if (typeof (wx) !== "undefined") {
            //视频广告
            this.video_ad = wx.createRewardedVideoAd({
                adUnitId: '2oo60sjxld911grh25',//填上你的广告位id
            });

            //=======================================================
            //=======================================================

            //错误提示
            this.video_ad.onError(err => {
                this.ad_manageer = false;
                console.log(err)
            });
        };
    },
    //展示视频广告
    show_videoAd: function (name) {
        if (config.ad_state == 0) {
            return;
        };
        if (typeof (wx) !== "undefined") {
            if (this.ad_manageer == false) {
                //广告未开启
            } else {
                this.sound_control.pause_all_sound();
            };
            this.video_tag = name;
            //无论有多少广告,只会返回一个实例
            this.video_ad.show().catch(() => {
                // 失败重试
                this.video_ad.load()
                    .then(() => this.video_ad.show(),
                    )
                    .catch(err => {
                        console.log('激励视频 广告显示失败')
                        this.game_scene_js.create_tips_ui(this.game_scene_js.node, "video_wait");
                    })
            })
        };
    },
    //广告结束或退出
    over_videoAd: function () {
        if (config.ad_state == 0) {
            return;
        };
        if (typeof (wx) !== "undefined") {
            this.video_ad.onClose(res => {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    this.video_state = 1;// 1为成功，0为失败 2位播放结束
                    this.sound_control.resume_all_sound();
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                    this.sound_control.resume_all_sound();
                    this.video_state = 0;
                    this.game_scene_js.create_tips_ui(this.game_scene_js.node, "video_exit");
                }
            })
        };
    },
    //创建banner广告
    banner_ad: function () {
        if (typeof (wx) !== "undefined") {
            //抖音屏蔽banner
            const info = tt.getSystemInfoSync();
            if (info.appName.toUpperCase() === 'DOUYIN' || config.ad_state == 0) {
                return;
            } else {
                // 创建 Banner 广告实例，提前初始化
                let sysInfo = wx.getSystemInfoSync()
                this.bannerAd = wx.createBannerAd({
                    adUnitId: '6g3799b8gcb52y1dvi',
                    adIntervals: 30,
                    style: {
                        left: 0,
                        top: 0,
                        width: 300,
                    }
                })
                this.bannerAd.onError(err => {
                    console.log(err)
                    // this.show_push_ad("banner");
                });
                this.bannerAd.onResize(res => {
                    this.bannerAd.style.top = sysInfo.windowHeight - res.height - 10;
                    this.bannerAd.style.left = (sysInfo.windowWidth - res.width) / 2;
                })
            }
        };//end if
    },

 


    onLoad() {
        // cc.game.addPersistRootNode(this.node);
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        // this.share_judge();
        this.ini_share();
        this.judge = null; // 判断是否分享成功
        this.video_tag = null; //视频标签
        this.video_state = null; //视频播放的状态 1位succes 0为fail
        this.create_videoAd();
        this.over_videoAd();
        this.banner_ad();
        this.open_share();


    },

    start() {

    },

    // update (dt) {},
});
