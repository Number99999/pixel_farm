
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxccGV0X2NvbnRlbnQuanMiXSwibmFtZXMiOlsiY29uZmlnIiwicmVxdWlyZSIsInVzZXJfZGF0YSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibmFtZV9sYWJlbCIsIkxhYmVsIiwiaW50cm9kdWNlX2xhYmVsIiwic2tpbGxfaW50cm9kdWNlX2xhYmVsIiwicHJvZ3Jlc3MiLCJQcm9ncmVzc0JhciIsImN1bHRydWVfYnV0dG9uX25vZGUiLCJOb2RlIiwiYnV0dG9uX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwicGV0X2ljb25fYXJyIiwicGV0X3Nwcml0ZSIsIlNwcml0ZSIsInNoYXJlX2xhYmVsIiwiYnV0dG9uX2J1eSIsImxhYmVsX2Nvc3QiLCJpbmlfbm9kZSIsImluZGV4IiwiZ2FtZV9ydWxlc19qcyIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3NjZW5lX2pzIiwiYWRfY29udHJvbCIsInNvdW5kX2NvbnRyb2wiLCJ1cGRhdGVfY29udGVudCIsInNwcml0ZUZyYW1lIiwic3RyaW5nIiwicGV0IiwibmFtZSIsImludHJvZHVjZSIsInNraWxsX2ludHJvZHVjZSIsImNvc3QiLCJoYXZlIiwiYWN0aXZlIiwib25fY3VsdHJ1ZV9idXR0b25fY2xpY2siLCJwbGF5X3NvdW5kX2VmZmVjdCIsInNoYXJlX2NvdW50Iiwic2hhcmVfbWF4IiwibWFudWFsX3NoYXJlIiwic2hhcmVfc3VjY2VzIiwidmlkZW9fc3VjY2VzIiwid3giLCJjYWxsYmFjayIsInZpZGVvX3N0YXRlIiwidmlkZW9fdGFnIiwiaGF2ZV9hZCIsIm5lZWRfYWQiLCJjcmVhdGVfcGV0X2EiLCJjcmVhdGVfdGlwc191aSIsIm5vZGUiLCJ1bnNjaGVkdWxlIiwic2NoZWR1bGUiLCJidXlfcGV0IiwidHlwZSIsInR5cGVfYnV5IiwiZ29sZCIsImNyZWF0ZV9wZXQiLCJzaGFyZV9zY2hlZHVsZSIsInNoYXJlX3N0YXRlIiwic2hhcmVfdGFnIiwiaW5pX3NoYXJlIiwibm93X3RpbWUiLCJEYXRlIiwiZ2V0VGltZSIsImNyZWF0ZV90aW1lIiwic3RheV90aW1lIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQSxJQUFJQyxTQUFTLEdBQUdELE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBRSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsVUFBVSxFQUFFSixFQUFFLENBQUNLLEtBRFA7QUFFUkMsSUFBQUEsZUFBZSxFQUFFTixFQUFFLENBQUNLLEtBRlo7QUFHUkUsSUFBQUEscUJBQXFCLEVBQUVQLEVBQUUsQ0FBQ0ssS0FIbEI7QUFJUkcsSUFBQUEsUUFBUSxFQUFFUixFQUFFLENBQUNTLFdBSkw7QUFLUkMsSUFBQUEsbUJBQW1CLEVBQUVWLEVBQUUsQ0FBQ1csSUFMaEI7QUFNUkMsSUFBQUEsZ0JBQWdCLEVBQUUsQ0FBQ1osRUFBRSxDQUFDYSxXQUFKLENBTlY7QUFPUkMsSUFBQUEsWUFBWSxFQUFFLENBQUNkLEVBQUUsQ0FBQ2EsV0FBSixDQVBOO0FBUVJFLElBQUFBLFVBQVUsRUFBRWYsRUFBRSxDQUFDZ0IsTUFSUDtBQVNSQyxJQUFBQSxXQUFXLEVBQUVqQixFQUFFLENBQUNXLElBVFI7QUFVUk8sSUFBQUEsVUFBVSxFQUFFbEIsRUFBRSxDQUFDVyxJQVZQO0FBV1JRLElBQUFBLFVBQVUsRUFBRW5CLEVBQUUsQ0FBQ0s7QUFYUCxHQUhQO0FBaUJMO0FBQ0E7QUFDQWUsRUFBQUEsUUFuQkssb0JBbUJJQyxLQW5CSixFQW1CVztBQUNaLFNBQUtDLGFBQUwsR0FBcUJ0QixFQUFFLENBQUN1QixJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCekIsRUFB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QUFrRCxJQUFJRixJQUFKLEdBQVdDLE9BQVgsRUFBbEQ7QUFDQXBFLFVBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQmdDLEdBQXBCLENBQXdCLEtBQUtWLEtBQTdCLEVBQW9DZSxJQUFwQyxHQUEyQyxDQUEzQztBQUNBckMsVUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CZ0MsR0FBcEIsQ0FBd0IsS0FBS1YsS0FBN0IsRUFBb0NtQixXQUFwQztBQUNBLGVBQUtsQixhQUFMLENBQW1CNkIsWUFBbkIsQ0FBZ0MsS0FBSzlCLEtBQXJDO0FBQ0EsZUFBS0ksYUFBTCxDQUFtQjJCLGNBQW5CLENBQWtDLEtBQUs5QixhQUFMLENBQW1CK0IsSUFBckQsRUFBMkQsZ0JBQTNEO0FBQ0EsZUFBS3pCLGNBQUw7QUFDQSxlQUFLMEIsVUFBTCxDQUFnQk8sY0FBaEI7QUFDSCxTQVRELE1BU087QUFDSCxlQUFLUCxVQUFMLENBQWdCTyxjQUFoQjtBQUNBLGVBQUtwQyxhQUFMLENBQW1CMkIsY0FBbkIsQ0FBa0MsS0FBSzNCLGFBQUwsQ0FBbUI0QixJQUFyRCxFQUEyRCxrQkFBM0Q7QUFDSDs7QUFBQTtBQUVKLE9BbEJELE1Ba0JPO0FBQ0g7QUFDQSxZQUFJLEtBQUszQixVQUFMLENBQWdCb0MsV0FBaEIsSUFBK0IsVUFBL0IsSUFBNkMsS0FBS3BDLFVBQUwsQ0FBZ0JxQyxTQUFoQixJQUE2QixJQUE5RSxFQUFvRjtBQUNoRixlQUFLVCxVQUFMLENBQWdCTyxjQUFoQjtBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixLQXpCRDs7QUEwQkEsU0FBS04sUUFBTCxDQUFjTSxjQUFkLEVBQThCLEdBQTlCO0FBQ0gsR0E5SUk7QUFnSkw7QUFFQVMsRUFBQUEsS0FsSkssbUJBa0pHO0FBQ0osU0FBSzFDLGNBQUw7QUFDSCxHQXBKSSxDQXNKTDs7QUF0SkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbmZpZyA9IHJlcXVpcmUoXCJjb25maWdcIik7XG52YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG5hbWVfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBpbnRyb2R1Y2VfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBza2lsbF9pbnRyb2R1Y2VfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBwcm9ncmVzczogY2MuUHJvZ3Jlc3NCYXIsXG4gICAgICAgIGN1bHRydWVfYnV0dG9uX25vZGU6IGNjLk5vZGUsXG4gICAgICAgIGJ1dHRvbl9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIHBldF9pY29uX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcGV0X3Nwcml0ZTogY2MuU3ByaXRlLFxuICAgICAgICBzaGFyZV9sYWJlbDogY2MuTm9kZSxcbiAgICAgICAgYnV0dG9uX2J1eTogY2MuTm9kZSxcbiAgICAgICAgbGFiZWxfY29zdDogY2MuTGFiZWwsXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuICAgIC8v5Yid5aeL5YyW6IqC54K5XG4gICAgaW5pX25vZGUoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLnVwZGF0ZV9jb250ZW50KCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZV9jb250ZW50KCkge1xuICAgICAgICB0aGlzLnBldF9zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnBldF9pY29uX2Fyclt0aGlzLmluZGV4XTtcbiAgICAgICAgdGhpcy5uYW1lX2xhYmVsLnN0cmluZyA9IGNvbmZpZy5wZXRbdGhpcy5pbmRleF0ubmFtZTtcbiAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gY29uZmlnLnBldFt0aGlzLmluZGV4XS5pbnRyb2R1Y2U7XG4gICAgICAgIHRoaXMuc2tpbGxfaW50cm9kdWNlX2xhYmVsLnN0cmluZyA9IGNvbmZpZy5wZXRbdGhpcy5pbmRleF0uc2tpbGxfaW50cm9kdWNlO1xuICAgICAgICB0aGlzLmxhYmVsX2Nvc3Quc3RyaW5nID0gY29uZmlnLnBldFt0aGlzLmluZGV4XS5jb3N0O1xuICAgICAgICAvLyBlbHNlIHRoaXMuaWNvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5TcHJpdGVGcmFtZSA9IGljb25fYXJyWzFdO1xuICAgICAgICAvLyB0aGlzLnByb2dyZXNzLnByb2dyZXNzID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5pbmRleF0uaGF2ZV9hZCAvIGNvbmZpZy5wZXRbdGhpcy5pbmRleF0ubmVlZF9hZDtcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W3RoaXMuaW5kZXhdLmhhdmUgPT0gMSkgdGhpcy5idXR0b25fYnV5LmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG4gICAgLy/ln7nlhbvmjInpkq7ooqvngrnlh7tcbiAgICBvbl9jdWx0cnVlX2J1dHRvbl9jbGljaygpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICAvLyBpZiAoY29uZmlnLnBldFt0aGlzLmluZGV4XS5nZXRfdHlwZSA9PSBcImFkXCIpe1xuICAgICAgICAvLyAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfdmlkZW9BZChcImN1bHRydWVfcGV0XCIpO1xuICAgICAgICAvLyAgICAgdGhpcy52aWRlb19zdWNjZXMoKTtcbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy/liIbkuqvojrflj5ZcbiAgICAgICAgdmFyIHNoYXJlX2NvdW50ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5pbmRleF0uc2hhcmVfY291bnQ7XG4gICAgICAgIHZhciBzaGFyZV9tYXggPSBjb25maWcucGV0W3RoaXMuaW5kZXhdLnNoYXJlX21heDtcbiAgICAgICAgLy8gaWYgKHNoYXJlX2NvdW50IDwgc2hhcmVfbWF4KSB7XG4gICAgICAgIC8v5q2j5bi45YiG5LqrXG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5tYW51YWxfc2hhcmUoXCJwZXRcIik7XG4gICAgICAgIHRoaXMuc2hhcmVfc3VjY2VzKCk7XG4gICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAvL+asoeaVsOW3sua7oVxuICAgICAgICAvLyAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9ydWxlc19qcy5ub2RlLCBcInNoYXJlX21heFwiKTtcbiAgICAgICAgLy8gfTtcbiAgICAgICAgLy8gfTtcbiAgICB9LFxuICAgIC8v5qOA5rWL6KeG6aKR5piv5ZCm5pKt5pS+5oiQ5YqfXG4gICAgdmlkZW9fc3VjY2VzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAxICYmIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gXCJjdWx0cnVlX3BldFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPSAyO1xuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLmluZGV4XS5oYXZlX2FkKys7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLmluZGV4XS5oYXZlX2FkID49IGNvbmZpZy5wZXRbdGhpcy5pbmRleF0ubmVlZF9hZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5pbmRleF0uaGF2ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuY3JlYXRlX3BldF9hKHRoaXMuaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9ydWxlc19qcy5ub2RlLCBcImN1bHRydWVfc3VjY2VzXCIpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV9jb250ZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJjdWx0cnVlX3BldF9zdWNjZXNcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gbnVsbCAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBidXlfcGV0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0eXBlID0gY29uZmlnLnBldFt0aGlzLmluZGV4XS50eXBlX2J1eTtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwiZ29sZFwiOlxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPj0gY29uZmlnLnBldFt0aGlzLmluZGV4XS5jb3N0KSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCAtPSBjb25maWcucGV0W3RoaXMuaW5kZXhdLmNvc3Q7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W3RoaXMuaW5kZXhdLmhhdmUgPSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgdGhpcy5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX2J1eS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcIm5vX21vbmV5X2dvbGRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVfY29udGVudCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImRpYW1vbmRcIjogLy8gY2jGsGEgY8OzIGRpYW1vbmQgdHJvbmcgY29uZmlnIFxuICAgICAgICAgICAgLy8gaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuZGlhbW9uZCA+PSBjb25maWcucGV0W3RoaXMuaW5kZXhdLmNvc3QpIHtcbiAgICAgICAgICAgIC8vICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmRpYW1vbmQgLT0gY29uZmlnLnBldFt0aGlzLmluZGV4XS5jb3N0O1xuICAgICAgICAgICAgLy8gICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W3RoaXMuaW5kZXhdLmhhdmUgPSAxO1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCB0aGlzLmluZGV4KTtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJ1dHRvbl9idXkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBlbHNlIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJub19tb25leVwiKTtcbiAgICAgICAgICAgIC8vIHRoaXMudXBkYXRlX2NvbnRlbnQoKTtcbiAgICAgICAgICAgIC8vIGJyZWFrO1xuXG4gICAgICAgIH1cblxuXG5cbiAgICB9LFxuICAgIC8v5YiG5Lqr5qOA5rWLXG4gICAgc2hhcmVfc3VjY2VzKCkge1xuICAgICAgICB2YXIgc2hhcmVfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hZF9jb250cm9sLnNoYXJlX3N0YXRlID09IFwic2hhcmVfc3VjY2VzXCIgJiYgdGhpcy5hZF9jb250cm9sLnNoYXJlX3RhZyA9PSBcInBldFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLmluaV9zaGFyZSgpO1xuICAgICAgICAgICAgICAgIC8v5a6g54mp55Sf5oiQ55qE5pe26Ze0XG4gICAgICAgICAgICAgICAgdmFyIG5vd190aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgaWYgKChub3dfdGltZSAtIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W3RoaXMuaW5kZXhdLmNyZWF0ZV90aW1lKSAqIDEwMDAgPj0gY29uZmlnLnBldFt0aGlzLmluZGV4XS5zdGF5X3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/lrqDniankuI3lrZjlnKhcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5pbmRleF0uY3JlYXRlX3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5pbmRleF0uaGF2ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W3RoaXMuaW5kZXhdLnNoYXJlX2NvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5jcmVhdGVfcGV0X2EodGhpcy5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJjdWx0cnVlX3N1Y2Nlc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVfY29udGVudCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoc2hhcmVfc2NoZWR1bGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShzaGFyZV9zY2hlZHVsZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJwZXRfYWxyZWFkeV9saWZlXCIpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy/mnKrliIbkuqvlgZzmraLmo4DmtYtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZF9jb250cm9sLnNoYXJlX3N0YXRlID09IFwidW5fc2hhcmVcIiAmJiB0aGlzLmFkX2NvbnRyb2wuc2hhcmVfdGFnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHNoYXJlX3NjaGVkdWxlKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZShzaGFyZV9zY2hlZHVsZSwgMC4yKVxuICAgIH0sXG5cbiAgICAvL29uTG9hZCgpIHsgfSxcblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZV9jb250ZW50KCk7XG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=