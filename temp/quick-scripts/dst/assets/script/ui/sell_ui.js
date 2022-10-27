
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/sell_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b3408LFwupOPKoN9Pojb+Zi', 'sell_ui');
// script/ui/sell_ui.js

"use strict";

var user_data = require("user_data");

var config = require("config");

cc.Class({
  "extends": cc.Component,
  properties: {
    box_frame_arr: [cc.SpriteFrame],
    icon_group_node: cc.Node,
    label_group_node: cc.Node,
    // estimate_label: cc.Label,
    lock_group_node: cc.Node,
    confirm_button_node: cc.Node,
    sum_gold: 0,
    index: 0
  },
  // LIFE-CYCLE CALLBACKS:
  ini_node: function ini_node() {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control.show_bannerAd();
    this.set_sell(); // this.set_estimate_label();
  },
  button_unlock_click: function button_unlock_click(e, custom) {
    // button unlock repo
    this.node.children[2].active = false; // show POP-UP open new repo

    this.node.children[3].active = true; // hidden repo

    this.show_comfirm_buy(custom);
  },
  show_comfirm_buy: function show_comfirm_buy(custom) {
    // hiển thị số tiền để mua rương, thêm nút xác nhận
    this.sum_gold = Number(0); // var sum_diamond = 0;

    for (var i = 0; i <= custom; i++) {
      if (user_data.user_data.wareHouse[i].have == 0) {
        this.sum_gold += user_data.user_data.wareHouse[i].cost;
      }
    }

    this.node.children[3].children[0].getComponent(cc.Label).string = "Do you want use " + this.sum_gold + " gold to buy new repository?"; // sum_gold = 500 * count;
    // console.log("sum_gold " + sum_gold);
    // if (user_data.user_data.gold >= sum_gold) {
    //     // console.log("sum_godl " + sum_gold);
    //     // user_data.user_data.diamond -= this.sum_diamond;
    //     for (var i = 0; i <= custom; i++) {
    //         user_data.user_data.wareHouse[i].have = 1;
    //         this.lock_group_node.children[i].active = false;
    //         this.label_group_node.children[i].getComponent(cc.Label).string = "0/30";
    //         this.game_scene_js.create_tips_ui(this.game_scene_js.node, "unlocked_repo");
    //     }
    //     this.game_rules_js.add_gold(-sum_gold);
    // }
    // // cô
    // else {
    //     this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money_gold");
    // }

    this.index = custom;
  },
  buy_repo: function buy_repo() {
    if (user_data.user_data.gold >= this.sum_gold) {
      // console.log("sum_godl " + sum_gold);
      // user_data.user_data.diamond -= this.sum_diamond;
      for (var i = 0; i <= this.index; i++) {
        user_data.user_data.wareHouse[i].have = 1;
        this.lock_group_node.children[i].active = false;
        this.label_group_node.children[i].getComponent(cc.Label).string = "0/30";
        this.game_scene_js.create_tips_ui(this.game_scene_js.node, "unlocked_repo");
      }

      this.game_rules_js.add_gold(-this.sum_gold);
      this.touch_exit();
    } // cô
    else {
        console.log(this.sum_gold + " sum_gold");
        this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money_gold");
      }
  },
  // auto_sell: function () {    // tự động bán hàng trong kho
  //     var time_auto = 60 * 60;
  //     var auto = function () {
  //         time_auto -=0.1;
  //     };
  //     this.schedule(this.auto, 0.1);
  // },
  set_sell: function set_sell() {
    var all_capacity = 30;

    for (var i = 0; i < this.icon_group_node.children.length; i++) {
      if (user_data.user_data.wareHouse[i].have == 1) {
        var count = user_data.user_data.wareHouse[i].count;
        this.label_group_node.children[i].getComponent(cc.Label).string = count + "/" + all_capacity;
        this.lock_group_node.children[i].active = false;

        if (count > 0) {
          var id_product = user_data.user_data.wareHouse[i].id_product;
          this.icon_group_node.children[i].getComponent(cc.Sprite).spriteFrame = this.box_frame_arr[id_product];
        } else {
          this.icon_group_node.children[i].getComponent(cc.Sprite).spriteFrame = this.box_frame_arr[8];
        }
      } else {
        this.label_group_node.children[i].getComponent(cc.Label).string = '';
        this.lock_group_node.children[i].active = true;
        this.icon_group_node.children[i].getComponent(cc.Sprite).SpriteFrame = this.box_frame_arr[8];
      }
    }
  },
  touch_exit: function touch_exit() {
    if (this.node.children[2].active == false) {
      this.node.children[2].active = true;
      this.node.children[3].active = false;
    } else {
      this.sound_control.play_sound_effect("button_exit");
      this.ad_control.hide_bannerAd();
      this.game_scene_js.on_node_kill(this.node);
    }
  },
  //设置预计卖出文字
  set_estimate_label: function set_estimate_label() {
    var sum = 0;

    for (var i = 0; i < this.icon_group_node.children.length; i++) {
      var count = user_data.user_data.wareHouse[i].count;
      var sell = config.plant[i].sell;
      sum += count * sell;
    }

    ;
    this.estimate_label.string = "Expected to sell: " + sum;
  },
  //普通卖出
  on_sell_button_click: function on_sell_button_click() {
    this.sound_control.play_sound_effect("button_click");
    var sum = 0;

    for (var i = 0; i < this.icon_group_node.children.length; i++) {
      var count = user_data.user_data.wareHouse[i].count;
      var id_product = user_data.user_data.wareHouse[i].id_product; // lấy id của cây trong mỗi kho

      if (id_product > 7) continue;
      var sell = config.plant[id_product].sell;
      sum += count * sell;
    }

    ;

    if (sum == 0) {
      this.game_scene_js.create_tips_ui(this.game_rules_js.node, "no_sell");
    } else {
      for (var j = 0; j < this.icon_group_node.children.length; j++) {
        user_data.user_data.wareHouse[j].count = 0;
      }

      ;
      this.game_scene_js.create_tips_ui(this.game_rules_js.node, "gold", sum);
      this.game_rules_js.add_gold(sum);
      this.set_sell();
    }

    ;
  },
  //double_sell_button_click
  on_double_sell_button_click: function on_double_sell_button_click() {
    this.sound_control.play_sound_effect("button_click");
    var sum = 0;

    for (var i = 0; i < this.icon_group_node.children.length; i++) {
      var count = user_data.user_data.wareHouse[i].count;
      var sell = config.plant[i].sell;
      sum += count * sell;
    }

    ; //如果没有可卖的则不能卖出

    if (sum == 0) {
      this.game_scene_js.create_tips_ui(this.game_rules_js.node, "no_sell");
    } else {
      this.ad_control.show_videoAd("double_sell");
      this.video_succes();
    }

    ;
  },
  //检测视频是否播放成功
  video_succes: function video_succes() {
    if (typeof wx != "undefined") {
      var callback = function callback() {
        if (this.ad_control.video_state == 1 && this.ad_control.video_tag == "double_sell") {
          this.ad_control.video_tag = null;
          this.ad_control.video_state = 2;
          var sum = 0;

          for (var i = 0; i < this.icon_group_node.children.length; i++) {
            var count = user_data.user_data.wareHouse[i].count;
            var sell = config.plant[i].sell;
            sum += count * sell;
          }

          ;

          for (var j = 0; j < this.icon_group_node.children.length; j++) {
            user_data.user_data.wareHouse[j].count = 0;
          }

          ;
          this.game_scene_js.create_tips_ui(this.game_rules_js.node, "gold", sum * 2);
          this.game_rules_js.add_gold(sum * 2);
          this.set_sell();
          this.unschedule(callback);
        } else {
          if (this.ad_control.video_tag == null && this.ad_control.video_state == 2) {
            this.unschedule(callback);
          }

          ;
        }

        ;
      };

      this.schedule(callback, 0.2);
    }

    ;
  },
  onLoad: function onLoad() {},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2VsbF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJib3hfZnJhbWVfYXJyIiwiU3ByaXRlRnJhbWUiLCJpY29uX2dyb3VwX25vZGUiLCJOb2RlIiwibGFiZWxfZ3JvdXBfbm9kZSIsImxvY2tfZ3JvdXBfbm9kZSIsImNvbmZpcm1fYnV0dG9uX25vZGUiLCJzdW1fZ29sZCIsImluZGV4IiwiaW5pX25vZGUiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImdhbWVfcnVsZXNfanMiLCJhZF9jb250cm9sIiwic291bmRfY29udHJvbCIsInNob3dfYmFubmVyQWQiLCJzZXRfc2VsbCIsImJ1dHRvbl91bmxvY2tfY2xpY2siLCJlIiwiY3VzdG9tIiwibm9kZSIsImNoaWxkcmVuIiwiYWN0aXZlIiwic2hvd19jb21maXJtX2J1eSIsIk51bWJlciIsImkiLCJ3YXJlSG91c2UiLCJoYXZlIiwiY29zdCIsIkxhYmVsIiwic3RyaW5nIiwiYnV5X3JlcG8iLCJnb2xkIiwiY3JlYXRlX3RpcHNfdWkiLCJhZGRfZ29sZCIsInRvdWNoX2V4aXQiLCJjb25zb2xlIiwibG9nIiwiYWxsX2NhcGFjaXR5IiwibGVuZ3RoIiwiY291bnQiLCJpZF9wcm9kdWN0IiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJwbGF5X3NvdW5kX2VmZmVjdCIsImhpZGVfYmFubmVyQWQiLCJvbl9ub2RlX2tpbGwiLCJzZXRfZXN0aW1hdGVfbGFiZWwiLCJzdW0iLCJzZWxsIiwicGxhbnQiLCJlc3RpbWF0ZV9sYWJlbCIsIm9uX3NlbGxfYnV0dG9uX2NsaWNrIiwiaiIsIm9uX2RvdWJsZV9zZWxsX2J1dHRvbl9jbGljayIsInNob3dfdmlkZW9BZCIsInZpZGVvX3N1Y2NlcyIsInd4IiwiY2FsbGJhY2siLCJ2aWRlb19zdGF0ZSIsInZp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QSxTQUFTLENBQUNBLFNBQVYsQ0FBb0JrQyxTQUFwQixDQUE4QjJCLENBQTlCLEVBQWlDYixLQUFqQyxHQUF5QyxDQUF6QztBQUNIOztBQUFBO0FBQ0QsZUFBSy9CLGFBQUwsQ0FBbUJ3QixjQUFuQixDQUFrQyxLQUFLckIsYUFBTCxDQUFtQlEsSUFBckQsRUFBMkQsTUFBM0QsRUFBbUU0QixHQUFHLEdBQUcsQ0FBekU7QUFDQSxlQUFLcEMsYUFBTCxDQUFtQnNCLFFBQW5CLENBQTRCYyxHQUFHLEdBQUcsQ0FBbEM7QUFDQSxlQUFLaEMsUUFBTDtBQUNBLGVBQUs2QyxVQUFMLENBQWdCSCxRQUFoQjtBQUNILFNBaEJELE1BZ0JPO0FBQ0gsY0FBSSxLQUFLN0MsVUFBTCxDQUFnQitDLFNBQWhCLElBQTZCLElBQTdCLElBQXFDLEtBQUsvQyxVQUFMLENBQWdCOEMsV0FBaEIsSUFBK0IsQ0FBeEUsRUFBMkU7QUFDdkUsaUJBQUtFLFVBQUwsQ0FBZ0JILFFBQWhCO0FBQ0g7O0FBQUE7QUFDSjs7QUFBQTtBQUNKLE9BdEJEOztBQXVCQSxXQUFLSSxRQUFMLENBQWNKLFFBQWQsRUFBd0IsR0FBeEI7QUFDSDs7QUFBQTtBQUNKLEdBdE1JO0FBdU1MSyxFQUFBQSxNQXZNSyxvQkF1TUksQ0FFUixDQXpNSTtBQTJNTEMsRUFBQUEsS0EzTUssbUJBMk1HLENBRVAsQ0E3TUksQ0ErTUw7O0FBL01LLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCJjb25maWdcIik7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBib3hfZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICBpY29uX2dyb3VwX25vZGU6IGNjLk5vZGUsXG4gICAgICAgIGxhYmVsX2dyb3VwX25vZGU6IGNjLk5vZGUsXG4gICAgICAgIC8vIGVzdGltYXRlX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgbG9ja19ncm91cF9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBjb25maXJtX2J1dHRvbl9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBzdW1fZ29sZDogMCxcbiAgICAgICAgaW5kZXg6IDAsXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuICAgIGluaV9ub2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5zaG93X2Jhbm5lckFkKCk7XG4gICAgICAgIHRoaXMuc2V0X3NlbGwoKTtcbiAgICAgICAgLy8gdGhpcy5zZXRfZXN0aW1hdGVfbGFiZWwoKTtcbiAgICB9LFxuICAgIGJ1dHRvbl91bmxvY2tfY2xpY2soZSwgY3VzdG9tKSB7ICAgICAgICAvLyBidXR0b24gdW5sb2NrIHJlcG9cbiAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzJdLmFjdGl2ZSA9IGZhbHNlOyAgIC8vIHNob3cgUE9QLVVQIG9wZW4gbmV3IHJlcG9cbiAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzNdLmFjdGl2ZSA9IHRydWU7ICAgIC8vIGhpZGRlbiByZXBvXG4gICAgICAgIHRoaXMuc2hvd19jb21maXJtX2J1eShjdXN0b20pO1xuICAgIH0sXG4gICAgc2hvd19jb21maXJtX2J1eTogZnVuY3Rpb24gKGN1c3RvbSkgeyAgICAgICAvLyBoaeG7g24gdGjhu4sgc+G7kSB0aeG7gW4gxJHhu4MgbXVhIHLGsMahbmcsIHRow6ptIG7DunQgeMOhYyBuaOG6rW5cbiAgICAgICAgdGhpcy5zdW1fZ29sZCA9IE51bWJlcigwKTtcbiAgICAgICAgLy8gdmFyIHN1bV9kaWFtb25kID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gY3VzdG9tOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5oYXZlID09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1bV9nb2xkICs9IHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmNvc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzNdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJEbyB5b3Ugd2FudCB1c2UgXCIgKyB0aGlzLnN1bV9nb2xkICsgXCIgZ29sZCB0byBidXkgbmV3IHJlcG9zaXRvcnk/XCI7XG4gICAgICAgIC8vIHN1bV9nb2xkID0gNTAwICogY291bnQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwic3VtX2dvbGQgXCIgKyBzdW1fZ29sZCk7XG4gICAgICAgIC8vIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPj0gc3VtX2dvbGQpIHtcbiAgICAgICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKFwic3VtX2dvZGwgXCIgKyBzdW1fZ29sZCk7XG4gICAgICAgIC8vICAgICAvLyB1c2VyX2RhdGEudXNlcl9kYXRhLmRpYW1vbmQgLT0gdGhpcy5zdW1fZGlhbW9uZDtcbiAgICAgICAgLy8gICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGN1c3RvbTsgaSsrKSB7XG4gICAgICAgIC8vICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uaGF2ZSA9IDE7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5sb2NrX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5sYWJlbF9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIwLzMwXCI7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInVubG9ja2VkX3JlcG9cIik7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2dvbGQoLXN1bV9nb2xkKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyAvLyBjw7RcbiAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgIC8vICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwibm9fbW9uZXlfZ29sZFwiKTtcbiAgICAgICAgLy8gfVxuICAgICAgICB0aGlzLmluZGV4ID0gY3VzdG9tO1xuICAgIH0sXG4gICAgYnV5X3JlcG86IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA+PSB0aGlzLnN1bV9nb2xkKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInN1bV9nb2RsIFwiICsgc3VtX2dvbGQpO1xuICAgICAgICAgICAgLy8gdXNlcl9kYXRhLnVzZXJfZGF0YS5kaWFtb25kIC09IHRoaXMuc3VtX2RpYW1vbmQ7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSB0aGlzLmluZGV4OyBpKyspIHtcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5oYXZlID0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2tfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIjAvMzBcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwidW5sb2NrZWRfcmVwb1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZ29sZCgtdGhpcy5zdW1fZ29sZCk7XG4gICAgICAgICAgICB0aGlzLnRvdWNoX2V4aXQoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjw7RcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN1bV9nb2xkICsgXCIgc3VtX2dvbGRcIik7XG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwibm9fbW9uZXlfZ29sZFwiKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gYXV0b19zZWxsOiBmdW5jdGlvbiAoKSB7ICAgIC8vIHThu7EgxJHhu5luZyBiw6FuIGjDoG5nIHRyb25nIGtob1xuICAgIC8vICAgICB2YXIgdGltZV9hdXRvID0gNjAgKiA2MDtcblxuICAgIC8vICAgICB2YXIgYXV0byA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgICAgIHRpbWVfYXV0byAtPTAuMTtcbiAgICAvLyAgICAgfTtcbiAgICAvLyAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmF1dG8sIDAuMSk7XG4gICAgLy8gfSxcblxuICAgIHNldF9zZWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhbGxfY2FwYWNpdHkgPSAzMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmljb25fZ3JvdXBfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmNvdW50O1xuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGNvdW50ICsgXCIvXCIgKyBhbGxfY2FwYWNpdHk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NrX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpZF9wcm9kdWN0ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uaWRfcHJvZHVjdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pY29uX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJveF9mcmFtZV9hcnJbaWRfcHJvZHVjdF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmljb25fZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuYm94X2ZyYW1lX2Fycls4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAnJztcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2tfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLlNwcml0ZUZyYW1lID0gdGhpcy5ib3hfZnJhbWVfYXJyWzhdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRvdWNoX2V4aXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMubm9kZS5jaGlsZHJlblsyXS5hY3RpdmUgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblsyXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzNdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2V4aXRcIik7XG4gICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xuICAgICAgICB9XG5cbiAgICB9LFxuICAgIC8v6K6+572u6aKE6K6h5Y2W5Ye65paH5a2XXG4gICAgc2V0X2VzdGltYXRlX2xhYmVsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdW0gPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaWNvbl9ncm91cF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY291bnQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3VudDtcbiAgICAgICAgICAgIHZhciBzZWxsID0gY29uZmlnLnBsYW50W2ldLnNlbGw7XG4gICAgICAgICAgICBzdW0gKz0gY291bnQgKiBzZWxsO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmVzdGltYXRlX2xhYmVsLnN0cmluZyA9IFwiRXhwZWN0ZWQgdG8gc2VsbDogXCIgKyBzdW07XG4gICAgfSxcbiAgICAvL+aZrumAmuWNluWHulxuICAgIG9uX3NlbGxfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pY29uX2dyb3VwX25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjb3VudCA9IHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmNvdW50O1xuICAgICAgICAgICAgdmFyIGlkX3Byb2R1Y3QgPSB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5pZF9wcm9kdWN0Oy8vIGzhuqV5IGlkIGPhu6dhIGPDonkgdHJvbmcgbeG7l2kga2hvXG4gICAgICAgICAgICBpZiAoaWRfcHJvZHVjdCA+IDcpIGNvbnRpbnVlO1xuICAgICAgICAgICAgdmFyIHNlbGwgPSBjb25maWcucGxhbnRbaWRfcHJvZHVjdF0uc2VsbDtcbiAgICAgICAgICAgIHN1bSArPSBjb3VudCAqIHNlbGw7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChzdW0gPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9ydWxlc19qcy5ub2RlLCBcIm5vX3NlbGxcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuaWNvbl9ncm91cF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2Vbal0uY291bnQgPSAwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJnb2xkXCIsIHN1bSk7XG4gICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2dvbGQoc3VtKTtcbiAgICAgICAgICAgIHRoaXMuc2V0X3NlbGwoKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8vZG91YmxlX3NlbGxfYnV0dG9uX2NsaWNrXG4gICAgb25fZG91YmxlX3NlbGxfYnV0dG9uX2NsaWNrKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG4gICAgICAgIHZhciBzdW0gPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaWNvbl9ncm91cF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY291bnQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3VudDtcbiAgICAgICAgICAgIHZhciBzZWxsID0gY29uZmlnLnBsYW50W2ldLnNlbGw7XG4gICAgICAgICAgICBzdW0gKz0gY291bnQgKiBzZWxsO1xuICAgICAgICB9O1xuICAgICAgICAvL+WmguaenOayoeacieWPr+WNlueahOWImeS4jeiDveWNluWHulxuICAgICAgICBpZiAoc3VtID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJub19zZWxsXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfdmlkZW9BZChcImRvdWJsZV9zZWxsXCIpO1xuICAgICAgICAgICAgdGhpcy52aWRlb19zdWNjZXMoKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5qOA5rWL6KeG6aKR5piv5ZCm5pKt5pS+5oiQ5YqfXG4gICAgdmlkZW9fc3VjY2VzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAxICYmIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gXCJkb3VibGVfc2VsbFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPSAyO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3VtID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmljb25fZ3JvdXBfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvdW50ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uY291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsbCA9IGNvbmZpZy5wbGFudFtpXS5zZWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VtICs9IGNvdW50ICogc2VsbDtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLmljb25fZ3JvdXBfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2Vbal0uY291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3J1bGVzX2pzLm5vZGUsIFwiZ29sZFwiLCBzdW0gKiAyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKHN1bSAqIDIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldF9zZWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gbnVsbCAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMik7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==