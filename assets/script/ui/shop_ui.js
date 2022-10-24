var user_data = require("user_data");
var config = require("config");
cc.Class({
    extends: cc.Component,

    properties: {
        scrollView_array: [cc.Node],
        shop_content_prefab: cc.Prefab,
        content_array: [cc.Node],
    },
    //选项卡切换
    tab_select(e, index) {
        this.sound_control.play_sound_effect("button_click");
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
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.ad_control.show_bannerAd();
    },
    create_shop_content() {
        var node = null;
        for (var i = 0; i < this.scrollView_array.length; i++) {
            switch (i) {
                case 0:
                    //创建land
                    var arr = Object.keys(config.land);
                    for (var j = 0; j < arr.length; j++) {
                        node = cc.instantiate(this.shop_content_prefab)
                        node.parent = this.content_array[i];
                        node.getComponent("shop_content").ini_node("land", j);
                    }
                    break;
                case 1:
                    //创建plant
                    var arr = Object.keys(config.plant);
                    for (var j = 0; j < arr.length; j++) {
                        node = cc.instantiate(this.shop_content_prefab)
                        node.parent = this.content_array[i];
                        node.getComponent("shop_content").ini_node("plant", j);
                    }
                    break;
            };
        }
    },
    touch_exit() {
        this.sound_control.play_sound_effect("button_exit");
        this.ad_control.hide_bannerAd();
        this.game_scene_js.on_node_kill(this.node);
    },
    // onLoad () {},

    start() {
        this.create_shop_content();
    },

    // update (dt) {},
});
