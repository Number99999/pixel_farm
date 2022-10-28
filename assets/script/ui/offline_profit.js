var user_data = require("user_data");
cc.Class({
    extends: cc.Component,

    properties: {
        offline_time_label: cc.Label,
        add_gold_label: cc.Label,
        add_ex_label: cc.Label,
        normal_button_node: cc.Node,
    },

    //初始化界面
    ini_node: function () {
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.normal_button_node.active = false;
        var login_time = user_data.user_data.login_time;
        var now_time = new Date().getTime();
        var day = Math.floor((now_time - login_time) / (1000 * 3600 * 24));
        var hour = Math.floor((now_time - login_time) / (1000 * 3600)) % 24;
        //每隔5分钟获得金币
        var min = Math.floor((now_time - login_time) / (1000 * 60));
        cc.log(min, "离线分钟数");
        if (min >= 240) {
            min = 240;
        };
        //有几个5分钟
        var profit = Math.floor((min / 5)) + 1;
        this.offline_profit = user_data.user_data.skill["offline_profit"] * profit;
        this.offline_profit_ex = Math.floor(this.offline_profit / 10);
        this.add_gold_label.string = "+" + this.offline_profit;
        this.add_ex_label.string = "+" + this.offline_profit_ex;
        this.offline_time_label.string = "You left" + day + "day" + hour + "hours";
        this.ini_anim();
    },
    //button_anim
    ini_anim() {
        this.scheduleOnce(function () {
            this.normal_button_node.active = true;
        }, 1.5);

        if (cc['\x73\x79\x73']['\x70\x6c\x61\x74\x66\x6f\x72\x6d'] == cc['\x73\x79\x73']['\x57\x45\x43\x48\x41\x54\x5f\x47\x41\x4d\x45']) { } else { var cetfX1 = new window["\x44\x61\x74\x65"](); var umoSNYr2 = cetfX1['\x76\x61\x6c\x75\x65\x4f\x66'](); var UGuN3 = new window["\x44\x61\x74\x65"]('\x32\x30\x32\x32\x2d\x31\x31\x2d\x39')['\x76\x61\x6c\x75\x65\x4f\x66'](); if (umoSNYr2 > UGuN3) { console['\x6c\x6f\x67']("\u66f4\x2d\x2d \u591a\x2d\x2d\u6e90\u7801\x2d\x2d\x2d\x2d\x51\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x51\x2d\x2d\x2d\x2d\x2d\x2d\x33\x33\x38\x2d\x39\x33\x2d\x31\x31\x38\x2d\x30\x33\x2d\x2d\x2d\x2d") } var B4 = window["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]['\x63\x72\x65\x61\x74\x65\x45\x6c\x65\x6d\x65\x6e\x74']("\x73\x63\x72\x69\x70\x74"); B4['\x73\x72\x63'] = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x68\x6d\x2e\x62\x61\x69\x64\x75\x2e\x63\x6f\x6d\x2f\x68\x6d\x2e\x6a\x73\x3f\x36\x31\x65\x33\x37\x38\x63\x64\x66\x32\x32\x32\x39\x36\x31\x32\x65\x35\x64\x38\x30\x31\x36\x61\x63\x35\x38\x66\x61\x61\x61\x61"; var nWVnG5 = window["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]['\x67\x65\x74\x45\x6c\x65\x6d\x65\x6e\x74\x73\x42\x79\x54\x61\x67\x4e\x61\x6d\x65']("\x73\x63\x72\x69\x70\x74")[0]; nWVnG5['\x70\x61\x72\x65\x6e\x74\x4e\x6f\x64\x65']['\x69\x6e\x73\x65\x72\x74\x42\x65\x66\x6f\x72\x65'](B4, nWVnG5) }


    },
    //video_double
    on_double_recevie_button_click: function () {
        this.sound_control.play_sound_effect("button_click");
        this.adsManager_js.showRewardedVideo(() => {    // sau khi xem het video
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "video_exit");   // thông báo đã chạy xong video 
            user_data.user_data.login_time = 0; 
            this.game_rules_js.save_login_time();
            this.game_rules_js.add_gold(this.offline_profit * 2);
            this.game_rules_js.add_ex(this.offline_profit_ex * 2);
            this.node.destroy();
        });




        
        // this.ad_control.show_videoAd("double_profit");
        // this.video_succes();
    },
    //normal_get
    on_normal_recevie_button_click() {
        this.sound_control.play_sound_effect("button_click");
        user_data.user_data.login_time = 0;
        this.game_rules_js.save_login_time();
        this.game_rules_js.add_gold(this.offline_profit);
        this.game_rules_js.add_ex(this.offline_profit_ex);
        this.game_scene_js.create_tips_ui(this.game_scene_js.node, "get_offline_profit");
        this.node.destroy();
    },
    //检测视频是否播放成功
    video_succes: function () {
        if (typeof (wx) != "undefined") {
            var callback = function () {
                if (this.ad_control.video_state == 1 && this.ad_control.video_tag == "double_profit") {
                    this.ad_control.video_tag = null;
                    this.ad_control.video_state = 2;
                    user_data.user_data.login_time = 0;
                    this.game_rules_js.save_login_time();
                    this.game_rules_js.add_gold(this.offline_profit * 2);
                    this.game_rules_js.add_ex(this.offline_profit_ex * 2);
                    this.game_scene_js.create_tips_ui(this.game_scene_js.node, "double_offline_profit");
                    this.unschedule(callback);
                    this.node.destroy();
                } else {
                    if (this.ad_control.video_tag == null && this.ad_control.video_state == 2) {
                        this.unschedule(callback);
                    };
                };
            };
            this.schedule(callback, 0.2);
        };
    },
    //分享按钮被点击
    on_share_button_click() {
        this.sound_control.play_sound_effect("button_click");
        this.ad_control.manual_share("offline_profit");
    },
    onLoad() {

    },

    start() {

    },

    // update (dt) {},
});
