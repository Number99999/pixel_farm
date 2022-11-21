
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/game_rules.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '08dfeTU1M9Ca7/bd1L8hzMt', 'game_rules');
// script/game_rules.js

"use strict";

var _fx = _interopRequireDefault(require("fx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var user_data = require("user_data");

var config = require("config");

var push = require("push");

cc.Class({
  "extends": cc.Component,
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
    staff_prefab_arr: [cc.Prefab],
    wareHouse_node: cc.Node,
    main_camera: cc.Node,
    tips_group_node: cc.Node,
    button_group_node: cc.Node,
    hotel_produce_node: cc.Node,
    videotape_button: cc.Node,
    videotape_button_arr: [cc.SpriteFrame]
  },
  //浇水按钮被点击
  on_watering_button_click: function on_watering_button_click() {
    this.sound_control.play_sound_effect("main_button_click");
    var node = this.game_scene_js.create_button_group(this.center_node);
    node.zIndex = 3;

    if (node != null) {
      node.getComponent("button_more").ini_node("watering");
    }

    ;
  },
  //耕地按钮被点击
  on_till_button_click: function on_till_button_click() {
    this.sound_control.play_sound_effect("main_button_click");
    var node = this.game_scene_js.create_button_group(this.center_node);
    node.zIndex = 3;

    if (node != null) {
      node.getComponent("button_more").ini_node("till");
    }

    ;
  },
  //学习按钮被点击
  on_study_button_click: function on_study_button_click() {
    this.sound_control.play_sound_effect("main_button_click");
    var node = this.game_scene_js.create_study_ui(this.node);

    if (node != null) {
      node.getComponent("study_ui").ini_node();
    }

    ;
  },
  //home 被点击时
  on_home_button_click: function on_home_button_click() {
    this.sound_control.play_sound_effect("button_click");
    this.game_scene_js.create_option_ui();
  },
  //宠物按钮被点击
  on_pet_button_click: function on_pet_button_click() {
    // this.sound_control.play_sound_effect("main_button_click");
    var node = this.game_scene_js.create_pet_ui(this.node);

    if (node != null) {
      node.getComponent("pet_ui").ini_node();
    }

    ;
  },
  //旅馆按钮被点击
  on_hotel_button_click: function on_hotel_button_click() {
    this.sound_control.play_sound_effect("button_click");
    this.game_scene_js.create_hotel_ui();
  },
  //雇佣员工
  on_staff_button_click: function on_staff_button_click() {
    this.sound_control.play_sound_effect("main_button_click");
    var node = this.game_scene_js.create_staff_ui(this.node);

    if (node != null) {
      node.getComponent("staff_ui").ini_node();
    }

    ;
  },
  //生成土地
  create_land: function create_land() {
    var arr = Object.keys(user_data.user_data.land);

    for (var i = 0; i < arr.length; i++) {
      var node = cc.instantiate(this.land_prefab);
      node.parent = this.land_group_node;
      node.getComponent("land").ini_node(i);
    }

    ;
  },
  //创建玩家小人
  create_player: function create_player() {
    var node = cc.instantiate(this.player_prefab);
    node.parent = this.center_node;
  },
  //创建佣人
  create_staff: function create_staff(staff_index) {
    if (staff_index == null) {
      var arr = Object.keys(user_data.user_data.staff);

      for (var i = 0; i < arr.length; i++) {
        if (user_data.user_data.staff[i].have == 1) {
          var node = cc.instantiate(this.staff_prefab_arr[i]);
          node.parent = this.land_group_node.children[i];
          node.getComponent("staff_ai").ini_node(i);
        } else {
          return;
        }

        ;
      }

      ;
    } else {
      var node = cc.instantiate(this.staff_prefab_arr[staff_index]);
      node.parent = this.land_group_node.children[staff_index];
      node.getComponent("staff_ai").ini_node(staff_index);
    }

    ;
  },
  //刷新金币数
  add_gold: function add_gold(num) {
    if (this.add_gold_anim == 0) {
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

          if (user_data.user_data.gold < 0) {
            user_data.user_data.gold = 0;
          }

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

        ;
      };

      this.schedule(callback, 0.03);
    } else {
      user_data.user_data.gold += num;
    }

    ;
  },
  add_diamond: function add_diamond(num) {
    user_data.user_data.diamond += num;
  },
  //刷新ex数
  add_ex: function add_ex(num) {
    if (this.add_ex_anim == 0) {
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
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "gift_ad_level"); // show notic level up
          }

          this.unschedule(callback);
          this.set_ex_progress();
          this.add_ex_anim = 0;
        }

        ;
      };

      this.schedule(callback, 0.05);
    } else {
      user_data.user_data.now_ex += num;
    }

    ;
  },
  set_gold_progress: function set_gold_progress() {
    var gold = user_data.user_data.gold;
    var gold_max = 500 * user_data.user_data.skill["gold_max"] + 500;
    this.gold_label.string = gold + "/" + gold_max;
    cc.tween(this.gold_progress_node).to(0.3, {
      progress: gold / gold_max
    }).start();
  },
  set_ex_progress: function set_ex_progress() {
    var now_ex = user_data.user_data.now_ex;
    var next_ex = 2 * user_data.user_data.level;
    this.level_label.string = user_data.user_data.level;
    this.ex_label.string = now_ex + "/" + next_ex;
    cc.tween(this.ex_progress_node).to(0.3, {
      progress: now_ex / next_ex
    }).start();
  },
  //仓库被点击
  on_wareHouse_click: function on_wareHouse_click() {
    this.sound_control.play_sound_effect("button_click");
    var node = this.game_scene_js.create_sell_ui(this.node);

    if (node != null) {
      node.getComponent("sell_ui").ini_node();
    }

    ;
  },
  //仓库已满
  wareHouse_full: function wareHouse_full() {
    //
    this.wareHouse_shcedule = function () {
      var arr = Object.keys(user_data.user_data.wareHouse);
      var all_capacity = user_data.user_data.wareHouse_level * config.wareHouse["all_capacity"];

      for (var i = 0; i < arr.length; i++) {
        if (user_data.user_data.wareHouse[i].count >= all_capacity) {
          this.wareHouse_node.getChildByName("wareHouse_full").active = true;
          return;
        } else {
          this.wareHouse_node.getChildByName("wareHouse_full").active = false;
        }

        ;
      }

      ;
    };

    this.schedule(this.wareHouse_shcedule, 0.1);
  },
  //果园被点击
  on_orchard_button_click: function on_orchard_button_click() {
    // this.sound_control.play_bg_sound("village_bg");
    this.sound_control.play_sound_effect("un_click");
    this.game_scene_js.create_tips_ui(this.node, "un_develop");
  },
  //自动存档
  auto_save: function auto_save() {
    var callback = function callback() {
      _fx["default"].save();
    };

    this.schedule(callback, 1, cc.macro.REPEAT_FOREVER);
  },
  //刷新土地
  updata_land: function updata_land(land_index) {
    //初始化土地状态
    this.land_group_node.children[land_index].getComponent("land").ini_node(land_index);
  },
  //记录上线时间
  save_login_time: function save_login_time() {
    if (user_data.user_data.login_time == 0) {
      user_data.user_data.login_time = new Date().getTime();
    }

    ;
  },
  //创建离线收益ui
  offline_profit_ui: function offline_profit_ui() {
    var login_time = user_data.user_data.login_time;
    var now_time = new Date().getTime();
    var min = Math.floor((now_time - login_time) / (1000 * 60));

    if (min >= 5) {
      this.game_scene_js.create_offline_profit_ui(this.node);
    } else {
      return;
    }

    ;
  },
  //互推按钮被点击
  // on_push_button_click: function (e, name) {
  //     if (typeof (wx) !== "undefined") {
  //         wx.navigateToMiniProgram({
  //             appId: push[name].appid,
  //             path: '',
  //             success(res) {
  //                 // 打开成功
  //             }
  //         })
  //     };
  // },
  //商店按钮被点击
  on_shop_button_click: function on_shop_button_click() {
    this.sound_control.play_sound_effect("button_click");
    this.game_scene_js.create_shop_ui();
  },
  on_iap_button_click: function on_iap_button_click() {
    this.sound_control.play_sound_effect("button_click");
    this.game_scene_js.create_iap_ui();
  },
  //创建新手引导
  create_novice: function create_novice() {
    if (user_data.user_data.novice == 0) {
      this.game_scene_js.create_novice_ui();
      user_data.user_data.novice = 1;
    }

    ;
  },
  //创建按钮提示
  create_button_tips: function create_button_tips() {
    for (var i = 0; i < this.button_group_node.children.length; i++) {
      this.game_scene_js.create_button_tips(this.tips_group_node, this.button_group_node.children[i].position);
    }

    ;
    this.study_ui_tips();
    this.staff_ui_tips();
    this.shop_ui_tips();
  },
  //购买商品提示
  shop_ui_tips: function shop_ui_tips() {
    this.shop_ui_callback = function () {
      var land_arr = Object.keys(user_data.user_data.land);
      var plant_arr = Object.keys(user_data.user_data.plant);
      var gold = user_data.user_data.gold;
      var level = user_data.user_data.level;

      for (var i = 0; i < land_arr.length; i++) {
        if (gold >= config.land[i].cost && level >= config.land[i].need_level && user_data.user_data.land[i].have == 0) {
          this.tips_group_node.children[0].active = true;
          return;
        } else {
          this.tips_group_node.children[0].active = false;
        }

        ;
      }

      ;

      for (var j = 0; j < plant_arr.length; j++) {
        if (gold >= config.plant[j].cost && level >= config.plant[j].need_level && user_data.user_data.plant[j].have == 0) {
          this.tips_group_node.children[0].active = true;
          return;
        } else {
          this.tips_group_node.children[0].active = false;
        }

        ;
      }

      ;
    };

    this.schedule(this.shop_ui_callback, 1);
  },
  //加点提示
  study_ui_tips: function study_ui_tips() {
    this.stduy_tips_callback = function () {
      var skill_point = user_data.user_data.skill_point;

      if (skill_point > 0) {
        this.tips_group_node.children[1].active = true;
      } else {
        //技能点不足不提示
        this.tips_group_node.children[1].active = false;
      }

      ;
    };

    this.schedule(this.stduy_tips_callback, 1, cc.macro.REPEAT_FOREVER);
  },
  //雇佣工人提示
  staff_ui_tips: function staff_ui_tips() {
    this.staff_tips_callback = function () {
      var arr = Object.keys(user_data.user_data.staff);

      for (var i = 0; i < arr.length; i++) {
        //拥有这块土地
        if (user_data.user_data.land[i].have == 1 && user_data.user_data.gold >= config.staff[i].cost && user_data.user_data.staff[i].have == 0) {
          this.tips_group_node.children[3].active = true;
          return;
        } else {
          this.tips_group_node.children[3].active = false;
        }

        ;
      }

      ;
    };

    this.schedule(this.staff_tips_callback, 1, cc.macro.REPEAT_FOREVER);
  },
  //创建宠物
  create_pet: function create_pet() {
    var arr = Object.keys(user_data.user_data.pet);

    for (var i = 0; i < arr.length; i++) {
      if (user_data.user_data.pet[i].have == 1) {
        this.game_scene_js.create_pet(this.center_node, i);
      } else {//
      }

      ;
    }

    ;
  },
  //单个创建宠物
  create_pet_a: function create_pet_a(index) {
    this.game_scene_js.create_pet(this.center_node, index);
  },
  //=======================================================================================
  //=======================================================================================
  //领取收益
  on_get_hotel_produce_click: function on_get_hotel_produce_click(e) {
    var node = e.target;

    for (var i = 0; i < 3; i++) {
      this.game_scene_js.create_gold_effect(node, i, 0);
    }

    ;
    node.active = false;
    this.add_gold(user_data.user_data.hotel_cache_gold);
    user_data.user_data.hotel_cache_gold = 0;
  },
  //刷新旅馆收益
  update_hotel_produce: function update_hotel_produce() {
    //1s更新一次数据
    var callback = function callback() {
      var hotel_cache_gold = user_data.user_data.hotel_cache_gold;

      if (hotel_cache_gold == 0) {
        this.hotel_produce_node.active = false;
      } else {
        this.hotel_produce_node.active = true;
      }

      ;
      var label = this.hotel_produce_node.getChildByName("hotel_produce_label").getComponent(cc.Label);
      label.string = hotel_cache_gold;
    };

    this.schedule(callback, 1, cc.macro.REPEAT_FOREVER);
  },
  //购买一个房间
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
        break;
    }

    ;
  },
  //初始化旅馆产出
  ini_hotel_produce: function ini_hotel_produce() {
    //启动刷新收益
    this.update_hotel_produce();

    if (user_data.user_data.hotel[0].have == 1) {
      this.hotel_0();
    }

    ;

    if (user_data.user_data.hotel[1].have == 1) {
      this.hotel_1();
    }

    ;

    if (user_data.user_data.hotel[2].have == 1) {
      this.hotel_2();
    }

    ;

    if (user_data.user_data.hotel[3].have == 1) {
      this.hotel_3();
    }

    ;
  },
  //hotel0 生成
  hotel_0: function hotel_0() {
    var timeCount = 0;

    this.hotel_0_schedule = function () {
      timeCount++;

      if (timeCount >= config.hotel[0].produce_time) {
        user_data.user_data.hotel_cache_gold += config.hotel[0].produce;
        timeCount = 0;
      }

      ;
    };

    this.schedule(this.hotel_0_schedule, 1, cc.macro.REPEAT_FOREVER);
  },
  //hotel1 生成
  hotel_1: function hotel_1() {
    var timeCount = 0;

    this.hotel_1_schedule = function () {
      timeCount++;

      if (timeCount >= config.hotel[1].produce_time) {
        user_data.user_data.hotel_cache_gold += config.hotel[1].produce;
        timeCount = 0;
      }

      ;
    };

    this.schedule(this.hotel_1_schedule, 1, cc.macro.REPEAT_FOREVER);
  },
  //hotel2 生成
  hotel_2: function hotel_2() {
    var timeCount = 0;

    this.hotel_2_schedule = function () {
      timeCount++;

      if (timeCount >= config.hotel[2].produce_time) {
        user_data.user_data.hotel_cache_gold += config.hotel[2].produce;
        timeCount = 0;
      }

      ;
    };

    this.schedule(this.hotel_2_schedule, 1, cc.macro.REPEAT_FOREVER);
  },
  //hotel3 生成
  hotel_3: function hotel_3() {
    var timeCount = 0;

    this.hotel_3_schedule = function () {
      timeCount++;

      if (timeCount >= config.hotel[3].produce_time) {
        user_data.user_data.hotel_cache_gold += config.hotel[3].produce;
        timeCount = 0;
      }

      ;
    };

    this.schedule(this.hotel_3_schedule, 1, cc.macro.REPEAT_FOREVER);
  },
  //=======================================================================================
  //=======================================================================================
  //判断当前日期
  judge_date: function judge_date() {
    var now_date = new Date().getDate();
    var arr = Object.keys(user_data.user_data.pet);

    if (user_data.user_data.save_date == 0) {
      //新存档记录日期
      user_data.user_data.save_date = now_date;
    } else if (user_data.user_data.save_date != now_date) {
      //日期不相同，默认第二天及以后,重置分享次数
      for (var i = 0; i < arr.length; i++) {
        if (user_data.user_data.pet[i].share_count !== undefined) {
          user_data.user_data.pet[i].share_count = 0; // user_data.user_data.videotape_share_count = 0;
        }

        ;
      }

      ;
      user_data.user_data.save_date = now_date;
    } else {//日期为同一天
    }

    ;
  },
  //=============================================================================================
  //=============================================================================================
  //初始化录屏功能
  ini_videotape: function ini_videotape() {
    //录屏的保存路径
    this.videotape_path = null;
    this.videotape_start_time = 0;
    this.videotape_state = "unstart";
  },
  on_videotape_button_click: function on_videotape_button_click() {
    this.sound_control.play_sound_effect("button_click");

    if (this.videotape_state == "unstart") {
      //未开始进入奖励界面
      this.game_scene_js.create_videotape_ui();
    } else if (this.videotape_state == "start") {
      //开始后大于3秒才能关闭
      var now_time = new Date().getTime();
      var videotape_time = now_time - this.videotape_start_time;

      if (videotape_time < 3000) {
        this.game_scene_js.create_tips_ui(this.node, "videotape_no_time");
      } else {
        this.stop_videotape();
      }

      ;
    }

    ;
  },
  //开始游戏录屏
  start_videotape: function start_videotape() {
    //记录一个时间戳
    this.videotape_start_time = new Date().getTime();

    if (typeof wx != "undefined") {
      this.videotape_state = "start";
      this.videotape_timeControl(); //切换录屏按钮图标

      this.videotape_button.getComponent(cc.Sprite).spriteFrame = this.videotape_button_arr[1];
      this.game_scene_js.create_tips_ui(this.node, "videotape_start");
      this.recorder = wx.getGameRecorderManager();
      this.recorder.onStart(function (res) {// console.log("录屏开始");
        // do somethine;
      });
      this.recorder.start({
        duration: 60
      });
    }

    ;
  },
  //结束游戏录屏
  stop_videotape: function stop_videotape() {
    var _this = this;

    if (typeof wx != "undefined") {
      this.videotape_state = "unstart";
      this.game_scene_js.create_tips_ui(this.node, "vidotape_over");
      this.videotape_button.getComponent(cc.Sprite).spriteFrame = this.videotape_button_arr[0];
      this.recorder.onStop(function (res) {
        // console.log(res.videoPath, "录屏结束");
        // do somethine;
        _this.videotape_path = res.videoPath;

        _this.game_scene_js.create_videotape_ui();
      });
      this.recorder.stop();
    }

    ;
  },
  //录屏时间控制
  videotape_timeControl: function videotape_timeControl() {
    var time_count = 0;

    var callback = function callback() {
      time_count++; //超过了最大时长或者录制状态为未开启

      if (time_count >= 60 || this.videotape_state == "unstart") {
        this.unschedule(callback);
        time_count = 0;
        this.stop_videotape();
        this.game_scene_js.create_tips_ui(this.node, "vidotape_over");
      }

      ;
    };

    this.schedule(callback, 1, cc.macro.REPEAT_FOREVER);
  },
  //=============================================================================================
  //=============================================================================================
  //初始化节点
  ini_node: function ini_node() {
    _fx["default"].load();

    this.create_land();
    this.create_pet();
    this.add_gold_anim = 0;
    this.add_ex_anim = 0; //调用碰撞检测组件

    this.manager = cc.director.getCollisionManager(); //默认碰撞为关

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
    this.diamond_label.string = user_data.user_data.diamond;
  },
  //===================================================================================
  //===================================================================================
  on_test_button_click: function on_test_button_click(e, custom) {
    switch (custom) {
      case "0":
        this.add_gold(user_data.user_data.skill.gold_max * 500 + 500);
        break;

      case "1":
        this.add_ex(2 * user_data.user_data.level + 1);
        break;

      case "2":
        if (user_data.user_data.pet[0].have == 0) {
          user_data.user_data.pet[0].have = 1;
          this.game_scene_js.create_pet(this.node, 0);
        }

        if (user_data.user_data.pet[1].have == 0) {
          user_data.user_data.pet[1].have = 1;
          this.game_scene_js.create_pet(this.node, 1);
        }

        if (user_data.user_data.pet[2].have == 0) {
          user_data.user_data.pet[2].have = 1;
          this.game_scene_js.create_pet(this.node, 2);
        }

        if (user_data.user_data.pet[3].have == 0) {
          user_data.user_data.pet[3].have = 1;
          this.game_scene_js.create_pet(this.node, 3);
        }

        break;

      case "3":
        this.on_iap_button_click();
        break;
    }

    ;
  },
  onLoad: function onLoad() {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ini_node();
  },
  start: function start() {} // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lX3J1bGVzLmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjb25maWciLCJwdXNoIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsYW5kX3ByZWZhYiIsIlByZWZhYiIsImxhbmRfZ3JvdXBfbm9kZSIsIk5vZGUiLCJjZW50ZXJfbm9kZSIsImdvbGRfbGFiZWwiLCJMYWJlbCIsImV4X2xhYmVsIiwibGV2ZWxfbGFiZWwiLCJkaWFtb25kX2xhYmVsIiwiZ29sZF9wcm9ncmVzc19ub2RlIiwiUHJvZ3Jlc3NCYXIiLCJleF9wcm9ncmVzc19ub2RlIiwicGxheWVyX3ByZWZhYiIsInN0YWZmX3ByZWZhYl9hcnIiLCJ3YXJlSG91c2Vfbm9kZSIsIm1haW5fY2FtZXJhIiwidGlwc19ncm91cF9ub2RlIiwiYnV0dG9uX2dyb3VwX25vZGUiLCJob3RlbF9wcm9kdWNlX25vZGUiLCJ2aWRlb3RhcGVfYnV0dG9uIiwidmlkZW90YXBlX2J1dHRvbl9hcnIiLCJTcHJpdGVGcmFtZSIsIm9uX3dhdGVyaW5nX2J1dHRvbl9jbGljayIsInNvdW5kX2NvbnRyb2wiLCJwbGF5X3NvdW5kX2VmZmVjdCIsIm5vZGUiLCJnYW1lX3NjZW5lX2pzIiwiY3JlYXRlX2J1dHRvbl9ncm91cCIsInpJbmRleCIsImdldENvbXBvbmVudCIsImluaV9ub2RlIiwib25fdGlsbF9idXR0b25fY2xpY2siLCJvbl9zdHVkeV9idXR0b25fY2xpY2siLCJjcmVhdGVfc3R1ZHlfdWkiLCJvbl9ob21lX2J1dHRvbl9jbGljayIsImNyZWF0ZV9vcHRpb25fdWkiLCJvbl9wZXRfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX3BldF91aSIsIm9uX2hvdGVsX2J1dHRvbl9jbGljayIsImNyZWF0ZV9ob3RlbF91aSIsIm9uX3N0YWZmX2J1dHRvbl9jbGljayIsImNyZWF0ZV9zdGFmZl91aSIsImNyZWF0ZV9sYW5kIiwiYXJyIiwiT2JqZWN0Iiwia2V5cyIsImxhbmQiLCJpIiwibGVuZ3RoIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJjcmVhdGVfcGxheWVyIiwiY3JlYXRlX3N0YWZmIiwic3RhZmZfaW5kZXgiLCJzdGFmZiIsImhhdmUiLCJjaGlsZHJlbiIsImFkZF9nb2xkIiwibnVtIiwiYWRkX2dvbGRfYW5pbSIsInRpbWVDb3VudCIsImdvbGQiLCJnb2xkX21heCIsInNraWxsIiwiY2FsbGJhY2siLCJQbnVtIiwicGFyc2VJbnQiLCJzdHJpbmciLCJjcmVhdGVfdGlwc191aSIsInVuc2NoZWR1bGUiLCJzZXRfZ29sZF9wcm9ncmVzcyIsInNjaGVkdWxlIiwiYWRkX2RpYW1vbmQiLCJkaWFtb25kIiwiYWRkX2V4IiwiYWRkX2V4X2FuaW0iLCJleCIsIm5vd19leCIsIm5leHRfZXgiLCJsZXZlbCIsInNraWxsX3BvaW50Iiwic2V0X2V4X3Byb2dyZXNzIiwidHdlZW4iLCJ0byIsInByb2dyZXNzIiwic3RhcnQiLCJvbl93YXJlSG91c2VfY2xpY2siLCJjcmVhdGVfc2VsbF91aSIsIndhcmVIb3VzZV9mdWxsIiwid2FyZUhvdXNlX3NoY2VkdWxlIiwid2FyZUhvdXNlIiwiYWxsX2NhcGFjaXR5Iiwid2FyZUhvdXNlX2xldmVsIiwiY291bnQiLCJnZXRDaGlsZEJ5TmFtZSIsImFjdGl2ZSIsIm9uX29yY2hhcmRfYnV0dG9uX2NsaWNrIiwiYXV0b19zYXZlIiwiZngiLCJzYXZlIiwibWFjcm8iLCJSRVBFQVRfRk9SRVZFUiIsInVwZGF0YV9sYW5kIiwibGFuZF9pbmRleCIsInNhdmVfbG9naW5fdGltZSIsImxvZ2luX3RpbWUiLCJEYXRlIiwiZ2V0VGltZSIsIm9mZmxpbmVfcHJvZml0X3VpIiwibm93X3RpbWUiLCJtaW4iLCJNYXRoIiwiZmxvb3IiLCJjcmVhdGVfb2ZmbGluZV9wcm9maXRfdWkiLCJvbl9zaG9wX2J1dHRvbl9jbGljayIsImNyZWF0ZV9zaG9wX3VpIiwib25faWFwX2J1dHRvbl9jbGljayIsImNyZWF0ZV9pYXBfdWkiLCJjcmVhdGVfbm92aWNlIiwibm92aWNlIiwiY3JlYXRlX25vdmljZV91aSIsImNyZWF0ZV9idXR0b25fdGlwcyIsInBvc2l0aW9uIiwic3R1ZHlfdWlfdGlwcyIsInN0YWZmX3VpX3RpcHMiLCJzaG9wX3VpX3RpcHMiLCJzaG9wX3VpX2NhbGxiYWNrIiwibGFuZF9hcnIiLCJwbGFudF9hcnIiLCJwbGFudCIsImNvc3QiLCJuZWVkX2xldmVsIiwiaiIsInN0ZHV5X3RpcHNfY2FsbGJhY2siLCJzdGFmZl90aXBzX2NhbGxiYWNrIiwiY3JlYXRlX3BldCIsInBldCIsImNyZWF0ZV9wZXRfYSIsImluZGV4Iiwib25fZ2V0X2hvdGVsX3Byb2R1Y2VfY2xpY2siLCJlIiwidGFyZ2V0IiwiY3JlYXRlX2dvbGRfZWZmZWN0IiwiaG90ZWxfY2FjaGVfZ29sZCIsInVwZGF0ZV9ob3RlbF9wcm9kdWNlIiwibGFiZWwiLCJob3RlbF9idXlfcm9vbSIsInJvb21faW5kZXgiLCJob3RlbF8wIiwiaG90ZWxfMSIsImhvdGVsXzIiLCJob3RlbF8zIiwiaW5pX2hvdGVsX3Byb2R1Y2UiLCJob3RlbCIsImhvdGVsXzBfc2NoZWR1bGUiLCJwcm9kdWNlX3RpbWUiLCJwcm9kdWNlIiwiaG90ZWxfMV9zY2hlZHVsZSIsImhvdGVsXzJfc2NoZWR1bGUiLCJob3RlbF8zX3NjaGVkdWxlIiwianVkZ2VfZGF0ZSIsIm5vd19kYXRlIiwiZ2V0RGF0ZSIsInNhdmVfZGF0ZSIsInNoYXJlX2NvdW50IiwidW5kZWZpbmVkIiwiaW5pX3ZpZGVvdGFwZSIsInZpZGVvdGFwZV9wYXRoIiwidmlkZW90YXBlX3N0YXJ0X3RpbWUiLCJ2aWRlb3RhcGVfc3RhdGUiLCJvbl92aWRlb3RhcGVfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX3ZpZGVvdGFwZV91aSIsInZpZGVvdGFwZV90aW1lIiwic3RvcF92aWRlb3RhcGUiLCJzdGFydF92aWRlb3RhcGUiLCJ3eCIsInZpZGVvdGFwZV90aW1lQ29udHJvbCIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwicmVjb3JkZXIiLCJnZXRHYW1lUmVjb3JkZXJNYW5hZ2VyIiwib25TdGFydCIsInJlcyIsImR1cmF0aW9uIiwib25TdG9wIiwidmlkZW9QYXRoIiwic3RvcCIsInRpbWVfY291bnQiLCJsb2FkIiwibWFuYWdlciIsImRpcmVjdG9yIiwiZ2V0Q29sbGlzaW9uTWFuYWdlciIsImVuYWJsZWQiLCJwbGF5X2JnX3NvdW5kIiwib25fdGVzdF9idXR0b25fY2xpY2siLCJjdXN0b20iLCJvbkxvYWQiLCJmaW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBSEEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQSxJQUFJQyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUNBLElBQUlFLElBQUksR0FBR0YsT0FBTyxDQUFDLE1BQUQsQ0FBbEI7O0FBRUFHLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxXQUFXLEVBQUVKLEVBQUUsQ0FBQ0ssTUFEUjtBQUVSQyxJQUFBQSxlQUFlLEVBQUVOLEVBQUUsQ0FBQ08sSUFGWjtBQUdSQyxJQUFBQSxXQUFXLEVBQUVSLEVBQUUsQ0FBQ08sSUFIUjtBQUlSRSxJQUFBQSxVQUFVLEVBQUVULEVBQUUsQ0FBQ1UsS0FKUDtBQUtSQyxJQUFBQSxRQUFRLEVBQUVYLEVBQUUsQ0FBQ1UsS0FMTDtBQU1SRSxJQUFBQSxXQUFXLEVBQUVaLEVBQUUsQ0FBQ1UsS0FOUjtBQU9SRyxJQUFBQSxhQUFhLEVBQUViLEVBQUUsQ0FBQ1UsS0FQVjtBQVFSSSxJQUFBQSxrQkFBa0IsRUFBRWQsRUFBRSxDQUFDZSxXQVJmO0FBU1JDLElBQUFBLGdCQUFnQixFQUFFaEIsRUFBRSxDQUFDZSxXQVRiO0FBVVJFLElBQUFBLGFBQWEsRUFBRWpCLEVBQUUsQ0FBQ0ssTUFWVjtBQVdSYSxJQUFBQSxnQkFBZ0IsRUFBRSxDQUFDbEIsRUFBRSxD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QTRCQztBQUNKLEdBcm9CSTtBQXVvQkxnRixFQUFBQSxNQXZvQkssb0JBdW9CSTtBQUNMLFNBQUsxSyxhQUFMLEdBQXFCL0IsRUFBRSxDQUFDME0sSUFBSCxDQUFRLFNBQVIsRUFBbUJ4SyxZQUFuQixDQUFnQyxZQUFoQyxDQUFyQjtBQUNBLFNBQUtOLGFBQUwsR0FBcUI1QixFQUFFLENBQUMwTSxJQUFILENBQVEsZUFBUixFQUF5QnhLLFlBQXpCLENBQXNDLGVBQXRDLENBQXJCO0FBQ0EsU0FBS0MsUUFBTDtBQUNILEdBM29CSTtBQTZvQkx1RCxFQUFBQSxLQTdvQkssbUJBNm9CRyxDQUVQLENBL29CSSxDQWlwQkw7O0FBanBCSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcbnZhciBjb25maWcgPSByZXF1aXJlKFwiY29uZmlnXCIpO1xudmFyIHB1c2ggPSByZXF1aXJlKFwicHVzaFwiKTtcbmltcG9ydCBmeCBmcm9tIFwiZnhcIjtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGxhbmRfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIGxhbmRfZ3JvdXBfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgY2VudGVyX25vZGU6IGNjLk5vZGUsXG4gICAgICAgIGdvbGRfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBleF9sYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIGxldmVsX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgZGlhbW9uZF9sYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIGdvbGRfcHJvZ3Jlc3Nfbm9kZTogY2MuUHJvZ3Jlc3NCYXIsXG4gICAgICAgIGV4X3Byb2dyZXNzX25vZGU6IGNjLlByb2dyZXNzQmFyLFxuICAgICAgICBwbGF5ZXJfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIHN0YWZmX3ByZWZhYl9hcnI6IFtjYy5QcmVmYWJdLFxuICAgICAgICB3YXJlSG91c2Vfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgbWFpbl9jYW1lcmE6IGNjLk5vZGUsXG4gICAgICAgIHRpcHNfZ3JvdXBfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgYnV0dG9uX2dyb3VwX25vZGU6IGNjLk5vZGUsXG4gICAgICAgIGhvdGVsX3Byb2R1Y2Vfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgdmlkZW90YXBlX2J1dHRvbjogY2MuTm9kZSxcbiAgICAgICAgdmlkZW90YXBlX2J1dHRvbl9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgfSxcblxuXG4gICAgLy/mtYfmsLTmjInpkq7ooqvngrnlh7tcbiAgICBvbl93YXRlcmluZ19idXR0b25fY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwibWFpbl9idXR0b25fY2xpY2tcIik7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9idXR0b25fZ3JvdXAodGhpcy5jZW50ZXJfbm9kZSk7XG4gICAgICAgIG5vZGUuekluZGV4ID0gMztcbiAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJidXR0b25fbW9yZVwiKS5pbmlfbm9kZShcIndhdGVyaW5nXCIpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/ogJXlnLDmjInpkq7ooqvngrnlh7tcbiAgICBvbl90aWxsX2J1dHRvbl9jbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJtYWluX2J1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2J1dHRvbl9ncm91cCh0aGlzLmNlbnRlcl9ub2RlKTtcbiAgICAgICAgbm9kZS56SW5kZXggPSAzO1xuICAgICAgICBpZiAobm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcImJ1dHRvbl9tb3JlXCIpLmluaV9ub2RlKFwidGlsbFwiKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5a2m5Lmg5oyJ6ZKu6KKr54K55Ye7XG4gICAgb25fc3R1ZHlfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcIm1haW5fYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfc3R1ZHlfdWkodGhpcy5ub2RlKTtcbiAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzdHVkeV91aVwiKS5pbmlfbm9kZSgpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy9ob21lIOiiq+eCueWHu+aXtlxuICAgIG9uX2hvbWVfYnV0dG9uX2NsaWNrKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfb3B0aW9uX3VpKCk7XG4gICAgfSxcbiAgICAvL+WuoOeJqeaMiemSruiiq+eCueWHu1xuICAgIG9uX3BldF9idXR0b25fY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwibWFpbl9idXR0b25fY2xpY2tcIik7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9wZXRfdWkodGhpcy5ub2RlKTtcbiAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJwZXRfdWlcIikuaW5pX25vZGUoKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5peF6aaG5oyJ6ZKu6KKr54K55Ye7XG4gICAgb25faG90ZWxfYnV0dG9uX2NsaWNrKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfaG90ZWxfdWkoKTtcbiAgICB9LFxuICAgIC8v6ZuH5L2j5ZGY5belXG4gICAgb25fc3RhZmZfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcIm1haW5fYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfc3RhZmZfdWkodGhpcy5ub2RlKTtcbiAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzdGFmZl91aVwiKS5pbmlfbm9kZSgpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/nlJ/miJDlnJ/lnLBcbiAgICBjcmVhdGVfbGFuZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5sYW5kX3ByZWZhYik7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubGFuZF9ncm91cF9ub2RlO1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJsYW5kXCIpLmluaV9ub2RlKGkpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/liJvlu7rnjqnlrrblsI/kurpcbiAgICBjcmVhdGVfcGxheWVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJfcHJlZmFiKTtcbiAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLmNlbnRlcl9ub2RlO1xuICAgIH0sXG4gICAgLy/liJvlu7rkvaPkurpcbiAgICBjcmVhdGVfc3RhZmY6IGZ1bmN0aW9uIChzdGFmZl9pbmRleCkge1xuICAgICAgICBpZiAoc3RhZmZfaW5kZXggPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmYpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZltpXS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnN0YWZmX3ByZWZhYl9hcnJbaV0pO1xuICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubGFuZF9ncm91cF9ub2RlLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInN0YWZmX2FpXCIpLmluaV9ub2RlKGkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdGFmZl9wcmVmYWJfYXJyW3N0YWZmX2luZGV4XSk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubGFuZF9ncm91cF9ub2RlLmNoaWxkcmVuW3N0YWZmX2luZGV4XTtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic3RhZmZfYWlcIikuaW5pX25vZGUoc3RhZmZfaW5kZXgpO1xuICAgICAgICB9O1xuXG4gICAgfSxcbiAgICAvL+WIt+aWsOmHkeW4geaVsFxuICAgIGFkZF9nb2xkOiBmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgIGlmICh0aGlzLmFkZF9nb2xkX2FuaW0gPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5hZGRfZ29sZF9hbmltID0gMTtcbiAgICAgICAgICAgIHZhciB0aW1lQ291bnQgPSAxMDtcbiAgICAgICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xuICAgICAgICAgICAgdmFyIGdvbGRfbWF4ID0gNTAwICogdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImdvbGRfbWF4XCJdICsgNTAwO1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBQbnVtID0gcGFyc2VJbnQobnVtIC8gdGltZUNvdW50KVxuICAgICAgICAgICAgICAgIHRpbWVDb3VudC0tO1xuICAgICAgICAgICAgICAgIHRoaXMuZ29sZF9sYWJlbC5zdHJpbmcgPSBnb2xkICsgUG51bSArIFwiL1wiICsgZ29sZF9tYXg7XG4gICAgICAgICAgICAgICAgaWYgKHRpbWVDb3VudCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCArPSBudW07XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPiBnb2xkX21heCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwidW5fY2xpY2tcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5ub2RlLCBcImdvbGRfZnVsbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA9IGdvbGRfbWF4O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ29sZF9sYWJlbC5zdHJpbmcgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgKyBcIi9cIiArIGdvbGRfbWF4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldF9nb2xkX3Byb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkX2dvbGRfYW5pbSA9IDA7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjAzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCArPSBudW07XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGFkZF9kaWFtb25kOiBmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuZGlhbW9uZCArPSBudW07XG4gICAgfSxcbiAgICAvL+WIt+aWsGV45pWwXG4gICAgYWRkX2V4OiBmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgIGlmICh0aGlzLmFkZF9leF9hbmltID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuYWRkX2V4X2FuaW0gPSAxO1xuICAgICAgICAgICAgdmFyIHRpbWVDb3VudCA9IDEwO1xuICAgICAgICAgICAgdmFyIGV4ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXg7XG4gICAgICAgICAgICB2YXIgbmV4dF9leCA9IDIgKiB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsO1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBQbnVtID0gcGFyc2VJbnQobnVtIC8gdGltZUNvdW50KVxuICAgICAgICAgICAgICAgIHRpbWVDb3VudC0tO1xuICAgICAgICAgICAgICAgIHRoaXMuZXhfbGFiZWwuc3RyaW5nID0gZXggKyBQbnVtICsgXCIvXCIgKyBuZXh0X2V4O1xuICAgICAgICAgICAgICAgIGlmICh0aW1lQ291bnQgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leCArPSBudW07XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leCA+IG5leHRfZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubm93X2V4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWwrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxfcG9pbnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJnaWZ0X2FkX2xldmVsXCIpOyAgICAvLyBzaG93IG5vdGljIGxldmVsIHVwXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRfZXhfcHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRfZXhfYW5pbSA9IDA7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjA1KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubm93X2V4ICs9IG51bTtcbiAgICAgICAgfTtcblxuICAgIH0sXG4gICAgc2V0X2dvbGRfcHJvZ3Jlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGdvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XG4gICAgICAgIHZhciBnb2xkX21heCA9IDUwMCAqIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJnb2xkX21heFwiXSArIDUwMDtcbiAgICAgICAgdGhpcy5nb2xkX2xhYmVsLnN0cmluZyA9IGdvbGQgKyBcIi9cIiArIGdvbGRfbWF4O1xuICAgICAgICBjYy50d2Vlbih0aGlzLmdvbGRfcHJvZ3Jlc3Nfbm9kZSlcbiAgICAgICAgICAgIC50bygwLjMsIHsgcHJvZ3Jlc3M6IGdvbGQgLyBnb2xkX21heCB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgfSxcbiAgICBzZXRfZXhfcHJvZ3Jlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5vd19leCA9IHVzZXJfZGF0YS51c2VyX2RhdGEubm93X2V4O1xuICAgICAgICB2YXIgbmV4dF9leCA9IDIgKiB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsO1xuICAgICAgICB0aGlzLmxldmVsX2xhYmVsLnN0cmluZyA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWw7XG4gICAgICAgIHRoaXMuZXhfbGFiZWwuc3RyaW5nID0gbm93X2V4ICsgXCIvXCIgKyBuZXh0X2V4O1xuICAgICAgICBjYy50d2Vlbih0aGlzLmV4X3Byb2dyZXNzX25vZGUpXG4gICAgICAgICAgICAudG8oMC4zLCB7IHByb2dyZXNzOiBub3dfZXggLyBuZXh0X2V4IH0pXG4gICAgICAgICAgICAuc3RhcnQoKTtcbiAgICB9LFxuICAgIC8v5LuT5bqT6KKr54K55Ye7XG4gICAgb25fd2FyZUhvdXNlX2NsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3NlbGxfdWkodGhpcy5ub2RlKTtcbiAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzZWxsX3VpXCIpLmluaV9ub2RlKCk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+S7k+W6k+W3sua7oVxuICAgIHdhcmVIb3VzZV9mdWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vXG4gICAgICAgIHRoaXMud2FyZUhvdXNlX3NoY2VkdWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlKTtcbiAgICAgICAgICAgIHZhciBhbGxfY2FwYWNpdHkgPSB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZV9sZXZlbCAqIGNvbmZpZy53YXJlSG91c2VbXCJhbGxfY2FwYWNpdHlcIl07XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3VudCA+PSBhbGxfY2FwYWNpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXJlSG91c2Vfbm9kZS5nZXRDaGlsZEJ5TmFtZShcIndhcmVIb3VzZV9mdWxsXCIpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhcmVIb3VzZV9ub2RlLmdldENoaWxkQnlOYW1lKFwid2FyZUhvdXNlX2Z1bGxcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy53YXJlSG91c2Vfc2hjZWR1bGUsIDAuMSk7XG4gICAgfSxcbiAgICAvL+aenOWbreiiq+eCueWHu1xuICAgIG9uX29yY2hhcmRfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHRoaXMuc291bmRfY29udHJvbC5wbGF5X2JnX3NvdW5kKFwidmlsbGFnZV9iZ1wiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwidW5fY2xpY2tcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLm5vZGUsIFwidW5fZGV2ZWxvcFwiKTtcbiAgICB9LFxuICAgIC8v6Ieq5Yqo5a2Y5qGjXG4gICAgYXV0b19zYXZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZ4LnNhdmUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMSwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xuICAgIH0sXG4gICAgLy/liLfmlrDlnJ/lnLBcbiAgICB1cGRhdGFfbGFuZDogZnVuY3Rpb24gKGxhbmRfaW5kZXgpIHtcbiAgICAgICAgLy/liJ3lp4vljJblnJ/lnLDnirbmgIFcbiAgICAgICAgdGhpcy5sYW5kX2dyb3VwX25vZGUuY2hpbGRyZW5bbGFuZF9pbmRleF0uZ2V0Q29tcG9uZW50KFwibGFuZFwiKS5pbmlfbm9kZShsYW5kX2luZGV4KTtcbiAgICB9LFxuICAgIC8v6K6w5b2V5LiK57q/5pe26Ze0XG4gICAgc2F2ZV9sb2dpbl90aW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxvZ2luX3RpbWUgPT0gMCkge1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sb2dpbl90aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+WIm+W7uuemu+e6v+aUtuebinVpXG4gICAgb2ZmbGluZV9wcm9maXRfdWk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxvZ2luX3RpbWUgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxvZ2luX3RpbWU7XG4gICAgICAgIHZhciBub3dfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB2YXIgbWluID0gTWF0aC5mbG9vcigobm93X3RpbWUgLSBsb2dpbl90aW1lKSAvICgxMDAwICogNjApKTtcbiAgICAgICAgaWYgKG1pbiA+PSA1KSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX29mZmxpbmVfcHJvZml0X3VpKHRoaXMubm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+S6kuaOqOaMiemSruiiq+eCueWHu1xuICAgIC8vIG9uX3B1c2hfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoZSwgbmFtZSkge1xuICAgIC8vICAgICBpZiAodHlwZW9mICh3eCkgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAvLyAgICAgICAgIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XG4gICAgLy8gICAgICAgICAgICAgYXBwSWQ6IHB1c2hbbmFtZV0uYXBwaWQsXG4gICAgLy8gICAgICAgICAgICAgcGF0aDogJycsXG4gICAgLy8gICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8g5omT5byA5oiQ5YqfXG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgfSlcbiAgICAvLyAgICAgfTtcbiAgICAvLyB9LFxuICAgIC8v5ZWG5bqX5oyJ6ZKu6KKr54K55Ye7XG4gICAgb25fc2hvcF9idXR0b25fY2xpY2soKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9zaG9wX3VpKCk7XG4gICAgfSxcbiAgICBvbl9pYXBfYnV0dG9uX2NsaWNrKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfaWFwX3VpKCk7XG4gICAgfSxcbiAgICAvL+WIm+W7uuaWsOaJi+W8leWvvFxuICAgIGNyZWF0ZV9ub3ZpY2UoKSB7XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLm5vdmljZSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX25vdmljZV91aSgpO1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3ZpY2UgPSAxO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/liJvlu7rmjInpkq7mj5DnpLpcbiAgICBjcmVhdGVfYnV0dG9uX3RpcHMoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5idXR0b25fZ3JvdXBfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9idXR0b25fdGlwcyh0aGlzLnRpcHNfZ3JvdXBfbm9kZSwgdGhpcy5idXR0b25fZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5wb3NpdGlvbik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3R1ZHlfdWlfdGlwcygpO1xuICAgICAgICB0aGlzLnN0YWZmX3VpX3RpcHMoKTtcbiAgICAgICAgdGhpcy5zaG9wX3VpX3RpcHMoKTtcbiAgICB9LFxuICAgIC8v6LSt5Lmw5ZWG5ZOB5o+Q56S6XG4gICAgc2hvcF91aV90aXBzKCkge1xuICAgICAgICB0aGlzLnNob3BfdWlfY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbGFuZF9hcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmQpXG4gICAgICAgICAgICB2YXIgcGxhbnRfYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5wbGFudClcbiAgICAgICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xuICAgICAgICAgICAgdmFyIGxldmVsID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFuZF9hcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZ29sZCA+PSBjb25maWcubGFuZFtpXS5jb3N0ICYmIGxldmVsID49IGNvbmZpZy5sYW5kW2ldLm5lZWRfbGV2ZWwgJiYgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW2ldLmhhdmUgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aXBzX2dyb3VwX25vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBsYW50X2Fyci5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChnb2xkID49IGNvbmZpZy5wbGFudFtqXS5jb3N0ICYmIGxldmVsID49IGNvbmZpZy5wbGFudFtqXS5uZWVkX2xldmVsICYmIHVzZXJfZGF0YS51c2VyX2RhdGEucGxhbnRbal0uaGF2ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnNob3BfdWlfY2FsbGJhY2ssIDEpO1xuICAgIH0sXG4gICAgLy/liqDngrnmj5DnpLpcbiAgICBzdHVkeV91aV90aXBzKCkge1xuICAgICAgICB0aGlzLnN0ZHV5X3RpcHNfY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2tpbGxfcG9pbnQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsX3BvaW50O1xuICAgICAgICAgICAgaWYgKHNraWxsX3BvaW50ID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8v5oqA6IO954K55LiN6Laz5LiN5o+Q56S6XG4gICAgICAgICAgICAgICAgdGhpcy50aXBzX2dyb3VwX25vZGUuY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuc3RkdXlfdGlwc19jYWxsYmFjaywgMSwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xuICAgIH0sXG4gICAgLy/pm4fkvaPlt6Xkurrmj5DnpLpcbiAgICBzdGFmZl91aV90aXBzKCkge1xuICAgICAgICB0aGlzLnN0YWZmX3RpcHNfY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZik7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIC8v5oul5pyJ6L+Z5Z2X5Zyf5ZywXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFtpXS5oYXZlID09IDEgJiYgdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID49IGNvbmZpZy5zdGFmZltpXS5jb3N0ICYmIHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbaV0uaGF2ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzNdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblszXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnN0YWZmX3RpcHNfY2FsbGJhY2ssIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8v5Yib5bu65a6g54mpXG4gICAgY3JlYXRlX3BldCgpIHtcbiAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEucGV0KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFtpXS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLmNlbnRlcl9ub2RlLCBpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+WNleS4quWIm+W7uuWuoOeJqVxuICAgIGNyZWF0ZV9wZXRfYShpbmRleCkge1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLmNlbnRlcl9ub2RlLCBpbmRleCk7XG4gICAgfSxcblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIC8v6aKG5Y+W5pS255uKXG4gICAgb25fZ2V0X2hvdGVsX3Byb2R1Y2VfY2xpY2soZSkge1xuICAgICAgICB2YXIgbm9kZSA9IGUudGFyZ2V0O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9nb2xkX2VmZmVjdChub2RlLCBpLCAwKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hZGRfZ29sZCh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQpO1xuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQgPSAwO1xuICAgIH0sXG4gICAgLy/liLfmlrDml4XppobmlLbnm4pcbiAgICB1cGRhdGVfaG90ZWxfcHJvZHVjZSgpIHtcbiAgICAgICAgLy8xc+abtOaWsOS4gOasoeaVsOaNrlxuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaG90ZWxfY2FjaGVfZ29sZCA9IHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxfY2FjaGVfZ29sZDtcbiAgICAgICAgICAgIGlmIChob3RlbF9jYWNoZV9nb2xkID09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGVsX3Byb2R1Y2Vfbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF9wcm9kdWNlX25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgbGFiZWwgPSB0aGlzLmhvdGVsX3Byb2R1Y2Vfbm9kZS5nZXRDaGlsZEJ5TmFtZShcImhvdGVsX3Byb2R1Y2VfbGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IGhvdGVsX2NhY2hlX2dvbGQ7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8v6LSt5Lmw5LiA5Liq5oi/6Ze0XG4gICAgaG90ZWxfYnV5X3Jvb20ocm9vbV9pbmRleCkge1xuICAgICAgICBzd2l0Y2ggKHJvb21faW5kZXgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGVsXzAoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGVsXzEoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGVsXzIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGVsXzMoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5Yid5aeL5YyW5peF6aaG5Lqn5Ye6XG4gICAgaW5pX2hvdGVsX3Byb2R1Y2UoKSB7XG5cbiAgICAgICAgLy/lkK/liqjliLfmlrDmlLbnm4pcbiAgICAgICAgdGhpcy51cGRhdGVfaG90ZWxfcHJvZHVjZSgpO1xuXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsWzBdLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5ob3RlbF8wKCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsWzFdLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5ob3RlbF8xKCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsWzJdLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5ob3RlbF8yKCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsWzNdLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5ob3RlbF8zKCk7XG4gICAgICAgIH07XG5cbiAgICB9LFxuICAgIC8vaG90ZWwwIOeUn+aIkFxuICAgIGhvdGVsXzAoKSB7XG4gICAgICAgIHZhciB0aW1lQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmhvdGVsXzBfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aW1lQ291bnQrKztcbiAgICAgICAgICAgIGlmICh0aW1lQ291bnQgPj0gY29uZmlnLmhvdGVsWzBdLnByb2R1Y2VfdGltZSkge1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxfY2FjaGVfZ29sZCArPSBjb25maWcuaG90ZWxbMF0ucHJvZHVjZTtcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQgPSAwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhvdGVsXzBfc2NoZWR1bGUsIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8vaG90ZWwxIOeUn+aIkFxuICAgIGhvdGVsXzEoKSB7XG4gICAgICAgIHZhciB0aW1lQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmhvdGVsXzFfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aW1lQ291bnQrKztcbiAgICAgICAgICAgIGlmICh0aW1lQ291bnQgPj0gY29uZmlnLmhvdGVsWzFdLnByb2R1Y2VfdGltZSkge1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxfY2FjaGVfZ29sZCArPSBjb25maWcuaG90ZWxbMV0ucHJvZHVjZTtcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQgPSAwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhvdGVsXzFfc2NoZWR1bGUsIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8vaG90ZWwyIOeUn+aIkFxuICAgIGhvdGVsXzIoKSB7XG4gICAgICAgIHZhciB0aW1lQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmhvdGVsXzJfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aW1lQ291bnQrKztcbiAgICAgICAgICAgIGlmICh0aW1lQ291bnQgPj0gY29uZmlnLmhvdGVsWzJdLnByb2R1Y2VfdGltZSkge1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxfY2FjaGVfZ29sZCArPSBjb25maWcuaG90ZWxbMl0ucHJvZHVjZTtcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQgPSAwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhvdGVsXzJfc2NoZWR1bGUsIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8vaG90ZWwzIOeUn+aIkFxuICAgIGhvdGVsXzMoKSB7XG4gICAgICAgIHZhciB0aW1lQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmhvdGVsXzNfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aW1lQ291bnQrKztcbiAgICAgICAgICAgIGlmICh0aW1lQ291bnQgPj0gY29uZmlnLmhvdGVsWzNdLnByb2R1Y2VfdGltZSkge1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxfY2FjaGVfZ29sZCArPSBjb25maWcuaG90ZWxbM10ucHJvZHVjZTtcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQgPSAwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhvdGVsXzNfc2NoZWR1bGUsIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvL+WIpOaWreW9k+WJjeaXpeacn1xuICAgIGp1ZGdlX2RhdGUoKSB7XG4gICAgICAgIHZhciBub3dfZGF0ZSA9IG5ldyBEYXRlKCkuZ2V0RGF0ZSgpO1xuICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5wZXQpO1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgPT0gMCkge1xuICAgICAgICAgICAgLy/mlrDlrZjmoaPorrDlvZXml6XmnJ9cbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2F2ZV9kYXRlID0gbm93X2RhdGU7XG4gICAgICAgIH0gZWxzZSBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgIT0gbm93X2RhdGUpIHtcbiAgICAgICAgICAgIC8v5pel5pyf5LiN55u45ZCM77yM6buY6K6k56ys5LqM5aSp5Y+K5Lul5ZCOLOmHjee9ruWIhuS6q+asoeaVsFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbaV0uc2hhcmVfY291bnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFtpXS5zaGFyZV9jb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZXJfZGF0YS51c2VyX2RhdGEudmlkZW90YXBlX3NoYXJlX2NvdW50ID0gMDtcblxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgPSBub3dfZGF0ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8v5pel5pyf5Li65ZCM5LiA5aSpXG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAvL+WIneWni+WMluW9leWxj+WKn+iDvVxuICAgIGluaV92aWRlb3RhcGUoKSB7XG4gICAgICAgIC8v5b2V5bGP55qE5L+d5a2Y6Lev5b6EXG4gICAgICAgIHRoaXMudmlkZW90YXBlX3BhdGggPSBudWxsO1xuICAgICAgICB0aGlzLnZpZGVvdGFwZV9zdGFydF90aW1lID0gMDtcbiAgICAgICAgdGhpcy52aWRlb3RhcGVfc3RhdGUgPSBcInVuc3RhcnRcIjtcbiAgICB9LFxuICAgIG9uX3ZpZGVvdGFwZV9idXR0b25fY2xpY2soKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgaWYgKHRoaXMudmlkZW90YXBlX3N0YXRlID09IFwidW5zdGFydFwiKSB7XG4gICAgICAgICAgICAvL+acquW8gOWni+i/m+WFpeWlluWKseeVjOmdolxuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV92aWRlb3RhcGVfdWkoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZpZGVvdGFwZV9zdGF0ZSA9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgICAgIC8v5byA5aeL5ZCO5aSn5LqOM+enkuaJjeiDveWFs+mXrVxuICAgICAgICAgICAgdmFyIG5vd190aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICB2YXIgdmlkZW90YXBlX3RpbWUgPSBub3dfdGltZSAtIHRoaXMudmlkZW90YXBlX3N0YXJ0X3RpbWU7XG4gICAgICAgICAgICBpZiAodmlkZW90YXBlX3RpbWUgPCAzMDAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZSwgXCJ2aWRlb3RhcGVfbm9fdGltZVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wX3ZpZGVvdGFwZSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5byA5aeL5ri45oiP5b2V5bGPXG4gICAgc3RhcnRfdmlkZW90YXBlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8v6K6w5b2V5LiA5Liq5pe26Ze05oizXG4gICAgICAgIHRoaXMudmlkZW90YXBlX3N0YXJ0X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9IFwidW5kZWZpbmVkXCIpIHtcblxuICAgICAgICAgICAgdGhpcy52aWRlb3RhcGVfc3RhdGUgPSBcInN0YXJ0XCI7XG4gICAgICAgICAgICB0aGlzLnZpZGVvdGFwZV90aW1lQ29udHJvbCgpO1xuICAgICAgICAgICAgLy/liIfmjaLlvZXlsY/mjInpkq7lm77moIdcbiAgICAgICAgICAgIHRoaXMudmlkZW90YXBlX2J1dHRvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMudmlkZW90YXBlX2J1dHRvbl9hcnJbMV07XG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5ub2RlLCBcInZpZGVvdGFwZV9zdGFydFwiKTtcblxuICAgICAgICAgICAgdGhpcy5yZWNvcmRlciA9IHd4LmdldEdhbWVSZWNvcmRlck1hbmFnZXIoKTtcbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIub25TdGFydChyZXMgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5b2V5bGP5byA5aeLXCIpO1xuICAgICAgICAgICAgICAgIC8vIGRvIHNvbWV0aGluZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5yZWNvcmRlci5zdGFydCh7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDYwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgIH0sXG4gICAgLy/nu5PmnZ/muLjmiI/lvZXlsY9cbiAgICBzdG9wX3ZpZGVvdGFwZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy52aWRlb3RhcGVfc3RhdGUgPSBcInVuc3RhcnRcIjtcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLm5vZGUsIFwidmlkb3RhcGVfb3ZlclwiKTtcbiAgICAgICAgICAgIHRoaXMudmlkZW90YXBlX2J1dHRvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMudmlkZW90YXBlX2J1dHRvbl9hcnJbMF07XG5cbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIub25TdG9wKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLnZpZGVvUGF0aCwgXCLlvZXlsY/nu5PmnZ9cIik7XG4gICAgICAgICAgICAgICAgLy8gZG8gc29tZXRoaW5lO1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW90YXBlX3BhdGggPSByZXMudmlkZW9QYXRoO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdmlkZW90YXBlX3VpKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIuc3RvcCgpO1xuXG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+W9leWxj+aXtumXtOaOp+WItlxuICAgIHZpZGVvdGFwZV90aW1lQ29udHJvbCgpIHtcbiAgICAgICAgdmFyIHRpbWVfY291bnQgPSAwO1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aW1lX2NvdW50Kys7XG4gICAgICAgICAgICAvL+i2hei/h+S6huacgOWkp+aXtumVv+aIluiAheW9leWItueKtuaAgeS4uuacquW8gOWQr1xuICAgICAgICAgICAgaWYgKHRpbWVfY291bnQgPj0gNjAgfHwgdGhpcy52aWRlb3RhcGVfc3RhdGUgPT0gXCJ1bnN0YXJ0XCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIHRpbWVfY291bnQgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcF92aWRlb3RhcGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5ub2RlLCBcInZpZG90YXBlX292ZXJcIik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XG4gICAgfSxcblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIC8v5Yid5aeL5YyW6IqC54K5XG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZngubG9hZCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZV9sYW5kKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlX3BldCgpO1xuICAgICAgICB0aGlzLmFkZF9nb2xkX2FuaW0gPSAwO1xuICAgICAgICB0aGlzLmFkZF9leF9hbmltID0gMDtcbiAgICAgICAgLy/osIPnlKjnorDmkp7mo4DmtYvnu4Tku7ZcbiAgICAgICAgdGhpcy5tYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpO1xuICAgICAgICAvL+m7mOiupOeisOaSnuS4uuWFs1xuICAgICAgICB0aGlzLm1hbmFnZXIuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2V0X2dvbGRfcHJvZ3Jlc3MoKTtcbiAgICAgICAgdGhpcy5zZXRfZXhfcHJvZ3Jlc3MoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVfcGxheWVyKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlX3N0YWZmKCk7XG4gICAgICAgIHRoaXMuYXV0b19zYXZlKCk7XG4gICAgICAgIHRoaXMuc2F2ZV9sb2dpbl90aW1lKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlX2J1dHRvbl90aXBzKCk7XG4gICAgICAgIHRoaXMub2ZmbGluZV9wcm9maXRfdWkoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVfbm92aWNlKCk7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X2JnX3NvdW5kKFwiaG9tZV9iZ1wiKTtcbiAgICAgICAgdGhpcy5pbmlfaG90ZWxfcHJvZHVjZSgpO1xuICAgICAgICB0aGlzLmp1ZGdlX2RhdGUoKTtcbiAgICAgICAgdGhpcy53YXJlSG91c2VfZnVsbCgpO1xuICAgICAgICB0aGlzLmluaV92aWRlb3RhcGUoKTtcbiAgICAgICAgdGhpcy5kaWFtb25kX2xhYmVsLnN0cmluZyA9IHVzZXJfZGF0YS51c2VyX2RhdGEuZGlhbW9uZDtcbiAgICB9LFxuXG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgb25fdGVzdF9idXR0b25fY2xpY2soZSwgY3VzdG9tKSB7XG4gICAgICAgIHN3aXRjaCAoY3VzdG9tKSB7XG4gICAgICAgICAgICBjYXNlIFwiMFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkX2dvbGQodXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbC5nb2xkX21heCAqIDUwMCArIDUwMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiMVwiOlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkX2V4KDIgKiB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsICsgMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiMlwiOlxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFswXS5oYXZlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMF0uaGF2ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMubm9kZSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFsxXS5oYXZlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMV0uaGF2ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMubm9kZSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFsyXS5oYXZlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMl0uaGF2ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMubm9kZSwgMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFszXS5oYXZlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbM10uaGF2ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMubm9kZSwgMyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIjNcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm9uX2lhcF9idXR0b25fY2xpY2soKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xuICAgICAgICB0aGlzLmluaV9ub2RlKCk7XG4gICAgfSxcblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=