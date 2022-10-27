// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        bannerUnitId: "",
        showFullUnitId: "",
        videoUnitId: "",
        bannerOnStart: false,
        banner: null,
        showFull: null,
        video: null,
        rewardVideoCallback: null,
        isTest: false,
        //bannerLoaded: false,
    },

    onLoad() {
        if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD) {
            // Enable debug log, this is for testing only, please comment it out before publish.
            tradplus.tradPlusService.setEnableLog(true);
            // Initialize the SDK.
            tradplus.tradPlusService.initSdk();
            cc.log("====25====");
            // Enable test mode, this is for testing only, please comment it out before publish.
            tradplus.tradPlusService.setNeedTestDevice(true);
            // Enable debug log, this is for testing only, please comment it out before publish.
            tradplus.tradPlusService.setEnableLog(true);

            if (this.bannerOnStart) {
                this.banner = tradplus.tradPlusService.getBanner(this.bannerUnitId);
            }

            this.showFull = tradplus.tradPlusService.getInterstitial(this.showFullUnitId);
            this.video = tradplus.tradPlusService.getRewardedVideo(this.videoUnitId);

            if (this.bannerOnStart) {
                this.banner.setAdListener({
                    onAdLoaded: (adSourceName) => {
                        // Triggered on Ad loaded, adSourceName is the name of Ad source platform.
                        //this.bannerLoaded = true;
                        cc.log("banner loaded");
                    },

                    onAdClicked: () => {
                        // Triggered on Ad clicked.
                    },

                    onAdLoadFailed: (adError) => {
                        // Triggered on Ad load failed, adError contains error information.
                        cc.log("AdLoadFailed: " + adError);
                    },

                    onAdImpression: () => {
                        // Triggered on Ad shown.
                    },

                    onAdShowFailed: (adError) => {
                        // Triggered on Ad show failed, adError contains error information.
                        // NOTE: This callback will only triggered on Android.
                        cc.log("AdShowFailed" + adError);
                    },

                    onAdClosed: () => {
                        // Triggered on Ad closed.
                        // NOTE: This callback will only triggered on Android.
                    },

                    onBannerRefreshed: () => {
                        // Triggered on Ad refreshed.
                        // NOTE: This callback will only triggered on Android.
                    },
                });
            }
            this.showFull.setAdListener({
                onAdAllLoaded: (adSourceName) => {
                    // Triggered on Ad loaded, adSourceName is the name of Ad source platform.
                },

                onAdLoaded: (adSourceName) => {
                    // Triggered on Ad loaded, adSourceName is the name of Ad source platform.
                },

                onAdClicked: () => {
                    // Triggered on Ad clicked.
                },

                onAdFailed: (adError) => {
                    // Triggered on Ad load failed, adError contains error information.
                },

                onAdImpression: () => {
                    // Triggered on Ad shown.
                },

                onAdShowFailed: (adError) => {
                    // Triggered on Ad show failed, adError contains error information.
                    // NOTE: This callback will only triggered on Android.
                },

                onAdClosed: () => {
                    // Triggered on Ad closed.
                    // NOTE: This callback will only triggered on Android.
                    this.loadInterstitial();
                },

                onAdPlayFailed: (adError) => {
                    // Triggered on Ad load failed, adError contains error information.
                },

                onOneLayerLoadFailed: (adSourceName, adError) => {
                    // Triggered on Ad load failed, adError contains error information.
                },

                onOneLayerLoaded: (adSourceName) => {
                    // Triggered on Ad loaded, adSourceName is the name of Ad source platform.
                },
            });

            this.video.setAdListener({
                onAdAllLoaded: (adSourceName) => {
                    // Triggered on Ad loaded, adSourceName is the name of Ad source platform.
                },

                onAdLoaded: (adSourceName) => {
                    // Triggered on Ad loaded, adSourceName is the name of Ad source platform.
                },

                onAdClicked: () => {
                    // Triggered on Ad clicked.
                },

                onAdFailed: (adError) => {
                    // Triggered on Ad load failed, adError contains error information.
                    cc.log("onAdFailed: " + adError);
                },

                onAdImpression: () => {
                    // Triggered on Ad shown.
                },

                onAdClosed: () => {
                    // Triggered on Ad closed.
                    // NOTE: This callback will only triggered on Android.
                    this.video.loadAd();
                },

                onAdPlayFailed: (adError) => {
                    // Triggered on Ad shown, adSourceName is the name of Ad source platform
                    cc.log("onAdPlayFailed: " + adError);
                },

                onOneLayerLoadFailed: (adSourceName, adError) => {
                    // Triggered on Ad load failed, adError contains error information.
                    cc.log("onOneLayerLoadFailed: " + adError);
                },

                onOneLayerLoaded: (adSourceName) => {
                    // Triggered on Ad loaded, adSourceName is the name of Ad source platform.
                },

                onAdNotReward: () => {

                },

                onAdReward: (currencyName, amount) => {
                    console.log("ads: ====173====");
                    if (this.rewardVideoCallback != null) {
                        console.log("ads: ====175====");
                        this.rewardVideoCallback();
                    }
                },
            });
            this.loadVideo();
            this.loadInterstitial();
        }
    },

    loadInterstitial() {
        this.showFull.loadAd();
    },

    loadVideo() {
        this.video.loadAd();
    },

    showRewardedVideo(callback) {
        cc.log(this.isTest);
        if (this.isTest) {
            callback();
        }
        else {
            if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD) {
                if (this.video != null && this.video.ready) {
                    this.rewardVideoCallback = callback;
                    this.video.showAd();
                }
            }
        }
    },

    showBanner() {
        if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD) {
            if (this.banner != null) {
                this.banner.loadAd('bottom');
            }
        }
    },

    showInterstitial() {
        if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD) {
            if (this.showFull != null && this.showFull.ready) {
                this.showFull.showAd();
            }
        }
    },

    isHasVideo() {
        if (this.isTest)
            return true
        if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD)
            return this.video.ready;
        return false;
    },

    isHasInterstitial() {
        if (this.isTest)
            return true
        if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD)
            return this.showFull.ready;
        return false;
    },
});
