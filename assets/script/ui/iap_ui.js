var user_data = require("user_data");
var config = require("config");
cc.Class({
    extends: cc.Component,

    properties: {
        scrollView_array: [cc.Node],
        iap_content_prefab: cc.Prefab,
        content_array: [cc.Node],
    },
    //选项卡切换
    tab_select(e, index) {
        for (var i = 0; i < this.scrollView_array.length; i++) {
            if (i == index) {
                this.scrollView_array[i].active = true;
            } else {
                this.scrollView_array[i].active = false;
            };
        };
    },
    //初始化节点
    ini_node() {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.iap_content_js = cc.find("iap_content").getComponent("iap_content");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
    },
    create_iap_content() {  // lỗi
        var node = null;
        for (var i = 0; i < this.scrollView_array.length; i++) {
            switch (i) {
                case 0:
                    //diamond
                    var arr = Object.keys(config.iap_diamond);
                    for (var j = 0; j < arr.length; j++) {
                        node = cc.instantiate(this.iap_content_prefab)
                        node.parent = this.content_array[i];
                        node.getComponent("iap_content_ui").ini_node("diamond", j);
                    }
                    break;
                case 1:
                    //     //gold
                    var arr = Object.keys(config.iap_gold);
                    for (var j = 0; j < arr.length; j++) {
                        node = cc.instantiate(this.iap_content_prefab)
                        node.parent = this.content_array[i];
                        node.getComponent("iap_content_ui").ini_node("gold", j);
                    }
                    break;
            };
        }
    },
    show_gold(){
        node.getComponent("iap_content_ui").button_show_iap_gold();
    },
    show_diamond(){
        node.getComponent("iap_content_ui").button_show_iap_diamond();
    },
    touch_exit() {
        this.sound_control.play_sound_effect("button_exit");
        this.game_scene_js.on_node_kill(this.node);
    },
    // onLoad () {},

    start() {
        this.create_iap_content();
    },

    // update (dt) {},
});
