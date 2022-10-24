cc.Class({
    extends: cc.Component,

    properties: {
        ad_car_node: cc.Node,
    },
    // LIFE-CYCLE CALLBACKS:
    ini_node(price_difference) {
        this.price_difference = price_difference;
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js= cc.find("UI_ROOT").getComponent("game_rules");;
        this.node.x = 500;
        cc.tween(this.node)
            .to(0.5, { x: 0 }, { easing: "elasticOut" })
            .call(() => {
                this.ad_car_node.on("touchstart", this.create_ad, this);
            })
            .start();
    },
    //拉起广告
    create_ad() {
        // this.node.destroy();
        this.ad_control.show_videoAd("ad_car");
        this.video_succes();
    },
    //检测视频是否播放成功
    video_succes: function () {
        if (typeof (wx) != "undefined") {
            var callback = function () {
                if (this.ad_control.video_state == 1 && this.ad_control.video_tag == "ad_car") {
                    this.ad_control.video_tag = null;
                    this.ad_control.video_state = 2;
                    var node = this.game_scene_js.create_tips_ui(this.game_rules_js.node);
                    if (node != null) {
                        node.getComponent("tips_ui").ini_node("gold", this.price_difference);
                        this.game_rules_js.add_gold(this.price_difference);
                    };
                    this.unschedule(callback);
                    this.node.destroy();
                } else {
                    if (this.ad_control.video_tag == null && this.ad_control.video_state == 2) {
                        this.unschedule(callback);
                    };
                };
            };
            this.schedule(callback, 0.2);
        };
    },
    onLoad() {

    },

    start() {

    },

    // update (dt) {},
});
