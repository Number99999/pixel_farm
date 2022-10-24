var user_data = require("user_data");
import config from "config";
cc.Class({
    extends: cc.Component,

    properties: {
        button_group_prefab: cc.Prefab,
        plant_ui_prefab: cc.Prefab,
        sell_ui_prefab: cc.Prefab,
        tips_ui_prefab: cc.Prefab,
        light_effect_prefab: cc.Prefab,
        study_ui_prefab: cc.Prefab,
        staff_ui_prefab: cc.Prefab,
        offline_profit_ui_prefab: cc.Prefab,
        pet_ui_prefab: cc.Prefab,
        ad_car_prefab: cc.Prefab,
        button_tips_prefab: cc.Prefab,
        rest_ui_prefab: cc.Prefab,
        pet_prefab_arr: [cc.Prefab],
        ex_effect_prefab: cc.Prefab,
        gift_ui_prefab: cc.Prefab,
        option_ui_prefab: cc.Prefab,
        gold_effect_prefab: cc.Prefab,
        novice_ui_prefab: cc.Prefab,
        hotel_ui_prefab: cc.Prefab,
        shop_ui_prefab: cc.Prefab,
        shop_buy_ui_prefab: cc.Prefab,
        videotape_ui_prefab: cc.Prefab,
    },

    //创建按钮组的节点池
    new_button_group_node_pool: function () {
        this.button_more_node_pool = new cc.NodePool();
        var node = cc.instantiate(this.button_group_prefab);
        this.button_more_node_pool.put(node);
    },
    //
    new_plant_ui_node_pool: function () {
        this.new_plant_ui_node_pool = new cc.NodePool();
        var node = cc.instantiate(this.plant_ui_prefab);
        this.new_plant_ui_node_pool.put(node);
    },
    new_videotape_ui_pool: function () {
        this.new_videotape_ui_pool = new cc.NodePool();
        var node = cc.instantiate(this.videotape_ui_prefab);
        this.new_videotape_ui_pool.put(node);
    },
    new_sell_ui_node_pool: function () {
        this.new_sell_ui_node_pool = new cc.NodePool();
        var node = cc.instantiate(this.sell_ui_prefab);
        this.new_sell_ui_node_pool.put(node);
    },
    new_tips_ui_node_pool: function () {
        var count = 5;
        this.new_tips_ui_node_pool = new cc.NodePool();
        for (var i = 0; i < count; i++) {
            var node = cc.instantiate(this.tips_ui_prefab);
            this.new_tips_ui_node_pool.put(node);
        };
    },
    new_light_effect_pool: function () {
        var count = 8;
        this.new_light_effect_pool = new cc.NodePool();
        for (var i = 0; i < count; i++) {
            var node = cc.instantiate(this.light_effect_prefab);
            this.new_light_effect_pool.put(node);
        };
    },
    new_study_ui_pool: function () {
        this.new_study_ui_pool = new cc.NodePool();
        var node = cc.instantiate(this.study_ui_prefab);
        this.new_study_ui_pool.put(node);
    },
    new_staff_ui_pool: function () {
        this.new_staff_ui_pool = new cc.NodePool();
        var node = cc.instantiate(this.staff_ui_prefab);
        this.new_staff_ui_pool.put(node);
    },
    new_pet_ui_pool: function () {
        this.new_pet_ui_pool = new cc.NodePool();
        var node = cc.instantiate(this.pet_ui_prefab);
        this.new_pet_ui_pool.put(node);
    },
    new_ex_effect_pool() {
        this.new_ex_effect_pool = new cc.NodePool();
        for (var i = 0; i < 10; i++) {
            var node = cc.instantiate(this.ex_effect_prefab);
            this.new_ex_effect_pool.put(node);
        };
    },
    new_gold_effect_pool() {
        this.new_gold_effect_pool = new cc.NodePool();
        for (var i = 0; i < 10; i++) {
            var node = cc.instantiate(this.gold_effect_prefab);
            this.new_gold_effect_pool.put(node);
        };
    },
    new_option_ui_pool() {
        this.new_option_ui_pool = new cc.NodePool();
        var node = cc.instantiate(this.option_ui_prefab);
        this.new_option_ui_pool.put(node);
    },
    new_hotel_ui_pool() {
        this.new_hotel_ui_pool = new cc.NodePool();
        var node = cc.instantiate(this.hotel_ui_prefab);
        this.new_hotel_ui_pool.put(node);
    },
    new_shop_ui_pool() {
        this.new_shop_ui_pool = new cc.NodePool();
        var node = cc.instantiate(this.shop_ui_prefab);
        this.new_shop_ui_pool.put(node);
    },
    new_shop_buy_ui_pool() {
        this.new_shop_buy_ui_pool = new cc.NodePool();
        var node = cc.instantiate(this.shop_buy_ui_prefab);
        this.new_shop_buy_ui_pool.put(node);
    },
    //
    //==================================================================
    //创建按钮组
    create_button_group: function (parentNode) {
        var node = null;
        if (this.button_more_node_pool.size() > 0) {
            node = this.button_more_node_pool.get();
            node.parent = parentNode;
        } else {
            return;
        };
        return node;
    },
    create_plant_ui: function (parentNode) {
        var node = null;
        if (this.new_plant_ui_node_pool.size() > 0) {
            node = this.new_plant_ui_node_pool.get();
            node.parent = parentNode;
        } else {
            return;
        };
        return node;
    },
    create_sell_ui: function (parentNode) {
        var node = null;
        if (this.new_sell_ui_node_pool.size() > 0) {
            node = this.new_sell_ui_node_pool.get();
            node.parent = parentNode;
        } else {
            return;
        };
        return node;
    },
    create_tips_ui: function (parentNode, type, num) {
        var node = null;
        if (this.new_tips_ui_node_pool.size() > 0) {
            node = this.new_tips_ui_node_pool.get();
            node.parent = parentNode;
            node.getComponent("tips_ui").ini_node(type, num);
        } else {
            return;
        };
    },
    create_study_ui: function (parentNode) {
        var node = null;
        if (this.new_study_ui_pool.size() > 0) {
            node = this.new_study_ui_pool.get();
            node.parent = parentNode;
        } else {
            return;
        };
        return node;
    },
    create_staff_ui: function (parentNode) {
        var node = null;
        if (this.new_staff_ui_pool.size() > 0) {
            node = this.new_staff_ui_pool.get();
            node.parent = parentNode;
        } else {
            return;
        };
        return node;
    },
    create_offline_profit_ui: function (parentNode) {
        var node = cc.instantiate(this.offline_profit_ui_prefab);
        node.parent = parentNode;
        node.getComponent("offline_profit").ini_node();
    },
    create_pet_ui: function (parentNode) {
        var node = null;
        if (this.new_pet_ui_pool.size() > 0) {
            node = this.new_pet_ui_pool.get();
            node.parent = parentNode;
        } else {
            return;
        };
        return node;
    },
    create_ad_car(parentNode, price_difference) {
        var node = cc.instantiate(this.ad_car_prefab)
        node.parent = parentNode;
        node.getComponent("ad_car").ini_node(price_difference);
        return node;
    },
    //父节点，提示点类型，目标位置
    create_button_tips(parentNode, position_target) {
        var node = cc.instantiate(this.button_tips_prefab);
        node.parent = parentNode;
        node.x = position_target.x;
        node.active = false;
    },
    create_rest_ui(parentNode, staff_index) {
        var node = cc.instantiate(this.rest_ui_prefab);
        node.parent = parentNode;
        node.getComponent("rest_ui").ini_node(staff_index);
    },
    create_gift_ui(parentNode) {
        var node = cc.instantiate(this.gift_ui_prefab);
        node.parent = parentNode;
        node.getComponent("gift_ui").ini_node();
    },
    create_pet(parentNode, index) {
        var node = cc.instantiate(this.pet_prefab_arr[index]);
        node.parent = parentNode;
    },
    create_option_ui() {
        if (this.new_option_ui_pool.size() > 0) {
            var node = this.new_option_ui_pool.get();
            node.parent = this.node;
            node.getComponent("option_ui").ini_node();
        };
    },
    create_novice_ui() {
        var node = cc.instantiate(this.novice_ui_prefab);
        node.parent = this.node;
        node.getComponent("novice_ui").ini_node();
    },
    create_hotel_ui() {
        if (this.new_hotel_ui_pool.size() > 0) {
            var node = this.new_hotel_ui_pool.get();
            node.parent = this.node;
            node.getComponent("hotel_ui").ini_node();
        };
    },
    create_shop_buy_ui(type, index, spriteFrame) {
        //物品类型，物品编号，物品的图片
        if (this.new_shop_buy_ui_pool.size() > 0) {
            var node = this.new_shop_buy_ui_pool.get();
            node.parent = this.node;
            node.getComponent("shop_buy_ui").ini_node(type, index, spriteFrame);
        };
    },
    create_shop_ui() {
        if (this.new_shop_ui_pool.size() > 0) {
            var node = this.new_shop_ui_pool.get();
            node.parent = this.node;
            node.getComponent("shop_ui").ini_node();
        };
    },
    create_videotape_ui() {
        if (this.new_videotape_ui_pool.size() > 0) {
            var node = this.new_videotape_ui_pool.get();
            node.parent = this.node;
            node.getComponent("videotape_ui").ini_node();
        };
    },
    create_ex_effect(create_node, index) {

        //在哪个节点进行创建，创建的第几个
        //create_node , index
        var level_icon = cc.find("UI_ROOT/top/level/level_icon");
        //将创建的初始地址 转换为世界坐标
        var c_Wpos = create_node.parent.convertToWorldSpaceAR(create_node.position);
        //转换为需要的相对坐标
        var c_nPos = this.node.convertToNodeSpaceAR(c_Wpos);

        //将飞往的目标位置转为世界坐标
        var t_Wpos = level_icon.parent.convertToWorldSpaceAR(level_icon.position);
        //将目标位置转为相对位置
        var t_Npos = this.node.convertToNodeSpaceAR(t_Wpos)


        if (this.new_ex_effect_pool.size() > 0) {
            var node = this.new_ex_effect_pool.get();
            node.parent = this.node;
            node.position = c_nPos;
            cc.tween(node)
                .to((index + 1) / 5, { position: t_Npos }, { easing: "sineIn" })
                .call(() => {
                    this.sound_control.play_sound_effect("add_ex");
                    this.game_rules_js.add_ex(1);
                    this.on_node_kill(node);
                })
                .start();
        };
    },
    //收割特效
    create_light_effect(create_node, index, plant_index) {
        //在哪个节点进行创建，创建的第几个 种子编号
        var sell = cc.find("UI_ROOT/center/build/sell");
        //将创建的初始地址 转换为世界坐标
        var c_Wpos = create_node.parent.convertToWorldSpaceAR(create_node.position);
        //转换为需要的相对坐标
        var c_nPos = this.node.convertToNodeSpaceAR(c_Wpos);

        //将飞往的目标位置转为世界坐标
        var t_Wpos = sell.parent.convertToWorldSpaceAR(sell.position);
        //将目标位置转为相对位置
        var t_Npos = this.node.convertToNodeSpaceAR(t_Wpos)

        if (this.new_light_effect_pool.size() > 0) {
            var node = this.new_light_effect_pool.get();
            node.parent = this.node;
            node.position = c_nPos;
            cc.tween(node)
                .delay(1)
                .to((index + 1) / 5, { position: t_Npos }, { easing: "sineIn" })
                .call(() => {
                    this.sound_control.play_sound_effect("add_ex");
                    var all_capacity = user_data.user_data.wareHouse_level * config.wareHouse["all_capacity"];
                        for (var i = 0; i < 15; i++) {
                            if (user_data.user_data.wareHouse[i].have == 0) break;      // nếu chưa mở ô thì dừng, k cộng thêm nữa, đã tràn kho
                            else if (user_data.user_data.wareHouse[i].count == 0) {          // nếu là ô trống thì thêm vào
                                user_data.user_data.wareHouse[i].count = 1;
                                user_data.user_data.wareHouse[i].id_product = plant_index;  // gán id cây 
                                break;
                            }
                            else if(user_data.user_data.wareHouse[i].count <30 && user_data.user_data.wareHouse[i].id_product== plant_index) // kiểm tra kho cùng loại
                            {
                                user_data.user_data.wareHouse[i].count++;
                                break;
                            }

                        }
                        // user_data.user_data.wareHouse[plant_index].count++; // thêm vật phẩm vào kho


                    this.game_rules_js.add_ex(1);
                    this.on_node_kill(node);
                })
                .start();
        };
        return node;
    },

    create_gold_effect(create_node, index, addGold) {
        //create node 在哪个节点飞， index 数量 ,num增加的金币数量
        var gold_icon = cc.find("UI_ROOT/top/gold/gold_icon");
        //将创建的初始地址 转换为世界坐标
        var c_Wpos = create_node.parent.convertToWorldSpaceAR(create_node.position);
        //转换为需要的相对坐标
        var c_nPos = this.node.convertToNodeSpaceAR(c_Wpos);

        //将飞往的目标位置转为世界坐标
        var t_Wpos = gold_icon.parent.convertToWorldSpaceAR(gold_icon.position);
        //将目标位置转为相对位置
        var t_Npos = this.node.convertToNodeSpaceAR(t_Wpos)

        if (this.new_gold_effect_pool.size() > 0) {
            var node = this.new_gold_effect_pool.get();
            node.parent = this.node;
            node.position = c_nPos;
            node.y += 50;
            cc.tween(node)
                .to((index + 1) / 5, { position: t_Npos }, { easing: "sineIn" })
                .call(() => {
                    this.sound_control.play_sound_effect("add_gold");
                    this.game_rules_js.add_gold(addGold);
                    this.on_node_kill(node);
                })
                .start();
        };

    },
    //节点销毁
    on_node_kill: function (node) {
        switch (node.name) {
            case "button_more":
                this.button_more_node_pool.put(node);
                break;
            case "plant_ui":
                this.new_plant_ui_node_pool.put(node);
                break;
            case "sell_ui":
                this.new_sell_ui_node_pool.put(node);
                break;
            case "tips_ui":
                this.new_tips_ui_node_pool.put(node);
                break;
            case "light":
                this.new_light_effect_pool.put(node);
                break;
            case "study_ui":
                this.new_study_ui_pool.put(node);
                break;
            case "staff_ui":
                this.new_staff_ui_pool.put(node);
                break;
            case "pet_ui":
                this.new_pet_ui_pool.put(node);
                break;
            case "ex_effect":
                this.new_ex_effect_pool.put(node);
                break;
            case "gold_effect":
                this.new_gold_effect_pool.put(node);
                break;
            case "option_ui":
                this.new_option_ui_pool.put(node);
                break;
            case "hotel_ui":
                this.new_hotel_ui_pool.put(node);
                break;
            case "shop_buy_ui":
                this.new_shop_buy_ui_pool.put(node);
                break;
            case "shop_ui":
                this.new_shop_ui_pool.put(node);
                break;
            case "videotape_ui":
                this.new_videotape_ui_pool.put(node);
                break;
            default:
                return;
        };
        cc.log(node.name, "放入节点池");
    },
    //初始化节点
    ini_node: function () {
        this.new_button_group_node_pool();
        this.new_plant_ui_node_pool();
        this.new_sell_ui_node_pool();
        this.new_tips_ui_node_pool();
        this.new_light_effect_pool();
        this.new_study_ui_pool();
        this.new_staff_ui_pool();
        this.new_pet_ui_pool();
        this.new_ex_effect_pool();
        this.new_option_ui_pool();
        this.new_gold_effect_pool();
        this.new_hotel_ui_pool();
        this.new_shop_buy_ui_pool();
        this.new_shop_ui_pool();
        this.new_videotape_ui_pool();

    },
    onLoad() {
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.ini_node();
    },

    start() {

    },

    // update (dt) {},
});
