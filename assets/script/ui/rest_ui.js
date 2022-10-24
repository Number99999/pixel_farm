var user_data = require("user_data");
cc.Class({
    extends: cc.Component,

    properties: {
        role_sprite: cc.Sprite,
        role_arr: [cc.SpriteFrame],
        center_node: cc.Node,
    },
    //初始化节点
    ini_node(staff_index) {
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.ad_control.show_bannerAd();
        //初始小人的形象
        this.staff_index = staff_index;
        this.role_sprite.spriteFrame = this.role_arr[staff_index];
        this.center_node.scale = 0;
        this.ini_anim();
    },
    //初始化动画
    ini_anim() {
        cc.tween(this.center_node)
            .to(0.3, { scale: 1 }, { easing: "sineOut" })
            .start();
    },
    //i wanna button click
    on_iwanna_button_click() {
        cc.log("create_ad");
        this.sound_control.play_sound_effect("button_click");
        this.ad_control.show_videoAd("staff_rest");
        this.video_succes();
    },
    on_touch_exit_click(e) {
        this.node.destroy();
    },
    //keep rest
    on_keep_rest_button_click() {
        this.sound_control.play_sound_effect("button_exit");
        this.ad_control.hide_bannerAd();
        this.node.destroy();
    },
    //检测视频是否播放成功
    video_succes: function () {
        if (typeof (wx) != "undefined") {
            var callback = function () {
                if (this.ad_control.video_state == 1 && this.ad_control.video_tag == "staff_rest") {
                    this.ad_control.video_tag = null;
                    this.ad_control.video_state = 2;
                    user_data.user_data.staff[this.staff_index].over_time = 0;
                    this.game_scene_js.create_tips_ui(this.game_scene_js.node, "staff_rest_over");
                    this.unschedule(callback);
                    this.ad_control.hide_bannerAd();
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
    onLoad() { },

    start() {

    },

    // update (dt) {},
});
