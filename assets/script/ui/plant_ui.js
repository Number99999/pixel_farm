var user_data = require("user_data");
cc.Class({
    extends: cc.Component,

    properties: {
        icon_grop: cc.Node,
    },

    //ini node
    ini_node: function (land_index) {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.land_group = cc.find("UI_ROOT/center/land_group");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
    
        this.set_icon();
        this.land_index = land_index;
    },
    //exit
    on_touch_exit_click: function () {
        this.sound_control.play_sound_effect("button_exit");
        this.game_scene_js.on_node_kill(this.node);
    },
    //plant unlock judge
    set_icon: function () {
        for (var i = 0; i < this.icon_grop.children.length; i++) {
            //拥有种子
            if (user_data.user_data.plant[i].have == 1) {
                this.icon_grop.children[i].active = true;
            } else {
                this.icon_grop.children[i].active = false;
            };
        };
    },
    //plant click 
    on_plant_click: function (e, plant_index) {
        this.sound_control.play_sound_effect("button_click");
        this.land_group.children[this.land_index].getComponent("land").plant(plant_index);
        this.on_touch_exit_click();
    },
    onLoad() {

    },

    start() {

    },

    // update (dt) {},
});
