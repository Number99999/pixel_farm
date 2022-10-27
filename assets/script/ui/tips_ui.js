cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label,
        floor_node: cc.Node,
        icon_frame: cc.Sprite,
        icon_frame_arr: [cc.SpriteFrame],
    },
    ini_node: function (type, num) {
        // this.label.node.active = true;
        // this.icon_frame.node.active = true;
        // this.floor_node.width = 0;
        // this.floor_node.height = 60;
        this.floor_node.y = 395;
        this.floor_node.opacity = 255;
        switch (type) {
            case "gold":
                this.label.string = "Gold+" + num;
                this.icon_frame.spriteFrame = this.icon_frame_arr[0];
                break;
            case "pet_leave":
                this.label.string = "Gone"
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "videotape_no_time":
                this.label.string = "Screen recording time should be more than 3 seconds"
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "videotape_share_fail":
                this.label.string = "Screen recording and sharing failed~"
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "videotape_share_succes":
                this.label.string = "Screen recording and sharing success!"
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "videotape_start":
                this.label.string = "Screen recording started"
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "vidotape_cancel":
                this.label.string = "Screen recording has been reset"
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "vidotape_over":
                this.label.string = "Screen recording has ended"
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "video_exit":
                this.label.string = "Watch the full video~"
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "video_wait":
                this.label.string = "Ad break~~"
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "no_sell":
                this.label.string = "Nothing to sell";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "no_money_gold":
                this.label.string = "Gold not enought";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "no_money_diamond":
                this.label.string = "Diamond not enought";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "no_level":
                this.label.string = "Level not enought";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "no_skill_point":
                this.label.string = "Skill point not enought";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "empoly_succes":
                this.label.string = "Hire success";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "buy_succes":
                this.label.string = "Successful purchase";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "get_offline_profit":
                this.label.string = "Receive offline earnings";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "cultrue_succes":
                this.label.string = "Adoption is successful";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "un_develop":
                this.label.string = "Not unlocked yet";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "share_succes":
                this.label.string = "Share success";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "pet_already_life":
                this.label.string = "Pet already exists~";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "share_fail":
                this.label.string = "Try sharing again~";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "double_offline_profit":
                this.label.string = "Successfully receive double rewards";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "cultrue_pet_succes":
                this.label.string = "Increased pet favorability";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "staff_rest_over":
                this.label.string = "Work faster!";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "skill_rest":
                this.label.string = "Skill has been reset";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "gift_ad_ex":
                this.label.string = "Gain a lot of experience";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "gold_full":
                this.label.string = "Can't hold more coins!";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "gift_ad_level":
                this.label.string = "Level up!";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "share_max":
                this.label.string = "Reached today's limit~";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "unlocked_repo":
                this.label.string = "Unlocked this repository";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
            case "no_video_today":
                this.label.string = "Out of video view";
                this.icon_frame.spriteFrame = this.icon_frame_arr[1];
                break;
        };
        this.end_anim();
    },
    // ini_anim: function () {
    //     cc.tween(this.floor_node)
    //         .to(0.2, { y: 100 }, { easing: "sineOut" })
    //         .call(() => {
    //             this.label.node.active = true;
    //             this.icon_frame.node.active = true;
    //             var callback = function () {
    //                 this.end_anim();
    //             };
    //             this.scheduleOnce(callback, 1.5);
    //         })
    //         .start();
    // },
    end_anim: function () {
        cc.tween(this.floor_node)
            .delay(1)
            .to(0.3, { y: this.floor_node.y + 150, opacity: 0 }, { easing: "sineOut" })
            .call(() => {
                this.game_scene_js.on_node_kill(this.node);
            })
            .start();
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    },

    start() {

    },

    // update (dt) {},
});
