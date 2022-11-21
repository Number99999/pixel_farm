
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/effect/ad_car.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4ead8pbcC5NJqqgVJ9tWAwl', 'ad_car');
// script/effect/ad_car.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    ad_car_node: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  ini_node: function ini_node(price_difference) {
    var _this = this;

    this.price_difference = price_difference;
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    ;
    this.node.x = 500;
    cc.tween(this.node).to(0.5, {
      x: 0
    }, {
      easing: "elasticOut"
    }).call(function () {
      _this.ad_car_node.on("touchstart", _this.create_ad, _this);
    }).start();
  },
  //拉起广告
  create_ad: function create_ad() {
    // this.node.destroy();
    this.ad_control.show_videoAd("ad_car");
    this.video_succes();
  },
  //检测视频是否播放成功
  video_succes: function video_succes() {
    if (typeof wx != "undefined") {
      var callback = function callback() {
        if (this.ad_control.video_state == 1 && this.ad_control.video_tag == "ad_car") {
          this.ad_control.video_tag = null;
          this.ad_control.video_state = 2;
          var node = this.game_scene_js.create_tips_ui(this.game_rules_js.node);

          if (node != null) {
            node.getComponent("tips_ui").ini_node("gold", this.price_difference);
            this.game_rules_js.add_gold(this.price_difference);
          }

          ;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxlZmZlY3RcXGFkX2Nhci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImFkX2Nhcl9ub2RlIiwiTm9kZSIsImluaV9ub2RlIiwicHJpY2VfZGlmZmVyZW5jZSIsImFkX2NvbnRyb2wiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9zY2VuZV9qcyIsImdhbWVfcnVsZXNfanMiLCJub2RlIiwieCIsInR3ZWVuIiwidG8iLCJlYXNpbmciLCJjYWxsIiwib24iLCJjcmVhdGVfYWQiLCJzdGFydCIsInNob3dfdmlkZW9BZCIsInZpZGVvX3N1Y2NlcyIsInd4IiwiY2FsbGJhY2siLCJ2aWRlb19zdGF0ZSIsInZpZGVvX3RhZyIsImNyZWF0ZV90aXBzX3VpIiwiYWRkX2dvbGQiLCJ1bnNjaGVkdWxlIiwiZGVzdHJveSIsInNjaGVkdWxlIiwib25Mb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsV0FBVyxFQUFFSixFQUFFLENBQUNLO0FBRFIsR0FIUDtBQU1MO0FBQ0FDLEVBQUFBLFFBUEssb0JBT0lDLGdCQVBKLEVBT3NCO0FBQUE7O0FBQ3ZCLFNBQUtBLGdCQUFMLEdBQXdCQSxnQkFBeEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCUixFQUFFLENBQUNTLElBQUgsQ0FBUSxZQUFSLEVBQXNCQyxZQUF0QixDQUFtQyxZQUFuQyxDQUFsQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUJYLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFNBQVIsRUFBbUJDLFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0EsU0FBS0UsYUFBTCxHQUFvQlosRUFBRSxDQUFDUyxJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBcEI7QUFBa0U7QUFDbEUsU0FBS0csSUFBTCxDQUFVQyxDQUFWLEdBQWMsR0FBZDtBQUNBZCxJQUFBQSxFQUFFLENBQUNlLEtBQUgsQ0FBUyxLQUFLRixJQUFkLEVBQ0tHLEVBREwsQ0FDUSxHQURSLEVBQ2E7QUFBRUYsTUFBQUEsQ0FBQyxFQUFFO0FBQUwsS0FEYixFQUN1QjtBQUFFRyxNQUFBQSxNQUFNLEVBQUU7QUFBVixLQUR2QixFQUVLQyxJQUZMLENBRVUsWUFBTTtBQUNSLE1BQUEsS0FBSSxDQUFDZCxXQUFMLENBQWlCZSxFQUFqQixDQUFvQixZQUFwQixFQUFrQyxLQUFJLENBQUNDLFNBQXZDLEVBQWtELEtBQWxEO0FBQ0gsS0FKTCxFQUtLQyxLQUxMO0FBTUgsR0FuQkk7QUFvQkw7QUFDQUQsRUFBQUEsU0FyQkssdUJBcUJPO0FBQ1I7QUFDQSxTQUFLWixVQUFMLENBQWdCYyxZQUFoQixDQUE2QixRQUE3QjtBQUNBLFNBQUtDLFlBQUw7QUFDSCxHQXpCSTtBQTBCTDtBQUNBQSxFQUFBQSxZQUFZLEVBQUUsd0JBQVk7QUFDdEIsUUFBSSxPQUFRQyxFQUFSLElBQWUsV0FBbkIsRUFBZ0M7QUFDNUIsVUFBSUMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsR0FBWTtBQUN2QixZQUFJLEtBQUtqQixVQUFMLENBQWdCa0IsV0FBaEIsSUFBK0IsQ0FBL0IsSUFBb0MsS0FBS2xCLFVBQUwsQ0FBZ0JtQixTQUFoQixJQUE2QixRQUFyRSxFQUErRTtBQUMzRSxlQUFLbkIsVUFBTCxDQUFnQm1CLFNBQWhCLEdBQTRCLElBQTVCO0FBQ0EsZUFBS25CLFVBQUwsQ0FBZ0JrQixXQUFoQixHQUE4QixDQUE5QjtBQUNBLGNBQUliLElBQUksR0FBRyxLQUFLRixhQUFMLENBQW1CaUIsY0FBbkIsQ0FBa0MsS0FBS2hCLGFBQUwsQ0FBbUJDLElBQXJELENBQVg7O0FBQ0EsY0FBSUEsSUFBSSxJQUFJLElBQVosRUFBa0I7QUFDZEEsWUFBQUEsSUFBSSxDQUFDSCxZQUFMLENBQWtCLFNBQWxCLEVBQTZCSixRQUE3QixDQUFzQyxNQUF0QyxFQUE4QyxLQUFLQyxnQkFBbkQ7QUFDQSxpQkFBS0ssYUFBTCxDQUFtQmlCLFFBQW5CLENBQTRCLEtBQUt0QixnQkFBakM7QUFDSDs7QUFBQTtBQUNELGVBQUt1QixVQUFMLENBQWdCTCxRQUFoQjtBQUNBLGVBQUtaLElBQUwsQ0FBVWtCLE9BQVY7QUFDSCxTQVZELE1BVU87QUFDSCxjQUFJLEtBQUt2QixVQUFMLENBQWdCbUIsU0FBaEIsSUFBNkIsSUFBN0IsSUFBcUMsS0FBS25CLFVBQUwsQ0FBZ0JrQixXQUFoQixJQUErQixDQUF4RSxFQUEyRTtBQUN2RSxpQkFBS0ksVUFBTCxDQUFnQkwsUUFBaEI7QUFDSDs7QUFBQTtBQUNKOztBQUFBO0FBQ0osT0FoQkQ7O0FBaUJBLFdBQUtPLFFBQUwsQ0FBY1AsUUFBZCxFQUF3QixHQUF4QjtBQUNIOztBQUFBO0FBQ0osR0FoREk7QUFpRExRLEVBQUFBLE1BakRLLG9CQWlESSxDQUVSLENBbkRJO0FBcURMWixFQUFBQSxLQXJESyxtQkFxREcsQ0FFUCxDQXZESSxDQXlETDs7QUF6REssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYWRfY2FyX25vZGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcbiAgICBpbmlfbm9kZShwcmljZV9kaWZmZXJlbmNlKSB7XG4gICAgICAgIHRoaXMucHJpY2VfZGlmZmVyZW5jZSA9IHByaWNlX2RpZmZlcmVuY2U7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcz0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTs7XG4gICAgICAgIHRoaXMubm9kZS54ID0gNTAwO1xuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpXG4gICAgICAgICAgICAudG8oMC41LCB7IHg6IDAgfSwgeyBlYXNpbmc6IFwiZWxhc3RpY091dFwiIH0pXG4gICAgICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZF9jYXJfbm9kZS5vbihcInRvdWNoc3RhcnRcIiwgdGhpcy5jcmVhdGVfYWQsIHRoaXMpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH0sXG4gICAgLy/mi4notbflub/lkYpcbiAgICBjcmVhdGVfYWQoKSB7XG4gICAgICAgIC8vIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5zaG93X3ZpZGVvQWQoXCJhZF9jYXJcIik7XG4gICAgICAgIHRoaXMudmlkZW9fc3VjY2VzKCk7XG4gICAgfSxcbiAgICAvL+ajgOa1i+inhumikeaYr+WQpuaSreaUvuaIkOWKn1xuICAgIHZpZGVvX3N1Y2NlczogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMSAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID09IFwiYWRfY2FyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9ydWxlc19qcy5ub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJ0aXBzX3VpXCIpLmluaV9ub2RlKFwiZ29sZFwiLCB0aGlzLnByaWNlX2RpZmZlcmVuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKHRoaXMucHJpY2VfZGlmZmVyZW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gbnVsbCAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMik7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==