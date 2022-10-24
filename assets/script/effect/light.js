var user_data = require("user_data");
cc.Class({
    extends: cc.Component,

    properties: {
        icon_frame_arr: [cc.SpriteFrame],
        icon_frame: cc.Sprite,
        light_group: cc.Node,
    },
    ini_node: function (plant_index, start_node) {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.plant_index = plant_index;
        this.light_group.active = true;
        this.icon_frame.spriteFrame = this.icon_frame_arr[plant_index];
        this.node.setPosition(start_node.position.x, start_node.position.y + 50);
    },
    onLoad() {


    },

    start() {

    },

    // update (dt) {},
});
