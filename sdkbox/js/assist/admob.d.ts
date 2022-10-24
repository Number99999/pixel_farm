declare module sdkbox {     module PluginAdMob {        /**        *  initialize the plugin instance.        */        export function init() : boolean;
        /**        * Set listener to listen for admob events        */        export function setListener(listener : object) : void;
        /**        * Get the listener        */        export function getListener() : object;
        /**        * Remove the listener, and can't listen to events anymore        */        export function removeListener() : void;
        /**        * Use this to get the version of the SDK.        * @return The version of the SDK.        */        export function getVersion() : string;
        /**        * Set test devices        */        export function setTestDevices(devices : string) : void;
        /**        * Cache ad with @name        */        export function cache(name : string) : void;
        /**        * show ad with @name        */        export function show(name : string) : void;
        /**        * hide ad with @name        *        * interstitial does not support hide        */        export function hide(name : string) : void;
        /**        * check whether ad available with @name        */        export function isAvailable(name : string) : boolean;
        /**        * get width of current banner        *        * @return: -1 means current banner is not available        */        export function getCurrBannerWidth(name : string) : number;
        /**        * get height of current banner        *        * @return: -1 means current banner is not available        */        export function getCurrBannerHeight(name : string) : number;
        /**        * get width of current banner in pixel        *        * @return -1 means current banner is not available        */        export function getCurrBannerWidthInPixel(name : string) : number;
        /**        * get height of current banner in pixel        *        * @return: -1 means current banner is not available        */        export function getCurrBannerHeightInPixel(name : string) : number;
        /**        * set GDPR. true: non-personalized ads, false: personalized ads.        */        export function setGDPR(enabled : boolean) : void;
        /**        * set auto cache ad after @seconds when cache ad failed.        * @seconds <= 0 means do not cache by PluginAdMob when cache ad failed.        */        export function setAutoCacheDelay(seconds : number) : void;
        /**        * set auto cache or not        *        * 1. do not load ads when init        * 2. do not load ads when close ads        * 3. do not load ads when load ads failed        */        export function setAutoCache(yes : boolean) : void;
        /**        * Sets the current app mute state.        * @param muted [true if the app is muted, false otherwise]        */        export function setAppMuted(muted : boolean) : void;
        /**        * Sets the current app volume.        * @param volume [the volume as a float from 0 (muted) to 1 (full media volume)]        */        export function setAppVolume(volume : number) : void;
    }     module AdMobListener {        export function adViewDidReceiveAd(name : string) : void;
        export function adViewDidFailToReceiveAdWithError(name : string , msg : string) : void;
        export function adViewWillPresentScreen(name : string) : void;
        export function adViewDidPresentScreen(name : string) : void;
        export function adViewDidDismissScreen(name : string) : void;
        export function adViewWillDismissScreen(name : string) : void;
        export function adViewWillLeaveApplication(name : string) : void;
        export function reward(name : string , currency : string , amount : number) : void;
        export function adViewDidFailToPresentWithError(name : string , msg : string) : void;
    }}