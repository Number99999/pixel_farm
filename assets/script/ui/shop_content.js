import user_data from "user_data";
import config from "config";
cc.Class({
    extends: cc.Component,

    properties: {
        name_label: cc.Label,
        cost_label: cc.Label,
        need_level_label: cc.Label,
        gold_icon_node: cc.Node,
        plant_icon_frame_arr: [cc.SpriteFrame],
        land_frame: cc.SpriteFrame,
        icon_sprite: cc.Sprite,
        have_icon_node: cc.Node,
        button_tips_node: cc.Node,
    },
    //初始化
    ini_node(type, index) {
        this.index = index;
        this.type = type;
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.have_icon_node.active = false;
        this.button_tips_node.active = false;
        this.update_content();
        // this.update_schedule();
    },
    //刷新数据
    update_content() {
        var callback = function(){
            var gold = user_data.user_data.gold;
            var level = user_data.user_data.level;
            switch (this.type) {
                case "land":
                    this.name_label.string = config.land[this.index].name;
                    this.icon_sprite.spriteFrame = this.land_frame;
                    if (user_data.user_data.land[this.index].have == 1) {
                        this.button_tips_node.active = false;
                        this.cost_label.node.active = false;
                        this.have_icon_node.active = true;
                        this.need_level_label.node.active = false;
                        this.gold_icon_node.active = false;
                    } else {
                        this.need_level_label.node.active = true;
                        this.gold_icon_node.active = true;
                        this.need_level_label.string = "Level " + config.land[this.index].need_level + " to unlock";

                        if (level >= config.land[this.index].need_level) {
                            this.cost_label.string = config.land[this.index].cost;
                            this.need_level_label.string = "";
                        } else {
                            this.cost_label.string = "???";
                        };

                        //可以购买给与提示
                        if (level >= config.land[this.index].need_level && gold >= config.land[this.index].cost) {
                            this.button_tips_node.active = true;
                        } else {
                            this.button_tips_node.active = false;
                        };
                    };
                    break;
                case "plant":
                    this.name_label.string = config.plant[this.index].name;
                    this.icon_sprite.spriteFrame = this.plant_icon_frame_arr[this.index];
                    if (user_data.user_data.plant[this.index].have == 1) {
                        this.button_tips_node.active = false;
                        this.cost_label.node.active = false;
                        this.have_icon_node.active = true;
                        this.need_level_label.node.active = false;
                        this.gold_icon_node.active = false;
                    } else {
                        this.gold_icon_node.active = true;
                        this.need_level_label.node.active = true;
                        this.need_level_label.string = "Need " + config.plant[this.index].need_level + " level unlock";

                        if (level >= config.plant[this.index].need_level) {
                            this.cost_label.string = config.plant[this.index].cost;
                            this.need_level_label.string = "";
                        } else {
                            this.cost_label.string = "???";
                        };

                        if (level >= config.plant[this.index].need_level && gold >= config.plant[this.index].cost) {
                            this.button_tips_node.active = true;
                        } else {
                            this.button_tips_node.active = false;
                        }
                    };
                    break;
            };
        };
        this.schedule(callback, 0.1);
    },
    on_button_click() {
        this.sound_control.play_sound_effect("button_click");
        this.game_scene_js.create_shop_buy_ui(this.type, this.index, this.icon_sprite.spriteFrame);
    },
    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
