
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/pet_content.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '18de8zrDEZL84roo614WUE/', 'pet_content');
// script/ui/pet_content.js

"use strict";

var config = require("config");

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    name_label: cc.Label,
    introduce_label: cc.Label,
    skill_introduce_label: cc.Label,
    progress: cc.ProgressBar,
    cultrue_button_node: cc.Node,
    button_frame_arr: [cc.SpriteFrame],
    pet_icon_arr: [cc.SpriteFrame],
    pet_sprite: cc.Sprite,
    share_label: cc.Node,
    button_buy: cc.Node,
    label_cost: cc.Label
  },
  // LIFE-CYCLE CALLBACKS:
  //初始化节点
  ini_node: function ini_node(index) {
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.index = index;
    this.update_content();
  },
  update_content: function update_content() {
    this.pet_sprite.spriteFrame = this.pet_icon_arr[this.index];
    this.name_label.string = config.pet[this.index].name;
    this.introduce_label.string = config.pet[this.index].introduce;
    this.skill_introduce_label.string = config.pet[this.index].skill_introduce;
    this.label_cost.string = config.pet[this.index].cost; // else this.icon.getComponent(cc.Sprite).SpriteFrame = icon_arr[1];
    // this.progress.progress = user_data.user_data.pet[this.index].have_ad / config.pet[this.index].need_ad;

    if (user_data.user_data.pet[this.index].have == 1) this.button_buy.active = false;
  },
  //培养按钮被点击
  on_cultrue_button_click: function on_cultrue_button_click() {
    this.sound_control.play_sound_effect("button_click"); // if (config.pet[this.index].get_type == "ad"){
    //     this.ad_control.show_videoAd("cultrue_pet");
    //     this.video_succes();
    // } else {
    //分享获取

    var share_count = user_data.user_data.pet[this.index].share_count;
    var share_max = config.pet[this.index].share_max; // if (share_count < share_max) {
    //正常分享

    this.ad_control.manual_share("pet");
    this.share_succes(); // } else {
    //     //次数已满
    //     this.game_scene_js.create_tips_ui(this.game_rules_js.node, "share_max");
    // };
    // };
  },
  //检测视频是否播放成功
  video_succes: function video_succes() {
    if (typeof wx != "undefined") {
      var callback = function callback() {
        if (this.ad_control.video_state == 1 && this.ad_control.video_tag == "cultrue_pet") {
          this.ad_control.video_tag = null;
          this.ad_control.video_state = 2;
          user_data.user_data.pet[this.index].have_ad++;

          if (user_data.user_data.pet[this.index].have_ad >= config.pet[this.index].need_ad) {
            user_data.user_data.pet[this.index].have = 1;
            this.game_rules_js.create_pet_a(this.index);
            this.game_scene_js.create_tips_ui(this.game_rules_js.node, "cultrue_succes");
          }

          ;
          this.update_content();
          this.game_scene_js.create_tips_ui(this.game_scene_js.node, "cultrue_pet_succes");
          this.unschedule(callback);
        } else {
          if (this.ad_control.video_tag == null && this.ad_control.video_state == 2) {
            this.unschedule(callback);
          }

          ;
        }

        ;
      };

      this.schedule(callback, 0.1);
    }

    ;
  },
  buy_pet: function buy_pet() {
    var type = config.pet[this.index].type_buy;

    switch (type) {
      case "gold":
        if (user_data.user_data.gold >= config.pet[this.index].cost) {
          user_data.user_data.gold -= config.pet[this.index].cost;
          user_data.user_data.pet[this.index].have = 1;
          this.game_scene_js.create_pet(this.game_scene_js.node, this.index);
          this.button_buy.active = false;
        } else this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money_gold");

        this.update_content();
        break;

      case "diamond": // chưa có diamond trong config 
      // if (user_data.user_data.diamond >= config.pet[this.index].cost) {
      //     user_data.user_data.diamond -= config.pet[this.index].cost;
      //     user_data.user_data.pet[this.index].have = 1;
      //     this.game_scene_js.create_pet(this.game_scene_js.node, this.index);
      //     this.button_buy.active = false;
      // }
      // else this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money");
      // this.update_content();
      // break;

    }
  },
  //分享检测
  share_succes: function share_succes() {
    var share_schedule = function share_schedule() {
      if (this.ad_control.share_state == "share_succes" && this.ad_control.share_tag == "pet") {
        this.ad_control.ini_share(); //宠物生成的时间

        var now_time = new Date().getTime();

        if ((now_time - user_data.user_data.pet[this.index].create_time) * 1000 >= config.pet[this.index].stay_time) {
          //宠物不存在
          user_data.user_data.pet[this.index].create_time = new Date().getTime();
          user_data.user_data.pet[this.index].have = 1;
          user_data.user_data.pet[this.index].share_count++;
          this.game_rules_js.create_pet_a(this.index);
          this.game_scene_js.create_tips_ui(this.game_rules_js.node, "cultrue_succes");
          this.update_content();
          this.unschedule(share_schedule);
        } else {
          this.unschedule(share_schedule);
          this.game_scene_js.create_tips_ui(this.game_scene_js.node, "pet_already_life");
        }

        ;
      } else {
        //未分享停止检测
        if (this.ad_control.share_state == "un_share" && this.ad_control.share_tag == null) {
          this.unschedule(share_schedule);
        }

        ;
      }

      ;
    };

    this.schedule(share_schedule, 0.2);
  },
  //onLoad() { },
  start: function start() {
    this.update_content();
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxccGV0X2NvbnRlbnQuanMiXSwibmFtZXMiOlsiY29uZmlnIiwicmVxdWlyZSIsInVzZXJfZGF0YSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibmFtZV9sYWJlbCIsIkxhYmVsIiwiaW50cm9kdWNlX2xhYmVsIiwic2tpbGxfaW50cm9kdWNlX2xhYmVsIiwicHJvZ3Jlc3MiLCJQcm9ncmVzc0JhciIsImN1bHRydWVfYnV0dG9uX25vZGUiLCJOb2RlIiwiYnV0dG9uX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwicGV0X2ljb25fYXJyIiwicGV0X3Nwcml0ZSIsIlNwcml0ZSIsInNoYXJlX2xhYmVsIiwiYnV0dG9uX2J1eSIsImxhYmVsX2Nvc3QiLCJpbmlfbm9kZSIsImluZGV4IiwiZ2FtZV9ydWxlc19qcyIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3NjZW5lX2pzIiwiYWRfY29udHJvbCIsInNvdW5kX2NvbnRyb2wiLCJ1cGRhdGVfY29udGVudCIsInNwcml0ZUZyYW1lIiwic3RyaW5nIiwicGV0IiwibmFtZSIsImludHJvZHVjZSIsInNraWxsX2ludHJvZHVjZSIsImNvc3QiLCJoYXZlIiwiYWN0aXZlIiwib25fY3VsdHJ1ZV9idXR0b25fY2xpY2siLCJwbGF5X3NvdW5kX2VmZmVjdCIsInNoYXJlX2NvdW50Iiwic2hhcmVfbWF4IiwibWFudWFsX3NoYXJlIiwic2hhcmVfc3VjY2VzIiwidmlkZW9fc3VjY2VzIiwid3giLCJjYWxsYmFjayIsInZpZGVvX3N0YXRlIiwidmlkZW9fdGFnIiwiaGF2ZV9hZCIsIm5lZWRfYWQiLCJjcmVhdGVfcGV0X2EiLCJjcmVhdGVfdGlwc191aSIsIm5vZGUiLCJ1bnNjaGVkdWxlIiwic2NoZWR1bGUiLCJidXlfcGV0IiwidHlwZSIsInR5cGVfYnV5IiwiZ29sZCIsImNyZWF0ZV9wZXQiLCJzaGFyZV9zY2hlZHVsZSIsInNoYXJlX3N0YXRlIiwic2hhcmVfdGFnIiwiaW5pX3NoYXJlIiwibm93X3RpbWUiLCJEYXRlIiwiZ2V0VGltZSIsImNyZWF0ZV90aW1lIiwic3RheV90aW1lIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQSxJQUFJQyxTQUFTLEdBQUdELE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBRSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsVUFBVSxFQUFFSixFQUFFLENBQUNLLEtBRFA7QUFFUkMsSUFBQUEsZUFBZSxFQUFFTixFQUFFLENBQUNLLEtBRlo7QUFHUkUsSUFBQUEscUJBQXFCLEVBQUVQLEVBQUUsQ0FBQ0ssS0FIbEI7QUFJUkcsSUFBQUEsUUFBUSxFQUFFUixFQUFFLENBQUNTLFdBSkw7QUFLUkMsSUFBQUEsbUJBQW1CLEVBQUVWLEVBQUUsQ0FBQ1csSUFMaEI7QUFNUkMsSUFBQUEsZ0JBQWdCLEVBQUUsQ0FBQ1osRUFBRSxDQUFDYSxXQUFKLENBTlY7QUFPUkMsSUFBQUEsWUFBWSxFQUFFLENBQUNkLEVBQUUsQ0FBQ2EsV0FBSixDQVBOO0FBUVJFLElBQUFBLFVBQVUsRUFBRWYsRUFBRSxDQUFDZ0IsTUFSUDtBQVNSQyxJQUFBQSxXQUFXLEVBQUVqQixFQUFFLENBQUNXLElBVFI7QUFVUk8sSUFBQUEsVUFBVSxFQUFFbEIsRUFBRSxDQUFDVyxJQVZQO0FBV1JRLElBQUFBLFVBQVUsRUFBRW5CLEVBQUUsQ0FBQ0s7QUFYUCxHQUhQO0FBaUJMO0FBQ0E7QUFDQWUsRUFBQUEsUUFuQkssb0JBbUJJQyxLQW5CSixFQW1CVztBQUNaLFNBQUtDLGFBQUwsR0FBcUJ0QixFQUFFLENBQUN1QixJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCekIsRUFB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QUFrRCxJQUFJRixJQUFKLEdBQVdDLE9BQVgsRUFBbEQ7QUFDQXBFLFVBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQmdDLEdBQXBCLENBQXdCLEtBQUtWLEtBQTdCLEVBQW9DZSxJQUFwQyxHQUEyQyxDQUEzQztBQUNBckMsVUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CZ0MsR0FBcEIsQ0FBd0IsS0FBS1YsS0FBN0IsRUFBb0NtQixXQUFwQztBQUNBLGVBQUtsQixhQUFMLENBQW1CNkIsWUFBbkIsQ0FBZ0MsS0FBSzlCLEtBQXJDO0FBQ0EsZUFBS0ksYUFBTCxDQUFtQjJCLGNBQW5CLENBQWtDLEtBQUs5QixhQUFMLENBQW1CK0IsSUFBckQsRUFBMkQsZ0JBQTNEO0FBQ0EsZUFBS3pCLGNBQUw7QUFDQSxlQUFLMEIsVUFBTCxDQUFnQk8sY0FBaEI7QUFDSCxTQVRELE1BU087QUFDSCxlQUFLUCxVQUFMLENBQWdCTyxjQUFoQjtBQUNBLGVBQUtwQyxhQUFMLENBQW1CMkIsY0FBbkIsQ0FBa0MsS0FBSzNCLGFBQUwsQ0FBbUI0QixJQUFyRCxFQUEyRCxrQkFBM0Q7QUFDSDs7QUFBQTtBQUVKLE9BbEJELE1Ba0JPO0FBQ0g7QUFDQSxZQUFJLEtBQUszQixVQUFMLENBQWdCb0MsV0FBaEIsSUFBK0IsVUFBL0IsSUFBNkMsS0FBS3BDLFVBQUwsQ0FBZ0JxQyxTQUFoQixJQUE2QixJQUE5RSxFQUFvRjtBQUNoRixlQUFLVCxVQUFMLENBQWdCTyxjQUFoQjtBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixLQXpCRDs7QUEwQkEsU0FBS04sUUFBTCxDQUFjTSxjQUFkLEVBQThCLEdBQTlCO0FBQ0gsR0E5SUk7QUFnSkw7QUFFQVMsRUFBQUEsS0FsSkssbUJBa0pHO0FBQ0osU0FBSzFDLGNBQUw7QUFDSCxHQXBKSSxDQXNKTDs7QUF0SkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbmZpZyA9IHJlcXVpcmUoXCJjb25maWdcIik7XHJcbnZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG5hbWVfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGludHJvZHVjZV9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgc2tpbGxfaW50cm9kdWNlX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBwcm9ncmVzczogY2MuUHJvZ3Jlc3NCYXIsXHJcbiAgICAgICAgY3VsdHJ1ZV9idXR0b25fbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBidXR0b25fZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgICAgIHBldF9pY29uX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBwZXRfc3ByaXRlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgc2hhcmVfbGFiZWw6IGNjLk5vZGUsXHJcbiAgICAgICAgYnV0dG9uX2J1eTogY2MuTm9kZSxcclxuICAgICAgICBsYWJlbF9jb3N0OiBjYy5MYWJlbCxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcbiAgICAvL+WIneWni+WMluiKgueCuVxyXG4gICAgaW5pX25vZGUoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3J1bGVzXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9jb250ZW50KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZV9jb250ZW50KCkge1xyXG4gICAgICAgIHRoaXMucGV0X3Nwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMucGV0X2ljb25fYXJyW3RoaXMuaW5kZXhdO1xyXG4gICAgICAgIHRoaXMubmFtZV9sYWJlbC5zdHJpbmcgPSBjb25maWcucGV0W3RoaXMuaW5kZXhdLm5hbWU7XHJcbiAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gY29uZmlnLnBldFt0aGlzLmluZGV4XS5pbnRyb2R1Y2U7XHJcbiAgICAgICAgdGhpcy5za2lsbF9pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gY29uZmlnLnBldFt0aGlzLmluZGV4XS5za2lsbF9pbnRyb2R1Y2U7XHJcbiAgICAgICAgdGhpcy5sYWJlbF9jb3N0LnN0cmluZyA9IGNvbmZpZy5wZXRbdGhpcy5pbmRleF0uY29zdDtcclxuICAgICAgICAvLyBlbHNlIHRoaXMuaWNvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5TcHJpdGVGcmFtZSA9IGljb25fYXJyWzFdO1xyXG4gICAgICAgIC8vIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLmluZGV4XS5oYXZlX2FkIC8gY29uZmlnLnBldFt0aGlzLmluZGV4XS5uZWVkX2FkO1xyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLmluZGV4XS5oYXZlID09IDEpIHRoaXMuYnV0dG9uX2J1eS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICAvL+WfueWFu+aMiemSruiiq+eCueWHu1xyXG4gICAgb25fY3VsdHJ1ZV9idXR0b25fY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIC8vIGlmIChjb25maWcucGV0W3RoaXMuaW5kZXhdLmdldF90eXBlID09IFwiYWRcIil7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuYWRfY29udHJvbC5zaG93X3ZpZGVvQWQoXCJjdWx0cnVlX3BldFwiKTtcclxuICAgICAgICAvLyAgICAgdGhpcy52aWRlb19zdWNjZXMoKTtcclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8v5YiG5Lqr6I635Y+WXHJcbiAgICAgICAgdmFyIHNoYXJlX2NvdW50ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5pbmRleF0uc2hhcmVfY291bnQ7XHJcbiAgICAgICAgdmFyIHNoYXJlX21heCA9IGNvbmZpZy5wZXRbdGhpcy5pbmRleF0uc2hhcmVfbWF4O1xyXG4gICAgICAgIC8vIGlmIChzaGFyZV9jb3VudCA8IHNoYXJlX21heCkge1xyXG4gICAgICAgIC8v5q2j5bi45YiG5LqrXHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLm1hbnVhbF9zaGFyZShcInBldFwiKTtcclxuICAgICAgICB0aGlzLnNoYXJlX3N1Y2NlcygpO1xyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIC8v5qyh5pWw5bey5ruhXHJcbiAgICAgICAgLy8gICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJzaGFyZV9tYXhcIik7XHJcbiAgICAgICAgLy8gfTtcclxuICAgICAgICAvLyB9O1xyXG4gICAgfSxcclxuICAgIC8v5qOA5rWL6KeG6aKR5piv5ZCm5pKt5pS+5oiQ5YqfXHJcbiAgICB2aWRlb19zdWNjZXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID09IDEgJiYgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9PSBcImN1bHRydWVfcGV0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W3RoaXMuaW5kZXhdLmhhdmVfYWQrKztcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5pbmRleF0uaGF2ZV9hZCA+PSBjb25maWcucGV0W3RoaXMuaW5kZXhdLm5lZWRfYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5pbmRleF0uaGF2ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5jcmVhdGVfcGV0X2EodGhpcy5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJjdWx0cnVlX3N1Y2Nlc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlX2NvbnRlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwiY3VsdHJ1ZV9wZXRfc3VjY2VzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID09IG51bGwgJiYgdGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4xKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGJ1eV9wZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdHlwZSA9IGNvbmZpZy5wZXRbdGhpcy5pbmRleF0udHlwZV9idXk7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJnb2xkXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID49IGNvbmZpZy5wZXRbdGhpcy5pbmRleF0uY29zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCAtPSBjb25maWcucGV0W3RoaXMuaW5kZXhdLmNvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5pbmRleF0uaGF2ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9wZXQodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIHRoaXMuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX2J1eS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcIm5vX21vbmV5X2dvbGRcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV9jb250ZW50KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImRpYW1vbmRcIjogLy8gY2jGsGEgY8OzIGRpYW1vbmQgdHJvbmcgY29uZmlnIFxyXG4gICAgICAgICAgICAvLyBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5kaWFtb25kID49IGNvbmZpZy5wZXRbdGhpcy5pbmRleF0uY29zdCkge1xyXG4gICAgICAgICAgICAvLyAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5kaWFtb25kIC09IGNvbmZpZy5wZXRbdGhpcy5pbmRleF0uY29zdDtcclxuICAgICAgICAgICAgLy8gICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W3RoaXMuaW5kZXhdLmhhdmUgPSAxO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9wZXQodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIHRoaXMuaW5kZXgpO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5idXR0b25fYnV5LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGVsc2UgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcIm5vX21vbmV5XCIpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLnVwZGF0ZV9jb250ZW50KCk7XHJcbiAgICAgICAgICAgIC8vIGJyZWFrO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICB9LFxyXG4gICAgLy/liIbkuqvmo4DmtYtcclxuICAgIHNoYXJlX3N1Y2NlcygpIHtcclxuICAgICAgICB2YXIgc2hhcmVfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFkX2NvbnRyb2wuc2hhcmVfc3RhdGUgPT0gXCJzaGFyZV9zdWNjZXNcIiAmJiB0aGlzLmFkX2NvbnRyb2wuc2hhcmVfdGFnID09IFwicGV0XCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC5pbmlfc2hhcmUoKTtcclxuICAgICAgICAgICAgICAgIC8v5a6g54mp55Sf5oiQ55qE5pe26Ze0XHJcbiAgICAgICAgICAgICAgICB2YXIgbm93X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIGlmICgobm93X3RpbWUgLSB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLmluZGV4XS5jcmVhdGVfdGltZSkgKiAxMDAwID49IGNvbmZpZy5wZXRbdGhpcy5pbmRleF0uc3RheV90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lrqDniankuI3lrZjlnKhcclxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLmluZGV4XS5jcmVhdGVfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W3RoaXMuaW5kZXhdLmhhdmUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W3RoaXMuaW5kZXhdLnNoYXJlX2NvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmNyZWF0ZV9wZXRfYSh0aGlzLmluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3J1bGVzX2pzLm5vZGUsIFwiY3VsdHJ1ZV9zdWNjZXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVfY29udGVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShzaGFyZV9zY2hlZHVsZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShzaGFyZV9zY2hlZHVsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInBldF9hbHJlYWR5X2xpZmVcIik7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8v5pyq5YiG5Lqr5YGc5q2i5qOA5rWLXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZF9jb250cm9sLnNoYXJlX3N0YXRlID09IFwidW5fc2hhcmVcIiAmJiB0aGlzLmFkX2NvbnRyb2wuc2hhcmVfdGFnID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoc2hhcmVfc2NoZWR1bGUpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoc2hhcmVfc2NoZWR1bGUsIDAuMilcclxuICAgIH0sXHJcblxyXG4gICAgLy9vbkxvYWQoKSB7IH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfY29udGVudCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==