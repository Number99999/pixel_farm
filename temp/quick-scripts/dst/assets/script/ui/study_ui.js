
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc3R1ZHlfdWkuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsInNraWxsX2NvbnRlbnQiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInNraWxsX2dyb3VwX25vZGUiLCJOb2RlIiwic2tpbGxfY29udGVudF9wcmVmYWIiLCJQcmVmYWIiLCJza2lsbF9wb2ludF9sYWJlbCIsIkxhYmVsIiwiaW5pX25vZGUiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImdhbWVfcnVsZXNfanMiLCJhZHNNYW5hZ2VyX2pzIiwiYWRfY29udHJvbCIsInNvdW5kX2NvbnRyb2wiLCJjcmVhdGVfY29udGVudCIsImNoaWxkcmVuIiwibGVuZ3RoIiwic2tpbGxfYXJyIiwiT2JqZWN0Iiwia2V5cyIsInNraWxsIiwiaSIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsInVwZGF0ZV9za2lsbF9wb2ludCIsInN0cmluZyIsInNraWxsX3BvaW50IiwiY2FsbGJhY2siLCJzY2hlZHVsZSIsIm1hY3JvIiwiUkVQRUFUX0ZPUkVWRVIiLCJvbl90b3VjaF9leGl0IiwicGxheV9zb3VuZF9lZmZlY3QiLCJvbl9ub2RlX2tpbGwiLCJvbl9yZXN0X3NraWxsX3BvaW50X2J1dHRvbl9jbGljayIsInNob3dSZXdhcmRlZFZpZGVvIiwibGV2ZWwiLCJhcnIiLCJqIiwiZ29sZF9tYXgiLCJnb2xkIiwiY3JlYXRlX3RpcHNfdWkiLCJzZXRfZ29sZF9wcm9ncmVzcyIsInZpZGVvX3N1Y2NlcyIsInd4IiwidmlkZW9fc3RhdGUiLCJ2aWRlb190YWciLCJ1bnNjaGVkdWxlIiwib25Mb2FkIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQSxJQUFJQyxhQUFhLEdBQUdELE9BQU8sQ0FBQyxl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Q0osU0FBS3pCLGtCQUFMO0FBQ0gsR0E5R0ksQ0FnSEw7O0FBaEhLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xyXG52YXIgc2tpbGxfY29udGVudCA9IHJlcXVpcmUoXCJza2lsbF9jb250ZW50XCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHNraWxsX2dyb3VwX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgc2tpbGxfY29udGVudF9wcmVmYWI6IGNjLlByZWZhYixcclxuICAgICAgICBza2lsbF9wb2ludF9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XHJcbiAgICAgICAgdGhpcy5hZHNNYW5hZ2VyX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiQWRzTWFuYWdlclwiKTtcclxuICAgICAgICAvLyB0aGlzLnNraWxsX2NvbnRlbnRfanMgPSBjYy5maW5kKFwic2tpbGxfY29udGVudFwiKS5nZXRDb21wb25lbnQoXCJza2lsbF9jb250ZW50XCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZV9jb250ZW50KCk7XHJcbiAgICB9LFxyXG4gICAgLy9cclxuICAgIGNyZWF0ZV9jb250ZW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2tpbGxfZ3JvdXBfbm9kZS5jaGlsZHJlbi5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICB2YXIgc2tpbGxfYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2tpbGxfYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc2tpbGxfY29udGVudF9wcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLnNraWxsX2dyb3VwX25vZGU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInNraWxsX2NvbnRlbnRcIikuaW5pX25vZGUoaSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy9za2lsbF9wb2ludFxyXG4gICAgdXBkYXRlX3NraWxsX3BvaW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5za2lsbF9wb2ludF9sYWJlbC5zdHJpbmcgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsX3BvaW50O1xyXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF9wb2ludF9sYWJlbC5zdHJpbmcgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsX3BvaW50O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4xLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uX3RvdWNoX2V4aXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMub25fbm9kZV9raWxsKHRoaXMubm9kZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uX3Jlc3Rfc2tpbGxfcG9pbnRfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICB0aGlzLmFkc01hbmFnZXJfanMuc2hvd1Jld2FyZGVkVmlkZW8oKCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgbGV2ZWwgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsO1xyXG4gICAgICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbCk7XHJcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxfcG9pbnQgPSBsZXZlbDtcclxuICAgICAgICAgICAgdmFyIHNraWxsX2FyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGwpO1xyXG4gICAgICAgICAgICAvL3Jlc2V0IHNraWxsIHRvIGx2IDBcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcnJbal0gPT0gXCJvZmZsaW5lX3Byb2ZpdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcIm9mZmxpbmVfcHJvZml0XCJdID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFthcnJbal1dID0gMDtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBnb2xkX21heCA9IDUwMCAqIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJnb2xkX21heFwiXSArIDUwMDtcclxuICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA+IGdvbGRfbWF4KSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPSBnb2xkX21heDtcclxuICAgICAgICAgICAgLy8gcmVzZXQgc2tpbGxfY29udGVudFxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNraWxsX2Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChcInNraWxsX2NvbnRlbnRcIikuaW5pX25vZGUoaSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJza2lsbF9yZXN0XCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuc2V0X2dvbGRfcHJvZ3Jlc3MoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgdmlkZW9fc3VjY2VzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAxICYmIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gXCJza2lsbF9yZXN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsZXZlbCA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxfcG9pbnQgPSBsZXZlbDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2tpbGxfYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFycltqXSA9PSBcIm9mZmxpbmVfcHJvZml0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJvZmZsaW5lX3Byb2ZpdFwiXSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW2FycltqXV0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBza2lsbF9hcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lsbF9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChcInNraWxsX2NvbnRlbnRcIikuaW5pX25vZGUoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwic2tpbGxfcmVzdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuc2V0X2dvbGRfcHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9PSBudWxsICYmIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMik7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9za2lsbF9wb2ludCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==