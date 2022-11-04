"use strict";
cc._RF.push(module, '8c435CdPS9LHbOArU9nIMku', 'staff_ui');
// script/ui/staff_ui.js

"use strict";

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    staff_group_node: cc.Node,
    staff_content_prefab: cc.Prefab,
    have_tips_group: cc.Node,
    buy_tips_group: cc.Node
  },
  //
  ini_node: function ini_node() {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.update_buy_tips();
    this.set_icon();
  },
  //
  set_icon: function set_icon() {
    for (var i = 0; i < this.staff_group_node.children.length; i++) {
      if (user_data.user_data.land[i].have == 1) {
        this.staff_group_node.children[i].color = new cc.color(255, 255, 255);
        this.staff_group_node.children[i].getComponent(cc.Button).interactable = true;

        if (user_data.user_data.staff[i].have == 1) {
          this.have_tips_group.children[i].active = true;
        }

        ;
      } else {
        this.staff_group_node.children[i].color = new cc.color(0, 0, 0);
        this.staff_group_node.children[i].getComponent(cc.Button).interactable = false;
        ;
        this.have_tips_group.children[i].active = false;
      }

      ;
    }

    ;
  },
  //刷新购买提示
  update_buy_tips: function update_buy_tips() {
    var arr = Object.keys(user_data.user_data.land);

    for (var i = 0; i < arr.length; i++) {
      //已解锁土地 金币满足，且未拥有才会显示
      if (user_data.user_data.land[i].have == 1 && user_data.user_data.gold >= _config["default"].staff[i].cost && user_data.user_data.staff[i].have == 0) {
        this.buy_tips_group.children[i].active = true;
      } else {
        this.buy_tips_group.children[i].active = false;
      }

      ;
    }

    ;
  },
  //刷新数据定时器
  update_schedule: function update_schedule() {
    var callback = function callback() {
      this.update_buy_tips();
      this.set_icon();
    };

    this.schedule(callback, 0.5);
  },
  //
  on_staff_click: function on_staff_click(e, staff_index) {
    this.sound_control.play_sound_effect("button_click");
    var node = cc.instantiate(this.staff_content_prefab);
    node.getComponent("staff_content").ini_node(staff_index);
    node.parent = this.node;
  },
  touch_exit: function touch_exit() {
    this.sound_control.play_sound_effect("button_exit");
    this.game_scene_js.on_node_kill(this.node);
  },
  onLoad: function onLoad() {},
  start: function start() {
    this.update_schedule();
  } // update (dt) {},

});

cc._RF.pop();