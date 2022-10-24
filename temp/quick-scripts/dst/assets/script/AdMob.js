
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/AdMob.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '421691hC8FIY7NsvX/7RhYr', 'AdMob');
// script/AdMob.js

"use strict";

cc.Class({
  "extends": cc.Component,
  onLoad: function onLoad() {
    //Add this line to onLoad
    this.admobInit();
  },
  admobInit: function admobInit() {
    if (cc.sys.isMobile) {
      var self = this;
      sdkbox.PluginAdMob.setListener({
        adViewDidReceiveAd: function adViewDidReceiveAd(name) {
          self.showInfo('adViewDidReceiveAd name=' + name);
        },
        adViewDidFailToReceiveAdWithError: function adViewDidFailToReceiveAdWithError(name, msg) {
          self.showInfo('adViewDidFailToReceiveAdWithError name=' + name + ' msg=' + msg);
        },
        adViewWillPresentScreen: function adViewWillPresentScreen(name) {
          self.showInfo('adViewWillPresentScreen name=' + name);
        },
        adViewDidDismissScreen: function adViewDidDismissScreen(name) {
          self.showInfo('adViewDidDismissScreen name=' + name);
        },
        adViewWillDismissScreen: function adViewWillDismissScreen(name) {
          self.showInfo('adViewWillDismissScreen=' + name);
        },
        adViewWillLeaveApplication: function adViewWillLeaveApplication(name) {
          self.showInfo('adViewWillLeaveApplication=' + name);
        } // reward: function(name, currency, amount) {
        //     self.log('reward:'+name+':'+currency+':'+amount);
        // }

      });
      sdkbox.PluginAdMob.init();
    }
  },
  showInfo: function showInfo(string) {
    cc.log(string);
  },
  cacheInterstitial: function cacheInterstitial() {
    if (cc.sys.isMobile) {
      sdkbox.PluginAdMob.cache('interstitial');
    }
  },
  showInterstitial: function showInterstitial() {
    if (cc.sys.isMobile) {
      sdkbox.PluginAdMob.show('interstitial');
    }
  },
  showVideo: function showVideo() {
    if (cc.sys.isMobile) {
      sdkbox.PluginAdMob.show('reward');
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxBZE1vYi5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50Iiwib25Mb2FkIiwiYWRtb2JJbml0Iiwic3lzIiwiaXNNb2JpbGUiLCJzZWxmIiwic2RrYm94IiwiUGx1Z2luQWRNb2IiLCJzZXRMaXN0ZW5lciIsImFkVmlld0RpZFJlY2VpdmVBZCIsIm5hbWUiLCJzaG93SW5mbyIsImFkVmlld0RpZEZhaWxUb1JlY2VpdmVBZFdpdGhFcnJvciIsIm1zZyIsImFkVmlld1dpbGxQcmVzZW50U2NyZWVuIiwiYWRWaWV3RGlkRGlzbWlzc1NjcmVlbiIsImFkVmlld1dpbGxEaXNtaXNzU2NyZWVuIiwiYWRWaWV3V2lsbExlYXZlQXBwbGljYXRpb24iLCJpbml0Iiwic3RyaW5nIiwibG9nIiwiY2FjaGVJbnRlcnN0aXRpYWwiLCJjYWNoZSIsInNob3dJbnRlcnN0aXRpYWwiLCJzaG93Iiwic2hvd1ZpZGVvIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUVMQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVk7QUFDaEI7QUFDQSxTQUFLQyxTQUFMO0FBQ0gsR0FMSTtBQU9MQSxFQUFBQSxTQUFTLEVBQUUscUJBQVk7QUFDbkIsUUFBSUosRUFBRSxDQUFDSyxHQUFILENBQU9DLFFBQVgsRUFBcUI7QUFDakIsVUFBSUMsSUFBSSxHQUFHLElBQVg7QUFDQUMsTUFBQUEsTUFBTSxDQUFDQyxXQUFQLENBQW1CQyxXQUFuQixDQUErQjtBQUMzQkMsUUFBQUEsa0JBQWtCLEVBQUUsNEJBQVVDLElBQVYsRUFBZ0I7QUFDaENMLFVBQUFBLElBQUksQ0FBQ00sUUFBTCxDQUFjLDZCQUE2QkQsSUFBM0M7QUFDSCxTQUgwQjtBQUkzQkUsUUFBQUEsaUNBQWlDLEVBQUUsMkNBQVVGLElBQVYsRUFBZ0JHLEdBQWhCLEVBQXFCO0FBQ3BEUixVQUFBQSxJQUFJLENBQUNNLFFBQUwsQ0FBYyw0Q0FBNENELElBQTVDLEdBQW1ELE9BQW5ELEdBQTZERyxHQUEzRTtBQUNILFNBTjBCO0FBTzNCQyxRQUFBQSx1QkFBdUIsRUFBRSxpQ0FBVUosSUFBVixFQUFnQjtBQUNyQ0wsVUFBQUEsSUFBSSxDQUFDTSxRQUFMLENBQWMsa0NBQWtDRCxJQUFoRDtBQUNILFNBVDBCO0FBVTNCSyxRQUFBQSxzQkFBc0IsRUFBRSxnQ0FBVUwsSUFBVixFQUFnQjtBQUNwQ0wsVUFBQUEsSUFBSSxDQUFDTSxRQUFMLENBQWMsaUNBQWlDRCxJQUEvQztBQUNILFNBWjBCO0FBYTNCTSxRQUFBQSx1QkFBdUIsRUFBRSxpQ0FBVU4sSUFBVixFQUFnQjtBQUNyQ0wsVUFBQUEsSUFBSSxDQUFDTSxRQUFMLENBQWMsNkJBQTZCRCxJQUEzQztBQUNILFNBZjBCO0FBZ0IzQk8sUUFBQUEsMEJBQTBCLEVBQUUsb0NBQVVQLElBQVYsRUFBZ0I7QUFDeENMLFVBQUFBLElBQUksQ0FBQ00sUUFBTCxDQUFjLGdDQUFnQ0QsSUFBOUM7QUFDSCxTQWxCMEIsQ0FtQjNCO0FBQ0E7QUFDQTs7QUFyQjJCLE9BQS9CO0FBdUJBSixNQUFBQSxNQUFNLENBQUNDLFdBQVAsQ0FBbUJXLElBQW5CO0FBQ0g7QUFDSixHQW5DSTtBQXFDTFAsRUFBQUEsUUFBUSxFQUFFLGtCQUFTUSxNQUFULEVBQWdCO0FBQ3RCckIsSUFBQUEsRUFBRSxDQUFDc0IsR0FBSCxDQUFPRCxNQUFQO0FBQ0gsR0F2Q0k7QUF3Q0xFLEVBQUFBLGlCQUFpQixFQUFFLDZCQUFZO0FBQzNCLFFBQUl2QixFQUFFLENBQUNLLEdBQUgsQ0FBT0MsUUFBWCxFQUFxQjtBQUNqQkUsTUFBQUEsTUFBTSxDQUFDQyxXQUFQLENBQW1CZSxLQUFuQixDQUF5QixjQUF6QjtBQUVIO0FBQ0osR0E3Q0k7QUErQ0xDLEVBQUFBLGdCQUFnQixFQUFFLDRCQUFZO0FBQzFCLFFBQUl6QixFQUFFLENBQUNLLEdBQUgsQ0FBT0MsUUFBWCxFQUFxQjtBQUNqQkUsTUFBQUEsTUFBTSxDQUFDQyxXQUFQLENBQW1CaUIsSUFBbkIsQ0FBd0IsY0FBeEI7QUFFSDtBQUNKLEdBcERJO0FBc0RMQyxFQUFBQSxTQUFTLEVBQUUscUJBQVk7QUFDbkIsUUFBSTNCLEVBQUUsQ0FBQ0ssR0FBSCxDQUFPQyxRQUFYLEVBQXFCO0FBQ2pCRSxNQUFBQSxNQUFNLENBQUNDLFdBQVAsQ0FBbUJpQixJQUFuQixDQUF3QixRQUF4QjtBQUNIO0FBRUo7QUEzREksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy9BZGQgdGhpcyBsaW5lIHRvIG9uTG9hZFxyXG4gICAgICAgIHRoaXMuYWRtb2JJbml0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFkbW9iSW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChjYy5zeXMuaXNNb2JpbGUpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNka2JveC5QbHVnaW5BZE1vYi5zZXRMaXN0ZW5lcih7XHJcbiAgICAgICAgICAgICAgICBhZFZpZXdEaWRSZWNlaXZlQWQ6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93SW5mbygnYWRWaWV3RGlkUmVjZWl2ZUFkIG5hbWU9JyArIG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFkVmlld0RpZEZhaWxUb1JlY2VpdmVBZFdpdGhFcnJvcjogZnVuY3Rpb24gKG5hbWUsIG1zZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd0luZm8oJ2FkVmlld0RpZEZhaWxUb1JlY2VpdmVBZFdpdGhFcnJvciBuYW1lPScgKyBuYW1lICsgJyBtc2c9JyArIG1zZyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWRWaWV3V2lsbFByZXNlbnRTY3JlZW46IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93SW5mbygnYWRWaWV3V2lsbFByZXNlbnRTY3JlZW4gbmFtZT0nICsgbmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWRWaWV3RGlkRGlzbWlzc1NjcmVlbjogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dJbmZvKCdhZFZpZXdEaWREaXNtaXNzU2NyZWVuIG5hbWU9JyArIG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFkVmlld1dpbGxEaXNtaXNzU2NyZWVuOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd0luZm8oJ2FkVmlld1dpbGxEaXNtaXNzU2NyZWVuPScgKyBuYW1lKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhZFZpZXdXaWxsTGVhdmVBcHBsaWNhdGlvbjogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dJbmZvKCdhZFZpZXdXaWxsTGVhdmVBcHBsaWNhdGlvbj0nICsgbmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gcmV3YXJkOiBmdW5jdGlvbihuYW1lLCBjdXJyZW5jeSwgYW1vdW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgc2VsZi5sb2coJ3Jld2FyZDonK25hbWUrJzonK2N1cnJlbmN5Kyc6JythbW91bnQpO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2RrYm94LlBsdWdpbkFkTW9iLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNob3dJbmZvOiBmdW5jdGlvbihzdHJpbmcpe1xyXG4gICAgICAgIGNjLmxvZyhzdHJpbmcpO1xyXG4gICAgfSxcclxuICAgIGNhY2hlSW50ZXJzdGl0aWFsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc01vYmlsZSkge1xyXG4gICAgICAgICAgICBzZGtib3guUGx1Z2luQWRNb2IuY2FjaGUoJ2ludGVyc3RpdGlhbCcpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNob3dJbnRlcnN0aXRpYWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTW9iaWxlKSB7XHJcbiAgICAgICAgICAgIHNka2JveC5QbHVnaW5BZE1vYi5zaG93KCdpbnRlcnN0aXRpYWwnKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzaG93VmlkZW86IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTW9iaWxlKSB7XHJcbiAgICAgICAgICAgIHNka2JveC5QbHVnaW5BZE1vYi5zaG93KCdyZXdhcmQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSk7Il19