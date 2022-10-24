"use strict";
cc._RF.push(module, 'f2791mzrUZGEJbaCM5hzs1f', 'novice_ui');
// script/ui/novice_ui.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    talk_group: cc.Node,
    paper_node: cc.Node,
    exit_button_node: cc.Node,
    title_node: cc.Node
  },
  //ini_node
  ini_node: function ini_node() {
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.exit_button_node.active = false;
    this.title_node.active = false;

    for (var i = 0; i < this.talk_group.children.length; i++) {
      this.talk_group.children[i].opacity = 0;
    }

    ;
    this.talk_count = 0;
    this.paper_node.height = 505;
    this.ini_paper_anim();
  },
  //纸动画
  ini_paper_anim: function ini_paper_anim() {
    var _this = this;

    cc.tween(this.paper_node).to(0.3, {
      height: 1042
    }, {
      easing: "sineIn"
    }).call(function () {
      _this.title_node.active = true;

      _this.ini_talk_anim();

      _this.show_exit_button_node();
    }).start();
  },
  //ini anim
  ini_talk_anim: function ini_talk_anim() {
    var callback = function callback() {
      this.talk_group.children[this.talk_count].opacity = 255;
      this.talk_count++;

      if (this.talk_count >= this.talk_group.children.length) {
        return;
      }

      ;
      this.ini_talk_anim();
    };

    this.scheduleOnce(callback, 0.2);
  },
  show_exit_button_node: function show_exit_button_node() {
    var _this2 = this;

    this.scheduleOnce(function () {
      _this2.exit_button_node.active = true;
    }, 1.5);
  },
  //退出按钮
  on_exit_button_click: function on_exit_button_click() {
    this.sound_control.play_sound_effect("button_exit");
    this.node.destroy();
  },
  // onLoad () {},
  start: function start() {} // update (dt) {},

});

cc._RF.pop();