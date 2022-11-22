
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxsb2FkaW5nX3NjZW5lLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibG9hZGluZ0JhciIsInR5cGUiLCJQcm9ncmVzc0JhciIsIndvcmtfbGFiZWwiLCJMYWJlbCIsInByb2dyZXNzX2xhYmVsIiwiY2VudGVyX25vZGUiLCJOb2RlIiwibG9hZF9TdWNjZXMiLCJ0d2VlbiIsInRvIiwib3BhY2l0eSIsImVhc2luZyIsImNhbGwiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsInN0YXJ0IiwiaW5pX25vZGUiLCJwcm9ncmVzcyIsIm9uX2xvYWRfcHJvZ3Jlc3MiLCJzZWxmIiwicHJlbG9hZFNjZW5lIiwiY29tcGxldGVkQ291bnQiLCJ0b3RhbENvdW50IiwiaXRlbSIsInN0cmluZyIsInBhcnNlSW50IiwiZXJyb3IiLCJhc3NldCIsImxvZyIsInJlc3RfbG9hZF9nYW1lIiwiZHQiLCJ0aW1lIiwicmVzdF9jb3VudCIsIm5vZGUiLCJhY3RpdmUiLCJvbkxvYWQiLCJ1cGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBRUxDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUU7QUFDUkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLFdBREQ7QUFFUixpQkFBUztBQUZELEtBREo7QUFLUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1JGLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUSxLQUREO0FBRVIsaUJBQVM7QUFGRCxLQUxKO0FBU1JDLElBQUFBLGNBQWMsRUFBRVQsRUFBRSxDQUFDUSxLQVRYO0FBVVJFLElBQUFBLFdBQVcsRUFBRVYsRUFBRSxDQUFDVztBQVZSLEdBRlA7QUFlTDtBQUNBQyxFQUFBQSxXQUFXLEVBQUUsdUJBQVk7QUFDckJaLElBQUFBLEVBQUUsQ0FBQ2EsS0FBSCxDQUFTLEtBQUtILFdBQWQsRUFDS0ksRUFETCxDQUNRLEdBRFIsRUFDYTtBQUFFQyxNQUFBQSxPQUFPLEVBQUU7QUFBWCxLQURiLEVBQzZCO0FBQUVDLE1BQUFBLE1BQU0sRUFBRTtBQUFWLEtBRDdCLEVBRUtDLElBRkwsQ0FFVSxZQUFNO0FBQ1JqQixNQUFBQSxFQUFFLENBQUNrQixRQUFILENBQVlDLFNBQVosQ0FBc0IsWUFBdEI7QUFDSCxLQUpMLEVBS0tDLEtBTEw7QUFNSCxHQXZCSTtBQXlCTEMsRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ2xCLFNBQUtqQixVQUFMLENBQWdCa0IsUUFBaEIsR0FBMkIsQ0FBM0I7QUFDQSxTQUFLQyxnQkFBTDtBQUNILEdBNUJJO0FBNkJMO0FBQ0FBLEVBQUFBLGdCQUFnQixFQUFFLDRCQUFZO0FBQzFCLFFBQUlDLElBQUksR0FBRyxJQUFYO0FBQ0F4QixJQUFBQSxFQUFFLENBQUNrQixRQUFILENBQVlPLFlBQVosQ0FBeUIsWUFBekIsRUFBdUMsVUFBQ0MsY0FBRCxFQUFpQkMsVUFBakIsRUFBNkJDLElBQTdCLEVBQXNDO0FBQ3pFLFVBQUlGLGNBQWMsR0FBR0MsVUFBakIsR0FBOEJILElBQUksQ0FBQ3BCLFVBQUwsQ0FBZ0JrQixRQUFsRCxFQUE0RDtBQUN4REUsUUFBQUEsSUFBSSxDQUFDcEIsVUFBTCxDQUFnQmtCLFFBQWhCLEdBQTJCSSxjQUFjLEdBQUdDLFVBQTVDO0FBQ0FILFFBQUFBLElBQUksQ0FBQ2YsY0FBTCxDQUFvQm9CLE1BQXBCLEdBQTZCQyxRQUFRLENBQUVKLGNBQWMsR0FBR0MsVUFBbEIsR0FBZ0MsR0FBakMsQ0FBUixHQUFnRCxHQUE3RTtBQUVIOztBQUFBLE9BTHdFLENBTXpFO0FBQ0gsS0FQRCxFQU9HLFVBQVVJLEtBQVYsRUFBaUJDLEtBQWpCLEVBQXdCO0FBQ3ZCLFVBQUlELEtBQUosRUFBVztBQUNQL0IsUUFBQUEsRUFBRSxDQUFDaUMsR0FBSCxDQUFPLE1BQVA7QUFDQTtBQUNILE9BSEQsTUFHTztBQUNIVCxRQUFBQSxJQUFJLENBQUNaLFdBQUw7QUFDQVosUUFBQUEsRUFBRSxDQUFDaUMsR0FBSCxDQUFPLE1BQVA7QUFDSDs7QUFBQTtBQUNKLEtBZkQ7QUFnQkgsR0FoREk7QUFrREw7QUFDQUMsRUFBQUEsY0FBYyxFQUFFLHdCQUFVQyxFQUFWLEVBQWM7QUFDMUIsU0FBS0MsSUFBTCxJQUFhRCxFQUFiOztBQUNBLFFBQUksS0FBS0MsSUFBTCxJQUFhLEVBQWpCLEVBQXFCO0FBQ2pCLFdBQUtBLElBQUwsR0FBWSxDQUFaO0FBQ0EsV0FBS0MsVUFBTDtBQUNBLFdBQUs5QixVQUFMLENBQWdCc0IsTUFBaEIsR0FBeUIsYUFBekI7O0FBQ0EsVUFBSSxLQUFLUSxVQUFMLElBQW1CLENBQXZCLEVBQTBCO0FBQ3RCLGFBQUs1QixjQUFMLENBQW9CNkIsSUFBcEIsQ0FBeUJDLE1BQXpCLEdBQWtDLEtBQWxDO0FBQ0EsYUFBS2hDLFVBQUwsQ0FBZ0JzQixNQUFoQixHQUF5QixnQ0FBekI7QUFDSDs7QUFBQTtBQUNELFdBQUtSLFFBQUw7QUFDSDtBQUNKLEdBL0RJO0FBZ0VMbUIsRUFBQUEsTUFoRUssb0JBZ0VJO0FBQ0wsU0FBS0osSUFBTCxHQUFZLENBQVo7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsU0FBS2hCLFFBQUw7QUFDSCxHQXBFSTtBQXNFTEQsRUFBQUEsS0F0RUssbUJBc0VHLENBRVAsQ0F4RUk7QUEwRUxxQixFQUFBQSxNQTFFSyxrQkEwRUVOLEVBMUVGLEVBMEVNO0FBQ1AsU0FBS0QsY0FBTCxDQUFvQkMsRUFBcEI7QUFDSDtBQTVFSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbG9hZGluZ0Jhcjoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5Qcm9ncmVzc0JhcixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHdvcmtfbGFiZWw6IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcm9ncmVzc19sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgY2VudGVyX25vZGU6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5Yqg6L295oiQ5YqfXHJcbiAgICBsb2FkX1N1Y2NlczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuY2VudGVyX25vZGUpXHJcbiAgICAgICAgICAgIC50bygwLjUsIHsgb3BhY2l0eTogMCB9LCB7IGVhc2luZzogXCJzaW5lT3V0XCIgfSlcclxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaV9ub2RlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nQmFyLnByb2dyZXNzID0gMDtcclxuICAgICAgICB0aGlzLm9uX2xvYWRfcHJvZ3Jlc3MoKTtcclxuICAgIH0sXHJcbiAgICAvL+WKoOi9vei/m+W6puadoVxyXG4gICAgb25fbG9hZF9wcm9ncmVzczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoXCJnYW1lX3NjZW5lXCIsIChjb21wbGV0ZWRDb3VudCwgdG90YWxDb3VudCwgaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY29tcGxldGVkQ291bnQgLyB0b3RhbENvdW50ID4gc2VsZi5sb2FkaW5nQmFyLnByb2dyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRpbmdCYXIucHJvZ3Jlc3MgPSBjb21wbGV0ZWRDb3VudCAvIHRvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnByb2dyZXNzX2xhYmVsLnN0cmluZyA9IHBhcnNlSW50KChjb21wbGV0ZWRDb3VudCAvIHRvdGFsQ291bnQpICogMTAwKSArIFwiJVwiO1xyXG5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLy8gc2VsZi5sb2FkaW5nQmFyLndpZHRoID0gMzUwKiAoY29tcGxldGVkQ291bnQvdG90YWxDb3VudCk7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yLCBhc3NldCkge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIuWKoOi9veWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubG9hZF9TdWNjZXMoKTtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIuWKoOi9veaIkOWKn1wiKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+mHjeaWsOWKoOi9vea4uOaIj1xyXG4gICAgcmVzdF9sb2FkX2dhbWU6IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIHRoaXMudGltZSArPSBkdDtcclxuICAgICAgICBpZiAodGhpcy50aW1lID49IDE1KSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdF9jb3VudCsrO1xyXG4gICAgICAgICAgICB0aGlzLndvcmtfbGFiZWwuc3RyaW5nID0gXCLmraPlnKjlsJ3or5Xph43mlrDliqDovb0uLi5cIjtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVzdF9jb3VudCA+PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmtfbGFiZWwuc3RyaW5nID0gXCLnlLHkuo7nvZHnu5zms6LliqjliqDovb3lpLHotKXvvIzor7fmuIXpmaTnvJPlrZjlkI7ph43mlrDov5vlhaV+byjilaXvuY/ilaUpb35cIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLmluaV9ub2RlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMucmVzdF9jb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5pbmlfbm9kZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIHRoaXMucmVzdF9sb2FkX2dhbWUoZHQpO1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==