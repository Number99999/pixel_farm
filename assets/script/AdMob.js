cc.Class({
    extends: cc.Component,
    onLoad: function () {
        //Add this line to onLoad
        this.admobInit();
    },

    admobInit: function () {
        if (cc.sys.isMobile) {
            var self = this
            sdkbox.PluginAdMob.setListener({
                adViewDidReceiveAd: function (name) {
                    self.showInfo('adViewDidReceiveAd name=' + name);
                },
                adViewDidFailToReceiveAdWithError: function (name, msg) {
                    self.showInfo('adViewDidFailToReceiveAdWithError name=' + name + ' msg=' + msg);
                },
                adViewWillPresentScreen: function (name) {
                    self.showInfo('adViewWillPresentScreen name=' + name);
                },
                adViewDidDismissScreen: function (name) {
                    self.showInfo('adViewDidDismissScreen name=' + name);
                },
                adViewWillDismissScreen: function (name) {
                    self.showInfo('adViewWillDismissScreen=' + name);
                },
                adViewWillLeaveApplication: function (name) {
                    self.showInfo('adViewWillLeaveApplication=' + name);
                },
                // reward: function(name, currency, amount) {
                //     self.log('reward:'+name+':'+currency+':'+amount);
                // }
            });
            sdkbox.PluginAdMob.init();
        }
    },

    showInfo: function(string){
        cc.log(string);
    },
    cacheInterstitial: function () {
        if (cc.sys.isMobile) {
            sdkbox.PluginAdMob.cache('interstitial');

        }
    },

    showInterstitial: function () {
        if (cc.sys.isMobile) {
            sdkbox.PluginAdMob.show('interstitial');

        }
    },

    showVideo: function () {
        if (cc.sys.isMobile) {
            sdkbox.PluginAdMob.show('reward');
        }

    }

});