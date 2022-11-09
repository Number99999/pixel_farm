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
        this.create_content();
        // this.update_schedule();
    },
    //刷新数据
    create_content() {
        switch (this.type) {
            case "diamond":
                console.log("29 hello iap_content");
                this.get_label.string = "+" + config.iap_diamond[this.index].amount;
                this.icon.spriteFrame = this.icon_sprite_arr[0];
                if (this.index == 1) {
                    this.get_bonus_label.string = "Don't get bonus diamond";
                }
                else this.get_bonus_label.string = "Get " + config.iap_diamond[this.index].bonus + " bonus diamond";
            case "gold":
                console.log("37 hello iap_content");
                this.get_label.string = "+" + config.iap_gold[this.index].amount;
                this.icon.spriteFrame = this.icon_sprite_arr[0];
                if (this.index == 1) {
                    this.get_bonus_label.string = "Don't get bonus gold";
                }
                else this.get_bonus_label.string = "Get " + config.iap_gold[this.index].bonus + " bonus gold";
        };
    },
    button_show_iap_diamond() {
        this.get_label.string = "+" + config.iap_diamond[this.index].amount;
        this.icon.spriteFrame = this.icon_sprite_arr[0];
        if (this.index == 1) {
            this.get_bonus_label.string = "Don't get bonus diamond";
        }
        else this.get_bonus_label.string = "Get " + config.iap_diamond[this.index].bonus + " bonus diamond";
    },
    button_show_iap_gold() {
        this.get_label.string = "+" + config.iap_gold[this.index].amount;
        this.icon.spriteFrame = this.icon_sprite_arr[0];
        if (this.index == 1) {
            this.get_bonus_label.string = "Don't get bonus gold";
        }
        else this.get_bonus_label.string = "Get " + config.iap_gold[this.index].bonus + " bonus gold";
    },
    on_button_click() {
        this.game_scene_js.create_iap_ui(this.type, this.index, this.icon_sprite.spriteFrame);
    },
    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
