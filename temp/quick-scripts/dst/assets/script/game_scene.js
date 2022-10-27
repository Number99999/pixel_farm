
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


        _this2.game_rules_js.jgg(1);

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
    cc.log(node.name, "放入节点池");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lX3NjZW5lLmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImJ1dHRvbl9ncm91cF9wcmVmYWIiLCJQcmVmYWIiLCJwbGFudF91aV9wcmVmYWIiLCJzZWxsX3VpX3ByZWZhYiIsInRpcHNfdWlfcHJlZmFiIiwibGlnaHRfZWZmZWN0X3ByZWZhYiIsInN0dWR5X3VpX3ByZWZhYiIsInN0YWZmX3VpX3ByZWZhYiIsIm9mZmxpbmVfcHJvZml0X3VpX3ByZWZhYiIsInBldF91aV9wcmVmYWIiLCJhZF9jYXJfcHJlZmFiIiwiYnV0dG9uX3RpcHNfcHJlZmFiIiwicmVzdF91aV9wcmVmYWIiLCJwZXRfcHJlZmFiX2FyciIsImV4X2VmZmVjdF9wcmVmYWIiLCJnaWZ0X3VpX3ByZWZhYiIsIm9wdGlvbl91aV9wcmVmYWIiLCJnb2xkX2VmZmVjdF9wcmVmYWIiLCJub3ZpY2VfdWlfcHJlZmFiIiwiaG90ZWxfdWlfcHJlZmFiIiwic2hvcF91aV9wcmVmYWIiLCJzaG9wX2J1eV91aV9wcmVmYWIiLCJ2aWRlb3RhcGVfdWlfcHJlZmFiIiwibmV3X2J1dHRvbl9ncm91cF9ub2RlX3Bvb2wiLCJidXR0b25fbW9yZV9ub2RlX3Bvb2wiLCJOb2RlUG9vbCIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsInB1dCIsIm5ld19wbGFudF91aV9ub2RlX3Bvb2wiLCJuZXdfdmlkZW90YXBlX3VpX3Bvb2wiLCJuZXdfc2VsbF91aV9ub2RlX3Bvb2wiLCJuZXdfdGlwc191aV9ub2RlX3Bvb2wiLCJjb3VudCIsImkiLCJuZXdfbGlnaHRfZWZmZWN0X3Bvb2wiLCJuZXdfc3R1ZHlfdWlfcG9vbCIsIm5ld19zdGFmZl91aV9wb29sIiwibmV3X3BldF91aV9wb29sIiwibmV3X2V4X2VmZmVjdF9wb29sIiwibmV3X2dvbGRfZWZmZWN0X3Bvb2wiLCJuZXdfb3B0aW9uX3VpX3Bvb2wiLCJuZXdfaG90ZWxfdWlfcG9vbCIsIm5ld19zaG9wX3VpX3Bvb2wiLCJuZXdfc2hvcF9idXlfdWlfcG9vbCIsImNyZWF0ZV9idXR0b25fZ3JvdXAiLCJwYXJlbnROb2RlIiwic2l6ZSIsImdldCIsInBhcmVudCIsImNyZWF0ZV9wbGFudF91aSIsImNyZWF0ZV9zZWxsX3VpIiwiY3JlYXRlX3RpcHNfdWkiLCJ0eXBlIiwibnVtIiwiZ2V0Q29tcG9uZW50IiwiaW5pX25vZGUiLCJjcmVhdGVfc3R1ZHlfdWkiLCJjcmVhdGVfc3RhZmZfdWkiLCJjcmVhdGVfb2ZmbGluZV9wcm9maXRfdWkiLCJjcmVhdGVfcGV0X3VpIiwiY3JlYXRlX2FkX2NhciIsInByaWNlX2RpZmZlcmVuY2UiLCJjcmVhdGVfYnV0dG9uX3RpcHMiLCJwb3NpdGlvbl90YXJnZXQiLCJ4IiwiYWN0aXZlIiwiY3JlYXRlX3Jlc3RfdWkiLCJzdGFmZl9pbmRleCIsImNyZWF0ZV9naWZ0X3VpIiwiY3JlYXRlX3BldCIsImluZGV4IiwiY3JlYXRlX29wdGlvbl91aSIsImNyZWF0ZV9ub3ZpY2VfdWkiLCJjcmVhdGVfaG90ZWxfdWkiLCJjcmVhdGVfc2hvcF9idXlfdWkiLCJzcHJpdGVGcmFtZSIsImNyZWF0ZV9zaG9wX3VpIiwiY3JlYXRlX3ZpZGVvdGFwZV91aSIsImNyZWF0ZV9leF9lZmZlY3QiLCJjcmVhdGVfbm9kZSIsImxldmVsX2ljb24iLCJmaW5kIiwiY19XcG9zIiwiY29udmVydFRvV29ybGRTcGFjZUFSIiwicG9zaXRpb24iLCJjX25Qb3MiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsInRfV3BvcyIsInRfTnBvcyIsInR3ZWVuIiwidG8iLCJlYXNpbmciLCJjYWxsIiwic291bmRfY29udHJvbCIsInBsYXlfc291bmRfZWZmZWN0IiwiZ2FtZV9ydWxlc19qcyIsImFkZF9leCIsIm9uX25vZGVfa2lsbCIsInN0YXJ0IiwiY3JlYXRlX2xpZ2h0X2VmZmVjdCIsInBsYW50X2luZGV4Iiwic2VsbCIsImRlbGF5IiwiYWxsX2NhcGFjaXR5Iiwid2FyZUhvdXNlX2xldmVsIiwiY29uZmlnIiwid2FyZUhvdXNlIiwiaGF2ZSIsImlkX3Byb2R1Y3QiLCJqZ2ciLCJjcmVhdGVfZ29sZF9lZmZlY3QiLCJhZGRHb2xkIiwiZ29sZF9pY29uIiwieSIsImFkZF9nb2xkIiwibmFtZSIsImxvZyIsIm9uTG9hZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7OztBQURBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBRUFDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxtQkFBbUIsRUFBRUosRUFBRSxDQUFDSyxNQURoQjtBQUVSQyxJQUFBQSxlQUFlLEVBQUVOLEVBQUUsQ0FBQ0ssTUFGWjtBQUdSRSxJQUFBQSxjQUFjLEVBQUVQLEVBQUUsQ0FBQ0ssTUFIWDtBQUlSRyxJQUFBQSxjQUFjLEVBQUVSLEVBQUUsQ0FBQ0ssTUFKWDtBQUtSSSxJQUFBQSxtQkFBbUIsRUFBRVQsRUFBRSxDQUFDSyxNQUxoQjtBQU1SSyxJQUFBQSxlQUFlLEVBQUVWLEVBQUUsQ0FBQ0ssTUFOWjtBQU9STSxJQUFBQSxlQUFlLEVBQUVYLEVBQUUsQ0FBQ0ssTUFQWjtBQVFSTyxJQUFBQSx3QkFBd0IsRUFBRVosRUFBRSxDQUFDSyxNQVJyQjtBQVNSUSxJQUFBQSxhQUFhLEVBQUViLEVBQUUsQ0FBQ0ssTUFUVjtBQVVSUyxJQUFBQSxhQUFhLEVBQUVkLEVBQUUsQ0FBQ0ssTUFWVjtBQVdSVSxJQUFBQSxrQkFBa0IsRUFBRWYsRUFBRSxDQUFDSyxNQVhmO0FBWVJXLElBQUFBLGNBQWMsRUFBRWhCLEVBQUUsQ0FBQ0ssTUFaWDtBQWFSWSxJQUFBQSxjQUFjLEVBQUUsQ0FBQ2pCLEVBQUUsQ0FBQ0ssTUFBSixDQWJSO0FBY1JhLElBQUFBLGdCQUFnQixFQUFFbEIsRUFBRSxDQUFDSyxNQWRiO0FBZVJjLElBQUFBLGNBQWMsRUFBRW5C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RUFBQUEsTUF6Ykssb0JBeWJJO0FBQ0wsU0FBS3RCLGFBQUwsR0FBcUJwRyxFQUFFLENBQUNzRixJQUFILENBQVEsU0FBUixFQUFtQjNCLFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0EsU0FBS3VDLGFBQUwsR0FBcUJsRyxFQUFFLENBQUNzRixJQUFILENBQVEsZUFBUixFQUF5QjNCLFlBQXpCLENBQXNDLGVBQXRDLENBQXJCO0FBQ0EsU0FBS0MsUUFBTDtBQUNILEdBN2JJO0FBK2JMMkMsRUFBQUEsS0EvYkssbUJBK2JHLENBRVAsQ0FqY0ksQ0FtY0w7O0FBbmNLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiY29uZmlnXCI7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBidXR0b25fZ3JvdXBfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIHBsYW50X3VpX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBzZWxsX3VpX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICB0aXBzX3VpX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBsaWdodF9lZmZlY3RfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIHN0dWR5X3VpX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBzdGFmZl91aV9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgb2ZmbGluZV9wcm9maXRfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIHBldF91aV9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgYWRfY2FyX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBidXR0b25fdGlwc19wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgcmVzdF91aV9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgcGV0X3ByZWZhYl9hcnI6IFtjYy5QcmVmYWJdLFxuICAgICAgICBleF9lZmZlY3RfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIGdpZnRfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIG9wdGlvbl91aV9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgZ29sZF9lZmZlY3RfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIG5vdmljZV91aV9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgaG90ZWxfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIHNob3BfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIHNob3BfYnV5X3VpX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICB2aWRlb3RhcGVfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgfSxcblxuICAgIC8v5Yib5bu65oyJ6ZKu57uE55qE6IqC54K55rGgXG4gICAgbmV3X2J1dHRvbl9ncm91cF9ub2RlX3Bvb2w6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5idXR0b25fbW9yZV9ub2RlX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJ1dHRvbl9ncm91cF9wcmVmYWIpO1xuICAgICAgICB0aGlzLmJ1dHRvbl9tb3JlX25vZGVfcG9vbC5wdXQobm9kZSk7XG4gICAgfSxcbiAgICAvL1xuICAgIG5ld19wbGFudF91aV9ub2RlX3Bvb2w6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5uZXdfcGxhbnRfdWlfbm9kZV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGFudF91aV9wcmVmYWIpO1xuICAgICAgICB0aGlzLm5ld19wbGFudF91aV9ub2RlX3Bvb2wucHV0KG5vZGUpO1xuICAgIH0sXG4gICAgbmV3X3ZpZGVvdGFwZV91aV9wb29sOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubmV3X3ZpZGVvdGFwZV91aV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy52aWRlb3RhcGVfdWlfcHJlZmFiKTtcbiAgICAgICAgdGhpcy5uZXdfdmlkZW90YXBlX3VpX3Bvb2wucHV0KG5vZGUpO1xuICAgIH0sXG4gICAgbmV3X3NlbGxfdWlfbm9kZV9wb29sOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubmV3X3NlbGxfdWlfbm9kZV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zZWxsX3VpX3ByZWZhYik7XG4gICAgICAgIHRoaXMubmV3X3NlbGxfdWlfbm9kZV9wb29sLnB1dChub2RlKTtcbiAgICB9LFxuICAgIG5ld190aXBzX3VpX25vZGVfcG9vbDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY291bnQgPSA1O1xuICAgICAgICB0aGlzLm5ld190aXBzX3VpX25vZGVfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy50aXBzX3VpX3ByZWZhYik7XG4gICAgICAgICAgICB0aGlzLm5ld190aXBzX3VpX25vZGVfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBuZXdfbGlnaHRfZWZmZWN0X3Bvb2w6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvdW50ID0gODtcbiAgICAgICAgdGhpcy5uZXdfbGlnaHRfZWZmZWN0X3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubGlnaHRfZWZmZWN0X3ByZWZhYik7XG4gICAgICAgICAgICB0aGlzLm5ld19saWdodF9lZmZlY3RfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBuZXdfc3R1ZHlfdWlfcG9vbDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm5ld19zdHVkeV91aV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdHVkeV91aV9wcmVmYWIpO1xuICAgICAgICB0aGlzLm5ld19zdHVkeV91aV9wb29sLnB1dChub2RlKTtcbiAgICB9LFxuICAgIG5ld19zdGFmZl91aV9wb29sOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubmV3X3N0YWZmX3VpX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnN0YWZmX3VpX3ByZWZhYik7XG4gICAgICAgIHRoaXMubmV3X3N0YWZmX3VpX3Bvb2wucHV0KG5vZGUpO1xuICAgIH0sXG4gICAgbmV3X3BldF91aV9wb29sOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubmV3X3BldF91aV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wZXRfdWlfcHJlZmFiKTtcbiAgICAgICAgdGhpcy5uZXdfcGV0X3VpX3Bvb2wucHV0KG5vZGUpO1xuICAgIH0sXG4gICAgbmV3X2V4X2VmZmVjdF9wb29sKCkge1xuICAgICAgICB0aGlzLm5ld19leF9lZmZlY3RfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5leF9lZmZlY3RfcHJlZmFiKTtcbiAgICAgICAgICAgIHRoaXMubmV3X2V4X2VmZmVjdF9wb29sLnB1dChub2RlKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG5ld19nb2xkX2VmZmVjdF9wb29sKCkge1xuICAgICAgICB0aGlzLm5ld19nb2xkX2VmZmVjdF9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmdvbGRfZWZmZWN0X3ByZWZhYik7XG4gICAgICAgICAgICB0aGlzLm5ld19nb2xkX2VmZmVjdF9wb29sLnB1dChub2RlKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG5ld19vcHRpb25fdWlfcG9vbCgpIHtcbiAgICAgICAgdGhpcy5uZXdfb3B0aW9uX3VpX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm9wdGlvbl91aV9wcmVmYWIpO1xuICAgICAgICB0aGlzLm5ld19vcHRpb25fdWlfcG9vbC5wdXQobm9kZSk7XG4gICAgfSxcbiAgICBuZXdfaG90ZWxfdWlfcG9vbCgpIHtcbiAgICAgICAgdGhpcy5uZXdfaG90ZWxfdWlfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaG90ZWxfdWlfcHJlZmFiKTtcbiAgICAgICAgdGhpcy5uZXdfaG90ZWxfdWlfcG9vbC5wdXQobm9kZSk7XG4gICAgfSxcbiAgICBuZXdfc2hvcF91aV9wb29sKCkge1xuICAgICAgICB0aGlzLm5ld19zaG9wX3VpX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnNob3BfdWlfcHJlZmFiKTtcbiAgICAgICAgdGhpcy5uZXdfc2hvcF91aV9wb29sLnB1dChub2RlKTtcbiAgICB9LFxuICAgIG5ld19zaG9wX2J1eV91aV9wb29sKCkge1xuICAgICAgICB0aGlzLm5ld19zaG9wX2J1eV91aV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zaG9wX2J1eV91aV9wcmVmYWIpO1xuICAgICAgICB0aGlzLm5ld19zaG9wX2J1eV91aV9wb29sLnB1dChub2RlKTtcbiAgICB9LFxuICAgIC8vXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvL+WIm+W7uuaMiemSrue7hFxuICAgIGNyZWF0ZV9idXR0b25fZ3JvdXA6IGZ1bmN0aW9uIChwYXJlbnROb2RlKSB7XG4gICAgICAgIHZhciBub2RlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuYnV0dG9uX21vcmVfbm9kZV9wb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLmJ1dHRvbl9tb3JlX25vZGVfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSxcbiAgICBjcmVhdGVfcGxhbnRfdWk6IGZ1bmN0aW9uIChwYXJlbnROb2RlKSB7XG4gICAgICAgIHZhciBub2RlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMubmV3X3BsYW50X3VpX25vZGVfcG9vbC5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgICBub2RlID0gdGhpcy5uZXdfcGxhbnRfdWlfbm9kZV9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuICAgIGNyZWF0ZV9zZWxsX3VpOiBmdW5jdGlvbiAocGFyZW50Tm9kZSkge1xuICAgICAgICB2YXIgbm9kZSA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLm5ld19zZWxsX3VpX25vZGVfcG9vbC5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgICBub2RlID0gdGhpcy5uZXdfc2VsbF91aV9ub2RlX3Bvb2wuZ2V0KCk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH0sXG4gICAgY3JlYXRlX3RpcHNfdWk6IGZ1bmN0aW9uIChwYXJlbnROb2RlLCB0eXBlLCBudW0pIHtcbiAgICAgICAgdmFyIG5vZGUgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5uZXdfdGlwc191aV9ub2RlX3Bvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMubmV3X3RpcHNfdWlfbm9kZV9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJ0aXBzX3VpXCIpLmluaV9ub2RlKHR5cGUsIG51bSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjcmVhdGVfc3R1ZHlfdWk6IGZ1bmN0aW9uIChwYXJlbnROb2RlKSB7XG4gICAgICAgIHZhciBub2RlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMubmV3X3N0dWR5X3VpX3Bvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMubmV3X3N0dWR5X3VpX3Bvb2wuZ2V0KCk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH0sXG4gICAgY3JlYXRlX3N0YWZmX3VpOiBmdW5jdGlvbiAocGFyZW50Tm9kZSkge1xuICAgICAgICB2YXIgbm9kZSA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLm5ld19zdGFmZl91aV9wb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLm5ld19zdGFmZl91aV9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuICAgIGNyZWF0ZV9vZmZsaW5lX3Byb2ZpdF91aTogZnVuY3Rpb24gKHBhcmVudE5vZGUpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm9mZmxpbmVfcHJvZml0X3VpX3ByZWZhYik7XG4gICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJvZmZsaW5lX3Byb2ZpdFwiKS5pbmlfbm9kZSgpO1xuICAgIH0sXG4gICAgY3JlYXRlX3BldF91aTogZnVuY3Rpb24gKHBhcmVudE5vZGUpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5uZXdfcGV0X3VpX3Bvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMubmV3X3BldF91aV9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuICAgIGNyZWF0ZV9hZF9jYXIocGFyZW50Tm9kZSwgcHJpY2VfZGlmZmVyZW5jZSkge1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYWRfY2FyX3ByZWZhYilcbiAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgICAgICBub2RlLmdldENvbXBvbmVudChcImFkX2NhclwiKS5pbmlfbm9kZShwcmljZV9kaWZmZXJlbmNlKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSxcbiAgICAvL+eItuiKgueCue+8jOaPkOekuueCueexu+Wei++8jOebruagh+S9jee9rlxuICAgIGNyZWF0ZV9idXR0b25fdGlwcyhwYXJlbnROb2RlLCBwb3NpdGlvbl90YXJnZXQpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJ1dHRvbl90aXBzX3ByZWZhYik7XG4gICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgbm9kZS54ID0gcG9zaXRpb25fdGFyZ2V0Lng7XG4gICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfSxcbiAgICBjcmVhdGVfcmVzdF91aShwYXJlbnROb2RlLCBzdGFmZl9pbmRleCkge1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucmVzdF91aV9wcmVmYWIpO1xuICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwicmVzdF91aVwiKS5pbmlfbm9kZShzdGFmZl9pbmRleCk7XG4gICAgfSxcbiAgICBjcmVhdGVfZ2lmdF91aShwYXJlbnROb2RlKSB7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5naWZ0X3VpX3ByZWZhYik7XG4gICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJnaWZ0X3VpXCIpLmluaV9ub2RlKCk7XG4gICAgfSxcbiAgICBjcmVhdGVfcGV0KHBhcmVudE5vZGUsIGluZGV4KSB7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wZXRfcHJlZmFiX2FycltpbmRleF0pO1xuICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XG4gICAgfSxcbiAgICBjcmVhdGVfb3B0aW9uX3VpKCkge1xuICAgICAgICBpZiAodGhpcy5uZXdfb3B0aW9uX3VpX3Bvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5ld19vcHRpb25fdWlfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJvcHRpb25fdWlcIikuaW5pX25vZGUoKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGNyZWF0ZV9ub3ZpY2VfdWkoKSB7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5ub3ZpY2VfdWlfcHJlZmFiKTtcbiAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwibm92aWNlX3VpXCIpLmluaV9ub2RlKCk7XG4gICAgfSxcbiAgICBjcmVhdGVfaG90ZWxfdWkoKSB7XG4gICAgICAgIGlmICh0aGlzLm5ld19ob3RlbF91aV9wb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5uZXdfaG90ZWxfdWlfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJob3RlbF91aVwiKS5pbmlfbm9kZSgpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgY3JlYXRlX3Nob3BfYnV5X3VpKHR5cGUsIGluZGV4LCBzcHJpdGVGcmFtZSkge1xuICAgICAgICAvL+eJqeWTgeexu+Wei++8jOeJqeWTgee8luWPt++8jOeJqeWTgeeahOWbvueJh1xuICAgICAgICBpZiAodGhpcy5uZXdfc2hvcF9idXlfdWlfcG9vbC5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubmV3X3Nob3BfYnV5X3VpX3Bvb2wuZ2V0KCk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic2hvcF9idXlfdWlcIikuaW5pX25vZGUodHlwZSwgaW5kZXgsIHNwcml0ZUZyYW1lKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGNyZWF0ZV9zaG9wX3VpKCkge1xuICAgICAgICBpZiAodGhpcy5uZXdfc2hvcF91aV9wb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5uZXdfc2hvcF91aV9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInNob3BfdWlcIikuaW5pX25vZGUoKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGNyZWF0ZV92aWRlb3RhcGVfdWkoKSB7XG4gICAgICAgIGlmICh0aGlzLm5ld192aWRlb3RhcGVfdWlfcG9vbC5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubmV3X3ZpZGVvdGFwZV91aV9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInZpZGVvdGFwZV91aVwiKS5pbmlfbm9kZSgpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgY3JlYXRlX2V4X2VmZmVjdChjcmVhdGVfbm9kZSwgaW5kZXgpIHtcblxuICAgICAgICAvL+WcqOWTquS4quiKgueCuei/m+ihjOWIm+W7uu+8jOWIm+W7uueahOesrOWHoOS4qlxuICAgICAgICAvL2NyZWF0ZV9ub2RlICwgaW5kZXhcbiAgICAgICAgdmFyIGxldmVsX2ljb24gPSBjYy5maW5kKFwiVUlfUk9PVC90b3AvbGV2ZWwvbGV2ZWxfaWNvblwiKTtcbiAgICAgICAgLy/lsIbliJvlu7rnmoTliJ3lp4vlnLDlnYAg6L2s5o2i5Li65LiW55WM5Z2Q5qCHXG4gICAgICAgIHZhciBjX1dwb3MgPSBjcmVhdGVfbm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGNyZWF0ZV9ub2RlLnBvc2l0aW9uKTtcbiAgICAgICAgLy/ovazmjaLkuLrpnIDopoHnmoTnm7jlr7nlnZDmoIdcbiAgICAgICAgdmFyIGNfblBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihjX1dwb3MpO1xuXG4gICAgICAgIC8v5bCG6aOe5b6A55qE55uu5qCH5L2N572u6L2s5Li65LiW55WM5Z2Q5qCHXG4gICAgICAgIHZhciB0X1dwb3MgPSBsZXZlbF9pY29uLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIobGV2ZWxfaWNvbi5wb3NpdGlvbik7XG4gICAgICAgIC8v5bCG55uu5qCH5L2N572u6L2s5Li655u45a+55L2N572uXG4gICAgICAgIHZhciB0X05wb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIodF9XcG9zKVxuXG5cbiAgICAgICAgaWYgKHRoaXMubmV3X2V4X2VmZmVjdF9wb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5uZXdfZXhfZWZmZWN0X3Bvb2wuZ2V0KCk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBjX25Qb3M7XG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKVxuICAgICAgICAgICAgICAgIC50bygoaW5kZXggKyAxKSAvIDUsIHsgcG9zaXRpb246IHRfTnBvcyB9LCB7IGVhc2luZzogXCJzaW5lSW5cIiB9KVxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYWRkX2V4XCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2V4KDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uX25vZGVfa2lsbChub2RlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/mlLblibLnibnmlYhcbiAgICBjcmVhdGVfbGlnaHRfZWZmZWN0KGNyZWF0ZV9ub2RlLCBpbmRleCwgcGxhbnRfaW5kZXgpIHtcbiAgICAgICAgLy/lnKjlk6rkuKroioLngrnov5vooYzliJvlu7rvvIzliJvlu7rnmoTnrKzlh6DkuKog56eN5a2Q57yW5Y+3XG4gICAgICAgIHZhciBzZWxsID0gY2MuZmluZChcIlVJX1JPT1QvY2VudGVyL2J1aWxkL3NlbGxcIik7XG4gICAgICAgIC8v5bCG5Yib5bu655qE5Yid5aeL5Zyw5Z2AIOi9rOaNouS4uuS4lueVjOWdkOagh1xuICAgICAgICB2YXIgY19XcG9zID0gY3JlYXRlX25vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjcmVhdGVfbm9kZS5wb3NpdGlvbik7XG4gICAgICAgIC8v6L2s5o2i5Li66ZyA6KaB55qE55u45a+55Z2Q5qCHXG4gICAgICAgIHZhciBjX25Qb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoY19XcG9zKTtcblxuICAgICAgICAvL+WwhumjnuW+gOeahOebruagh+S9jee9rui9rOS4uuS4lueVjOWdkOagh1xuICAgICAgICB2YXIgdF9XcG9zID0gc2VsbC5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHNlbGwucG9zaXRpb24pO1xuICAgICAgICAvL+Wwhuebruagh+S9jee9rui9rOS4uuebuOWvueS9jee9rlxuICAgICAgICB2YXIgdF9OcG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRfV3BvcylcblxuICAgICAgICBpZiAodGhpcy5uZXdfbGlnaHRfZWZmZWN0X3Bvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5ld19saWdodF9lZmZlY3RfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IGNfblBvcztcbiAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpXG4gICAgICAgICAgICAgICAgLmRlbGF5KDEpXG4gICAgICAgICAgICAgICAgLnRvKChpbmRleCArIDEpIC8gNSwgeyBwb3NpdGlvbjogdF9OcG9zIH0sIHsgZWFzaW5nOiBcInNpbmVJblwiIH0pXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJhZGRfZXhcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhbGxfY2FwYWNpdHkgPSB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZV9sZXZlbCAqIGNvbmZpZy53YXJlSG91c2VbXCJhbGxfY2FwYWNpdHlcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE1OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uaGF2ZSA9PSAwKSBicmVhazsgICAgICAvLyBu4bq/dSBjaMawYSBt4bufIMO0IHRow6wgZOG7q25nLCBrIGPhu5luZyB0aMOqbSBu4buvYSwgxJHDoyB0csOgbiBraG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3VudCA9PSAwKSB7ICAgICAgICAgIC8vIG7hur91IGzDoCDDtCB0cuG7kW5nIHRow6wgdGjDqm0gdsOgb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3VudCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmlkX3Byb2R1Y3QgPSBwbGFudF9pbmRleDsgIC8vIGfDoW4gaWQgY8OieSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uY291bnQgPDMwICYmIHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmlkX3Byb2R1Y3Q9PSBwbGFudF9pbmRleCkgLy8ga2nhu4NtIHRyYSBraG8gY8O5bmcgbG/huqFpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW3BsYW50X2luZGV4XS5jb3VudCsrOyAvLyB0aMOqbSB24bqtdCBwaOG6qW0gdsOgbyBraG9cblxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5qZ2coMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25fbm9kZV9raWxsKG5vZGUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH0sXG5cbiAgICBjcmVhdGVfZ29sZF9lZmZlY3QoY3JlYXRlX25vZGUsIGluZGV4LCBhZGRHb2xkKSB7XG4gICAgICAgIC8vY3JlYXRlIG5vZGUg5Zyo5ZOq5Liq6IqC54K56aOe77yMIGluZGV4IOaVsOmHjyAsbnVt5aKe5Yqg55qE6YeR5biB5pWw6YePXG4gICAgICAgIHZhciBnb2xkX2ljb24gPSBjYy5maW5kKFwiVUlfUk9PVC90b3AvZ29sZC9nb2xkX2ljb25cIik7XG4gICAgICAgIC8v5bCG5Yib5bu655qE5Yid5aeL5Zyw5Z2AIOi9rOaNouS4uuS4lueVjOWdkOagh1xuICAgICAgICB2YXIgY19XcG9zID0gY3JlYXRlX25vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjcmVhdGVfbm9kZS5wb3NpdGlvbik7XG4gICAgICAgIC8v6L2s5o2i5Li66ZyA6KaB55qE55u45a+55Z2Q5qCHXG4gICAgICAgIHZhciBjX25Qb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoY19XcG9zKTtcblxuICAgICAgICAvL+WwhumjnuW+gOeahOebruagh+S9jee9rui9rOS4uuS4lueVjOWdkOagh1xuICAgICAgICB2YXIgdF9XcG9zID0gZ29sZF9pY29uLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoZ29sZF9pY29uLnBvc2l0aW9uKTtcbiAgICAgICAgLy/lsIbnm67moIfkvY3nva7ovazkuLrnm7jlr7nkvY3nva5cbiAgICAgICAgdmFyIHRfTnBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0X1dwb3MpXG5cbiAgICAgICAgaWYgKHRoaXMubmV3X2dvbGRfZWZmZWN0X3Bvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5ld19nb2xkX2VmZmVjdF9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gY19uUG9zO1xuICAgICAgICAgICAgbm9kZS55ICs9IDUwO1xuICAgICAgICAgICAgY2MudHdlZW4obm9kZSlcbiAgICAgICAgICAgICAgICAudG8oKGluZGV4ICsgMSkgLyA1LCB7IHBvc2l0aW9uOiB0X05wb3MgfSwgeyBlYXNpbmc6IFwic2luZUluXCIgfSlcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImFkZF9nb2xkXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2dvbGQoYWRkR29sZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25fbm9kZV9raWxsKG5vZGUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgIH07XG5cbiAgICB9LFxuICAgIC8v6IqC54K56ZSA5q+BXG4gICAgb25fbm9kZV9raWxsOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBzd2l0Y2ggKG5vZGUubmFtZSkge1xuICAgICAgICAgICAgY2FzZSBcImJ1dHRvbl9tb3JlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25fbW9yZV9ub2RlX3Bvb2wucHV0KG5vZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBsYW50X3VpXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfcGxhbnRfdWlfbm9kZV9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzZWxsX3VpXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfc2VsbF91aV9ub2RlX3Bvb2wucHV0KG5vZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInRpcHNfdWlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld190aXBzX3VpX25vZGVfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibGlnaHRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19saWdodF9lZmZlY3RfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic3R1ZHlfdWlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19zdHVkeV91aV9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzdGFmZl91aVwiOlxuICAgICAgICAgICAgICAgIHRoaXMubmV3X3N0YWZmX3VpX3Bvb2wucHV0KG5vZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBldF91aVwiOlxuICAgICAgICAgICAgICAgIHRoaXMubmV3X3BldF91aV9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJleF9lZmZlY3RcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19leF9lZmZlY3RfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZ29sZF9lZmZlY3RcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19nb2xkX2VmZmVjdF9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJvcHRpb25fdWlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19vcHRpb25fdWlfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiaG90ZWxfdWlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19ob3RlbF91aV9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzaG9wX2J1eV91aVwiOlxuICAgICAgICAgICAgICAgIHRoaXMubmV3X3Nob3BfYnV5X3VpX3Bvb2wucHV0KG5vZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInNob3BfdWlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19zaG9wX3VpX3Bvb2wucHV0KG5vZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInZpZGVvdGFwZV91aVwiOlxuICAgICAgICAgICAgICAgIHRoaXMubmV3X3ZpZGVvdGFwZV91aV9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgICAgICBjYy5sb2cobm9kZS5uYW1lLCBcIuaUvuWFpeiKgueCueaxoFwiKTtcbiAgICB9LFxuICAgIC8v5Yid5aeL5YyW6IqC54K5XG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5uZXdfYnV0dG9uX2dyb3VwX25vZGVfcG9vbCgpO1xuICAgICAgICB0aGlzLm5ld19wbGFudF91aV9ub2RlX3Bvb2woKTtcbiAgICAgICAgdGhpcy5uZXdfc2VsbF91aV9ub2RlX3Bvb2woKTtcbiAgICAgICAgdGhpcy5uZXdfdGlwc191aV9ub2RlX3Bvb2woKTtcbiAgICAgICAgdGhpcy5uZXdfbGlnaHRfZWZmZWN0X3Bvb2woKTtcbiAgICAgICAgdGhpcy5uZXdfc3R1ZHlfdWlfcG9vbCgpO1xuICAgICAgICB0aGlzLm5ld19zdGFmZl91aV9wb29sKCk7XG4gICAgICAgIHRoaXMubmV3X3BldF91aV9wb29sKCk7XG4gICAgICAgIHRoaXMubmV3X2V4X2VmZmVjdF9wb29sKCk7XG4gICAgICAgIHRoaXMubmV3X29wdGlvbl91aV9wb29sKCk7XG4gICAgICAgIHRoaXMubmV3X2dvbGRfZWZmZWN0X3Bvb2woKTtcbiAgICAgICAgdGhpcy5uZXdfaG90ZWxfdWlfcG9vbCgpO1xuICAgICAgICB0aGlzLm5ld19zaG9wX2J1eV91aV9wb29sKCk7XG4gICAgICAgIHRoaXMubmV3X3Nob3BfdWlfcG9vbCgpO1xuICAgICAgICB0aGlzLm5ld192aWRlb3RhcGVfdWlfcG9vbCgpO1xuXG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuaW5pX25vZGUoKTtcbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==