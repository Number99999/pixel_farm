"use strict";
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