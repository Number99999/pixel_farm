import user_data from "user_data";
import config from "config";
cc.Class({
    extends: cc.Component,

    properties: {
        gold_lable: cc.Label,
        ex_label: cc.Label,
        tips_label: cc.Label,
        button_frame: cc.Sprite,
        button_frame_arr: [cc.SpriteFrame],
        purse_node: cc.Node,
        ex_node: cc.Node,
        delete_button: cc.Button,
    },
    //初始化节点
    ini_node() {
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.ad_control.show_bannerAd();
        // this.tips_label.string = "今日分享:" + user_data.user_data.videotape_share_count + "/" + config.videotape_share_max;
        this.tips_label.string = "Successfully shared:" + user_data.user_data.videotape_share_count +"Second-rate";
        this.add_gold = Math.floor(((500 * user_data.user_data.skill["gold_max"] + 500)) / 20) + 1;
        this.add_ex = Math.floor(user_data.user_data.level / 10) + 1;

        if (this.game_rules_js.videotape_path == null) {
            //录屏未录制
            this.button_frame.spriteFrame = this.button_frame_arr[0];
            this.delete_button.node.active = false;
        } else {
            //录屏已录制
            this.button_frame.spriteFrame = this.button_frame_arr[1];
            this.delete_button.node.active = true;
        };

        this.gold_lable.string = "+" + this.add_gold;
        this.ex_label.string = "+" + this.add_ex;
    },

    //按钮被点击
    on_button_click() {
        //未开始录制点击变开始
        this.sound_control.play_sound_effect("button_click");

        // if (user_data.user_data.videotape_share_count < config.videotape_share_max) {
        //还有剩余分享次数
        // } else {
        //     //提示已达分享次数
        //     this.sound_control.play_sound_effect("un_click");
        //     this.game_scene_js.create_tips_ui(this.game_rules_js.node, "share_max");
        // };

        if (this.game_rules_js.videotape_path == null) {
            this.game_rules_js.start_videotape();
            this.touch_exit();
        } else {
            this.video_share();
        };


    },

    
    on_delete_button_click() {
        this.game_rules_js.videotape_path = null;
        this.game_scene_js.create_tips_ui(this.game_rules_js.node, "vidotape_cancel");
        this.ini_node();
    },
    //录屏分享
    video_share: function () {
        if (typeof (wx) !== "undefined") {
            if (this.game_rules_js.videotape_path == null) {
                return;
            };
            let self = this;
            //获取分享导语
            wx.shareAppMessage({
                channel: 'video',  //指定为视频分享
                title: 'On-Hook Small Farm',
                extra: {
                    videoPath: this.game_rules_js.videotape_path,// 设置视频路径
                    videoTopics: ["On-Hook Small Farm", "Game"]
                },
                success: () => {
                    //分享回调
                    console.log('录屏分享成功');
                    //分享奖励，仅一次
                    self.videotape_share_succes();
                },
                fail: () => {
                    console.log('录屏分享失败', this.videotape_path);
                    self.videotape_share_fail();
                }
            });
        };
    },
    //录屏分享成功
    videotape_share_succes: function () {
        this.game_scene_js.create_tips_ui(this.node.parent, "videotape_share_succes");
        this.game_rules_js.videotape_path = null;
        user_data.user_data.videotape_share_count++;
        var gold = Math.floor(this.add_gold / 6);
        var ex = Math.floor(this.add_ex / 3);
        for (var i = 0; i < 6; i++) {
            this.game_scene_js.create_gold_effect(this.purse_node, i, gold);
        };
        for (var i = 0; i < 5; i++) {
            this.game_scene_js.create_ex_effect(this.ex_node, i, ex);
        };
        this.ini_node();

    },
    //录屏分享失败
    videotape_share_fail: function () {
        this.game_scene_js.create_tips_ui(this.node.parent, "videotape_share_fail");
        this.ini_node();
    },
    //点击退出
    touch_exit() {
        this.sound_control.play_sound_effect("button_exit");
        this.ad_control.hide_bannerAd();
        this.game_scene_js.on_node_kill(this.node);
    },
    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
