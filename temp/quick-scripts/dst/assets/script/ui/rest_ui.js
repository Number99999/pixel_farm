
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/rest_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f51a5WLhfRJu7mTESWOcnKh', 'rest_ui');
// script/ui/rest_ui.js

"use strict";

var user_data = require("user_data");

var config = require("config");

cc.Class({
  "extends": cc.Component,
  properties: {
    role_sprite: cc.Sprite,
    role_arr: [cc.SpriteFrame],
    center_node: cc.Node
  },
  //初始化节点
  ini_node: function ini_node(staff_index) {
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control.show_bannerAd(); //初始小人的形象

    this.staff_index = staff_index;
    this.role_sprite.spriteFrame = this.role_arr[staff_index];
    this.center_node.scale = 0;
    this.ini_anim();
  },
  //初始化动画
  ini_anim: function ini_anim() {
    cc.tween(this.center_node).to(0.3, {
      scale: 1
    }, {
      easing: "sineOut"
    }).start();
  },
  //i wanna button click
  on_iwanna_button_click: function on_iwanna_button_click() {
    cc.log("create_ad");
    this.sound_control.play_sound_effect("button_click");
    this.ad_control.show_videoAd("staff_rest");
    this.video_succes();
  },
  on_touch_exit_click: function on_touch_exit_click(e) {
    this.node.destroy();
  },
  //keep rest
  on_keep_rest_button_click: function on_keep_rest_button_click() {
    var _this = this;

    // user_data.user_data.staff[this.staff_index].now_time = new Date().getTime() /1000;
    // user_data.user_data.staff[this.staff_index].over_time -= config.staff[this.staff_index].rest_time;
    // console.log("43 now time " + user_data.user_data.staff[this.staff_index].now_time );
    // console.log("44 rest time " + config.staff[this.staff_index].rest_time );
    // console.log("45 over time" + user_data.user_data.staff[this.staff_index].over_time);
    this.adsManager_js.showRewardedVideo(function () {
      var callback = function callback() {
        // this.game_scene_js.create_tips_ui(this.game_scene_js.node, "staff_rest_over");
        user_data.user_data.staff[this.staff_index].now_time = new Date().getTime() / 1000;
        user_data.user_data.staff[this.staff_index].over_time -= config.staff[this.staff_index].rest_time;
        this.game_scene_js.create_tips_ui(this.game_scene_js.node, "staff_rest_over");
        this.node.destroy();
      };

      _this.schedule(callback, 0.2);
    });
  },
  //检测视频是否播放成功
  video_succes: function video_succes() {
    if (typeof wx != "undefined") {
      var callback = function callback() {
        if (this.ad_control.video_state == 1 && this.ad_control.video_tag == "staff_rest") {
          this.ad_control.video_tag = null;
          this.ad_control.video_state = 2;
          user_data.user_data.staff[this.staff_index].over_time = 0;
          this.game_scene_js.create_tips_ui(this.game_scene_js.node, "staff_rest_over");
          this.unschedule(callback);
          this.ad_control.hide_bannerAd();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxccmVzdF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJyb2xlX3Nwcml0ZSIsIlNwcml0ZSIsInJvbGVfYXJyIiwiU3ByaXRlRnJhbWUiLCJjZW50ZXJfbm9kZSIsIk5vZGUiLCJpbmlfbm9kZSIsInN0YWZmX2luZGV4IiwiYWRfY29udHJvbCIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3NjZW5lX2pzIiwiYWRzTWFuYWdlcl9qcyIsInNvdW5kX2NvbnRyb2wiLCJzaG93X2Jhbm5lckFkIiwic3ByaXRlRnJhbWUiLCJzY2FsZSIsImluaV9hbmltIiwidHdlZW4iLCJ0byIsImVhc2luZyIsInN0YXJ0Iiwib25faXdhbm5hX2J1dHRvbl9jbGljayIsImxvZyIsInBsYXlfc291bmRfZWZmZWN0Iiwic2hvd192aWRlb0FkIiwidmlkZW9fc3VjY2VzIiwib25fdG91Y2hfZXhpdF9jbGljayIsImUiLCJub2RlIiwiZGVzdHJveSIsIm9uX2tlZXBfcmVzdF9idXR0b25fY2xpY2siLCJzaG93UmV3YXJkZWRWaWRlbyIsImNhbGxiYWNrIiwic3RhZmYiLCJub3dfdGltZSIsIkRhdGUiLCJnZXRUaW1lIiwib3Zlcl90aW1lIiwicmVzdF90aW1lIiwiY3JlYXRlX3RpcHNfdWkiLCJzY2hlZHVsZSIsInd4IiwidmlkZW9fc3RhdGUiLCJ2aWRlb190YWciLCJ1bnNjaGVkdWxlIiwiaGlkZV9iYW5uZXJBZCIsIm9uTG9hZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBLElBQUlDLE1BQU0sR0FBR0QsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0FFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxXQUFXLEVBQUVKLEVBQUUsQ0FBQ0ssTUFEUjtBQUVSQyxJQUFBQSxRQUFRLEVBQUUsQ0FBQ04sRUFBRSxDQUFDTyxXQUFKLENBRkY7QUFHUkMsSUFBQUEsV0FBVyxFQUFFUixFQUFFLENBQUNTO0FBSFIsR0FIUDtBQVFMO0FBQ0FDLEVBQUFBLFFBVEssb0JBU0lDLFdBVEosRUFTaUI7QUFDbEIsU0FBS0MsVUFBTCxHQUFrQlosRUFBRSxDQUFDYSxJQUFILENBQVEsWUFBUixFQUFzQkMsWUFBdEIsQ0FBbUMsWUFBbkMsQ0FBbEI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCZixFQUFFLENBQUNhLElBQUgsQ0FBUSxTQUFSLEVBQW1CQyxZQUFuQixDQUFnQyxZQUFoQyxDQUFyQjtBQUNBLFNBQUtFLGFBQUwsR0FBcUJoQixFQUFFLENBQUNhLElBQUgsQ0FBUSxTQUFSLEVBQW1CQyxZQUFuQixDQUFnQyxZQUFoQyxDQUFyQjtBQUNBLFNBQUtHLGFBQUwsR0FBcUJqQixFQUFFLENBQUNhLElBQUgsQ0FBUSxlQUFSLEVBQXlCQyxZQUF6QixDQUFzQyxlQUF0QyxDQUFyQjtBQUNBLFNBQUtGLFVBQUwsQ0FBZ0JNLGFBQWhCLEdBTGtCLENBTWxCOztBQUNBLFNBQUtQLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0EsU0FBS1AsV0FBTCxDQUFpQmUsV0FBakIsR0FBK0IsS0FBS2IsUUFBTCxDQUFjSyxXQUFkLENBQS9CO0FBQ0EsU0FBS0gsV0FBTCxDQUFpQlksS0FBakIsR0FBeUIsQ0FBekI7QUFDQSxTQUFLQyxRQUFMO0FBQ0gsR0FwQkk7QUFxQkw7QUFDQUEsRUFBQUEsUUF0Qkssc0JBc0JNO0FBQ1ByQixJQUFBQSxFQUFFLENBQUNzQixLQUFILENBQVMsS0FBS2QsV0FBZCxFQUNLZSxFQURMLENBQ1EsR0FEUixFQUNhO0FBQUVILE1BQUFBLEtBQUssRUFBRTtBQUFULEtBRGIsRUFDMkI7QUFBRUksTUFBQUEsTUFBTSxFQUFFO0FBQVYsS0FEM0IsRUFFS0MsS0FGTDtBQUdILEdBMUJJO0FBMkJMO0FBQ0FDLEVBQUFBLHNCQTVCSyxvQ0E0Qm9CO0FBQ3JCMUIsSUFBQUEsRUFBRSxDQUFDMkIsR0FBSCxDQUFPLFdBQVA7QUFDQSxTQUFLVixhQUFMLENBQW1CVyxpQkFBbkIsQ0FBcUMsY0FBckM7QUFDQSxTQUFLaEIsVUFBTCxDQUFnQmlCLFlBQWhCLENBQTZCLFlBQTdCO0FBQ0EsU0FBS0MsWUFBTDtBQUNILEdBakNJO0FBa0NMQyxFQUFBQSxtQkFsQ0ssK0JBa0NlQyxDQWxDZixFQWtDa0I7QUFDbkIsU0FBS0MsSUFBTCxDQUFVQyxPQUFWO0FBQ0gsR0FwQ0k7QUFxQ0w7QUFDQUMsRUFBQUEseUJBdENLLHVDQXNDdUI7QUFBQTs7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQUtuQixhQUFMLENBQW1Cb0IsaUJBQW5CLENBQXFDLFlBQU07QUFDdkMsVUFBSUMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsR0FBWTtBQUN2QjtBQUNBeEMsUUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CeUMsS0FBcEIsQ0FBMEIsS0FBSzNCLFdBQS9CLEVBQTRDNEIsUUFBNUMsR0FBdUQsSUFBSUMsSUFBSixHQUFXQyxPQUFYLEtBQXVCLElBQTlFO0FBQ0E1QyxRQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0J5QyxLQUFwQixDQUEwQixLQUFLM0IsV0FBL0IsRUFBNEMrQixTQUE1QyxJQUF5RDNDLE1BQU0sQ0FBQ3VDLEtBQVAsQ0FBYSxLQUFLM0IsV0FBbEIsRUFBK0JnQyxTQUF4RjtBQUNBLGFBQUs1QixhQUFMLENBQW1CNkIsY0FBbkIsQ0FBa0MsS0FBSzdCLGFBQUwsQ0FBbUJrQixJQUFyRCxFQUEyRCxpQkFBM0Q7QUFDQSxhQUFLQSxJQUFMLENBQVVDLE9BQVY7QUFDSCxPQU5EOztBQU9BLE1BQUEsS0FBSSxDQUFDVyxRQUFMLENBQWNSLFFBQWQsRUFBd0IsR0FBeEI7QUFDSCxLQVREO0FBVUgsR0F0REk7QUF3REw7QUFDQVAsRUFBQUEsWUFBWSxFQUFFLHdCQUFZO0FBQ3RCLFFBQUksT0FBUWdCLEVBQVIsSUFBZSxXQUFuQixFQUFnQztBQUM1QixVQUFJVCxRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFZO0FBQ3ZCLFlBQUksS0FBS3pCLFVBQUwsQ0FBZ0JtQyxXQUFoQixJQUErQixDQUEvQixJQUFvQyxLQUFLbkMsVUFBTCxDQUFnQm9DLFNBQWhCLElBQTZCLFlBQXJFLEVBQW1GO0FBQy9FLGVBQUtwQyxVQUFMLENBQWdCb0MsU0FBaEIsR0FBNEIsSUFBNUI7QUFDQSxlQUFLcEMsVUFBTCxDQUFnQm1DLFdBQWhCLEdBQThCLENBQTlCO0FBQ0FsRCxVQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0J5QyxLQUFwQixDQUEwQixLQUFLM0IsV0FBL0IsRUFBNEMrQixTQUE1QyxHQUF3RCxDQUF4RDtBQUNBLGVBQUszQixhQUFMLENBQW1CNkIsY0FBbkIsQ0FBa0MsS0FBSzdCLGFBQUwsQ0FBbUJrQixJQUFyRCxFQUEyRCxpQkFBM0Q7QUFDQSxlQUFLZ0IsVUFBTCxDQUFnQlosUUFBaEI7QUFDQSxlQUFLekIsVUFBTCxDQUFnQnNDLGFBQWhCO0FBQ0EsZUFBS2pCLElBQUwsQ0FBVUMsT0FBVjtBQUNILFNBUkQsTUFRTztBQUNILGNBQUksS0FBS3RCLFVBQUwsQ0FBZ0JvQyxTQUFoQixJQUE2QixJQUE3QixJQUFxQyxLQUFLcEMsVUFBTCxDQUFnQm1DLFdBQWhCLElBQStCLENBQXhFLEVBQTJFO0FBQ3ZFLGlCQUFLRSxVQUFMLENBQWdCWixRQUFoQjtBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixPQWREOztBQWVBLFdBQUtRLFFBQUwsQ0FBY1IsUUFBZCxFQUF3QixHQUF4QjtBQUNIOztBQUFBO0FBQ0osR0E1RUk7QUE2RUxjLEVBQUFBLE1BN0VLLG9CQTZFSSxDQUFHLENBN0VQO0FBK0VMMUIsRUFBQUEsS0EvRUssbUJBK0VHLENBRVAsQ0FqRkksQ0FtRkw7O0FBbkZLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCJjb25maWdcIik7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICByb2xlX3Nwcml0ZTogY2MuU3ByaXRlLFxuICAgICAgICByb2xlX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgY2VudGVyX25vZGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICAvL+WIneWni+WMluiKgueCuVxuICAgIGluaV9ub2RlKHN0YWZmX2luZGV4KSB7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XG4gICAgICAgIHRoaXMuYWRzTWFuYWdlcl9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcIkFkc01hbmFnZXJcIik7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5zaG93X2Jhbm5lckFkKCk7XG4gICAgICAgIC8v5Yid5aeL5bCP5Lq655qE5b2i6LGhXG4gICAgICAgIHRoaXMuc3RhZmZfaW5kZXggPSBzdGFmZl9pbmRleDtcbiAgICAgICAgdGhpcy5yb2xlX3Nwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV9hcnJbc3RhZmZfaW5kZXhdO1xuICAgICAgICB0aGlzLmNlbnRlcl9ub2RlLnNjYWxlID0gMDtcbiAgICAgICAgdGhpcy5pbmlfYW5pbSgpO1xuICAgIH0sXG4gICAgLy/liJ3lp4vljJbliqjnlLtcbiAgICBpbmlfYW5pbSgpIHtcbiAgICAgICAgY2MudHdlZW4odGhpcy5jZW50ZXJfbm9kZSlcbiAgICAgICAgICAgIC50bygwLjMsIHsgc2NhbGU6IDEgfSwgeyBlYXNpbmc6IFwic2luZU91dFwiIH0pXG4gICAgICAgICAgICAuc3RhcnQoKTtcbiAgICB9LFxuICAgIC8vaSB3YW5uYSBidXR0b24gY2xpY2tcbiAgICBvbl9pd2FubmFfYnV0dG9uX2NsaWNrKCkge1xuICAgICAgICBjYy5sb2coXCJjcmVhdGVfYWRcIik7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfdmlkZW9BZChcInN0YWZmX3Jlc3RcIik7XG4gICAgICAgIHRoaXMudmlkZW9fc3VjY2VzKCk7XG4gICAgfSxcbiAgICBvbl90b3VjaF9leGl0X2NsaWNrKGUpIHtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuICAgIC8va2VlcCByZXN0XG4gICAgb25fa2VlcF9yZXN0X2J1dHRvbl9jbGljaygpIHtcbiAgICAgICAgLy8gdXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5ub3dfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8xMDAwO1xuICAgICAgICAvLyB1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLm92ZXJfdGltZSAtPSBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ucmVzdF90aW1lO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIjQzIG5vdyB0aW1lIFwiICsgdXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5ub3dfdGltZSApO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIjQ0IHJlc3QgdGltZSBcIiArIGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5yZXN0X3RpbWUgKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCI0NSBvdmVyIHRpbWVcIiArIHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ub3Zlcl90aW1lKTtcbiAgICAgICAgdGhpcy5hZHNNYW5hZ2VyX2pzLnNob3dSZXdhcmRlZFZpZGVvKCgpID0+IHtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwic3RhZmZfcmVzdF9vdmVyXCIpO1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ubm93X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDA7XG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5vdmVyX3RpbWUgLT0gY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLnJlc3RfdGltZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwic3RhZmZfcmVzdF9vdmVyXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4yKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8v5qOA5rWL6KeG6aKR5piv5ZCm5pKt5pS+5oiQ5YqfXG4gICAgdmlkZW9fc3VjY2VzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAxICYmIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gXCJzdGFmZl9yZXN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ub3Zlcl90aW1lID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInN0YWZmX3Jlc3Rfb3ZlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLmhpZGVfYmFubmVyQWQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9PSBudWxsICYmIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4yKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG9uTG9hZCgpIHsgfSxcblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=