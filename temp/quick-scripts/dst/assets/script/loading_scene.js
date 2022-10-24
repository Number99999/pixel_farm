
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/loading_scene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ac98ekBv0VCKIJHx370J0V8', 'loading_scene');
// script/loading_scene.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    loadingBar: {
      type: cc.ProgressBar,
      "default": null
    },
    work_label: {
      type: cc.Label,
      "default": null
    },
    progress_label: cc.Label,
    center_node: cc.Node
  },
  //加载成功
  load_Succes: function load_Succes() {
    cc.tween(this.center_node).to(0.5, {
      opacity: 0
    }, {
      easing: "sineOut"
    }).call(function () {
      cc.director.loadScene("game_scene");
    }).start();
  },
  ini_node: function ini_node() {
    this.loadingBar.progress = 0;
    this.on_load_progress();
  },
  //加载进度条
  on_load_progress: function on_load_progress() {
    var self = this;
    cc.director.preloadScene("game_scene", function (completedCount, totalCount, item) {
      if (completedCount / totalCount > self.loadingBar.progress) {
        self.loadingBar.progress = completedCount / totalCount;
        self.progress_label.string = parseInt(completedCount / totalCount * 100) + "%";
      }

      ; // self.loadingBar.width = 350* (completedCount/totalCount);
    }, function (error, asset) {
      if (error) {
        cc.log("加载失败");
        return;
      } else {
        self.load_Succes();
        cc.log("加载成功");
      }

      ;
    });
  },
  //重新加载游戏
  rest_load_game: function rest_load_game(dt) {
    this.time += dt;

    if (this.time >= 15) {
      this.time = 0;
      this.rest_count++;
      this.work_label.string = "正在尝试重新加载...";

      if (this.rest_count >= 2) {
        this.progress_label.node.active = false;
        this.work_label.string = "由于网络波动加载失败，请清除缓存后重新进入~o(╥﹏╥)o~";
      }

      ;
      this.ini_node();
    }
  },
  onLoad: function onLoad() {
    this.time = 0;
    this.rest_count = 0;
    this.ini_node();
  },
  start: function start() {},
  update: function update(dt) {
    this.rest_load_game(dt);
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxsb2FkaW5nX3NjZW5lLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibG9hZGluZ0JhciIsInR5cGUiLCJQcm9ncmVzc0JhciIsIndvcmtfbGFiZWwiLCJMYWJlbCIsInByb2dyZXNzX2xhYmVsIiwiY2VudGVyX25vZGUiLCJOb2RlIiwibG9hZF9TdWNjZXMiLCJ0d2VlbiIsInRvIiwib3BhY2l0eSIsImVhc2luZyIsImNhbGwiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsInN0YXJ0IiwiaW5pX25vZGUiLCJwcm9ncmVzcyIsIm9uX2xvYWRfcHJvZ3Jlc3MiLCJzZWxmIiwicHJlbG9hZFNjZW5lIiwiY29tcGxldGVkQ291bnQiLCJ0b3RhbENvdW50IiwiaXRlbSIsInN0cmluZyIsInBhcnNlSW50IiwiZXJyb3IiLCJhc3NldCIsImxvZyIsInJlc3RfbG9hZF9nYW1lIiwiZHQiLCJ0aW1lIiwicmVzdF9jb3VudCIsIm5vZGUiLCJhY3RpdmUiLCJvbkxvYWQiLCJ1cGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBRUxDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUU7QUFDUkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLFdBREQ7QUFFUixpQkFBUztBQUZELEtBREo7QUFLUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1JGLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUSxLQUREO0FBRVIsaUJBQVM7QUFGRCxLQUxKO0FBU1JDLElBQUFBLGNBQWMsRUFBRVQsRUFBRSxDQUFDUSxLQVRYO0FBVVJFLElBQUFBLFdBQVcsRUFBRVYsRUFBRSxDQUFDVztBQVZSLEdBRlA7QUFlTDtBQUNBQyxFQUFBQSxXQUFXLEVBQUUsdUJBQVk7QUFDckJaLElBQUFBLEVBQUUsQ0FBQ2EsS0FBSCxDQUFTLEtBQUtILFdBQWQsRUFDS0ksRUFETCxDQUNRLEdBRFIsRUFDYTtBQUFFQyxNQUFBQSxPQUFPLEVBQUU7QUFBWCxLQURiLEVBQzZCO0FBQUVDLE1BQUFBLE1BQU0sRUFBRTtBQUFWLEtBRDdCLEVBRUtDLElBRkwsQ0FFVSxZQUFNO0FBQ1JqQixNQUFBQSxFQUFFLENBQUNrQixRQUFILENBQVlDLFNBQVosQ0FBc0IsWUFBdEI7QUFDSCxLQUpMLEVBS0tDLEtBTEw7QUFNSCxHQXZCSTtBQXlCTEMsRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ2xCLFNBQUtqQixVQUFMLENBQWdCa0IsUUFBaEIsR0FBMkIsQ0FBM0I7QUFDQSxTQUFLQyxnQkFBTDtBQUNILEdBNUJJO0FBNkJMO0FBQ0FBLEVBQUFBLGdCQUFnQixFQUFFLDRCQUFZO0FBQzFCLFFBQUlDLElBQUksR0FBRyxJQUFYO0FBQ0F4QixJQUFBQSxFQUFFLENBQUNrQixRQUFILENBQVlPLFlBQVosQ0FBeUIsWUFBekIsRUFBdUMsVUFBQ0MsY0FBRCxFQUFpQkMsVUFBakIsRUFBNkJDLElBQTdCLEVBQXNDO0FBQ3pFLFVBQUlGLGNBQWMsR0FBR0MsVUFBakIsR0FBOEJILElBQUksQ0FBQ3BCLFVBQUwsQ0FBZ0JrQixRQUFsRCxFQUE0RDtBQUN4REUsUUFBQUEsSUFBSSxDQUFDcEIsVUFBTCxDQUFnQmtCLFFBQWhCLEdBQTJCSSxjQUFjLEdBQUdDLFVBQTVDO0FBQ0FILFFBQUFBLElBQUksQ0FBQ2YsY0FBTCxDQUFvQm9CLE1BQXBCLEdBQTZCQyxRQUFRLENBQUVKLGNBQWMsR0FBR0MsVUFBbEIsR0FBZ0MsR0FBakMsQ0FBUixHQUFnRCxHQUE3RTtBQUVIOztBQUFBLE9BTHdFLENBTXpFO0FBQ0gsS0FQRCxFQU9HLFVBQVVJLEtBQVYsRUFBaUJDLEtBQWpCLEVBQXdCO0FBQ3ZCLFVBQUlELEtBQUosRUFBVztBQUNQL0IsUUFBQUEsRUFBRSxDQUFDaUMsR0FBSCxDQUFPLE1BQVA7QUFDQTtBQUNILE9BSEQsTUFHTztBQUNIVCxRQUFBQSxJQUFJLENBQUNaLFdBQUw7QUFDQVosUUFBQUEsRUFBRSxDQUFDaUMsR0FBSCxDQUFPLE1BQVA7QUFDSDs7QUFBQTtBQUNKLEtBZkQ7QUFnQkgsR0FoREk7QUFrREw7QUFDQUMsRUFBQUEsY0FBYyxFQUFFLHdCQUFVQyxFQUFWLEVBQWM7QUFDMUIsU0FBS0MsSUFBTCxJQUFhRCxFQUFiOztBQUNBLFFBQUksS0FBS0MsSUFBTCxJQUFhLEVBQWpCLEVBQXFCO0FBQ2pCLFdBQUtBLElBQUwsR0FBWSxDQUFaO0FBQ0EsV0FBS0MsVUFBTDtBQUNBLFdBQUs5QixVQUFMLENBQWdCc0IsTUFBaEIsR0FBeUIsYUFBekI7O0FBQ0EsVUFBSSxLQUFLUSxVQUFMLElBQW1CLENBQXZCLEVBQTBCO0FBQ3RCLGFBQUs1QixjQUFMLENBQW9CNkIsSUFBcEIsQ0FBeUJDLE1BQXpCLEdBQWtDLEtBQWxDO0FBQ0EsYUFBS2hDLFVBQUwsQ0FBZ0JzQixNQUFoQixHQUF5QixnQ0FBekI7QUFDSDs7QUFBQTtBQUNELFdBQUtSLFFBQUw7QUFDSDtBQUNKLEdBL0RJO0FBZ0VMbUIsRUFBQUEsTUFoRUssb0JBZ0VJO0FBQ0wsU0FBS0osSUFBTCxHQUFZLENBQVo7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsU0FBS2hCLFFBQUw7QUFDSCxHQXBFSTtBQXNFTEQsRUFBQUEsS0F0RUssbUJBc0VHLENBRVAsQ0F4RUk7QUEwRUxxQixFQUFBQSxNQTFFSyxrQkEwRUVOLEVBMUVGLEVBMEVNO0FBQ1AsU0FBS0QsY0FBTCxDQUFvQkMsRUFBcEI7QUFDSDtBQTVFSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbG9hZGluZ0Jhcjoge1xuICAgICAgICAgICAgdHlwZTogY2MuUHJvZ3Jlc3NCYXIsXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICB9LFxuICAgICAgICB3b3JrX2xhYmVsOiB7XG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIH0sXG4gICAgICAgIHByb2dyZXNzX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgY2VudGVyX25vZGU6IGNjLk5vZGUsXG4gICAgfSxcblxuICAgIC8v5Yqg6L295oiQ5YqfXG4gICAgbG9hZF9TdWNjZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MudHdlZW4odGhpcy5jZW50ZXJfbm9kZSlcbiAgICAgICAgICAgIC50bygwLjUsIHsgb3BhY2l0eTogMCB9LCB7IGVhc2luZzogXCJzaW5lT3V0XCIgfSlcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJnYW1lX3NjZW5lXCIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH0sXG5cbiAgICBpbmlfbm9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmxvYWRpbmdCYXIucHJvZ3Jlc3MgPSAwO1xuICAgICAgICB0aGlzLm9uX2xvYWRfcHJvZ3Jlc3MoKTtcbiAgICB9LFxuICAgIC8v5Yqg6L296L+b5bqm5p2hXG4gICAgb25fbG9hZF9wcm9ncmVzczogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZShcImdhbWVfc2NlbmVcIiwgKGNvbXBsZXRlZENvdW50LCB0b3RhbENvdW50LCBpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29tcGxldGVkQ291bnQgLyB0b3RhbENvdW50ID4gc2VsZi5sb2FkaW5nQmFyLnByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5sb2FkaW5nQmFyLnByb2dyZXNzID0gY29tcGxldGVkQ291bnQgLyB0b3RhbENvdW50O1xuICAgICAgICAgICAgICAgIHNlbGYucHJvZ3Jlc3NfbGFiZWwuc3RyaW5nID0gcGFyc2VJbnQoKGNvbXBsZXRlZENvdW50IC8gdG90YWxDb3VudCkgKiAxMDApICsgXCIlXCI7XG5cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBzZWxmLmxvYWRpbmdCYXIud2lkdGggPSAzNTAqIChjb21wbGV0ZWRDb3VudC90b3RhbENvdW50KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yLCBhc3NldCkge1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwi5Yqg6L295aSx6LSlXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5sb2FkX1N1Y2NlcygpO1xuICAgICAgICAgICAgICAgIGNjLmxvZyhcIuWKoOi9veaIkOWKn1wiKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIC8v6YeN5paw5Yqg6L295ri45oiPXG4gICAgcmVzdF9sb2FkX2dhbWU6IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICB0aGlzLnRpbWUgKz0gZHQ7XG4gICAgICAgIGlmICh0aGlzLnRpbWUgPj0gMTUpIHtcbiAgICAgICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnJlc3RfY291bnQrKztcbiAgICAgICAgICAgIHRoaXMud29ya19sYWJlbC5zdHJpbmcgPSBcIuato+WcqOWwneivlemHjeaWsOWKoOi9vS4uLlwiO1xuICAgICAgICAgICAgaWYgKHRoaXMucmVzdF9jb3VudCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc19sYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMud29ya19sYWJlbC5zdHJpbmcgPSBcIueUseS6jue9kee7nOazouWKqOWKoOi9veWksei0pe+8jOivt+a4hemZpOe8k+WtmOWQjumHjeaWsOi/m+WFpX5vKOKVpe+5j+KVpSlvflwiXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5pbmlfbm9kZSgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgIHRoaXMucmVzdF9jb3VudCA9IDA7XG4gICAgICAgIHRoaXMuaW5pX25vZGUoKTtcbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIHRoaXMucmVzdF9sb2FkX2dhbWUoZHQpO1xuICAgIH0sXG59KTtcbiJdfQ==