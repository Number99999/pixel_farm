declare namespace tradplus {
    /**
     * @en
     * Error information
     * @zh
     * 错误信息
     */
    interface AdError {
        /**
         * @en
         * Error code
         * @zh
         * 错误代码
         */
        errCode: string;
        /**
         * @en
         * Error message
         * @zh
         * 错误消息
         */
        errMsg: string;
    }
    /**
     * @en
     * Custom traffic group data
     * @zh
     * 自定义流量分组数据
     * @see initCustomMap
     * @see initPlacementCustomMap
     */
    type CustomMap = Record<string, string>;
    /**
     * @en
     * The event listener of a Banner
     * @zh
     * 横幅广告事件监听器
     * @en
     * NOTE: The return value of callbacks will be ignored, we declare the return value type to be 'any' is for user to use Promise/async easier
     * @zh
     * 注：各回调的返回值会被无视，返回值类型设为any主要是方便使用async函数作为回调
     */
    interface BannerListener {
        /**
         * @en
         * Triggered on Ad loaded, adSourceName is the name of Ad source platform
         * @zh
         * 在广告加载完成的时候触发，adSourceName是广告源平台的名称
         */
        onAdLoaded?: (adSourceName: string) => any;
        /**
         * @en
         * Triggered on Ad load failed, adError contains error information
         * @zh
         * 在广告加载失败的时候触发，adError包含错误信息
         */
        onAdLoadFailed?: (adError: AdError) => any;
        /**
         * @en
         * Triggered on Ad clicked
         * @zh
         * 在广告被点击的时候触发
         */
        onAdClicked?: () => any;
        /**
         * @en
         * Triggered on Ad shown
         * @zh
         * 在广告被展示的时候触发
         */
        onAdImpression?: () => any;
        /**
         * @en
         * Triggered on Ad show failed, adError contains error information, NOTE: This callback will only triggered on Android
         * @zh
         * 在广告显示失败的时候触发，adError包含错误信息，注：该回调只在Android平台下会被触发
         */
        onAdShowFailed?: (adError: AdError) => any;
        /**
         * @en
         * Triggered on Ad closed, NOTE: This callback will only triggered on Android
         * @zh
         * 在广告关闭后触发，注：该回调只在Android平台下会被触发
         */
        onAdClosed?: () => any;
        /**
         * @en
         * Triggered on Ad refreshed, NOTE: This callback will only triggered on Android
         * @zh
         * 在广告自动刷新时触发，注：该回调只在Android平台下会被触发
         */
        onBannerRefreshed?: () => any;
    }
    /**
     * @en
     * The event listener of a Rewarded Video
     * @zh
     * 激励视频事件监听器
     * @en
     * NOTE: The return value of callbacks will be ignored, we declare the return value type to be 'any' is for user to use Promise/async easier
     * @zh
     * 注：各回调的返回值会被无视，返回值类型设为any主要是方便使用async函数作为回调
     */
    interface RewardedVideoListener {
        /**
         * @en
         * Triggered when Ad all loaded, anyAdsLoadSucceeded indicate whether there are any Ads load succeeded
         * @zh
         * 在全部广告加载完成的时候触发，anyAdsLoadSucceeded指示是否至少有一个广告加载成功
         */
        onAdAllLoaded?: (anyAdsLoadSucceeded: boolean) => any;
        /**
         * @en
         * Triggered on Ad loaded
         * @zh
         * 在广告加载完成的时候触发
         */
        onAdLoaded?: () => any;
        /**
         * @en
         * Triggered on Ad clicked
         * @zh
         * 在广告被点击的时候触发
         */
        onAdClicked?: () => any;
        /**
         * @en
         * Triggered on Ad shown, adSourceName is the name of Ad source platform
         * @zh
         * 在广告被展示的时候触发，adSourceName是广告源平台的名称
         */
        onAdImpression?: (adSourceName: string) => any;
        /**
         * @en
         * Triggered on Ad failed, adError contains error information
         * @zh
         * 在广告失败的时候触发，adError包含错误信息
         */
        onAdFailed?: (adError: AdError) => any;
        /**
         * @en
         * Triggered on Ad play failed, NOTE: This callback will only triggered on iOS
         * @zh
         * 在广告被点击的时候触发，注：该回调只在iOS平台下会被触发
         */
        onAdPlayFailed?: (adError: AdError) => any;
        /**
         * @en
         * Triggered on Ad closed
         * @zh
         * 在广告关闭后的时候触发
         */
        onAdClosed?: () => any;
        /**
         * @en
         * Triggered when user should be rewarded
         * @zh
         * 在用户应该被奖励的时候触发
         */
        onAdReward?: (currencyName: string, amount: number) => any;
        /**
         * @en
         * Triggered when user should not be rewarded， NOTE: This callback will only triggered on iOS
         * @zh
         * 在用户不该被奖励的时候触发，注：该回调只在iOS平台下会被触发
         */
        onAdNotReward?: () => any;
        /**
         * @en
         * Triggered when one Ad layer load failed， NOTE: This callback will only triggered on Android
         * @zh
         * 在一个广告层加载失败的时候触发，注：该回调只在Android平台下会被触发
         */
        onOneLayerLoadFailed?: (adSourceName: string, adError: AdError) => any;
        /**
         * @en
         * Triggered when one Ad layer load succeeded， NOTE: This callback will only triggered on Android
         * @zh
         * 在一个广告层加载成功的时候触发，注：该回调只在Android平台下会被触发
         */
        onOneLayerLoaded?: (adSourceName: string) => any;
    }
    /**
     * @en
     * The event listener of a Interstitial Ad
     * @zh
     * 插屏广告事件监听器
     * @en
     * NOTE: The return value of callbacks will be ignored, we declare the return value type to be 'any' is for user to use Promise/async easier
     * @zh
     * 注：各回调的返回值会被无视，返回值类型设为any主要是方便使用async函数作为回调
     */
    interface InterstitialListener {
        /**
         * @en
         * Triggered when Ad all loaded, anyAdsLoadSucceeded indicate whether there are any Ads load succeeded
         * @zh
         * 在全部广告加载完成的时候触发，anyAdsLoadSucceeded指示是否至少有一个广告加载成功
         */
        onAdAllLoaded?: (anyAdsLoadSucceeded: boolean) => any;
        /**
         * @en
         * Triggered on Ad loaded
         * @zh
         * 在广告加载完成的时候触发
         */
        onAdLoaded?: () => any;
        /**
         * @en
         * Triggered on Ad clicked
         * @zh
         * 在广告被点击的时候触发
         */
        onAdClicked?: () => any;
        /**
         * @en
         * Triggered on Ad shown, adSourceName is the name of Ad source platform
         * @zh
         * 在广告被展示的时候触发，adSourceName是广告源平台的名称
         */
        onAdImpression?: (adSourceName: string) => any;
        /**
         * @en
         * Triggered on Ad failed, adError contains error information
         * @zh
         * 在广告失败的时候触发，adError包含错误信息
         */
        onAdFailed?: (adError: AdError) => any;
        /**
         * @en
         * Triggered on Ad play failed, NOTE: This callback will only triggered on iOS
         * @zh
         * 在广告被点击的时候触发，注：该回调只在iOS平台下会被触发
         */
        onAdPlayFailed?: (adError: AdError) => any;
        /**
         * @en
         * Triggered on Ad closed
         * @zh
         * 在广告关闭后的时候触发
         */
        onAdClosed?: () => any;
        /**
         * @en
         * Triggered when one Ad layer load failed， NOTE: This callback will only triggered on Android
         * @zh
         * 在一个广告层加载失败的时候触发，注：该回调只在Android平台下会被触发
         */
        onOneLayerLoadFailed?: (adSourceName: string, adError: AdError) => any;
        /**
         * @en
         * Triggered when one Ad layer load succeeded， NOTE: This callback will only triggered on Android
         * @zh
         * 在一个广告层加载成功的时候触发，注：该回调只在Android平台下会被触发
         */
        onOneLayerLoaded?: (adSourceName: string) => any;
    }
    /**
     * @en
     * Specify the position of a Banner
     * @zh
     * 指定横幅广告的位置
     */
    type BannerPosition = 'top' | 'bottom';
    /**
     * @en
     * Banner class, provide the Banner related functionality, NOTE: you can get the adUnitId of a Banner object by banner.adUnitId
     * @zh
     * 横幅广告类，提供横幅广告相关的功能，注：您可以通过banner.adUnitId获取一个Banner对象的广告位ID
     */
    class Banner {
        readonly adUnitId: string;
        /**
         * @en
         * Set the Banner listener of this Banner object
         * @zh
         * 设置本横幅广告对象的事件监听器
         */
        setAdListener(listener: BannerListener): void;
        /**
         * @en
         * Load current Banner Ad
         * @zh
         * 加载本横幅广告
         * @param postion @en The position of Banner, the default is 'top' @zh 广告显示的位置，默认在上方
         */
        loadAd(position?: BannerPosition): void;
        /**
         * @en
         * Set the visibility of Banner
         * @zh
         * 设置本横幅广告的可见性
         */
        setVisibility(visible: boolean): void;
        /**
         * @en
         * Destroy Banner object, after destroyed, you cannot use this object again, you need to create a new object
         * @zh
         * 销毁横幅广告对象，销毁后不能再使用本对象，需要重新创建新的对象
         */
        destroyAd(): void;
        /**
         * @en
         * Destroy All Banner object
         * @zh
         * 销毁所有横幅广告对象
         */
        static destroyAllAds(): void;
    }
    /**
     * @en
     * Rewarded Video class, provide the Rewarded Video related functionality, NOTE: you can get the adUnitId of a Rewarded Video object by rewardedVideo.adUnitId
     * @zh
     * 激励视频类，提供激励视频相关的功能，注：您可以通过rewardedVideo.adUnitId获取一个激励视频对象的广告位ID
     */
    class RewardedVideo {
        readonly adUnitId: string;
        /**
         * @en
         * Set the Rewarded Video listener of this Rewarded Video object
         * @zh
         * 设置本激励视频对象的事件监听器
         */
        setAdListener(listener: RewardedVideoListener): void;
        /**
         * @en
         * Specify the scenario of current Rewarded Video
         * @zh
         * 指定当前激励视频的场景
         */
        entryAdScenario(sceneId: string): void;
        /**
         * @en
         * Indicate whether current Rewarded Video is ready
         * @zh
         * 指示当前激励视频是否准备好了
         */
        get ready(): boolean;
        /**
         * @en
         * Load Reward Video, NOTE: this is only needed when you don't enable the autoReload mode
         * @zh
         * 加载激励视频，注：这只有在您没有开启自动加载模式（autoReload）的时候才需要调用
         */
        loadAd(): void;
        /**
         * @en
         * Show Rewarded Video, NOTE: sceneId can be empty string ''
         * @zh
         * 展示激励视频，注：sceneId可以为空字符串''
         */
        showAd(sceneId: string): void;
        /**
         * @en
         * Destroy Rewarded Video object, after destroyed, you cannot use this object again, you need to create a new object
         * @zh
         * 销毁激励视频对象，销毁后不能再使用本对象，需要重新创建新的对象
         * @en
         * NOTE:This method is only used to prevent memory leak, you cannot use it
         * to stop displaying Ad, if the number of Rewarded Video objects is small,
         * you can choose not to destroy explicitly
         * @zh
         * 注：该方法用于防止内存泄漏，并不能用于停止广告的显示，如果创建广告对象数量不多，可以选择不显式销毁
         */
        destroyAd(): void;
        /**
         * @en
         * Destroy All Rewarded Video objects
         * @zh
         * 销毁所有激励视频对象
         */
        static destroyAllAds(): void;
    }
    /**
     * @en
     * Interstitial Ad class, provide the Interstitial Ad related functionality, NOTE: you can get the adUnitId of a Interstitial Ad object by interstitial.adUnitId
     * @zh
     * 插屏广告类，提供插屏广告相关的功能，注：您可以通过interstitial.adUnitId获取一个插屏广告对象的广告位ID
     */
    class Interstitial {
        readonly adUnitId: string;
        /**
         * @en
         * Set the Interstitial Ad listener of this Interstitial Ad object
         * @zh
         * 设置本插屏广告对象的事件监听器
         */
        setAdListener(listener: InterstitialListener): void;
        /**
         * @en
         * Specify the scenario of current Interstitial Ad
         * @zh
         * 指定当前插屏广告的场景
         */
        entryAdScenario(sceneId: string): void;
        /**
         * @en
         * Indicate whether current Interstitial Ad is ready
         * @zh
         * 指示当前插屏广告是否准备好了
         */
        get ready(): boolean;
        /**
         * @en
         * Load Interstitial Ad, NOTE: this is only needed when you don't enable the autoReload mode
         * @zh
         * 加载插屏广告，注：这只有在您没有开启自动加载模式（autoReload）的时候才需要调用
         */
        loadAd(): void;
        /**
         * @en
         * Show Interstitial Ad, NOTE: sceneId can be empty string ''
         * @zh
         * 展示插屏广告，注：sceneId可以为空字符串''
         */
        showAd(sceneId: string): void;
        /**
         * @en
         * Destroy Interstitial Ad object, after destroyed, you cannot use this object again, you need to create a new object
         * @zh
         * 销毁插屏广告对象，销毁后不能再使用本对象，需要重新创建新的对象
         * @en
         * NOTE:This method is only used to prevent memory leak, you cannot use it
         * to stop displaying Ad, if the number of Interstitial Ad objects is small,
         * you can choose not to destroy explicitly
         * @zh
         * 注：该方法用于防止内存泄漏，并不能用于停止广告的显示，如果创建广告对象数量不多，可以选择不显式销毁
         */
        destroyAd(): void;
        /**
         * @en
         * Destroy All Interstitial Ad objects
         * @zh
         * 销毁所有插屏广告对象
         */
        static destroyAllAds(): void;
    }
    namespace privacy {
        /**
         * @en
         * GDPR level
         * @zh
         * GDPR等级
         */
        enum GDPRLevel {
            Personalized = 0,
            NotPersonalized = 1,
            Unknown = 2
        }
        /**
         * @en
         * GDPR监听器
         * @zh
         * GDPR监听器
         */
        interface GDPRListener {
            /**
             * @en
             * Triggered when get the information about whether GDPR is applicable succeed
             * @zh
             * 在获取GDPR是否适用的信息成功后触发
             */
            onSuccess: () => any;
            /**
             * @en
             * Triggered when get the information about whether GDPR is applicable failed
             * @zh
             * 在获取GDPR是否适用的信息失败后触发
             */
            onFailed: () => any;
        }
        /**
         * @en
         * Set GDPR listener, NOTE: this method need be called before initSdk
         * @zh
         * 设置GDPR监听器，注：该方法需要在initSdk之前调用
         */
        function setGDPRListener(listener: GDPRListener): void;
        /**
         * @en
         * Get whether GDPR is applicable to current user, NOTE: you should call this method in onSuccess event of GDPR listener
         * @zh
         * 获取GDPR对当前用户是否适用，注：您应该在GDPR监听器的onSuccess事件回调中调用该方法
         */
        function isGDPRApplicable(): boolean;
        /**
         * @en
         * Set whether is the first time to show GDPR dialog
         * @zh
         * 设置是否第一次显示GDPR对话框
         */
        function setIsFirstShowGDPR(isFirstShowGDPR: boolean): void;
        /**
         * @en
         * Return whether is the first time to show GDPR dialog
         * @zh
         * 返回是否第一次显示GDPR对话框
         */
        function isFirstShowGDPR(): boolean;
        /**
         * @en
         * Show GDPR authorization dialog, let user set GDPR level manually
         * @zh
         * 显示GDPR授权对话框，让用户自己设置GDPR等级
         */
        function showUploadDataNotifyDialog(): void;
        /**
         * @en
         * Get GDPR level, GDPRLevel.Personalized indicate the agreement of user
         * @zh
         * 获取GDPR等级，GDPRLevel.Personalized表示同意
         */
        function getGDPRDataCollection(): GDPRLevel;
        /**
         * @en
         * Set GDPR level, GDPRLevel.Personalized indicate the agreement of user, NOTE: you only need to call this method when you show a custom GDPR dialog by yourself
         * @zh
         * 设置GDPR等级，GDPRLevel.Personalized表示同意，注：这个方法只有在您自己展示自定义GDPR对话框的时候才需要调用
         */
        function setGDPRDataCollection(level: GDPRLevel): void;
        /**
         * @en
         * Set GDPR child, true indicate the user is a child, NOTE: currently, this API only takes effect on Android
         * @zh
         * 设置GDPR儿童，true表示用户是儿童，注：当前，该API仅在Android平台有效
         */
        function setGDPRChild(isChild: boolean): void;
        /**
         * @en
         * Set CCPA, false indicate don't upload data of California users, NOTE: this method should be called before initSdk
         * @zh
         * 设置CCPA，false表示加州用户均不上传数据，注：该API必须在initSdk前调用
         */
        function setCCPADoNotSell(doNotSell: boolean): void;
        /**
         * @en
         * Set COPPA, false: not a child, true: is a child
         * @zh
         * 设置COPPA，false：非儿童，true：是儿童
         */
        function setCOPPAIsAgeRestrictedUser(isAgeRestrictedUser: boolean): void;
    }
    /**
     * @en
     * Provide the Ad service of TradPlus, don't instantiate this class directly, use tradplus.tradPlusService instead
     * @zh
     * 提供 TradPlus 广告服务的类，请不要实例化该类，直接使用tradplus.tradPlusService即可
     */
    class TradPlusAd {
        /**
         * @en
         * Initialize the SDK
         * @zh
         * 初始化SDK
         */
        initSdk(): void;
        /**
         * @en
         * Enable/Disable the debug logging, disabled by default, NOTE: when release your App, you should disable the debug logging
         * @zh
         * 启用/禁用调试日志的打印，默认禁用，注：当发布您的应用时，请注意禁用调试日志的打印
         */
        setEnableLog(enable: boolean): void;
        /**
         */
        /**
         * @en
         * Set whether we need test devices, this method only works on Android, NOTE: when release your App, you should disable the test devices
         * @zh
         * 设置是否需要测试设备，该方法仅作用于Android平台，注：当发布您的应用时，请注意禁用测试设备
         */
        setNeedTestDevice(needTestDivice: boolean): void;
        /**
         * @en
         * Set App level traffic group rules, take effect for all placements
         * @zh
         * 设置 App 维度的规则，对全部 placement 有效
         */
        initCustomMap(customMap: CustomMap): void;
        /**
         * @en
         * Set adUnitId level traffic group rules, only take effect for specified adUnitId, will overwrite the App level rules
         * @zh
         * 设置 adUnitId 维度的规则，仅对该广告位有效，会覆盖 APP 维度设置的规则
         */
        initPlacementCustomMap(adUnitId: string, customMap: CustomMap): void;
        /**
         * @en
         * Get a Banner object corresponding to specified adUnitId
         * @zh
         * 获取广告位ID对应的横幅广告对象
         */
        getBanner(adUnitId: string): Banner;
        /**
         * @en
         * Get a Rewarded Video object corresponding to specified adUnitId
         * @zh
         * 获取广告位ID对应的激励视频对象
         * @param adUnitId
         * @param autoReload @en Enable/Disable auto reload mode @zh 启用/禁用自动 reload 模式
         */
        getRewardedVideo(adUnitId: string, autoReload: boolean): RewardedVideo;
        /**
         * @en
         * Get a Interstitial Ad object corresponding to specified adUnitId
         * @zh
         * 获取广告位ID对应的插屏广告对象
         * @param adUnitId
         * @param autoReload @en Enable/Disable auto reload mode @zh 启用/禁用自动 reload 模式
         */
        getInterstitial(adUnitId: string, autoReload: boolean): Interstitial;
    }
    /**
     * @en
     * Provide the Ad service of TradPlus
     * @zh
     * TradPlusAd类的实例，提供 TradPlus 广告服务的类
     */
    const tradPlusService: TradPlusAd;
}
