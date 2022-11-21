import user_data from "user_data";
import config from "config";
cc.Class({
    extends: cc.Component,

    properties: {
        bonus_label: cc.Label,
        cost_label: cc.Label,
        gold_icon_node: cc.Node,
        diamond_icon_node: cc.Node,
        button_buy: cc.Button,
        get_label: cc.Label,
    },
    //初始化
    ini_node(type, index) {
        this.index = index;
        this.type = type;
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.update_content();
        // this.update_schedule();
    },
    //刷新数据
    update_content() {
            switch (this.type) {
                case "gold":
                    this.get_label.string = "Get " + config.iap_gold[this.index].amount + " gold!!!";
                    if(this.index == 0) {
                        this.bonus_label.string= "Don't get bonus gold!!!";
                    }
                    else{
                        this.bonus_label.string ="Get " + config.iap_gold[this.index].bonus + " diamond bonus!!!";
                    }
                    this.cost_label.string = config.iap_gold[this.index].cost;
                    this.gold_icon_node.active = true;
                    this.diamond_icon_node.active = false;
                    
                    break;
                case "diamond":
                    this.get_label.string = "Get " + config.iap_diamond[this.index].amount + " diamond!!!";
                    if(this.index == 0) {
                        this.bonus_label.string== "Don't get bonus diamond!!!";
                    }
                    else this.bonus_label.string ="Get " + config.iap_diamond[this.index].bonus + " diamond bonus!!!";
                    this.cost_label.string = config.iap_diamond[this.index].cost;
                    this.gold_icon_node.active = false;
                    this.diamond_icon_node.active = true;
                    
                    break;
            };
        // this.schedule(callback, 0.1);
    },
    on_button_click() {
        this.sound_control.play_sound_effect("button_click");
        this.game_scene_js.create_iap_ui();
    },
    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
