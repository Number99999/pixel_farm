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
        this.adsManager = cc.find("UI_ROOT").getComponent("AdsManager");
        this.ad_control.show_bannerAd();
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
        var today = new Date();
        if (user_data.user_data.save_date == today.getDate())
            this.tips_label.string = "Watched: " + user_data.user_data.watch_video + "/3";
        else this.tips_label.string = "Watched: 0/3"
    },

    //按钮被点击
    on_button_click() {
        var today = new Date();
        if (today.getDate() == user_data.user_data.save_date && user_data.user_data.watch_video < 3) {
            cc.log("=======48=======");
            this.adsManager.showRewardedVideo(() => {
                user_data.user_data.watch_video++;
                cc.log("=======50=======");
                this.tips_label.string = "Watched: " + user_data.user_data.watch_video + "/3";
                user_data.user_data.save_date = today.getDate();
            });

        }
        else if (today.getDate() != user_data.user_data.save_date) {
            this.adsManager.showRewardedVideo(() => {
                cc.log("=======59=======");
                watch_video = 1;
                this.tips_label.string = "Watched: " + user_data.user_data.watch_video + "/3";
                user_data.user_data.save_date = today.getDate();
            });

            cc.log("====65====");
        }
        else this.game_scene_js.create_tips_ui(this.game_rules_js.node, "no_video_today");
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
    // videotape_share_succes: function () {
    //     this.game_scene_js.create_tips_ui(this.node.parent, "videotape_share_succes");
    //     this.game_rules_js.videotape_path = null;
    //     user_data.user_data.videotape_share_count++;
    //     var gold = Math.floor(this.add_gold / 6);
    //     var ex = Math.floor(this.add_ex / 3);
    //     for (var i = 0; i < 6; i++) {
    //         this.game_scene_js.create_gold_effect(this.purse_node, i, gold);
    //     };
    //     for (var i = 0; i < 5; i++) {
    //         this.game_scene_js.create_ex_effect(this.ex_node, i, ex);
    //     };
    //     this.ini_node();

    // },
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

    add_gold_video: function () {
        this.game_rules_js.add_gold(Math.floor(((500 * user_data.user_data.skill["gold_max"] + 500)) / 20) + 1);
    },
    start() {

    },

    // update (dt) {},
});
