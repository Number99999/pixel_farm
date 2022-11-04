import user_data from "user_data";
import config from "config";

cc.Class({

    extends: cc.Component,

    properties: {
        lock_group_node: cc.Node,
        label_group_node: cc.Node,
        hotel_eject_node: cc.Node,
        buy_tittle_label: cc.Label,
        cost_label: cc.Label,
        iocn_frame_arr: [cc.SpriteFrame],
        buy_button_node: cc.Node,
    },

    //初始化节点
    ini_node() {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.ad_car = null;
        for (var i = 0; i < this.lock_group_node.children.length; i++) {
            if (user_data.user_data.hotel[i].have == 1) {
                this.label_group_node.children[i].active = false;
                this.hotel_eject_node.active = false;
                this.lock_group_node.children[i].getComponent(cc.Sprite).spriteFrame = this.iocn_frame_arr[1];
            } else {
                this.label_group_node.children[i].active = true;
                this.lock_group_node.children[i].getComponent(cc.Sprite).spriteFrame = this.iocn_frame_arr[0];
                this.lock_group_node.children[i].getComponent(cc.Button).interactable = true;
                this.label_group_node.children[i].getComponent(cc.Label).string = config.hotel[i].need_level;
            };
        };

    },
    //初始化弹出界面
    ini_hotel_eject(index) {
        if (user_data.user_data.hotel[index].have == 1) {
            this.buy_button_node.active = false;
        } else {
            this.buy_button_node.active = true;
        };
        this.buy_tittle_label.string = "Rent a house every other" + config.hotel[this.room_index].produce_time + "seconds to get" + config.hotel[this.room_index].produce + "gold";
        this.cost_label.string = config.hotel[this.room_index].cost;
    },
    //on lock button click
    on_lock_button_click(e, index) {
        this.room_index = index;
        var level = user_data.user_data.level;
        if (level >= config.hotel[index].need_level) {
            this.sound_control.play_sound_effect("button_click");
            this.hotel_eject_node.active = true;
            this.ini_hotel_eject(index);
            this.create_ad_car();
        } else {
            this.sound_control.play_sound_effect("un_click");
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_level");
        };
    },
    //touch exit
    on_touch_exit_click(e) {

        this.sound_control.play_sound_effect("button_exit");
        this.game_scene_js.on_node_kill(this.node);
    },
    //hotel_eject exit
    on_hotel_eject_exit_click() {
        this.sound_control.play_sound_effect("button_exit");
        if (this.ad_car !== null) {
            this.ad_car.destroy();
        };
        this.hotel_eject_node.active = false;
    },
    //购买按钮被点击
    on_buy_button_click() {
        var gold = user_data.user_data.gold;
        var cost = config.hotel[this.room_index].cost
        if (gold >= cost) {
            this.sound_control.play_sound_effect("button_click");
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "buy_succes");
            this.game_rules_js.add_gold(-cost);
            user_data.user_data.hotel[this.room_index].have = 1;
            this.game_rules_js.hotel_buy_room(this.room_index);
            this.ini_node();
        } else {
            this.sound_control.play_sound_effect("un_click");
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money_gold");
        };
    },
    //创建ad_car
    create_ad_car() {
        if (user_data.user_data.hotel[this.room_index].have != 1) {
            var gold = user_data.user_data.gold;
            var all_capacity = 500 * user_data.user_data.skill["gold_max"] + 500;
            var cost = (config.hotel[this.room_index].cost);
            //差价
            var price_difference = cost - gold;
            //大于4/5,且能够拥有，且金币不足
            if (gold >= cost * (4 / 5) && all_capacity >= cost && gold < cost) {

                this.ad_car = this.game_scene_js.create_ad_car(this.node, price_difference);
            };
        } else {
            return;
        }

    },
    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
