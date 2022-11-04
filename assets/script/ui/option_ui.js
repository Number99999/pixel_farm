var user_data = require("user_data");
cc.Class({
    extends: cc.Component,

    properties: {
        grandPa_node: cc.Node,
        sound_node_sprite: cc.Sprite,
        sound_frame_arr: [cc.SpriteFrame],
        progress_bar: cc.ProgressBar,
    },
    //初始化节点
    ini_node() {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.grandPa_node.scaleY = 0;
        this.progress_bar.node.active = false;
        this.click_count = 0;
        var sound_state = user_data.user_data.sound_state;
        if (sound_state == 1) {
            this.sound_node_sprite.spriteFrame = this.sound_frame_arr[0];
        } else {
            this.sound_node_sprite.spriteFrame = this.sound_frame_arr[1];
        };
        this.grandPa_anim();
    },
    //grandPa anim
    grandPa_anim() {
        cc.tween(this.grandPa_node)
            .to(0.3, { scaleY: 1 }, { easing: "elasticOut" })
            .start();
    },
    //当音频按钮被点击
    on_sounde_button_click() {
        this.sound_control.play_sound_effect("button_click");
        var sound_state = user_data.user_data.sound_state;
        if (sound_state == 1) {
            //关闭声音
            user_data.user_data.sound_state = 0;
            this.sound_node_sprite.spriteFrame = this.sound_frame_arr[1];
            this.sound_control.pause_all_sound();

        } else {
            //开启声音
            user_data.user_data.sound_state = 1;
            this.sound_node_sprite.spriteFrame = this.sound_frame_arr[0];
            this.sound_control.resume_all_sound();
            this.sound_control.play_bg_sound("home_bg");
        };

    },
    //爷爷被点击
    on_grandPa_click() {
        this.sound_control.play_sound_effect("button_click");
        this.progress_bar.node.active = true;
        this.click_count++;
        this.progress_bar.progress = this.click_count / 10;
        if (this.progress_bar.progress == 1) {
            var random_num = Math.floor(Math.random() * 5) + 1;
            this.click_count = 0;
            this.progress_bar.progress = this.click_count / 10;
            for (var i = 0; i < random_num; i++) {
                this.game_scene_js.create_gold_effect(this.grandPa_node, i,1);
            };
        };
    },
    //新手引导按钮被点击
    on_novice_button_click() {
        this.sound_control.play_sound_effect("button_click");
        this.game_scene_js.create_novice_ui();
        this.touch_exit();
    },
    //点击退出
    touch_exit() {
        this.sound_control.play_sound_effect("button_exit");
        this.game_scene_js.on_node_kill(this.node);
    },
    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
