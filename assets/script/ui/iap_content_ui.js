import user_data from "user_data";
import config from "config";
cc.Class({
    extends: cc.Component,

    properties: {
        icon_sprite_arr: [cc.SpriteFrame],
        get_label: cc.Label,
        get_bonus_label: cc.Label,
        cost_label: cc.Label,
        icon: cc.Node,
    },
    //初始化
    ini_node(type, index) {
        this.index = index;
        this.type = type;
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        // this.have_icon_node.active = false;
        // this.button_tips_node.active = false;
        this.update_content();
        // this.update_schedule();
    },
    //刷新数据
    update_content() {
        var callback = function () {
            var gold = user_data.user_data.gold;
            var level = user_data.user_data.level;
            switch (this.type) {
                case "diamond":
                    switch (this.index) {
                        case 0:
                            this.get_label.string = "+50";
                            this.get_bonus_label.string = "Don't get bonus diamond";
                            this.icon.spriteFrame = this.icon_sprite_arr[0];
                            // console.log("hello " + this.icon_sprite_arr[0].getComponent(cc.SpriteFrame).spriteFrame);
                            break;
                        case 1:
                            this.get_label.string = "+100";
                            this.get_bonus_label.string = "Get 5 bonus diamond";
                            this.icon.spriteFrame = this.icon_sprite_arr[0];
                            break;
                        case 2:
                            this.get_label.string = "+250";
                            this.get_bonus_label.string = "Get 25 bonus diamond";
                            this.icon.spriteFrame = this.icon_sprite_arr[0];
                            break;
                        case 3:
                            this.get_label.string = "+500";
                            this.get_bonus_label.string = "Get 100 bonus diamond";
                            this.icon.spriteFrame = this.icon_sprite_arr[0];
                            break;
                        case 4:
                            this.get_label.string = "+1000";
                            this.get_bonus_label.string = "Get 300 bonus diamond";
                            this.icon.spriteFrame = this.icon_sprite_arr[0];
                            break;
                        case 5:
                            this.get_label.string = "+2000";
                            this.get_bonus_label.string = "Get 800 bonus diamond";
                            this.icon.spriteFrame = this.icon_sprite_arr[0];
                            break;
                    }
                case "gold":
                    switch (this.index) {
                        case 0:
                            this.get_label.string = "+5000";
                            this.get_bonus_label.string = "Don't get bonus gold";
                            this.icon.spriteFrame = this.icon_sprite_arr[1];
                            break;
                        case 1:
                            this.get_label.string = "+10000";
                            this.get_bonus_label.string = "Get 500 bonus gold";
                            this.icon.spriteFrame = this.icon_sprite_arr[1];
                            break;
                        case 2:
                            this.get_label.string = "+25000";
                            this.get_bonus_label.string = "Get 2000 bonus gold";
                            this.icon.spriteFrame = this.icon_sprite_arr[1];
                            break;
                        case 3:
                            this.get_label.string = "+50000";
                            this.get_bonus_label.string = "Get 6000 bonus gold";
                            this.icon.spriteFrame = this.icon_sprite_arr[1];
                            break;
                        case 4:
                            this.get_label.string = "+100000";
                            this.get_bonus_label.string = "Get 18000 bonus gold";
                            this.icon.spriteFrame = this.icon_sprite_arr[1];
                            break;
                        case 5:
                            this.get_label.string = "+200000";
                            this.get_bonus_label.string = "Get 50000 bonus gold";
                            this.icon.spriteFrame = this.icon_sprite_arr[1];
                            break;
                    }
            };
        };
        this.schedule(callback, 0.1);
    },
    on_button_click() {
        this.sound_control.play_sound_effect("button_click");
        this.game_scene_js.create_iap_ui(this.type, this.index, this.icon_sprite.spriteFrame);
    },
    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
