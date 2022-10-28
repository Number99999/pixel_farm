
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lX3NjZW5lLmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImJ1dHRvbl9ncm91cF9wcmVmYWIiLCJQcmVmYWIiLCJwbGFudF91aV9wcmVmYWIiLCJzZWxsX3VpX3ByZWZhYiIsInRpcHNfdWlfcHJlZmFiIiwibGlnaHRfZWZmZWN0X3ByZWZhYiIsInN0dWR5X3VpX3ByZWZhYiIsInN0YWZmX3VpX3ByZWZhYiIsIm9mZmxpbmVfcHJvZml0X3VpX3ByZWZhYiIsInBldF91aV9wcmVmYWIiLCJhZF9jYXJfcHJlZmFiIiwiYnV0dG9uX3RpcHNfcHJlZmFiIiwicmVzdF91aV9wcmVmYWIiLCJwZXRfcHJlZmFiX2FyciIsImV4X2VmZmVjdF9wcmVmYWIiLCJnaWZ0X3VpX3ByZWZhYiIsIm9wdGlvbl91aV9wcmVmYWIiLCJnb2xkX2VmZmVjdF9wcmVmYWIiLCJub3ZpY2VfdWlfcHJlZmFiIiwiaG90ZWxfdWlfcHJlZmFiIiwic2hvcF91aV9wcmVmYWIiLCJzaG9wX2J1eV91aV9wcmVmYWIiLCJ2aWRlb3RhcGVfdWlfcHJlZmFiIiwibmV3X2J1dHRvbl9ncm91cF9ub2RlX3Bvb2wiLCJidXR0b25fbW9yZV9ub2RlX3Bvb2wiLCJOb2RlUG9vbCIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsInB1dCIsIm5ld19wbGFudF91aV9ub2RlX3Bvb2wiLCJuZXdfdmlkZW90YXBlX3VpX3Bvb2wiLCJuZXdfc2VsbF91aV9ub2RlX3Bvb2wiLCJuZXdfdGlwc191aV9ub2RlX3Bvb2wiLCJjb3VudCIsImkiLCJuZXdfbGlnaHRfZWZmZWN0X3Bvb2wiLCJuZXdfc3R1ZHlfdWlfcG9vbCIsIm5ld19zdGFmZl91aV9wb29sIiwibmV3X3BldF91aV9wb29sIiwibmV3X2V4X2VmZmVjdF9wb29sIiwibmV3X2dvbGRfZWZmZWN0X3Bvb2wiLCJuZXdfb3B0aW9uX3VpX3Bvb2wiLCJuZXdfaG90ZWxfdWlfcG9vbCIsIm5ld19zaG9wX3VpX3Bvb2wiLCJuZXdfc2hvcF9idXlfdWlfcG9vbCIsImNyZWF0ZV9idXR0b25fZ3JvdXAiLCJwYXJlbnROb2RlIiwic2l6ZSIsImdldCIsInBhcmVudCIsImNyZWF0ZV9wbGFudF91aSIsImNyZWF0ZV9zZWxsX3VpIiwiY3JlYXRlX3RpcHNfdWkiLCJ0eXBlIiwibnVtIiwiZ2V0Q29tcG9uZW50IiwiaW5pX25vZGUiLCJjcmVhdGVfc3R1ZHlfdWkiLCJjcmVhdGVfc3RhZmZfdWkiLCJjcmVhdGVfb2ZmbGluZV9wcm9maXRfdWkiLCJjcmVhdGVfcGV0X3VpIiwiY3JlYXRlX2FkX2NhciIsInByaWNlX2RpZmZlcmVuY2UiLCJjcmVhdGVfYnV0dG9uX3RpcHMiLCJwb3NpdGlvbl90YXJnZXQiLCJ4IiwiYWN0aXZlIiwiY3JlYXRlX3Jlc3RfdWkiLCJzdGFmZl9pbmRleCIsImNyZWF0ZV9naWZ0X3VpIiwiY3JlYXRlX3BldCIsImluZGV4IiwiY3JlYXRlX29wdGlvbl91aSIsImNyZWF0ZV9ub3ZpY2VfdWkiLCJjcmVhdGVfaG90ZWxfdWkiLCJjcmVhdGVfc2hvcF9idXlfdWkiLCJzcHJpdGVGcmFtZSIsImNyZWF0ZV9zaG9wX3VpIiwiY3JlYXRlX3ZpZGVvdGFwZV91aSIsImNyZWF0ZV9leF9lZmZlY3QiLCJjcmVhdGVfbm9kZSIsImxldmVsX2ljb24iLCJmaW5kIiwiY19XcG9zIiwiY29udmVydFRvV29ybGRTcGFjZUFSIiwicG9zaXRpb24iLCJjX25Qb3MiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsInRfV3BvcyIsInRfTnBvcyIsInR3ZWVuIiwidG8iLCJlYXNpbmciLCJjYWxsIiwic291bmRfY29udHJvbCIsInBsYXlfc291bmRfZWZmZWN0IiwiZ2FtZV9ydWxlc19qcyIsImFkZF9leCIsIm9uX25vZGVfa2lsbCIsInN0YXJ0IiwiY3JlYXRlX2xpZ2h0X2VmZmVjdCIsInBsYW50X2luZGV4Iiwic2VsbCIsImRlbGF5IiwiYWxsX2NhcGFjaXR5Iiwid2FyZUhvdXNlX2xldmVsIiwiY29uZmlnIiwid2FyZUhvdXNlIiwiaGF2ZSIsImlkX3Byb2R1Y3QiLCJjcmVhdGVfZ29sZF9lZmZlY3QiLCJhZGRHb2xkIiwiZ29sZF9pY29uIiwieSIsImFkZF9nb2xkIiwibmFtZSIsIm9uTG9hZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7OztBQURBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBRUFDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxtQkFBbUIsRUFBRUosRUFBRSxDQUFDSyxNQURoQjtBQUVSQyxJQUFBQSxlQUFlLEVBQUVOLEVBQUUsQ0FBQ0ssTUFGWjtBQUdSRSxJQUFBQSxjQUFjLEVBQUVQLEVBQUUsQ0FBQ0ssTUFIWDtBQUlSRyxJQUFBQSxjQUFjLEVBQUVSLEVBQUUsQ0FBQ0ssTUFKWDtBQUtSSSxJQUFBQSxtQkFBbUIsRUFBRVQsRUFBRSxDQUFDSyxNQUxoQjtBQU1SSyxJQUFBQSxlQUFlLEVBQUVWLEVBQUUsQ0FBQ0ssTUFOWjtBQU9STSxJQUFBQSxlQUFlLEVBQUVYLEVBQUUsQ0FBQ0ssTUFQWjtBQVFSTyxJQUFBQSx3QkFBd0IsRUFBRVosRUFBRSxDQUFDSyxNQVJyQjtBQVNSUSxJQUFBQSxhQUFhLEVBQUViLEVBQUUsQ0FBQ0ssTUFUVjtBQVVSUyxJQUFBQSxhQUFhLEVBQUVkLEVBQUUsQ0FBQ0ssTUFWVjtBQVdSVSxJQUFBQSxrQkFBa0IsRUFBRWYsRUFBRSxDQUFDSyxNQVhmO0FBWVJXLElBQUFBLGNBQWMsRUFBRWhCLEVBQUUsQ0FBQ0ssTUFaWDtBQWFSWSxJQUFBQSxjQUFjLEVBQUUsQ0FBQ2pCLEVBQUUsQ0FBQ0ssTUFBSixDQWJSO0FBY1JhLElBQUFBLGdCQUFnQixFQUFFbEIsRUFBRSxDQUFDSyxNQWRiO0FBZVJjLElBQUFBLGNBQWMsRUFBRW5CLEVBQUUsQ0FBQ0ss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bEcsRUFBRSxDQUFDc0YsSUFBSCxDQUFRLGVBQVIsRUFBeUIzQixZQUF6QixDQUFzQyxlQUF0QyxDQUFyQjtBQUNBLFNBQUtDLFFBQUw7QUFDSCxHQTdiSTtBQStiTDJDLEVBQUFBLEtBL2JLLG1CQStiRyxDQUVQLENBamNJLENBbWNMOztBQW5jSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcbmltcG9ydCBjb25maWcgZnJvbSBcImNvbmZpZ1wiO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYnV0dG9uX2dyb3VwX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBwbGFudF91aV9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgc2VsbF91aV9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgdGlwc191aV9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgbGlnaHRfZWZmZWN0X3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBzdHVkeV91aV9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgc3RhZmZfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIG9mZmxpbmVfcHJvZml0X3VpX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBwZXRfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIGFkX2Nhcl9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgYnV0dG9uX3RpcHNfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIHJlc3RfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIHBldF9wcmVmYWJfYXJyOiBbY2MuUHJlZmFiXSxcbiAgICAgICAgZXhfZWZmZWN0X3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBnaWZ0X3VpX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBvcHRpb25fdWlfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIGdvbGRfZWZmZWN0X3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBub3ZpY2VfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIGhvdGVsX3VpX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBzaG9wX3VpX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBzaG9wX2J1eV91aV9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgdmlkZW90YXBlX3VpX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgIH0sXG5cbiAgICAvL+WIm+W7uuaMiemSrue7hOeahOiKgueCueaxoFxuICAgIG5ld19idXR0b25fZ3JvdXBfbm9kZV9wb29sOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYnV0dG9uX21vcmVfbm9kZV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5idXR0b25fZ3JvdXBfcHJlZmFiKTtcbiAgICAgICAgdGhpcy5idXR0b25fbW9yZV9ub2RlX3Bvb2wucHV0KG5vZGUpO1xuICAgIH0sXG4gICAgLy9cbiAgICBuZXdfcGxhbnRfdWlfbm9kZV9wb29sOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubmV3X3BsYW50X3VpX25vZGVfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxhbnRfdWlfcHJlZmFiKTtcbiAgICAgICAgdGhpcy5uZXdfcGxhbnRfdWlfbm9kZV9wb29sLnB1dChub2RlKTtcbiAgICB9LFxuICAgIG5ld192aWRlb3RhcGVfdWlfcG9vbDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm5ld192aWRlb3RhcGVfdWlfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudmlkZW90YXBlX3VpX3ByZWZhYik7XG4gICAgICAgIHRoaXMubmV3X3ZpZGVvdGFwZV91aV9wb29sLnB1dChub2RlKTtcbiAgICB9LFxuICAgIG5ld19zZWxsX3VpX25vZGVfcG9vbDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm5ld19zZWxsX3VpX25vZGVfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc2VsbF91aV9wcmVmYWIpO1xuICAgICAgICB0aGlzLm5ld19zZWxsX3VpX25vZGVfcG9vbC5wdXQobm9kZSk7XG4gICAgfSxcbiAgICBuZXdfdGlwc191aV9ub2RlX3Bvb2w6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvdW50ID0gNTtcbiAgICAgICAgdGhpcy5uZXdfdGlwc191aV9ub2RlX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudGlwc191aV9wcmVmYWIpO1xuICAgICAgICAgICAgdGhpcy5uZXdfdGlwc191aV9ub2RlX3Bvb2wucHV0KG5vZGUpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgbmV3X2xpZ2h0X2VmZmVjdF9wb29sOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb3VudCA9IDg7XG4gICAgICAgIHRoaXMubmV3X2xpZ2h0X2VmZmVjdF9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmxpZ2h0X2VmZmVjdF9wcmVmYWIpO1xuICAgICAgICAgICAgdGhpcy5uZXdfbGlnaHRfZWZmZWN0X3Bvb2wucHV0KG5vZGUpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgbmV3X3N0dWR5X3VpX3Bvb2w6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5uZXdfc3R1ZHlfdWlfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3R1ZHlfdWlfcHJlZmFiKTtcbiAgICAgICAgdGhpcy5uZXdfc3R1ZHlfdWlfcG9vbC5wdXQobm9kZSk7XG4gICAgfSxcbiAgICBuZXdfc3RhZmZfdWlfcG9vbDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm5ld19zdGFmZl91aV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdGFmZl91aV9wcmVmYWIpO1xuICAgICAgICB0aGlzLm5ld19zdGFmZl91aV9wb29sLnB1dChub2RlKTtcbiAgICB9LFxuICAgIG5ld19wZXRfdWlfcG9vbDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm5ld19wZXRfdWlfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGV0X3VpX3ByZWZhYik7XG4gICAgICAgIHRoaXMubmV3X3BldF91aV9wb29sLnB1dChub2RlKTtcbiAgICB9LFxuICAgIG5ld19leF9lZmZlY3RfcG9vbCgpIHtcbiAgICAgICAgdGhpcy5uZXdfZXhfZWZmZWN0X3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZXhfZWZmZWN0X3ByZWZhYik7XG4gICAgICAgICAgICB0aGlzLm5ld19leF9lZmZlY3RfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBuZXdfZ29sZF9lZmZlY3RfcG9vbCgpIHtcbiAgICAgICAgdGhpcy5uZXdfZ29sZF9lZmZlY3RfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5nb2xkX2VmZmVjdF9wcmVmYWIpO1xuICAgICAgICAgICAgdGhpcy5uZXdfZ29sZF9lZmZlY3RfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBuZXdfb3B0aW9uX3VpX3Bvb2woKSB7XG4gICAgICAgIHRoaXMubmV3X29wdGlvbl91aV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5vcHRpb25fdWlfcHJlZmFiKTtcbiAgICAgICAgdGhpcy5uZXdfb3B0aW9uX3VpX3Bvb2wucHV0KG5vZGUpO1xuICAgIH0sXG4gICAgbmV3X2hvdGVsX3VpX3Bvb2woKSB7XG4gICAgICAgIHRoaXMubmV3X2hvdGVsX3VpX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmhvdGVsX3VpX3ByZWZhYik7XG4gICAgICAgIHRoaXMubmV3X2hvdGVsX3VpX3Bvb2wucHV0KG5vZGUpO1xuICAgIH0sXG4gICAgbmV3X3Nob3BfdWlfcG9vbCgpIHtcbiAgICAgICAgdGhpcy5uZXdfc2hvcF91aV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zaG9wX3VpX3ByZWZhYik7XG4gICAgICAgIHRoaXMubmV3X3Nob3BfdWlfcG9vbC5wdXQobm9kZSk7XG4gICAgfSxcbiAgICBuZXdfc2hvcF9idXlfdWlfcG9vbCgpIHtcbiAgICAgICAgdGhpcy5uZXdfc2hvcF9idXlfdWlfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc2hvcF9idXlfdWlfcHJlZmFiKTtcbiAgICAgICAgdGhpcy5uZXdfc2hvcF9idXlfdWlfcG9vbC5wdXQobm9kZSk7XG4gICAgfSxcbiAgICAvL1xuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy/liJvlu7rmjInpkq7nu4RcbiAgICBjcmVhdGVfYnV0dG9uX2dyb3VwOiBmdW5jdGlvbiAocGFyZW50Tm9kZSkge1xuICAgICAgICB2YXIgbm9kZSA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLmJ1dHRvbl9tb3JlX25vZGVfcG9vbC5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgICBub2RlID0gdGhpcy5idXR0b25fbW9yZV9ub2RlX3Bvb2wuZ2V0KCk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH0sXG4gICAgY3JlYXRlX3BsYW50X3VpOiBmdW5jdGlvbiAocGFyZW50Tm9kZSkge1xuICAgICAgICB2YXIgbm9kZSA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLm5ld19wbGFudF91aV9ub2RlX3Bvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMubmV3X3BsYW50X3VpX25vZGVfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSxcbiAgICBjcmVhdGVfc2VsbF91aTogZnVuY3Rpb24gKHBhcmVudE5vZGUpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5uZXdfc2VsbF91aV9ub2RlX3Bvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMubmV3X3NlbGxfdWlfbm9kZV9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuICAgIGNyZWF0ZV90aXBzX3VpOiBmdW5jdGlvbiAocGFyZW50Tm9kZSwgdHlwZSwgbnVtKSB7XG4gICAgICAgIHZhciBub2RlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMubmV3X3RpcHNfdWlfbm9kZV9wb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLm5ld190aXBzX3VpX25vZGVfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwidGlwc191aVwiKS5pbmlfbm9kZSh0eXBlLCBudW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgY3JlYXRlX3N0dWR5X3VpOiBmdW5jdGlvbiAocGFyZW50Tm9kZSkge1xuICAgICAgICB2YXIgbm9kZSA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLm5ld19zdHVkeV91aV9wb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLm5ld19zdHVkeV91aV9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuICAgIGNyZWF0ZV9zdGFmZl91aTogZnVuY3Rpb24gKHBhcmVudE5vZGUpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5uZXdfc3RhZmZfdWlfcG9vbC5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgICBub2RlID0gdGhpcy5uZXdfc3RhZmZfdWlfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSxcbiAgICBjcmVhdGVfb2ZmbGluZV9wcm9maXRfdWk6IGZ1bmN0aW9uIChwYXJlbnROb2RlKSB7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5vZmZsaW5lX3Byb2ZpdF91aV9wcmVmYWIpO1xuICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwib2ZmbGluZV9wcm9maXRcIikuaW5pX25vZGUoKTtcbiAgICB9LFxuICAgIGNyZWF0ZV9wZXRfdWk6IGZ1bmN0aW9uIChwYXJlbnROb2RlKSB7XG4gICAgICAgIHZhciBub2RlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMubmV3X3BldF91aV9wb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLm5ld19wZXRfdWlfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSxcbiAgICBjcmVhdGVfYWRfY2FyKHBhcmVudE5vZGUsIHByaWNlX2RpZmZlcmVuY2UpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmFkX2Nhcl9wcmVmYWIpXG4gICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJhZF9jYXJcIikuaW5pX25vZGUocHJpY2VfZGlmZmVyZW5jZSk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH0sXG4gICAgLy/niLboioLngrnvvIzmj5DnpLrngrnnsbvlnovvvIznm67moIfkvY3nva5cbiAgICBjcmVhdGVfYnV0dG9uX3RpcHMocGFyZW50Tm9kZSwgcG9zaXRpb25fdGFyZ2V0KSB7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5idXR0b25fdGlwc19wcmVmYWIpO1xuICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XG4gICAgICAgIG5vZGUueCA9IHBvc2l0aW9uX3RhcmdldC54O1xuICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG4gICAgY3JlYXRlX3Jlc3RfdWkocGFyZW50Tm9kZSwgc3RhZmZfaW5kZXgpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnJlc3RfdWlfcHJlZmFiKTtcbiAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgICAgICBub2RlLmdldENvbXBvbmVudChcInJlc3RfdWlcIikuaW5pX25vZGUoc3RhZmZfaW5kZXgpO1xuICAgIH0sXG4gICAgY3JlYXRlX2dpZnRfdWkocGFyZW50Tm9kZSkge1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZ2lmdF91aV9wcmVmYWIpO1xuICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiZ2lmdF91aVwiKS5pbmlfbm9kZSgpO1xuICAgIH0sXG4gICAgY3JlYXRlX3BldChwYXJlbnROb2RlLCBpbmRleCkge1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGV0X3ByZWZhYl9hcnJbaW5kZXhdKTtcbiAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgIH0sXG4gICAgY3JlYXRlX29wdGlvbl91aSgpIHtcbiAgICAgICAgaWYgKHRoaXMubmV3X29wdGlvbl91aV9wb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5uZXdfb3B0aW9uX3VpX3Bvb2wuZ2V0KCk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwib3B0aW9uX3VpXCIpLmluaV9ub2RlKCk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjcmVhdGVfbm92aWNlX3VpKCkge1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubm92aWNlX3VpX3ByZWZhYik7XG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIm5vdmljZV91aVwiKS5pbmlfbm9kZSgpO1xuICAgIH0sXG4gICAgY3JlYXRlX2hvdGVsX3VpKCkge1xuICAgICAgICBpZiAodGhpcy5uZXdfaG90ZWxfdWlfcG9vbC5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubmV3X2hvdGVsX3VpX3Bvb2wuZ2V0KCk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiaG90ZWxfdWlcIikuaW5pX25vZGUoKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGNyZWF0ZV9zaG9wX2J1eV91aSh0eXBlLCBpbmRleCwgc3ByaXRlRnJhbWUpIHtcbiAgICAgICAgLy/nianlk4HnsbvlnovvvIznianlk4HnvJblj7fvvIznianlk4HnmoTlm77niYdcbiAgICAgICAgaWYgKHRoaXMubmV3X3Nob3BfYnV5X3VpX3Bvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5ld19zaG9wX2J1eV91aV9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInNob3BfYnV5X3VpXCIpLmluaV9ub2RlKHR5cGUsIGluZGV4LCBzcHJpdGVGcmFtZSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjcmVhdGVfc2hvcF91aSgpIHtcbiAgICAgICAgaWYgKHRoaXMubmV3X3Nob3BfdWlfcG9vbC5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubmV3X3Nob3BfdWlfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzaG9wX3VpXCIpLmluaV9ub2RlKCk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjcmVhdGVfdmlkZW90YXBlX3VpKCkge1xuICAgICAgICBpZiAodGhpcy5uZXdfdmlkZW90YXBlX3VpX3Bvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5ld192aWRlb3RhcGVfdWlfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJ2aWRlb3RhcGVfdWlcIikuaW5pX25vZGUoKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGNyZWF0ZV9leF9lZmZlY3QoY3JlYXRlX25vZGUsIGluZGV4KSB7XG5cbiAgICAgICAgLy/lnKjlk6rkuKroioLngrnov5vooYzliJvlu7rvvIzliJvlu7rnmoTnrKzlh6DkuKpcbiAgICAgICAgLy9jcmVhdGVfbm9kZSAsIGluZGV4XG4gICAgICAgIHZhciBsZXZlbF9pY29uID0gY2MuZmluZChcIlVJX1JPT1QvdG9wL2xldmVsL2xldmVsX2ljb25cIik7XG4gICAgICAgIC8v5bCG5Yib5bu655qE5Yid5aeL5Zyw5Z2AIOi9rOaNouS4uuS4lueVjOWdkOagh1xuICAgICAgICB2YXIgY19XcG9zID0gY3JlYXRlX25vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjcmVhdGVfbm9kZS5wb3NpdGlvbik7XG4gICAgICAgIC8v6L2s5o2i5Li66ZyA6KaB55qE55u45a+55Z2Q5qCHXG4gICAgICAgIHZhciBjX25Qb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoY19XcG9zKTtcblxuICAgICAgICAvL+WwhumjnuW+gOeahOebruagh+S9jee9rui9rOS4uuS4lueVjOWdkOagh1xuICAgICAgICB2YXIgdF9XcG9zID0gbGV2ZWxfaWNvbi5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGxldmVsX2ljb24ucG9zaXRpb24pO1xuICAgICAgICAvL+Wwhuebruagh+S9jee9rui9rOS4uuebuOWvueS9jee9rlxuICAgICAgICB2YXIgdF9OcG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRfV3BvcylcblxuXG4gICAgICAgIGlmICh0aGlzLm5ld19leF9lZmZlY3RfcG9vbC5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubmV3X2V4X2VmZmVjdF9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gY19uUG9zO1xuICAgICAgICAgICAgY2MudHdlZW4obm9kZSlcbiAgICAgICAgICAgICAgICAudG8oKGluZGV4ICsgMSkgLyA1LCB7IHBvc2l0aW9uOiB0X05wb3MgfSwgeyBlYXNpbmc6IFwic2luZUluXCIgfSlcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImFkZF9leFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9leCgxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbl9ub2RlX2tpbGwobm9kZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5pS25Ymy54m55pWIXG4gICAgY3JlYXRlX2xpZ2h0X2VmZmVjdChjcmVhdGVfbm9kZSwgaW5kZXgsIHBsYW50X2luZGV4KSB7XG4gICAgICAgIC8v5Zyo5ZOq5Liq6IqC54K56L+b6KGM5Yib5bu677yM5Yib5bu655qE56ys5Yeg5LiqIOenjeWtkOe8luWPt1xuICAgICAgICB2YXIgc2VsbCA9IGNjLmZpbmQoXCJVSV9ST09UL2NlbnRlci9idWlsZC9zZWxsXCIpO1xuICAgICAgICAvL+WwhuWIm+W7uueahOWIneWni+WcsOWdgCDovazmjaLkuLrkuJbnlYzlnZDmoIdcbiAgICAgICAgdmFyIGNfV3BvcyA9IGNyZWF0ZV9ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY3JlYXRlX25vZGUucG9zaXRpb24pO1xuICAgICAgICAvL+i9rOaNouS4uumcgOimgeeahOebuOWvueWdkOagh1xuICAgICAgICB2YXIgY19uUG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGNfV3Bvcyk7XG5cbiAgICAgICAgLy/lsIbpo57lvoDnmoTnm67moIfkvY3nva7ovazkuLrkuJbnlYzlnZDmoIdcbiAgICAgICAgdmFyIHRfV3BvcyA9IHNlbGwucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihzZWxsLnBvc2l0aW9uKTtcbiAgICAgICAgLy/lsIbnm67moIfkvY3nva7ovazkuLrnm7jlr7nkvY3nva5cbiAgICAgICAgdmFyIHRfTnBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0X1dwb3MpXG5cbiAgICAgICAgaWYgKHRoaXMubmV3X2xpZ2h0X2VmZmVjdF9wb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5uZXdfbGlnaHRfZWZmZWN0X3Bvb2wuZ2V0KCk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBjX25Qb3M7XG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKVxuICAgICAgICAgICAgICAgIC5kZWxheSgxKVxuICAgICAgICAgICAgICAgIC50bygoaW5kZXggKyAxKSAvIDUsIHsgcG9zaXRpb246IHRfTnBvcyB9LCB7IGVhc2luZzogXCJzaW5lSW5cIiB9KVxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYWRkX2V4XCIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWxsX2NhcGFjaXR5ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VfbGV2ZWwgKiBjb25maWcud2FyZUhvdXNlW1wiYWxsX2NhcGFjaXR5XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmhhdmUgPT0gMCkgYnJlYWs7ICAgICAgLy8gbuG6v3UgY2jGsGEgbeG7nyDDtCB0aMOsIGThu6tuZywgayBj4buZbmcgdGjDqm0gbuG7r2EsIMSRw6MgdHLDoG4ga2hvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uY291bnQgPT0gMCkgeyAgICAgICAgICAvLyBu4bq/dSBsw6Agw7QgdHLhu5FuZyB0aMOsIHRow6ptIHbDoG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uY291bnQgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5pZF9wcm9kdWN0ID0gcGxhbnRfaW5kZXg7ICAvLyBnw6FuIGlkIGPDonkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmNvdW50IDwzMCAmJiB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5pZF9wcm9kdWN0PT0gcGxhbnRfaW5kZXgpIC8vIGtp4buDbSB0cmEga2hvIGPDuW5nIGxv4bqhaVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uY291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtwbGFudF9pbmRleF0uY291bnQrKzsgLy8gdGjDqm0gduG6rXQgcGjhuqltIHbDoG8ga2hvXG5cblxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmdhbWVfcnVsZXNfanMuamdnKDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uX25vZGVfa2lsbChub2RlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuXG4gICAgY3JlYXRlX2dvbGRfZWZmZWN0KGNyZWF0ZV9ub2RlLCBpbmRleCwgYWRkR29sZCkge1xuICAgICAgICAvL2NyZWF0ZSBub2RlIOWcqOWTquS4quiKgueCuemjnu+8jCBpbmRleCDmlbDph48gLG51beWinuWKoOeahOmHkeW4geaVsOmHj1xuICAgICAgICB2YXIgZ29sZF9pY29uID0gY2MuZmluZChcIlVJX1JPT1QvdG9wL2dvbGQvZ29sZF9pY29uXCIpO1xuICAgICAgICAvL+WwhuWIm+W7uueahOWIneWni+WcsOWdgCDovazmjaLkuLrkuJbnlYzlnZDmoIdcbiAgICAgICAgdmFyIGNfV3BvcyA9IGNyZWF0ZV9ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY3JlYXRlX25vZGUucG9zaXRpb24pO1xuICAgICAgICAvL+i9rOaNouS4uumcgOimgeeahOebuOWvueWdkOagh1xuICAgICAgICB2YXIgY19uUG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGNfV3Bvcyk7XG5cbiAgICAgICAgLy/lsIbpo57lvoDnmoTnm67moIfkvY3nva7ovazkuLrkuJbnlYzlnZDmoIdcbiAgICAgICAgdmFyIHRfV3BvcyA9IGdvbGRfaWNvbi5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGdvbGRfaWNvbi5wb3NpdGlvbik7XG4gICAgICAgIC8v5bCG55uu5qCH5L2N572u6L2s5Li655u45a+55L2N572uXG4gICAgICAgIHZhciB0X05wb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIodF9XcG9zKVxuXG4gICAgICAgIGlmICh0aGlzLm5ld19nb2xkX2VmZmVjdF9wb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5uZXdfZ29sZF9lZmZlY3RfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IGNfblBvcztcbiAgICAgICAgICAgIG5vZGUueSArPSA1MDtcbiAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpXG4gICAgICAgICAgICAgICAgLnRvKChpbmRleCArIDEpIC8gNSwgeyBwb3NpdGlvbjogdF9OcG9zIH0sIHsgZWFzaW5nOiBcInNpbmVJblwiIH0pXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJhZGRfZ29sZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKGFkZEdvbGQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uX25vZGVfa2lsbChub2RlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICB9O1xuXG4gICAgfSxcbiAgICAvL+iKgueCuemUgOavgVxuICAgIG9uX25vZGVfa2lsbDogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgc3dpdGNoIChub2RlLm5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJidXR0b25fbW9yZVwiOlxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX21vcmVfbm9kZV9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwbGFudF91aVwiOlxuICAgICAgICAgICAgICAgIHRoaXMubmV3X3BsYW50X3VpX25vZGVfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic2VsbF91aVwiOlxuICAgICAgICAgICAgICAgIHRoaXMubmV3X3NlbGxfdWlfbm9kZV9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ0aXBzX3VpXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfdGlwc191aV9ub2RlX3Bvb2wucHV0KG5vZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImxpZ2h0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfbGlnaHRfZWZmZWN0X3Bvb2wucHV0KG5vZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInN0dWR5X3VpXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfc3R1ZHlfdWlfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic3RhZmZfdWlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19zdGFmZl91aV9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwZXRfdWlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19wZXRfdWlfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZXhfZWZmZWN0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfZXhfZWZmZWN0X3Bvb2wucHV0KG5vZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImdvbGRfZWZmZWN0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfZ29sZF9lZmZlY3RfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwib3B0aW9uX3VpXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfb3B0aW9uX3VpX3Bvb2wucHV0KG5vZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImhvdGVsX3VpXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfaG90ZWxfdWlfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic2hvcF9idXlfdWlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19zaG9wX2J1eV91aV9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzaG9wX3VpXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfc2hvcF91aV9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ2aWRlb3RhcGVfdWlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld192aWRlb3RhcGVfdWlfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgLy/liJ3lp4vljJboioLngrlcbiAgICBpbmlfbm9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm5ld19idXR0b25fZ3JvdXBfbm9kZV9wb29sKCk7XG4gICAgICAgIHRoaXMubmV3X3BsYW50X3VpX25vZGVfcG9vbCgpO1xuICAgICAgICB0aGlzLm5ld19zZWxsX3VpX25vZGVfcG9vbCgpO1xuICAgICAgICB0aGlzLm5ld190aXBzX3VpX25vZGVfcG9vbCgpO1xuICAgICAgICB0aGlzLm5ld19saWdodF9lZmZlY3RfcG9vbCgpO1xuICAgICAgICB0aGlzLm5ld19zdHVkeV91aV9wb29sKCk7XG4gICAgICAgIHRoaXMubmV3X3N0YWZmX3VpX3Bvb2woKTtcbiAgICAgICAgdGhpcy5uZXdfcGV0X3VpX3Bvb2woKTtcbiAgICAgICAgdGhpcy5uZXdfZXhfZWZmZWN0X3Bvb2woKTtcbiAgICAgICAgdGhpcy5uZXdfb3B0aW9uX3VpX3Bvb2woKTtcbiAgICAgICAgdGhpcy5uZXdfZ29sZF9lZmZlY3RfcG9vbCgpO1xuICAgICAgICB0aGlzLm5ld19ob3RlbF91aV9wb29sKCk7XG4gICAgICAgIHRoaXMubmV3X3Nob3BfYnV5X3VpX3Bvb2woKTtcbiAgICAgICAgdGhpcy5uZXdfc2hvcF91aV9wb29sKCk7XG4gICAgICAgIHRoaXMubmV3X3ZpZGVvdGFwZV91aV9wb29sKCk7XG5cbiAgICB9LFxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5pbmlfbm9kZSgpO1xuICAgIH0sXG5cbiAgICBzdGFydCgpIHtcblxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19