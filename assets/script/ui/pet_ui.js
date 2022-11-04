var config = require("config");
cc.Class({
    extends: cc.Component,

    properties: {
        pet_content_prefab: cc.Prefab,
        content_node: cc.Node,
    },
    //初始化节点
    ini_node() {
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");

    },
    //创建宠物content
    create_pet_content() {
        var arr = Object.keys(config.pet);
        for (var i = 0; i < arr.length; i++) {
            var node = cc.instantiate(this.pet_content_prefab);
            node.parent = this.content_node;
            node.getComponent("pet_content").ini_node(i);
        };
    },
    //点击退出
    touch_exit() {
        this.sound_control.play_sound_effect("button_exit");
        this.game_scene_js.on_node_kill(this.node);
    },
    onLoad() {

    },

    start() {
        this.create_pet_content();
    },

    // update (dt) {},
});