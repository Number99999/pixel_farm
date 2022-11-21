var user_data = require("user_data");
var config = require("config");
cc.Class({
    extends: cc.Component,
    properties: {
        scrollView_array: [cc.Node],
        iap_content_prefab: cc.Prefab,
        content_array: [cc.Node],
    },

    tab_select(e, index) {
        for (var i = 0; i < this.scrollView_array.length; i++) {
            if (i == index) {
                this.scrollView_array[i].active = true;
            } else {
                this.scrollView_array[i].active = false;
            };
        };
    },

    ini_node() {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.ad_control.show_bannerAd();
    },
    create_shop_content() {
        var node = null;
        for (var i = 0; i < this.scrollView_array.length; i++) {
            switch (i) {
                case 0:
                    var arr = Object.keys(config.iap_gold);
                    for (var j = 0; j < arr.length; j++) {
                        node = cc.instantiate(this.iap_content_prefab)
                        node.parent = this.content_array[i];
                        node.getComponent("iap_content").ini_node("gold", j);
                    }
                    break;
                case 1:
                    var arr = Object.keys(config.iap_diamond);
                    for (var j = 0; j < arr.length; j++) {
                        node = cc.instantiate(this.iap_content_prefab)
                        node.parent = this.content_array[i];
                        node.getComponent("iap_content").ini_node("diamond", j);
                    }
                    break;
            };
        }
    },
    touch_exit() {
        this.ad_control.hide_bannerAd();
        this.game_scene_js.on_node_kill(this.node);
    },
    // onLoad () {},

    start() {
        this.create_shop_content();
    },

    // update (dt) {},
});
