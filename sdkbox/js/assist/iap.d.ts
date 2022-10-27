declare module sdkbox {     module IAPListener {        /**        * Called when IAP initialized        */        export function onInitialized(success : boolean) : void;
        /**        * Called when an IAP processed successfully        */        export function onSuccess(p : object) : void;
        /**        * Called when an IAP fails        */        export function onFailure(p : object , msg : string) : void;
        /**        * Called when user canceled the IAP        */        export function onCanceled(p : object) : void;
        /**        * Called when server returns the IAP items user already purchased        * @note this callback will be called multiple times if there are multiple IAP        */        export function onRestored(p : object) : void;
        /**        * Called the product request is successful, usually developers use product request to update the latest info(title, price) from IAP        */        export function onProductRequestSuccess(products : object) : void;
        /**        * Called when the product request fails        */        export function onProductRequestFailure(msg : string) : void;
        /**        * Called when the restore completed        */        export function onRestoreComplete(ok : boolean , msg : string) : void;
        export function onShouldAddStorePayment(productName : string) : boolean;
        export function onFetchStorePromotionOrder(productNames : object , error : string) : void;
        export function onFetchStorePromotionVisibility(productName : string , visibility : boolean , error : string) : void;
        export function onUpdateStorePromotionOrder(error : string) : void;
        export function onUpdateStorePromotionVisibility(error : string) : void;
        export function onPurchaseHistory(purchases : string) : void;
        /**        * Called when consume completed, just trigger on android        */        export function onConsumed(p : object , error : string) : void;
        /**        * Called when IAP pay deferred        *        * Note: Pay deferred status is a middle status, for most developer, needn't case this status        * this status will change to success or failed or cancel, its final status is pending external action.        *        * Please DO NOT finishTransaction when status is deferred.        *        */        export function onDeferred(p : object) : void;
    }     module Product {        export function Product() : object;
    }     module IAP {        /**        * Set GDPR        *        * **NOTE**: please call before 'init' function        */        export function setGDPR(enabled : boolean) : void;
        /**        * Initialize SDKBox IAP        */        export function init(jsonconfig : object) : void;
        /**        * Enable/disable debug logging        */        export function setDebug(debug : boolean) : void;
        /**        * Get all the products        */        export function getProducts() : object;
        /**        * Make a purchase request        *        * @Param name is the name of the item specified in sdkbox_config.json        */        export function purchase(name : string) : void;
        /**        * Refresh the IAP data(title, price, description)        */        export function refresh() : void;
        /**        * Restore purchase        */        export function restore() : void;
        /**        * Set listener for IAP        */        export function setListener(listener : object) : void;
        /**        * Remove listener for IAP        */        export function removeListener() : void;
        export function enableUserSideVerification(b : boolean) : void;
        /**        * get auto invoke finishTransaction flag        */        export function isAutoFinishTransaction() : boolean;
        /**        * set auto invoke finishTransaction flag        */        export function setAutoFinishTransaction(b : boolean) : void;
        /**        * to invoke ios finishTransaction api        */        export function finishTransaction(productid : string) : void;
        export function fetchStorePromotionOrder() : void;
        export function updateStorePromotionOrder(productNames : object) : void;
        export function fetchStorePromotionVisibility(productName : string) : void;
        export function updateStorePromotionVisibility(productName : string , visibility : boolean) : void;
        export function getPurchaseHistory() : void;
        /**        * get initialized error message        */        export function getInitializedErrMsg() : string;
        export function requestUpdateTransaction() : void;
    }}