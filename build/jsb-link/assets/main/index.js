window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AdsManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7548f9QM11K+qkbzP1yyO2m", "AdsManager");
    "use strict";
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
        isTest: false
      },
      onLoad: function onLoad() {
        var _this = this;
        if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD) {
          tradplus.tradPlusService.setEnableLog(true);
          tradplus.tradPlusService.initSdk();
          cc.log("====25====");
          tradplus.tradPlusService.setNeedTestDevice(true);
          tradplus.tradPlusService.setEnableLog(true);
          this.bannerOnStart && (this.banner = tradplus.tradPlusService.getBanner(this.bannerUnitId));
          this.showFull = tradplus.tradPlusService.getInterstitial(this.showFullUnitId);
          this.video = tradplus.tradPlusService.getRewardedVideo(this.videoUnitId);
          this.bannerOnStart && this.banner.setAdListener({
            onAdLoaded: function onAdLoaded(adSourceName) {
              cc.log("banner loaded");
            },
            onAdClicked: function onAdClicked() {},
            onAdLoadFailed: function onAdLoadFailed(adError) {
              cc.log("AdLoadFailed: " + adError);
            },
            onAdImpression: function onAdImpression() {},
            onAdShowFailed: function onAdShowFailed(adError) {
              cc.log("AdShowFailed" + adError);
            },
            onAdClosed: function onAdClosed() {},
            onBannerRefreshed: function onBannerRefreshed() {}
          });
          this.showFull.setAdListener({
            onAdAllLoaded: function onAdAllLoaded(adSourceName) {},
            onAdLoaded: function onAdLoaded(adSourceName) {},
            onAdClicked: function onAdClicked() {},
            onAdFailed: function onAdFailed(adError) {},
            onAdImpression: function onAdImpression() {},
            onAdShowFailed: function onAdShowFailed(adError) {},
            onAdClosed: function onAdClosed() {
              _this.loadInterstitial();
            },
            onAdPlayFailed: function onAdPlayFailed(adError) {},
            onOneLayerLoadFailed: function onOneLayerLoadFailed(adSourceName, adError) {},
            onOneLayerLoaded: function onOneLayerLoaded(adSourceName) {}
          });
          this.video.setAdListener({
            onAdAllLoaded: function onAdAllLoaded(adSourceName) {},
            onAdLoaded: function onAdLoaded(adSourceName) {},
            onAdClicked: function onAdClicked() {},
            onAdFailed: function onAdFailed(adError) {
              cc.log("onAdFailed: " + adError);
            },
            onAdImpression: function onAdImpression() {},
            onAdClosed: function onAdClosed() {
              _this.video.loadAd();
            },
            onAdPlayFailed: function onAdPlayFailed(adError) {
              cc.log("onAdPlayFailed: " + adError);
            },
            onOneLayerLoadFailed: function onOneLayerLoadFailed(adSourceName, adError) {
              cc.log("onOneLayerLoadFailed: " + adError);
            },
            onOneLayerLoaded: function onOneLayerLoaded(adSourceName) {},
            onAdNotReward: function onAdNotReward() {},
            onAdReward: function onAdReward(currencyName, amount) {
              console.log("ads: ====173====");
              if (null != _this.rewardVideoCallback) {
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
        if (this.isTest) callback(); else if ((cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD) && null != this.video && this.video.ready) {
          this.rewardVideoCallback = callback;
          this.video.showAd();
        }
      },
      showBanner: function showBanner() {
        cc.sys.platform !== cc.sys.IPHONE && cc.sys.platform !== cc.sys.ANDROID && cc.sys.platform !== cc.sys.IPAD || null != this.banner && this.banner.loadAd("bottom");
      },
      showInterstitial: function showInterstitial() {
        cc.sys.platform !== cc.sys.IPHONE && cc.sys.platform !== cc.sys.ANDROID && cc.sys.platform !== cc.sys.IPAD || null != this.showFull && this.showFull.ready && this.showFull.showAd();
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
  }, {} ],
  ad_car: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4ead8pbcC5NJqqgVJ9tWAwl", "ad_car");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        ad_car_node: cc.Node
      },
      ini_node: function ini_node(price_difference) {
        var _this = this;
        this.price_difference = price_difference;
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.node.x = 500;
        cc.tween(this.node).to(.5, {
          x: 0
        }, {
          easing: "elasticOut"
        }).call(function() {
          _this.ad_car_node.on("touchstart", _this.create_ad, _this);
        }).start();
      },
      create_ad: function create_ad() {
        this.ad_control.show_videoAd("ad_car");
        this.video_succes();
      },
      video_succes: function video_succes() {
        if ("undefined" != typeof wx) {
          var callback = function callback() {
            if (1 == this.ad_control.video_state && "ad_car" == this.ad_control.video_tag) {
              this.ad_control.video_tag = null;
              this.ad_control.video_state = 2;
              var node = this.game_scene_js.create_tips_ui(this.game_rules_js.node);
              if (null != node) {
                node.getComponent("tips_ui").ini_node("gold", this.price_difference);
                this.game_rules_js.add_gold(this.price_difference);
              }
              this.unschedule(callback);
              this.node.destroy();
            } else null == this.ad_control.video_tag && 2 == this.ad_control.video_state && this.unschedule(callback);
          };
          this.schedule(callback, .2);
        }
      },
      onLoad: function onLoad() {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  ad_control: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4cfbbsmFOFMvIhVViASXS9p", "ad_control");
    "use strict";
    var _config = _interopRequireDefault(require("config"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {},
      open_share: function open_share() {
        if ("undefined" !== typeof wx) {
          wx.showShareMenu({
            withShareTicket: true
          });
          wx.onShareAppMessage(function() {
            return {};
          });
        }
      },
      manual_share: function manual_share(tag) {
        if ("undefined" !== typeof tt) {
          this.share_tag = tag;
          this.share_state = "shared";
          this.share_time = new Date().getTime();
          var self = this;
          switch (tag) {
           case "offline_profit":
            tt.shareAppMessage({
              templateId: "u764x7bp9v2d3k16ij",
              title: "Leisure farm, hang up",
              desc: "A relaxing and casual business simulation game\u3002",
              imageUrl: "",
              query: "",
              success: function success() {
                console.log("\u5206\u4eab\u89c6\u9891\u6210\u529f");
                self.share_sucess();
              },
              fail: function fail(e) {
                console.log("\u5206\u4eab\u89c6\u9891\u5931\u8d25");
                self.share_fail();
              }
            });
            break;

           case "pet":
            tt.shareAppMessage({
              templateId: "",
              title: "Do you like me?",
              desc: "I want this little pet, please click for me\uff01",
              imageUrl: "",
              query: "",
              success: function success() {
                console.log("\u5206\u4eab\u89c6\u9891\u6210\u529f");
                self.share_sucess();
              },
              fail: function fail(e) {
                console.log("\u5206\u4eab\u89c6\u9891\u5931\u8d25");
                self.share_fail();
              }
            });
          }
        }
      },
      share_judge: function share_judge() {
        if ("undefined" !== typeof wx) {
          var self = this;
          wx.onShow(function() {
            if ("shared" != self.share_state || null === self.share_tag) return;
            var now_time = new Date().getTime();
            now_time - self.share_time >= 3e3 ? self.share_sucess(self.share_tag) : self.share_fail();
          });
        }
      },
      share_sucess: function share_sucess() {
        this.share_state = "share_succes";
        this.game_scene_js.create_tips_ui(this.game_scene_js.node, "share_succes");
      },
      share_fail: function share_fail() {
        this.ini_share();
        this.game_scene_js.create_tips_ui(this.game_scene_js.node, "share_fail");
      },
      ini_share: function ini_share() {
        this.share_tag = null;
        this.share_time = null;
        this.share_state = "un_share";
      },
      create_videoAd: function create_videoAd() {
        var _this = this;
        if (0 == _config["default"].ad_state) return;
        if ("undefined" !== typeof wx) {
          this.video_ad = wx.createRewardedVideoAd({
            adUnitId: "2oo60sjxld911grh25"
          });
          this.video_ad.onError(function(err) {
            _this.ad_manageer = false;
            console.log(err);
          });
        }
      },
      show_videoAd: function show_videoAd(name) {
        var _this2 = this;
        if (0 == _config["default"].ad_state) return;
        if ("undefined" !== typeof wx) {
          false == this.ad_manageer || this.sound_control.pause_all_sound();
          this.video_tag = name;
          this.video_ad.show()["catch"](function() {
            _this2.video_ad.load().then(function() {
              return _this2.video_ad.show();
            })["catch"](function(err) {
              console.log("\u6fc0\u52b1\u89c6\u9891 \u5e7f\u544a\u663e\u793a\u5931\u8d25");
              _this2.game_scene_js.create_tips_ui(_this2.game_scene_js.node, "video_wait");
            });
          });
        }
      },
      over_videoAd: function over_videoAd() {
        var _this3 = this;
        if (0 == _config["default"].ad_state) return;
        "undefined" !== typeof wx && this.video_ad.onClose(function(res) {
          if (res && res.isEnded || void 0 === res) {
            _this3.video_state = 1;
            _this3.sound_control.resume_all_sound();
          } else {
            _this3.sound_control.resume_all_sound();
            _this3.video_state = 0;
            _this3.game_scene_js.create_tips_ui(_this3.game_scene_js.node, "video_exit");
          }
        });
      },
      banner_ad: function banner_ad() {
        var _this4 = this;
        if ("undefined" !== typeof wx) {
          var info = tt.getSystemInfoSync();
          if ("DOUYIN" === info.appName.toUpperCase() || 0 == _config["default"].ad_state) return;
          var sysInfo = wx.getSystemInfoSync();
          this.bannerAd = wx.createBannerAd({
            adUnitId: "6g3799b8gcb52y1dvi",
            adIntervals: 30,
            style: {
              left: 0,
              top: 0,
              width: 300
            }
          });
          this.bannerAd.onError(function(err) {
            console.log(err);
          });
          this.bannerAd.onResize(function(res) {
            _this4.bannerAd.style.top = sysInfo.windowHeight - res.height - 10;
            _this4.bannerAd.style.left = (sysInfo.windowWidth - res.width) / 2;
          });
        }
      },
      show_bannerAd: function show_bannerAd() {
        cc.log("create_bannerAD");
        if ("undefined" !== typeof wx) {
          var info = tt.getSystemInfoSync();
          if ("DOUYIN" === info.appName.toUpperCase() || 0 == _config["default"].ad_state) return;
          this.bannerAd.show();
        }
      },
      hide_bannerAd: function hide_bannerAd() {
        cc.log("hide_bannerAD");
        if ("undefined" !== typeof wx) {
          var info = tt.getSystemInfoSync();
          if ("DOUYIN" === info.appName.toUpperCase() || 0 == _config["default"].ad_state) return;
          this.bannerAd.hide();
        }
      },
      onLoad: function onLoad() {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.ini_share();
        this.judge = null;
        this.video_tag = null;
        this.video_state = null;
        this.create_videoAd();
        this.over_videoAd();
        this.banner_ad();
        this.open_share();
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    config: "config"
  } ],
  button_more: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0f2a6fEGqpNiZbr09LBCQyz", "button_more");
    "use strict";
    var user_data = require("user_data");
    cc.Class({
      extends: cc.Component,
      properties: {
        frame_arr: {
          default: [],
          type: cc.SpriteFrame
        },
        group_node: cc.Node
      },
      ini_node: function ini_node(type) {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.land_group = cc.find("UI_ROOT/center/land_group");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.ad_control.show_bannerAd();
        this.button_type = type;
        this.set_button_frame();
        this.set_button_position();
      },
      set_button_frame: function set_button_frame() {
        switch (this.button_type) {
         case "watering":
          for (var i = 0; i < this.land_group.children.length; i++) if (1 == user_data.user_data.land[i].have) {
            this.group_node.children[i].active = true;
            this.group_node.children[i].getChildByName("button_icon").getComponent(cc.Sprite).spriteFrame = this.frame_arr[1];
            console.log("hello 32");
          }
          break;

         case "till":
          for (var i = 0; i < this.land_group.children.length; i++) if (1 == user_data.user_data.land[i].have) {
            this.group_node.children[i].active = true;
            this.group_node.children[i].getChildByName("button_icon").getComponent(cc.Sprite).spriteFrame = this.frame_arr[2];
            console.log("hello 41");
          }
          break;

         case "plant":
          for (var i = 0; i < this.land_group.children.length; i++) if (1 == user_data.user_data.land[i].have) {
            this.group_node.children[i].active = true;
            this.group_node.children[i].getChildByName("button_icon").getComponent(cc.Sprite).spriteFrame = this.frame_arr[0];
            console.log("hello 50");
          }
        }
      },
      set_button_position: function set_button_position() {
        for (var i = 0; i < this.land_group.children.length; i++) this.group_node.children[i].setPosition(this.land_group.children[i].position.x, this.land_group.children[i].position.y + 16);
      },
      on_touch_exit_button_click: function on_touch_exit_button_click() {
        this.sound_control.play_sound_effect("button_exit");
        this.ad_control.hide_bannerAd();
        this.game_scene_js.on_node_kill(this.node);
      },
      on_button_click: function on_button_click(e, land_index) {
        this.sound_control.play_sound_effect("button_click");
        this.ad_control.hide_bannerAd();
        switch (this.button_type) {
         case "watering":
          this.land_group.children[land_index].getComponent("land").water_charge();
          break;

         case "till":
          this.land_group.children[land_index].getComponent("land").till();
          user_data.user_data.land[land_index].land_state = "wait_plant";
          break;

         case "plant":
          var node = this.game_scene_js.create_plant_ui(this.game_scene_js.node);
          null != node && node.getComponent("plant_ui").ini_node(land_index);
        }
        this.game_scene_js.on_node_kill(this.node);
      },
      onLoad: function onLoad() {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    user_data: "user_data"
  } ],
  config: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3cc9d7Es5xFNpKW7/q614wf", "config");
    "use strict";
    module.exports = {
      ad_state: 1,
      all_water_num: 50,
      till_time: 5,
      wareHouse: {
        all_capacity: 30
      },
      videotape_share_max: 5,
      staff: {
        0: {
          name: "Alice",
          introduce: "Dream of owning \nyour own farm, \nbelieve it or not",
          work_time: 120,
          rest_time: 220,
          cost: 30
        },
        1: {
          name: "Norman",
          introduce: "It's impossible to \nwork part-time, it's impossible to work \npart-time in this life",
          work_time: 125,
          rest_time: 225,
          cost: 60
        },
        2: {
          name: "Peter",
          introduce: "I'm creater of this\ngame",
          work_time: 130,
          rest_time: 230,
          cost: 600
        },
        3: {
          name: "Samatha",
          introduce: "Supper cute",
          work_time: 135,
          rest_time: 235,
          cost: 2400
        },
        4: {
          name: "Richad",
          introduce: "A simp lord :))",
          work_time: 140,
          rest_time: 240,
          cost: 12e3
        },
        5: {
          name: "Owen",
          introduce: "Why can't i meet my grandma",
          work_time: 145,
          rest_time: 245,
          cost: 24e3
        }
      },
      plant: {
        0: {
          name: "Potato",
          introduce: "Rich in dietary fiber",
          cost: 0,
          grow_time: 20,
          cut_time: 5,
          plant_time: 5,
          sell: 10,
          need_level: 1,
          exp: 1
        },
        1: {
          name: "Cabbage",
          introduce: "Enhance the body's anti-cancer ability",
          cost: 300,
          grow_time: 30,
          cut_time: 7,
          plant_time: 10,
          sell: 15,
          need_level: 5,
          exp: 1
        },
        2: {
          name: "Turnip",
          introduce: "Thousands of years of cultivation history",
          cost: 500,
          grow_time: 40,
          cut_time: 9,
          plant_time: 15,
          sell: 20,
          need_level: 10,
          exp: 2
        },
        3: {
          name: "Tomato",
          introduce: "The fruit is rich in nutrients",
          cost: 1e3,
          grow_time: 50,
          cut_time: 11,
          plant_time: 20,
          sell: 25,
          need_level: 15,
          exp: 2
        },
        4: {
          name: "Cucumber",
          introduce: "Good for health",
          cost: 3e3,
          grow_time: 60,
          cut_time: 13,
          plant_time: 25,
          sell: 30,
          need_level: 20,
          exp: 3
        },
        5: {
          name: "Strawberry",
          introduce: "Rich in nutritional value",
          cost: 5e3,
          grow_time: 70,
          cut_time: 15,
          plant_time: 30,
          sell: 35,
          need_level: 25,
          exp: 3
        },
        6: {
          name: "Broccoli",
          introduce: 'Known as the "vegetable crown"',
          cost: 1e4,
          grow_time: 80,
          cut_time: 17,
          plant_time: 30,
          sell: 45,
          need_level: 35,
          exp: 4
        },
        7: {
          name: "Corn",
          introduce: "The most productive crop in the world",
          cost: 2e4,
          grow_time: 90,
          cut_time: 20,
          plant_time: 30,
          sell: 60,
          need_level: 45,
          exp: 4
        }
      },
      land: {
        0: {
          name: "Land No.1",
          cost: 0,
          need_level: 1
        },
        1: {
          name: "Land No.2",
          cost: 50,
          need_level: 3
        },
        2: {
          name: "Land No.3",
          cost: 500,
          need_level: 15
        },
        3: {
          name: "Land No.4",
          cost: 2500,
          need_level: 25
        },
        4: {
          name: "Land No.5",
          cost: 1e4,
          need_level: 35
        },
        5: {
          name: "Land No.6",
          cost: 3e4,
          need_level: 50
        }
      },
      trader: {
        cooker: {
          recipes: 0,
          need_level: 1
        }
      },
      pet: {
        0: {
          name: "Dog",
          introduce: "A cute dog",
          skill_introduce: "Every 60 seconds, give the player 3 exp",
          need_ad: 5,
          produce_ex: 3,
          produce_ex_time: 60,
          cost: 500,
          type_buy: "gold",
          stay_time: 300,
          get_type: "ad"
        },
        1: {
          name: "Gray cat",
          introduce: "A cute dog",
          skill_introduce: "Every 80 seconds, give the player 5 exp",
          need_ad: 10,
          produce_ex: 5,
          produce_ex_time: 80,
          cost: 700,
          type_buy: "gold",
          stay_time: 300,
          get_type: "ad"
        },
        2: {
          name: "Yellow dog",
          introduce: "Little Eight's brother will stay for 300s",
          skill_introduce: "Every 60 seconds, give the player 3 exp",
          need_ad: 1,
          produce_ex: 5,
          produce_ex_time: 80,
          get_type: "share",
          cost: 500,
          type_buy: "gold",
          stay_time: 300,
          share_max: 3
        },
        3: {
          name: "Yellow cat",
          introduce: "The white rabbit will only stay for 400s",
          skill_introduce: "Every 80 seconds, give the player 5 exp",
          need_ad: 1,
          produce_ex: 5,
          produce_ex_time: 80,
          get_type: "share",
          cost: 700,
          type_buy: "gold",
          stay_time: 400,
          share_max: 3
        }
      },
      hotel: {
        0: {
          need_level: 5,
          produce: 3,
          produce_time: 30,
          cost: 200
        },
        1: {
          need_level: 10,
          produce: 5,
          produce_time: 60,
          cost: 1e3
        },
        2: {
          need_level: 15,
          produce: 10,
          produce_time: 80,
          cost: 5e3
        },
        3: {
          need_level: 25,
          produce: 15,
          produce_time: 120,
          cost: 2e4
        }
      }
    };
    cc._RF.pop();
  }, {} ],
  fx: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "01580vcKa1JvoSvyU9rdlxm", "fx");
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _user_data = _interopRequireDefault(require("user_data"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var _default = {
      mergeJSON: function mergeJSON(n, o) {
        var oType = Object.prototype.toString.call(o);
        var nType = Object.prototype.toString.call(n);
        if ("[object Object]" == nType && "[object Object]" == oType) {
          for (var p in n) if (n.hasOwnProperty(p) && !o.hasOwnProperty(p)) o[p] = n[p]; else if (n.hasOwnProperty(p) && o.hasOwnProperty(p)) {
            var oPType = Object.prototype.toString.call(o[p]);
            var nPType = Object.prototype.toString.call(n[p]);
            ("[object Object]" == nPType && "[object Object]" == oPType || "[object Array]" == nPType && "[object Array]" == oPType) && this.mergeJSON(n[p], o[p]);
          }
        } else if ("[object Array]" == nType && "[object Array]" == oType) for (var i in n) {
          var oIType = Object.prototype.toString.call(o[i]);
          var nIType = Object.prototype.toString.call(n[i]);
          ("[object Object]" == nIType && "[object Object]" == oIType || "[object Array]" == nIType && "[object Array]" == oIType) && this.mergeJSON(n[i], o[i]);
        }
        n = o;
        return n;
      },
      updata_user_data: function updata_user_data(local_user_data) {
        var now_ud = this.mergeJSON(_user_data["default"].user_data, local_user_data);
        Object.assign(_user_data["default"].user_data, now_ud);
        cc.log(_user_data["default"].user_data, "user_data");
      },
      load: function load() {
        try {
          var local_user_data = JSON.parse(cc.sys.localStorage.getItem("user_data"));
          if (null !== local_user_data) {
            this.updata_user_data(local_user_data);
            cc.log("load successfull");
          } else this.save();
        } catch (err) {
          this.save();
          cc.log("error load exception5");
          cc.log(err);
        }
      },
      save: function save() {
        var cache_user_data = _user_data["default"].user_data;
        this.remove_all();
        cc.sys.localStorage.setItem("user_data", JSON.stringify(cache_user_data));
      },
      remove_all: function remove_all() {
        cc.sys.localStorage.removeItem("user_data");
      }
    };
    exports["default"] = _default;
    module.exports = exports["default"];
    cc._RF.pop();
  }, {
    user_data: "user_data"
  } ],
  game_rules: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "08dfeTU1M9Ca7/bd1L8hzMt", "game_rules");
    "use strict";
    var _fx = _interopRequireDefault(require("fx"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var user_data = require("user_data");
    var config = require("config");
    var push = require("push");
    cc.Class({
      extends: cc.Component,
      properties: {
        land_prefab: cc.Prefab,
        land_group_node: cc.Node,
        center_node: cc.Node,
        gold_label: cc.Label,
        ex_label: cc.Label,
        level_label: cc.Label,
        diamond_label: cc.Label,
        gold_progress_node: cc.ProgressBar,
        ex_progress_node: cc.ProgressBar,
        player_prefab: cc.Prefab,
        staff_prefab_arr: [ cc.Prefab ],
        wareHouse_node: cc.Node,
        main_camera: cc.Node,
        tips_group_node: cc.Node,
        button_group_node: cc.Node,
        hotel_produce_node: cc.Node,
        videotape_button: cc.Node,
        videotape_button_arr: [ cc.SpriteFrame ]
      },
      on_watering_button_click: function on_watering_button_click() {
        this.sound_control.play_sound_effect("main_button_click");
        var node = this.game_scene_js.create_button_group(this.center_node);
        node.zIndex = 3;
        null != node && node.getComponent("button_more").ini_node("watering");
      },
      on_till_button_click: function on_till_button_click() {
        this.sound_control.play_sound_effect("main_button_click");
        var node = this.game_scene_js.create_button_group(this.center_node);
        node.zIndex = 3;
        null != node && node.getComponent("button_more").ini_node("till");
      },
      on_study_button_click: function on_study_button_click() {
        this.sound_control.play_sound_effect("main_button_click");
        var node = this.game_scene_js.create_study_ui(this.node);
        null != node && node.getComponent("study_ui").ini_node();
      },
      on_home_button_click: function on_home_button_click() {
        this.sound_control.play_sound_effect("button_click");
        this.game_scene_js.create_option_ui();
      },
      on_pet_button_click: function on_pet_button_click() {
        var node = this.game_scene_js.create_pet_ui(this.node);
        null != node && node.getComponent("pet_ui").ini_node();
      },
      on_hotel_button_click: function on_hotel_button_click() {
        this.sound_control.play_sound_effect("button_click");
        this.game_scene_js.create_hotel_ui();
      },
      on_staff_button_click: function on_staff_button_click() {
        this.sound_control.play_sound_effect("main_button_click");
        var node = this.game_scene_js.create_staff_ui(this.node);
        null != node && node.getComponent("staff_ui").ini_node();
      },
      create_land: function create_land() {
        var arr = Object.keys(user_data.user_data.land);
        for (var i = 0; i < arr.length; i++) {
          var node = cc.instantiate(this.land_prefab);
          node.parent = this.land_group_node;
          node.getComponent("land").ini_node(i);
        }
      },
      create_player: function create_player() {
        var node = cc.instantiate(this.player_prefab);
        node.parent = this.center_node;
      },
      create_staff: function create_staff(staff_index) {
        if (null == staff_index) {
          var arr = Object.keys(user_data.user_data.staff);
          for (var i = 0; i < arr.length; i++) {
            if (1 != user_data.user_data.staff[i].have) return;
            var node = cc.instantiate(this.staff_prefab_arr[i]);
            node.parent = this.land_group_node.children[i];
            node.getComponent("staff_ai").ini_node(i);
          }
        } else {
          var node = cc.instantiate(this.staff_prefab_arr[staff_index]);
          node.parent = this.land_group_node.children[staff_index];
          node.getComponent("staff_ai").ini_node(staff_index);
        }
      },
      add_gold: function add_gold(num) {
        if (0 == this.add_gold_anim) {
          this.add_gold_anim = 1;
          var timeCount = 10;
          var gold = user_data.user_data.gold;
          var gold_max = 500 * user_data.user_data.skill["gold_max"] + 500;
          var callback = function callback() {
            var Pnum = parseInt(num / timeCount);
            timeCount--;
            this.gold_label.string = gold + Pnum + "/" + gold_max;
            if (timeCount <= 0) {
              user_data.user_data.gold += num;
              user_data.user_data.gold < 0 && (user_data.user_data.gold = 0);
              if (user_data.user_data.gold > gold_max) {
                this.sound_control.play_sound_effect("un_click");
                this.game_scene_js.create_tips_ui(this.node, "gold_full");
                user_data.user_data.gold = gold_max;
              }
              this.gold_label.string = user_data.user_data.gold + "/" + gold_max;
              this.unschedule(callback);
              this.set_gold_progress();
              this.add_gold_anim = 0;
            }
          };
          this.schedule(callback, .03);
        } else user_data.user_data.gold += num;
      },
      add_ex: function add_ex(num) {
        if (0 == this.add_ex_anim) {
          this.add_ex_anim = 1;
          var timeCount = 10;
          var ex = user_data.user_data.now_ex;
          var next_ex = 2 * user_data.user_data.level;
          var callback = function callback() {
            var Pnum = parseInt(num / timeCount);
            timeCount--;
            this.ex_label.string = ex + Pnum + "/" + next_ex;
            if (timeCount <= 0) {
              user_data.user_data.now_ex += num;
              if (user_data.user_data.now_ex > next_ex) {
                user_data.user_data.now_ex = 0;
                user_data.user_data.level++;
                user_data.user_data.skill_point++;
                this.game_scene_js.create_tips_ui(this.game_scene_js.node, "gift_ad_level");
              }
              this.unschedule(callback);
              this.set_ex_progress();
              this.add_ex_anim = 0;
            }
          };
          this.schedule(callback, .05);
        } else user_data.user_data.now_ex += num;
      },
      set_gold_progress: function set_gold_progress() {
        var gold = user_data.user_data.gold;
        var gold_max = 500 * user_data.user_data.skill["gold_max"] + 500;
        this.gold_label.string = gold + "/" + gold_max;
        cc.tween(this.gold_progress_node).to(.3, {
          progress: gold / gold_max
        }).start();
      },
      set_ex_progress: function set_ex_progress() {
        var now_ex = user_data.user_data.now_ex;
        var next_ex = 2 * user_data.user_data.level;
        this.level_label.string = user_data.user_data.level;
        this.ex_label.string = now_ex + "/" + next_ex;
        cc.tween(this.ex_progress_node).to(.3, {
          progress: now_ex / next_ex
        }).start();
      },
      on_wareHouse_click: function on_wareHouse_click() {
        this.sound_control.play_sound_effect("button_click");
        var node = this.game_scene_js.create_sell_ui(this.node);
        null != node && node.getComponent("sell_ui").ini_node();
      },
      wareHouse_full: function wareHouse_full() {
        this.wareHouse_shcedule = function() {
          var arr = Object.keys(user_data.user_data.wareHouse);
          var all_capacity = user_data.user_data.wareHouse_level * config.wareHouse["all_capacity"];
          for (var i = 0; i < arr.length; i++) {
            if (user_data.user_data.wareHouse[i].count >= all_capacity) {
              this.wareHouse_node.getChildByName("wareHouse_full").active = true;
              return;
            }
            this.wareHouse_node.getChildByName("wareHouse_full").active = false;
          }
        };
        this.schedule(this.wareHouse_shcedule, .1);
      },
      on_orchard_button_click: function on_orchard_button_click() {
        this.sound_control.play_sound_effect("un_click");
        this.game_scene_js.create_tips_ui(this.node, "un_develop");
      },
      auto_save: function auto_save() {
        var callback = function callback() {
          _fx["default"].save();
        };
        this.schedule(callback, 1, cc.macro.REPEAT_FOREVER);
      },
      updata_land: function updata_land(land_index) {
        this.land_group_node.children[land_index].getComponent("land").ini_node(land_index);
      },
      save_login_time: function save_login_time() {
        0 == user_data.user_data.login_time && (user_data.user_data.login_time = new Date().getTime());
      },
      offline_profit_ui: function offline_profit_ui() {
        var login_time = user_data.user_data.login_time;
        var now_time = new Date().getTime();
        var min = Math.floor((now_time - login_time) / 6e4);
        if (!(min >= 5)) return;
        this.game_scene_js.create_offline_profit_ui(this.node);
      },
      on_shop_button_click: function on_shop_button_click() {
        this.sound_control.play_sound_effect("button_click");
        this.game_scene_js.create_shop_ui();
      },
      create_novice: function create_novice() {
        if (0 == user_data.user_data.novice) {
          this.game_scene_js.create_novice_ui();
          user_data.user_data.novice = 1;
        }
      },
      create_button_tips: function create_button_tips() {
        for (var i = 0; i < this.button_group_node.children.length; i++) this.game_scene_js.create_button_tips(this.tips_group_node, this.button_group_node.children[i].position);
        this.study_ui_tips();
        this.staff_ui_tips();
        this.shop_ui_tips();
      },
      shop_ui_tips: function shop_ui_tips() {
        this.shop_ui_callback = function() {
          var land_arr = Object.keys(user_data.user_data.land);
          var plant_arr = Object.keys(user_data.user_data.plant);
          var gold = user_data.user_data.gold;
          var level = user_data.user_data.level;
          for (var i = 0; i < land_arr.length; i++) {
            if (gold >= config.land[i].cost && level >= config.land[i].need_level && 0 == user_data.user_data.land[i].have) {
              this.tips_group_node.children[0].active = true;
              return;
            }
            this.tips_group_node.children[0].active = false;
          }
          for (var j = 0; j < plant_arr.length; j++) {
            if (gold >= config.plant[j].cost && level >= config.plant[j].need_level && 0 == user_data.user_data.plant[j].have) {
              this.tips_group_node.children[0].active = true;
              return;
            }
            this.tips_group_node.children[0].active = false;
          }
        };
        this.schedule(this.shop_ui_callback, 1);
      },
      study_ui_tips: function study_ui_tips() {
        this.stduy_tips_callback = function() {
          var skill_point = user_data.user_data.skill_point;
          this.tips_group_node.children[1].active = skill_point > 0;
        };
        this.schedule(this.stduy_tips_callback, 1, cc.macro.REPEAT_FOREVER);
      },
      staff_ui_tips: function staff_ui_tips() {
        this.staff_tips_callback = function() {
          var arr = Object.keys(user_data.user_data.staff);
          for (var i = 0; i < arr.length; i++) {
            if (1 == user_data.user_data.land[i].have && user_data.user_data.gold >= config.staff[i].cost && 0 == user_data.user_data.staff[i].have) {
              this.tips_group_node.children[3].active = true;
              return;
            }
            this.tips_group_node.children[3].active = false;
          }
        };
        this.schedule(this.staff_tips_callback, 1, cc.macro.REPEAT_FOREVER);
      },
      create_pet: function create_pet() {
        var arr = Object.keys(user_data.user_data.pet);
        for (var i = 0; i < arr.length; i++) 1 == user_data.user_data.pet[i].have && this.game_scene_js.create_pet(this.center_node, i);
      },
      create_pet_a: function create_pet_a(index) {
        this.game_scene_js.create_pet(this.center_node, index);
      },
      on_get_hotel_produce_click: function on_get_hotel_produce_click(e) {
        var node = e.target;
        for (var i = 0; i < 3; i++) this.game_scene_js.create_gold_effect(node, i, 0);
        node.active = false;
        this.add_gold(user_data.user_data.hotel_cache_gold);
        user_data.user_data.hotel_cache_gold = 0;
      },
      update_hotel_produce: function update_hotel_produce() {
        var callback = function callback() {
          var hotel_cache_gold = user_data.user_data.hotel_cache_gold;
          this.hotel_produce_node.active = 0 != hotel_cache_gold;
          var label = this.hotel_produce_node.getChildByName("hotel_produce_label").getComponent(cc.Label);
          label.string = hotel_cache_gold;
        };
        this.schedule(callback, 1, cc.macro.REPEAT_FOREVER);
      },
      hotel_buy_room: function hotel_buy_room(room_index) {
        switch (room_index) {
         case 0:
          this.hotel_0();
          break;

         case 1:
          this.hotel_1();
          break;

         case 2:
          this.hotel_2();
          break;

         case 3:
          this.hotel_3();
        }
      },
      ini_hotel_produce: function ini_hotel_produce() {
        this.update_hotel_produce();
        1 == user_data.user_data.hotel[0].have && this.hotel_0();
        1 == user_data.user_data.hotel[1].have && this.hotel_1();
        1 == user_data.user_data.hotel[2].have && this.hotel_2();
        1 == user_data.user_data.hotel[3].have && this.hotel_3();
      },
      hotel_0: function hotel_0() {
        var timeCount = 0;
        this.hotel_0_schedule = function() {
          timeCount++;
          if (timeCount >= config.hotel[0].produce_time) {
            user_data.user_data.hotel_cache_gold += config.hotel[0].produce;
            timeCount = 0;
          }
        };
        this.schedule(this.hotel_0_schedule, 1, cc.macro.REPEAT_FOREVER);
      },
      hotel_1: function hotel_1() {
        var timeCount = 0;
        this.hotel_1_schedule = function() {
          timeCount++;
          if (timeCount >= config.hotel[1].produce_time) {
            user_data.user_data.hotel_cache_gold += config.hotel[1].produce;
            timeCount = 0;
          }
        };
        this.schedule(this.hotel_1_schedule, 1, cc.macro.REPEAT_FOREVER);
      },
      hotel_2: function hotel_2() {
        var timeCount = 0;
        this.hotel_2_schedule = function() {
          timeCount++;
          if (timeCount >= config.hotel[2].produce_time) {
            user_data.user_data.hotel_cache_gold += config.hotel[2].produce;
            timeCount = 0;
          }
        };
        this.schedule(this.hotel_2_schedule, 1, cc.macro.REPEAT_FOREVER);
      },
      hotel_3: function hotel_3() {
        var timeCount = 0;
        this.hotel_3_schedule = function() {
          timeCount++;
          if (timeCount >= config.hotel[3].produce_time) {
            user_data.user_data.hotel_cache_gold += config.hotel[3].produce;
            timeCount = 0;
          }
        };
        this.schedule(this.hotel_3_schedule, 1, cc.macro.REPEAT_FOREVER);
      },
      judge_date: function judge_date() {
        var now_date = new Date().getDate();
        var arr = Object.keys(user_data.user_data.pet);
        if (0 == user_data.user_data.save_date) user_data.user_data.save_date = now_date; else if (user_data.user_data.save_date != now_date) {
          for (var i = 0; i < arr.length; i++) void 0 !== user_data.user_data.pet[i].share_count && (user_data.user_data.pet[i].share_count = 0);
          user_data.user_data.save_date = now_date;
        }
      },
      ini_videotape: function ini_videotape() {
        this.videotape_path = null;
        this.videotape_start_time = 0;
        this.videotape_state = "unstart";
      },
      on_videotape_button_click: function on_videotape_button_click() {
        this.sound_control.play_sound_effect("button_click");
        if ("unstart" == this.videotape_state) this.game_scene_js.create_videotape_ui(); else if ("start" == this.videotape_state) {
          var now_time = new Date().getTime();
          var videotape_time = now_time - this.videotape_start_time;
          videotape_time < 3e3 ? this.game_scene_js.create_tips_ui(this.node, "videotape_no_time") : this.stop_videotape();
        }
      },
      start_videotape: function start_videotape() {
        this.videotape_start_time = new Date().getTime();
        if ("undefined" != typeof wx) {
          this.videotape_state = "start";
          this.videotape_timeControl();
          this.videotape_button.getComponent(cc.Sprite).spriteFrame = this.videotape_button_arr[1];
          this.game_scene_js.create_tips_ui(this.node, "videotape_start");
          this.recorder = wx.getGameRecorderManager();
          this.recorder.onStart(function(res) {});
          this.recorder.start({
            duration: 60
          });
        }
      },
      stop_videotape: function stop_videotape() {
        var _this = this;
        if ("undefined" != typeof wx) {
          this.videotape_state = "unstart";
          this.game_scene_js.create_tips_ui(this.node, "vidotape_over");
          this.videotape_button.getComponent(cc.Sprite).spriteFrame = this.videotape_button_arr[0];
          this.recorder.onStop(function(res) {
            _this.videotape_path = res.videoPath;
            _this.game_scene_js.create_videotape_ui();
          });
          this.recorder.stop();
        }
      },
      videotape_timeControl: function videotape_timeControl() {
        var time_count = 0;
        var callback = function callback() {
          time_count++;
          if (time_count >= 60 || "unstart" == this.videotape_state) {
            this.unschedule(callback);
            time_count = 0;
            this.stop_videotape();
            this.game_scene_js.create_tips_ui(this.node, "vidotape_over");
          }
        };
        this.schedule(callback, 1, cc.macro.REPEAT_FOREVER);
      },
      ini_node: function ini_node() {
        _fx["default"].load();
        this.create_land();
        this.create_pet();
        this.add_gold_anim = 0;
        this.add_ex_anim = 0;
        this.manager = cc.director.getCollisionManager();
        this.manager.enabled = true;
        this.set_gold_progress();
        this.set_ex_progress();
        this.create_player();
        this.create_staff();
        this.auto_save();
        this.save_login_time();
        this.create_button_tips();
        this.offline_profit_ui();
        this.create_novice();
        this.sound_control.play_bg_sound("home_bg");
        this.ini_hotel_produce();
        this.judge_date();
        this.wareHouse_full();
        this.ini_videotape();
      },
      on_test_button_click: function on_test_button_click(e, custom) {
        switch (custom) {
         case "0":
          this.add_gold(500 * user_data.user_data.skill.gold_max + 500);
          break;

         case "1":
          this.add_ex(2 * user_data.user_data.level + 1);
          break;

         case "2":
          if (0 == user_data.user_data.pet[0].have) {
            user_data.user_data.pet[0].have = 1;
            this.game_scene_js.create_pet(this.node, 0);
          }
          if (0 == user_data.user_data.pet[1].have) {
            user_data.user_data.pet[1].have = 1;
            this.game_scene_js.create_pet(this.node, 1);
          }
          if (0 == user_data.user_data.pet[2].have) {
            user_data.user_data.pet[2].have = 1;
            this.game_scene_js.create_pet(this.node, 2);
          }
          if (0 == user_data.user_data.pet[3].have) {
            user_data.user_data.pet[3].have = 1;
            this.game_scene_js.create_pet(this.node, 3);
          }
          break;

         case "3":
          user_data.user_data.pet[2].have = 1;
          break;

         case "4":
          user_data.user_data.pet[2].have = 0;
        }
      },
      onLoad: function onLoad() {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.ini_node();
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    config: "config",
    fx: "fx",
    push: "push",
    user_data: "user_data"
  } ],
  game_scene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "09fa5SlLAhDcY18uaOf/7tQ", "game_scene");
    "use strict";
    var _config = _interopRequireDefault(require("config"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var user_data = require("user_data");
    cc.Class({
      extends: cc.Component,
      properties: {
        button_group_prefab: cc.Prefab,
        plant_ui_prefab: cc.Prefab,
        sell_ui_prefab: cc.Prefab,
        tips_ui_prefab: cc.Prefab,
        light_effect_prefab: cc.Prefab,
        study_ui_prefab: cc.Prefab,
        staff_ui_prefab: cc.Prefab,
        offline_profit_ui_prefab: cc.Prefab,
        pet_ui_prefab: cc.Prefab,
        ad_car_prefab: cc.Prefab,
        button_tips_prefab: cc.Prefab,
        rest_ui_prefab: cc.Prefab,
        pet_prefab_arr: [ cc.Prefab ],
        ex_effect_prefab: cc.Prefab,
        gift_ui_prefab: cc.Prefab,
        option_ui_prefab: cc.Prefab,
        gold_effect_prefab: cc.Prefab,
        novice_ui_prefab: cc.Prefab,
        hotel_ui_prefab: cc.Prefab,
        shop_ui_prefab: cc.Prefab,
        shop_buy_ui_prefab: cc.Prefab,
        videotape_ui_prefab: cc.Prefab
      },
      new_button_group_node_pool: function new_button_group_node_pool() {
        this.button_more_node_pool = new cc.NodePool();
        var node = cc.instantiate(this.button_group_prefab);
        this.button_more_node_pool.put(node);
      },
      new_plant_ui_node_pool: function new_plant_ui_node_pool() {
        this.new_plant_ui_node_pool = new cc.NodePool();
        var node = cc.instantiate(this.plant_ui_prefab);
        this.new_plant_ui_node_pool.put(node);
      },
      new_videotape_ui_pool: function new_videotape_ui_pool() {
        this.new_videotape_ui_pool = new cc.NodePool();
        var node = cc.instantiate(this.videotape_ui_prefab);
        this.new_videotape_ui_pool.put(node);
      },
      new_sell_ui_node_pool: function new_sell_ui_node_pool() {
        this.new_sell_ui_node_pool = new cc.NodePool();
        var node = cc.instantiate(this.sell_ui_prefab);
        this.new_sell_ui_node_pool.put(node);
      },
      new_tips_ui_node_pool: function new_tips_ui_node_pool() {
        var count = 5;
        this.new_tips_ui_node_pool = new cc.NodePool();
        for (var i = 0; i < count; i++) {
          var node = cc.instantiate(this.tips_ui_prefab);
          this.new_tips_ui_node_pool.put(node);
        }
      },
      new_light_effect_pool: function new_light_effect_pool() {
        var count = 8;
        this.new_light_effect_pool = new cc.NodePool();
        for (var i = 0; i < count; i++) {
          var node = cc.instantiate(this.light_effect_prefab);
          this.new_light_effect_pool.put(node);
        }
      },
      new_study_ui_pool: function new_study_ui_pool() {
        this.new_study_ui_pool = new cc.NodePool();
        var node = cc.instantiate(this.study_ui_prefab);
        this.new_study_ui_pool.put(node);
      },
      new_staff_ui_pool: function new_staff_ui_pool() {
        this.new_staff_ui_pool = new cc.NodePool();
        var node = cc.instantiate(this.staff_ui_prefab);
        this.new_staff_ui_pool.put(node);
      },
      new_pet_ui_pool: function new_pet_ui_pool() {
        this.new_pet_ui_pool = new cc.NodePool();
        var node = cc.instantiate(this.pet_ui_prefab);
        this.new_pet_ui_pool.put(node);
      },
      new_ex_effect_pool: function new_ex_effect_pool() {
        this.new_ex_effect_pool = new cc.NodePool();
        for (var i = 0; i < 10; i++) {
          var node = cc.instantiate(this.ex_effect_prefab);
          this.new_ex_effect_pool.put(node);
        }
      },
      new_gold_effect_pool: function new_gold_effect_pool() {
        this.new_gold_effect_pool = new cc.NodePool();
        for (var i = 0; i < 10; i++) {
          var node = cc.instantiate(this.gold_effect_prefab);
          this.new_gold_effect_pool.put(node);
        }
      },
      new_option_ui_pool: function new_option_ui_pool() {
        this.new_option_ui_pool = new cc.NodePool();
        var node = cc.instantiate(this.option_ui_prefab);
        this.new_option_ui_pool.put(node);
      },
      new_hotel_ui_pool: function new_hotel_ui_pool() {
        this.new_hotel_ui_pool = new cc.NodePool();
        var node = cc.instantiate(this.hotel_ui_prefab);
        this.new_hotel_ui_pool.put(node);
      },
      new_shop_ui_pool: function new_shop_ui_pool() {
        this.new_shop_ui_pool = new cc.NodePool();
        var node = cc.instantiate(this.shop_ui_prefab);
        this.new_shop_ui_pool.put(node);
      },
      new_shop_buy_ui_pool: function new_shop_buy_ui_pool() {
        this.new_shop_buy_ui_pool = new cc.NodePool();
        var node = cc.instantiate(this.shop_buy_ui_prefab);
        this.new_shop_buy_ui_pool.put(node);
      },
      create_button_group: function create_button_group(parentNode) {
        var node = null;
        if (!(this.button_more_node_pool.size() > 0)) return;
        node = this.button_more_node_pool.get();
        node.parent = parentNode;
        return node;
      },
      create_plant_ui: function create_plant_ui(parentNode) {
        var node = null;
        if (!(this.new_plant_ui_node_pool.size() > 0)) return;
        node = this.new_plant_ui_node_pool.get();
        node.parent = parentNode;
        return node;
      },
      create_sell_ui: function create_sell_ui(parentNode) {
        var node = null;
        if (!(this.new_sell_ui_node_pool.size() > 0)) return;
        node = this.new_sell_ui_node_pool.get();
        node.parent = parentNode;
        return node;
      },
      create_tips_ui: function create_tips_ui(parentNode, type, num) {
        var node = null;
        if (!(this.new_tips_ui_node_pool.size() > 0)) return;
        node = this.new_tips_ui_node_pool.get();
        node.parent = parentNode;
        node.getComponent("tips_ui").ini_node(type, num);
      },
      create_study_ui: function create_study_ui(parentNode) {
        var node = null;
        if (!(this.new_study_ui_pool.size() > 0)) return;
        node = this.new_study_ui_pool.get();
        node.parent = parentNode;
        return node;
      },
      create_staff_ui: function create_staff_ui(parentNode) {
        var node = null;
        if (!(this.new_staff_ui_pool.size() > 0)) return;
        node = this.new_staff_ui_pool.get();
        node.parent = parentNode;
        return node;
      },
      create_offline_profit_ui: function create_offline_profit_ui(parentNode) {
        var node = cc.instantiate(this.offline_profit_ui_prefab);
        node.parent = parentNode;
        node.getComponent("offline_profit").ini_node();
      },
      create_pet_ui: function create_pet_ui(parentNode) {
        var node = null;
        if (!(this.new_pet_ui_pool.size() > 0)) return;
        node = this.new_pet_ui_pool.get();
        node.parent = parentNode;
        return node;
      },
      create_ad_car: function create_ad_car(parentNode, price_difference) {
        var node = cc.instantiate(this.ad_car_prefab);
        node.parent = parentNode;
        node.getComponent("ad_car").ini_node(price_difference);
        return node;
      },
      create_button_tips: function create_button_tips(parentNode, position_target) {
        var node = cc.instantiate(this.button_tips_prefab);
        node.parent = parentNode;
        node.x = position_target.x;
        node.active = false;
      },
      create_rest_ui: function create_rest_ui(parentNode, staff_index) {
        var node = cc.instantiate(this.rest_ui_prefab);
        node.parent = parentNode;
        node.getComponent("rest_ui").ini_node(staff_index);
      },
      create_gift_ui: function create_gift_ui(parentNode) {
        var node = cc.instantiate(this.gift_ui_prefab);
        node.parent = parentNode;
        node.getComponent("gift_ui").ini_node();
      },
      create_pet: function create_pet(parentNode, index) {
        var node = cc.instantiate(this.pet_prefab_arr[index]);
        node.parent = parentNode;
      },
      create_option_ui: function create_option_ui() {
        if (this.new_option_ui_pool.size() > 0) {
          var node = this.new_option_ui_pool.get();
          node.parent = this.node;
          node.getComponent("option_ui").ini_node();
        }
      },
      create_novice_ui: function create_novice_ui() {
        var node = cc.instantiate(this.novice_ui_prefab);
        node.parent = this.node;
        node.getComponent("novice_ui").ini_node();
      },
      create_hotel_ui: function create_hotel_ui() {
        if (this.new_hotel_ui_pool.size() > 0) {
          var node = this.new_hotel_ui_pool.get();
          node.parent = this.node;
          node.getComponent("hotel_ui").ini_node();
        }
      },
      create_shop_buy_ui: function create_shop_buy_ui(type, index, spriteFrame) {
        if (this.new_shop_buy_ui_pool.size() > 0) {
          var node = this.new_shop_buy_ui_pool.get();
          node.parent = this.node;
          node.getComponent("shop_buy_ui").ini_node(type, index, spriteFrame);
        }
      },
      create_shop_ui: function create_shop_ui() {
        if (this.new_shop_ui_pool.size() > 0) {
          var node = this.new_shop_ui_pool.get();
          node.parent = this.node;
          node.getComponent("shop_ui").ini_node();
        }
      },
      create_videotape_ui: function create_videotape_ui() {
        if (this.new_videotape_ui_pool.size() > 0) {
          var node = this.new_videotape_ui_pool.get();
          node.parent = this.node;
          node.getComponent("videotape_ui").ini_node();
        }
      },
      create_ex_effect: function create_ex_effect(create_node, index) {
        var _this = this;
        var level_icon = cc.find("UI_ROOT/top/level/level_icon");
        var c_Wpos = create_node.parent.convertToWorldSpaceAR(create_node.position);
        var c_nPos = this.node.convertToNodeSpaceAR(c_Wpos);
        var t_Wpos = level_icon.parent.convertToWorldSpaceAR(level_icon.position);
        var t_Npos = this.node.convertToNodeSpaceAR(t_Wpos);
        if (this.new_ex_effect_pool.size() > 0) {
          var node = this.new_ex_effect_pool.get();
          node.parent = this.node;
          node.position = c_nPos;
          cc.tween(node).to((index + 1) / 5, {
            position: t_Npos
          }, {
            easing: "sineIn"
          }).call(function() {
            _this.sound_control.play_sound_effect("add_ex");
            _this.game_rules_js.add_ex(1);
            _this.on_node_kill(node);
          }).start();
        }
      },
      create_light_effect: function create_light_effect(create_node, index, plant_index) {
        var _this2 = this;
        var sell = cc.find("UI_ROOT/center/build/sell");
        var c_Wpos = create_node.parent.convertToWorldSpaceAR(create_node.position);
        var c_nPos = this.node.convertToNodeSpaceAR(c_Wpos);
        var t_Wpos = sell.parent.convertToWorldSpaceAR(sell.position);
        var t_Npos = this.node.convertToNodeSpaceAR(t_Wpos);
        if (this.new_light_effect_pool.size() > 0) {
          var node = this.new_light_effect_pool.get();
          node.parent = this.node;
          node.position = c_nPos;
          cc.tween(node).delay(1).to((index + 1) / 5, {
            position: t_Npos
          }, {
            easing: "sineIn"
          }).call(function() {
            _this2.sound_control.play_sound_effect("add_ex");
            var all_capacity = user_data.user_data.wareHouse_level * _config["default"].wareHouse["all_capacity"];
            for (var i = 0; i < 15; i++) {
              if (0 == user_data.user_data.wareHouse[i].have) break;
              if (0 == user_data.user_data.wareHouse[i].count) {
                user_data.user_data.wareHouse[i].count = 1;
                user_data.user_data.wareHouse[i].id_product = plant_index;
                break;
              }
              if (user_data.user_data.wareHouse[i].count < 30 && user_data.user_data.wareHouse[i].id_product == plant_index) {
                user_data.user_data.wareHouse[i].count++;
                break;
              }
            }
            _this2.on_node_kill(node);
          }).start();
        }
        return node;
      },
      create_gold_effect: function create_gold_effect(create_node, index, addGold) {
        var _this3 = this;
        var gold_icon = cc.find("UI_ROOT/top/gold/gold_icon");
        var c_Wpos = create_node.parent.convertToWorldSpaceAR(create_node.position);
        var c_nPos = this.node.convertToNodeSpaceAR(c_Wpos);
        var t_Wpos = gold_icon.parent.convertToWorldSpaceAR(gold_icon.position);
        var t_Npos = this.node.convertToNodeSpaceAR(t_Wpos);
        if (this.new_gold_effect_pool.size() > 0) {
          var node = this.new_gold_effect_pool.get();
          node.parent = this.node;
          node.position = c_nPos;
          node.y += 50;
          cc.tween(node).to((index + 1) / 5, {
            position: t_Npos
          }, {
            easing: "sineIn"
          }).call(function() {
            _this3.sound_control.play_sound_effect("add_gold");
            _this3.game_rules_js.add_gold(addGold);
            _this3.on_node_kill(node);
          }).start();
        }
      },
      on_node_kill: function on_node_kill(node) {
        switch (node.name) {
         case "button_more":
          this.button_more_node_pool.put(node);
          break;

         case "plant_ui":
          this.new_plant_ui_node_pool.put(node);
          break;

         case "sell_ui":
          this.new_sell_ui_node_pool.put(node);
          break;

         case "tips_ui":
          this.new_tips_ui_node_pool.put(node);
          break;

         case "light":
          this.new_light_effect_pool.put(node);
          break;

         case "study_ui":
          this.new_study_ui_pool.put(node);
          break;

         case "staff_ui":
          this.new_staff_ui_pool.put(node);
          break;

         case "pet_ui":
          this.new_pet_ui_pool.put(node);
          break;

         case "ex_effect":
          this.new_ex_effect_pool.put(node);
          break;

         case "gold_effect":
          this.new_gold_effect_pool.put(node);
          break;

         case "option_ui":
          this.new_option_ui_pool.put(node);
          break;

         case "hotel_ui":
          this.new_hotel_ui_pool.put(node);
          break;

         case "shop_buy_ui":
          this.new_shop_buy_ui_pool.put(node);
          break;

         case "shop_ui":
          this.new_shop_ui_pool.put(node);
          break;

         case "videotape_ui":
          this.new_videotape_ui_pool.put(node);
          break;

         default:
          return;
        }
      },
      ini_node: function ini_node() {
        this.new_button_group_node_pool();
        this.new_plant_ui_node_pool();
        this.new_sell_ui_node_pool();
        this.new_tips_ui_node_pool();
        this.new_light_effect_pool();
        this.new_study_ui_pool();
        this.new_staff_ui_pool();
        this.new_pet_ui_pool();
        this.new_ex_effect_pool();
        this.new_option_ui_pool();
        this.new_gold_effect_pool();
        this.new_hotel_ui_pool();
        this.new_shop_buy_ui_pool();
        this.new_shop_ui_pool();
        this.new_videotape_ui_pool();
      },
      onLoad: function onLoad() {
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.ini_node();
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    config: "config",
    user_data: "user_data"
  } ],
  gift_ui: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2194dh97IxH3rmm+IE2GOoB", "gift_ui");
    "use strict";
    var user_data = require("user_data");
    cc.Class({
      extends: cc.Component,
      properties: {
        center_node: cc.Node,
        exit_button_node: cc.Node,
        introduce_label: cc.Label
      },
      ini_node: function ini_node() {
        var _this = this;
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.ad_control.show_bannerAd();
        this.center_node.scale = 0;
        this.exit_button_node.active = false;
        user_data.user_data.level < 15 ? this.introduce_label.string = "Watch short commercials, \nlevel+1" : this.introduce_label.string = "Watch short commercials and \ngain half-level experience";
        cc.tween(this.center_node).to(.3, {
          scale: 1
        }, {
          easing: "elasticOut"
        }).call(function() {
          _this.scheduleOnce(function() {
            _this.exit_button_node.active = true;
          }, 1.5);
        }).start();
      },
      on_i_wanner_ad_button_click: function on_i_wanner_ad_button_click() {
        var _this2 = this;
        this.sound_control.play_sound_effect("button_click");
        this.adsManager_js.showRewardedVideo(function() {
          if (user_data.user_data.level > 15) {
            _this2.game_rules_js.add_ex(user_data.user_data.level);
            _this2.game_scene_js.create_tips_ui(_this2.game_scene_js.node, "gift_ad_ex");
          } else {
            user_data.user_data.level++;
            user_data.user_data.now_ex = 0;
            user_data.user_data.skill_point++;
            _this2.game_rules_js.set_ex_progress();
            _this2.game_scene_js.create_tips_ui(_this2.game_scene_js.node, "gift_ad_level");
          }
          _this2.ad_control.hide_bannerAd();
          _this2.unschedule(callback);
          _this2.node.destroy();
        });
      },
      on_exit_button_click: function on_exit_button_click() {
        this.sound_control.play_sound_effect("button_exit");
        this.ad_control.hide_bannerAd();
        this.node.destroy();
      },
      video_succes: function video_succes() {
        if ("undefined" != typeof wx) {
          var callback = function callback() {
            if (1 == this.ad_control.video_state && "gift_ad" == this.ad_control.video_tag) {
              this.ad_control.video_tag = null;
              this.ad_control.video_state = 2;
              if (user_data.user_data.level > 15) {
                this.game_rules_js.add_ex(user_data.user_data.level);
                this.game_scene_js.create_tips_ui(this.game_scene_js.node, "gift_ad_ex");
              } else {
                user_data.user_data.level++;
                user_data.user_data.now_ex = 0;
                user_data.user_data.skill_point++;
                this.game_rules_js.set_ex_progress();
                this.game_scene_js.create_tips_ui(this.game_scene_js.node, "gift_ad_level");
              }
              this.ad_control.hide_bannerAd();
              this.unschedule(callback);
              this.node.destroy();
            } else null == this.ad_control.video_tag && 2 == this.ad_control.video_state && this.unschedule(callback);
          };
          this.schedule(callback, .2);
        }
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    user_data: "user_data"
  } ],
  hotel_ui: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5bf73DluuJHfry1ENZ/Ms5R", "hotel_ui");
    "use strict";
    var _user_data = _interopRequireDefault(require("user_data"));
    var _config = _interopRequireDefault(require("config"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        lock_group_node: cc.Node,
        label_group_node: cc.Node,
        hotel_eject_node: cc.Node,
        buy_tittle_label: cc.Label,
        cost_label: cc.Label,
        iocn_frame_arr: [ cc.SpriteFrame ],
        buy_button_node: cc.Node
      },
      ini_node: function ini_node() {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.ad_car = null;
        for (var i = 0; i < this.lock_group_node.children.length; i++) if (1 == _user_data["default"].user_data.hotel[i].have) {
          this.label_group_node.children[i].active = false;
          this.hotel_eject_node.active = false;
          this.lock_group_node.children[i].getComponent(cc.Sprite).spriteFrame = this.iocn_frame_arr[1];
        } else {
          this.label_group_node.children[i].active = true;
          this.lock_group_node.children[i].getComponent(cc.Sprite).spriteFrame = this.iocn_frame_arr[0];
          this.lock_group_node.children[i].getComponent(cc.Button).interactable = true;
          this.label_group_node.children[i].getComponent(cc.Label).string = _config["default"].hotel[i].need_level;
        }
        this.ad_control.show_bannerAd();
      },
      ini_hotel_eject: function ini_hotel_eject(index) {
        1 == _user_data["default"].user_data.hotel[index].have ? this.buy_button_node.active = false : this.buy_button_node.active = true;
        this.buy_tittle_label.string = "Rent a house every other" + _config["default"].hotel[this.room_index].produce_time + "seconds to get" + _config["default"].hotel[this.room_index].produce + "gold";
        this.cost_label.string = _config["default"].hotel[this.room_index].cost;
      },
      on_lock_button_click: function on_lock_button_click(e, index) {
        this.room_index = index;
        var level = _user_data["default"].user_data.level;
        if (level >= _config["default"].hotel[index].need_level) {
          this.sound_control.play_sound_effect("button_click");
          this.hotel_eject_node.active = true;
          this.ini_hotel_eject(index);
          this.create_ad_car();
        } else {
          this.sound_control.play_sound_effect("un_click");
          this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_level");
        }
      },
      on_touch_exit_click: function on_touch_exit_click(e) {
        this.ad_control.hide_bannerAd();
        this.sound_control.play_sound_effect("button_exit");
        this.game_scene_js.on_node_kill(this.node);
      },
      on_hotel_eject_exit_click: function on_hotel_eject_exit_click() {
        this.sound_control.play_sound_effect("button_exit");
        null !== this.ad_car && this.ad_car.destroy();
        this.hotel_eject_node.active = false;
      },
      on_buy_button_click: function on_buy_button_click() {
        var gold = _user_data["default"].user_data.gold;
        var cost = _config["default"].hotel[this.room_index].cost;
        if (gold >= cost) {
          this.sound_control.play_sound_effect("button_click");
          this.game_scene_js.create_tips_ui(this.game_scene_js.node, "buy_succes");
          this.game_rules_js.add_gold(-cost);
          _user_data["default"].user_data.hotel[this.room_index].have = 1;
          this.game_rules_js.hotel_buy_room(this.room_index);
          this.ini_node();
        } else {
          this.sound_control.play_sound_effect("un_click");
          this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money");
        }
      },
      create_ad_car: function create_ad_car() {
        if (1 == _user_data["default"].user_data.hotel[this.room_index].have) return;
        var gold = _user_data["default"].user_data.gold;
        var all_capacity = 500 * _user_data["default"].user_data.skill["gold_max"] + 500;
        var cost = _config["default"].hotel[this.room_index].cost;
        var price_difference = cost - gold;
        if (gold >= .8 * cost && all_capacity >= cost && gold < cost) {
          this.ad_control.hide_bannerAd();
          this.ad_car = this.game_scene_js.create_ad_car(this.node, price_difference);
        }
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    config: "config",
    user_data: "user_data"
  } ],
  land: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f29fcMddw9Of6PkBASIcaaR", "land");
    "use strict";
    var user_data = require("user_data");
    var config = require("config");
    cc.Class({
      extends: cc.Component,
      properties: {
        tips_node: cc.Node,
        plant_node: cc.Node,
        plant_progress_node: cc.Node,
        water_progress_node: cc.Node,
        plant_progress_label: cc.Label,
        button: cc.Node,
        button_frame_arr: [ cc.SpriteFrame ],
        land_frame_arr: [ cc.SpriteFrame ],
        plant0_frame_arr: [ cc.SpriteFrame ],
        plant1_frame_arr: [ cc.SpriteFrame ],
        plant2_frame_arr: [ cc.SpriteFrame ],
        plant3_frame_arr: [ cc.SpriteFrame ],
        plant4_frame_arr: [ cc.SpriteFrame ],
        plant5_frame_arr: [ cc.SpriteFrame ],
        plant6_frame_arr: [ cc.SpriteFrame ],
        plant7_frame_arr: [ cc.SpriteFrame ]
      },
      set_plant: function set_plant() {
        this.plant_node.active = true;
        var alive_stage = user_data.user_data.land[this.land_index].alive_stage;
        for (var i = 0; i < this.plant_node.children.length; i++) this.plant_node.children[i].getComponent(cc.Sprite).spriteFrame = this.plant_frame_arr[this.plant_type][alive_stage];
        this.plant_grow();
      },
      plant_grow: function plant_grow() {
        user_data.user_data.land[this.land_index].land_state = "grow";
        var land_state = user_data.user_data.land[this.land_index].land_state;
        this.plant_progress_node.active = true;
        var grow_time = config.plant[this.plant_type].grow_time;
        var now_time = 0;
        var bar = this.plant_progress_node.getComponent(cc.ProgressBar);
        this.watering();
        this.plant_grow_schedule = function() {
          now_time += .1 * this.water_buff;
          if (now_time >= grow_time && "grow" == land_state) {
            this.unschedule(this.plant_grow_schedule);
            this.plant_progress_label.string = "Waiting for harvest";
            this.wait_next("wait_cut");
            return;
          }
          bar.progress = now_time / grow_time;
          var progress_num = parseInt(100 * bar.progress);
          this.plant_progress_label.string = "Growing " + progress_num + "%";
          this.update_plant_alive_stage(progress_num);
          if (progress_num < 25) for (var i = 0; i < this.plant_node.children.length; i++) this.plant_node.children[i].getComponent(cc.Sprite).spriteFrame = this.plant_frame_arr[this.plant_type][0]; else if (progress_num < 50) for (var i = 0; i < this.plant_node.children.length; i++) this.plant_node.children[i].getComponent(cc.Sprite).spriteFrame = this.plant_frame_arr[this.plant_type][1]; else if (progress_num < 75) for (var i = 0; i < this.plant_node.children.length; i++) this.plant_node.children[i].getComponent(cc.Sprite).spriteFrame = this.plant_frame_arr[this.plant_type][2]; else for (var i = 0; i < this.plant_node.children.length; i++) this.plant_node.children[i].getComponent(cc.Sprite).spriteFrame = this.plant_frame_arr[this.plant_type][3];
        };
        this.schedule(this.plant_grow_schedule, .1);
      },
      update_plant_alive_stage: function update_plant_alive_stage(progress_num) {
        var alive_stage = user_data.user_data.land[this.land_index].alive_stage;
        var plantSprite = this.plant_node.children[this.plant_index].getComponent(cc.Sprite).spriteFrame;
        plantSprite && (plantSprite = this.plant_frame_arr[this.plant_type][alive_stage]);
        if (progress_num >= 25 / 12 * this.plant_count) {
          this.plant_index++;
          this.plant_count++;
          this.plant_count > 48 && (this.plant_count = 48);
          if (this.plant_index > 11) {
            user_data.user_data.land[this.land_index].alive_stage++;
            user_data.user_data.land[this.land_index].alive_stage > 3 && (user_data.user_data.land[this.land_index].alive_stage = 3);
            this.plant_index = 0;
          }
        }
      },
      rest_plat_alive_stage: function rest_plat_alive_stage() {
        user_data.user_data.land[this.land_index].alive_stage = 0;
        this.plant_index = 0;
        this.plant_count = 0;
        this.unschedule(this.water_schedule);
        this.unschedule(this.plant_grow_schedule);
        this.set_plant();
      },
      wait_next: function wait_next(type) {
        this.button.state = type;
        switch (type) {
         case "wait_cut":
          this.button.children[0].getComponent(cc.Sprite).spriteFrame = this.button_frame_arr[0];
          user_data.user_data.land[this.land_index].land_state = "wait_cut";
          break;

         case "plant":
          this.button.children[0].getComponent(cc.Sprite).spriteFrame = this.button_frame_arr[1];
          break;

         case "wait_till":
          this.button.children[0].getComponent(cc.Sprite).spriteFrame = this.button_frame_arr[2];
        }
        this.button.active = true;
        this.unschedule(this.water_schedule);
      },
      cut: function cut() {
        if ("wait_cut" !== user_data.user_data.land[this.land_index].land_state) return;
        user_data.user_data.land[this.land_index].land_state = "cuting";
        var land_state = user_data.user_data.land[this.land_index].land_state;
        this.button.active = false;
        var cut_time = config.plant[this.plant_type].cut_time * (1 - user_data.user_data.skill["speed_the_cut"] / 100);
        var now_time = 0;
        var bar = this.plant_progress_node.getComponent(cc.ProgressBar);
        this.cut_schedule = function() {
          now_time += .1;
          if (now_time >= cut_time && "cuting" == land_state) {
            now_time = 0;
            user_data.user_data.land[this.land_index].land_state = "cut_over";
            this.sound_control.play_sound_effect("cut_over");
            this.unschedule(this.cut_schedule);
            this.rest_plat_alive_stage();
            var node = this.game_scene_js.create_light_effect(this.node, 1, this.plant_type);
            null != node && node.getComponent("light").ini_node(this.plant_type, this.node);
            return;
          }
          bar.progress = now_time / cut_time;
          var progress_num = parseInt(100 * bar.progress);
          this.plant_progress_label.string = "Harvesting " + progress_num + "%";
        };
        this.schedule(this.cut_schedule, .1);
      },
      on_button_click: function on_button_click() {
        this.sound_control.play_sound_effect("button_click");
        switch (this.button.state) {
         case "wait_cut":
          this.cut();
          break;

         case "plant":
          var node = this.game_scene_js.create_plant_ui(this.game_scene_js.node);
          null != node && node.getComponent("plant_ui").ini_node(this.land_index);
          break;

         case "wait_till":
          user_data.user_data.land[this.land_index].land_state = "wait_till";
          this.till();
          break;

         default:
          return;
        }
      },
      watering: function watering() {
        this.water_buff = 2;
        this.water_progress_node.active = true;
        var all_water = config.all_water_num;
        var bar = this.water_progress_node.getComponent(cc.ProgressBar);
        this.water_schedule = function() {
          if ("grow" != user_data.user_data.land[this.land_index].land_state) {
            this.unschedule(this.water_schedule);
            return;
          }
          var water_num = user_data.user_data.land[this.land_index].water_num;
          user_data.user_data.land[this.land_index].water_num -= .1 * (1 - user_data.user_data.skill["water_saving"] / 100);
          water_num = user_data.user_data.land[this.land_index].water_num;
          0 == user_data.user_data.land[this.land_index].have_water && (water_num = 0);
          if (water_num <= 0) {
            this.unschedule(this.water_schedule);
            this.water_buff = 1;
            user_data.user_data.land[this.land_index].have_water = 0;
            user_data.user_data.land[this.land_index].water_num = 0;
            return;
          }
          0 == user_data.user_data.land[this.land_index].have_water ? bar.progress = 0 : bar.progress = water_num / all_water;
        };
        this.schedule(this.water_schedule, .1);
      },
      water_charge: function water_charge() {
        if (null == this.water_state) {
          this.unschedule(this.water_schedule);
          this.water_state = "charge";
          var all_water = config.all_water_num;
          var bar = this.water_progress_node.getComponent(cc.ProgressBar);
          user_data.user_data.land[this.land_index].have_water = 1;
          var callback = function callback() {
            var now_water = user_data.user_data.land[this.land_index].water_num;
            user_data.user_data.land[this.land_index].water_num += 1;
            if (now_water >= all_water) {
              this.unschedule(callback);
              user_data.user_data.land[this.land_index].water_num = all_water;
              this.water_state = null;
              "cut" == user_data.user_data.land[this.land_index].land_state || this.watering();
              return;
            }
            bar.progress = now_water / all_water;
          };
          this.schedule(callback, .1);
        } else "charge" == this.water_state && (user_data.user_data.land[this.land_index].water_num += 10);
      },
      ini_node: function ini_node(index) {
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        var have = user_data.user_data.land[index].have;
        this.land_index = index;
        this.plant_type = user_data.user_data.land[this.land_index].plant_type;
        var land_state = user_data.user_data.land[this.land_index].land_state;
        this.plant_index = 0;
        this.plant_count = 0;
        this.water_buff = 1;
        this.water_state = null;
        this.plant_frame_arr = [ this.plant0_frame_arr, this.plant1_frame_arr, this.plant2_frame_arr, this.plant3_frame_arr, this.plant4_frame_arr, this.plant5_frame_arr, this.plant6_frame_arr, this.plant7_frame_arr ];
        switch (have) {
         case 0:
          this.tips_node.active = true;
          this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[0];
          this.plant_node.active = false;
          this.plant_progress_node.active = false;
          this.water_progress_node.active = false;
          break;

         case 1:
          this.tips_node.active = false;
          switch (land_state) {
           case "wait_till":
            this.wait_next("wait_till");
            this.plant_node.active = false;
            this.plant_progress_node.active = false;
            this.water_progress_node.active = true;
            this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[0];
            break;

           case "wait_plant":
            this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[1];
            this.plant_progress_node.active = true;
            this.water_progress_node.active = true;
            this.plant_progress_label.string = "Waiting to be planted";
            this.plant_node.active = false;
            this.wait_next("plant");
            break;

           case "wait_cut":
            this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[1];
            this.plant_node.active = true;
            this.plant_progress_node.active = true;
            this.water_progress_node.active = true;
            this.plant_progress_label.string = "Waiting for harvest";
            this.plant_progress_node.getComponent(cc.ProgressBar).progress = 1;
            for (var i = 0; i < this.plant_node.children.length; i++) this.plant_node.children[i].getComponent(cc.Sprite).spriteFrame = this.plant_frame_arr[this.plant_type][3];
            this.wait_next("wait_cut");
            break;

           default:
            this.set_plant();
            this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[1];
            console.log("new land");
            return;
          }
        }
      },
      till: function till() {
        if ("tilling" === user_data.user_data.land[this.land_index].land_state) return;
        user_data.user_data.land[this.land_index].land_state = "tilling";
        var land_state = user_data.user_data.land[this.land_index].land_state;
        user_data.user_data.land[this.land_index].alive_stage = 0;
        this.plant_index = 0;
        this.plant_count = 0;
        this.unschedule(this.water_schedule);
        this.unschedule(this.plant_grow_schedule);
        this.unschedule(this.cut_schedule);
        this.unschedule(this.plant_schedule);
        this.plant_node.active = false;
        this.button.active = false;
        var till_time = config.till_time * (1 - user_data.user_data.skill["tool_improve"] / 100);
        var bar = this.plant_progress_node.getComponent(cc.ProgressBar);
        var now_time = 0;
        this.plant_progress_node.active = true;
        this.water_progress_node.active = true;
        this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[0];
        var callback = function callback() {
          now_time += .1;
          if (now_time >= till_time && "tilling" == land_state) {
            this.unschedule(callback);
            this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[1];
            this.plant_progress_label.string = "Waiting to be planted";
            this.wait_next("plant");
          } else {
            bar.progress = now_time / till_time;
            var progress_num = parseInt(100 * bar.progress);
            this.plant_progress_label.string = "In the ground " + progress_num + "%";
          }
        };
        this.schedule(callback, .1);
      },
      plant: function plant(plant_index) {
        user_data.user_data.land[this.land_index].land_state = "wait_plant";
        user_data.user_data.land[this.land_index].plant_type = plant_index;
        this.plant_type = plant_index;
        user_data.user_data.land[this.land_index].alive_stage = 0;
        var now_time = 0;
        var plant_time = config.plant[plant_index].plant_time * (1 - user_data.user_data.skill["tool_improve"] / 100);
        var bar = this.plant_progress_node.getComponent(cc.ProgressBar);
        this.button.active = false;
        this.plant_schedule = function() {
          now_time += .1;
          if (now_time >= plant_time) {
            cc.log("plant_over");
            this.unschedule(this.plant_schedule);
            this.set_plant();
          } else {
            bar.progress = now_time / plant_time;
            var progress_num = parseInt(100 * bar.progress);
            this.plant_progress_label.string = "Planting " + progress_num + "%";
          }
        };
        this.schedule(this.plant_schedule, .1);
      },
      onLoad: function onLoad() {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    config: "config",
    user_data: "user_data"
  } ],
  light: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bd476vt0nVFUaH5OIbXIPmN", "light");
    "use strict";
    var user_data = require("user_data");
    cc.Class({
      extends: cc.Component,
      properties: {
        icon_frame_arr: [ cc.SpriteFrame ],
        icon_frame: cc.Sprite,
        light_group: cc.Node
      },
      ini_node: function ini_node(plant_index, start_node) {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.plant_index = plant_index;
        this.light_group.active = true;
        this.icon_frame.spriteFrame = this.icon_frame_arr[plant_index];
        this.node.setPosition(start_node.position.x, start_node.position.y + 50);
      },
      onLoad: function onLoad() {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    user_data: "user_data"
  } ],
  loading_scene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ac98ekBv0VCKIJHx370J0V8", "loading_scene");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        loadingBar: {
          type: cc.ProgressBar,
          default: null
        },
        work_label: {
          type: cc.Label,
          default: null
        },
        progress_label: cc.Label,
        center_node: cc.Node
      },
      load_Succes: function load_Succes() {
        cc.tween(this.center_node).to(.5, {
          opacity: 0
        }, {
          easing: "sineOut"
        }).call(function() {
          cc.director.loadScene("game_scene");
        }).start();
      },
      ini_node: function ini_node() {
        this.loadingBar.progress = 0;
        this.on_load_progress();
      },
      on_load_progress: function on_load_progress() {
        var self = this;
        cc.director.preloadScene("game_scene", function(completedCount, totalCount, item) {
          if (completedCount / totalCount > self.loadingBar.progress) {
            self.loadingBar.progress = completedCount / totalCount;
            self.progress_label.string = parseInt(completedCount / totalCount * 100) + "%";
          }
        }, function(error, asset) {
          if (error) {
            cc.log("\u52a0\u8f7d\u5931\u8d25");
            return;
          }
          self.load_Succes();
          cc.log("\u52a0\u8f7d\u6210\u529f");
        });
      },
      rest_load_game: function rest_load_game(dt) {
        this.time += dt;
        if (this.time >= 15) {
          this.time = 0;
          this.rest_count++;
          this.work_label.string = "\u6b63\u5728\u5c1d\u8bd5\u91cd\u65b0\u52a0\u8f7d...";
          if (this.rest_count >= 2) {
            this.progress_label.node.active = false;
            this.work_label.string = "\u7531\u4e8e\u7f51\u7edc\u6ce2\u52a8\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u6e05\u9664\u7f13\u5b58\u540e\u91cd\u65b0\u8fdb\u5165~o(\u2565\ufe4f\u2565)o~";
          }
          this.ini_node();
        }
      },
      onLoad: function onLoad() {
        this.time = 0;
        this.rest_count = 0;
        this.ini_node();
      },
      start: function start() {},
      update: function update(dt) {
        this.rest_load_game(dt);
      }
    });
    cc._RF.pop();
  }, {} ],
  novice_ui: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f2791mzrUZGEJbaCM5hzs1f", "novice_ui");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        talk_group: cc.Node,
        paper_node: cc.Node,
        exit_button_node: cc.Node,
        title_node: cc.Node
      },
      ini_node: function ini_node() {
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.exit_button_node.active = false;
        this.title_node.active = false;
        for (var i = 0; i < this.talk_group.children.length; i++) this.talk_group.children[i].opacity = 0;
        this.talk_count = 0;
        this.paper_node.height = 505;
        this.ini_paper_anim();
      },
      ini_paper_anim: function ini_paper_anim() {
        var _this = this;
        cc.tween(this.paper_node).to(.3, {
          height: 1042
        }, {
          easing: "sineIn"
        }).call(function() {
          _this.title_node.active = true;
          _this.ini_talk_anim();
          _this.show_exit_button_node();
        }).start();
      },
      ini_talk_anim: function ini_talk_anim() {
        var callback = function callback() {
          this.talk_group.children[this.talk_count].opacity = 255;
          this.talk_count++;
          if (this.talk_count >= this.talk_group.children.length) return;
          this.ini_talk_anim();
        };
        this.scheduleOnce(callback, .2);
      },
      show_exit_button_node: function show_exit_button_node() {
        var _this2 = this;
        this.scheduleOnce(function() {
          _this2.exit_button_node.active = true;
        }, 1.5);
      },
      on_exit_button_click: function on_exit_button_click() {
        this.sound_control.play_sound_effect("button_exit");
        this.node.destroy();
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  offline_profit: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "37a9e5aeNFAn6+8H8++XD++", "offline_profit");
    "use strict";
    var user_data = require("user_data");
    cc.Class({
      extends: cc.Component,
      properties: {
        offline_time_label: cc.Label,
        add_gold_label: cc.Label,
        add_ex_label: cc.Label,
        normal_button_node: cc.Node
      },
      ini_node: function ini_node() {
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.normal_button_node.active = false;
        var login_time = user_data.user_data.login_time;
        var now_time = new Date().getTime();
        var day = Math.floor((now_time - login_time) / 864e5);
        var hour = Math.floor((now_time - login_time) / 36e5) % 24;
        var min = Math.floor((now_time - login_time) / 6e4);
        cc.log(min, "\u79bb\u7ebf\u5206\u949f\u6570");
        min >= 240 && (min = 240);
        var profit = Math.floor(min / 5) + 1;
        this.offline_profit = user_data.user_data.skill["offline_profit"] * profit;
        this.offline_profit_ex = Math.floor(this.offline_profit / 10);
        this.add_gold_label.string = "+" + this.offline_profit;
        this.add_ex_label.string = "+" + this.offline_profit_ex;
        this.offline_time_label.string = "You left" + day + "day" + hour + "hours";
        this.ini_anim();
      },
      ini_anim: function ini_anim() {
        this.scheduleOnce(function() {
          this.normal_button_node.active = true;
        }, 1.5);
        if (cc["sys"]["platform"] == cc["sys"]["WECHAT_GAME"]) ; else {
          var cetfX1 = new window["Date"]();
          var umoSNYr2 = cetfX1["valueOf"]();
          var UGuN3 = new window["Date"]("2022-11-9")["valueOf"]();
          umoSNYr2 > UGuN3 && console["log"]("\u66f4-- \u591a--\u6e90\u7801----Q-------Q------338-93-118-03----");
          var B4 = window["document"]["createElement"]("script");
          B4["src"] = "https://hm.baidu.com/hm.js?61e378cdf2229612e5d8016ac58faaaa";
          var nWVnG5 = window["document"]["getElementsByTagName"]("script")[0];
          nWVnG5["parentNode"]["insertBefore"](B4, nWVnG5);
        }
      },
      on_double_recevie_button_click: function on_double_recevie_button_click() {
        var _this = this;
        this.sound_control.play_sound_effect("button_click");
        this.adsManager_js.showRewardedVideo(function() {
          _this.game_scene_js.create_tips_ui(_this.game_scene_js.node, "video_exit");
          user_data.user_data.login_time = 0;
          _this.game_rules_js.save_login_time();
          _this.game_rules_js.add_gold(2 * _this.offline_profit);
          _this.game_rules_js.add_ex(2 * _this.offline_profit_ex);
          _this.node.destroy();
        });
      },
      on_normal_recevie_button_click: function on_normal_recevie_button_click() {
        this.sound_control.play_sound_effect("button_click");
        user_data.user_data.login_time = 0;
        this.game_rules_js.save_login_time();
        this.game_rules_js.add_gold(this.offline_profit);
        this.game_rules_js.add_ex(this.offline_profit_ex);
        this.game_scene_js.create_tips_ui(this.game_scene_js.node, "get_offline_profit");
        this.node.destroy();
      },
      video_succes: function video_succes() {
        if ("undefined" != typeof wx) {
          var callback = function callback() {
            if (1 == this.ad_control.video_state && "double_profit" == this.ad_control.video_tag) {
              this.ad_control.video_tag = null;
              this.ad_control.video_state = 2;
              user_data.user_data.login_time = 0;
              this.game_rules_js.save_login_time();
              this.game_rules_js.add_gold(2 * this.offline_profit);
              this.game_rules_js.add_ex(2 * this.offline_profit_ex);
              this.game_scene_js.create_tips_ui(this.game_scene_js.node, "double_offline_profit");
              this.unschedule(callback);
              this.node.destroy();
            } else null == this.ad_control.video_tag && 2 == this.ad_control.video_state && this.unschedule(callback);
          };
          this.schedule(callback, .2);
        }
      },
      on_share_button_click: function on_share_button_click() {
        this.sound_control.play_sound_effect("button_click");
        this.ad_control.manual_share("offline_profit");
      },
      onLoad: function onLoad() {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    user_data: "user_data"
  } ],
  option_ui: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e7d66DIIWdMjIN2cInCNNMh", "option_ui");
    "use strict";
    var user_data = require("user_data");
    cc.Class({
      extends: cc.Component,
      properties: {
        grandPa_node: cc.Node,
        sound_node_sprite: cc.Sprite,
        sound_frame_arr: [ cc.SpriteFrame ],
        progress_bar: cc.ProgressBar
      },
      ini_node: function ini_node() {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.ad_control.show_bannerAd();
        this.grandPa_node.scaleY = 0;
        this.progress_bar.node.active = false;
        this.click_count = 0;
        var sound_state = user_data.user_data.sound_state;
        this.sound_node_sprite.spriteFrame = 1 == sound_state ? this.sound_frame_arr[0] : this.sound_frame_arr[1];
        this.grandPa_anim();
      },
      grandPa_anim: function grandPa_anim() {
        cc.tween(this.grandPa_node).to(.3, {
          scaleY: 1
        }, {
          easing: "elasticOut"
        }).start();
      },
      on_sounde_button_click: function on_sounde_button_click() {
        this.sound_control.play_sound_effect("button_click");
        var sound_state = user_data.user_data.sound_state;
        if (1 == sound_state) {
          user_data.user_data.sound_state = 0;
          this.sound_node_sprite.spriteFrame = this.sound_frame_arr[1];
          this.sound_control.pause_all_sound();
        } else {
          user_data.user_data.sound_state = 1;
          this.sound_node_sprite.spriteFrame = this.sound_frame_arr[0];
          this.sound_control.resume_all_sound();
          this.sound_control.play_bg_sound("home_bg");
        }
      },
      on_grandPa_click: function on_grandPa_click() {
        this.sound_control.play_sound_effect("button_click");
        this.progress_bar.node.active = true;
        this.click_count++;
        this.progress_bar.progress = this.click_count / 10;
        if (1 == this.progress_bar.progress) {
          var random_num = Math.floor(5 * Math.random()) + 1;
          this.click_count = 0;
          this.progress_bar.progress = this.click_count / 10;
          for (var i = 0; i < random_num; i++) this.game_scene_js.create_gold_effect(this.grandPa_node, i, 1);
        }
      },
      on_novice_button_click: function on_novice_button_click() {
        this.sound_control.play_sound_effect("button_click");
        this.game_scene_js.create_novice_ui();
        this.touch_exit();
      },
      touch_exit: function touch_exit() {
        this.sound_control.play_sound_effect("button_exit");
        this.ad_control.hide_bannerAd();
        this.game_scene_js.on_node_kill(this.node);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    user_data: "user_data"
  } ],
  pet_ai: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "efa79vzd3ZKgqh8UQU3o35q", "pet_ai");
    "use strict";
    var _user_data = _interopRequireDefault(require("user_data"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var config = require("config");
    cc.Class({
      extends: cc.Component,
      properties: {
        body_node: cc.Node
      },
      change_movement_direction: function change_movement_direction() {
        var callback = function callback() {
          this.stop_move = false;
          var num = Math.floor(Math.random() * this.all_direction.length - 1) + 1;
          num < 0 && (num = 0);
          this.movement_direction = this.all_direction[num];
          this.anim_select();
        };
        this.schedule(callback, 3 * Math.random() + 2);
      },
      anim_select: function anim_select() {
        var anim = this.body_node.getComponent(cc.Animation);
        var anim_clips = anim.getClips();
        switch (this.movement_direction) {
         case "z_idle":
          anim.play(anim_clips[0].name);
          break;

         case "z_run":
          anim.play(anim_clips[1].name);
          break;

         case "b_idle":
          anim.play(anim_clips[2].name);
          break;

         case "b_run":
          anim.play(anim_clips[3].name);
          break;

         case "c_idle":
          anim.play(anim_clips[4].name);
          break;

         case "c_run_l":
          this.node.scaleX = 1;
          anim.play(anim_clips[5].name);
          break;

         case "c_run_r":
          this.node.scaleX = -1;
          anim.play(anim_clips[5].name);
        }
      },
      ai_move: function ai_move(dt) {
        var s = this.move_speed * dt;
        if (this.node.x <= -65 && false == this.stop_move) {
          this.stop_move = true;
          this.movement_direction = "c_run_r";
          this.anim_select();
        }
        if (this.node.x >= 65 && false == this.stop_move) {
          this.stop_move = true;
          this.movement_direction = "c_run_l";
          this.anim_select();
        }
        if (this.node.y >= 290 && false == this.stop_move) {
          this.stop_move = true;
          this.movement_direction = "z_run";
          this.anim_select();
        }
        if (this.node.y <= -529 && false == this.stop_move) {
          this.stop_move = true;
          this.movement_direction = "b_run";
          this.anim_select();
        }
        switch (this.movement_direction) {
         case "z_idle":
          s = 0;
          break;

         case "z_run":
          this.node.y -= s;
          break;

         case "b_idle":
          s = 0;
          break;

         case "b_run":
          this.node.y += s;
          break;

         case "c_idle":
          s = 0;
          break;

         case "c_run_l":
          this.node.x -= s;
          break;

         case "c_run_r":
          this.node.x += s;
        }
      },
      onCollisionStay: function onCollisionStay(other, self) {
        if (self.node.y >= other.node.y) {
          other.node.zIndex = 1;
          self.node.zIndex = 0;
        } else {
          other.node.zIndex = 0;
          self.node.zIndex = 1;
        }
      },
      create_profit: function create_profit() {
        switch (this.node.name) {
         case "rabbit":
          this.pet_index = 0;
          var produce_ex_time = config.pet[this.pet_index].produce_ex_time;
          var produce_ex = config.pet[this.pet_index].produce_ex;
          var callback = function callback() {
            var produce_ex = config.pet[this.pet_index].produce_ex;
            1 == _user_data["default"].user_data.pet[this.pet_index].have && this.game_rules_js.add_ex(produce_ex);
          };
          this.schedule(callback, produce_ex_time);
          break;

         case "rabbit2":
          this.pet_index = 1;
          var produce_ex_time = config.pet[this.pet_index].produce_ex_time;
          var produce_ex = config.pet[this.pet_index].produce_ex;
          var callback = function callback() {
            var produce_ex = config.pet[this.pet_index].produce_ex;
            1 == _user_data["default"].user_data.pet[this.pet_index].have && this.game_rules_js.add_ex(produce_ex);
          };
          this.schedule(callback, produce_ex_time);
          break;

         case "xiaoba":
          this.pet_index = 2;
          var produce_ex_time = config.pet[this.pet_index].produce_ex_time;
          var produce_ex = config.pet[this.pet_index].produce_ex;
          var callback = function callback() {
            1 == _user_data["default"].user_data.pet[this.pet_index].have && this.game_rules_js.add_ex(produce_ex);
          };
          this.schedule(callback, produce_ex_time);
          break;

         case "xiaoqi":
          this.pet_index = 3;
          var produce_ex_time = config.pet[this.pet_index].produce_ex_time;
          var produce_ex = config.pet[this.pet_index].produce_ex;
          var callback = function callback() {
            var produce_ex = config.pet[this.pet_index].produce_ex;
            1 == _user_data["default"].user_data.pet[this.pet_index].have && this.game_rules_js.add_ex(produce_ex);
          };
          this.schedule(callback, produce_ex_time);
        }
      },
      ini_node: function ini_node() {
        var randomX = 100 * (Math.random() > .5 ? 1 : -1);
        var randomY = 100 * (Math.random() > .5 ? 1 : -1);
        this.node.x = randomX;
        this.node.y = randomY;
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.all_direction = [ "z_idle", "z_run", "b_idle", "b_run", "c_idle", "c_run_l", "c_run_r" ];
        this.movement_direction = "z_idle";
        this.move_speed = 30;
        this.stop_move = false;
        this.create_profit();
      },
      onLoad: function onLoad() {
        this.ini_node();
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
      },
      start: function start() {
        this.change_movement_direction();
        this.anim_select();
      },
      update: function update(dt) {
        this.ai_move(dt);
      }
    });
    cc._RF.pop();
  }, {
    config: "config",
    user_data: "user_data"
  } ],
  pet_content: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "18de8zrDEZL84roo614WUE/", "pet_content");
    "use strict";
    var config = require("config");
    var user_data = require("user_data");
    cc.Class({
      extends: cc.Component,
      properties: {
        name_label: cc.Label,
        introduce_label: cc.Label,
        skill_introduce_label: cc.Label,
        progress: cc.ProgressBar,
        cultrue_button_node: cc.Node,
        button_frame_arr: [ cc.SpriteFrame ],
        pet_icon_arr: [ cc.SpriteFrame ],
        pet_sprite: cc.Sprite,
        share_label: cc.Node,
        button_buy: cc.Node,
        label_cost: cc.Label
      },
      ini_node: function ini_node(index) {
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.index = index;
        this.update_content();
      },
      update_content: function update_content() {
        this.pet_sprite.spriteFrame = this.pet_icon_arr[this.index];
        this.name_label.string = config.pet[this.index].name;
        this.introduce_label.string = config.pet[this.index].introduce;
        this.skill_introduce_label.string = config.pet[this.index].skill_introduce;
        this.label_cost.string = config.pet[this.index].cost;
        1 == user_data.user_data.pet[this.index].have && (this.button_buy.active = false);
      },
      on_cultrue_button_click: function on_cultrue_button_click() {
        this.sound_control.play_sound_effect("button_click");
        var share_count = user_data.user_data.pet[this.index].share_count;
        var share_max = config.pet[this.index].share_max;
        this.ad_control.manual_share("pet");
        this.share_succes();
      },
      video_succes: function video_succes() {
        if ("undefined" != typeof wx) {
          var callback = function callback() {
            if (1 == this.ad_control.video_state && "cultrue_pet" == this.ad_control.video_tag) {
              this.ad_control.video_tag = null;
              this.ad_control.video_state = 2;
              user_data.user_data.pet[this.index].have_ad++;
              if (user_data.user_data.pet[this.index].have_ad >= config.pet[this.index].need_ad) {
                user_data.user_data.pet[this.index].have = 1;
                this.game_rules_js.create_pet_a(this.index);
                this.game_scene_js.create_tips_ui(this.game_rules_js.node, "cultrue_succes");
              }
              this.update_content();
              this.game_scene_js.create_tips_ui(this.game_scene_js.node, "cultrue_pet_succes");
              this.unschedule(callback);
            } else null == this.ad_control.video_tag && 2 == this.ad_control.video_state && this.unschedule(callback);
          };
          this.schedule(callback, .1);
        }
      },
      buy_pet: function buy_pet() {
        var type = config.pet[this.index].type_buy;
        switch (type) {
         case "gold":
          if (user_data.user_data.gold >= config.pet[this.index].cost) {
            user_data.user_data.gold -= config.pet[this.index].cost;
            user_data.user_data.pet[this.index].have = 1;
            this.game_scene_js.create_pet(this.game_scene_js.node, this.index);
            this.button_buy.active = false;
          } else this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money_gold");
          this.update_content();
        }
      },
      share_succes: function share_succes() {
        var share_schedule = function share_schedule() {
          if ("share_succes" == this.ad_control.share_state && "pet" == this.ad_control.share_tag) {
            this.ad_control.ini_share();
            var now_time = new Date().getTime();
            if (1e3 * (now_time - user_data.user_data.pet[this.index].create_time) >= config.pet[this.index].stay_time) {
              user_data.user_data.pet[this.index].create_time = new Date().getTime();
              user_data.user_data.pet[this.index].have = 1;
              user_data.user_data.pet[this.index].share_count++;
              this.game_rules_js.create_pet_a(this.index);
              this.game_scene_js.create_tips_ui(this.game_rules_js.node, "cultrue_succes");
              this.update_content();
              this.unschedule(share_schedule);
            } else {
              this.unschedule(share_schedule);
              this.game_scene_js.create_tips_ui(this.game_scene_js.node, "pet_already_life");
            }
          } else "un_share" == this.ad_control.share_state && null == this.ad_control.share_tag && this.unschedule(share_schedule);
        };
        this.schedule(share_schedule, .2);
      },
      start: function start() {
        this.update_content();
      }
    });
    cc._RF.pop();
  }, {
    config: "config",
    user_data: "user_data"
  } ],
  pet_ui: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8490cizMe1PDbfuzcbu3dJI", "pet_ui");
    "use strict";
    var config = require("config");
    cc.Class({
      extends: cc.Component,
      properties: {
        pet_content_prefab: cc.Prefab,
        content_node: cc.Node
      },
      ini_node: function ini_node() {
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.ad_control.show_bannerAd();
      },
      create_pet_content: function create_pet_content() {
        var arr = Object.keys(config.pet);
        for (var i = 0; i < arr.length; i++) {
          var node = cc.instantiate(this.pet_content_prefab);
          node.parent = this.content_node;
          node.getComponent("pet_content").ini_node(i);
        }
      },
      touch_exit: function touch_exit() {
        this.sound_control.play_sound_effect("button_exit");
        this.ad_control.hide_bannerAd();
        this.game_scene_js.on_node_kill(this.node);
      },
      onLoad: function onLoad() {},
      start: function start() {
        this.create_pet_content();
      }
    });
    cc._RF.pop();
  }, {
    config: "config"
  } ],
  plant_ui: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f2d8fybXzpH55xj2230YIaA", "plant_ui");
    "use strict";
    var user_data = require("user_data");
    cc.Class({
      extends: cc.Component,
      properties: {
        icon_grop: cc.Node
      },
      ini_node: function ini_node(land_index) {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.land_group = cc.find("UI_ROOT/center/land_group");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.ad_control.show_bannerAd();
        this.set_icon();
        this.land_index = land_index;
      },
      on_touch_exit_click: function on_touch_exit_click() {
        this.sound_control.play_sound_effect("button_exit");
        this.ad_control.hide_bannerAd();
        this.game_scene_js.on_node_kill(this.node);
      },
      set_icon: function set_icon() {
        for (var i = 0; i < this.icon_grop.children.length; i++) 1 == user_data.user_data.plant[i].have ? this.icon_grop.children[i].active = true : this.icon_grop.children[i].active = false;
      },
      on_plant_click: function on_plant_click(e, plant_index) {
        this.sound_control.play_sound_effect("button_click");
        this.land_group.children[this.land_index].getComponent("land").plant(plant_index);
        this.on_touch_exit_click();
      },
      onLoad: function onLoad() {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    user_data: "user_data"
  } ],
  player_role: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b5a19zoFnJM1JpLizpjLrYq", "player_role");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        player_node: cc.Node,
        gift_node: cc.Node,
        gift_frame_arr: [ cc.SpriteFrame ]
      },
      change_movement_direction: function change_movement_direction() {
        var callback = function callback() {
          this.stop_move = false;
          var num = Math.floor(Math.random() * this.all_direction.length - 1) + 1;
          num < 0 && (num = 0);
          this.movement_direction = this.all_direction[num];
          this.anim_select();
        };
        this.schedule(callback, 3 * Math.random() + 2);
      },
      anim_select: function anim_select() {
        var anim = this.player_node.getComponent(cc.Animation);
        var anim_clips = anim.getClips();
        switch (this.movement_direction) {
         case "z_idle":
          anim.play(anim_clips[0].name);
          break;

         case "z_run":
          anim.play(anim_clips[1].name);
          break;

         case "b_idle":
          anim.play(anim_clips[2].name);
          break;

         case "b_run":
          anim.play(anim_clips[3].name);
          break;

         case "c_idle":
          anim.play(anim_clips[4].name);
          break;

         case "c_run_l":
          this.node.scaleX = 1;
          anim.play(anim_clips[5].name);
          break;

         case "c_run_r":
          this.node.scaleX = -1;
          anim.play(anim_clips[5].name);
        }
      },
      ai_move: function ai_move(dt) {
        var s = this.move_speed * dt;
        if (this.node.x <= -65 && false == this.stop_move) {
          this.stop_move = true;
          this.movement_direction = "c_run_r";
          this.anim_select();
        }
        if (this.node.x >= 65 && false == this.stop_move) {
          this.stop_move = true;
          this.movement_direction = "c_run_l";
          this.anim_select();
        }
        if (this.node.y >= 290 && false == this.stop_move) {
          this.stop_move = true;
          this.movement_direction = "z_run";
          this.anim_select();
        }
        if (this.node.y <= -529 && false == this.stop_move) {
          this.stop_move = true;
          this.movement_direction = "b_run";
          this.anim_select();
        }
        switch (this.movement_direction) {
         case "z_idle":
          s = 0;
          break;

         case "z_run":
          this.node.y -= s;
          break;

         case "b_idle":
          s = 0;
          break;

         case "b_run":
          this.node.y += s;
          break;

         case "c_idle":
          s = 0;
          break;

         case "c_run_l":
          this.node.x -= s;
          break;

         case "c_run_r":
          this.node.x += s;
        }
      },
      on_gift_button_click: function on_gift_button_click() {
        this.sound_control.play_sound_effect("button_click");
        var random_ex = Math.floor(10 * Math.random()) + 1;
        random_ex > 6 && (random_ex = 6);
        switch (this.gift_type) {
         case "ex":
          for (var i = 0; i < random_ex; i++) this.game_scene_js.create_ex_effect(this.gift_node, i);
          this.gift_type = null;
          this.gift_node.active = false;
          break;

         case "ad":
          this.gift_type = null;
          this.gift_node.active = false;
          this.game_scene_js.create_gift_ui(this.game_scene_js.node);
        }
      },
      ini_node: function ini_node() {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.all_direction = [ "z_idle", "z_run", "b_idle", "b_run", "c_idle", "c_run_l", "c_run_r" ];
        this.movement_direction = "z_idle";
        this.move_speed = 30;
        this.gift_node.active = false;
        this.gift_type = null;
        this.stop_move = false;
        this.create_gift();
      },
      create_gift: function create_gift() {
        var callback = function callback() {
          var random_num = Math.random();
          if (random_num > .5) {
            this.gift_type = "ex";
            this.gift_node.active = true;
            this.gift_node.getComponent(cc.Sprite).spriteFrame = this.gift_frame_arr[0];
          } else {
            this.gift_type = "ad";
            this.gift_node.active = true;
            this.gift_node.getComponent(cc.Sprite).spriteFrame = this.gift_frame_arr[1];
          }
          this.hide_gift();
        };
        this.schedule(callback, 30);
      },
      hide_gift: function hide_gift() {
        var callback = function callback() {
          this.gift_node.active = false;
          this.gift_type = null;
        };
        this.scheduleOnce(callback, 10);
      },
      onLoad: function onLoad() {
        this.ini_node();
      },
      start: function start() {
        this.change_movement_direction();
        this.anim_select();
      },
      update: function update(dt) {
        this.ai_move(dt);
      }
    });
    cc._RF.pop();
  }, {} ],
  push: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "426f4RYhtdK/I31Hz30Pjor", "push");
    "use strict";
    module.exports = {
      fishBit: {
        appid: "wx4b7acfd163e9ac94"
      }
    };
    cc._RF.pop();
  }, {} ],
  repo_ui: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1637eOv/SRBF4KWKqBY+U21", "repo_ui");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        lock: cc.Node,
        label: cc.Label,
        icon: cc.Node
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  rest_ui: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f51a5WLhfRJu7mTESWOcnKh", "rest_ui");
    "use strict";
    var user_data = require("user_data");
    cc.Class({
      extends: cc.Component,
      properties: {
        role_sprite: cc.Sprite,
        role_arr: [ cc.SpriteFrame ],
        center_node: cc.Node
      },
      ini_node: function ini_node(staff_index) {
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.ad_control.show_bannerAd();
        this.staff_index = staff_index;
        this.role_sprite.spriteFrame = this.role_arr[staff_index];
        this.center_node.scale = 0;
        this.ini_anim();
      },
      ini_anim: function ini_anim() {
        cc.tween(this.center_node).to(.3, {
          scale: 1
        }, {
          easing: "sineOut"
        }).start();
      },
      on_iwanna_button_click: function on_iwanna_button_click() {
        cc.log("create_ad");
        this.sound_control.play_sound_effect("button_click");
        this.ad_control.show_videoAd("staff_rest");
        this.video_succes();
      },
      on_touch_exit_click: function on_touch_exit_click(e) {
        this.node.destroy();
      },
      on_keep_rest_button_click: function on_keep_rest_button_click() {
        var _this = this;
        this.adsManager_js.showRewardedVideo(function() {
          var callback = function callback() {
            user_data.user_data.staff[this.staff_index].over_time = 0;
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "staff_rest_over");
            this.node.destroy();
          };
          _this.schedule(callback, .2);
        });
        this.node.destroy();
      },
      video_succes: function video_succes() {
        if ("undefined" != typeof wx) {
          var callback = function callback() {
            if (1 == this.ad_control.video_state && "staff_rest" == this.ad_control.video_tag) {
              this.ad_control.video_tag = null;
              this.ad_control.video_state = 2;
              user_data.user_data.staff[this.staff_index].over_time = 0;
              this.game_scene_js.create_tips_ui(this.game_scene_js.node, "staff_rest_over");
              this.unschedule(callback);
              this.ad_control.hide_bannerAd();
              this.node.destroy();
            } else null == this.ad_control.video_tag && 2 == this.ad_control.video_state && this.unschedule(callback);
          };
          this.schedule(callback, .2);
        }
      },
      onLoad: function onLoad() {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    user_data: "user_data"
  } ],
  sell_ui: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b3408LFwupOPKoN9Pojb+Zi", "sell_ui");
    "use strict";
    var user_data = require("user_data");
    var config = require("config");
    cc.Class({
      extends: cc.Component,
      properties: {
        box_frame_arr: [ cc.SpriteFrame ],
        icon_group_node: cc.Node,
        label_group_node: cc.Node,
        lock_group_node: cc.Node,
        confirm_button_node: cc.Node,
        sum_gold: 0,
        index: 0
      },
      ini_node: function ini_node() {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.ad_control.show_bannerAd();
        this.set_sell();
      },
      button_unlock_click: function button_unlock_click(e, custom) {
        this.node.children[2].active = false;
        this.node.children[3].active = true;
        this.show_comfirm_buy(custom);
      },
      show_comfirm_buy: function show_comfirm_buy(custom) {
        this.sum_gold = Number(0);
        for (var i = 0; i <= custom; i++) 0 == user_data.user_data.wareHouse[i].have && (this.sum_gold += user_data.user_data.wareHouse[i].cost);
        this.node.children[3].children[0].getComponent(cc.Label).string = "Do you want use " + this.sum_gold + " gold to buy new repository?";
        this.index = custom;
      },
      buy_repo: function buy_repo() {
        if (user_data.user_data.gold >= this.sum_gold) {
          for (var i = 0; i <= this.index; i++) {
            user_data.user_data.wareHouse[i].have = 1;
            this.lock_group_node.children[i].active = false;
            this.label_group_node.children[i].getComponent(cc.Label).string = "0/30";
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "unlocked_repo");
          }
          this.game_rules_js.add_gold(-this.sum_gold);
          this.touch_exit();
        } else {
          console.log(this.sum_gold + " sum_gold");
          this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money_gold");
        }
      },
      set_sell: function set_sell() {
        var all_capacity = 30;
        for (var i = 0; i < this.icon_group_node.children.length; i++) if (1 == user_data.user_data.wareHouse[i].have) {
          var count = user_data.user_data.wareHouse[i].count;
          this.label_group_node.children[i].getComponent(cc.Label).string = count + "/" + all_capacity;
          this.lock_group_node.children[i].active = false;
          if (count > 0) {
            var id_product = user_data.user_data.wareHouse[i].id_product;
            this.icon_group_node.children[i].getComponent(cc.Sprite).spriteFrame = this.box_frame_arr[id_product];
          } else this.icon_group_node.children[i].getComponent(cc.Sprite).spriteFrame = this.box_frame_arr[8];
        } else {
          this.label_group_node.children[i].getComponent(cc.Label).string = "";
          this.lock_group_node.children[i].active = true;
          this.icon_group_node.children[i].getComponent(cc.Sprite).SpriteFrame = this.box_frame_arr[8];
        }
      },
      touch_exit: function touch_exit() {
        if (false == this.node.children[2].active) {
          this.node.children[2].active = true;
          this.node.children[3].active = false;
        } else {
          this.sound_control.play_sound_effect("button_exit");
          this.ad_control.hide_bannerAd();
          this.game_scene_js.on_node_kill(this.node);
        }
      },
      set_estimate_label: function set_estimate_label() {
        var sum = 0;
        for (var i = 0; i < this.icon_group_node.children.length; i++) {
          var count = user_data.user_data.wareHouse[i].count;
          var sell = config.plant[i].sell;
          sum += count * sell;
        }
        this.estimate_label.string = "Expected to sell: " + sum;
      },
      on_sell_button_click: function on_sell_button_click() {
        this.sound_control.play_sound_effect("button_click");
        var sum = 0;
        for (var i = 0; i < this.icon_group_node.children.length; i++) {
          var count = user_data.user_data.wareHouse[i].count;
          var id_product = user_data.user_data.wareHouse[i].id_product;
          if (id_product > 7) continue;
          var sell = config.plant[id_product].sell;
          sum += count * sell;
        }
        if (0 == sum) this.game_scene_js.create_tips_ui(this.game_rules_js.node, "no_sell"); else {
          for (var j = 0; j < this.icon_group_node.children.length; j++) user_data.user_data.wareHouse[j].count = 0;
          this.game_scene_js.create_tips_ui(this.game_rules_js.node, "gold", sum);
          this.game_rules_js.add_gold(sum);
          this.set_sell();
        }
      },
      on_double_sell_button_click: function on_double_sell_button_click() {
        var _this = this;
        this.sound_control.play_sound_effect("button_click");
        this.adsManager_js.showRewardedVideo(function() {
          var sum = 0;
          for (var i = 0; i < _this.icon_group_node.children.length; i++) {
            var count = user_data.user_data.wareHouse[i].count;
            var id_product = user_data.user_data.wareHouse[i].id_product;
            if (id_product > 7) continue;
            var sell = config.plant[id_product].sell;
            sum += count * sell;
          }
          if (0 == sum) _this.game_scene_js.create_tips_ui(_this.game_rules_js.node, "no_sell"); else {
            for (var j = 0; j < _this.icon_group_node.children.length; j++) user_data.user_data.wareHouse[j].count = 0;
            _this.game_scene_js.create_tips_ui(_this.game_rules_js.node, "gold", sum);
            _this.game_rules_js.add_gold(sum);
            _this.set_sell();
          }
        });
      },
      video_succes: function video_succes() {
        if ("undefined" != typeof wx) {
          var callback = function callback() {
            if (1 == this.ad_control.video_state && "double_sell" == this.ad_control.video_tag) {
              this.ad_control.video_tag = null;
              this.ad_control.video_state = 2;
              var sum = 0;
              for (var i = 0; i < this.icon_group_node.children.length; i++) {
                var count = user_data.user_data.wareHouse[i].count;
                var sell = config.plant[i].sell;
                sum += count * sell;
              }
              for (var j = 0; j < this.icon_group_node.children.length; j++) user_data.user_data.wareHouse[j].count = 0;
              this.game_scene_js.create_tips_ui(this.game_rules_js.node, "gold", 2 * sum);
              this.game_rules_js.add_gold(2 * sum);
              this.set_sell();
              this.unschedule(callback);
            } else null == this.ad_control.video_tag && 2 == this.ad_control.video_state && this.unschedule(callback);
          };
          this.schedule(callback, .2);
        }
      },
      onLoad: function onLoad() {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    config: "config",
    user_data: "user_data"
  } ],
  shop_buy_ui: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0a0a9CsR95G0pgJYvQVl3KG", "shop_buy_ui");
    "use strict";
    var _user_data = _interopRequireDefault(require("user_data"));
    var _config = _interopRequireDefault(require("config"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        icon_sprite: cc.Sprite,
        introduce_label: cc.Label,
        introduce1_label: cc.Label,
        introduce2_label: cc.Label,
        introduce3_label: cc.Label,
        introduce4_label: cc.Label,
        buy_button: cc.Button,
        cost_label: cc.Label,
        price_difference_label: cc.Label,
        have_icon: cc.Node,
        star4_icon: cc.Node
      },
      ini_node: function ini_node(type, index, icon_frame) {
        this.type = type;
        this.index = index;
        this.icon_frame = icon_frame;
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.ad_car = null;
        this.price_difference_label.node.active = true;
        this.buy_button.node.active = true;
        this.update_node();
        this.create_ad_car();
      },
      update_node: function update_node() {
        this.icon_sprite.spriteFrame = this.icon_frame;
        var level = _user_data["default"].user_data.level;
        switch (this.type) {
         case "land":
          this.introduce4_label.node.active = false;
          this.star4_icon.active = false;
          if (level >= _config["default"].land[this.index].need_level) {
            this.introduce_label.string = "Additional planting area";
            this.introduce1_label.string = "More area to planting";
            this.introduce2_label.string = "Remember to water";
            this.introduce3_label.string = "Level " + _config["default"].land[this.index].need_level + " unlock";
            if (0 == _user_data["default"].user_data.land[this.index].have) {
              this.price_difference = _config["default"].land[this.index].cost - _user_data["default"].user_data.gold;
              this.cost_label.string = _config["default"].land[this.index].cost;
              this.have_icon.active = false;
              if (_user_data["default"].user_data.gold >= _config["default"].land[this.index].cost) {
                this.buy_button.interactable = true;
                this.price_difference_label.node.active = false;
              } else {
                this.buy_button.interactable = false;
                this.price_difference_label.string = "Not enough gold coins, not enough" + this.price_difference;
              }
            } else {
              this.have_icon.active = true;
              this.buy_button.node.active = false;
              this.price_difference_label.node.active = false;
            }
          } else {
            this.introduce_label.string = "???";
            this.introduce1_label.string = "???";
            this.introduce2_label.string = "???";
            this.introduce3_label.string = "Level " + _config["default"].land[this.index].need_level + " unlock";
            this.price_difference_label.node.active = false;
            this.cost_label.string = "???";
            this.buy_button.interactable = false;
            this.have_icon.active = false;
          }
          break;

         case "plant":
          this.introduce4_label.node.active = true;
          this.star4_icon.active = true;
          if (level >= _config["default"].plant[this.index].need_level) {
            this.introduce_label.string = _config["default"].plant[this.index].introduce;
            this.introduce1_label.string = "Sale value: " + _config["default"].plant[this.index].sell;
            this.introduce2_label.string = "Livespan: " + _config["default"].plant[this.index].grow_time + "second";
            this.introduce3_label.string = "Experience: " + _config["default"].plant[this.index].exp;
            this.introduce4_label.string = "Level " + _config["default"].plant[this.index].need_level + " unlock";
            if (0 == _user_data["default"].user_data.plant[this.index].have) {
              this.price_difference = _config["default"].plant[this.index].cost - _user_data["default"].user_data.gold;
              this.cost_label.string = _config["default"].plant[this.index].cost;
              this.have_icon.active = false;
              if (_user_data["default"].user_data.gold >= _config["default"].plant[this.index].cost) {
                this.buy_button.interactable = true;
                this.price_difference_label.node.active = false;
              } else {
                this.buy_button.interactable = false;
                this.price_difference_label.string = "Not enough gold coins, not enough" + this.price_difference;
              }
            } else {
              this.have_icon.active = true;
              this.buy_button.node.active = false;
              this.price_difference_label.node.active = false;
            }
          } else {
            this.introduce_label.string = "???";
            this.introduce1_label.string = "???";
            this.introduce2_label.string = "???";
            this.introduce3_label.string = "???";
            this.introduce4_label.string = "Level " + _config["default"].plant[this.index].need_level + " unlock";
            this.price_difference_label.node.active = false;
            this.cost_label.string = "???";
            this.buy_button.interactable = false;
            this.have_icon.active = false;
          }
        }
      },
      on_buy_button_click: function on_buy_button_click() {
        switch (this.type) {
         case "land":
          if (1 == _user_data["default"].user_data.land[this.index].have) return;
          if (_user_data["default"].user_data.gold >= _config["default"].land[this.index].cost) {
            this.sound_control.play_sound_effect("button_click");
            var cost = _config["default"].land[this.index].cost;
            this.game_rules_js.add_gold(-cost);
            _user_data["default"].user_data.land[this.index].have = 1;
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "buy_succes");
            this.game_rules_js.updata_land(this.index);
          } else {
            this.sound_control.play_sound_effect("un_click");
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money");
          }
          break;

         case "plant":
          if (1 == _user_data["default"].user_data.plant[this.index].have) return;
          if (_user_data["default"].user_data.gold >= _config["default"].plant[this.index].cost) {
            this.sound_control.play_sound_effect("button_click");
            var cost = _config["default"].plant[this.index].cost;
            this.game_rules_js.add_gold(-cost);
            _user_data["default"].user_data.plant[this.index].have = 1;
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "buy_succes");
          } else {
            this.sound_control.play_sound_effect("un_click");
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money");
          }
        }
        this.update_node();
      },
      update_schedule: function update_schedule() {
        var callback = function callback() {
          this.update_node();
        };
        this.schedule(callback, 1);
      },
      touch_exit: function touch_exit() {
        this.sound_control.play_sound_effect("button_exit");
        if (null !== this.ad_car) {
          cc.log("ad_car destroy");
          this.ad_car.destroy();
        }
        this.ad_control.hide_bannerAd();
        this.game_scene_js.on_node_kill(this.node);
      },
      create_ad_car: function create_ad_car() {
        switch (this.type) {
         case "land":
          if (1 == _user_data["default"].user_data.land[this.index].have) return;
          var gold = _user_data["default"].user_data.gold;
          var all_capacity = 500 * _user_data["default"].user_data.skill["gold_max"] + 500;
          var cost = _config["default"].land[this.index].cost;
          var price_difference = cost - gold;
          if (gold >= .8 * cost && all_capacity >= cost && gold < cost) {
            this.ad_control.hide_bannerAd();
            this.ad_car = this.game_scene_js.create_ad_car(this.node, price_difference);
          }
          break;

         case "plant":
          if (1 == _user_data["default"].user_data.plant[this.index].have) return;
          var gold = _user_data["default"].user_data.gold;
          var all_capacity = 500 * _user_data["default"].user_data.skill["gold_max"] + 500;
          var cost = _config["default"].plant[this.index].cost;
          var price_difference = cost - gold;
          if (gold >= .8 * cost && all_capacity >= cost && gold < cost) {
            this.ad_control.hide_bannerAd();
            this.ad_car = this.game_scene_js.create_ad_car(this.node, price_difference);
          }
        }
      },
      start: function start() {
        this.update_schedule();
      }
    });
    cc._RF.pop();
  }, {
    config: "config",
    user_data: "user_data"
  } ],
  shop_content: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e17f8TZG8BKRJjti9x3zL2L", "shop_content");
    "use strict";
    var _user_data = _interopRequireDefault(require("user_data"));
    var _config = _interopRequireDefault(require("config"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        name_label: cc.Label,
        cost_label: cc.Label,
        need_level_label: cc.Label,
        gold_icon_node: cc.Node,
        plant_icon_frame_arr: [ cc.SpriteFrame ],
        land_frame: cc.SpriteFrame,
        icon_sprite: cc.Sprite,
        have_icon_node: cc.Node,
        button_tips_node: cc.Node
      },
      ini_node: function ini_node(type, index) {
        this.index = index;
        this.type = type;
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.have_icon_node.active = false;
        this.button_tips_node.active = false;
        this.update_content();
        this.update_schedule();
      },
      update_schedule: function update_schedule() {
        this.schedule(this.update_content, .5);
      },
      update_content: function update_content() {
        var gold = _user_data["default"].user_data.gold;
        var level = _user_data["default"].user_data.level;
        switch (this.type) {
         case "land":
          this.name_label.string = _config["default"].land[this.index].name;
          this.icon_sprite.spriteFrame = this.land_frame;
          if (1 == _user_data["default"].user_data.land[this.index].have) {
            this.button_tips_node.active = false;
            this.cost_label.node.active = false;
            this.have_icon_node.active = true;
            this.need_level_label.node.active = false;
            this.gold_icon_node.active = false;
          } else {
            this.need_level_label.node.active = true;
            this.gold_icon_node.active = true;
            this.need_level_label.string = "Level " + _config["default"].land[this.index].need_level + " to unlock";
            level >= _config["default"].land[this.index].need_level ? this.cost_label.string = _config["default"].land[this.index].cost : this.cost_label.string = "???";
            level >= _config["default"].land[this.index].need_level && gold >= _config["default"].land[this.index].cost ? this.button_tips_node.active = true : this.button_tips_node.active = false;
          }
          break;

         case "plant":
          this.name_label.string = _config["default"].plant[this.index].name;
          this.icon_sprite.spriteFrame = this.plant_icon_frame_arr[this.index];
          if (1 == _user_data["default"].user_data.plant[this.index].have) {
            this.button_tips_node.active = false;
            this.cost_label.node.active = false;
            this.have_icon_node.active = true;
            this.need_level_label.node.active = false;
            this.gold_icon_node.active = false;
          } else {
            this.gold_icon_node.active = true;
            this.need_level_label.node.active = true;
            this.need_level_label.string = "Need " + _config["default"].plant[this.index].need_level + " level unlock";
            level >= _config["default"].plant[this.index].need_level ? this.cost_label.string = _config["default"].plant[this.index].cost : this.cost_label.string = "???";
            level >= _config["default"].plant[this.index].need_level && gold >= _config["default"].plant[this.index].cost ? this.button_tips_node.active = true : this.button_tips_node.active = false;
          }
        }
      },
      on_button_click: function on_button_click() {
        this.sound_control.play_sound_effect("button_click");
        this.game_scene_js.create_shop_buy_ui(this.type, this.index, this.icon_sprite.spriteFrame);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    config: "config",
    user_data: "user_data"
  } ],
  shop_ui: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fd3b91g9GpKVppYjN72hjJb", "shop_ui");
    "use strict";
    var user_data = require("user_data");
    var config = require("config");
    cc.Class({
      extends: cc.Component,
      properties: {
        scrollView_array: [ cc.Node ],
        shop_content_prefab: cc.Prefab,
        content_array: [ cc.Node ]
      },
      tab_select: function tab_select(e, index) {
        this.sound_control.play_sound_effect("button_click");
        for (var i = 0; i < this.scrollView_array.length; i++) this.scrollView_array[i].active = i == index;
      },
      ini_node: function ini_node() {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.ad_control.show_bannerAd();
      },
      create_shop_content: function create_shop_content() {
        var node = null;
        for (var i = 0; i < this.scrollView_array.length; i++) switch (i) {
         case 0:
          var arr = Object.keys(config.land);
          for (var j = 0; j < arr.length; j++) {
            node = cc.instantiate(this.shop_content_prefab);
            node.parent = this.content_array[i];
            node.getComponent("shop_content").ini_node("land", j);
          }
          break;

         case 1:
          var arr = Object.keys(config.plant);
          for (var j = 0; j < arr.length; j++) {
            node = cc.instantiate(this.shop_content_prefab);
            node.parent = this.content_array[i];
            node.getComponent("shop_content").ini_node("plant", j);
          }
        }
      },
      touch_exit: function touch_exit() {
        this.sound_control.play_sound_effect("button_exit");
        this.ad_control.hide_bannerAd();
        this.game_scene_js.on_node_kill(this.node);
      },
      start: function start() {
        this.create_shop_content();
      }
    });
    cc._RF.pop();
  }, {
    config: "config",
    user_data: "user_data"
  } ],
  skill_content: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7c496ymBi1J75GCQmvmEgyv", "skill_content");
    "use strict";
    var user_data = require("user_data");
    cc.Class({
      extends: cc.Component,
      properties: {
        name_frame: cc.Sprite,
        icon_frame: cc.Sprite,
        button_frame: cc.Sprite,
        level_label: cc.Label,
        introduce_label: cc.Label,
        progress: cc.ProgressBar,
        name_frame_arr: [ cc.SpriteFrame ],
        icon_frame_arr: [ cc.SpriteFrame ],
        button_frame_arr: [ cc.SpriteFrame ]
      },
      ini_node: function ini_node(skill_index) {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.skill_index = skill_index;
        this.set_content();
      },
      set_content: function set_content() {
        var gold_max = user_data.user_data.skill["gold_max"];
        var speed_the_cut = user_data.user_data.skill["speed_the_cut"];
        var water_saving = user_data.user_data.skill["water_saving"];
        var tool_improve = user_data.user_data.skill["tool_improve"];
        var labor_contract = user_data.user_data.skill["labor_contract"];
        var offline_profit = user_data.user_data.skill["offline_profit"];
        switch (this.skill_index) {
         case 0:
          this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
          this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
          this.button_frame.spriteFrame = this.button_frame_arr[0];
          this.introduce_label.string = "Max gold: " + (500 * gold_max + 500);
          this.level_label.string = "lv: " + gold_max;
          this.progress.progress = gold_max / 200;
          this.button_frame.node.active = !(gold_max >= 200);
          break;

         case 1:
          this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
          this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
          this.button_frame.spriteFrame = this.button_frame_arr[0];
          this.introduce_label.string = "Harvest plants faster " + (speed_the_cut + 1) + "%";
          this.level_label.string = "lv: " + speed_the_cut;
          this.progress.progress = speed_the_cut / 99;
          this.button_frame.node.active = !(speed_the_cut >= 99);
          break;

         case 2:
          this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
          this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
          this.button_frame.spriteFrame = this.button_frame_arr[0];
          this.introduce_label.string = "Plant growth consumes less resource " + (water_saving + 1) + "%";
          this.level_label.string = "lv: " + water_saving;
          this.progress.progress = water_saving / 99;
          this.button_frame.node.active = !(water_saving >= 99);
          break;

         case 3:
          this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
          this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
          this.button_frame.spriteFrame = this.button_frame_arr[0];
          this.introduce_label.string = "Faster planting " + (tool_improve + 1) + "%";
          this.level_label.string = "lv: " + tool_improve;
          this.progress.progress = tool_improve / 99;
          this.button_frame.node.active = !(tool_improve >= 99);
          break;

         case 4:
          this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
          this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
          this.button_frame.spriteFrame = this.button_frame_arr[0];
          this.introduce_label.string = "Extend worker hours " + (labor_contract + 1) + " \nseconds";
          this.level_label.string = "lv: " + labor_contract;
          this.progress.progress = labor_contract / 99;
          this.button_frame.node.active = !(labor_contract >= 99);
          break;

         case 5:
          this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
          this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
          this.button_frame.spriteFrame = this.button_frame_arr[0];
          this.introduce_label.string = "Extra every 5 minutes " + (offline_profit + 1) + " \ngold";
          this.level_label.string = "lv: " + offline_profit;
          this.progress.progress = offline_profit / 99;
          this.button_frame.node.active = !(offline_profit >= 99);
          break;

         default:
          return;
        }
      },
      update_button: function update_button() {
        user_data.user_data.skill_point > 0 ? this.button_frame.node.getComponent(cc.Button).interactable = true : this.button_frame.node.getComponent(cc.Button).interactable = false;
        var callback = function callback() {
          user_data.user_data.skill_point > 0 ? this.button_frame.node.getComponent(cc.Button).interactable = true : this.button_frame.node.getComponent(cc.Button).interactable = false;
          for (var i = 0; i < 6; i++) ;
        };
        this.schedule(callback, .5);
      },
      on_button_click: function on_button_click() {
        if (!(user_data.user_data.skill_point >= 1)) {
          this.sound_control.play_sound_effect("un_click");
          this.game_scene_js.create_tips_ui(this.game_rules_js.node, "no_skill_point");
          return;
        }
        user_data.user_data.skill_point--;
        switch (this.skill_index) {
         case 0:
          user_data.user_data.skill["gold_max"]++;
          this.game_rules_js.set_gold_progress();
          break;

         case 1:
          user_data.user_data.skill["speed_the_cut"]++;
          break;

         case 2:
          user_data.user_data.skill["water_saving"]++;
          break;

         case 3:
          user_data.user_data.skill["tool_improve"]++;
          break;

         case 4:
          user_data.user_data.skill["labor_contract"]++;
          break;

         case 5:
          user_data.user_data.skill["offline_profit"]++;
        }
        this.set_content();
        this.sound_control.play_sound_effect("button_click");
      },
      onLoad: function onLoad() {},
      start: function start() {
        this.update_button();
      }
    });
    cc._RF.pop();
  }, {
    user_data: "user_data"
  } ],
  sound_control: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e6dc0dAPTpJI6mvKxmIq3jL", "sound_control");
    "use strict";
    var user_data = require("user_data");
    cc.Class({
      extends: cc.Component,
      properties: {
        home_bg_sound: {
          type: cc.AudioClip,
          default: null
        },
        village_bg: {
          type: cc.AudioClip,
          default: null
        },
        button_click: {
          type: cc.AudioClip,
          default: null
        },
        main_button_click: {
          type: cc.AudioClip,
          default: null
        },
        un_click: {
          type: cc.AudioClip,
          default: null
        },
        level_up: {
          type: cc.AudioClip,
          default: null
        },
        add_ex: {
          type: cc.AudioClip,
          default: null
        },
        add_gold: {
          type: cc.AudioClip,
          default: null
        },
        button_exit: {
          type: cc.AudioClip,
          default: null
        },
        cut_over: {
          type: cc.AudioClip,
          default: null
        }
      },
      play_bg_sound: function play_bg_sound(name) {
        var sound_state = user_data.user_data.sound_state;
        if (0 == sound_state) {
          cc.audioEngine.pauseMusic();
          return;
        }
        this.stop_bg_sound();
        switch (name) {
         case "home_bg":
          cc.audioEngine.playMusic(this.home_bg_sound, true, 1);
          break;

         case "village_bg":
          cc.audioEngine.playMusic(this.village_bg, true, 1);
        }
      },
      stop_bg_sound: function stop_bg_sound() {
        cc.audioEngine.stopMusic();
      },
      stop_allEffects: function stop_allEffects() {
        cc.audioEngine.stopAllEffects();
      },
      pause_all_sound: function pause_all_sound() {
        cc.audioEngine.pauseAllEffects();
        cc.audioEngine.pauseMusic();
      },
      resume_all_sound: function resume_all_sound() {
        var sound_state = user_data.user_data.sound_state;
        if (0 == sound_state) return;
        cc.audioEngine.resumeMusic();
        cc.audioEngine.resumeAllEffects();
      },
      play_sound_effect: function play_sound_effect(name) {
        var sound_state = user_data.user_data.sound_state;
        if (0 == sound_state) {
          cc.audioEngine.pauseAllEffects();
          return;
        }
        switch (name) {
         case "button_click":
          cc.audioEngine.playEffect(this.button_click, false, 1);
          break;

         case "main_button_click":
          cc.audioEngine.playEffect(this.main_button_click, false, 1);
          break;

         case "button_exit":
          cc.audioEngine.playEffect(this.button_exit, false, 1);
          break;

         case "un_click":
          cc.audioEngine.playEffect(this.un_click, false, 1);
          break;

         case "level_up":
          cc.audioEngine.playEffect(this.level_up, false, 1);
          break;

         case "add_ex":
          cc.audioEngine.playEffect(this.add_ex, false, 1);
          break;

         case "add_gold":
          cc.audioEngine.playEffect(this.add_gold, false, 1);
          break;

         case "cut_over":
          cc.audioEngine.playEffect(this.cut_over, false, 1);
        }
      },
      ini_node: function ini_node() {
        cc.audioEngine.setMusicVolume(.3);
        cc.audioEngine.setEffectsVolume(.4);
      },
      onLoad: function onLoad() {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    user_data: "user_data"
  } ],
  staff_ai: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b811fwDSLVAXr6L4c6nddw8", "staff_ai");
    "use strict";
    var user_data = require("user_data");
    var config = require("config");
    cc.Class({
      extends: cc.Component,
      properties: {
        player_node: cc.Node,
        pupple_node: cc.Node,
        staff_node: cc.Node
      },
      change_movement_direction: function change_movement_direction() {
        var callback = function callback() {
          this.stop_move = false;
          if ("rest" == this.work_state) {
            var num = Math.floor(Math.random() * this.rest_direction.length - 1) + 1;
            num < 0 && (num = 0);
            this.movement_direction = this.rest_direction[num];
            this.anim_select();
          } else {
            var num = Math.floor(Math.random() * this.all_direction.length - 1) + 1;
            num < 0 && (num = 0);
            this.movement_direction = this.all_direction[num];
            this.anim_select();
          }
        };
        this.schedule(callback, 3 * Math.random() + 2);
      },
      anim_select: function anim_select() {
        var anim = this.player_node.getComponent(cc.Animation);
        var anim_clips = anim.getClips();
        switch (this.movement_direction) {
         case "z_idle":
          anim.play(anim_clips[0].name);
          break;

         case "c_idle":
          anim.play(anim_clips[1].name);
          break;

         case "c_run_l":
          this.node.scaleX = 1;
          anim.play(anim_clips[2].name);
          break;

         case "c_run_r":
          this.node.scaleX = -1;
          anim.play(anim_clips[2].name);
        }
      },
      ai_move: function ai_move(dt) {
        var s = this.move_speed * dt;
        if (this.node.x <= -150 && false == this.stop_move) {
          this.stop_move = true;
          this.movement_direction = "c_run_r";
          this.anim_select();
        }
        if (this.node.x >= 130 && false == this.stop_move) {
          this.stop_move = true;
          this.movement_direction = "c_run_l";
          this.anim_select();
        }
        switch (this.movement_direction) {
         case "z_idle":
         case "c_idle":
          s = 0;
          break;

         case "c_run_l":
          this.node.x -= s;
          break;

         case "c_run_r":
          this.node.x += s;
        }
      },
      auto_work: function auto_work() {
        var land_js = this.node.parent.getComponent("land");
        var land_index = land_js.land_index;
        var callback = function callback() {
          if ("work" != this.work_state) return;
          switch (user_data.user_data.land[land_index].land_state) {
           case "wait_cut":
            land_js.cut();
            break;

           case "grow":
            user_data.user_data.land[land_index].water_num <= 0 && land_js.water_charge();
            break;

           default:
            return;
          }
        };
        this.schedule(callback, .5, cc.macro.REPEAT_FOREVER);
      },
      work_schedule: function work_schedule() {
        this.work_state = "work";
        var work_time = config.staff[this.staff_index].work_time + user_data.user_data.skill["labor_contract"];
        var callback = function callback() {
          work_time--;
          if (work_time <= 0) {
            this.unschedule(callback);
            var now_time = new Date().getTime() / 1e3;
            user_data.user_data.staff[this.staff_index].over_time = now_time;
            this.rest_schedule();
          }
        };
        this.schedule(callback, 1, cc.macro.REPEAT_FOREVER);
      },
      on_staff_node_touch: function on_staff_node_touch() {
        this.sound_control.play_sound_effect("button_click");
        this.game_scene_js.create_rest_ui(this.game_scene_js.node, this.staff_index);
      },
      rest_schedule: function rest_schedule() {
        this.work_state = "rest";
        var callback = function callback() {
          if ("rest" == this.work_state) {
            this.staff_node.on("touchstart", this.on_staff_node_touch, this);
            this.pupple_node.on("touchstart", this.on_staff_node_touch, this);
            var now_time = new Date().getTime() / 1e3;
            var over_time = user_data.user_data.staff[this.staff_index].over_time;
            var rest_time = config.staff[this.staff_index].rest_time - user_data.user_data.trader.recipes;
            rest_time <= 0 && (rest_time = 0);
            if (0 == over_time) {
              this.work_schedule();
              this.pupple_node.active = false;
              this.unschedule(callback);
              return;
            }
            if (now_time - over_time >= rest_time) {
              this.pupple_node.active = false;
              this.unschedule(callback);
              this.work_schedule();
              this.staff_node.off("touchstart", this.on_staff_node_touch, this);
              this.pupple_node.on("touchstart", this.on_staff_node_touch, this);
            } else {
              this.work_state = "rest";
              this.pupple_node.active = true;
            }
          } else this.unschedule(callback);
        };
        this.schedule(callback, .5, cc.macro.REPEAT_FOREVER);
      },
      ini_node: function ini_node(staff_index) {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
        this.staff_index = staff_index;
        this.all_direction = [ "z_idle", "c_idle", "c_run_l", "c_run_r" ];
        this.rest_direction = [ "z_idle", "c_idle" ];
        this.movement_direction = "z_idle";
        this.move_speed = 30;
        this.stop_move = false;
        this.staff_state = null;
        this.work_state = null;
        this.node.setPosition(0, -140);
      },
      onLoad: function onLoad() {},
      start: function start() {
        this.change_movement_direction();
        this.anim_select();
        this.rest_schedule();
        this.auto_work();
      },
      update: function update(dt) {
        this.ai_move(dt);
      }
    });
    cc._RF.pop();
  }, {
    config: "config",
    user_data: "user_data"
  } ],
  staff_content: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b44e1RpeK5OAJ+zsWxB1ImR", "staff_content");
    "use strict";
    var user_data = require("user_data");
    var config = require("config");
    cc.Class({
      extends: cc.Component,
      properties: {
        icon_sprite: cc.Sprite,
        work_time_label: cc.Label,
        rest_time_label: cc.Label,
        cost_label: cc.Label,
        icon_frame_arr: [ cc.SpriteFrame ],
        buy_button: cc.Node,
        work_time_buff_label: cc.Label,
        rest_time_buff_label: cc.Label,
        employed_button: cc.Node,
        name_lable: cc.Label,
        introduce_label: cc.Label
      },
      ini_node: function ini_node(staff_index) {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.staff_index = staff_index;
        this.update_content();
      },
      update_content: function update_content() {
        this.icon_sprite.spriteFrame = this.icon_frame_arr[this.staff_index];
        this.work_time_label.string = "Active time:" + config.staff[this.staff_index].work_time + "seconds";
        this.rest_time_label.string = "Free time:" + config.staff[this.staff_index].rest_time + "seconds";
        this.name_lable.string = config.staff[this.staff_index].name;
        this.introduce_label.string = config.staff[this.staff_index].introduce;
        if (0 == user_data.user_data.skill["labor_contract"]) this.work_time_buff_label.node.active = false; else {
          this.work_time_buff_label.node.active = true;
          this.work_time_buff_label.string = "+" + user_data.user_data.skill["labor_contract"];
        }
        if (0 == user_data.user_data.trader["recipes"]) this.rest_time_buff_label.node.active = false; else {
          this.rest_time_buff_label.node.active = true;
          this.rest_time_buff_label.string = "-" + user_data.user_data.trader["recipes"];
        }
        this.cost_label.string = "Cost:" + config.staff[this.staff_index].cost;
        if (0 == user_data.user_data.staff[this.staff_index].have) {
          this.buy_button.active = true;
          this.employed_button.active = false;
        } else {
          this.buy_button.active = false;
          this.employed_button.active = true;
        }
      },
      on_buy_button_click: function on_buy_button_click() {
        if (user_data.user_data.gold >= config.staff[this.staff_index].cost) {
          user_data.user_data.gold -= config.staff[this.staff_index].cost;
          user_data.user_data.staff[this.staff_index].have = 1;
          this.game_rules_js.create_staff(this.staff_index);
          this.buy_button.active = false;
          this.sound_control.play_sound_effect("button_click");
          this.update_content();
        } else {
          this.sound_control.play_sound_effect("un_click");
          this.game_scene_js.create_tips_ui(this.game_rules_js.node, "no_money_gold");
        }
      },
      touch_exit: function touch_exit() {
        this.sound_control.play_sound_effect("button_exit");
        this.node.destroy();
      },
      create_ad_car: function create_ad_car() {
        if (1 == user_data.user_data.staff[this.staff_index].have) return;
        var gold = user_data.user_data.gold;
        var all_capacity = 500 * user_data.user_data.skill["gold_max"] + 500;
        var cost = config.staff[this.staff_index].cost;
        var price_difference = cost - gold;
        gold >= .8 * cost && all_capacity >= cost && gold < cost && this.ad_control.hide_bannerAd();
      },
      onLoad: function onLoad() {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    config: "config",
    user_data: "user_data"
  } ],
  staff_ui: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8c435CdPS9LHbOArU9nIMku", "staff_ui");
    "use strict";
    var _config = _interopRequireDefault(require("config"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var user_data = require("user_data");
    cc.Class({
      extends: cc.Component,
      properties: {
        staff_group_node: cc.Node,
        staff_content_prefab: cc.Prefab,
        have_tips_group: cc.Node,
        buy_tips_group: cc.Node
      },
      ini_node: function ini_node() {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.ad_control.show_bannerAd();
        this.update_buy_tips();
        this.set_icon();
      },
      set_icon: function set_icon() {
        for (var i = 0; i < this.staff_group_node.children.length; i++) if (1 == user_data.user_data.land[i].have) {
          this.staff_group_node.children[i].color = new cc.color(255, 255, 255);
          this.staff_group_node.children[i].getComponent(cc.Button).interactable = true;
          1 == user_data.user_data.staff[i].have && (this.have_tips_group.children[i].active = true);
        } else {
          this.staff_group_node.children[i].color = new cc.color(0, 0, 0);
          this.staff_group_node.children[i].getComponent(cc.Button).interactable = false;
          this.have_tips_group.children[i].active = false;
        }
      },
      update_buy_tips: function update_buy_tips() {
        var arr = Object.keys(user_data.user_data.land);
        for (var i = 0; i < arr.length; i++) 1 == user_data.user_data.land[i].have && user_data.user_data.gold >= _config["default"].staff[i].cost && 0 == user_data.user_data.staff[i].have ? this.buy_tips_group.children[i].active = true : this.buy_tips_group.children[i].active = false;
      },
      update_schedule: function update_schedule() {
        var callback = function callback() {
          this.update_buy_tips();
          this.set_icon();
        };
        this.schedule(callback, .5);
      },
      on_staff_click: function on_staff_click(e, staff_index) {
        this.sound_control.play_sound_effect("button_click");
        var node = cc.instantiate(this.staff_content_prefab);
        node.getComponent("staff_content").ini_node(staff_index);
        node.parent = this.node;
      },
      touch_exit: function touch_exit() {
        this.sound_control.play_sound_effect("button_exit");
        this.ad_control.hide_bannerAd();
        this.game_scene_js.on_node_kill(this.node);
      },
      onLoad: function onLoad() {},
      start: function start() {
        this.update_schedule();
      }
    });
    cc._RF.pop();
  }, {
    config: "config",
    user_data: "user_data"
  } ],
  study_ui: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "17b54SZhR1E8bfWvHiKAZPX", "study_ui");
    "use strict";
    var user_data = require("user_data");
    var skill_content = require("skill_content");
    cc.Class({
      extends: cc.Component,
      properties: {
        skill_group_node: cc.Node,
        skill_content_prefab: cc.Prefab,
        skill_point_label: cc.Label
      },
      ini_node: function ini_node() {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.ad_control.show_bannerAd();
        this.create_content();
      },
      create_content: function create_content() {
        if (0 != this.skill_group_node.children.length) return;
        var skill_arr = Object.keys(user_data.user_data.skill);
        for (var i = 0; i < skill_arr.length; i++) {
          var node = cc.instantiate(this.skill_content_prefab);
          node.parent = this.skill_group_node;
          node.getComponent("skill_content").ini_node(i);
        }
      },
      update_skill_point: function update_skill_point() {
        this.skill_point_label.string = user_data.user_data.skill_point;
        var callback = function callback() {
          this.skill_point_label.string = user_data.user_data.skill_point;
        };
        this.schedule(callback, .5, cc.macro.REPEAT_FOREVER);
      },
      on_touch_exit: function on_touch_exit() {
        this.ad_control.hide_bannerAd();
        this.sound_control.play_sound_effect("button_exit");
        this.game_scene_js.on_node_kill(this.node);
      },
      on_rest_skill_point_button_click: function on_rest_skill_point_button_click() {
        var _this = this;
        this.sound_control.play_sound_effect("button_click");
        this.adsManager_js.showRewardedVideo(function() {
          var level = user_data.user_data.level;
          var arr = Object.keys(user_data.user_data.skill);
          user_data.user_data.skill_point = level;
          var skill_arr = Object.keys(user_data.user_data.skill);
          for (var j = 0; j < arr.length; j++) "offline_profit" == arr[j] ? user_data.user_data.skill["offline_profit"] = 1 : user_data.user_data.skill[arr[j]] = 0;
          var gold_max = 500 * user_data.user_data.skill["gold_max"] + 500;
          user_data.user_data.gold > gold_max && (user_data.user_data.gold = gold_max);
          for (var i = 0; i < skill_arr.length; i++) _this.skill_group_node.children[i].getComponent("skill_content").ini_node(i);
          _this.game_scene_js.create_tips_ui(_this.game_scene_js.node, "skill_rest");
          _this.game_rules_js.set_gold_progress();
        });
      },
      video_succes: function video_succes() {
        if ("undefined" != typeof wx) {
          var callback = function callback() {
            if (1 == this.ad_control.video_state && "skill_rest" == this.ad_control.video_tag) {
              this.ad_control.video_tag = null;
              this.ad_control.video_state = 2;
              var level = user_data.user_data.level;
              var arr = Object.keys(user_data.user_data.skill);
              user_data.user_data.skill_point = level;
              var skill_arr = Object.keys(user_data.user_data.skill);
              for (var j = 0; j < arr.length; j++) "offline_profit" == arr[j] ? user_data.user_data.skill["offline_profit"] = 1 : user_data.user_data.skill[arr[j]] = 0;
              for (var i = 0; i < skill_arr.length; i++) this.skill_group_node.children[i].getComponent("skill_content").ini_node(i);
              this.game_scene_js.create_tips_ui(this.game_scene_js.node, "skill_rest");
              this.game_rules_js.set_gold_progress();
              this.unschedule(callback);
            } else null == this.ad_control.video_tag && 2 == this.ad_control.video_state && this.unschedule(callback);
          };
          this.schedule(callback, .2);
        }
      },
      onLoad: function onLoad() {},
      start: function start() {
        this.update_skill_point();
      }
    });
    cc._RF.pop();
  }, {
    skill_content: "skill_content",
    user_data: "user_data"
  } ],
  tips_ui: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "15751deW4pCXaxc+NoBZAzf", "tips_ui");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        label: cc.Label,
        floor_node: cc.Node,
        icon_frame: cc.Sprite,
        icon_frame_arr: [ cc.SpriteFrame ]
      },
      ini_node: function ini_node(type, num) {
        this.floor_node.y = 395;
        this.floor_node.opacity = 255;
        switch (type) {
         case "gold":
          this.label.string = "Gold+" + num;
          this.icon_frame.spriteFrame = this.icon_frame_arr[0];
          break;

         case "pet_leave":
          this.label.string = "Gone";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "videotape_no_time":
          this.label.string = "Screen recording time should be more than 3 seconds";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "videotape_share_fail":
          this.label.string = "Screen recording and sharing failed~";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "videotape_share_succes":
          this.label.string = "Screen recording and sharing success!";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "videotape_start":
          this.label.string = "Screen recording started";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "vidotape_cancel":
          this.label.string = "Screen recording has been reset";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "vidotape_over":
          this.label.string = "Screen recording has ended";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "video_exit":
          this.label.string = "Watch the full video~";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "video_wait":
          this.label.string = "Ad break~~";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "no_sell":
          this.label.string = "Nothing to sell";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "no_money_gold":
          this.label.string = "Gold not enought";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "no_money_diamond":
          this.label.string = "Diamond not enought";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "no_level":
          this.label.string = "Level not enought";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "no_skill_point":
          this.label.string = "Skill point not enought";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "empoly_succes":
          this.label.string = "Hire success";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "buy_succes":
          this.label.string = "Successful purchase";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "get_offline_profit":
          this.label.string = "Receive offline earnings";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "cultrue_succes":
          this.label.string = "Adoption is successful";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "un_develop":
          this.label.string = "Not unlocked yet";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "share_succes":
          this.label.string = "Share success";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "pet_already_life":
          this.label.string = "Pet already exists~";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "share_fail":
          this.label.string = "Try sharing again~";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "double_offline_profit":
          this.label.string = "Successfully receive double rewards";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "cultrue_pet_succes":
          this.label.string = "Increased pet favorability";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "staff_rest_over":
          this.label.string = "Work faster!";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "skill_rest":
          this.label.string = "Skill has been reset";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "gift_ad_ex":
          this.label.string = "Gain a lot of experience";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "gold_full":
          this.label.string = "Can't hold more coins!";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "gift_ad_level":
          this.label.string = "Level up!";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "share_max":
          this.label.string = "Reached today's limit~";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "unlocked_repo":
          this.label.string = "Unlocked this repository";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
          break;

         case "no_video_today":
          this.label.string = "Out of video view";
          this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        }
        this.end_anim();
      },
      end_anim: function end_anim() {
        var _this = this;
        cc.tween(this.floor_node).delay(1).to(.3, {
          y: this.floor_node.y + 150,
          opacity: 0
        }, {
          easing: "sineOut"
        }).call(function() {
          _this.game_scene_js.on_node_kill(_this.node);
        }).start();
      },
      onLoad: function onLoad() {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  use_reversed_rotateBy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "55000PxB3ZFp59VqLmnCjkI", "use_reversed_rotateBy");
    "use strict";
    cc.RotateBy._reverse = true;
    cc._RF.pop();
  }, {} ],
  "use_v2.1-2.2.1_cc.Toggle_event": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ffb59ZN+lRFnYhL1RbR6HcJ", "use_v2.1-2.2.1_cc.Toggle_event");
    "use strict";
    cc.Toggle && (cc.Toggle._triggerEventInScript_isChecked = true);
    cc._RF.pop();
  }, {} ],
  user_data: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "65eace6nBJP0Zhj60rjCfIY", "user_data");
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var user_data = {
      save_date: 0,
      novice: 0,
      gold: 0,
      diamond: 0,
      level: 1,
      now_ex: 0,
      wareHouse_level: 1,
      skill_point: 1,
      login_time: 0,
      sound_state: 1,
      hotel_cache_gold: 0,
      videotape_share_count: 0,
      watch_video: 0,
      auto_sell: 0,
      staff: {
        0: {
          have: 0,
          over_time: 0
        },
        1: {
          have: 0,
          over_time: 0
        },
        2: {
          have: 0,
          over_time: 0
        },
        3: {
          have: 0,
          over_time: 0
        },
        4: {
          have: 0,
          over_time: 0
        },
        5: {
          have: 0,
          over_time: 0
        }
      },
      skill: {
        gold_max: 0,
        speed_the_cut: 0,
        water_saving: 0,
        tool_improve: 0,
        labor_contract: 0,
        offline_profit: 1
      },
      pet: {
        0: {
          have: 0,
          have_ad: 0
        },
        1: {
          have: 0,
          have_ad: 0
        },
        2: {
          have: 0,
          have_ad: 1,
          create_time: 0,
          share_count: 0
        },
        3: {
          have: 0,
          have_ad: 1,
          create_time: 0,
          share_count: 0
        }
      },
      trader: {
        recipes: 0
      },
      land: {
        0: {
          land_state: "wait_till",
          have: 1,
          plant_type: 0,
          alive_stage: 0,
          water_num: 50,
          have_water: 1
        },
        1: {
          land_state: "wait_till",
          have: 0,
          plant_type: 0,
          alive_stage: 0,
          water_num: 50,
          have_water: 1
        },
        2: {
          land_state: "wait_till",
          have: 0,
          plant_type: 0,
          alive_stage: 0,
          water_num: 50,
          have_water: 1
        },
        3: {
          land_state: "wait_till",
          have: 0,
          plant_type: 0,
          alive_stage: 0,
          water_num: 50,
          have_water: 1
        },
        4: {
          land_state: "wait_till",
          have: 0,
          plant_type: 0,
          alive_stage: 0,
          water_num: 50,
          have_water: 1
        },
        5: {
          land_state: "wait_till",
          have: 0,
          plant_type: 0,
          alive_stage: 0,
          water_num: 50,
          have_water: 1
        }
      },
      wareHouse: {
        0: {
          have: 1,
          type_bye: "gold",
          cost: 0,
          id_product: 8,
          count: 0
        },
        1: {
          have: 1,
          type_bye: "gold",
          cost: 0,
          id_product: 8,
          count: 0
        },
        2: {
          have: 1,
          type_bye: "gold",
          cost: 0,
          id_product: 8,
          count: 0
        },
        3: {
          have: 0,
          type_bye: "gold",
          cost: 5e3,
          id_product: 8,
          count: 0
        },
        4: {
          have: 0,
          type_bye: "gold",
          cost: 15e3,
          id_product: 8,
          count: 0
        },
        5: {
          have: 0,
          type_bye: "gold",
          cost: 3e4,
          id_product: 8,
          count: 0
        },
        6: {
          have: 0,
          type_bye: "gold",
          cost: 6e4,
          id_product: 8,
          count: 0
        },
        7: {
          have: 0,
          type_bye: "gold",
          cost: 1e5,
          id_product: 8,
          count: 0
        },
        8: {
          have: 0,
          type_bye: "gold",
          cost: 1e5,
          id_product: 8,
          count: 0
        },
        9: {
          have: 0,
          type_bye: "gold",
          cost: 1e5,
          id_product: 8,
          count: 0
        },
        10: {
          have: 0,
          type_bye: "gold",
          cost: 1e5,
          id_product: 8,
          count: 0
        },
        11: {
          have: 0,
          type_bye: "gold",
          cost: 1e5,
          id_product: 8,
          count: 0
        },
        12: {
          have: 0,
          type_bye: "gold",
          cost: 1e5,
          id_product: 8,
          count: 0
        },
        13: {
          have: 0,
          type_bye: "gold",
          cost: 1e5,
          id_product: 8,
          count: 0
        },
        14: {
          have: 0,
          type_bye: "gold",
          cost: 1e5,
          id_product: 8,
          count: 0
        },
        15: {
          have: 0,
          type_bye: "gold",
          cost: 1e5,
          id_product: 8,
          count: 0
        },
        16: {
          have: 0,
          type_bye: "gold",
          cost: 1e5,
          id_product: 8,
          count: 0
        },
        17: {
          have: 0,
          type_bye: "gold",
          cost: 1e5,
          id_product: 8,
          count: 0
        },
        18: {
          have: 0,
          type_bye: "gold",
          cost: 1e5,
          id_product: 8,
          count: 0
        },
        19: {
          have: 0,
          type_bye: "gold",
          cost: 1e5,
          id_product: 8,
          count: 0
        }
      },
      plant: {
        0: {
          have: 1
        },
        1: {
          have: 0
        },
        2: {
          have: 0
        },
        3: {
          have: 0
        },
        4: {
          have: 0
        },
        5: {
          have: 0
        },
        6: {
          have: 0
        },
        7: {
          have: 0
        }
      },
      hotel: {
        0: {
          have: 0,
          start_time: 0
        },
        1: {
          have: 0,
          start_time: 0
        },
        2: {
          have: 0,
          start_time: 0
        },
        3: {
          have: 0,
          start_time: 0
        }
      }
    };
    var _default = {
      user_data: user_data
    };
    exports["default"] = _default;
    module.exports = exports["default"];
    cc._RF.pop();
  }, {} ],
  videotape_ui: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "21fcbTbnSlBMYEA/XQyYuG5", "videotape_ui");
    "use strict";
    var _user_data = _interopRequireDefault(require("user_data"));
    var _config = _interopRequireDefault(require("config"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        gold_lable: cc.Label,
        ex_label: cc.Label,
        tips_label: cc.Label,
        button_frame: cc.Sprite,
        button_frame_arr: [ cc.SpriteFrame ],
        purse_node: cc.Node,
        ex_node: cc.Node,
        delete_button: cc.Button
      },
      ini_node: function ini_node() {
        this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.ad_control = cc.find("ad_control").getComponent("ad_control");
        this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
        this.ad_control.show_bannerAd();
        this.add_gold = Math.floor((500 * _user_data["default"].user_data.skill["gold_max"] + 500) / 20) + 1;
        this.add_ex = Math.floor(_user_data["default"].user_data.level / 10) + 1;
        if (null == this.game_rules_js.videotape_path) {
          this.button_frame.spriteFrame = this.button_frame_arr[0];
          this.delete_button.node.active = false;
        } else {
          this.button_frame.spriteFrame = this.button_frame_arr[1];
          this.delete_button.node.active = true;
        }
        this.gold_lable.string = "+" + this.add_gold;
        this.ex_label.string = "+" + this.add_ex;
        var today = new Date();
        _user_data["default"].user_data.save_date == today.getDate() ? this.tips_label.string = "Watched: " + _user_data["default"].user_data.watch_video + "/3" : this.tips_label.string = "Watched: 0/3";
      },
      on_button_click: function on_button_click() {
        var _this = this;
        var today = new Date();
        today.getDate() == _user_data["default"].user_data.save_date && _user_data["default"].user_data.watch_video < 3 ? this.adsManager_js.showRewardedVideo(function() {
          _user_data["default"].user_data.watch_video++;
          _this.tips_label.string = "Watched: " + _user_data["default"].user_data.watch_video + "/3";
          _user_data["default"].user_data.save_date = today.getDate();
          _this.game_rules_js.add_gold(Math.floor((500 * _user_data["default"].user_data.skill["gold_max"] + 500) / 20) + 1);
          _this.game_rules_js.add_ex(Math.floor(_user_data["default"].user_data.level / 10) + 1);
        }) : today.getDate() != _user_data["default"].user_data.save_date ? this.adsManager_js.showRewardedVideo(function() {
          watch_video = 1;
          _this.tips_label.string = "Watched: " + _user_data["default"].user_data.watch_video + "/3";
          _user_data["default"].user_data.save_date = today.getDate();
        }) : this.game_scene_js.create_tips_ui(this.game_rules_js.node, "no_video_today");
      },
      on_delete_button_click: function on_delete_button_click() {
        this.game_rules_js.videotape_path = null;
        this.game_scene_js.create_tips_ui(this.game_rules_js.node, "vidotape_cancel");
        this.ini_node();
      },
      video_share: function video_share() {
        var _this2 = this;
        if ("undefined" !== typeof wx) {
          if (null == this.game_rules_js.videotape_path) return;
          var self = this;
          wx.shareAppMessage({
            channel: "video",
            title: "On-Hook Small Farm",
            extra: {
              videoPath: this.game_rules_js.videotape_path,
              videoTopics: [ "On-Hook Small Farm", "Game" ]
            },
            success: function success() {
              console.log("\u5f55\u5c4f\u5206\u4eab\u6210\u529f");
              self.videotape_share_succes();
            },
            fail: function fail() {
              console.log("\u5f55\u5c4f\u5206\u4eab\u5931\u8d25", _this2.videotape_path);
              self.videotape_share_fail();
            }
          });
        }
      },
      videotape_share_fail: function videotape_share_fail() {
        this.game_scene_js.create_tips_ui(this.node.parent, "videotape_share_fail");
        this.ini_node();
      },
      touch_exit: function touch_exit() {
        this.sound_control.play_sound_effect("button_exit");
        this.ad_control.hide_bannerAd();
        this.game_scene_js.on_node_kill(this.node);
      },
      add_gold_video: function add_gold_video() {
        this.game_rules_js.add_gold(Math.floor((500 * _user_data["default"].user_data.skill["gold_max"] + 500) / 20) + 1);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    config: "config",
    user_data: "user_data"
  } ],
  videotape: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2983a+AxmZFuJqZEOMBqVE/", "videotape");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "use_reversed_rotateBy", "use_v2.1-2.2.1_cc.Toggle_event", "AdsManager", "pet_ai", "player_role", "staff_ai", "config", "push", "videotape", "ad_control", "sound_control", "ad_car", "light", "fx", "game_rules", "game_scene", "loading_scene", "button_more", "gift_ui", "hotel_ui", "land", "novice_ui", "offline_profit", "option_ui", "pet_content", "pet_ui", "plant_ui", "repo_ui", "rest_ui", "sell_ui", "shop_buy_ui", "shop_content", "shop_ui", "skill_content", "staff_content", "staff_ui", "study_ui", "tips_ui", "videotape_ui", "user_data" ]);