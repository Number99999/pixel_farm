
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/study_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '17b54SZhR1E8bfWvHiKAZPX', 'study_ui');
// script/ui/study_ui.js

"use strict";

var user_data = require("user_data");

var skill_content = require("skill_content");

cc.Class({
  "extends": cc.Component,
  properties: {
    skill_group_node: cc.Node,
    skill_content_prefab: cc.Prefab,
    skill_point_label: cc.Label
  },
  // LIFE-CYCLE CALLBACKS:
  ini_node: function ini_node() {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager"); // this.skill_content_js = cc.find("skill_content").getComponent("skill_content");

    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control.show_bannerAd();
    this.create_content();
  },
  //
  create_content: function create_content() {
    if (this.skill_group_node.children.length == 0) {
      var skill_arr = Object.keys(user_data.user_data.skill);

      for (var i = 0; i < skill_arr.length; i++) {
        var node = cc.instantiate(this.skill_content_prefab);
        node.parent = this.skill_group_node;
        node.getComponent("skill_content").ini_node(i);
      }

      ;
    } else {
      return;
    }

    ;
  },
  //skill_point
  update_skill_point: function update_skill_point() {
    this.skill_point_label.string = user_data.user_data.skill_point;

    var callback = function callback() {
      this.skill_point_label.string = user_data.user_data.skill_point;
    };

    this.schedule(callback, 0.1, cc.macro.REPEAT_FOREVER);
  },
  on_touch_exit: function on_touch_exit() {
    this.sound_control.play_sound_effect("button_exit");
    this.game_scene_js.on_node_kill(this.node);
  },
  on_rest_skill_point_button_click: function on_rest_skill_point_button_click() {
    var _this = this;

    this.sound_control.play_sound_effect("button_click");
    this.adsManager_js.showRewardedVideo(function () {
      var level = user_data.user_data.level;
      var arr = Object.keys(user_data.user_data.skill);
      user_data.user_data.skill_point = level;
      var skill_arr = Object.keys(user_data.user_data.skill); //reset skill to lv 0

      for (var j = 0; j < arr.length; j++) {
        if (arr[j] == "offline_profit") {
          user_data.user_data.skill["offline_profit"] = 1;
        } else {
          user_data.user_data.skill[arr[j]] = 0;
        }

        ;
      }

      ;
      var gold_max = 500 * user_data.user_data.skill["gold_max"] + 500;
      if (user_data.user_data.gold > gold_max) user_data.user_data.gold = gold_max; // reset skill_content

      for (var i = 0; i < skill_arr.length; i++) {
        _this.skill_group_node.children[i].getComponent("skill_content").ini_node(i);
      }

      ;

      _this.game_scene_js.create_tips_ui(_this.game_scene_js.node, "skill_rest");

      _this.game_rules_js.set_gold_progress();
    });
  },
  video_succes: function video_succes() {
    if (typeof wx != "undefined") {
      var callback = function callback() {
        if (this.ad_control.video_state == 1 && this.ad_control.video_tag == "skill_rest") {
          this.ad_control.video_tag = null;
          this.ad_control.video_state = 2;
          var level = user_data.user_data.level;
          var arr = Object.keys(user_data.user_data.skill);
          user_data.user_data.skill_point = level;
          var skill_arr = Object.keys(user_data.user_data.skill);

          for (var j = 0; j < arr.length; j++) {
            if (arr[j] == "offline_profit") {
              user_data.user_data.skill["offline_profit"] = 1;
            } else {
              user_data.user_data.skill[arr[j]] = 0;
            }

            ;
          }

          ;

          for (var i = 0; i < skill_arr.length; i++) {
            this.skill_group_node.children[i].getComponent("skill_content").ini_node(i);
          }

          ;
          this.game_scene_js.create_tips_ui(this.game_scene_js.node, "skill_rest");
          this.game_rules_js.set_gold_progress();
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
  start: function start() {
    this.update_skill_point();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc3R1ZHlfdWkuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsInNraWxsX2NvbnRlbnQiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInNraWxsX2dyb3VwX25vZGUiLCJOb2RlIiwic2tpbGxfY29udGVudF9wcmVmYWIiLCJQcmVmYWIiLCJza2lsbF9wb2ludF9sYWJlbCIsIkxhYmVsIiwiaW5pX25vZGUiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImdhbWVfcnVsZXNfanMiLCJhZHNNYW5hZ2VyX2pzIiwiYWRfY29udHJvbCIsInNvdW5kX2NvbnRyb2wiLCJzaG93X2Jhbm5lckFkIiwiY3JlYXRlX2NvbnRlbnQiLCJjaGlsZHJlbiIsImxlbmd0aCIsInNraWxsX2FyciIsIk9iamVjdCIsImtleXMiLCJza2lsbCIsImkiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJ1cGRhdGVfc2tpbGxfcG9pbnQiLCJzdHJpbmciLCJza2lsbF9wb2ludCIsImNhbGxiYWNrIiwic2NoZWR1bGUiLCJtYWNybyIsIlJFUEVBVF9GT1JFVkVSIiwib25fdG91Y2hfZXhpdCIsInBsYXlfc291bmRfZWZmZWN0Iiwib25fbm9kZV9raWxsIiwib25fcmVzdF9za2lsbF9wb2ludF9idXR0b25fY2xpY2siLCJzaG93UmV3YXJkZWRWaWRlbyIsImxldmVsIiwiYXJyIiwiaiIsImdvbGRfbWF4IiwiZ29sZCIsImNyZWF0ZV90aXBzX3VpIiwic2V0X2dvbGRfcHJvZ3Jlc3MiLCJ2aWRlb19zdWNjZXMiLCJ3eCIsInZpZGVvX3N0YXRlIiwidmlkZW9fdGFnIiwidW5zY2hlZHVsZSIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0EsSUFBSUMsYUFBYSxH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LE1BekdLLG9CQXlHSSxDQUVSLENBM0dJO0FBNkdMQyxFQUFBQSxLQTdHSyxtQkE2R0c7QUFDSixTQUFLekIsa0JBQUw7QUFDSCxHQS9HSSxDQWlITDs7QUFqSEssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzZXJfZGF0YSA9IHJlcXVpcmUoXCJ1c2VyX2RhdGFcIik7XHJcbnZhciBza2lsbF9jb250ZW50ID0gcmVxdWlyZShcInNraWxsX2NvbnRlbnRcIik7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc2tpbGxfZ3JvdXBfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBza2lsbF9jb250ZW50X3ByZWZhYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIHNraWxsX3BvaW50X2xhYmVsOiBjYy5MYWJlbCxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcbiAgICBpbmlfbm9kZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcclxuICAgICAgICB0aGlzLmFkc01hbmFnZXJfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJBZHNNYW5hZ2VyXCIpO1xyXG4gICAgICAgIC8vIHRoaXMuc2tpbGxfY29udGVudF9qcyA9IGNjLmZpbmQoXCJza2lsbF9jb250ZW50XCIpLmdldENvbXBvbmVudChcInNraWxsX2NvbnRlbnRcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5zaG93X2Jhbm5lckFkKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVfY29udGVudCgpO1xyXG4gICAgfSxcclxuICAgIC8vXHJcbiAgICBjcmVhdGVfY29udGVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNraWxsX2dyb3VwX25vZGUuY2hpbGRyZW4ubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgdmFyIHNraWxsX2FyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGwpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNraWxsX2Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnNraWxsX2NvbnRlbnRfcHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5za2lsbF9ncm91cF9ub2RlO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJza2lsbF9jb250ZW50XCIpLmluaV9ub2RlKGkpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8vc2tpbGxfcG9pbnRcclxuICAgIHVwZGF0ZV9za2lsbF9wb2ludDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc2tpbGxfcG9pbnRfbGFiZWwuc3RyaW5nID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbF9wb2ludDtcclxuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxfcG9pbnRfbGFiZWwuc3RyaW5nID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbF9wb2ludDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMSwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbl90b3VjaF9leGl0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2V4aXRcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbl9yZXN0X3NraWxsX3BvaW50X2J1dHRvbl9jbGljaygpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdGhpcy5hZHNNYW5hZ2VyX2pzLnNob3dSZXdhcmRlZFZpZGVvKCgpID0+IHtcclxuICAgICAgICAgICAgdmFyIGxldmVsID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbDtcclxuICAgICAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGwpO1xyXG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsX3BvaW50ID0gbGV2ZWw7XHJcbiAgICAgICAgICAgIHZhciBza2lsbF9hcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsKTtcclxuICAgICAgICAgICAgLy9yZXNldCBza2lsbCB0byBsdiAwXHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYXJyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyW2pdID09IFwib2ZmbGluZV9wcm9maXRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJvZmZsaW5lX3Byb2ZpdFwiXSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbYXJyW2pdXSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgZ29sZF9tYXggPSA1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDA7XHJcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPiBnb2xkX21heCkgdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID0gZ29sZF9tYXg7XHJcbiAgICAgICAgICAgIC8vIHJlc2V0IHNraWxsX2NvbnRlbnRcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBza2lsbF9hcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoXCJza2lsbF9jb250ZW50XCIpLmluaV9ub2RlKGkpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwic2tpbGxfcmVzdFwiKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLnNldF9nb2xkX3Byb2dyZXNzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHZpZGVvX3N1Y2NlczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMSAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID09IFwic2tpbGxfcmVzdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID0gMjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGV2ZWwgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsX3BvaW50ID0gbGV2ZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNraWxsX2FyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYXJyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcnJbal0gPT0gXCJvZmZsaW5lX3Byb2ZpdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wib2ZmbGluZV9wcm9maXRcIl0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFthcnJbal1dID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2tpbGxfYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoXCJza2lsbF9jb250ZW50XCIpLmluaV9ub2RlKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInNraWxsX3Jlc3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLnNldF9nb2xkX3Byb2dyZXNzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gbnVsbCAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfc2tpbGxfcG9pbnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=