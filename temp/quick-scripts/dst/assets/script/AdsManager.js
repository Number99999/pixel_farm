
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/AdsManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7548f9QM11K+qkbzP1yyO2m', 'AdsManager');
// script/AdsManager.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    // bannerUnitId: "",
    showFullUnitId: "",
    videoUnitId: "",
    banner: null,
    showFull: null,
    video: null,
    rewardVideoCallback: null //bannerLoaded: false,

  },
  onLoad: function onLoad() {
    var _this = this;

    if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD) {
      // Enable debug log, this is for testing only, please comment it out before publish.
      tradplus.tradPlusService.setEnableLog(true); // Initialize the SDK.

      tradplus.tradPlusService.initSdk(); // Enable test mode, this is for testing only, please comment it out before publish.

      tradplus.tradPlusService.setNeedTestDevice(true); // Enable debug log, this is for testing only, please comment it out before publish.

      tradplus.tradPlusService.setEnableLog(true);
      this.banner = tradplus.tradPlusService.getBanner(this.bannerUnitId);
      this.showFull = tradplus.tradPlusService.getInterstitial(this.showFullUnitId);
      this.video = tradplus.tradPlusService.getRewardedVideo(this.videoUnitId);
      this.banner.setAdListener({
        onAdLoaded: function onAdLoaded(adSourceName) {
          // Triggered on Ad loaded, adSourceName is the name of Ad source platform.
          //this.bannerLoaded = true;
          cc.log("banner loaded");
        },
        onAdClicked: function onAdClicked() {// Triggered on Ad clicked.
        },
        onAdLoadFailed: function onAdLoadFailed(adError) {
          // Triggered on Ad load failed, adError contains error information.
          cc.log("AdLoadFailed: " + adError);
        },
        onAdImpression: function onAdImpression() {// Triggered on Ad shown.
        },
        onAdShowFailed: function onAdShowFailed(adError) {
          // Triggered on Ad show failed, adError contains error information.
          // NOTE: This callback will only triggered on Android.
          cc.log("AdShowFailed" + adError);
        },
        onAdClosed: function onAdClosed() {// Triggered on Ad closed.
          // NOTE: This callback will only triggered on Android.
        },
        onBannerRefreshed: function onBannerRefreshed() {// Triggered on Ad refreshed.
          // NOTE: This callback will only triggered on Android.
        }
      });
      this.showFull.setAdListener({
        onAdAllLoaded: function onAdAllLoaded(adSourceName) {// Triggered on Ad loaded, adSourceName is the name of Ad source platform.
        },
        onAdLoaded: function onAdLoaded(adSourceName) {// Triggered on Ad loaded, adSourceName is the name of Ad source platform.
        },
        onAdClicked: function onAdClicked() {// Triggered on Ad clicked.
        },
        onAdFailed: function onAdFailed(adError) {// Triggered on Ad load failed, adError contains error information.
        },
        onAdImpression: function onAdImpression() {// Triggered on Ad shown.
        },
        onAdShowFailed: function onAdShowFailed(adError) {// Triggered on Ad show failed, adError contains error information.
          // NOTE: This callback will only triggered on Android.
        },
        onAdClosed: function onAdClosed() {
          // Triggered on Ad closed.
          // NOTE: This callback will only triggered on Android.
          _this.loadInterstitial();
        },
        onAdPlayFailed: function onAdPlayFailed(adError) {// Triggered on Ad load failed, adError contains error information.
        },
        onOneLayerLoadFailed: function onOneLayerLoadFailed(adSourceName, adError) {// Triggered on Ad load failed, adError contains error information.
        },
        onOneLayerLoaded: function onOneLayerLoaded(adSourceName) {// Triggered on Ad loaded, adSourceName is the name of Ad source platform.
        }
      });
      this.video.setAdListener({
        onAdAllLoaded: function onAdAllLoaded(adSourceName) {// Triggered on Ad loaded, adSourceName is the name of Ad source platform.
        },
        onAdLoaded: function onAdLoaded(adSourceName) {// Triggered on Ad loaded, adSourceName is the name of Ad source platform.
        },
        onAdClicked: function onAdClicked() {// Triggered on Ad clicked.
        },
        onAdFailed: function onAdFailed(adError) {// Triggered on Ad load failed, adError contains error information.
          // cc.log("onAdFailed: " + adError);
        },
        onAdImpression: function onAdImpression() {// Triggered on Ad shown.
        },
        onAdClosed: function onAdClosed() {
          // Triggered on Ad closed.
          // NOTE: This callback will only triggered on Android.
          _this.video.loadAd();
        },
        onAdPlayFailed: function onAdPlayFailed(adError) {// Triggered on Ad shown, adSourceName is the name of Ad source platform
          // cc.log("onAdPlayFailed: " + adError);
        },
        onOneLayerLoadFailed: function onOneLayerLoadFailed(adSourceName, adError) {// Triggered on Ad load failed, adError contains error information.
          // cc.log("onOneLayerLoadFailed: " + adError);
        },
        onOneLayerLoaded: function onOneLayerLoaded(adSourceName) {// Triggered on Ad loaded, adSourceName is the name of Ad source platform.
        },
        onAdNotReward: function onAdNotReward() {},
        onAdReward: function onAdReward(currencyName, amount) {
          if (_this.rewardVideoCallback != null) {
            _this.rewardVideoCallback();
          }
        }
      });
      this.loadVideo();
      this.loadInterstitial();
    }
  },
  loadInterstitial: function loadInterstitial() {
    this.showFull.loadAd();
  },
  loadVideo: function loadVideo() {
    this.video.loadAd();
  },
  showRewardedVideo: function showRewardedVideo(callback) {
    if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD) {
      if (this.showFull != null && this.video.ready) {
        this.rewardVideoCallback = callback;
        this.video.showAd();
      }
    }
  },
  showBanner: function showBanner() {
    if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD) {
      if (this.banner != null) {
        this.banner.loadAd('bottom');
      }
    }
  },
  showInterstitial: function showInterstitial() {
    if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD) {
      if (this.showFull != null && this.showFull.ready) {
        this.showFull.showAd();
      }
    }
  },
  isHasVideo: function isHasVideo() {
    return this.video.ready;
  },
  isHasInterstitial: function isHasInterstitial() {
    return this.showFull.ready;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxBZHNNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic2hvd0Z1bGxVbml0SWQiLCJ2aWRlb1VuaXRJZCIsImJhbm5lciIsInNob3dGdWxsIiwidmlkZW8iLCJyZXdhcmRWaWRlb0NhbGxiYWNrIiwib25Mb2FkIiwic3lzIiwicGxhdGZvcm0iLCJJUEhPTkUiLCJBTkRST0lEIiwiSVBBRCIsInRyYWRwbHVzIiwidHJhZFBsdXNTZXJ2aWNlIiwic2V0RW5hYmxlTG9nIiwiaW5pdFNkayIsInNldE5lZWRUZXN0RGV2aWNlIiwiZ2V0QmFubmVyIiwiYmFubmVyVW5pdElkIiwiZ2V0SW50ZXJzdGl0aWFsIiwiZ2V0UmV3YXJkZWRWaWRlbyIsInNldEFkTGlzdGVuZXIiLCJvbkFkTG9hZGVkIiwiYWRTb3VyY2VOYW1lIiwibG9nIiwib25BZENsaWNrZWQiLCJvbkFkTG9hZEZhaWxlZCIsImFkRXJyb3IiLCJvbkFkSW1wcmVzc2lvbiIsIm9uQWRTaG93RmFpbGVkIiwib25BZENsb3NlZCIsIm9uQmFubmVyUmVmcmVzaGVkIiwib25BZEFsbExvYWRlZCIsIm9uQWRGYWlsZWQiLCJsb2FkSW50ZXJzdGl0aWFsIiwib25BZFBsYXlGYWlsZWQiLCJvbk9uZUxheWVyTG9hZEZhaWxlZCIsIm9uT25lTGF5ZXJMb2FkZWQiLCJsb2FkQWQiLCJvbkFkTm90UmV3YXJkIiwib25BZFJld2FyZCIsImN1cnJlbmN5TmFtZSIsImFtb3VudCIsImxvYWRWaWRlbyIsInNob3dSZXdhcmRlZFZpZGVvIiwiY2FsbGJhY2siLCJyZWFkeSIsInNob3dBZCIsInNob3dCYW5uZXIiLCJzaG93SW50ZXJzdGl0aWFsIiwiaXNIYXNWaWRlbyIsImlzSGFzSW50ZXJzdGl0aWFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENB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LEVBQUUsQ0FBQ1csR0FBSCxDQUFPQyxRQUFQLEtBQWtCWixFQUFFLENBQUNXLEdBQUgsQ0FBT0UsTUFBekIsSUFBbUNiLEVBQUUsQ0FBQ1csR0FBSCxDQUFPQyxRQUFQLEtBQWtCWixFQUFFLENBQUNXLEdBQUgsQ0FBT0csT0FBNUQsSUFBdUVkLEVBQUUsQ0FBQ1csR0FBSCxDQUFPQyxRQUFQLEtBQWtCWixFQUFFLENBQUNXLEdBQUgsQ0FBT0ksSUFBbkcsRUFDQTtBQUNJLFVBQUcsS0FBS1QsTUFBTCxJQUFlLElBQWxCLEVBQ0E7QUFDSSxhQUFLQSxNQUFMLENBQVlvQyxNQUFaLENBQW1CLFFBQW5CO0FBQ0g7QUFDSjtBQUNKLEdBcE1JO0FBc01MVyxFQUFBQSxnQkF0TUssOEJBc01jO0FBQ2YsUUFBR3JELEVBQUUsQ0FBQ1csR0FBSCxDQUFPQyxRQUFQLEtBQWtCWixFQUFFLENBQUNXLEdBQUgsQ0FBT0UsTUFBekIsSUFBbUNiLEVBQUUsQ0FBQ1csR0FBSCxDQUFPQyxRQUFQLEtBQWtCWixFQUFFLENBQUNXLEdBQUgsQ0FBT0csT0FBNUQsSUFBdUVkLEVBQUUsQ0FBQ1csR0FBSCxDQUFPQyxRQUFQLEtBQWtCWixFQUFFLENBQUNXLEdBQUgsQ0FBT0ksSUFBbkcsRUFDQTtBQUNJLFVBQUcsS0FBS1IsUUFBTCxJQUFpQixJQUFqQixJQUF5QixLQUFLQSxRQUFMLENBQWMyQyxLQUExQyxFQUNBO0FBQ0ksYUFBSzNDLFFBQUwsQ0FBYzRDLE1BQWQ7QUFDSDtBQUNKO0FBQ0osR0E5TUk7QUFnTkxHLEVBQUFBLFVBaE5LLHdCQWdOTztBQUNSLFdBQU8sS0FBSzlDLEtBQUwsQ0FBVzBDLEtBQWxCO0FBQ0gsR0FsTkk7QUFvTkxLLEVBQUFBLGlCQXBOSywrQkFvTmM7QUFDZixXQUFPLEtBQUtoRCxRQUFMLENBQWMyQyxLQUFyQjtBQUNIO0FBdE5JLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvLyBiYW5uZXJVbml0SWQ6IFwiXCIsXHJcbiAgICAgICAgc2hvd0Z1bGxVbml0SWQ6IFwiXCIsXHJcbiAgICAgICAgdmlkZW9Vbml0SWQ6IFwiXCIsXHJcbiAgICAgICAgYmFubmVyOiBudWxsLFxyXG4gICAgICAgIHNob3dGdWxsOiBudWxsLFxyXG4gICAgICAgIHZpZGVvOiBudWxsLFxyXG4gICAgICAgIHJld2FyZFZpZGVvQ2FsbGJhY2s6IG51bGwsXHJcbiAgICAgICAgLy9iYW5uZXJMb2FkZWQ6IGZhbHNlLFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybT09PWNjLnN5cy5JUEhPTkUgfHwgY2Muc3lzLnBsYXRmb3JtPT09Y2Muc3lzLkFORFJPSUQgfHwgY2Muc3lzLnBsYXRmb3JtPT09Y2Muc3lzLklQQUQpIHtcclxuICAgICAgICAgICAgLy8gRW5hYmxlIGRlYnVnIGxvZywgdGhpcyBpcyBmb3IgdGVzdGluZyBvbmx5LCBwbGVhc2UgY29tbWVudCBpdCBvdXQgYmVmb3JlIHB1Ymxpc2guXHJcbiAgICAgICAgICAgIHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5zZXRFbmFibGVMb2codHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgdGhlIFNESy5cclxuICAgICAgICAgICAgdHJhZHBsdXMudHJhZFBsdXNTZXJ2aWNlLmluaXRTZGsoKTtcclxuICAgICAgICAgICAgLy8gRW5hYmxlIHRlc3QgbW9kZSwgdGhpcyBpcyBmb3IgdGVzdGluZyBvbmx5LCBwbGVhc2UgY29tbWVudCBpdCBvdXQgYmVmb3JlIHB1Ymxpc2guXHJcbiAgICAgICAgICAgIHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5zZXROZWVkVGVzdERldmljZSh0cnVlKTtcclxuICAgICAgICAgICAgLy8gRW5hYmxlIGRlYnVnIGxvZywgdGhpcyBpcyBmb3IgdGVzdGluZyBvbmx5LCBwbGVhc2UgY29tbWVudCBpdCBvdXQgYmVmb3JlIHB1Ymxpc2guXHJcbiAgICAgICAgICAgIHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5zZXRFbmFibGVMb2codHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJhbm5lciA9IHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5nZXRCYW5uZXIodGhpcy5iYW5uZXJVbml0SWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dGdWxsID0gdHJhZHBsdXMudHJhZFBsdXNTZXJ2aWNlLmdldEludGVyc3RpdGlhbCh0aGlzLnNob3dGdWxsVW5pdElkKTtcclxuICAgICAgICAgICAgdGhpcy52aWRlbyA9IHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5nZXRSZXdhcmRlZFZpZGVvKHRoaXMudmlkZW9Vbml0SWQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iYW5uZXIuc2V0QWRMaXN0ZW5lcih7XHJcbiAgICAgICAgICAgICAgICBvbkFkTG9hZGVkOiAoYWRTb3VyY2VOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWRlZCwgYWRTb3VyY2VOYW1lIGlzIHRoZSBuYW1lIG9mIEFkIHNvdXJjZSBwbGF0Zm9ybS5cclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuYmFubmVyTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJiYW5uZXIgbG9hZGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkQ2xpY2tlZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBjbGlja2VkLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkTG9hZEZhaWxlZDogKGFkRXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgbG9hZCBmYWlsZWQsIGFkRXJyb3IgY29udGFpbnMgZXJyb3IgaW5mb3JtYXRpb24uXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwiQWRMb2FkRmFpbGVkOiBcIiArIGFkRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkSW1wcmVzc2lvbjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBzaG93bi5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25BZFNob3dGYWlsZWQ6IChhZEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIHNob3cgZmFpbGVkLCBhZEVycm9yIGNvbnRhaW5zIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IFRoaXMgY2FsbGJhY2sgd2lsbCBvbmx5IHRyaWdnZXJlZCBvbiBBbmRyb2lkLlxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIkFkU2hvd0ZhaWxlZFwiICsgYWRFcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uQWRDbG9zZWQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgY2xvc2VkLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IFRoaXMgY2FsbGJhY2sgd2lsbCBvbmx5IHRyaWdnZXJlZCBvbiBBbmRyb2lkLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkJhbm5lclJlZnJlc2hlZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCByZWZyZXNoZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogVGhpcyBjYWxsYmFjayB3aWxsIG9ubHkgdHJpZ2dlcmVkIG9uIEFuZHJvaWQuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0Z1bGwuc2V0QWRMaXN0ZW5lcih7XHJcbiAgICAgICAgICAgICAgICBvbkFkQWxsTG9hZGVkOiAoYWRTb3VyY2VOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWRlZCwgYWRTb3VyY2VOYW1lIGlzIHRoZSBuYW1lIG9mIEFkIHNvdXJjZSBwbGF0Zm9ybS5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25BZExvYWRlZDogKGFkU291cmNlTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkZWQsIGFkU291cmNlTmFtZSBpcyB0aGUgbmFtZSBvZiBBZCBzb3VyY2UgcGxhdGZvcm0uXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uQWRDbGlja2VkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGNsaWNrZWQuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uQWRGYWlsZWQ6IChhZEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWQgZmFpbGVkLCBhZEVycm9yIGNvbnRhaW5zIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkSW1wcmVzc2lvbjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBzaG93bi5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25BZFNob3dGYWlsZWQ6IChhZEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIHNob3cgZmFpbGVkLCBhZEVycm9yIGNvbnRhaW5zIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IFRoaXMgY2FsbGJhY2sgd2lsbCBvbmx5IHRyaWdnZXJlZCBvbiBBbmRyb2lkLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkQ2xvc2VkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGNsb3NlZC5cclxuICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGNhbGxiYWNrIHdpbGwgb25seSB0cmlnZ2VyZWQgb24gQW5kcm9pZC5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRJbnRlcnN0aXRpYWwoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25BZFBsYXlGYWlsZWQ6IChhZEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWQgZmFpbGVkLCBhZEVycm9yIGNvbnRhaW5zIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbk9uZUxheWVyTG9hZEZhaWxlZDogKGFkU291cmNlTmFtZSwgYWRFcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkIGZhaWxlZCwgYWRFcnJvciBjb250YWlucyBlcnJvciBpbmZvcm1hdGlvbi5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25PbmVMYXllckxvYWRlZDogKGFkU291cmNlTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkZWQsIGFkU291cmNlTmFtZSBpcyB0aGUgbmFtZSBvZiBBZCBzb3VyY2UgcGxhdGZvcm0uXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudmlkZW8uc2V0QWRMaXN0ZW5lcih7XHJcbiAgICAgICAgICAgICAgICBvbkFkQWxsTG9hZGVkOiAoYWRTb3VyY2VOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWRlZCwgYWRTb3VyY2VOYW1lIGlzIHRoZSBuYW1lIG9mIEFkIHNvdXJjZSBwbGF0Zm9ybS5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25BZExvYWRlZDogKGFkU291cmNlTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkZWQsIGFkU291cmNlTmFtZSBpcyB0aGUgbmFtZSBvZiBBZCBzb3VyY2UgcGxhdGZvcm0uXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uQWRDbGlja2VkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGNsaWNrZWQuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uQWRGYWlsZWQ6IChhZEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWQgZmFpbGVkLCBhZEVycm9yIGNvbnRhaW5zIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhcIm9uQWRGYWlsZWQ6IFwiICsgYWRFcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uQWRJbXByZXNzaW9uOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIHNob3duLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkQ2xvc2VkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGNsb3NlZC5cclxuICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGNhbGxiYWNrIHdpbGwgb25seSB0cmlnZ2VyZWQgb24gQW5kcm9pZC5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZGVvLmxvYWRBZCgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkUGxheUZhaWxlZDogKGFkRXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgc2hvd24sIGFkU291cmNlTmFtZSBpcyB0aGUgbmFtZSBvZiBBZCBzb3VyY2UgcGxhdGZvcm1cclxuICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCJvbkFkUGxheUZhaWxlZDogXCIgKyBhZEVycm9yKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25PbmVMYXllckxvYWRGYWlsZWQ6IChhZFNvdXJjZU5hbWUsIGFkRXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgbG9hZCBmYWlsZWQsIGFkRXJyb3IgY29udGFpbnMgZXJyb3IgaW5mb3JtYXRpb24uXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKFwib25PbmVMYXllckxvYWRGYWlsZWQ6IFwiICsgYWRFcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uT25lTGF5ZXJMb2FkZWQ6IChhZFNvdXJjZU5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgbG9hZGVkLCBhZFNvdXJjZU5hbWUgaXMgdGhlIG5hbWUgb2YgQWQgc291cmNlIHBsYXRmb3JtLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkTm90UmV3YXJkOiAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkUmV3YXJkOiAoY3VycmVuY3lOYW1lLCBhbW91bnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnJld2FyZFZpZGVvQ2FsbGJhY2sgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkVmlkZW9DYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRWaWRlbygpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRJbnRlcnN0aXRpYWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGxvYWRJbnRlcnN0aXRpYWwoKXtcclxuICAgICAgICB0aGlzLnNob3dGdWxsLmxvYWRBZCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBsb2FkVmlkZW8oKXtcclxuICAgICAgICB0aGlzLnZpZGVvLmxvYWRBZCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzaG93UmV3YXJkZWRWaWRlbyhjYWxsYmFjaykge1xyXG4gICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybT09PWNjLnN5cy5JUEhPTkUgfHwgY2Muc3lzLnBsYXRmb3JtPT09Y2Muc3lzLkFORFJPSUQgfHwgY2Muc3lzLnBsYXRmb3JtPT09Y2Muc3lzLklQQUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLnNob3dGdWxsICE9IG51bGwgJiYgdGhpcy52aWRlby5yZWFkeSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRWaWRlb0NhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvLnNob3dBZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzaG93QmFubmVyKCkge1xyXG4gICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybT09PWNjLnN5cy5JUEhPTkUgfHwgY2Muc3lzLnBsYXRmb3JtPT09Y2Muc3lzLkFORFJPSUQgfHwgY2Muc3lzLnBsYXRmb3JtPT09Y2Muc3lzLklQQUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLmJhbm5lciAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lci5sb2FkQWQoJ2JvdHRvbScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzaG93SW50ZXJzdGl0aWFsKCkge1xyXG4gICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybT09PWNjLnN5cy5JUEhPTkUgfHwgY2Muc3lzLnBsYXRmb3JtPT09Y2Muc3lzLkFORFJPSUQgfHwgY2Muc3lzLnBsYXRmb3JtPT09Y2Muc3lzLklQQUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLnNob3dGdWxsICE9IG51bGwgJiYgdGhpcy5zaG93RnVsbC5yZWFkeSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RnVsbC5zaG93QWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaXNIYXNWaWRlbygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZpZGVvLnJlYWR5O1xyXG4gICAgfSxcclxuXHJcbiAgICBpc0hhc0ludGVyc3RpdGlhbCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNob3dGdWxsLnJlYWR5O1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==