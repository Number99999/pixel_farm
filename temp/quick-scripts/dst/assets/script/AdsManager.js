
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
    bannerUnitId: "",
    showFullUnitId: "",
    videoUnitId: "",
    bannerOnStart: false,
    banner: null,
    showFull: null,
    video: null,
    rewardVideoCallback: null,
    isTest: false //bannerLoaded: false,

  },
  onLoad: function onLoad() {
    var _this = this;

    if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD) {
      // Enable debug log, this is for testing only, please comment it out before publish.
      tradplus.tradPlusService.setEnableLog(true); // Initialize the SDK.

      tradplus.tradPlusService.initSdk();
      cc.log("====25===="); // Enable test mode, this is for testing only, please comment it out before publish.

      tradplus.tradPlusService.setNeedTestDevice(true); // Enable debug log, this is for testing only, please comment it out before publish.

      tradplus.tradPlusService.setEnableLog(true);

      if (this.bannerOnStart) {
        this.banner = tradplus.tradPlusService.getBanner(this.bannerUnitId);
      }

      this.showFull = tradplus.tradPlusService.getInterstitial(this.showFullUnitId);
      this.video = tradplus.tradPlusService.getRewardedVideo(this.videoUnitId);

      if (this.bannerOnStart) {
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
      }

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
        onAdFailed: function onAdFailed(adError) {
          // Triggered on Ad load failed, adError contains error information.
          cc.log("onAdFailed: " + adError);
        },
        onAdImpression: function onAdImpression() {// Triggered on Ad shown.
        },
        onAdClosed: function onAdClosed() {
          // Triggered on Ad closed.
          // NOTE: This callback will only triggered on Android.
          _this.video.loadAd();
        },
        onAdPlayFailed: function onAdPlayFailed(adError) {
          // Triggered on Ad shown, adSourceName is the name of Ad source platform
          cc.log("onAdPlayFailed: " + adError);
        },
        onOneLayerLoadFailed: function onOneLayerLoadFailed(adSourceName, adError) {
          // Triggered on Ad load failed, adError contains error information.
          cc.log("onOneLayerLoadFailed: " + adError);
        },
        onOneLayerLoaded: function onOneLayerLoaded(adSourceName) {// Triggered on Ad loaded, adSourceName is the name of Ad source platform.
        },
        onAdNotReward: function onAdNotReward() {},
        onAdReward: function onAdReward(currencyName, amount) {
          console.log("ads: ====173====");

          if (_this.rewardVideoCallback != null) {
            console.log("ads: ====175====");

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
    cc.log(this.isTest);

    if (this.isTest) {
      callback();
    } else {
      if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD) {
        if (this.video != null && this.video.ready) {
          this.rewardVideoCallback = callback;
          this.video.showAd();
        }
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
    if (this.isTest) return true;
    if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD) return this.video.ready;
    return false;
  },
  isHasInterstitial: function isHasInterstitial() {
    if (this.isTest) return true;
    if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD) return this.showFull.ready;
    return false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxBZHNNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiYmFubmVyVW5pdElkIiwic2hvd0Z1bGxVbml0SWQiLCJ2aWRlb1VuaXRJZCIsImJhbm5lck9uU3RhcnQiLCJiYW5uZXIiLCJzaG93RnVsbCIsInZpZGVvIiwicmV3YXJkVmlkZW9DYWxsYmFjayIsImlzVGVzdCIsIm9uTG9hZCIsInN5cyIsInBsYXRmb3JtIiwiSVBIT05FIiwiQU5EUk9JRCIsIklQQUQiLCJ0cmFkcGx1cyIsInRyYWRQbHVzU2VydmljZSIsInNldEVuYWJsZUxvZyIsImluaXRTZGsiLCJsb2ciLCJzZXROZWVkVGVzdERldmljZSIsImdldEJhbm5lciIsImdldEludGVyc3RpdGlhbCIsImdldFJld2FyZGVkVmlkZW8iLCJzZXRBZExpc3RlbmVyIiwib25BZExvYWRlZCIsImFkU291cmNlTmFtZSIsIm9uQWRDbGlja2VkIiwib25BZExvYWRGYWlsZWQiLCJhZEVycm9yIiwib25BZEltcHJlc3Npb24iLCJvbkFkU2hvd0ZhaWxlZCIsIm9uQWRDbG9zZWQiLCJvbkJhbm5lclJlZnJlc2hlZCIsIm9uQWRBbGxMb2FkZWQiLCJvbkFkRmFpbGVkIiwibG9hZEludGVyc3RpdGlhbCIsIm9uQWRQbGF5RmFpbGVkIiwib25PbmVMYXllckxvYWRGYWlsZWQiLCJvbk9uZUxheWVyTG9hZGVkIiwibG9hZEFkIiwib25BZE5vdFJld2FyZCIsIm9uQWRSZXdhcmQiLCJjdXJyZW5jeU5hbWUiLCJhbW91bnQiLCJjb25zb2xlIiwibG9hZFZpZGVvIiwic2hvd1Jld2FyZGVkVmlkZW8iLCJjYWxsYmFjayIsInJlYWR5Iiwic2hvd0FkIiwic2hvd0Jhbm5lciIsInNob3dJbnRlcnN0aXRpYWwiLCJpc0hhc1ZpZGVvIiwiaXNIYXNJbnRlcnN0aXRpYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFD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QUFILENBQU9DLFFBQVAsS0FBb0JmLEVBQUUsQ0FBQ2MsR0FBSCxDQUFPSSxJQUExRyxFQUNJLE9BQU8sS0FBS1QsUUFBTCxDQUFjNEMsS0FBckI7QUFDSixXQUFPLEtBQVA7QUFDSDtBQXRPSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBiYW5uZXJVbml0SWQ6IFwiXCIsXG4gICAgICAgIHNob3dGdWxsVW5pdElkOiBcIlwiLFxuICAgICAgICB2aWRlb1VuaXRJZDogXCJcIixcbiAgICAgICAgYmFubmVyT25TdGFydDogZmFsc2UsXG4gICAgICAgIGJhbm5lcjogbnVsbCxcbiAgICAgICAgc2hvd0Z1bGw6IG51bGwsXG4gICAgICAgIHZpZGVvOiBudWxsLFxuICAgICAgICByZXdhcmRWaWRlb0NhbGxiYWNrOiBudWxsLFxuICAgICAgICBpc1Rlc3Q6IGZhbHNlLFxuICAgICAgICAvL2Jhbm5lckxvYWRlZDogZmFsc2UsXG4gICAgfSxcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQSE9ORSB8fCBjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5BTkRST0lEIHx8IGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQQUQpIHtcbiAgICAgICAgICAgIC8vIEVuYWJsZSBkZWJ1ZyBsb2csIHRoaXMgaXMgZm9yIHRlc3Rpbmcgb25seSwgcGxlYXNlIGNvbW1lbnQgaXQgb3V0IGJlZm9yZSBwdWJsaXNoLlxuICAgICAgICAgICAgdHJhZHBsdXMudHJhZFBsdXNTZXJ2aWNlLnNldEVuYWJsZUxvZyh0cnVlKTtcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgdGhlIFNESy5cbiAgICAgICAgICAgIHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5pbml0U2RrKCk7XG4gICAgICAgICAgICBjYy5sb2coXCI9PT09MjU9PT09XCIpO1xuICAgICAgICAgICAgLy8gRW5hYmxlIHRlc3QgbW9kZSwgdGhpcyBpcyBmb3IgdGVzdGluZyBvbmx5LCBwbGVhc2UgY29tbWVudCBpdCBvdXQgYmVmb3JlIHB1Ymxpc2guXG4gICAgICAgICAgICB0cmFkcGx1cy50cmFkUGx1c1NlcnZpY2Uuc2V0TmVlZFRlc3REZXZpY2UodHJ1ZSk7XG4gICAgICAgICAgICAvLyBFbmFibGUgZGVidWcgbG9nLCB0aGlzIGlzIGZvciB0ZXN0aW5nIG9ubHksIHBsZWFzZSBjb21tZW50IGl0IG91dCBiZWZvcmUgcHVibGlzaC5cbiAgICAgICAgICAgIHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5zZXRFbmFibGVMb2codHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmJhbm5lck9uU3RhcnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lciA9IHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5nZXRCYW5uZXIodGhpcy5iYW5uZXJVbml0SWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNob3dGdWxsID0gdHJhZHBsdXMudHJhZFBsdXNTZXJ2aWNlLmdldEludGVyc3RpdGlhbCh0aGlzLnNob3dGdWxsVW5pdElkKTtcbiAgICAgICAgICAgIHRoaXMudmlkZW8gPSB0cmFkcGx1cy50cmFkUGx1c1NlcnZpY2UuZ2V0UmV3YXJkZWRWaWRlbyh0aGlzLnZpZGVvVW5pdElkKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYmFubmVyT25TdGFydCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmFubmVyLnNldEFkTGlzdGVuZXIoe1xuICAgICAgICAgICAgICAgICAgICBvbkFkTG9hZGVkOiAoYWRTb3VyY2VOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgbG9hZGVkLCBhZFNvdXJjZU5hbWUgaXMgdGhlIG5hbWUgb2YgQWQgc291cmNlIHBsYXRmb3JtLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmJhbm5lckxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJiYW5uZXIgbG9hZGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIG9uQWRDbGlja2VkOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgY2xpY2tlZC5cbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBvbkFkTG9hZEZhaWxlZDogKGFkRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkIGZhaWxlZCwgYWRFcnJvciBjb250YWlucyBlcnJvciBpbmZvcm1hdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIkFkTG9hZEZhaWxlZDogXCIgKyBhZEVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBvbkFkSW1wcmVzc2lvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIHNob3duLlxuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIG9uQWRTaG93RmFpbGVkOiAoYWRFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIHNob3cgZmFpbGVkLCBhZEVycm9yIGNvbnRhaW5zIGVycm9yIGluZm9ybWF0aW9uLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogVGhpcyBjYWxsYmFjayB3aWxsIG9ubHkgdHJpZ2dlcmVkIG9uIEFuZHJvaWQuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJBZFNob3dGYWlsZWRcIiArIGFkRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIG9uQWRDbG9zZWQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBjbG9zZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGNhbGxiYWNrIHdpbGwgb25seSB0cmlnZ2VyZWQgb24gQW5kcm9pZC5cbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBvbkJhbm5lclJlZnJlc2hlZDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIHJlZnJlc2hlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IFRoaXMgY2FsbGJhY2sgd2lsbCBvbmx5IHRyaWdnZXJlZCBvbiBBbmRyb2lkLlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zaG93RnVsbC5zZXRBZExpc3RlbmVyKHtcbiAgICAgICAgICAgICAgICBvbkFkQWxsTG9hZGVkOiAoYWRTb3VyY2VOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkZWQsIGFkU291cmNlTmFtZSBpcyB0aGUgbmFtZSBvZiBBZCBzb3VyY2UgcGxhdGZvcm0uXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIG9uQWRMb2FkZWQ6IChhZFNvdXJjZU5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWRlZCwgYWRTb3VyY2VOYW1lIGlzIHRoZSBuYW1lIG9mIEFkIHNvdXJjZSBwbGF0Zm9ybS5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgb25BZENsaWNrZWQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGNsaWNrZWQuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIG9uQWRGYWlsZWQ6IChhZEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkIGZhaWxlZCwgYWRFcnJvciBjb250YWlucyBlcnJvciBpbmZvcm1hdGlvbi5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgb25BZEltcHJlc3Npb246ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIHNob3duLlxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBvbkFkU2hvd0ZhaWxlZDogKGFkRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIHNob3cgZmFpbGVkLCBhZEVycm9yIGNvbnRhaW5zIGVycm9yIGluZm9ybWF0aW9uLlxuICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGNhbGxiYWNrIHdpbGwgb25seSB0cmlnZ2VyZWQgb24gQW5kcm9pZC5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgb25BZENsb3NlZDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgY2xvc2VkLlxuICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGNhbGxiYWNrIHdpbGwgb25seSB0cmlnZ2VyZWQgb24gQW5kcm9pZC5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkSW50ZXJzdGl0aWFsKCk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIG9uQWRQbGF5RmFpbGVkOiAoYWRFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgbG9hZCBmYWlsZWQsIGFkRXJyb3IgY29udGFpbnMgZXJyb3IgaW5mb3JtYXRpb24uXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIG9uT25lTGF5ZXJMb2FkRmFpbGVkOiAoYWRTb3VyY2VOYW1lLCBhZEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkIGZhaWxlZCwgYWRFcnJvciBjb250YWlucyBlcnJvciBpbmZvcm1hdGlvbi5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgb25PbmVMYXllckxvYWRlZDogKGFkU291cmNlTmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgbG9hZGVkLCBhZFNvdXJjZU5hbWUgaXMgdGhlIG5hbWUgb2YgQWQgc291cmNlIHBsYXRmb3JtLlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy52aWRlby5zZXRBZExpc3RlbmVyKHtcbiAgICAgICAgICAgICAgICBvbkFkQWxsTG9hZGVkOiAoYWRTb3VyY2VOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkZWQsIGFkU291cmNlTmFtZSBpcyB0aGUgbmFtZSBvZiBBZCBzb3VyY2UgcGxhdGZvcm0uXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIG9uQWRMb2FkZWQ6IChhZFNvdXJjZU5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWRlZCwgYWRTb3VyY2VOYW1lIGlzIHRoZSBuYW1lIG9mIEFkIHNvdXJjZSBwbGF0Zm9ybS5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgb25BZENsaWNrZWQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGNsaWNrZWQuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIG9uQWRGYWlsZWQ6IChhZEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkIGZhaWxlZCwgYWRFcnJvciBjb250YWlucyBlcnJvciBpbmZvcm1hdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwib25BZEZhaWxlZDogXCIgKyBhZEVycm9yKTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgb25BZEltcHJlc3Npb246ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIHNob3duLlxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBvbkFkQ2xvc2VkOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBjbG9zZWQuXG4gICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IFRoaXMgY2FsbGJhY2sgd2lsbCBvbmx5IHRyaWdnZXJlZCBvbiBBbmRyb2lkLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZGVvLmxvYWRBZCgpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBvbkFkUGxheUZhaWxlZDogKGFkRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIHNob3duLCBhZFNvdXJjZU5hbWUgaXMgdGhlIG5hbWUgb2YgQWQgc291cmNlIHBsYXRmb3JtXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIm9uQWRQbGF5RmFpbGVkOiBcIiArIGFkRXJyb3IpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBvbk9uZUxheWVyTG9hZEZhaWxlZDogKGFkU291cmNlTmFtZSwgYWRFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgbG9hZCBmYWlsZWQsIGFkRXJyb3IgY29udGFpbnMgZXJyb3IgaW5mb3JtYXRpb24uXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIm9uT25lTGF5ZXJMb2FkRmFpbGVkOiBcIiArIGFkRXJyb3IpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBvbk9uZUxheWVyTG9hZGVkOiAoYWRTb3VyY2VOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkZWQsIGFkU291cmNlTmFtZSBpcyB0aGUgbmFtZSBvZiBBZCBzb3VyY2UgcGxhdGZvcm0uXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIG9uQWROb3RSZXdhcmQ6ICgpID0+IHtcblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBvbkFkUmV3YXJkOiAoY3VycmVuY3lOYW1lLCBhbW91bnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZHM6ID09PT0xNzM9PT09XCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXdhcmRWaWRlb0NhbGxiYWNrICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRzOiA9PT09MTc1PT09PVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkVmlkZW9DYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5sb2FkVmlkZW8oKTtcbiAgICAgICAgICAgIHRoaXMubG9hZEludGVyc3RpdGlhbCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGxvYWRJbnRlcnN0aXRpYWwoKSB7XG4gICAgICAgIHRoaXMuc2hvd0Z1bGwubG9hZEFkKCk7XG4gICAgfSxcblxuICAgIGxvYWRWaWRlbygpIHtcbiAgICAgICAgdGhpcy52aWRlby5sb2FkQWQoKTtcbiAgICB9LFxuXG4gICAgc2hvd1Jld2FyZGVkVmlkZW8oY2FsbGJhY2spIHtcbiAgICAgICAgY2MubG9nKHRoaXMuaXNUZXN0KTtcbiAgICAgICAgaWYgKHRoaXMuaXNUZXN0KSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQSE9ORSB8fCBjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5BTkRST0lEIHx8IGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQQUQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52aWRlbyAhPSBudWxsICYmIHRoaXMudmlkZW8ucmVhZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRWaWRlb0NhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlkZW8uc2hvd0FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNob3dCYW5uZXIoKSB7XG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5JUEhPTkUgfHwgY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuQU5EUk9JRCB8fCBjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5JUEFEKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5iYW5uZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmFubmVyLmxvYWRBZCgnYm90dG9tJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvd0ludGVyc3RpdGlhbCgpIHtcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQSE9ORSB8fCBjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5BTkRST0lEIHx8IGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQQUQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3dGdWxsICE9IG51bGwgJiYgdGhpcy5zaG93RnVsbC5yZWFkeSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Z1bGwuc2hvd0FkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNIYXNWaWRlbygpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNUZXN0KVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQSE9ORSB8fCBjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5BTkRST0lEIHx8IGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQQUQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aWRlby5yZWFkeTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBpc0hhc0ludGVyc3RpdGlhbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNUZXN0KVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQSE9ORSB8fCBjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5BTkRST0lEIHx8IGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQQUQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zaG93RnVsbC5yZWFkeTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG59KTtcbiJdfQ==