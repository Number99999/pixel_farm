
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/migration/use_reversed_rotateBy');
require('./assets/migration/use_v2.1-2.2.1_cc.Toggle_event');
require('./assets/script/AdsManager');
require('./assets/script/ai/pet_ai');
require('./assets/script/ai/player_role');
require('./assets/script/ai/staff_ai');
require('./assets/script/config/config');
require('./assets/script/config/push');
require('./assets/script/config/videotape');
require('./assets/script/control/ad_control');
require('./assets/script/control/sound_control');
require('./assets/script/effect/ad_car');
require('./assets/script/effect/light');
require('./assets/script/fx');
require('./assets/script/game_rules');
require('./assets/script/game_scene');
require('./assets/script/loading_scene');
require('./assets/script/ui/button_more');
require('./assets/script/ui/gift_ui');
require('./assets/script/ui/hotel_ui');
require('./assets/script/ui/iap_content_ui');
require('./assets/script/ui/land');
require('./assets/script/ui/novice_ui');
require('./assets/script/ui/offline_profit');
require('./assets/script/ui/option_ui');
require('./assets/script/ui/pet_content');
require('./assets/script/ui/pet_ui');
require('./assets/script/ui/plant_ui');
require('./assets/script/ui/rest_ui');
require('./assets/script/ui/sell_ui');
require('./assets/script/ui/shop_buy_ui');
require('./assets/script/ui/shop_content');
require('./assets/script/ui/shop_ui');
require('./assets/script/ui/skill_content');
require('./assets/script/ui/staff_content');
require('./assets/script/ui/staff_ui');
require('./assets/script/ui/study_ui');
require('./assets/script/ui/tips_ui');
require('./assets/script/ui/videotape_ui');
require('./assets/script/user_data');

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