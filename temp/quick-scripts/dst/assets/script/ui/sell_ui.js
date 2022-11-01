
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
    sum_diamond: 0,
    index: 0
  },
  // LIFE-CYCLE CALLBACKS:
  ini_node: function ini_node() {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control.show_bannerAd();
    this.set_sell(); // this.set_estimate_label();
  },
  button_unlock_click: function button_unlock_click(e, custom) {
    // button unlock repo
    // if (custom <= 7) {
    this.node.children[2].active = false; // show POP-UP open new repo

    this.node.children[3].active = true; // hidden repo

    this.show_comfirm_buy(custom); // }
    // else
    //     this.game_scene_js.create_tips_ui(this.game_scene_js.node, "cant_unlock_repo");
  },
  show_comfirm_buy: function show_comfirm_buy(custom) {
    // hiển thị số tiền để mua rương, thêm nút xác nhận
    this.sum_gold = Number(0);
    this.sum_diamond = Number(0); // var sum_diamond = 0;

    for (var i = 0; i <= custom; i++) {
      if (user_data.user_data.wareHouse[i].have == 0) {
        if (user_data.user_data.wareHouse[i].type_buy == "gold") this.sum_gold += user_data.user_data.wareHouse[i].cost;else this.sum_diamond += user_data.user_data.wareHouse[i].cost; // cc.log("43 index " + i + " cost " + user_data.user_data.wareHouse[i].cost);
      }
    }

    this.node.children[3].children[0].getComponent(cc.Label).string = "Do you want use " + this.sum_gold + " gold and " + this.sum_diamond + " diamond to buy new repository?";
    this.index = custom;
  },
  buy_repo: function buy_repo() {
    if (user_data.user_data.gold >= this.sum_gold && user_data.user_data.diamond >= this.sum_diamond) {
      // console.log("sum_godl " + sum_gold);
      // user_data.user_data.diamond -= this.sum_diamond;
      for (var i = 0; i <= this.index; i++) {
        user_data.user_data.wareHouse[i].have = 1;
        this.lock_group_node.children[i].active = false;
        this.label_group_node.children[i].getComponent(cc.Label).string = user_data.user_data.wareHouse[i].count + "/30";
        this.game_scene_js.create_tips_ui(this.game_scene_js.node, "unlocked_repo");
      }

      this.game_rules_js.add_gold(-this.sum_gold);
      this.game_rules_js.add_diamond(-this.sum_diamond);
      this.touch_exit();
    } else if (user_data.user_data.gold < this.gold) {
      this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money_gold");
    } else if (user_data.user_data.diamond, this.diamond) this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money_diamond");else this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money");
  },
  // auto_sell: function () {    // tự động bán hàng trong kho // chưa xong
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
    var _this = this;

    this.sound_control.play_sound_effect("button_click");
    this.adsManager_js.showRewardedVideo(function () {
      var sum = 0;

      for (var i = 0; i < _this.icon_group_node.children.length; i++) {
        var count = user_data.user_data.wareHouse[i].count;
        var id_product = user_data.user_data.wareHouse[i].id_product; // lấy id của cây trong mỗi kho

        if (id_product > 7) continue;
        var sell = config.plant[id_product].sell;
        sum += count * sell;
      }

      ;

      if (sum == 0) {
        _this.game_scene_js.create_tips_ui(_this.game_rules_js.node, "no_sell");
      } else {
        for (var j = 0; j < _this.icon_group_node.children.length; j++) {
          user_data.user_data.wareHouse[j].count = 0;
        }

        ;

        _this.game_scene_js.create_tips_ui(_this.game_rules_js.node, "gold", sum);

        _this.game_rules_js.add_gold(sum * 2);

        _this.set_sell();
      }

      ;
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2VsbF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJib3hfZnJhbWVfYXJyIiwiU3ByaXRlRnJhbWUiLCJpY29uX2dyb3VwX25vZGUiLCJOb2RlIiwibGFiZWxfZ3JvdXBfbm9kZSIsImxvY2tfZ3JvdXBfbm9kZSIsImNvbmZpcm1fYnV0dG9uX25vZGUiLCJzdW1fZ29sZCIsInN1bV9kaWFtb25kIiwiaW5kZXgiLCJpbmlfbm9kZSIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9ydWxlc19qcyIsImFkc01hbmFnZXJfanMiLCJhZF9jb250cm9sIiwic291bmRfY29udHJvbCIsInNob3dfYmFubmVyQWQiLCJzZXRfc2VsbCIsImJ1dHRvbl91bmxvY2tfY2xpY2siLCJlIiwiY3VzdG9tIiwibm9kZSIsImNoaWxkcmVuIiwiYWN0aXZlIiwic2hvd19jb21maXJtX2J1eSIsIk51bWJlciIsImkiLCJ3YXJlSG91c2UiLCJoYXZlIiwidHlwZV9idXkiLCJjb3N0IiwiTGFiZWwiLCJzdHJpbmciLCJidXlfcmVwbyIsImdvbGQiLCJkaWFtb25kIiwiY291bnQiLCJjcmVhdGVfdGlwc191aSIsImFkZF9nb2xkIiwiYWRkX2RpYW1vbmQiLCJ0b3VjaF9leGl0IiwiYWxsX2NhcGFjaXR5IiwibGVuZ3RoIiwiaWRfcHJvZHVjdCIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwicGxheV9zb3VuZF9lZmZlY3QiLCJoaWRlX2Jhbm5lckFkIiwib25fbm9kZV9raWxsIiwic2V0X2VzdGltYXRlX2xhYmVsIiwic3VtIiwic2VsbCIsInBsYW50IiwiZXN0aW1hdGVfbGFiZWwiLCJvbl9zZWxsX2J1dHRvbl9jbGljayIsImoiLCJvbl9kb3VibGVfc2VsbF9idXR0b25fY2xpY2siLCJzaG93UmV3YXJkZWRWaWRlbyIsInZpZGVvX3N1Y2NlcyIsInd4IiwiY2FsbGJhY2siLCJ2aWRlb19zdGF0ZSIsInZpZGVvX3RhZyIsInVuc2NoZWR1bGUiLCJzY2hlZHVsZSIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0EsSUFBSUMsTUFBTSxHQUFHRCxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQUUsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGFBQWEsRUFBRSxDQUFDSixFQUFFLENBQUNLLFdBQUosQ0FEUDtBQUVSQyxJQUFBQSxlQUFlLEVBQUVOLEVBQUUsQ0FBQ08sSUFGWjtBQUdSQyxJQUFBQSxnQkFBZ0IsRUFBRVIsRUFBRSxDQUFDTyxJQUhiO0FBSVI7QUFDQUUsSUFBQUEsZUFBZSxFQUFFVCxFQUFFLENBQUNPLElBTFo7QUFNUkcsSUFBQUEsbUJBQW1CLEVBQUVWLEVBQUUsQ0FBQ08sSUFOaEI7QUFPUkksSUFBQUEsUUFBUSxFQUFFLENBUEY7QUFRUkMsSUFBQUEsV0FBVyxFQUFFLENBUkw7QUFTUkMsSUFBQUEsS0FBSyxFQUFFO0FBVEMsR0FIUDtBQWVMO0FBQ0FDLEVBQUFBLFFBQVEsRUFBRSxvQkFBWTtBQUNsQixTQUFLQyxhQUFMLEdBQXFCZixFQUFFLENBQUNnQixJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCbEIsRUFBRSxDQUFDZ0IsSUFBSCxDQUFRLFNBQVIsRUFBbUJDLFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0EsU0FBS0UsYUFBTCxHQUFxQm5CLEVBQUUsQ0FBQ2dCLElBQUgsQ0FBUSxTQUFSLEVBQW1CQyxZQUFuQixDQUFnQyxZQUFoQyxDQUFyQjtBQUNBLFNBQUtHLFVBQUwsR0FBa0JwQixFQUFFLENBQUNnQixJQUFILENBQVEsWUFBUixFQUFzQkMsWUFBdEIsQ0FBbUMsWUFBbkMsQ0FBbEI7QUFDQSxTQUFLSSxhQUFMLEdBQXFCckIsRUFBRSxDQUFDZ0IsSUFBSCxDQUFRLGVBQVIsRUFBeUJDLFlBQXpCLENBQXNDLGVBQXRDLENBQXJCO0FBQ0EsU0FBS0csVUFBTCxDQUFnQkUsYUFBaEI7QUFDQSxTQUFLQyxRQUFMLEdBUGtCLENBUWxCO0FBQ0gsR0F6Qkk7QUEwQkxDLEVBQUFBLG1CQTFCSywrQkEwQmVDLENBMUJmLEVBMEJrQkMsTUExQmxCLEVBMEIwQjtBQUFTO0FBQ3BDO0FBQ0EsU0FBS0MsSUFBTCxDQUFVQyxRQUFWLENBQW1CLENBQW5CLEVBQXNCQyxNQUF0QixHQUErQixLQUEvQixDQUYyQixDQUVhOztBQUN4QyxTQUFLRixJQUFMLENBQVVDLFFBQVYsQ0FBbUIsQ0FBbkIsRUFBc0JDLE1BQXRCLEdBQStCLElBQS9CLENBSDJCLENBR2E7O0FBQ3hDLFNBQUtDLGdCQUFMLENBQXNCSixNQUF0QixFQUoyQixDQUszQjtBQUNBO0FBQ0E7QUFDSCxHQWxDSTtBQW1DTEksRUFBQUEsZ0JBQWdCLEVBQUUsMEJBQVVKLE1BQVYsRUFBa0I7QUFBUTtBQUN4QyxTQUFLZixRQUFMLEdBQWdCb0IsTUFBTSxDQUFDLENBQUQsQ0FBdEI7QUFDQSxTQUFLbkIsV0FBTCxHQUFtQm1CLE1BQU0sQ0FBQyxDQUFELENBQXpCLENBRmdDLENBR2hDOztBQUNBLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsSUFBSU4sTUFBckIsRUFBNkJNLENBQUMsRUFBOUIsRUFBa0M7QUFDOUIsVUFBSW5DLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQm9DLFNBQXBCLENBQThCRCxDQUE5QixFQUFpQ0UsSUFBakMsSUFBeUMsQ0FBN0MsRUFBZ0Q7QUFDNUMsWUFBSXJDLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQm9DLFNBQXBCLENBQThCRCxDQUE5QixFQUFpQ0csUUFBakMsSUFBNkMsTUFBakQsRUFDSSxLQUFLeEIsUUFBTCxJQUFpQmQsU0FBUyxDQUFDQSxTQUFWLENBQW9Cb0MsU0FBcEIsQ0FBOEJELENBQTlCLEVBQWlDSSxJQUFsRCxDQURKLEtBRUssS0FBS3hCLFdBQUwsSUFBb0JmLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQm9DLFNBQXBCLENBQThCRCxDQUE5QixFQUFpQ0ksSUFBckQsQ0FIdUMsQ0FJNUM7QUFDSDtBQUNKOztBQUNELFNBQUtULElBQUwsQ0FBVUMsUUFBVixDQUFtQixDQUFuQixFQUFzQkEsUUFBdEIsQ0FBK0IsQ0FBL0IsRUFBa0NYLFlBQWxDLENBQStDakIsRUFBRSxDQUFDcUMsS0FBbEQsRUFBeURDLE1BQXpELEdBQWtFLHFCQUFxQixLQUFLM0IsUUFBMUIsR0FBcUMsWUFBckMsR0FBb0QsS0FBS0MsV0FBekQsR0FBdUUsaUNBQXpJO0FBQ0EsU0FBS0MsS0FBTCxHQUFhYSxNQUFiO0FBQ0gsR0FqREk7QUFrRExhLEVBQUFBLFFBQVEsRUFBRSxvQkFBWTtBQUNsQixRQUFJMUMsU0FBUyxDQUFDQSxTQUFWLENBQW9CMkMsSUFBcEIsSUFBNEIsS0FBSzdCLFFBQWpDLElBQTZDZCxTQUFTLENBQUNBLFNBQVYsQ0FBb0I0QyxPQUFwQixJQUErQixLQUFLN0IsV0FBckYsRUFBa0c7QUFDOUY7QUFDQTtBQUNBLFdBQUssSUFBSW9CLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLElBQUksS0FBS25CLEtBQTFCLEVBQWlDbUIsQ0FBQyxFQUFsQyxFQUFzQztBQUNsQ25DLFFBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQm9DLFNBQXBCLENBQThCRCxDQUE5QixFQUFpQ0UsSUFBakMsR0FBd0MsQ0FBeEM7QUFDQSxhQUFLekIsZUFBTCxDQUFxQm1CLFFBQXJCLENBQThCSSxDQUE5QixFQUFpQ0gsTUFBakMsR0FBMEMsS0FBMUM7QUFDQSxhQUFLckIsZ0JBQUwsQ0FBc0JvQixRQUF0QixDQUErQkksQ0FBL0IsRUFBa0NmLFlBQWxDLENBQStDakIsRUFBRSxDQUFDcUMsS0FBbEQsRUFBeURDLE1BQXpELEdBQWtFekMsU0FBUyxDQUFDQSxTQUFWLENBQW9Cb0MsU0FBcEIsQ0FBOEJELENBQTlCLEVBQWlDVSxLQUFqQyxHQUF5QyxLQUEzRztBQUNBLGFBQUszQixhQUFMLENBQW1CNEIsY0FBbkIsQ0FBa0MsS0FBSzVCLGFBQUwsQ0FBbUJZLElBQXJELEVBQTJELGVBQTNEO0FBQ0g7O0FBQ0QsV0FBS1QsYUFBTCxDQUFtQjBCLFFBQW5CLENBQTRCLENBQUMsS0FBS2pDLFFBQWxDO0FBQ0EsV0FBS08sYUFBTCxDQUFtQjJCLFdBQW5CLENBQStCLENBQUMsS0FBS2pDLFdBQXJDO0FBQ0EsV0FBS2tDLFVBQUw7QUFDSCxLQVpELE1BYUssSUFBSWpELFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjJDLElBQXBCLEdBQTJCLEtBQUtBLElBQXBDLEVBQTBDO0FBQzNDLFdBQUt6QixhQUFMLENBQW1CNEIsY0FBbkIsQ0FBa0MsS0FBSzVCLGFBQUwsQ0FBbUJZLElBQXJELEVBQTJELGVBQTNEO0FBQ0gsS0FGSSxNQUdBLElBQUk5QixTQUFTLENBQUNBLFNBQVYsQ0FBb0I0QyxPQUFwQixFQUE2QixLQUFLQSxPQUF0QyxFQUNELEtBQUsxQixhQUFMLENBQW1CNEIsY0FBbkIsQ0FBa0MsS0FBSzVCLGFBQUwsQ0FBbUJZLElBQXJELEVBQTJELGtCQUEzRCxFQURDLEtBRUEsS0FBS1osYUFBTCxDQUFtQjRCLGNBQW5CLENBQWtDLEtBQUs1QixhQUFMLENBQW1CWSxJQUFyRCxFQUEyRCxVQUEzRDtBQUNSLEdBdEVJO0FBdUVMO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFKLEVBQUFBLFFBQVEsRUFBRSxvQkFBWTtBQUNsQixRQUFJd0IsWUFBWSxHQUFHLEVBQW5COztBQUNBLFNBQUssSUFBSWYsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLMUIsZUFBTCxDQUFxQnNCLFFBQXJCLENBQThCb0IsTUFBbEQsRUFBMERoQixDQUFDLEVBQTNELEVBQStEO0FBQzNELFVBQUluQyxTQUFTLENBQUNBLFNBQVYsQ0FBb0JvQyxTQUFwQixDQUE4QkQsQ0FBOUIsRUFBaUNFLElBQWpDLElBQXlDLENBQTdDLEVBQWdEO0FBQzVDLFlBQUlRLEtBQUssR0FBRzdDLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQm9DLFNBQXBCLENBQThCRCxDQUE5QixFQUFpQ1UsS0FBN0M7QUFDQSxhQUFLbEMsZ0JBQUwsQ0FBc0JvQixRQUF0QixDQUErQkksQ0FBL0IsRUFBa0NmLFlBQWxDLENBQStDakIsRUFBRSxDQUFDcUMsS0FBbEQsRUFBeURDLE1BQXpELEdBQWtFSSxLQUFLLEdBQUcsR0FBUixHQUFjSyxZQUFoRjtBQUNBLGFBQUt0QyxlQUFMLENBQXFCbUIsUUFBckIsQ0FBOEJJLENBQTlCLEVBQWlDSCxNQUFqQyxHQUEwQyxLQUExQzs7QUFFQSxZQUFJYSxLQUFLLEdBQUcsQ0FBWixFQUFlO0FBQ1gsY0FBSU8sVUFBVSxHQUFHcEQsU0FBUyxDQUFDQSxTQUFWLENBQW9Cb0MsU0FBcEIsQ0FBOEJELENBQTlCLEVBQWlDaUIsVUFBbEQ7QUFDQSxlQUFLM0MsZUFBTCxDQUFxQnNCLFFBQXJCLENBQThCSSxDQUE5QixFQUFpQ2YsWUFBakMsQ0FBOENqQixFQUFFLENBQUNrRCxNQUFqRCxFQUF5REMsV0FBekQsR0FBdUUsS0FBSy9DLGFBQUwsQ0FBbUI2QyxVQUFuQixDQUF2RTtBQUNILFNBSEQsTUFJSztBQUNELGVBQUszQyxlQUFMLENBQXFCc0IsUUFBckIsQ0FBOEJJLENBQTlCLEVBQWlDZixZQUFqQyxDQUE4Q2pCLEVBQUUsQ0FBQ2tELE1BQWpELEVBQXlEQyxXQUF6RCxHQUF1RSxLQUFLL0MsYUFBTCxDQUFtQixDQUFuQixDQUF2RTtBQUNIO0FBQ0osT0FaRCxNQWFLO0FBQ0QsYUFBS0ksZ0JBQUwsQ0FBc0JvQixRQUF0QixDQUErQkksQ0FBL0IsRUFBa0NmLFlBQWxDLENBQStDakIsRUFBRSxDQUFDcUMsS0FBbEQsRUFBeURDLE1BQXpELEdBQWtFLEVBQWxFO0FBQ0EsYUFBSzdCLGVBQUwsQ0FBcUJtQixRQUFyQixDQUE4QkksQ0FBOUIsRUFBaUNILE1BQWpDLEdBQTBDLElBQTFDO0FBQ0EsYUFBS3ZCLGVBQUwsQ0FBcUJzQixRQUFyQixDQUE4QkksQ0FBOUIsRUFBaUNmLFlBQWpDLENBQThDakIsRUFBRSxDQUFDa0QsTUFBakQsRUFBeUQ3QyxXQUF6RCxHQUF1RSxLQUFLRCxhQUFMLENBQW1CLENBQW5CLENBQXZFO0FBQ0g7QUFFSjtBQUNKLEdBdkdJO0FBd0dMMEMsRUFBQUEsVUFBVSxFQUFFLHNCQUFZO0FBQ3BCLFFBQUksS0FBS25CLElBQUwsQ0FBVUMsUUFBVixDQUFtQixDQUFuQixFQUFzQkMsTUFBdEIsSUFBZ0MsS0FBcEMsRUFBMkM7QUFDdkMsV0FBS0YsSUFBTCxDQUFVQyxRQUFWLENBQW1CLENBQW5CLEVBQXNCQyxNQUF0QixHQUErQixJQUEvQjtBQUNBLFdBQUtGLElBQUwsQ0FBVUMsUUFBVixDQUFtQixDQUFuQixFQUFzQkMsTUFBdEIsR0FBK0IsS0FBL0I7QUFDSCxLQUhELE1BSUs7QUFDRCxXQUFLUixhQUFMLENBQW1CK0IsaUJBQW5CLENBQXFDLGFBQXJDO0FBQ0EsV0FBS2hDLFVBQUwsQ0FBZ0JpQyxhQUFoQjtBQUNBLFdBQUt0QyxhQUFMLENBQW1CdUMsWUFBbkIsQ0FBZ0MsS0FBSzNCLElBQXJDO0FBQ0g7QUFFSixHQW5ISTtBQW9ITDtBQUNBNEIsRUFBQUEsa0JBQWtCLEVBQUUsOEJBQVk7QUFDNUIsUUFBSUMsR0FBRyxHQUFHLENBQVY7O0FBQ0EsU0FBSyxJQUFJeEIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLMUIsZUFBTCxDQUFxQnNCLFFBQXJCLENBQThCb0IsTUFBbEQsRUFBMERoQixDQUFDLEVBQTNELEVBQStEO0FBQzNELFVBQUlVLEtBQUssR0FBRzdDLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQm9DLFNBQXBCLENBQThCRCxDQUE5QixFQUFpQ1UsS0FBN0M7QUFDQSxVQUFJZSxJQUFJLEdBQUcxRCxNQUFNLENBQUMyRCxLQUFQLENBQWExQixDQUFiLEVBQWdCeUIsSUFBM0I7QUFDQUQsTUFBQUEsR0FBRyxJQUFJZCxLQUFLLEdBQUdlLElBQWY7QUFDSDs7QUFBQTtBQUNELFNBQUtFLGNBQUwsQ0FBb0JyQixNQUFwQixHQUE2Qix1QkFBdUJrQixHQUFwRDtBQUNILEdBN0hJO0FBOEhMO0FBQ0FJLEVBQUFBLG9CQUFvQixFQUFFLGdDQUFZO0FBQzlCLFNBQUt2QyxhQUFMLENBQW1CK0IsaUJBQW5CLENBQXFDLGNBQXJDO0FBQ0EsUUFBSUksR0FBRyxHQUFHLENBQVY7O0FBQ0EsU0FBSyxJQUFJeEIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLMUIsZUFBTCxDQUFxQnNCLFFBQXJCLENBQThCb0IsTUFBbEQsRUFBMERoQixDQUFDLEVBQTNELEVBQStEO0FBQzNELFVBQUlVLEtBQUssR0FBRzdDLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQm9DLFNBQXBCLENBQThCRCxDQUE5QixFQUFpQ1UsS0FBN0M7QUFDQSxVQUFJTyxVQUFVLEdBQUdwRCxTQUFTLENBQUNBLFNBQVYsQ0FBb0JvQyxTQUFwQixDQUE4QkQsQ0FBOUIsRUFBaUNpQixVQUFsRCxDQUYyRCxDQUVFOztBQUM3RCxVQUFJQSxVQUFVLEdBQUcsQ0FBakIsRUFBb0I7QUFDcEIsVUFBSVEsSUFBSSxHQUFHMUQsTUFBTSxDQUFDMkQsS0FBUCxDQUFhVCxVQUFiLEVBQXlCUSxJQUFwQztBQUNBRCxNQUFBQSxHQUFHLElBQUlkLEtBQUssR0FBR2UsSUFBZjtBQUNIOztBQUFBOztBQUNELFFBQUlELEdBQUcsSUFBSSxDQUFYLEVBQWM7QUFDVixXQUFLekMsYUFBTCxDQUFtQjRCLGNBQW5CLENBQWtDLEtBQUt6QixhQUFMLENBQW1CUyxJQUFyRCxFQUEyRCxTQUEzRDtBQUNILEtBRkQsTUFFTztBQUNILFdBQUssSUFBSWtDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS3ZELGVBQUwsQ0FBcUJzQixRQUFyQixDQUE4Qm9CLE1BQWxELEVBQTBEYSxDQUFDLEVBQTNELEVBQStEO0FBQzNEaEUsUUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9Cb0MsU0FBcEIsQ0FBOEI0QixDQUE5QixFQUFpQ25CLEtBQWpDLEdBQXlDLENBQXpDO0FBQ0g7O0FBQUE7QUFDRCxXQUFLM0IsYUFBTCxDQUFtQjRCLGNBQW5CLENBQWtDLEtBQUt6QixhQUFMLENBQW1CUyxJQUFyRCxFQUEyRCxNQUEzRCxFQUFtRTZCLEdBQW5FO0FBQ0EsV0FBS3RDLGFBQUwsQ0FBbUIwQixRQUFuQixDQUE0QlksR0FBNUI7QUFDQSxXQUFLakMsUUFBTDtBQUNIOztBQUFBO0FBQ0osR0FuSkk7QUFxSkw7QUFDQXVDLEVBQUFBLDJCQXRKSyx5Q0FzSnlCO0FBQUE7O0FBQzFCLFNBQUt6QyxhQUFMLENBQW1CK0IsaUJBQW5CLENBQXFDLGNBQXJDO0FBQ0EsU0FBS2pDLGFBQUwsQ0FBbUI0QyxpQkFBbkIsQ0FBcUMsWUFBTTtBQUN2QyxVQUFJUCxHQUFHLEdBQUcsQ0FBVjs7QUFDQSxXQUFLLElBQUl4QixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUksQ0FBQzFCLGVBQUwsQ0FBcUJzQixRQUFyQixDQUE4Qm9CLE1BQWxELEVBQTBEaEIsQ0FBQyxFQUEzRCxFQUErRDtBQUMzRCxZQUFJVSxLQUFLLEdBQUc3QyxTQUFTLENBQUNBLFNBQVYsQ0FBb0JvQyxTQUFwQixDQUE4QkQsQ0FBOUIsRUFBaUNVLEtBQTdDO0FBQ0EsWUFBSU8sVUFBVSxHQUFHcEQsU0FBUyxDQUFDQSxTQUFWLENBQW9Cb0MsU0FBcEIsQ0FBOEJELENBQTlCLEVBQWlDaUIsVUFBbEQsQ0FGMkQsQ0FFRTs7QUFDN0QsWUFBSUEsVUFBVSxHQUFHLENBQWpCLEVBQW9CO0FBQ3BCLFlBQUlRLElBQUksR0FBRzFELE1BQU0sQ0FBQzJELEtBQVAsQ0FBYVQsVUFBYixFQUF5QlEsSUFBcEM7QUFDQUQsUUFBQUEsR0FBRyxJQUFJZCxLQUFLLEdBQUdlLElBQWY7QUFDSDs7QUFBQTs7QUFDRCxVQUFJRCxHQUFHLElBQUksQ0FBWCxFQUFjO0FBQ1YsUUFBQSxLQUFJLENBQUN6QyxhQUFMLENBQW1CNEIsY0FBbkIsQ0FBa0MsS0FBSSxDQUFDekIsYUFBTCxDQUFtQlMsSUFBckQsRUFBMkQsU0FBM0Q7QUFDSCxPQUZELE1BRU87QUFDSCxhQUFLLElBQUlrQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUksQ0FBQ3ZELGVBQUwsQ0FBcUJzQixRQUFyQixDQUE4Qm9CLE1BQWxELEVBQTBEYSxDQUFDLEVBQTNELEVBQStEO0FBQzNEaEUsVUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9Cb0MsU0FBcEIsQ0FBOEI0QixDQUE5QixFQUFpQ25CLEtBQWpDLEdBQXlDLENBQXpDO0FBQ0g7O0FBQUE7O0FBQ0QsUUFBQSxLQUFJLENBQUMzQixhQUFMLENBQW1CNEIsY0FBbkIsQ0FBa0MsS0FBSSxDQUFDekIsYUFBTCxDQUFtQlMsSUFBckQsRUFBMkQsTUFBM0QsRUFBbUU2QixHQUFuRTs7QUFDQSxRQUFBLEtBQUksQ0FBQ3RDLGFBQUwsQ0FBbUIwQixRQUFuQixDQUE0QlksR0FBRyxHQUFHLENBQWxDOztBQUNBLFFBQUEsS0FBSSxDQUFDakMsUUFBTDtBQUNIOztBQUFBO0FBQ0osS0FuQkQ7QUFvQkgsR0E1S0k7QUE4S0w7QUFDQXlDLEVBQUFBLFlBQVksRUFBRSx3QkFBWTtBQUN0QixRQUFJLE9BQVFDLEVBQVIsSUFBZSxXQUFuQixFQUFnQztBQUM1QixVQUFJQyxRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFZO0FBQ3ZCLFlBQUksS0FBSzlDLFVBQUwsQ0FBZ0IrQyxXQUFoQixJQUErQixDQUEvQixJQUFvQyxLQUFLL0MsVUFBTCxDQUFnQmdELFNBQWhCLElBQTZCLGFBQXJFLEVBQW9GO0FBQ2hGLGVBQUtoRCxVQUFMLENBQWdCZ0QsU0FBaEIsR0FBNEIsSUFBNUI7QUFDQSxlQUFLaEQsVUFBTCxDQUFnQitDLFdBQWhCLEdBQThCLENBQTlCO0FBQ0EsY0FBSVgsR0FBRyxHQUFHLENBQVY7O0FBQ0EsZUFBSyxJQUFJeEIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLMUIsZUFBTCxDQUFxQnNCLFFBQXJCLENBQThCb0IsTUFBbEQsRUFBMERoQixDQUFDLEVBQTNELEVBQStEO0FBQzNELGdCQUFJVSxLQUFLLEdBQUc3QyxTQUFTLENBQUNBLFNBQVYsQ0FBb0JvQyxTQUFwQixDQUE4QkQsQ0FBOUIsRUFBaUNVLEtBQTdDO0FBQ0EsZ0JBQUllLElBQUksR0FBRzFELE1BQU0sQ0FBQzJELEtBQVAsQ0FBYTFCLENBQWIsRUFBZ0J5QixJQUEzQjtBQUNBRCxZQUFBQSxHQUFHLElBQUlkLEtBQUssR0FBR2UsSUFBZjtBQUNIOztBQUFBOztBQUNELGVBQUssSUFBSUksQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLdkQsZUFBTCxDQUFxQnNCLFFBQXJCLENBQThCb0IsTUFBbEQsRUFBMERhLENBQUMsRUFBM0QsRUFBK0Q7QUFDM0RoRSxZQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0JvQyxTQUFwQixDQUE4QjRCLENBQTlCLEVBQWlDbkIsS0FBakMsR0FBeUMsQ0FBekM7QUFDSDs7QUFBQTtBQUNELGVBQUszQixhQUFMLENBQW1CNEIsY0FBbkIsQ0FBa0MsS0FBS3pCLGFBQUwsQ0FBbUJTLElBQXJELEVBQTJELE1BQTNELEVBQW1FNkIsR0FBRyxHQUFHLENBQXpFO0FBQ0EsZUFBS3RDLGFBQUwsQ0FBbUIwQixRQUFuQixDQUE0QlksR0FBRyxHQUFHLENBQWxDO0FBQ0EsZUFBS2pDLFFBQUw7QUFDQSxlQUFLOEMsVUFBTCxDQUFnQkgsUUFBaEI7QUFDSCxTQWhCRCxNQWdCTztBQUNILGNBQUksS0FBSzlDLFVBQUwsQ0FBZ0JnRCxTQUFoQixJQUE2QixJQUE3QixJQUFxQyxLQUFLaEQsVUFBTCxDQUFnQitDLFdBQWhCLElBQStCLENBQXhFLEVBQTJFO0FBQ3ZFLGlCQUFLRSxVQUFMLENBQWdCSCxRQUFoQjtBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixPQXRCRDs7QUF1QkEsV0FBS0ksUUFBTCxDQUFjSixRQUFkLEVBQXdCLEdBQXhCO0FBQ0g7O0FBQUE7QUFDSixHQTFNSTtBQTJNTEssRUFBQUEsTUEzTUssb0JBMk1JLENBRVIsQ0E3TUk7QUErTUxDLEVBQUFBLEtBL01LLG1CQStNRyxDQUVQLENBak5JLENBbU5MOztBQW5OSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcclxudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCJjb25maWdcIik7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYm94X2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBpY29uX2dyb3VwX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgbGFiZWxfZ3JvdXBfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICAvLyBlc3RpbWF0ZV9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgbG9ja19ncm91cF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGNvbmZpcm1fYnV0dG9uX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgc3VtX2dvbGQ6IDAsXHJcbiAgICAgICAgc3VtX2RpYW1vbmQ6IDAsXHJcbiAgICAgICAgaW5kZXg6IDAsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XHJcbiAgICAgICAgdGhpcy5hZHNNYW5hZ2VyX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiQWRzTWFuYWdlclwiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wgPSBjYy5maW5kKFwiYWRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJhZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfYmFubmVyQWQoKTtcclxuICAgICAgICB0aGlzLnNldF9zZWxsKCk7XHJcbiAgICAgICAgLy8gdGhpcy5zZXRfZXN0aW1hdGVfbGFiZWwoKTtcclxuICAgIH0sXHJcbiAgICBidXR0b25fdW5sb2NrX2NsaWNrKGUsIGN1c3RvbSkgeyAgICAgICAgLy8gYnV0dG9uIHVubG9jayByZXBvXHJcbiAgICAgICAgLy8gaWYgKGN1c3RvbSA8PSA3KSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzJdLmFjdGl2ZSA9IGZhbHNlOyAgIC8vIHNob3cgUE9QLVVQIG9wZW4gbmV3IHJlcG9cclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bM10uYWN0aXZlID0gdHJ1ZTsgICAgLy8gaGlkZGVuIHJlcG9cclxuICAgICAgICB0aGlzLnNob3dfY29tZmlybV9idXkoY3VzdG9tKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZVxyXG4gICAgICAgIC8vICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwiY2FudF91bmxvY2tfcmVwb1wiKTtcclxuICAgIH0sXHJcbiAgICBzaG93X2NvbWZpcm1fYnV5OiBmdW5jdGlvbiAoY3VzdG9tKSB7ICAgICAgIC8vIGhp4buDbiB0aOG7iyBz4buRIHRp4buBbiDEkeG7gyBtdWEgcsawxqFuZywgdGjDqm0gbsO6dCB4w6FjIG5o4bqtblxyXG4gICAgICAgIHRoaXMuc3VtX2dvbGQgPSBOdW1iZXIoMCk7XHJcbiAgICAgICAgdGhpcy5zdW1fZGlhbW9uZCA9IE51bWJlcigwKTtcclxuICAgICAgICAvLyB2YXIgc3VtX2RpYW1vbmQgPSAwO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGN1c3RvbTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5oYXZlID09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS50eXBlX2J1eSA9PSBcImdvbGRcIilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1bV9nb2xkICs9IHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmNvc3Q7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMuc3VtX2RpYW1vbmQgKz0gdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uY29zdDtcclxuICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhcIjQzIGluZGV4IFwiICsgaSArIFwiIGNvc3QgXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3N0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bM10uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkRvIHlvdSB3YW50IHVzZSBcIiArIHRoaXMuc3VtX2dvbGQgKyBcIiBnb2xkIGFuZCBcIiArIHRoaXMuc3VtX2RpYW1vbmQgKyBcIiBkaWFtb25kIHRvIGJ1eSBuZXcgcmVwb3NpdG9yeT9cIjtcclxuICAgICAgICB0aGlzLmluZGV4ID0gY3VzdG9tO1xyXG4gICAgfSxcclxuICAgIGJ1eV9yZXBvOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA+PSB0aGlzLnN1bV9nb2xkICYmIHVzZXJfZGF0YS51c2VyX2RhdGEuZGlhbW9uZCA+PSB0aGlzLnN1bV9kaWFtb25kKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwic3VtX2dvZGwgXCIgKyBzdW1fZ29sZCk7XHJcbiAgICAgICAgICAgIC8vIHVzZXJfZGF0YS51c2VyX2RhdGEuZGlhbW9uZCAtPSB0aGlzLnN1bV9kaWFtb25kO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSB0aGlzLmluZGV4OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmhhdmUgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NrX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3VudCArIFwiLzMwXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwidW5sb2NrZWRfcmVwb1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2dvbGQoLXRoaXMuc3VtX2dvbGQpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2RpYW1vbmQoLXRoaXMuc3VtX2RpYW1vbmQpO1xyXG4gICAgICAgICAgICB0aGlzLnRvdWNoX2V4aXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkIDwgdGhpcy5nb2xkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJub19tb25leV9nb2xkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmRpYW1vbmQsIHRoaXMuZGlhbW9uZClcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcIm5vX21vbmV5X2RpYW1vbmRcIik7XHJcbiAgICAgICAgZWxzZSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwibm9fbW9uZXlcIik7XHJcbiAgICB9LFxyXG4gICAgLy8gYXV0b19zZWxsOiBmdW5jdGlvbiAoKSB7ICAgIC8vIHThu7EgxJHhu5luZyBiw6FuIGjDoG5nIHRyb25nIGtobyAvLyBjaMawYSB4b25nXHJcbiAgICAvLyAgICAgdmFyIHRpbWVfYXV0byA9IDYwICogNjA7XHJcblxyXG4gICAgLy8gICAgIHZhciBhdXRvID0gZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gICAgICAgICB0aW1lX2F1dG8gLT0wLjE7XHJcbiAgICAvLyAgICAgfTtcclxuICAgIC8vICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuYXV0bywgMC4xKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgc2V0X3NlbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYWxsX2NhcGFjaXR5ID0gMzA7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmljb25fZ3JvdXBfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY291bnQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3VudDtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGNvdW50ICsgXCIvXCIgKyBhbGxfY2FwYWNpdHk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2tfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlkX3Byb2R1Y3QgPSB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5pZF9wcm9kdWN0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5ib3hfZnJhbWVfYXJyW2lkX3Byb2R1Y3RdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pY29uX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJveF9mcmFtZV9hcnJbOF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAnJztcclxuICAgICAgICAgICAgICAgIHRoaXMubG9ja19ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5TcHJpdGVGcmFtZSA9IHRoaXMuYm94X2ZyYW1lX2Fycls4XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdG91Y2hfZXhpdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUuY2hpbGRyZW5bMl0uYWN0aXZlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblsyXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bM10uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcclxuICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLmhpZGVfYmFubmVyQWQoKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgLy/orr7nva7pooTorqHljZblh7rmloflrZdcclxuICAgIHNldF9lc3RpbWF0ZV9sYWJlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzdW0gPSAwO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pY29uX2dyb3VwX25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNvdW50ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uY291bnQ7XHJcbiAgICAgICAgICAgIHZhciBzZWxsID0gY29uZmlnLnBsYW50W2ldLnNlbGw7XHJcbiAgICAgICAgICAgIHN1bSArPSBjb3VudCAqIHNlbGw7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmVzdGltYXRlX2xhYmVsLnN0cmluZyA9IFwiRXhwZWN0ZWQgdG8gc2VsbDogXCIgKyBzdW07XHJcbiAgICB9LFxyXG4gICAgLy/mma7pgJrljZblh7pcclxuICAgIG9uX3NlbGxfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHZhciBzdW0gPSAwO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pY29uX2dyb3VwX25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNvdW50ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uY291bnQ7XHJcbiAgICAgICAgICAgIHZhciBpZF9wcm9kdWN0ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uaWRfcHJvZHVjdDsvLyBs4bqleSBpZCBj4bunYSBjw6J5IHRyb25nIG3hu5dpIGtob1xyXG4gICAgICAgICAgICBpZiAoaWRfcHJvZHVjdCA+IDcpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB2YXIgc2VsbCA9IGNvbmZpZy5wbGFudFtpZF9wcm9kdWN0XS5zZWxsO1xyXG4gICAgICAgICAgICBzdW0gKz0gY291bnQgKiBzZWxsO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHN1bSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJub19zZWxsXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5pY29uX2dyb3VwX25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2pdLmNvdW50ID0gMDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9ydWxlc19qcy5ub2RlLCBcImdvbGRcIiwgc3VtKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKHN1bSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0X3NlbGwoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvL2RvdWJsZV9zZWxsX2J1dHRvbl9jbGlja1xyXG4gICAgb25fZG91YmxlX3NlbGxfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICB0aGlzLmFkc01hbmFnZXJfanMuc2hvd1Jld2FyZGVkVmlkZW8oKCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgc3VtID0gMDtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmljb25fZ3JvdXBfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uY291bnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgaWRfcHJvZHVjdCA9IHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmlkX3Byb2R1Y3Q7Ly8gbOG6pXkgaWQgY+G7p2EgY8OieSB0cm9uZyBt4buXaSBraG9cclxuICAgICAgICAgICAgICAgIGlmIChpZF9wcm9kdWN0ID4gNykgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsbCA9IGNvbmZpZy5wbGFudFtpZF9wcm9kdWN0XS5zZWxsO1xyXG4gICAgICAgICAgICAgICAgc3VtICs9IGNvdW50ICogc2VsbDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKHN1bSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3J1bGVzX2pzLm5vZGUsIFwibm9fc2VsbFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5pY29uX2dyb3VwX25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtqXS5jb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9ydWxlc19qcy5ub2RlLCBcImdvbGRcIiwgc3VtKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZ29sZChzdW0gKiAyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0X3NlbGwoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/mo4DmtYvop4bpopHmmK/lkKbmkq3mlL7miJDlip9cclxuICAgIHZpZGVvX3N1Y2NlczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMSAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID09IFwiZG91YmxlX3NlbGxcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1bSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmljb25fZ3JvdXBfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY291bnQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGwgPSBjb25maWcucGxhbnRbaV0uc2VsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtICs9IGNvdW50ICogc2VsbDtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5pY29uX2dyb3VwX25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2Vbal0uY291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9ydWxlc19qcy5ub2RlLCBcImdvbGRcIiwgc3VtICogMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKHN1bSAqIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0X3NlbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9PSBudWxsICYmIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMik7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19