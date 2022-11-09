
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/game_scene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '09fa5SlLAhDcY18uaOf/7tQ', 'game_scene');
// script/game_scene.js

"use strict";

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
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
    iap_ui_prefab: cc.Prefab
  },
  //创建按钮组的节点池
  new_button_group_node_pool: function new_button_group_node_pool() {
    this.button_more_node_pool = new cc.NodePool();
    var node = cc.instantiate(this.button_group_prefab);
    this.button_more_node_pool.put(node);
  },
  //
  new_plant_ui_node_pool: function new_plant_ui_node_pool() {
    this.new_plant_ui_node_pool = new cc.NodePool();
    var node = cc.instantiate(this.plant_ui_prefab);
    this.new_plant_ui_node_pool.put(node);
  },
  new_videotape_ui_pool: function new_videotape_ui_pool() {
    this.new_videotape_ui_pool = new cc.NodePool();
    var node = cc.instantiate(this.videotape_ui_prefab);
    this.new_videotape_ui_pool.put(node);
  },
  new_sell_ui_node_pool: function new_sell_ui_node_pool() {
    this.new_sell_ui_node_pool = new cc.NodePool();
    var node = cc.instantiate(this.sell_ui_prefab);
    this.new_sell_ui_node_pool.put(node);
  },
  new_tips_ui_node_pool: function new_tips_ui_node_pool() {
    var count = 5;
    this.new_tips_ui_node_pool = new cc.NodePool();

    for (var i = 0; i < count; i++) {
      var node = cc.instantiate(this.tips_ui_prefab);
      this.new_tips_ui_node_pool.put(node);
    }

    ;
  },
  new_light_effect_pool: function new_light_effect_pool() {
    var count = 8;
    this.new_light_effect_pool = new cc.NodePool();

    for (var i = 0; i < count; i++) {
      var node = cc.instantiate(this.light_effect_prefab);
      this.new_light_effect_pool.put(node);
    }

    ;
  },
  new_study_ui_pool: function new_study_ui_pool() {
    this.new_study_ui_pool = new cc.NodePool();
    var node = cc.instantiate(this.study_ui_prefab);
    this.new_study_ui_pool.put(node);
  },
  new_staff_ui_pool: function new_staff_ui_pool() {
    this.new_staff_ui_pool = new cc.NodePool();
    var node = cc.instantiate(this.staff_ui_prefab);
    this.new_staff_ui_pool.put(node);
  },
  new_pet_ui_pool: function new_pet_ui_pool() {
    this.new_pet_ui_pool = new cc.NodePool();
    var node = cc.instantiate(this.pet_ui_prefab);
    this.new_pet_ui_pool.put(node);
  },
  new_ex_effect_pool: function new_ex_effect_pool() {
    this.new_ex_effect_pool = new cc.NodePool();

    for (var i = 0; i < 10; i++) {
      var node = cc.instantiate(this.ex_effect_prefab);
      this.new_ex_effect_pool.put(node);
    }

    ;
  },
  new_gold_effect_pool: function new_gold_effect_pool() {
    this.new_gold_effect_pool = new cc.NodePool();

    for (var i = 0; i < 10; i++) {
      var node = cc.instantiate(this.gold_effect_prefab);
      this.new_gold_effect_pool.put(node);
    }

    ;
  },
  new_option_ui_pool: function new_option_ui_pool() {
    this.new_option_ui_pool = new cc.NodePool();
    var node = cc.instantiate(this.option_ui_prefab);
    this.new_option_ui_pool.put(node);
  },
  new_hotel_ui_pool: function new_hotel_ui_pool() {
    this.new_hotel_ui_pool = new cc.NodePool();
    var node = cc.instantiate(this.hotel_ui_prefab);
    this.new_hotel_ui_pool.put(node);
  },
  new_shop_ui_pool: function new_shop_ui_pool() {
    this.new_shop_ui_pool = new cc.NodePool();
    var node = cc.instantiate(this.shop_ui_prefab);
    this.new_shop_ui_pool.put(node);
  },
  new_iap_ui_pool: function new_iap_ui_pool() {
    // done
    this.new_iap_ui_pool = new cc.NodePool();
    var node = cc.instantiate(this.iap_ui_prefab);
    this.new_iap_ui_pool.put(node);
  },
  new_shop_buy_ui_pool: function new_shop_buy_ui_pool() {
    this.new_shop_buy_ui_pool = new cc.NodePool();
    var node = cc.instantiate(this.shop_buy_ui_prefab);
    this.new_shop_buy_ui_pool.put(node);
  },
  //
  //==================================================================
  //创建按钮组
  create_button_group: function create_button_group(parentNode) {
    var node = null;

    if (this.button_more_node_pool.size() > 0) {
      node = this.button_more_node_pool.get();
      node.parent = parentNode;
    } else {
      return;
    }

    ;
    return node;
  },
  create_plant_ui: function create_plant_ui(parentNode) {
    var node = null;

    if (this.new_plant_ui_node_pool.size() > 0) {
      node = this.new_plant_ui_node_pool.get();
      node.parent = parentNode;
    } else {
      return;
    }

    ;
    return node;
  },
  create_sell_ui: function create_sell_ui(parentNode) {
    var node = null;

    if (this.new_sell_ui_node_pool.size() > 0) {
      node = this.new_sell_ui_node_pool.get();
      node.parent = parentNode;
    } else {
      return;
    }

    ;
    return node;
  },
  create_tips_ui: function create_tips_ui(parentNode, type, num) {
    var node = null;

    if (this.new_tips_ui_node_pool.size() > 0) {
      node = this.new_tips_ui_node_pool.get();
      node.parent = parentNode;
      node.getComponent("tips_ui").ini_node(type, num);
    } else {
      return;
    }

    ;
  },
  create_study_ui: function create_study_ui(parentNode) {
    var node = null;

    if (this.new_study_ui_pool.size() > 0) {
      node = this.new_study_ui_pool.get();
      node.parent = parentNode;
    } else {
      return;
    }

    ;
    return node;
  },
  create_staff_ui: function create_staff_ui(parentNode) {
    var node = null;

    if (this.new_staff_ui_pool.size() > 0) {
      node = this.new_staff_ui_pool.get();
      node.parent = parentNode;
    } else {
      return;
    }

    ;
    return node;
  },
  create_offline_profit_ui: function create_offline_profit_ui(parentNode) {
    var node = cc.instantiate(this.offline_profit_ui_prefab);
    node.parent = parentNode;
    node.getComponent("offline_profit").ini_node();
  },
  create_pet_ui: function create_pet_ui(parentNode) {
    var node = null;

    if (this.new_pet_ui_pool.size() > 0) {
      node = this.new_pet_ui_pool.get();
      node.parent = parentNode;
    } else {
      return;
    }

    ;
    return node;
  },
  create_ad_car: function create_ad_car(parentNode, price_difference) {
    var node = cc.instantiate(this.ad_car_prefab);
    node.parent = parentNode;
    node.getComponent("ad_car").ini_node(price_difference);
    return node;
  },
  //父节点，提示点类型，目标位置
  create_button_tips: function create_button_tips(parentNode, position_target) {
    var node = cc.instantiate(this.button_tips_prefab);
    node.parent = parentNode;
    node.x = position_target.x;
    node.active = false;
  },
  create_rest_ui: function create_rest_ui(parentNode, staff_index) {
    var node = cc.instantiate(this.rest_ui_prefab);
    node.parent = parentNode;
    node.getComponent("rest_ui").ini_node(staff_index);
  },
  create_gift_ui: function create_gift_ui(parentNode) {
    var node = cc.instantiate(this.gift_ui_prefab);
    node.parent = parentNode;
    node.getComponent("gift_ui").ini_node();
  },
  create_pet: function create_pet(parentNode, index) {
    var node = cc.instantiate(this.pet_prefab_arr[index]);
    node.parent = parentNode;
  },
  create_option_ui: function create_option_ui() {
    if (this.new_option_ui_pool.size() > 0) {
      var node = this.new_option_ui_pool.get();
      node.parent = this.node;
      node.getComponent("option_ui").ini_node();
    }

    ;
  },
  create_novice_ui: function create_novice_ui() {
    var node = cc.instantiate(this.novice_ui_prefab);
    node.parent = this.node;
    node.getComponent("novice_ui").ini_node();
  },
  create_hotel_ui: function create_hotel_ui() {
    if (this.new_hotel_ui_pool.size() > 0) {
      var node = this.new_hotel_ui_pool.get();
      node.parent = this.node;
      node.getComponent("hotel_ui").ini_node();
    }

    ;
  },
  create_shop_buy_ui: function create_shop_buy_ui(type, index, spriteFrame) {
    //物品类型，物品编号，物品的图片
    if (this.new_shop_buy_ui_pool.size() > 0) {
      var node = this.new_shop_buy_ui_pool.get();
      node.parent = this.node;
      node.getComponent("shop_buy_ui").ini_node(type, index, spriteFrame);
    }

    ;
  },
  create_shop_ui: function create_shop_ui() {
    if (this.new_shop_ui_pool.size() > 0) {
      var node = this.new_shop_ui_pool.get();
      node.parent = this.node;
      node.getComponent("shop_ui").ini_node();
    }

    ;
  },
  create_iap_ui: function create_iap_ui() {
    if (this.new_iap_ui_pool.size() > 0) {
      console.log("256 hello game_scene");
      var node = this.new_iap_ui_pool.get();
      node.parent = this.node;
      node.getComponent("iap_ui").ini_node();
    }

    ;
  },
  create_videotape_ui: function create_videotape_ui() {
    if (this.new_videotape_ui_pool.size() > 0) {
      var node = this.new_videotape_ui_pool.get();
      node.parent = this.node;
      node.getComponent("videotape_ui").ini_node();
    }

    ;
  },
  create_ex_effect: function create_ex_effect(create_node, index) {
    var _this = this;

    //在哪个节点进行创建，创建的第几个
    //create_node , index
    var level_icon = cc.find("UI_ROOT/top/level/level_icon"); //将创建的初始地址 转换为世界坐标

    var c_Wpos = create_node.parent.convertToWorldSpaceAR(create_node.position); //转换为需要的相对坐标

    var c_nPos = this.node.convertToNodeSpaceAR(c_Wpos); //将飞往的目标位置转为世界坐标

    var t_Wpos = level_icon.parent.convertToWorldSpaceAR(level_icon.position); //将目标位置转为相对位置

    var t_Npos = this.node.convertToNodeSpaceAR(t_Wpos);

    if (this.new_ex_effect_pool.size() > 0) {
      var node = this.new_ex_effect_pool.get();
      node.parent = this.node;
      node.position = c_nPos;
      cc.tween(node).to((index + 1) / 5, {
        position: t_Npos
      }, {
        easing: "sineIn"
      }).call(function () {
        _this.sound_control.play_sound_effect("add_ex");

        _this.game_rules_js.add_ex(1);

        _this.on_node_kill(node);
      }).start();
    }

    ;
  },
  //收割特效
  create_light_effect: function create_light_effect(create_node, index, plant_index) {
    var _this2 = this;

    //在哪个节点进行创建，创建的第几个 种子编号
    var sell = cc.find("UI_ROOT/center/build/sell"); //将创建的初始地址 转换为世界坐标

    var c_Wpos = create_node.parent.convertToWorldSpaceAR(create_node.position); //转换为需要的相对坐标

    var c_nPos = this.node.convertToNodeSpaceAR(c_Wpos); //将飞往的目标位置转为世界坐标

    var t_Wpos = sell.parent.convertToWorldSpaceAR(sell.position); //将目标位置转为相对位置

    var t_Npos = this.node.convertToNodeSpaceAR(t_Wpos);

    if (this.new_light_effect_pool.size() > 0) {
      var node = this.new_light_effect_pool.get();
      node.parent = this.node;
      node.position = c_nPos;
      cc.tween(node).delay(1).to((index + 1) / 5, {
        position: t_Npos
      }, {
        easing: "sineIn"
      }).call(function () {
        _this2.sound_control.play_sound_effect("add_ex");

        var all_capacity = user_data.user_data.wareHouse_level * _config["default"].wareHouse["all_capacity"];

        for (var i = 0; i < 15; i++) {
          if (user_data.user_data.wareHouse[i].have == 0) break; // nếu chưa mở ô thì dừng, k cộng thêm nữa, đã tràn kho
          else if (user_data.user_data.wareHouse[i].count == 0) {
              // nếu là ô trống thì thêm vào
              user_data.user_data.wareHouse[i].count = 1;
              user_data.user_data.wareHouse[i].id_product = plant_index; // gán id cây 

              break;
            } else if (user_data.user_data.wareHouse[i].count < 30 && user_data.user_data.wareHouse[i].id_product == plant_index) // kiểm tra kho cùng loại
              {
                user_data.user_data.wareHouse[i].count++;
                break;
              }
        } // user_data.user_data.wareHouse[plant_index].count++; // thêm vật phẩm vào kho
        // this.game_rules_js.jgg(1);


        _this2.on_node_kill(node);
      }).start();
    }

    ;
    return node;
  },
  create_gold_effect: function create_gold_effect(create_node, index, addGold) {
    var _this3 = this;

    //create node 在哪个节点飞， index 数量 ,num增加的金币数量
    var gold_icon = cc.find("UI_ROOT/top/gold/gold_icon"); //将创建的初始地址 转换为世界坐标

    var c_Wpos = create_node.parent.convertToWorldSpaceAR(create_node.position); //转换为需要的相对坐标

    var c_nPos = this.node.convertToNodeSpaceAR(c_Wpos); //将飞往的目标位置转为世界坐标

    var t_Wpos = gold_icon.parent.convertToWorldSpaceAR(gold_icon.position); //将目标位置转为相对位置

    var t_Npos = this.node.convertToNodeSpaceAR(t_Wpos);

    if (this.new_gold_effect_pool.size() > 0) {
      var node = this.new_gold_effect_pool.get();
      node.parent = this.node;
      node.position = c_nPos;
      node.y += 50;
      cc.tween(node).to((index + 1) / 5, {
        position: t_Npos
      }, {
        easing: "sineIn"
      }).call(function () {
        _this3.sound_control.play_sound_effect("add_gold");

        _this3.game_rules_js.add_gold(addGold);

        _this3.on_node_kill(node);
      }).start();
    }

    ;
  },
  //节点销毁
  on_node_kill: function on_node_kill(node) {
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

      case "iap_ui":
        this.new_iap_ui_pool.put(node);

      case "shop_ui":
        this.new_shop_ui_pool.put(node);
        break;

      case "videotape_ui":
        this.new_videotape_ui_pool.put(node);
        break;

      default:
        return;
    }

    ;
  },
  //初始化节点
  ini_node: function ini_node() {
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
    this.new_iap_ui_pool();
  },
  onLoad: function onLoad() {
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ini_node();
  },
  start: function start() {} // update (dt) {},

});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lX3NjZW5lLmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImJ1dHRvbl9ncm91cF9wcmVmYWIiLCJQcmVmYWIiLCJwbGFudF91aV9wcmVmYWIiLCJzZWxsX3VpX3ByZWZhYiIsInRpcHNfdWlfcHJlZmFiIiwibGlnaHRfZWZmZWN0X3ByZWZhYiIsInN0dWR5X3VpX3ByZWZhYiIsInN0YWZmX3VpX3ByZWZhYiIsIm9mZmxpbmVfcHJvZml0X3VpX3ByZWZhYiIsInBldF91aV9wcmVmYWIiLCJhZF9jYXJfcHJlZmFiIiwiYnV0dG9uX3RpcHNfcHJlZmFiIiwicmVzdF91aV9wcmVmYWIiLCJwZXRfcHJlZmFiX2FyciIsImV4X2VmZmVjdF9wcmVmYWIiLCJnaWZ0X3VpX3ByZWZhYiIsIm9wdGlvbl91aV9wcmVmYWIiLCJnb2xkX2VmZmVjdF9wcmVmYWIiLCJub3ZpY2VfdWlfcHJlZmFiIiwiaG90ZWxfdWlfcHJlZmFiIiwic2hvcF91aV9wcmVmYWIiLCJzaG9wX2J1eV91aV9wcmVmYWIiLCJ2aWRlb3RhcGVfdWlfcHJlZmFiIiwiaWFwX3VpX3ByZWZhYiIsIm5ld19idXR0b25fZ3JvdXBfbm9kZV9wb29sIiwiYnV0dG9uX21vcmVfbm9kZV9wb29sIiwiTm9kZVBvb2wiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwdXQiLCJuZXdfcGxhbnRfdWlfbm9kZV9wb29sIiwibmV3X3ZpZGVvdGFwZV91aV9wb29sIiwibmV3X3NlbGxfdWlfbm9kZV9wb29sIiwibmV3X3RpcHNfdWlfbm9kZV9wb29sIiwiY291bnQiLCJpIiwibmV3X2xpZ2h0X2VmZmVjdF9wb29sIiwibmV3X3N0dWR5X3VpX3Bvb2wiLCJuZXdfc3RhZmZfdWlfcG9vbCIsIm5ld19wZXRfdWlfcG9vbCIsIm5ld19leF9lZmZlY3RfcG9vbCIsIm5ld19nb2xkX2VmZmVjdF9wb29sIiwibmV3X29wdGlvbl91aV9wb29sIiwibmV3X2hvdGVsX3VpX3Bvb2wiLCJuZXdfc2hvcF91aV9wb29sIiwibmV3X2lhcF91aV9wb29sIiwibmV3X3Nob3BfYnV5X3VpX3Bvb2wiLCJjcmVhdGVfYnV0dG9uX2dyb3VwIiwicGFyZW50Tm9kZSIsInNpemUiLCJnZXQiLCJwYXJlbnQiLCJjcmVhdGVfcGxhbnRfdWkiLCJjcmVhdGVfc2VsbF91aSIsImNyZWF0ZV90aXBzX3VpIiwidHlwZSIsIm51bSIsImdldENvbXBvbmVudCIsImluaV9ub2RlIiwiY3JlYXRlX3N0dWR5X3VpIiwiY3JlYXRlX3N0YWZmX3VpIiwiY3JlYXRlX29mZmxpbmVfcHJvZml0X3VpIiwiY3JlYXRlX3BldF91aSIsImNyZWF0ZV9hZF9jYXIiLCJwcmljZV9kaWZmZXJlbmNlIiwiY3JlYXRlX2J1dHRvbl90aXBzIiwicG9zaXRpb25fdGFyZ2V0IiwieCIsImFjdGl2ZSIsImNyZWF0ZV9yZXN0X3VpIiwic3RhZmZfaW5kZXgiLCJjcmVhdGVfZ2lmdF91aSIsImNyZWF0ZV9wZXQiLCJpbmRleCIsImNyZWF0ZV9vcHRpb25fdWkiLCJjcmVhdGVfbm92aWNlX3VpIiwiY3JlYXRlX2hvdGVsX3VpIiwiY3JlYXRlX3Nob3BfYnV5X3VpIiwic3ByaXRlRnJhbWUiLCJjcmVhdGVfc2hvcF91aSIsImNyZWF0ZV9pYXBfdWkiLCJjb25zb2xlIiwibG9nIiwiY3JlYXRlX3ZpZGVvdGFwZV91aSIsImNyZWF0ZV9leF9lZmZlY3QiLCJjcmVhdGVfbm9kZSIsImxldmVsX2ljb24iLCJmaW5kIiwiY19XcG9zIiwiY29udmVydFRvV29ybGRTcGFjZUFSIiwicG9zaXRpb24iLCJjX25Qb3MiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsInRfV3BvcyIsInRfTnBvcyIsInR3ZWVuIiwidG8iLCJlYXNpbmciLCJjYWxsIiwic291bmRfY29udHJvbCIsInBsYXlfc291bmRfZWZmZWN0IiwiZ2FtZV9ydWxlc19qcyIsImFkZF9leCIsIm9uX25vZGVfa2lsbCIsInN0YXJ0IiwiY3JlYXRlX2xpZ2h0X2VmZmVjdCIsInBsYW50X2luZGV4Iiwic2VsbCIsImRlbGF5IiwiYWxsX2NhcGFjaXR5Iiwid2FyZUhvdXNlX2xldmVsIiwiY29uZmlnIiwid2FyZUhvdXNlIiwiaGF2ZSIsImlkX3Byb2R1Y3QiLCJjcmVhdGVfZ29sZF9lZmZlY3QiLCJhZGRHb2xkIiwiZ29sZF9pY29uIiwieSIsImFkZF9nb2xkIiwibmFtZSIsIm9uTG9hZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7OztBQURBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBRUFDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxtQkFBbUIsRUFBRUosRUFBRSxDQUFDSyxNQURoQjtBQUVSQyxJQUFBQSxlQUFlLEVBQUVOLEVBQUUsQ0FBQ0ssTUFGWjtBQUdSRSxJQUFBQSxjQUFjLEVBQUVQLEVBQUUsQ0FBQ0ssTUFIWDtBQUlSRyxJQUFBQSxjQUFjLEVBQUVSLEVBQUUsQ0FBQ0ssTUFKWDtBQUtSSSxJQUFBQSxtQkFBbUIsRUFBRVQsRUFBRSxDQUFDSyxNQUxoQjtBQU1SSyxJQUFBQSxlQUFlLEVBQUVWLEVBQUUsQ0FBQ0ssTUFOWjtBQU9STSxJQUFBQSxlQUFlLEVBQUVYLEVBQUUsQ0FBQ0ssTUFQWjtBQVFSTyxJQUFBQSx3QkFBd0IsRUFBRVosRUFBRSxDQUFDSyxNQVJyQjtBQVNSUSxJQUFBQSxhQUFhLEVBQUViLEVBQUUsQ0FBQ0ssTUFUVjtBQVVSUyxJQUFBQSxhQUFhLEVBQUVkLEVBQUUsQ0FBQ0ssTUFWVjtBQVdSVSxJQUFBQSxrQkFBa0IsRUFBRWYsRUFBRSxDQUFDSyxNQVhmO0FBWVJXLElBQUFBLGNBQWMsRUFBRWhCLEVBQUUsQ0FBQ0ssTUFaWDtBQWFSWSxJQUFBQSxjQUFjLEVBQUUsQ0FBQ2pCLEVBQUUsQ0FBQ0ssTUFBSixDQWJSO0FBY1JhLElBQUFB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ZXJfZGF0YVwiKTtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiY29uZmlnXCI7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYnV0dG9uX2dyb3VwX3ByZWZhYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIHBsYW50X3VpX3ByZWZhYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIHNlbGxfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgdGlwc191aV9wcmVmYWI6IGNjLlByZWZhYixcclxuICAgICAgICBsaWdodF9lZmZlY3RfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgc3R1ZHlfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgc3RhZmZfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgb2ZmbGluZV9wcm9maXRfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgcGV0X3VpX3ByZWZhYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIGFkX2Nhcl9wcmVmYWI6IGNjLlByZWZhYixcclxuICAgICAgICBidXR0b25fdGlwc19wcmVmYWI6IGNjLlByZWZhYixcclxuICAgICAgICByZXN0X3VpX3ByZWZhYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIHBldF9wcmVmYWJfYXJyOiBbY2MuUHJlZmFiXSxcclxuICAgICAgICBleF9lZmZlY3RfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgZ2lmdF91aV9wcmVmYWI6IGNjLlByZWZhYixcclxuICAgICAgICBvcHRpb25fdWlfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgZ29sZF9lZmZlY3RfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgbm92aWNlX3VpX3ByZWZhYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIGhvdGVsX3VpX3ByZWZhYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIHNob3BfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgc2hvcF9idXlfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgdmlkZW90YXBlX3VpX3ByZWZhYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIGlhcF91aV9wcmVmYWI6IGNjLlByZWZhYixcclxuICAgIH0sXHJcblxyXG4gICAgLy/liJvlu7rmjInpkq7nu4TnmoToioLngrnmsaBcclxuICAgIG5ld19idXR0b25fZ3JvdXBfbm9kZV9wb29sOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5idXR0b25fbW9yZV9ub2RlX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYnV0dG9uX2dyb3VwX3ByZWZhYik7XHJcbiAgICAgICAgdGhpcy5idXR0b25fbW9yZV9ub2RlX3Bvb2wucHV0KG5vZGUpO1xyXG4gICAgfSxcclxuICAgIC8vXHJcbiAgICBuZXdfcGxhbnRfdWlfbm9kZV9wb29sOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5uZXdfcGxhbnRfdWlfbm9kZV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYW50X3VpX3ByZWZhYik7XHJcbiAgICAgICAgdGhpcy5uZXdfcGxhbnRfdWlfbm9kZV9wb29sLnB1dChub2RlKTtcclxuICAgIH0sXHJcbiAgICBuZXdfdmlkZW90YXBlX3VpX3Bvb2w6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm5ld192aWRlb3RhcGVfdWlfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy52aWRlb3RhcGVfdWlfcHJlZmFiKTtcclxuICAgICAgICB0aGlzLm5ld192aWRlb3RhcGVfdWlfcG9vbC5wdXQobm9kZSk7XHJcbiAgICB9LFxyXG4gICAgbmV3X3NlbGxfdWlfbm9kZV9wb29sOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5uZXdfc2VsbF91aV9ub2RlX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc2VsbF91aV9wcmVmYWIpO1xyXG4gICAgICAgIHRoaXMubmV3X3NlbGxfdWlfbm9kZV9wb29sLnB1dChub2RlKTtcclxuICAgIH0sXHJcbiAgICBuZXdfdGlwc191aV9ub2RlX3Bvb2w6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY291bnQgPSA1O1xyXG4gICAgICAgIHRoaXMubmV3X3RpcHNfdWlfbm9kZV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy50aXBzX3VpX3ByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMubmV3X3RpcHNfdWlfbm9kZV9wb29sLnB1dChub2RlKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIG5ld19saWdodF9lZmZlY3RfcG9vbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjb3VudCA9IDg7XHJcbiAgICAgICAgdGhpcy5uZXdfbGlnaHRfZWZmZWN0X3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmxpZ2h0X2VmZmVjdF9wcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLm5ld19saWdodF9lZmZlY3RfcG9vbC5wdXQobm9kZSk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBuZXdfc3R1ZHlfdWlfcG9vbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubmV3X3N0dWR5X3VpX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3R1ZHlfdWlfcHJlZmFiKTtcclxuICAgICAgICB0aGlzLm5ld19zdHVkeV91aV9wb29sLnB1dChub2RlKTtcclxuICAgIH0sXHJcbiAgICBuZXdfc3RhZmZfdWlfcG9vbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubmV3X3N0YWZmX3VpX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3RhZmZfdWlfcHJlZmFiKTtcclxuICAgICAgICB0aGlzLm5ld19zdGFmZl91aV9wb29sLnB1dChub2RlKTtcclxuICAgIH0sXHJcbiAgICBuZXdfcGV0X3VpX3Bvb2w6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm5ld19wZXRfdWlfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wZXRfdWlfcHJlZmFiKTtcclxuICAgICAgICB0aGlzLm5ld19wZXRfdWlfcG9vbC5wdXQobm9kZSk7XHJcbiAgICB9LFxyXG4gICAgbmV3X2V4X2VmZmVjdF9wb29sKCkge1xyXG4gICAgICAgIHRoaXMubmV3X2V4X2VmZmVjdF9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5leF9lZmZlY3RfcHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5uZXdfZXhfZWZmZWN0X3Bvb2wucHV0KG5vZGUpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgbmV3X2dvbGRfZWZmZWN0X3Bvb2woKSB7XHJcbiAgICAgICAgdGhpcy5uZXdfZ29sZF9lZmZlY3RfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZ29sZF9lZmZlY3RfcHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5uZXdfZ29sZF9lZmZlY3RfcG9vbC5wdXQobm9kZSk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBuZXdfb3B0aW9uX3VpX3Bvb2woKSB7XHJcbiAgICAgICAgdGhpcy5uZXdfb3B0aW9uX3VpX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMub3B0aW9uX3VpX3ByZWZhYik7XHJcbiAgICAgICAgdGhpcy5uZXdfb3B0aW9uX3VpX3Bvb2wucHV0KG5vZGUpO1xyXG4gICAgfSxcclxuICAgIG5ld19ob3RlbF91aV9wb29sKCkge1xyXG4gICAgICAgIHRoaXMubmV3X2hvdGVsX3VpX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaG90ZWxfdWlfcHJlZmFiKTtcclxuICAgICAgICB0aGlzLm5ld19ob3RlbF91aV9wb29sLnB1dChub2RlKTtcclxuICAgIH0sXHJcbiAgICBuZXdfc2hvcF91aV9wb29sKCkge1xyXG4gICAgICAgIHRoaXMubmV3X3Nob3BfdWlfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zaG9wX3VpX3ByZWZhYik7XHJcbiAgICAgICAgdGhpcy5uZXdfc2hvcF91aV9wb29sLnB1dChub2RlKTtcclxuICAgIH0sXHJcbiAgICBuZXdfaWFwX3VpX3Bvb2woKSB7ICAgICAvLyBkb25lXHJcbiAgICAgICAgdGhpcy5uZXdfaWFwX3VpX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaWFwX3VpX3ByZWZhYik7XHJcbiAgICAgICAgdGhpcy5uZXdfaWFwX3VpX3Bvb2wucHV0KG5vZGUpO1xyXG4gICAgfSxcclxuICAgIG5ld19zaG9wX2J1eV91aV9wb29sKCkge1xyXG4gICAgICAgIHRoaXMubmV3X3Nob3BfYnV5X3VpX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc2hvcF9idXlfdWlfcHJlZmFiKTtcclxuICAgICAgICB0aGlzLm5ld19zaG9wX2J1eV91aV9wb29sLnB1dChub2RlKTtcclxuICAgIH0sXHJcbiAgICAvL1xyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8v5Yib5bu65oyJ6ZKu57uEXHJcbiAgICBjcmVhdGVfYnV0dG9uX2dyb3VwOiBmdW5jdGlvbiAocGFyZW50Tm9kZSkge1xyXG4gICAgICAgIHZhciBub2RlID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5idXR0b25fbW9yZV9ub2RlX3Bvb2wuc2l6ZSgpID4gMCkge1xyXG4gICAgICAgICAgICBub2RlID0gdGhpcy5idXR0b25fbW9yZV9ub2RlX3Bvb2wuZ2V0KCk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVfcGxhbnRfdWk6IGZ1bmN0aW9uIChwYXJlbnROb2RlKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLm5ld19wbGFudF91aV9ub2RlX3Bvb2wuc2l6ZSgpID4gMCkge1xyXG4gICAgICAgICAgICBub2RlID0gdGhpcy5uZXdfcGxhbnRfdWlfbm9kZV9wb29sLmdldCgpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlX3NlbGxfdWk6IGZ1bmN0aW9uIChwYXJlbnROb2RlKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLm5ld19zZWxsX3VpX25vZGVfcG9vbC5zaXplKCkgPiAwKSB7XHJcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLm5ld19zZWxsX3VpX25vZGVfcG9vbC5nZXQoKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfSxcclxuICAgIGNyZWF0ZV90aXBzX3VpOiBmdW5jdGlvbiAocGFyZW50Tm9kZSwgdHlwZSwgbnVtKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLm5ld190aXBzX3VpX25vZGVfcG9vbC5zaXplKCkgPiAwKSB7XHJcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLm5ld190aXBzX3VpX25vZGVfcG9vbC5nZXQoKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInRpcHNfdWlcIikuaW5pX25vZGUodHlwZSwgbnVtKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVfc3R1ZHlfdWk6IGZ1bmN0aW9uIChwYXJlbnROb2RlKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLm5ld19zdHVkeV91aV9wb29sLnNpemUoKSA+IDApIHtcclxuICAgICAgICAgICAgbm9kZSA9IHRoaXMubmV3X3N0dWR5X3VpX3Bvb2wuZ2V0KCk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVfc3RhZmZfdWk6IGZ1bmN0aW9uIChwYXJlbnROb2RlKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLm5ld19zdGFmZl91aV9wb29sLnNpemUoKSA+IDApIHtcclxuICAgICAgICAgICAgbm9kZSA9IHRoaXMubmV3X3N0YWZmX3VpX3Bvb2wuZ2V0KCk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVfb2ZmbGluZV9wcm9maXRfdWk6IGZ1bmN0aW9uIChwYXJlbnROb2RlKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm9mZmxpbmVfcHJvZml0X3VpX3ByZWZhYik7XHJcbiAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwib2ZmbGluZV9wcm9maXRcIikuaW5pX25vZGUoKTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVfcGV0X3VpOiBmdW5jdGlvbiAocGFyZW50Tm9kZSkge1xyXG4gICAgICAgIHZhciBub2RlID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5uZXdfcGV0X3VpX3Bvb2wuc2l6ZSgpID4gMCkge1xyXG4gICAgICAgICAgICBub2RlID0gdGhpcy5uZXdfcGV0X3VpX3Bvb2wuZ2V0KCk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVfYWRfY2FyKHBhcmVudE5vZGUsIHByaWNlX2RpZmZlcmVuY2UpIHtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYWRfY2FyX3ByZWZhYilcclxuICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJhZF9jYXJcIikuaW5pX25vZGUocHJpY2VfZGlmZmVyZW5jZSk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9LFxyXG4gICAgLy/niLboioLngrnvvIzmj5DnpLrngrnnsbvlnovvvIznm67moIfkvY3nva5cclxuICAgIGNyZWF0ZV9idXR0b25fdGlwcyhwYXJlbnROb2RlLCBwb3NpdGlvbl90YXJnZXQpIHtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYnV0dG9uX3RpcHNfcHJlZmFiKTtcclxuICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XHJcbiAgICAgICAgbm9kZS54ID0gcG9zaXRpb25fdGFyZ2V0Lng7XHJcbiAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVfcmVzdF91aShwYXJlbnROb2RlLCBzdGFmZl9pbmRleCkge1xyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5yZXN0X3VpX3ByZWZhYik7XHJcbiAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwicmVzdF91aVwiKS5pbmlfbm9kZShzdGFmZl9pbmRleCk7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlX2dpZnRfdWkocGFyZW50Tm9kZSkge1xyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5naWZ0X3VpX3ByZWZhYik7XHJcbiAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiZ2lmdF91aVwiKS5pbmlfbm9kZSgpO1xyXG4gICAgfSxcclxuICAgIGNyZWF0ZV9wZXQocGFyZW50Tm9kZSwgaW5kZXgpIHtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGV0X3ByZWZhYl9hcnJbaW5kZXhdKTtcclxuICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlX29wdGlvbl91aSgpIHtcclxuICAgICAgICBpZiAodGhpcy5uZXdfb3B0aW9uX3VpX3Bvb2wuc2l6ZSgpID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubmV3X29wdGlvbl91aV9wb29sLmdldCgpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJvcHRpb25fdWlcIikuaW5pX25vZGUoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGNyZWF0ZV9ub3ZpY2VfdWkoKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm5vdmljZV91aV9wcmVmYWIpO1xyXG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwibm92aWNlX3VpXCIpLmluaV9ub2RlKCk7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlX2hvdGVsX3VpKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm5ld19ob3RlbF91aV9wb29sLnNpemUoKSA+IDApIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5ld19ob3RlbF91aV9wb29sLmdldCgpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJob3RlbF91aVwiKS5pbmlfbm9kZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlX3Nob3BfYnV5X3VpKHR5cGUsIGluZGV4LCBzcHJpdGVGcmFtZSkge1xyXG4gICAgICAgIC8v54mp5ZOB57G75Z6L77yM54mp5ZOB57yW5Y+377yM54mp5ZOB55qE5Zu+54mHXHJcbiAgICAgICAgaWYgKHRoaXMubmV3X3Nob3BfYnV5X3VpX3Bvb2wuc2l6ZSgpID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubmV3X3Nob3BfYnV5X3VpX3Bvb2wuZ2V0KCk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInNob3BfYnV5X3VpXCIpLmluaV9ub2RlKHR5cGUsIGluZGV4LCBzcHJpdGVGcmFtZSk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVfc2hvcF91aSgpIHtcclxuICAgICAgICBpZiAodGhpcy5uZXdfc2hvcF91aV9wb29sLnNpemUoKSA+IDApIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5ld19zaG9wX3VpX3Bvb2wuZ2V0KCk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInNob3BfdWlcIikuaW5pX25vZGUoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGNyZWF0ZV9pYXBfdWkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubmV3X2lhcF91aV9wb29sLnNpemUoKSA+IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIyNTYgaGVsbG8gZ2FtZV9zY2VuZVwiKVxyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubmV3X2lhcF91aV9wb29sLmdldCgpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJpYXBfdWlcIikuaW5pX25vZGUoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGNyZWF0ZV92aWRlb3RhcGVfdWkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubmV3X3ZpZGVvdGFwZV91aV9wb29sLnNpemUoKSA+IDApIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5ld192aWRlb3RhcGVfdWlfcG9vbC5nZXQoKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwidmlkZW90YXBlX3VpXCIpLmluaV9ub2RlKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVfZXhfZWZmZWN0KGNyZWF0ZV9ub2RlLCBpbmRleCkge1xyXG5cclxuICAgICAgICAvL+WcqOWTquS4quiKgueCuei/m+ihjOWIm+W7uu+8jOWIm+W7uueahOesrOWHoOS4qlxyXG4gICAgICAgIC8vY3JlYXRlX25vZGUgLCBpbmRleFxyXG4gICAgICAgIHZhciBsZXZlbF9pY29uID0gY2MuZmluZChcIlVJX1JPT1QvdG9wL2xldmVsL2xldmVsX2ljb25cIik7XHJcbiAgICAgICAgLy/lsIbliJvlu7rnmoTliJ3lp4vlnLDlnYAg6L2s5o2i5Li65LiW55WM5Z2Q5qCHXHJcbiAgICAgICAgdmFyIGNfV3BvcyA9IGNyZWF0ZV9ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY3JlYXRlX25vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIC8v6L2s5o2i5Li66ZyA6KaB55qE55u45a+55Z2Q5qCHXHJcbiAgICAgICAgdmFyIGNfblBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihjX1dwb3MpO1xyXG5cclxuICAgICAgICAvL+WwhumjnuW+gOeahOebruagh+S9jee9rui9rOS4uuS4lueVjOWdkOagh1xyXG4gICAgICAgIHZhciB0X1dwb3MgPSBsZXZlbF9pY29uLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIobGV2ZWxfaWNvbi5wb3NpdGlvbik7XHJcbiAgICAgICAgLy/lsIbnm67moIfkvY3nva7ovazkuLrnm7jlr7nkvY3nva5cclxuICAgICAgICB2YXIgdF9OcG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRfV3BvcylcclxuXHJcblxyXG4gICAgICAgIGlmICh0aGlzLm5ld19leF9lZmZlY3RfcG9vbC5zaXplKCkgPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5uZXdfZXhfZWZmZWN0X3Bvb2wuZ2V0KCk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gY19uUG9zO1xyXG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKVxyXG4gICAgICAgICAgICAgICAgLnRvKChpbmRleCArIDEpIC8gNSwgeyBwb3NpdGlvbjogdF9OcG9zIH0sIHsgZWFzaW5nOiBcInNpbmVJblwiIH0pXHJcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYWRkX2V4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZXgoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbl9ub2RlX2tpbGwobm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+aUtuWJsueJueaViFxyXG4gICAgY3JlYXRlX2xpZ2h0X2VmZmVjdChjcmVhdGVfbm9kZSwgaW5kZXgsIHBsYW50X2luZGV4KSB7XHJcbiAgICAgICAgLy/lnKjlk6rkuKroioLngrnov5vooYzliJvlu7rvvIzliJvlu7rnmoTnrKzlh6DkuKog56eN5a2Q57yW5Y+3XHJcbiAgICAgICAgdmFyIHNlbGwgPSBjYy5maW5kKFwiVUlfUk9PVC9jZW50ZXIvYnVpbGQvc2VsbFwiKTtcclxuICAgICAgICAvL+WwhuWIm+W7uueahOWIneWni+WcsOWdgCDovazmjaLkuLrkuJbnlYzlnZDmoIdcclxuICAgICAgICB2YXIgY19XcG9zID0gY3JlYXRlX25vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjcmVhdGVfbm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgLy/ovazmjaLkuLrpnIDopoHnmoTnm7jlr7nlnZDmoIdcclxuICAgICAgICB2YXIgY19uUG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGNfV3Bvcyk7XHJcblxyXG4gICAgICAgIC8v5bCG6aOe5b6A55qE55uu5qCH5L2N572u6L2s5Li65LiW55WM5Z2Q5qCHXHJcbiAgICAgICAgdmFyIHRfV3BvcyA9IHNlbGwucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihzZWxsLnBvc2l0aW9uKTtcclxuICAgICAgICAvL+Wwhuebruagh+S9jee9rui9rOS4uuebuOWvueS9jee9rlxyXG4gICAgICAgIHZhciB0X05wb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIodF9XcG9zKVxyXG5cclxuICAgICAgICBpZiAodGhpcy5uZXdfbGlnaHRfZWZmZWN0X3Bvb2wuc2l6ZSgpID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubmV3X2xpZ2h0X2VmZmVjdF9wb29sLmdldCgpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IGNfblBvcztcclxuICAgICAgICAgICAgY2MudHdlZW4obm9kZSlcclxuICAgICAgICAgICAgICAgIC5kZWxheSgxKVxyXG4gICAgICAgICAgICAgICAgLnRvKChpbmRleCArIDEpIC8gNSwgeyBwb3NpdGlvbjogdF9OcG9zIH0sIHsgZWFzaW5nOiBcInNpbmVJblwiIH0pXHJcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYWRkX2V4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhbGxfY2FwYWNpdHkgPSB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZV9sZXZlbCAqIGNvbmZpZy53YXJlSG91c2VbXCJhbGxfY2FwYWNpdHlcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5oYXZlID09IDApIGJyZWFrOyAgICAgIC8vIG7hur91IGNoxrBhIG3hu58gw7QgdGjDrCBk4burbmcsIGsgY+G7mW5nIHRow6ptIG7hu69hLCDEkcOjIHRyw6BuIGtob1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3VudCA9PSAwKSB7ICAgICAgICAgIC8vIG7hur91IGzDoCDDtCB0cuG7kW5nIHRow6wgdGjDqm0gdsOgb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uY291bnQgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uaWRfcHJvZHVjdCA9IHBsYW50X2luZGV4OyAgLy8gZ8OhbiBpZCBjw6J5IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uY291bnQgPCAzMCAmJiB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5pZF9wcm9kdWN0ID09IHBsYW50X2luZGV4KSAvLyBraeG7g20gdHJhIGtobyBjw7luZyBsb+G6oWlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uY291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtwbGFudF9pbmRleF0uY291bnQrKzsgLy8gdGjDqm0gduG6rXQgcGjhuqltIHbDoG8ga2hvXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmdhbWVfcnVsZXNfanMuamdnKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25fbm9kZV9raWxsKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9LFxyXG5cclxuICAgIGNyZWF0ZV9nb2xkX2VmZmVjdChjcmVhdGVfbm9kZSwgaW5kZXgsIGFkZEdvbGQpIHtcclxuICAgICAgICAvL2NyZWF0ZSBub2RlIOWcqOWTquS4quiKgueCuemjnu+8jCBpbmRleCDmlbDph48gLG51beWinuWKoOeahOmHkeW4geaVsOmHj1xyXG4gICAgICAgIHZhciBnb2xkX2ljb24gPSBjYy5maW5kKFwiVUlfUk9PVC90b3AvZ29sZC9nb2xkX2ljb25cIik7XHJcbiAgICAgICAgLy/lsIbliJvlu7rnmoTliJ3lp4vlnLDlnYAg6L2s5o2i5Li65LiW55WM5Z2Q5qCHXHJcbiAgICAgICAgdmFyIGNfV3BvcyA9IGNyZWF0ZV9ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY3JlYXRlX25vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIC8v6L2s5o2i5Li66ZyA6KaB55qE55u45a+55Z2Q5qCHXHJcbiAgICAgICAgdmFyIGNfblBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihjX1dwb3MpO1xyXG5cclxuICAgICAgICAvL+WwhumjnuW+gOeahOebruagh+S9jee9rui9rOS4uuS4lueVjOWdkOagh1xyXG4gICAgICAgIHZhciB0X1dwb3MgPSBnb2xkX2ljb24ucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihnb2xkX2ljb24ucG9zaXRpb24pO1xyXG4gICAgICAgIC8v5bCG55uu5qCH5L2N572u6L2s5Li655u45a+55L2N572uXHJcbiAgICAgICAgdmFyIHRfTnBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0X1dwb3MpXHJcblxyXG4gICAgICAgIGlmICh0aGlzLm5ld19nb2xkX2VmZmVjdF9wb29sLnNpemUoKSA+IDApIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5ld19nb2xkX2VmZmVjdF9wb29sLmdldCgpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IGNfblBvcztcclxuICAgICAgICAgICAgbm9kZS55ICs9IDUwO1xyXG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKVxyXG4gICAgICAgICAgICAgICAgLnRvKChpbmRleCArIDEpIC8gNSwgeyBwb3NpdGlvbjogdF9OcG9zIH0sIHsgZWFzaW5nOiBcInNpbmVJblwiIH0pXHJcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYWRkX2dvbGRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKGFkZEdvbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25fbm9kZV9raWxsKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSxcclxuICAgIC8v6IqC54K56ZSA5q+BXHJcbiAgICBvbl9ub2RlX2tpbGw6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgc3dpdGNoIChub2RlLm5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImJ1dHRvbl9tb3JlXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl9tb3JlX25vZGVfcG9vbC5wdXQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInBsYW50X3VpXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19wbGFudF91aV9ub2RlX3Bvb2wucHV0KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzZWxsX3VpXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19zZWxsX3VpX25vZGVfcG9vbC5wdXQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInRpcHNfdWlcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubmV3X3RpcHNfdWlfbm9kZV9wb29sLnB1dChub2RlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibGlnaHRcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubmV3X2xpZ2h0X2VmZmVjdF9wb29sLnB1dChub2RlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwic3R1ZHlfdWlcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubmV3X3N0dWR5X3VpX3Bvb2wucHV0KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzdGFmZl91aVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfc3RhZmZfdWlfcG9vbC5wdXQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInBldF91aVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfcGV0X3VpX3Bvb2wucHV0KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJleF9lZmZlY3RcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubmV3X2V4X2VmZmVjdF9wb29sLnB1dChub2RlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZ29sZF9lZmZlY3RcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubmV3X2dvbGRfZWZmZWN0X3Bvb2wucHV0KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJvcHRpb25fdWlcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubmV3X29wdGlvbl91aV9wb29sLnB1dChub2RlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiaG90ZWxfdWlcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubmV3X2hvdGVsX3VpX3Bvb2wucHV0KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzaG9wX2J1eV91aVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfc2hvcF9idXlfdWlfcG9vbC5wdXQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImlhcF91aVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfaWFwX3VpX3Bvb2wucHV0KG5vZGUpO1xyXG4gICAgICAgICAgICBjYXNlIFwic2hvcF91aVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfc2hvcF91aV9wb29sLnB1dChub2RlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidmlkZW90YXBlX3VpXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld192aWRlb3RhcGVfdWlfcG9vbC5wdXQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+WIneWni+WMluiKgueCuVxyXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm5ld19idXR0b25fZ3JvdXBfbm9kZV9wb29sKCk7XHJcbiAgICAgICAgdGhpcy5uZXdfcGxhbnRfdWlfbm9kZV9wb29sKCk7XHJcbiAgICAgICAgdGhpcy5uZXdfc2VsbF91aV9ub2RlX3Bvb2woKTtcclxuICAgICAgICB0aGlzLm5ld190aXBzX3VpX25vZGVfcG9vbCgpO1xyXG4gICAgICAgIHRoaXMubmV3X2xpZ2h0X2VmZmVjdF9wb29sKCk7XHJcbiAgICAgICAgdGhpcy5uZXdfc3R1ZHlfdWlfcG9vbCgpO1xyXG4gICAgICAgIHRoaXMubmV3X3N0YWZmX3VpX3Bvb2woKTtcclxuICAgICAgICB0aGlzLm5ld19wZXRfdWlfcG9vbCgpO1xyXG4gICAgICAgIHRoaXMubmV3X2V4X2VmZmVjdF9wb29sKCk7XHJcbiAgICAgICAgdGhpcy5uZXdfb3B0aW9uX3VpX3Bvb2woKTtcclxuICAgICAgICB0aGlzLm5ld19nb2xkX2VmZmVjdF9wb29sKCk7XHJcbiAgICAgICAgdGhpcy5uZXdfaG90ZWxfdWlfcG9vbCgpO1xyXG4gICAgICAgIHRoaXMubmV3X3Nob3BfYnV5X3VpX3Bvb2woKTtcclxuICAgICAgICB0aGlzLm5ld19zaG9wX3VpX3Bvb2woKTtcclxuICAgICAgICB0aGlzLm5ld192aWRlb3RhcGVfdWlfcG9vbCgpO1xyXG4gICAgICAgIHRoaXMubmV3X2lhcF91aV9wb29sKCk7XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLmluaV9ub2RlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=