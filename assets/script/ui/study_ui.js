var user_data = require("user_data");
var skill_content = require("skill_content");
cc.Class({
    extends: cc.Component,

    properties: {
        skill_group_node: cc.Node,
        skill_content_prefab: cc.Prefab,
        skill_point_label: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:
    ini_node: function () {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
        // this.skill_content_js = cc.find("skill_content").getComponent("skill_content");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.create_content();
    },
    //
    create_content: function () {
        if (this.skill_group_node.children.length == 0) {
            var skill_arr = Object.keys(user_data.user_data.skill);
            for (var i = 0; i < skill_arr.length; i++) {
                var node = cc.instantiate(this.skill_content_prefab);
                node.parent = this.skill_group_node;
                node.getComponent("skill_content").ini_node(i);
            };
        } else {
            return;
        };
    },
    //skill_point
    update_skill_point: function () {
        this.skill_point_label.string = user_data.user_data.skill_point;
        var callback = function () {
            this.skill_point_label.string = user_data.user_data.skill_point;
        };
        this.schedule(callback, 0.1, cc.macro.REPEAT_FOREVER);
    },

    on_touch_exit: function () {
        this.sound_control.play_sound_effect("button_exit");
        this.game_scene_js.on_node_kill(this.node);
    },

    on_rest_skill_point_button_click() {
        this.sound_control.play_sound_effect("button_click");
        this.adsManager_js.showRewardedVideo(() => {
            var level = user_data.user_data.level;
            var arr = Object.keys(user_data.user_data.skill);
            user_data.user_data.skill_point = level;
            var skill_arr = Object.keys(user_data.user_data.skill);
            //reset skill to lv 0
            for (var j = 0; j < arr.length; j++) {
                if (arr[j] == "offline_profit") {
                    user_data.user_data.skill["offline_profit"] = 1;
                } else {
                    user_data.user_data.skill[arr[j]] = 0;
                };
            };
            var gold_max = 500 * user_data.user_data.skill["gold_max"] + 500;
            if (user_data.user_data.gold > gold_max) user_data.user_data.gold = gold_max;
            // reset skill_content
            for (var i = 0; i < skill_arr.length; i++) {
                this.skill_group_node.children[i].getComponent("skill_content").ini_node(i);
            };
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "skill_rest");
            this.game_rules_js.set_gold_progress();
        });
    },

    video_succes: function () {
        if (typeof (wx) != "undefined") {
            var callback = function () {
                if (this.ad_control.video_state == 1 && this.ad_control.video_tag == "skill_rest") {
                    this.ad_control.video_tag = null;
                    this.ad_control.video_state = 2;
                    var level = user_data.user_data.level;
                    var arr = Object.keys(user_data.user_data.skill);
                    user_data.user_data.skill_point = level;
                    var skill_arr = Object.keys(user_data.user_data.skill);
                    for (var j = 0; j < arr.length; j++) {
                        if (arr[j] == "offline_profit") {
                            user_data.user_data.skill["offline_profit"] = 1;
                        } else {
                            user_data.user_data.skill[arr[j]] = 0;
                        };
                    };
                    for (var i = 0; i < skill_arr.length; i++) {
                        this.skill_group_node.children[i].getComponent("skill_content").ini_node(i);
                    };
                    this.game_scene_js.create_tips_ui(this.game_scene_js.node, "skill_rest");
                    this.game_rules_js.set_gold_progress();
                    this.unschedule(callback);
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
        this.update_skill_point();
    },

    // update (dt) {},
});
