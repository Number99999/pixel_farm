
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
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules"); // this.skill_content_js = cc.find("skill_content").getComponent("skill_content");

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

    this.schedule(callback, 0.5, cc.macro.REPEAT_FOREVER);
  },
  on_touch_exit: function on_touch_exit() {
    this.ad_control.hide_bannerAd();
    this.sound_control.play_sound_effect("button_exit");
    this.game_scene_js.on_node_kill(this.node);
  },
  on_rest_skill_point_button_click: function on_rest_skill_point_button_click() {
    this.sound_control.play_sound_effect("button_click"); // this.ad_control.show_videoAd("skill_rest");

    this.ad_control.video_tag = null;
    this.ad_control.video_state = 2;
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
      this.skill_group_node.children[i].getComponent("skill_content").ini_node(i);
    }

    ;
    this.game_scene_js.create_tips_ui(this.game_scene_js.node, "skill_rest");
    this.game_rules_js.set_gold_progress();
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
          var skill_arr = Object.keys(user_data.user_data.skill); //重置skill 为 0

          for (var j = 0; j < arr.length; j++) {
            //离线收益保证至少1级
            if (arr[j] == "offline_profit") {
              user_data.user_data.skill["offline_profit"] = 1;
            } else {
              user_data.user_data.skill[arr[j]] = 0;
            }

            ;
          }

          ; //刷新skill_content

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc3R1ZHlfdWkuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsInNraWxsX2NvbnRlbnQiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInNraWxsX2dyb3VwX25vZGUiLCJOb2RlIiwic2tpbGxfY29udGVudF9wcmVmYWIiLCJQcmVmYWIiLCJza2lsbF9wb2ludF9sYWJlbCIsIkxhYmVsIiwiaW5pX25vZGUiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImdhbWVfcnVsZXNfanMiLCJhZF9jb250cm9sIiwic291bmRfY29udHJvbCIsInNob3dfYmFubmVyQWQiLCJjcmVhdGVfY29udGVudCIsImNoaWxkcmVuIiwibGVuZ3RoIiwic2tpbGxfYXJyIiwiT2JqZWN0Iiwia2V5cyIsInNraWxsIiwiaSIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsInVwZGF0ZV9za2lsbF9wb2ludCIsInN0cmluZyIsInNraWxsX3BvaW50IiwiY2FsbGJhY2siLCJzY2hlZHVsZSIsIm1hY3JvIiwiUkVQRUFUX0ZPUkVWRVIiLCJvbl90b3VjaF9leGl0IiwiaGlkZV9iYW5uZXJBZCIsInBsYXlfc291bmRfZWZmZWN0Iiwib25fbm9kZV9raWxsIiwib25fcmVzdF9za2lsbF9wb2ludF9idXR0b25fY2xpY2siLCJ2aWRlb190YWciLCJ2aWRlb19zdGF0ZSIsImxldmVsIiwiYXJyIiwiaiIsImdvbGRfbWF4IiwiZ29sZCIsImNyZWF0ZV90aXBzX3VpIiwic2V0X2dvbGRfcHJvZ3Jlc3MiLCJ2aWRlb19zdWNjZXMiLCJ3eCIsInVuc2NoZWR1bGUiLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBLElBQUlDLGFBQWEsR0FBR0QsT0FBTyxDQUFDLGVBQUQs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QWtIRztBQUNKLFNBQUt6QixrQkFBTDtBQUNILEdBcEhJLENBc0hMOztBQXRISyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcbnZhciBza2lsbF9jb250ZW50ID0gcmVxdWlyZShcInNraWxsX2NvbnRlbnRcIik7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBza2lsbF9ncm91cF9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBza2lsbF9jb250ZW50X3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBza2lsbF9wb2ludF9sYWJlbDogY2MuTGFiZWwsXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuICAgIGluaV9ub2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XG4gICAgICAgIC8vIHRoaXMuc2tpbGxfY29udGVudF9qcyA9IGNjLmZpbmQoXCJza2lsbF9jb250ZW50XCIpLmdldENvbXBvbmVudChcInNraWxsX2NvbnRlbnRcIik7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5zaG93X2Jhbm5lckFkKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlX2NvbnRlbnQoKTtcbiAgICB9LFxuICAgIC8vXG4gICAgY3JlYXRlX2NvbnRlbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2tpbGxfZ3JvdXBfbm9kZS5jaGlsZHJlbi5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgdmFyIHNraWxsX2FyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGwpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBza2lsbF9hcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc2tpbGxfY29udGVudF9wcmVmYWIpO1xuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5za2lsbF9ncm91cF9ub2RlO1xuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic2tpbGxfY29udGVudFwiKS5pbmlfbm9kZShpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL3NraWxsX3BvaW50XG4gICAgdXBkYXRlX3NraWxsX3BvaW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2tpbGxfcG9pbnRfbGFiZWwuc3RyaW5nID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbF9wb2ludDtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5za2lsbF9wb2ludF9sYWJlbC5zdHJpbmcgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsX3BvaW50O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjUsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIFxuICAgIG9uX3RvdWNoX2V4aXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLmhpZGVfYmFubmVyQWQoKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2V4aXRcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5vbl9ub2RlX2tpbGwodGhpcy5ub2RlKTtcbiAgICB9LFxuICAgIFxuICAgIG9uX3Jlc3Rfc2tpbGxfcG9pbnRfYnV0dG9uX2NsaWNrKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG4gICAgICAgIC8vIHRoaXMuYWRfY29udHJvbC5zaG93X3ZpZGVvQWQoXCJza2lsbF9yZXN0XCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID0gbnVsbDtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID0gMjtcbiAgICAgICAgdmFyIGxldmVsID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbDtcbiAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGwpO1xuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsX3BvaW50ID0gbGV2ZWw7XG4gICAgICAgIHZhciBza2lsbF9hcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsKTtcbiAgICAgICAgLy9yZXNldCBza2lsbCB0byBsdiAwXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYXJyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoYXJyW2pdID09IFwib2ZmbGluZV9wcm9maXRcIikge1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJvZmZsaW5lX3Byb2ZpdFwiXSA9IDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbYXJyW2pdXSA9IDA7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZ29sZF9tYXggPSA1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDA7XG4gICAgICAgIGlmKHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA+IGdvbGRfbWF4KSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPSBnb2xkX21heDtcbiAgICAgICAgLy8gcmVzZXQgc2tpbGxfY29udGVudFxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNraWxsX2Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5za2lsbF9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChcInNraWxsX2NvbnRlbnRcIikuaW5pX25vZGUoaSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJza2lsbF9yZXN0XCIpO1xuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuc2V0X2dvbGRfcHJvZ3Jlc3MoKTtcblxuICAgIH0sXG4gICAgXG4gICAgdmlkZW9fc3VjY2VzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAxICYmIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gXCJza2lsbF9yZXN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsZXZlbCA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWw7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsKTtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbF9wb2ludCA9IGxldmVsO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2tpbGxfYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbCk7XG4gICAgICAgICAgICAgICAgICAgIC8v6YeN572uc2tpbGwg5Li6IDBcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v56a757q/5pS255uK5L+d6K+B6Iez5bCRMee6p1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFycltqXSA9PSBcIm9mZmxpbmVfcHJvZml0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wib2ZmbGluZV9wcm9maXRcIl0gPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW2FycltqXV0gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgLy/liLfmlrBza2lsbF9jb250ZW50XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2tpbGxfYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KFwic2tpbGxfY29udGVudFwiKS5pbmlfbm9kZShpKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInNraWxsX3Jlc3RcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5zZXRfZ29sZF9wcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID09IG51bGwgJiYgdGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjIpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgb25Mb2FkKCkge1xuXG4gICAgfSxcblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZV9za2lsbF9wb2ludCgpO1xuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19