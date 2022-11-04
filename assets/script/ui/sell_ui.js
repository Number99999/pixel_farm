var user_data = require("user_data");
var config = require("config");
cc.Class({
    extends: cc.Component,

    properties: {
        box_frame_arr: [cc.SpriteFrame],
        icon_group_node: cc.Node,
        label_group_node: cc.Node,
        // estimate_label: cc.Label,
        lock_group_node: cc.Node,
        confirm_button_node: cc.Node,
        sum_gold: 0,
        sum_diamond: 0,
        index: 0,
    },

    // LIFE-CYCLE CALLBACKS:
    ini_node: function () {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.set_sell();
        // this.set_estimate_label();
    },
    button_unlock_click(e, custom) {        // button unlock repo
        // if (custom <= 7) {
        this.node.children[2].active = false;   // show POP-UP open new repo
        this.node.children[3].active = true;    // hidden repo
        this.show_comfirm_buy(custom);
        // }
        // else
        //     this.game_scene_js.create_tips_ui(this.game_scene_js.node, "cant_unlock_repo");
    },
    show_comfirm_buy: function (custom) {       // hiển thị số tiền để mua rương, thêm nút xác nhận
        this.sum_gold = Number(0);
        this.sum_diamond = Number(0);
        // var sum_diamond = 0;
        for (var i = 0; i <= custom; i++) {
            if (user_data.user_data.wareHouse[i].have == 0) {
                if (user_data.user_data.wareHouse[i].type_buy == "gold")
                    this.sum_gold += user_data.user_data.wareHouse[i].cost;
                else this.sum_diamond += user_data.user_data.wareHouse[i].cost;
                // cc.log("43 index " + i + " cost " + user_data.user_data.wareHouse[i].cost);
            }
        }
        this.node.children[3].children[0].getComponent(cc.Label).string = "Do you want use " + this.sum_gold + " gold and " + this.sum_diamond + " diamond to buy new repository?";
        this.index = custom;
    },
    buy_repo: function () {
        if (user_data.user_data.gold >= this.sum_gold && user_data.user_data.diamond >= this.sum_diamond) {
            // console.log("sum_godl " + sum_gold);
            // user_data.user_data.diamond -= this.sum_diamond;
            for (var i = 0; i <= this.index; i++) {
                user_data.user_data.wareHouse[i].have = 1;
                this.lock_group_node.children[i].active = false;
                this.label_group_node.children[i].getComponent(cc.Label).string = user_data.user_data.wareHouse[i].count + "/30";
                this.game_scene_js.create_tips_ui(this.game_scene_js.node, "unlocked_repo");
            }
            this.game_rules_js.add_gold(-this.sum_gold);
            this.game_rules_js.add_diamond(-this.sum_diamond);
            this.touch_exit();
        }
        else if (user_data.user_data.gold < this.gold) {
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money_gold");
        }
        else if (user_data.user_data.diamond, this.diamond)
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money_diamond");
        else this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money");
    },
    // auto_sell: function () {    // tự động bán hàng trong kho // chưa xong
    //     var time_auto = 60 * 60;

    //     var auto = function () {
    //         time_auto -=0.1;
    //     };
    //     this.schedule(this.auto, 0.1);
    // },

    set_sell: function () {
        var all_capacity = 30;
        for (var i = 0; i < this.icon_group_node.children.length; i++) {
            if (user_data.user_data.wareHouse[i].have == 1) {
                let count = user_data.user_data.wareHouse[i].count;
                this.label_group_node.children[i].getComponent(cc.Label).string = count + "/" + all_capacity;
                this.lock_group_node.children[i].active = false;

                if (count > 0) {
                    var id_product = user_data.user_data.wareHouse[i].id_product;
                    this.icon_group_node.children[i].getComponent(cc.Sprite).spriteFrame = this.box_frame_arr[id_product];
                }
                else {
                    this.icon_group_node.children[i].getComponent(cc.Sprite).spriteFrame = this.box_frame_arr[8];
                }
            }
            else {
                this.label_group_node.children[i].getComponent(cc.Label).string = '';
                this.lock_group_node.children[i].active = true;
                this.icon_group_node.children[i].getComponent(cc.Sprite).SpriteFrame = this.box_frame_arr[8];
            }

        }
    },
    touch_exit: function () {
        if (this.node.children[2].active == false) {
            this.node.children[2].active = true;
            this.node.children[3].active = false;
        }
        else {
            this.sound_control.play_sound_effect("button_exit");
            this.game_scene_js.on_node_kill(this.node);
        }

    },
    //设置预计卖出文字
    set_estimate_label: function () {
        var sum = 0;
        for (var i = 0; i < this.icon_group_node.children.length; i++) {
            var count = user_data.user_data.wareHouse[i].count;
            var sell = config.plant[i].sell;
            sum += count * sell;
        };
        this.estimate_label.string = "Expected to sell: " + sum;
    },
    //普通卖出
    on_sell_button_click: function () {
        this.sound_control.play_sound_effect("button_click");
        var sum = 0;
        for (var i = 0; i < this.icon_group_node.children.length; i++) {
            var count = user_data.user_data.wareHouse[i].count;
            var id_product = user_data.user_data.wareHouse[i].id_product;// lấy id của cây trong mỗi kho
            if (id_product > 7) continue;
            var sell = config.plant[id_product].sell;
            sum += count * sell;
        };
        if (sum == 0) {
            this.game_scene_js.create_tips_ui(this.game_rules_js.node, "no_sell");
        } else {
            for (var j = 0; j < this.icon_group_node.children.length; j++) {
                user_data.user_data.wareHouse[j].count = 0;
            };
            this.game_scene_js.create_tips_ui(this.game_rules_js.node, "gold", sum);
            this.game_rules_js.add_gold(sum);
            this.set_sell();
        };
    },

    //double_sell_button_click
    on_double_sell_button_click() {
        this.sound_control.play_sound_effect("button_click");
        this.adsManager_js.showRewardedVideo(() => {
            var sum = 0;
            for (var i = 0; i < this.icon_group_node.children.length; i++) {
                var count = user_data.user_data.wareHouse[i].count;
                var id_product = user_data.user_data.wareHouse[i].id_product;// lấy id của cây trong mỗi kho
                if (id_product > 7) continue;
                var sell = config.plant[id_product].sell;
                sum += count * sell;
            };
            if (sum == 0) {
                this.game_scene_js.create_tips_ui(this.game_rules_js.node, "no_sell");
            } else {
                for (var j = 0; j < this.icon_group_node.children.length; j++) {
                    user_data.user_data.wareHouse[j].count = 0;
                };
                this.game_scene_js.create_tips_ui(this.game_rules_js.node, "gold", sum);
                this.game_rules_js.add_gold(sum * 2);
                this.set_sell();
            };
        });
    },

    //检测视频是否播放成功
    video_succes: function () {
        if (typeof (wx) != "undefined") {
            var callback = function () {
                if (this.ad_control.video_state == 1 && this.ad_control.video_tag == "double_sell") {
                    this.ad_control.video_tag = null;
                    this.ad_control.video_state = 2;
                    var sum = 0;
                    for (var i = 0; i < this.icon_group_node.children.length; i++) {
                        var count = user_data.user_data.wareHouse[i].count;
                        var sell = config.plant[i].sell;
                        sum += count * sell;
                    };
                    for (var j = 0; j < this.icon_group_node.children.length; j++) {
                        user_data.user_data.wareHouse[j].count = 0;
                    };
                    this.game_scene_js.create_tips_ui(this.game_rules_js.node, "gold", sum * 2);
                    this.game_rules_js.add_gold(sum * 2);
                    this.set_sell();
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

    },

    // update (dt) {},
});
