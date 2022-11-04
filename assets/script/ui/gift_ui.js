var user_data = require("user_data");
cc.Class({
    extends: cc.Component,

    properties: {
        center_node: cc.Node,
        exit_button_node: cc.Node,
        introduce_label: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:
    ini_node() {
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");

        this.center_node.scale = 0;
        this.exit_button_node.active = false;
        if (user_data.user_data.level < 15) {
            this.introduce_label.string = "Watch short commercials, \nlevel+1";
        } else {
            this.introduce_label.string = "Watch short commercials and \ngain half-level experience";
        };
        cc.tween(this.center_node)
            .to(0.3, { scale: 1 }, { easing: "elasticOut" })
            .call(() => {
                this.scheduleOnce(() => {
                    this.exit_button_node.active = true;
                }, 1.5)
            })
            .start();
    },
    //我要看视频按钮被点击
    on_i_wanner_ad_button_click() {
        this.sound_control.play_sound_effect("button_click");
        this.adsManager_js.showRewardedVideo(() => {
            if (user_data.user_data.level > 15) {
                this.game_rules_js.add_ex(user_data.user_data.level);
                this.game_scene_js.create_tips_ui(this.game_scene_js.node, "gift_ad_ex");
            } else {
                user_data.user_data.level++;
                user_data.user_data.now_ex = 0;
                user_data.user_data.skill_point++;
                this.game_rules_js.set_ex_progress();
                this.game_scene_js.create_tips_ui(this.game_scene_js.node, "gift_ad_level");
            };

            this.unschedule(callback);
            this.node.destroy();
        });
    },
    //exit button
    on_exit_button_click() {
        this.sound_control.play_sound_effect("button_exit");

        this.node.destroy();
    },
    //检测视频是否播放成功
    video_succes: function () {
        if (typeof (wx) != "undefined") {
            var callback = function () {
                if (this.ad_control.video_state == 1 && this.ad_control.video_tag == "gift_ad") {
                    this.ad_control.video_tag = null;
                    this.ad_control.video_state = 2;
                    if (user_data.user_data.level > 15) {
                        this.game_rules_js.add_ex(user_data.user_data.level);
                        this.game_scene_js.create_tips_ui(this.game_scene_js.node, "gift_ad_ex");
                    } else {
                        user_data.user_data.level++;
                        user_data.user_data.now_ex = 0;
                        user_data.user_data.skill_point++;
                        this.game_rules_js.set_ex_progress();
                        this.game_scene_js.create_tips_ui(this.game_scene_js.node, "gift_ad_level");
                    };
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
    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
