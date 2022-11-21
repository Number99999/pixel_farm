
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/gift_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2194dh97IxH3rmm+IE2GOoB', 'gift_ui');
// script/ui/gift_ui.js

"use strict";

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    center_node: cc.Node,
    exit_button_node: cc.Node,
    introduce_label: cc.Label
  },
  // LIFE-CYCLE CALLBACKS:
  ini_node: function ini_node() {
    var _this = this;

    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control.show_bannerAd();
    this.center_node.scale = 0;
    this.exit_button_node.active = false;

    if (user_data.user_data.level < 15) {
      this.introduce_label.string = "Watch short commercials, \nlevel+1";
    } else {
      this.introduce_label.string = "Watch short commercials and \ngain half-level experience";
    }

    ;
    cc.tween(this.center_node).to(0.3, {
      scale: 1
    }, {
      easing: "elasticOut"
    }).call(function () {
      _this.scheduleOnce(function () {
        _this.exit_button_node.active = true;
      }, 1.5);
    }).start();
  },
  //我要看视频按钮被点击
  on_i_wanner_ad_button_click: function on_i_wanner_ad_button_click() {
    var _this2 = this;

    this.sound_control.play_sound_effect("button_click");
    this.adsManager_js.showRewardedVideo(function () {
      if (user_data.user_data.level > 15) {
        _this2.game_rules_js.add_ex(user_data.user_data.level);

        _this2.game_scene_js.create_tips_ui(_this2.game_scene_js.node, "gift_ad_ex");
      } else {
        user_data.user_data.level++;
        user_data.user_data.now_ex = 0;
        user_data.user_data.skill_point++;

        _this2.game_rules_js.set_ex_progress();

        _this2.game_scene_js.create_tips_ui(_this2.game_scene_js.node, "gift_ad_level");
      }

      ;

      _this2.ad_control.hide_bannerAd();

      _this2.unschedule(callback);

      _this2.node.destroy();
    });
  },
  //exit button
  on_exit_button_click: function on_exit_button_click() {
    this.sound_control.play_sound_effect("button_exit");
    this.ad_control.hide_bannerAd();
    this.node.destroy();
  },
  //检测视频是否播放成功
  video_succes: function video_succes() {
    if (typeof wx != "undefined") {
      var callback = function callback() {
        if (this.ad_control.video_state == 1 && this.ad_control.video_tag == "gift_ad") {
          this.ad_control.video_tag = null;
          this.ad_control.video_state = 2;

          if (user_data.user_data.level > 15) {
            this.game_rules_js.add_ex(user_data.user_data.level);
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "gift_ad_ex");
          } else {
            user_data.user_data.level++;
            user_data.user_data.now_ex = 0;
            user_data.user_data.skill_point++;
            this.game_rules_js.set_ex_progress();
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "gift_ad_level");
          }

          ;
          this.ad_control.hide_bannerAd();
          this.unschedule(callback);
          this.node.destroy();
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
  // onLoad () {},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcZ2lmdF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJjZW50ZXJfbm9kZSIsIk5vZGUiLCJleGl0X2J1dHRvbl9ub2RlIiwiaW50cm9kdWNlX2xhYmVsIiwiTGFiZWwiLCJpbmlfbm9kZSIsImFkX2NvbnRyb2wiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiYWRzTWFuYWdlcl9qcyIsImdhbWVfc2NlbmVfanMiLCJnYW1lX3J1bGVzX2pzIiwic291bmRfY29udHJvbCIsInNob3dfYmFubmVyQWQiLCJzY2FsZSIsImFjdGl2ZSIsImxldmVsIiwic3RyaW5nIiwidHdlZW4iLCJ0byIsImVhc2luZyIsImNhbGwiLCJzY2hlZHVsZU9uY2UiLCJzdGFydCIsIm9uX2lfd2FubmVyX2FkX2J1dHRvbl9jbGljayIsInBsYXlfc291bmRfZWZmZWN0Iiwic2hvd1Jld2FyZGVkVmlkZW8iLCJhZGRfZXgiLCJjcmVhdGVfdGlwc191aSIsIm5vZGUiLCJub3dfZXgiLCJza2lsbF9wb2ludCIsInNldF9leF9wcm9ncmVzcyIsImhpZGVfYmFubmVyQWQiLCJ1bnNjaGVkdWxlIiwiY2FsbGJhY2siLCJkZXN0cm95Iiwib25fZXhpdF9idXR0b25fY2xpY2siLCJ2aWRlb19zdWNjZXMiLCJ3eCIsInZpZGVvX3N0YXRlIiwidmlkZW9fdGFnIiwic2NoZWR1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFdBQVcsRUFBRUosRUFBRSxDQUFDSyxJQURSO0FBRVJDLElBQUFBLGdCQUFnQixFQUFFTixFQUFFLENB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Q0FBbUJxQixlQUFuQjtBQUNBLGlCQUFLdEIsYUFBTCxDQUFtQmtCLGNBQW5CLENBQWtDLEtBQUtsQixhQUFMLENBQW1CbUIsSUFBckQsRUFBMkQsZUFBM0Q7QUFDSDs7QUFBQTtBQUNELGVBQUt2QixVQUFMLENBQWdCMkIsYUFBaEI7QUFDQSxlQUFLQyxVQUFMLENBQWdCQyxRQUFoQjtBQUNBLGVBQUtOLElBQUwsQ0FBVU8sT0FBVjtBQUNILFNBaEJELE1BZ0JPO0FBQ0gsY0FBSSxLQUFLOUIsVUFBTCxDQUFnQm1DLFNBQWhCLElBQTZCLElBQTdCLElBQXFDLEtBQUtuQyxVQUFMLENBQWdCa0MsV0FBaEIsSUFBK0IsQ0FBeEUsRUFBMkU7QUFDdkUsaUJBQUtOLFVBQUwsQ0FBZ0JDLFFBQWhCO0FBQ0g7O0FBQUE7QUFDSjs7QUFBQTtBQUNKLE9BdEJEOztBQXVCQSxXQUFLTyxRQUFMLENBQWNQLFFBQWQsRUFBd0IsR0FBeEI7QUFDSDs7QUFBQTtBQUNKLEdBdEZJO0FBdUZMO0FBRUFaLEVBQUFBLEtBekZLLG1CQXlGRyxDQUVQLENBM0ZJLENBNkZMOztBQTdGSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGNlbnRlcl9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBleGl0X2J1dHRvbl9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBpbnRyb2R1Y2VfbGFiZWw6IGNjLkxhYmVsLFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcbiAgICBpbmlfbm9kZSgpIHtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5hZHNNYW5hZ2VyX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiQWRzTWFuYWdlclwiKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfYmFubmVyQWQoKTtcbiAgICAgICAgdGhpcy5jZW50ZXJfbm9kZS5zY2FsZSA9IDA7XG4gICAgICAgIHRoaXMuZXhpdF9idXR0b25fbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWwgPCAxNSkge1xuICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gXCJXYXRjaCBzaG9ydCBjb21tZXJjaWFscywgXFxubGV2ZWwrMVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gXCJXYXRjaCBzaG9ydCBjb21tZXJjaWFscyBhbmQgXFxuZ2FpbiBoYWxmLWxldmVsIGV4cGVyaWVuY2VcIjtcbiAgICAgICAgfTtcbiAgICAgICAgY2MudHdlZW4odGhpcy5jZW50ZXJfbm9kZSlcbiAgICAgICAgICAgIC50bygwLjMsIHsgc2NhbGU6IDEgfSwgeyBlYXNpbmc6IFwiZWxhc3RpY091dFwiIH0pXG4gICAgICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4aXRfYnV0dG9uX25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9LCAxLjUpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgfSxcbiAgICAvL+aIkeimgeeci+inhumikeaMiemSruiiq+eCueWHu1xuICAgIG9uX2lfd2FubmVyX2FkX2J1dHRvbl9jbGljaygpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB0aGlzLmFkc01hbmFnZXJfanMuc2hvd1Jld2FyZGVkVmlkZW8oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWwgPiAxNSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZXgodXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcImdpZnRfYWRfZXhcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWwrKztcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leCA9IDA7XG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbF9wb2ludCsrO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5zZXRfZXhfcHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwiZ2lmdF9hZF9sZXZlbFwiKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgLy9leGl0IGJ1dHRvblxuICAgIG9uX2V4aXRfYnV0dG9uX2NsaWNrKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLmhpZGVfYmFubmVyQWQoKTtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuICAgIC8v5qOA5rWL6KeG6aKR5piv5ZCm5pKt5pS+5oiQ5YqfXG4gICAgdmlkZW9fc3VjY2VzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAxICYmIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gXCJnaWZ0X2FkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9IDI7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsID4gMTUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZXgodXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwiZ2lmdF9hZF9leFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWwrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubm93X2V4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxfcG9pbnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5zZXRfZXhfcHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJnaWZ0X2FkX2xldmVsXCIpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID09IG51bGwgJiYgdGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjIpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==