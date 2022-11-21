
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
    iap_ui_prefab: cc.Prefab,
    shop_buy_ui_prefab: cc.Prefab,
    videotape_ui_prefab: cc.Prefab
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
        break;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lX3NjZW5lLmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImJ1dHRvbl9ncm91cF9wcmVmYWIiLCJQcmVmYWIiLCJwbGFudF91aV9wcmVmYWIiLCJzZWxsX3VpX3ByZWZhYiIsInRpcHNfdWlfcHJlZmFiIiwibGlnaHRfZWZmZWN0X3ByZWZhYiIsInN0dWR5X3VpX3ByZWZhYiIsInN0YWZmX3VpX3ByZWZhYiIsIm9mZmxpbmVfcHJvZml0X3VpX3ByZWZhYiIsInBldF91aV9wcmVmYWIiLCJhZF9jYXJfcHJlZmFiIiwiYnV0dG9uX3RpcHNfcHJlZmFiIiwicmVzdF91aV9wcmVmYWIiLCJwZXRfcHJlZmFiX2FyciIsImV4X2VmZmVjdF9wcmVmYWIiLCJnaWZ0X3VpX3ByZWZhYiIsIm9wdGlvbl91aV9wcmVmYWIiLCJnb2xkX2VmZmVjdF9wcmVmYWIiLCJub3ZpY2VfdWlfcHJlZmFiIiwiaG90ZWxfdWlfcHJlZmFiIiwic2hvcF91aV9wcmVmYWIiLCJpYXBfdWlfcHJlZmFiIiwic2hvcF9idXlfdWlfcHJlZmFiIiwidmlkZW90YXBlX3VpX3ByZWZhYiIsIm5ld19idXR0b25fZ3JvdXBfbm9kZV9wb29sIiwiYnV0dG9uX21vcmVfbm9kZV9wb29sIiwiTm9kZVBvb2wiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwdXQiLCJuZXdfcGxhbnRfdWlfbm9kZV9wb29sIiwibmV3X3ZpZGVvdGFwZV91aV9wb29sIiwibmV3X3NlbGxfdWlfbm9kZV9wb29sIiwibmV3X3RpcHNfdWlfbm9kZV9wb29sIiwiY291bnQiLCJpIiwibmV3X2xpZ2h0X2VmZmVjdF9wb29sIiwibmV3X3N0dWR5X3VpX3Bvb2wiLCJuZXdfc3RhZmZfdWlfcG9vbCIsIm5ld19wZXRfdWlfcG9vbCIsIm5ld19leF9lZmZlY3RfcG9vbCIsIm5ld19nb2xkX2VmZmVjdF9wb29sIiwibmV3X29wdGlvbl91aV9wb29sIiwibmV3X2hvdGVsX3VpX3Bvb2wiLCJuZXdfc2hvcF91aV9wb29sIiwibmV3X2lhcF91aV9wb29sIiwibmV3X3Nob3BfYnV5X3VpX3Bvb2wiLCJjcmVhdGVfYnV0dG9uX2dyb3VwIiwicGFyZW50Tm9kZSIsInNpemUiLCJnZXQiLCJwYXJlbnQiLCJjcmVhdGVfcGxhbnRfdWkiLCJjcmVhdGVfc2VsbF91aSIsImNyZWF0ZV90aXBzX3VpIiwidHlwZSIsIm51bSIsImdldENvbXBvbmVudCIsImluaV9ub2RlIiwiY3JlYXRlX3N0dWR5X3VpIiwiY3JlYXRlX3N0YWZmX3VpIiwiY3JlYXRlX29mZmxpbmVfcHJvZml0X3VpIiwiY3JlYXRlX3BldF91aSIsImNyZWF0ZV9hZF9jYXIiLCJwcmljZV9kaWZmZXJlbmNlIiwiY3JlYXRlX2J1dHRvbl90aXBzIiwicG9zaXRpb25fdGFyZ2V0IiwieCIsImFjdGl2ZSIsImNyZWF0ZV9yZXN0X3VpIiwic3RhZmZfaW5kZXgiLCJjcmVhdGVfZ2lmdF91aSIsImNyZWF0ZV9wZXQiLCJpbmRleCIsImNyZWF0ZV9vcHRpb25fdWkiLCJjcmVhdGVfbm92aWNlX3VpIiwiY3JlYXRlX2hvdGVsX3VpIiwiY3JlYXRlX3Nob3BfYnV5X3VpIiwic3ByaXRlRnJhbWUiLCJjcmVhdGVfc2hvcF91aSIsImNyZWF0ZV9pYXBfdWkiLCJjcmVhdGVfdmlkZW90YXBlX3VpIiwiY3JlYXRlX2V4X2VmZmVjdCIsImNyZWF0ZV9ub2RlIiwibGV2ZWxfaWNvbiIsImZpbmQiLCJjX1dwb3MiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJwb3NpdGlvbiIsImNfblBvcyIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwidF9XcG9zIiwidF9OcG9zIiwidHdlZW4iLCJ0byIsImVhc2luZyIsImNhbGwiLCJzb3VuZF9jb250cm9sIiwicGxheV9zb3VuZF9lZmZlY3QiLCJnYW1lX3J1bGVzX2pzIiwiYWRkX2V4Iiwib25fbm9kZV9raWxsIiwic3RhcnQiLCJjcmVhdGVfbGlnaHRfZWZmZWN0IiwicGxhbnRfaW5kZXgiLCJzZWxsIiwiZGVsYXkiLCJhbGxfY2FwYWNpdHkiLCJ3YXJlSG91c2VfbGV2ZWwiLCJjb25maWciLCJ3YXJlSG91c2UiLCJoYXZlIiwiaWRfcHJvZHVjdCIsImNyZWF0ZV9nb2xkX2VmZmVjdCIsImFkZEdvbGQiLCJnb2xkX2ljb24iLCJ5IiwiYWRkX2dvbGQiLCJuYW1lIiwib25Mb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBREEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFFQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLG1CQUFtQixFQUFFSixFQUFFLENBQUNLLE1BRGhCO0FBRVJDLElBQUFBLGVBQWUsRUFBRU4sRUFBRSxDQUFDSyxNQUZaO0FBR1JFLElBQUFBLGNBQWMsRUFBRVAsRUFBRSxDQUFDSyxNQUhYO0FBSVJHLElBQUFBLGNBQWMsRUFBRVIsRUFBRSxDQUFDSyxNQUpYO0FBS1JJLElBQUFBLG1CQUFtQixFQUFFVCxFQUFFLENBQUNLLE1BTGhCO0FBTVJLLElBQUFBLGVBQWUsRUFBRVYsRUFBRSxDQUFDSyxNQU5aO0FBT1JNLElBQUFBLGVBQWUsRUFBRVgsRUFBRSxDQUFDSyxNQVBaO0FBUVJPLElBQUFBLHdCQUF3QixFQUFFWixFQUFFLENBQUNLLE1BUnJCO0FBU1JRLElBQUFBLGFBQWEsRUFBRWIsRUFBRSxDQUFDSyxNQVRWO0FBVVJTLElBQUFBLGFBQWEsRUFBRWQsRUFBRSxDQUFDSyxNQVZWO0FBV1JVLElBQUFBLGtCQUFrQixFQUFFZixFQUFFLENBQUNLLE1BWGY7QUFZUlcsSUFBQUEsY0FBYyxFQUFFaEIsRUFBRSxDQUFDSyxNQVpYO0FBYVJZLElBQUFBLGNBQWMsRUFBRSxDQUFDakIsRUFBRSxDQUFDSyxNQUFKLENBYlI7QUFjUmEsSUFBQUEsZ0JBQWdCLEVBQUVsQixF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eUJGLElBQXpCO0FBQ0E7O0FBQ0osV0FBSyxTQUFMO0FBQ0ksYUFBS2lCLGdCQUFMLENBQXNCZixHQUF0QixDQUEwQkYsSUFBMUI7QUFDQTs7QUFDSixXQUFLLGNBQUw7QUFDSSxhQUFLSSxxQkFBTCxDQUEyQkYsR0FBM0IsQ0FBK0JGLElBQS9CO0FBQ0E7O0FBQ0o7QUFDSTtBQWxEUjs7QUFtREM7QUFDSixHQXBiSTtBQXNiTDtBQUNBK0IsRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ2xCLFNBQUtsQywwQkFBTDtBQUNBLFNBQUtNLHNCQUFMO0FBQ0EsU0FBS0UscUJBQUw7QUFDQSxTQUFLQyxxQkFBTDtBQUNBLFNBQUtHLHFCQUFMO0FBQ0EsU0FBS0MsaUJBQUw7QUFDQSxTQUFLQyxpQkFBTDtBQUNBLFNBQUtDLGVBQUw7QUFDQSxTQUFLQyxrQkFBTDtBQUNBLFNBQUtFLGtCQUFMO0FBQ0EsU0FBS0Qsb0JBQUw7QUFDQSxTQUFLRSxpQkFBTDtBQUNBLFNBQUtHLG9CQUFMO0FBQ0EsU0FBS0YsZ0JBQUw7QUFDQSxTQUFLYixxQkFBTDtBQUNBLFNBQUtjLGVBQUw7QUFDSCxHQXhjSTtBQXljTDBFLEVBQUFBLE1BemNLLG9CQXljSTtBQUNMLFNBQUtwQixhQUFMLEdBQXFCdkcsRUFBRSxDQUFDeUYsSUFBSCxDQUFRLFNBQVIsRUFBbUI1QixZQUFuQixDQUFnQyxZQUFoQyxDQUFyQjtBQUNBLFNBQUt3QyxhQUFMLEdBQXFCckcsRUFBRSxDQUFDeUYsSUFBSCxDQUFRLGVBQVIsRUFBeUI1QixZQUF6QixDQUFzQyxlQUF0QyxDQUFyQjtBQUNBLFNBQUtDLFFBQUw7QUFDSCxHQTdjSTtBQStjTDRDLEVBQUFBLEtBL2NLLG1CQStjRyxDQUVQLENBamRJLENBbWRMOztBQW5kSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcbmltcG9ydCBjb25maWcgZnJvbSBcImNvbmZpZ1wiO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYnV0dG9uX2dyb3VwX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBwbGFudF91aV9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgc2VsbF91aV9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgdGlwc191aV9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgbGlnaHRfZWZmZWN0X3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBzdHVkeV91aV9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgc3RhZmZfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIG9mZmxpbmVfcHJvZml0X3VpX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBwZXRfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIGFkX2Nhcl9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgYnV0dG9uX3RpcHNfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIHJlc3RfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIHBldF9wcmVmYWJfYXJyOiBbY2MuUHJlZmFiXSxcbiAgICAgICAgZXhfZWZmZWN0X3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBnaWZ0X3VpX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBvcHRpb25fdWlfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIGdvbGRfZWZmZWN0X3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBub3ZpY2VfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIGhvdGVsX3VpX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBzaG9wX3VpX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBpYXBfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIHNob3BfYnV5X3VpX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICB2aWRlb3RhcGVfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgfSxcblxuICAgIC8v5Yib5bu65oyJ6ZKu57uE55qE6IqC54K55rGgXG4gICAgbmV3X2J1dHRvbl9ncm91cF9ub2RlX3Bvb2w6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5idXR0b25fbW9yZV9ub2RlX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJ1dHRvbl9ncm91cF9wcmVmYWIpO1xuICAgICAgICB0aGlzLmJ1dHRvbl9tb3JlX25vZGVfcG9vbC5wdXQobm9kZSk7XG4gICAgfSxcbiAgICAvL1xuICAgIG5ld19wbGFudF91aV9ub2RlX3Bvb2w6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5uZXdfcGxhbnRfdWlfbm9kZV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGFudF91aV9wcmVmYWIpO1xuICAgICAgICB0aGlzLm5ld19wbGFudF91aV9ub2RlX3Bvb2wucHV0KG5vZGUpO1xuICAgIH0sXG4gICAgbmV3X3ZpZGVvdGFwZV91aV9wb29sOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubmV3X3ZpZGVvdGFwZV91aV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy52aWRlb3RhcGVfdWlfcHJlZmFiKTtcbiAgICAgICAgdGhpcy5uZXdfdmlkZW90YXBlX3VpX3Bvb2wucHV0KG5vZGUpO1xuICAgIH0sXG4gICAgbmV3X3NlbGxfdWlfbm9kZV9wb29sOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubmV3X3NlbGxfdWlfbm9kZV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zZWxsX3VpX3ByZWZhYik7XG4gICAgICAgIHRoaXMubmV3X3NlbGxfdWlfbm9kZV9wb29sLnB1dChub2RlKTtcbiAgICB9LFxuICAgIG5ld190aXBzX3VpX25vZGVfcG9vbDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY291bnQgPSA1O1xuICAgICAgICB0aGlzLm5ld190aXBzX3VpX25vZGVfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy50aXBzX3VpX3ByZWZhYik7XG4gICAgICAgICAgICB0aGlzLm5ld190aXBzX3VpX25vZGVfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBuZXdfbGlnaHRfZWZmZWN0X3Bvb2w6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvdW50ID0gODtcbiAgICAgICAgdGhpcy5uZXdfbGlnaHRfZWZmZWN0X3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubGlnaHRfZWZmZWN0X3ByZWZhYik7XG4gICAgICAgICAgICB0aGlzLm5ld19saWdodF9lZmZlY3RfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBuZXdfc3R1ZHlfdWlfcG9vbDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm5ld19zdHVkeV91aV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdHVkeV91aV9wcmVmYWIpO1xuICAgICAgICB0aGlzLm5ld19zdHVkeV91aV9wb29sLnB1dChub2RlKTtcbiAgICB9LFxuICAgIG5ld19zdGFmZl91aV9wb29sOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubmV3X3N0YWZmX3VpX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnN0YWZmX3VpX3ByZWZhYik7XG4gICAgICAgIHRoaXMubmV3X3N0YWZmX3VpX3Bvb2wucHV0KG5vZGUpO1xuICAgIH0sXG4gICAgbmV3X3BldF91aV9wb29sOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubmV3X3BldF91aV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wZXRfdWlfcHJlZmFiKTtcbiAgICAgICAgdGhpcy5uZXdfcGV0X3VpX3Bvb2wucHV0KG5vZGUpO1xuICAgIH0sXG4gICAgbmV3X2V4X2VmZmVjdF9wb29sKCkge1xuICAgICAgICB0aGlzLm5ld19leF9lZmZlY3RfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5leF9lZmZlY3RfcHJlZmFiKTtcbiAgICAgICAgICAgIHRoaXMubmV3X2V4X2VmZmVjdF9wb29sLnB1dChub2RlKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG5ld19nb2xkX2VmZmVjdF9wb29sKCkge1xuICAgICAgICB0aGlzLm5ld19nb2xkX2VmZmVjdF9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmdvbGRfZWZmZWN0X3ByZWZhYik7XG4gICAgICAgICAgICB0aGlzLm5ld19nb2xkX2VmZmVjdF9wb29sLnB1dChub2RlKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG5ld19vcHRpb25fdWlfcG9vbCgpIHtcbiAgICAgICAgdGhpcy5uZXdfb3B0aW9uX3VpX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm9wdGlvbl91aV9wcmVmYWIpO1xuICAgICAgICB0aGlzLm5ld19vcHRpb25fdWlfcG9vbC5wdXQobm9kZSk7XG4gICAgfSxcbiAgICBuZXdfaG90ZWxfdWlfcG9vbCgpIHtcbiAgICAgICAgdGhpcy5uZXdfaG90ZWxfdWlfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaG90ZWxfdWlfcHJlZmFiKTtcbiAgICAgICAgdGhpcy5uZXdfaG90ZWxfdWlfcG9vbC5wdXQobm9kZSk7XG4gICAgfSxcbiAgICBuZXdfc2hvcF91aV9wb29sKCkge1xuICAgICAgICB0aGlzLm5ld19zaG9wX3VpX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnNob3BfdWlfcHJlZmFiKTtcbiAgICAgICAgdGhpcy5uZXdfc2hvcF91aV9wb29sLnB1dChub2RlKTtcbiAgICB9LFxuICAgIG5ld19pYXBfdWlfcG9vbCgpIHtcbiAgICAgICAgdGhpcy5uZXdfaWFwX3VpX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmlhcF91aV9wcmVmYWIpO1xuICAgICAgICB0aGlzLm5ld19pYXBfdWlfcG9vbC5wdXQobm9kZSk7XG4gICAgfSxcbiAgICBuZXdfc2hvcF9idXlfdWlfcG9vbCgpIHtcbiAgICAgICAgdGhpcy5uZXdfc2hvcF9idXlfdWlfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc2hvcF9idXlfdWlfcHJlZmFiKTtcbiAgICAgICAgdGhpcy5uZXdfc2hvcF9idXlfdWlfcG9vbC5wdXQobm9kZSk7XG4gICAgfSxcbiAgICAvL1xuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy/liJvlu7rmjInpkq7nu4RcbiAgICBjcmVhdGVfYnV0dG9uX2dyb3VwOiBmdW5jdGlvbiAocGFyZW50Tm9kZSkge1xuICAgICAgICB2YXIgbm9kZSA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLmJ1dHRvbl9tb3JlX25vZGVfcG9vbC5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgICBub2RlID0gdGhpcy5idXR0b25fbW9yZV9ub2RlX3Bvb2wuZ2V0KCk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH0sXG4gICAgY3JlYXRlX3BsYW50X3VpOiBmdW5jdGlvbiAocGFyZW50Tm9kZSkge1xuICAgICAgICB2YXIgbm9kZSA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLm5ld19wbGFudF91aV9ub2RlX3Bvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMubmV3X3BsYW50X3VpX25vZGVfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSxcbiAgICBjcmVhdGVfc2VsbF91aTogZnVuY3Rpb24gKHBhcmVudE5vZGUpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5uZXdfc2VsbF91aV9ub2RlX3Bvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMubmV3X3NlbGxfdWlfbm9kZV9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuICAgIGNyZWF0ZV90aXBzX3VpOiBmdW5jdGlvbiAocGFyZW50Tm9kZSwgdHlwZSwgbnVtKSB7XG4gICAgICAgIHZhciBub2RlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMubmV3X3RpcHNfdWlfbm9kZV9wb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLm5ld190aXBzX3VpX25vZGVfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwidGlwc191aVwiKS5pbmlfbm9kZSh0eXBlLCBudW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgY3JlYXRlX3N0dWR5X3VpOiBmdW5jdGlvbiAocGFyZW50Tm9kZSkge1xuICAgICAgICB2YXIgbm9kZSA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLm5ld19zdHVkeV91aV9wb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLm5ld19zdHVkeV91aV9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuICAgIGNyZWF0ZV9zdGFmZl91aTogZnVuY3Rpb24gKHBhcmVudE5vZGUpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5uZXdfc3RhZmZfdWlfcG9vbC5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgICBub2RlID0gdGhpcy5uZXdfc3RhZmZfdWlfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSxcbiAgICBjcmVhdGVfb2ZmbGluZV9wcm9maXRfdWk6IGZ1bmN0aW9uIChwYXJlbnROb2RlKSB7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5vZmZsaW5lX3Byb2ZpdF91aV9wcmVmYWIpO1xuICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwib2ZmbGluZV9wcm9maXRcIikuaW5pX25vZGUoKTtcbiAgICB9LFxuICAgIGNyZWF0ZV9wZXRfdWk6IGZ1bmN0aW9uIChwYXJlbnROb2RlKSB7XG4gICAgICAgIHZhciBub2RlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMubmV3X3BldF91aV9wb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLm5ld19wZXRfdWlfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSxcbiAgICBjcmVhdGVfYWRfY2FyKHBhcmVudE5vZGUsIHByaWNlX2RpZmZlcmVuY2UpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmFkX2Nhcl9wcmVmYWIpXG4gICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJhZF9jYXJcIikuaW5pX25vZGUocHJpY2VfZGlmZmVyZW5jZSk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH0sXG4gICAgLy/niLboioLngrnvvIzmj5DnpLrngrnnsbvlnovvvIznm67moIfkvY3nva5cbiAgICBjcmVhdGVfYnV0dG9uX3RpcHMocGFyZW50Tm9kZSwgcG9zaXRpb25fdGFyZ2V0KSB7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5idXR0b25fdGlwc19wcmVmYWIpO1xuICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XG4gICAgICAgIG5vZGUueCA9IHBvc2l0aW9uX3RhcmdldC54O1xuICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG4gICAgY3JlYXRlX3Jlc3RfdWkocGFyZW50Tm9kZSwgc3RhZmZfaW5kZXgpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnJlc3RfdWlfcHJlZmFiKTtcbiAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgICAgICBub2RlLmdldENvbXBvbmVudChcInJlc3RfdWlcIikuaW5pX25vZGUoc3RhZmZfaW5kZXgpO1xuICAgIH0sXG4gICAgY3JlYXRlX2dpZnRfdWkocGFyZW50Tm9kZSkge1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZ2lmdF91aV9wcmVmYWIpO1xuICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiZ2lmdF91aVwiKS5pbmlfbm9kZSgpO1xuICAgIH0sXG4gICAgY3JlYXRlX3BldChwYXJlbnROb2RlLCBpbmRleCkge1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGV0X3ByZWZhYl9hcnJbaW5kZXhdKTtcbiAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgIH0sXG4gICAgY3JlYXRlX29wdGlvbl91aSgpIHtcbiAgICAgICAgaWYgKHRoaXMubmV3X29wdGlvbl91aV9wb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5uZXdfb3B0aW9uX3VpX3Bvb2wuZ2V0KCk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwib3B0aW9uX3VpXCIpLmluaV9ub2RlKCk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjcmVhdGVfbm92aWNlX3VpKCkge1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubm92aWNlX3VpX3ByZWZhYik7XG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIm5vdmljZV91aVwiKS5pbmlfbm9kZSgpO1xuICAgIH0sXG4gICAgY3JlYXRlX2hvdGVsX3VpKCkge1xuICAgICAgICBpZiAodGhpcy5uZXdfaG90ZWxfdWlfcG9vbC5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubmV3X2hvdGVsX3VpX3Bvb2wuZ2V0KCk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiaG90ZWxfdWlcIikuaW5pX25vZGUoKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGNyZWF0ZV9zaG9wX2J1eV91aSh0eXBlLCBpbmRleCwgc3ByaXRlRnJhbWUpIHtcbiAgICAgICAgLy/nianlk4HnsbvlnovvvIznianlk4HnvJblj7fvvIznianlk4HnmoTlm77niYdcbiAgICAgICAgaWYgKHRoaXMubmV3X3Nob3BfYnV5X3VpX3Bvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5ld19zaG9wX2J1eV91aV9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInNob3BfYnV5X3VpXCIpLmluaV9ub2RlKHR5cGUsIGluZGV4LCBzcHJpdGVGcmFtZSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjcmVhdGVfc2hvcF91aSgpIHtcbiAgICAgICAgaWYgKHRoaXMubmV3X3Nob3BfdWlfcG9vbC5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubmV3X3Nob3BfdWlfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzaG9wX3VpXCIpLmluaV9ub2RlKCk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjcmVhdGVfaWFwX3VpKCkge1xuICAgICAgICBpZiAodGhpcy5uZXdfaWFwX3VpX3Bvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5ld19pYXBfdWlfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJpYXBfdWlcIikuaW5pX25vZGUoKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGNyZWF0ZV92aWRlb3RhcGVfdWkoKSB7XG4gICAgICAgIGlmICh0aGlzLm5ld192aWRlb3RhcGVfdWlfcG9vbC5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubmV3X3ZpZGVvdGFwZV91aV9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInZpZGVvdGFwZV91aVwiKS5pbmlfbm9kZSgpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgY3JlYXRlX2V4X2VmZmVjdChjcmVhdGVfbm9kZSwgaW5kZXgpIHtcblxuICAgICAgICAvL+WcqOWTquS4quiKgueCuei/m+ihjOWIm+W7uu+8jOWIm+W7uueahOesrOWHoOS4qlxuICAgICAgICAvL2NyZWF0ZV9ub2RlICwgaW5kZXhcbiAgICAgICAgdmFyIGxldmVsX2ljb24gPSBjYy5maW5kKFwiVUlfUk9PVC90b3AvbGV2ZWwvbGV2ZWxfaWNvblwiKTtcbiAgICAgICAgLy/lsIbliJvlu7rnmoTliJ3lp4vlnLDlnYAg6L2s5o2i5Li65LiW55WM5Z2Q5qCHXG4gICAgICAgIHZhciBjX1dwb3MgPSBjcmVhdGVfbm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGNyZWF0ZV9ub2RlLnBvc2l0aW9uKTtcbiAgICAgICAgLy/ovazmjaLkuLrpnIDopoHnmoTnm7jlr7nlnZDmoIdcbiAgICAgICAgdmFyIGNfblBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihjX1dwb3MpO1xuXG4gICAgICAgIC8v5bCG6aOe5b6A55qE55uu5qCH5L2N572u6L2s5Li65LiW55WM5Z2Q5qCHXG4gICAgICAgIHZhciB0X1dwb3MgPSBsZXZlbF9pY29uLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIobGV2ZWxfaWNvbi5wb3NpdGlvbik7XG4gICAgICAgIC8v5bCG55uu5qCH5L2N572u6L2s5Li655u45a+55L2N572uXG4gICAgICAgIHZhciB0X05wb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIodF9XcG9zKVxuXG5cbiAgICAgICAgaWYgKHRoaXMubmV3X2V4X2VmZmVjdF9wb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5uZXdfZXhfZWZmZWN0X3Bvb2wuZ2V0KCk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBjX25Qb3M7XG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKVxuICAgICAgICAgICAgICAgIC50bygoaW5kZXggKyAxKSAvIDUsIHsgcG9zaXRpb246IHRfTnBvcyB9LCB7IGVhc2luZzogXCJzaW5lSW5cIiB9KVxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYWRkX2V4XCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2V4KDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uX25vZGVfa2lsbChub2RlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/mlLblibLnibnmlYhcbiAgICBjcmVhdGVfbGlnaHRfZWZmZWN0KGNyZWF0ZV9ub2RlLCBpbmRleCwgcGxhbnRfaW5kZXgpIHtcbiAgICAgICAgLy/lnKjlk6rkuKroioLngrnov5vooYzliJvlu7rvvIzliJvlu7rnmoTnrKzlh6DkuKog56eN5a2Q57yW5Y+3XG4gICAgICAgIHZhciBzZWxsID0gY2MuZmluZChcIlVJX1JPT1QvY2VudGVyL2J1aWxkL3NlbGxcIik7XG4gICAgICAgIC8v5bCG5Yib5bu655qE5Yid5aeL5Zyw5Z2AIOi9rOaNouS4uuS4lueVjOWdkOagh1xuICAgICAgICB2YXIgY19XcG9zID0gY3JlYXRlX25vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjcmVhdGVfbm9kZS5wb3NpdGlvbik7XG4gICAgICAgIC8v6L2s5o2i5Li66ZyA6KaB55qE55u45a+55Z2Q5qCHXG4gICAgICAgIHZhciBjX25Qb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoY19XcG9zKTtcblxuICAgICAgICAvL+WwhumjnuW+gOeahOebruagh+S9jee9rui9rOS4uuS4lueVjOWdkOagh1xuICAgICAgICB2YXIgdF9XcG9zID0gc2VsbC5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHNlbGwucG9zaXRpb24pO1xuICAgICAgICAvL+Wwhuebruagh+S9jee9rui9rOS4uuebuOWvueS9jee9rlxuICAgICAgICB2YXIgdF9OcG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRfV3BvcylcblxuICAgICAgICBpZiAodGhpcy5uZXdfbGlnaHRfZWZmZWN0X3Bvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5ld19saWdodF9lZmZlY3RfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IGNfblBvcztcbiAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpXG4gICAgICAgICAgICAgICAgLmRlbGF5KDEpXG4gICAgICAgICAgICAgICAgLnRvKChpbmRleCArIDEpIC8gNSwgeyBwb3NpdGlvbjogdF9OcG9zIH0sIHsgZWFzaW5nOiBcInNpbmVJblwiIH0pXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJhZGRfZXhcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhbGxfY2FwYWNpdHkgPSB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZV9sZXZlbCAqIGNvbmZpZy53YXJlSG91c2VbXCJhbGxfY2FwYWNpdHlcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE1OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uaGF2ZSA9PSAwKSBicmVhazsgICAgICAvLyBu4bq/dSBjaMawYSBt4bufIMO0IHRow6wgZOG7q25nLCBrIGPhu5luZyB0aMOqbSBu4buvYSwgxJHDoyB0csOgbiBraG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3VudCA9PSAwKSB7ICAgICAgICAgIC8vIG7hur91IGzDoCDDtCB0cuG7kW5nIHRow6wgdGjDqm0gdsOgb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3VudCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmlkX3Byb2R1Y3QgPSBwbGFudF9pbmRleDsgIC8vIGfDoW4gaWQgY8OieSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uY291bnQgPDMwICYmIHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmlkX3Byb2R1Y3Q9PSBwbGFudF9pbmRleCkgLy8ga2nhu4NtIHRyYSBraG8gY8O5bmcgbG/huqFpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW3BsYW50X2luZGV4XS5jb3VudCsrOyAvLyB0aMOqbSB24bqtdCBwaOG6qW0gdsOgbyBraG9cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZ2FtZV9ydWxlc19qcy5qZ2coMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25fbm9kZV9raWxsKG5vZGUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH0sXG5cbiAgICBjcmVhdGVfZ29sZF9lZmZlY3QoY3JlYXRlX25vZGUsIGluZGV4LCBhZGRHb2xkKSB7XG4gICAgICAgIC8vY3JlYXRlIG5vZGUg5Zyo5ZOq5Liq6IqC54K56aOe77yMIGluZGV4IOaVsOmHjyAsbnVt5aKe5Yqg55qE6YeR5biB5pWw6YePXG4gICAgICAgIHZhciBnb2xkX2ljb24gPSBjYy5maW5kKFwiVUlfUk9PVC90b3AvZ29sZC9nb2xkX2ljb25cIik7XG4gICAgICAgIC8v5bCG5Yib5bu655qE5Yid5aeL5Zyw5Z2AIOi9rOaNouS4uuS4lueVjOWdkOagh1xuICAgICAgICB2YXIgY19XcG9zID0gY3JlYXRlX25vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjcmVhdGVfbm9kZS5wb3NpdGlvbik7XG4gICAgICAgIC8v6L2s5o2i5Li66ZyA6KaB55qE55u45a+55Z2Q5qCHXG4gICAgICAgIHZhciBjX25Qb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoY19XcG9zKTtcblxuICAgICAgICAvL+WwhumjnuW+gOeahOebruagh+S9jee9rui9rOS4uuS4lueVjOWdkOagh1xuICAgICAgICB2YXIgdF9XcG9zID0gZ29sZF9pY29uLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoZ29sZF9pY29uLnBvc2l0aW9uKTtcbiAgICAgICAgLy/lsIbnm67moIfkvY3nva7ovazkuLrnm7jlr7nkvY3nva5cbiAgICAgICAgdmFyIHRfTnBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0X1dwb3MpXG5cbiAgICAgICAgaWYgKHRoaXMubmV3X2dvbGRfZWZmZWN0X3Bvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5ld19nb2xkX2VmZmVjdF9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gY19uUG9zO1xuICAgICAgICAgICAgbm9kZS55ICs9IDUwO1xuICAgICAgICAgICAgY2MudHdlZW4obm9kZSlcbiAgICAgICAgICAgICAgICAudG8oKGluZGV4ICsgMSkgLyA1LCB7IHBvc2l0aW9uOiB0X05wb3MgfSwgeyBlYXNpbmc6IFwic2luZUluXCIgfSlcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImFkZF9nb2xkXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2dvbGQoYWRkR29sZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25fbm9kZV9raWxsKG5vZGUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgIH07XG5cbiAgICB9LFxuICAgIC8v6IqC54K56ZSA5q+BXG4gICAgb25fbm9kZV9raWxsOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBzd2l0Y2ggKG5vZGUubmFtZSkge1xuICAgICAgICAgICAgY2FzZSBcImJ1dHRvbl9tb3JlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25fbW9yZV9ub2RlX3Bvb2wucHV0KG5vZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBsYW50X3VpXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfcGxhbnRfdWlfbm9kZV9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzZWxsX3VpXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfc2VsbF91aV9ub2RlX3Bvb2wucHV0KG5vZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInRpcHNfdWlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld190aXBzX3VpX25vZGVfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibGlnaHRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19saWdodF9lZmZlY3RfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic3R1ZHlfdWlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19zdHVkeV91aV9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzdGFmZl91aVwiOlxuICAgICAgICAgICAgICAgIHRoaXMubmV3X3N0YWZmX3VpX3Bvb2wucHV0KG5vZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBldF91aVwiOlxuICAgICAgICAgICAgICAgIHRoaXMubmV3X3BldF91aV9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJleF9lZmZlY3RcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19leF9lZmZlY3RfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZ29sZF9lZmZlY3RcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19nb2xkX2VmZmVjdF9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJvcHRpb25fdWlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19vcHRpb25fdWlfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiaG90ZWxfdWlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19ob3RlbF91aV9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzaG9wX2J1eV91aVwiOlxuICAgICAgICAgICAgICAgIHRoaXMubmV3X3Nob3BfYnV5X3VpX3Bvb2wucHV0KG5vZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImlhcF91aVwiOlxuICAgICAgICAgICAgICAgIHRoaXMubmV3X2lhcF91aV9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzaG9wX3VpXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfc2hvcF91aV9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ2aWRlb3RhcGVfdWlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld192aWRlb3RhcGVfdWlfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgLy/liJ3lp4vljJboioLngrlcbiAgICBpbmlfbm9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm5ld19idXR0b25fZ3JvdXBfbm9kZV9wb29sKCk7XG4gICAgICAgIHRoaXMubmV3X3BsYW50X3VpX25vZGVfcG9vbCgpO1xuICAgICAgICB0aGlzLm5ld19zZWxsX3VpX25vZGVfcG9vbCgpO1xuICAgICAgICB0aGlzLm5ld190aXBzX3VpX25vZGVfcG9vbCgpO1xuICAgICAgICB0aGlzLm5ld19saWdodF9lZmZlY3RfcG9vbCgpO1xuICAgICAgICB0aGlzLm5ld19zdHVkeV91aV9wb29sKCk7XG4gICAgICAgIHRoaXMubmV3X3N0YWZmX3VpX3Bvb2woKTtcbiAgICAgICAgdGhpcy5uZXdfcGV0X3VpX3Bvb2woKTtcbiAgICAgICAgdGhpcy5uZXdfZXhfZWZmZWN0X3Bvb2woKTtcbiAgICAgICAgdGhpcy5uZXdfb3B0aW9uX3VpX3Bvb2woKTtcbiAgICAgICAgdGhpcy5uZXdfZ29sZF9lZmZlY3RfcG9vbCgpO1xuICAgICAgICB0aGlzLm5ld19ob3RlbF91aV9wb29sKCk7XG4gICAgICAgIHRoaXMubmV3X3Nob3BfYnV5X3VpX3Bvb2woKTtcbiAgICAgICAgdGhpcy5uZXdfc2hvcF91aV9wb29sKCk7XG4gICAgICAgIHRoaXMubmV3X3ZpZGVvdGFwZV91aV9wb29sKCk7XG4gICAgICAgIHRoaXMubmV3X2lhcF91aV9wb29sKCk7XG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuaW5pX25vZGUoKTtcbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==