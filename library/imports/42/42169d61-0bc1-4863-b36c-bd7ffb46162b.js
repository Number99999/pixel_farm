"use strict";
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