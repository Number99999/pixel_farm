
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxBZHNNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiYmFubmVyVW5pdElkIiwic2hvd0Z1bGxVbml0SWQiLCJ2aWRlb1VuaXRJZCIsImJhbm5lck9uU3RhcnQiLCJiYW5uZXIiLCJzaG93RnVsbCIsInZpZGVvIiwicmV3YXJkVmlkZW9DYWxsYmFjayIsImlzVGVzdCIsIm9uTG9hZCIsInN5cyIsInBsYXRmb3JtIiwiSVBIT05FIiwiQU5EUk9JRCIsIklQQUQiLCJ0cmFkcGx1cyIsInRyYWRQbHVzU2VydmljZSIsInNldEVuYWJsZUxvZyIsImluaXRTZGsiLCJsb2ciLCJzZXROZWVkVGVzdERldmljZSIsImdldEJhbm5lciIsImdldEludGVyc3RpdGlhbCIsImdldFJld2FyZGVkVmlkZW8iLCJzZXRBZExpc3RlbmVyIiwib25BZExvYWRlZCIsImFkU291cmNlTmFtZSIsIm9uQWRDbGlja2VkIiwib25BZExvYWRGYWlsZWQiLCJhZEVycm9yIiwib25BZEltcHJlc3Npb24iLCJvbkFkU2hvd0ZhaWxlZCIsIm9uQWRDbG9zZWQiLCJvbkJhbm5lclJlZnJlc2hlZCIsIm9uQWRBbGxMb2FkZWQiLCJvbkFkRmFpbGVkIiwibG9hZEludGVyc3RpdGlhbCIsIm9uQWRQbGF5RmFpbGVkIiwib25PbmVMYXllckxvYWRGYWlsZWQiLCJvbk9uZUxheWVyTG9hZGVkIiwibG9hZEFkIiwib25BZE5vdFJld2FyZCIsIm9uQWRSZXdhcmQiLCJjdXJyZW5jeU5hbWUiLCJhbW91bnQiLCJjb25zb2xlIiwibG9hZFZpZGVvIiwic2hvd1Jld2FyZGVkVmlkZW8iLCJjYWxsYmFjayIsInJlYWR5Iiwic2hvd0FkIiwic2hvd0Jhbm5lciIsInNob3dJbnRlcnN0aXRpYWwiLCJpc0hhc1ZpZGVvIiwiaXNIYXNJbnRlcnN0aXRpYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxZQUFZLEVBQUUsRUFETjtBQUVSQyxJQUFBQSxjQUFjLEVBQUUsRUFGUjtBQUdSQyxJQUFBQSxXQUFXLEVBQUUsRUFITDtBQUlSQyxJQUFBQSxhQUFhLEVBQUUsS0FKUDtBQUtSQyxJQUFBQSxNQUFNLEVBQUUsSUFMQTtBQU1SQyxJQUFBQSxRQUFRLEVBQUUsSUFORjtBQU9SQyxJQUFBQSxLQUFLLEVBQUUsSUFQQztBQVFSQyxJQUFBQSxtQkFBbUIsRUFBRSxJQVJiO0FBU1JDLElBQUFBLE1BQU0sRUFBRSxLQVRBLENBVVI7O0FBVlEsR0FIUDtBQWdCTEMsRUFBQUEsTUFoQkssb0JBZ0JJO0FBQUE7O0FBQ0wsUUFBSWIsRUFBRSxDQUFDYyxHQUFILENBQU9DLFFBQVAsS0FBb0JmLEVBQUUsQ0FBQ2MsR0FBSCxDQUFPRSxNQUEzQixJQUFxQ2hCLEVBQUUsQ0FBQ2MsR0FBSCxDQUFPQyxRQUFQLEtBQW9CZixFQUFFLENBQUNjLEdBQUgsQ0FBT0csT0FBaEUsSUFBMkVqQixFQUFFLENBQUNjLEdBQUgsQ0FBT0MsUUFBUCxLQUFvQmYsRUFBRSxDQUFDYyxHQUFILENBQU9JLElBQTFHLEVBQWdIO0FBQzVHO0FBQ0FDLE1BQUFBLFFBQVEsQ0FBQ0MsZUFBVCxDQUF5QkMsWUFBekIsQ0FBc0MsSUFBdEMsRUFGNEcsQ0FHNUc7O0FBQ0FGLE1BQUFBLFFBQVEsQ0FBQ0MsZUFBVCxDQUF5QkUsT0FBekI7QUFDQXRCLE1BQUFBLEVBQUUsQ0FBQ3VCLEdBQUgsQ0FBTyxZQUFQLEVBTDRHLENBTTVHOztBQUNBSixNQUFBQSxRQUFRLENBQUNDLGVBQVQsQ0FBeUJJLGlCQUF6QixDQUEyQyxJQUEzQyxFQVA0RyxDQVE1Rzs7QUFDQUwsTUFBQUEsUUFBUSxDQUFDQyxlQUFULENBQXlCQyxZQUF6QixDQUFzQyxJQUF0Qzs7QUFFQSxVQUFJLEtBQUtkLGFBQVQsRUFBd0I7QUFDcEIsYUFBS0MsTUFBTCxHQUFjVyxRQUFRLENBQUNDLGVBQVQsQ0FBeUJLLFNBQXpCLENBQW1DLEtBQUtyQixZQUF4QyxDQUFkO0FBQ0g7O0FBRUQsV0FBS0ssUUFBTCxHQUFnQlUsUUFBUSxDQUFDQyxlQUFULENBQXlCTSxlQUF6QixDQUF5QyxLQUFLckIsY0FBOUMsQ0FBaEI7QUFDQSxXQUFLSyxLQUFMLEdBQWFTLFFBQVEsQ0FBQ0MsZUFBVCxDQUF5Qk8sZ0JBQXpCLENBQTBDLEtBQUtyQixXQUEvQyxDQUFiOztBQUVBLFVBQUksS0FBS0MsYUFBVCxFQUF3QjtBQUNwQixhQUFLQyxNQUFMLENBQVlvQixhQUFaLENBQTBCO0FBQ3RCQyxVQUFBQSxVQUFVLEVBQUUsb0JBQUNDLFlBQUQsRUFBa0I7QUFDMUI7QUFDQTtBQUNBOUIsWUFBQUEsRUFBRSxDQUFDdUIsR0FBSCxDQUFPLGVBQVA7QUFDSCxXQUxxQjtBQU90QlEsVUFBQUEsV0FBVyxFQUFFLHVCQUFNLENBQ2Y7QUFDSCxXQVRxQjtBQVd0QkMsVUFBQUEsY0FBYyxFQUFFLHdCQUFDQyxPQUFELEVBQWE7QUFDekI7QUFDQWpDLFlBQUFBLEVBQUUsQ0FBQ3VCLEdBQUgsQ0FBTyxtQkFBbUJVLE9BQTFCO0FBQ0gsV0FkcUI7QUFnQnRCQyxVQUFBQSxjQUFjLEVBQUUsMEJBQU0sQ0FDbEI7QUFDSCxXQWxCcUI7QUFvQnRCQyxVQUFBQSxjQUFjLEVBQUUsd0JBQUNGLE9BQUQsRUFBYTtBQUN6QjtBQUNBO0FBQ0FqQyxZQUFBQSxFQUFFLENBQUN1QixHQUFILENBQU8saUJBQWlCVSxPQUF4QjtBQUNILFdBeEJxQjtBQTBCdEJHLFVBQUFBLFVBQVUsRUFBRSxzQkFBTSxDQUNkO0FBQ0E7QUFDSCxXQTdCcUI7QUErQnRCQyxVQUFBQSxpQkFBaUIsRUFBRSw2QkFBTSxDQUNyQjtBQUNBO0FBQ0g7QUFsQ3FCLFNBQTFCO0FBb0NIOztBQUNELFdBQUs1QixRQUFMLENBQWNtQixhQUFkLENBQTRCO0FBQ3hCVSxRQUFBQSxhQUFhLEVBQUUsdUJBQUNSLFlBQUQsRUFBa0IsQ0FDN0I7QUFDSCxTQUh1QjtBQUt4QkQsUUFBQUEsVUFBVSxFQUFFLG9CQUFDQyxZQUFELEVBQWtCLENBQzFCO0FBQ0gsU0FQdUI7QUFTeEJDLFFBQUFBLFdBQVcsRUFBRSx1QkFBTSxDQUNmO0FBQ0gsU0FYdUI7QUFheEJRLFFBQUFBLFVBQVUsRUFBRSxvQkFBQ04sT0FBRCxFQUFhLENBQ3JCO0FBQ0gsU0FmdUI7QUFpQnhCQyxRQUFBQSxjQUFjLEVBQUUsMEJBQU0sQ0FDbEI7QUFDSCxTQW5CdUI7QUFxQnhCQyxRQUFBQSxjQUFjLEVBQUUsd0JBQUNGLE9BQUQsRUFBYSxDQUN6QjtBQUNBO0FBQ0gsU0F4QnVCO0FBMEJ4QkcsUUFBQUEsVUFBVSxFQUFFLHNCQUFNO0FBQ2Q7QUFDQTtBQUNBLFVBQUEsS0FBSSxDQUFDSSxnQkFBTDtBQUNILFNBOUJ1QjtBQWdDeEJDLFFBQUFBLGNBQWMsRUFBRSx3QkFBQ1IsT0FBRCxFQUFhLENBQ3pCO0FBQ0gsU0FsQ3VCO0FBb0N4QlMsUUFBQUEsb0JBQW9CLEVBQUUsOEJBQUNaLFlBQUQsRUFBZUcsT0FBZixFQUEyQixDQUM3QztBQUNILFNBdEN1QjtBQXdDeEJVLFFBQUFBLGdCQUFnQixFQUFFLDBCQUFDYixZQUFELEVBQWtCLENBQ2hDO0FBQ0g7QUExQ3VCLE9BQTVCO0FBNkNBLFdBQUtwQixLQUFMLENBQVdrQixhQUFYLENBQXlCO0FBQ3JCVSxRQUFBQSxhQUFhLEVBQUUsdUJBQUNSLFlBQUQsRUFBa0IsQ0FDN0I7QUFDSCxTQUhvQjtBQUtyQkQsUUFBQUEsVUFBVSxFQUFFLG9CQUFDQyxZQUFELEVBQWtCLENBQzFCO0FBQ0gsU0FQb0I7QUFTckJDLFFBQUFBLFdBQVcsRUFBRSx1QkFBTSxDQUNmO0FBQ0gsU0FYb0I7QUFhckJRLFFBQUFBLFVBQVUsRUFBRSxvQkFBQ04sT0FBRCxFQUFhO0FBQ3JCO0FBQ0FqQyxVQUFBQSxFQUFFLENBQUN1QixHQUFILENBQU8saUJBQWlCVSxPQUF4QjtBQUNILFNBaEJvQjtBQWtCckJDLFFBQUFBLGNBQWMsRUFBRSwwQkFBTSxDQUNsQjtBQUNILFNBcEJvQjtBQXNCckJFLFFBQUFBLFVBQVUsRUFBRSxzQkFBTTtBQUNkO0FBQ0E7QUFDQSxVQUFBLEtBQUksQ0FBQzFCLEtBQUwsQ0FBV2tDLE1BQVg7QUFDSCxTQTFCb0I7QUE0QnJCSCxRQUFBQSxjQUFjLEVBQUUsd0JBQUNSLE9BQUQsRUFBYTtBQUN6QjtBQUNBakMsVUFBQUEsRUFBRSxDQUFDdUIsR0FBSCxDQUFPLHFCQUFxQlUsT0FBNUI7QUFDSCxTQS9Cb0I7QUFpQ3JCUyxRQUFBQSxvQkFBb0IsRUFBRSw4QkFBQ1osWUFBRCxFQUFlRyxPQUFmLEVBQTJCO0FBQzdDO0FBQ0FqQyxVQUFBQSxFQUFFLENBQUN1QixHQUFILENBQU8sMkJBQTJCVSxPQUFsQztBQUNILFNBcENvQjtBQXNDckJVLFFBQUFBLGdCQUFnQixFQUFFLDBCQUFDYixZQUFELEVBQWtCLENBQ2hDO0FBQ0gsU0F4Q29CO0FBMENyQmUsUUFBQUEsYUFBYSxFQUFFLHlCQUFNLENBRXBCLENBNUNvQjtBQThDckJDLFFBQUFBLFVBQVUsRUFBRSxvQkFBQ0MsWUFBRCxFQUFlQyxNQUFmLEVBQTBCO0FBQ2xDQyxVQUFBQSxPQUFPLENBQUMxQixHQUFSLENBQVksa0JBQVo7O0FBQ0EsY0FBSSxLQUFJLENBQUNaLG1CQUFMLElBQTRCLElBQWhDLEVBQXNDO0FBQ2xDc0MsWUFBQUEsT0FBTyxDQUFDMUIsR0FBUixDQUFZLGtCQUFaOztBQUNBLFlBQUEsS0FBSSxDQUFDWixtQkFBTDtBQUNIO0FBQ0o7QUFwRG9CLE9BQXpCO0FBc0RBLFdBQUt1QyxTQUFMO0FBQ0EsV0FBS1YsZ0JBQUw7QUFDSDtBQUNKLEdBL0tJO0FBaUxMQSxFQUFBQSxnQkFqTEssOEJBaUxjO0FBQ2YsU0FBSy9CLFFBQUwsQ0FBY21DLE1BQWQ7QUFDSCxHQW5MSTtBQXFMTE0sRUFBQUEsU0FyTEssdUJBcUxPO0FBQ1IsU0FBS3hDLEtBQUwsQ0FBV2tDLE1BQVg7QUFDSCxHQXZMSTtBQXlMTE8sRUFBQUEsaUJBekxLLDZCQXlMYUMsUUF6TGIsRUF5THVCO0FBQ3hCcEQsSUFBQUEsRUFBRSxDQUFDdUIsR0FBSCxDQUFPLEtBQUtYLE1BQVo7O0FBQ0EsUUFBSSxLQUFLQSxNQUFULEVBQWlCO0FBQ2J3QyxNQUFBQSxRQUFRO0FBQ1gsS0FGRCxNQUdLO0FBQ0QsVUFBSXBELEVBQUUsQ0FBQ2MsR0FBSCxDQUFPQyxRQUFQLEtBQW9CZixFQUFFLENBQUNjLEdBQUgsQ0FBT0UsTUFBM0IsSUFBcUNoQixFQUFFLENBQUNjLEdBQUgsQ0FBT0MsUUFBUCxLQUFvQmYsRUFBRSxDQUFDYyxHQUFILENBQU9HLE9BQWhFLElBQTJFakIsRUFBRSxDQUFDYyxHQUFILENBQU9DLFFBQVAsS0FBb0JmLEVBQUUsQ0FBQ2MsR0FBSCxDQUFPSSxJQUExRyxFQUFnSDtBQUM1RyxZQUFJLEtBQUtSLEtBQUwsSUFBYyxJQUFkLElBQXNCLEtBQUtBLEtBQUwsQ0FBVzJDLEtBQXJDLEVBQTRDO0FBQ3hDLGVBQUsxQyxtQkFBTCxHQUEyQnlDLFFBQTNCO0FBQ0EsZUFBSzFDLEtBQUwsQ0FBVzRDLE1BQVg7QUFDSDtBQUNKO0FBQ0o7QUFDSixHQXRNSTtBQXdNTEMsRUFBQUEsVUF4TUssd0JBd01RO0FBQ1QsUUFBSXZELEVBQUUsQ0FBQ2MsR0FBSCxDQUFPQyxRQUFQLEtBQW9CZixFQUFFLENBQUNjLEdBQUgsQ0FBT0UsTUFBM0IsSUFBcUNoQixFQUFFLENBQUNjLEdBQUgsQ0FBT0MsUUFBUCxLQUFvQmYsRUFBRSxDQUFDYyxHQUFILENBQU9HLE9BQWhFLElBQTJFakIsRUFBRSxDQUFDYyxHQUFILENBQU9DLFFBQVAsS0FBb0JmLEVBQUUsQ0FBQ2MsR0FBSCxDQUFPSSxJQUExRyxFQUFnSDtBQUM1RyxVQUFJLEtBQUtWLE1BQUwsSUFBZSxJQUFuQixFQUF5QjtBQUNyQixhQUFLQSxNQUFMLENBQVlvQyxNQUFaLENBQW1CLFFBQW5CO0FBQ0g7QUFDSjtBQUNKLEdBOU1JO0FBZ05MWSxFQUFBQSxnQkFoTkssOEJBZ05jO0FBQ2YsUUFBSXhELEVBQUUsQ0FBQ2MsR0FBSCxDQUFPQyxRQUFQLEtBQW9CZixFQUFFLENBQUNjLEdBQUgsQ0FBT0UsTUFBM0IsSUFBcUNoQixFQUFFLENBQUNjLEdBQUgsQ0FBT0MsUUFBUCxLQUFvQmYsRUFBRSxDQUFDYyxHQUFILENBQU9HLE9BQWhFLElBQTJFakIsRUFBRSxDQUFDYyxHQUFILENBQU9DLFFBQVAsS0FBb0JmLEVBQUUsQ0FBQ2MsR0FBSCxDQUFPSSxJQUExRyxFQUFnSDtBQUM1RyxVQUFJLEtBQUtULFFBQUwsSUFBaUIsSUFBakIsSUFBeUIsS0FBS0EsUUFBTCxDQUFjNEMsS0FBM0MsRUFBa0Q7QUFDOUMsYUFBSzVDLFFBQUwsQ0FBYzZDLE1BQWQ7QUFDSDtBQUNKO0FBQ0osR0F0Tkk7QUF3TkxHLEVBQUFBLFVBeE5LLHdCQXdOUTtBQUNULFFBQUksS0FBSzdDLE1BQVQsRUFDSSxPQUFPLElBQVA7QUFDSixRQUFJWixFQUFFLENBQUNjLEdBQUgsQ0FBT0MsUUFBUCxLQUFvQmYsRUFBRSxDQUFDYyxHQUFILENBQU9FLE1BQTNCLElBQXFDaEIsRUFBRSxDQUFDYyxHQUFILENBQU9DLFFBQVAsS0FBb0JmLEVBQUUsQ0FBQ2MsR0FBSCxDQUFPRyxPQUFoRSxJQUEyRWpCLEVBQUUsQ0FBQ2MsR0FBSCxDQUFPQyxRQUFQLEtBQW9CZixFQUFFLENBQUNjLEdBQUgsQ0FBT0ksSUFBMUcsRUFDSSxPQUFPLEtBQUtSLEtBQUwsQ0FBVzJDLEtBQWxCO0FBQ0osV0FBTyxLQUFQO0FBQ0gsR0E5Tkk7QUFnT0xLLEVBQUFBLGlCQWhPSywrQkFnT2U7QUFDaEIsUUFBSSxLQUFLOUMsTUFBVCxFQUNJLE9BQU8sSUFBUDtBQUNKLFFBQUlaLEVBQUUsQ0FBQ2MsR0FBSCxDQUFPQyxRQUFQLEtBQW9CZixFQUFFLENBQUNjLEdBQUgsQ0FBT0UsTUFBM0IsSUFBcUNoQixFQUFFLENBQUNjLEdBQUgsQ0FBT0MsUUFBUCxLQUFvQmYsRUFBRSxDQUFDYyxHQUFILENBQU9HLE9BQWhFLElBQTJFakIsRUFBRSxDQUFDYyxHQUFILENBQU9DLFFBQVAsS0FBb0JmLEVBQUUsQ0FBQ2MsR0FBSCxDQUFPSSxJQUExRyxFQUNJLE9BQU8sS0FBS1QsUUFBTCxDQUFjNEMsS0FBckI7QUFDSixXQUFPLEtBQVA7QUFDSDtBQXRPSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYmFubmVyVW5pdElkOiBcIlwiLFxyXG4gICAgICAgIHNob3dGdWxsVW5pdElkOiBcIlwiLFxyXG4gICAgICAgIHZpZGVvVW5pdElkOiBcIlwiLFxyXG4gICAgICAgIGJhbm5lck9uU3RhcnQ6IGZhbHNlLFxyXG4gICAgICAgIGJhbm5lcjogbnVsbCxcclxuICAgICAgICBzaG93RnVsbDogbnVsbCxcclxuICAgICAgICB2aWRlbzogbnVsbCxcclxuICAgICAgICByZXdhcmRWaWRlb0NhbGxiYWNrOiBudWxsLFxyXG4gICAgICAgIGlzVGVzdDogZmFsc2UsXHJcbiAgICAgICAgLy9iYW5uZXJMb2FkZWQ6IGZhbHNlLFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQSE9ORSB8fCBjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5BTkRST0lEIHx8IGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQQUQpIHtcclxuICAgICAgICAgICAgLy8gRW5hYmxlIGRlYnVnIGxvZywgdGhpcyBpcyBmb3IgdGVzdGluZyBvbmx5LCBwbGVhc2UgY29tbWVudCBpdCBvdXQgYmVmb3JlIHB1Ymxpc2guXHJcbiAgICAgICAgICAgIHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5zZXRFbmFibGVMb2codHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgdGhlIFNESy5cclxuICAgICAgICAgICAgdHJhZHBsdXMudHJhZFBsdXNTZXJ2aWNlLmluaXRTZGsoKTtcclxuICAgICAgICAgICAgY2MubG9nKFwiPT09PTI1PT09PVwiKTtcclxuICAgICAgICAgICAgLy8gRW5hYmxlIHRlc3QgbW9kZSwgdGhpcyBpcyBmb3IgdGVzdGluZyBvbmx5LCBwbGVhc2UgY29tbWVudCBpdCBvdXQgYmVmb3JlIHB1Ymxpc2guXHJcbiAgICAgICAgICAgIHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5zZXROZWVkVGVzdERldmljZSh0cnVlKTtcclxuICAgICAgICAgICAgLy8gRW5hYmxlIGRlYnVnIGxvZywgdGhpcyBpcyBmb3IgdGVzdGluZyBvbmx5LCBwbGVhc2UgY29tbWVudCBpdCBvdXQgYmVmb3JlIHB1Ymxpc2guXHJcbiAgICAgICAgICAgIHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5zZXRFbmFibGVMb2codHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5iYW5uZXJPblN0YXJ0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lciA9IHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5nZXRCYW5uZXIodGhpcy5iYW5uZXJVbml0SWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNob3dGdWxsID0gdHJhZHBsdXMudHJhZFBsdXNTZXJ2aWNlLmdldEludGVyc3RpdGlhbCh0aGlzLnNob3dGdWxsVW5pdElkKTtcclxuICAgICAgICAgICAgdGhpcy52aWRlbyA9IHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5nZXRSZXdhcmRlZFZpZGVvKHRoaXMudmlkZW9Vbml0SWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuYmFubmVyT25TdGFydCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYW5uZXIuc2V0QWRMaXN0ZW5lcih7XHJcbiAgICAgICAgICAgICAgICAgICAgb25BZExvYWRlZDogKGFkU291cmNlTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgbG9hZGVkLCBhZFNvdXJjZU5hbWUgaXMgdGhlIG5hbWUgb2YgQWQgc291cmNlIHBsYXRmb3JtLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuYmFubmVyTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwiYmFubmVyIGxvYWRlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvbkFkQ2xpY2tlZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgY2xpY2tlZC5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvbkFkTG9hZEZhaWxlZDogKGFkRXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWQgZmFpbGVkLCBhZEVycm9yIGNvbnRhaW5zIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJBZExvYWRGYWlsZWQ6IFwiICsgYWRFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb25BZEltcHJlc3Npb246ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIHNob3duLlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9uQWRTaG93RmFpbGVkOiAoYWRFcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgc2hvdyBmYWlsZWQsIGFkRXJyb3IgY29udGFpbnMgZXJyb3IgaW5mb3JtYXRpb24uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IFRoaXMgY2FsbGJhY2sgd2lsbCBvbmx5IHRyaWdnZXJlZCBvbiBBbmRyb2lkLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJBZFNob3dGYWlsZWRcIiArIGFkRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9uQWRDbG9zZWQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGNsb3NlZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogVGhpcyBjYWxsYmFjayB3aWxsIG9ubHkgdHJpZ2dlcmVkIG9uIEFuZHJvaWQuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb25CYW5uZXJSZWZyZXNoZWQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIHJlZnJlc2hlZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogVGhpcyBjYWxsYmFjayB3aWxsIG9ubHkgdHJpZ2dlcmVkIG9uIEFuZHJvaWQuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0Z1bGwuc2V0QWRMaXN0ZW5lcih7XHJcbiAgICAgICAgICAgICAgICBvbkFkQWxsTG9hZGVkOiAoYWRTb3VyY2VOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWRlZCwgYWRTb3VyY2VOYW1lIGlzIHRoZSBuYW1lIG9mIEFkIHNvdXJjZSBwbGF0Zm9ybS5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25BZExvYWRlZDogKGFkU291cmNlTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkZWQsIGFkU291cmNlTmFtZSBpcyB0aGUgbmFtZSBvZiBBZCBzb3VyY2UgcGxhdGZvcm0uXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uQWRDbGlja2VkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGNsaWNrZWQuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uQWRGYWlsZWQ6IChhZEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWQgZmFpbGVkLCBhZEVycm9yIGNvbnRhaW5zIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkSW1wcmVzc2lvbjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBzaG93bi5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25BZFNob3dGYWlsZWQ6IChhZEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIHNob3cgZmFpbGVkLCBhZEVycm9yIGNvbnRhaW5zIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IFRoaXMgY2FsbGJhY2sgd2lsbCBvbmx5IHRyaWdnZXJlZCBvbiBBbmRyb2lkLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkQ2xvc2VkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGNsb3NlZC5cclxuICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGNhbGxiYWNrIHdpbGwgb25seSB0cmlnZ2VyZWQgb24gQW5kcm9pZC5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRJbnRlcnN0aXRpYWwoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25BZFBsYXlGYWlsZWQ6IChhZEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWQgZmFpbGVkLCBhZEVycm9yIGNvbnRhaW5zIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbk9uZUxheWVyTG9hZEZhaWxlZDogKGFkU291cmNlTmFtZSwgYWRFcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkIGZhaWxlZCwgYWRFcnJvciBjb250YWlucyBlcnJvciBpbmZvcm1hdGlvbi5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25PbmVMYXllckxvYWRlZDogKGFkU291cmNlTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkZWQsIGFkU291cmNlTmFtZSBpcyB0aGUgbmFtZSBvZiBBZCBzb3VyY2UgcGxhdGZvcm0uXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudmlkZW8uc2V0QWRMaXN0ZW5lcih7XHJcbiAgICAgICAgICAgICAgICBvbkFkQWxsTG9hZGVkOiAoYWRTb3VyY2VOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWRlZCwgYWRTb3VyY2VOYW1lIGlzIHRoZSBuYW1lIG9mIEFkIHNvdXJjZSBwbGF0Zm9ybS5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25BZExvYWRlZDogKGFkU291cmNlTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkZWQsIGFkU291cmNlTmFtZSBpcyB0aGUgbmFtZSBvZiBBZCBzb3VyY2UgcGxhdGZvcm0uXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uQWRDbGlja2VkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGNsaWNrZWQuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uQWRGYWlsZWQ6IChhZEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWQgZmFpbGVkLCBhZEVycm9yIGNvbnRhaW5zIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIm9uQWRGYWlsZWQ6IFwiICsgYWRFcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uQWRJbXByZXNzaW9uOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIHNob3duLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkQ2xvc2VkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGNsb3NlZC5cclxuICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGNhbGxiYWNrIHdpbGwgb25seSB0cmlnZ2VyZWQgb24gQW5kcm9pZC5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZGVvLmxvYWRBZCgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkUGxheUZhaWxlZDogKGFkRXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgc2hvd24sIGFkU291cmNlTmFtZSBpcyB0aGUgbmFtZSBvZiBBZCBzb3VyY2UgcGxhdGZvcm1cclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJvbkFkUGxheUZhaWxlZDogXCIgKyBhZEVycm9yKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25PbmVMYXllckxvYWRGYWlsZWQ6IChhZFNvdXJjZU5hbWUsIGFkRXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgbG9hZCBmYWlsZWQsIGFkRXJyb3IgY29udGFpbnMgZXJyb3IgaW5mb3JtYXRpb24uXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwib25PbmVMYXllckxvYWRGYWlsZWQ6IFwiICsgYWRFcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uT25lTGF5ZXJMb2FkZWQ6IChhZFNvdXJjZU5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgbG9hZGVkLCBhZFNvdXJjZU5hbWUgaXMgdGhlIG5hbWUgb2YgQWQgc291cmNlIHBsYXRmb3JtLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkTm90UmV3YXJkOiAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkUmV3YXJkOiAoY3VycmVuY3lOYW1lLCBhbW91bnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFkczogPT09PTE3Mz09PT1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmV3YXJkVmlkZW9DYWxsYmFjayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRzOiA9PT09MTc1PT09PVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRWaWRlb0NhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFZpZGVvKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEludGVyc3RpdGlhbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbG9hZEludGVyc3RpdGlhbCgpIHtcclxuICAgICAgICB0aGlzLnNob3dGdWxsLmxvYWRBZCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBsb2FkVmlkZW8oKSB7XHJcbiAgICAgICAgdGhpcy52aWRlby5sb2FkQWQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2hvd1Jld2FyZGVkVmlkZW8oY2FsbGJhY2spIHtcclxuICAgICAgICBjYy5sb2codGhpcy5pc1Rlc3QpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzVGVzdCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQSE9ORSB8fCBjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5BTkRST0lEIHx8IGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQQUQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpZGVvICE9IG51bGwgJiYgdGhpcy52aWRlby5yZWFkeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkVmlkZW9DYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlkZW8uc2hvd0FkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNob3dCYW5uZXIoKSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQSE9ORSB8fCBjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5BTkRST0lEIHx8IGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQQUQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYmFubmVyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFubmVyLmxvYWRBZCgnYm90dG9tJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNob3dJbnRlcnN0aXRpYWwoKSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQSE9ORSB8fCBjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5BTkRST0lEIHx8IGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQQUQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd0Z1bGwgIT0gbnVsbCAmJiB0aGlzLnNob3dGdWxsLnJlYWR5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dGdWxsLnNob3dBZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpc0hhc1ZpZGVvKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzVGVzdClcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuSVBIT05FIHx8IGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLkFORFJPSUQgfHwgY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuSVBBRClcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmlkZW8ucmVhZHk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBpc0hhc0ludGVyc3RpdGlhbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1Rlc3QpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQSE9ORSB8fCBjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5BTkRST0lEIHx8IGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQQUQpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNob3dGdWxsLnJlYWR5O1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=