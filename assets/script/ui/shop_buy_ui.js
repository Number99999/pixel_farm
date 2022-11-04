import user_data from "user_data";
import config from "config";
cc.Class({
    extends: cc.Component,

    properties: {
        icon_sprite: cc.Sprite,
        introduce_label: cc.Label,
        introduce1_label: cc.Label,
        introduce2_label: cc.Label,
        introduce3_label: cc.Label,
        introduce4_label: cc.Label,
        buy_button: cc.Button,
        cost_label: cc.Label,
        price_difference_label: cc.Label,
        have_icon: cc.Node,
        star4_icon: cc.Node,
    },
    ini_node(type, index, icon_frame) {
        this.type = type;
        this.index = index;
        this.icon_frame = icon_frame;
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.ad_car = null;
        //默认状态
        this.price_difference_label.node.active = true;
        this.buy_button.node.active = true;
        this.update_node();
        this.create_ad_car();
    },
    update_node() {
        this.icon_sprite.spriteFrame = this.icon_frame;
        var level = user_data.user_data.level;
        switch (this.type) {
            case "land":
                this.introduce4_label.node.active=false;
                this.star4_icon.active=false;
                if (level >= config.land[this.index].need_level) {
                    //达到解锁条件
                    this.introduce_label.string = "Additional planting area";
                    this.introduce1_label.string = "More area to planting";
                    this.introduce2_label.string = "Remember to water";
                    this.introduce3_label.string =  "Level "+config.land[this.index].need_level +" unlock";
                    if (user_data.user_data.land[this.index].have == 0) {
                        //未拥有
                        this.price_difference = config.land[this.index].cost - user_data.user_data.gold;
                        this.cost_label.string = config.land[this.index].cost;
                        this.have_icon.active = false;
                        if (user_data.user_data.gold >= config.land[this.index].cost) {
                            //金币足够
                            this.buy_button.interactable = true;
                            this.price_difference_label.node.active = false;
                        } else {
                            //金币不足
                            this.buy_button.interactable = false;
                            this.price_difference_label.string = "Not enough gold coins, not enough" + this.price_difference;
                        };
                    } else {
                        //已拥有
                        this.have_icon.active = true;
                        this.buy_button.node.active = false;
                        this.price_difference_label.node.active = false;
                    };
                } else {
                    //未达到解锁条件
                    this.introduce_label.string = "???";
                    this.introduce1_label.string = "???";
                    this.introduce2_label.string = "???";
                    this.introduce3_label.string = "Level "+config.land[this.index].need_level +" unlock";
                    this.price_difference_label.node.active = false;
                    this.cost_label.string = "???";
                    this.buy_button.interactable = false;
                    this.have_icon.active = false;
                };

                break;
            case "plant":
                this.introduce4_label.node.active=true;
                this.star4_icon.active=true;
                if (level >= config.plant[this.index].need_level) {
                    //达到解锁条件
                    this.introduce_label.string = config.plant[this.index].introduce;
                    this.introduce1_label.string = "Sale value: " + config.plant[this.index].sell;
                    this.introduce2_label.string = "Livespan: " + config.plant[this.index].grow_time + "second";
                    this.introduce3_label.string = "Experience: " + config.plant[this.index].exp;
                    this.introduce4_label.string = "Level "+config.plant[this.index].need_level+" unlock";
                    if (user_data.user_data.plant[this.index].have == 0) { 
                        //未拥有
                        this.price_difference = config.plant[this.index].cost - user_data.user_data.gold;
                        this.cost_label.string = config.plant[this.index].cost;
                        this.have_icon.active = false;
                        if (user_data.user_data.gold >= config.plant[this.index].cost) {
                            //金币足够
                            this.buy_button.interactable = true;
                            this.price_difference_label.node.active = false;
                        } else {
                            //金币不足
                            this.buy_button.interactable = false;
                            this.price_difference_label.string = "Not enough gold coins, not enough" + this.price_difference;
                        };
                    } else {
                        //已拥有
                        this.have_icon.active = true;
                        this.buy_button.node.active = false;
                        this.price_difference_label.node.active = false;
                    };
                } else {
                    //未达到解锁条件
                    this.introduce_label.string = "???";
                    this.introduce1_label.string = "???";
                    this.introduce2_label.string = "???";
                    this.introduce3_label.string = "???";
                    this.introduce4_label.string = "Level "+config.plant[this.index].need_level+" unlock";
                    this.price_difference_label.node.active = false;
                    this.cost_label.string = "???";
                    this.buy_button.interactable = false;
                    this.have_icon.active = false;
                };
                break;
        };
    },
    //购买按钮被点击
    on_buy_button_click() {
        switch (this.type) {
            case "land":
                if (user_data.user_data.land[this.index].have == 1) {
                    return;
                } else {
                    //judge money
                    if (user_data.user_data.gold >= config.land[this.index].cost) {
                        //金币足够
                        this.sound_control.play_sound_effect("button_click");
                        var cost = config.land[this.index].cost;
                        this.game_rules_js.add_gold(-cost);
                        user_data.user_data.land[this.index].have = 1;
                        this.game_scene_js.create_tips_ui(this.game_scene_js.node, "buy_succes");
                        //刷新土地
                        this.game_rules_js.updata_land(this.index);
                    } else {
                        //金币不足
                        this.sound_control.play_sound_effect("un_click");
                        this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money");
                    };
                };
                break;
            case "plant":
                if (user_data.user_data.plant[this.index].have == 1) {
                    return;
                } else {
                    //judge money
                    if (user_data.user_data.gold >= config.plant[this.index].cost) {
                        //金币足够
                        this.sound_control.play_sound_effect("button_click");
                        var cost = config.plant[this.index].cost;
                        this.game_rules_js.add_gold(-cost);
                        user_data.user_data.plant[this.index].have = 1;
                        this.game_scene_js.create_tips_ui(this.game_scene_js.node, "buy_succes");
                    } else {
                        //金币不足
                        this.sound_control.play_sound_effect("un_click");
                        this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money");

                    };
                };
                break;
        };
        this.update_node();
    },
    //更新schedule
    update_schedule() {
        var callback = function () {
            this.update_node();
        };
        this.schedule(callback, 1)
    },
    //touch exit
    touch_exit() {
        this.sound_control.play_sound_effect("button_exit");
        if (this.ad_car !== null) {
            cc.log("ad_car destroy")
            this.ad_car.destroy();
        };
        this.game_scene_js.on_node_kill(this.node);
    },
    create_ad_car() {
        switch (this.type) {
            case "land":
                if (user_data.user_data.land[this.index].have != 1) {
                    //未拥有这块地
                    var gold = user_data.user_data.gold;
                    var all_capacity = 500 * user_data.user_data.skill["gold_max"] + 500;
                    var cost = config.land[this.index].cost;
                    //差价
                    var price_difference = cost - gold;
                    //大于4/5,且能够拥有，且金币不足
                    if (gold >= cost * (4 / 5) && all_capacity >= cost && gold < cost) {
                        this.ad_car = this.game_scene_js.create_ad_car(this.node, price_difference);
                    } else {

                    };
                } else {
                    //拥有这块地

                    return;
                }
                break;
            case "plant":
                if (user_data.user_data.plant[this.index].have != 1) {
                    //未拥有这个植物
                    var gold = user_data.user_data.gold;
                    var all_capacity = 500 * user_data.user_data.skill["gold_max"] + 500;
                    var cost = config.plant[this.index].cost;
                    //差价
                    var price_difference = cost - gold;
                    //大于4/5,且能够拥有，且金币不足
                    if (gold >= cost * (4 / 5) && all_capacity >= cost && gold < cost) {
                        this.ad_car = this.game_scene_js.create_ad_car(this.node, price_difference);
                    } else {

                    };
                } else {
                    //拥有这个植物
                    return;
                }
                break;
        };


    },
    // onLoad () {},

    start() {
        this.update_schedule();
    },

    // update (dt) {},
});
