
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
        } // this.game_scene_js.create_pet(this.node, 0);
        // this.game_scene_js.create_pet(this.node, 1);
        // console.log("have pet " + user_data.user_data.pet[0].have);
        // console.log("have pet " + user_data.user_data.pet[1].have);


        break;

      case "3":
        user_data.user_data.pet[2].have = 1;
        break;

      case "4":
        user_data.user_data.pet[2].have = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lX3J1bGVzLmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjb25maWciLCJwdXNoIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsYW5kX3ByZWZhYiIsIlByZWZhYiIsImxhbmRfZ3JvdXBfbm9kZSIsIk5vZGUiLCJjZW50ZXJfbm9kZSIsImdvbGRfbGFiZWwiLCJMYWJlbCIsImV4X2xhYmVsIiwibGV2ZWxfbGFiZWwiLCJkaWFtb25kX2xhYmVsIiwiZ29sZF9wcm9ncmVzc19ub2RlIiwiUHJvZ3Jlc3NCYXIiLCJleF9wcm9ncmVzc19ub2RlIiwicGxheWVyX3ByZWZhYiIsInN0YWZmX3ByZWZhYl9hcnIiLCJ3YXJlSG91c2Vfbm9kZSIsIm1haW5fY2FtZXJhIiwidGlwc19ncm91cF9ub2RlIiwiYnV0dG9uX2dyb3VwX25vZGUiLCJob3RlbF9wcm9kdWNlX25vZGUiLCJ2aWRlb3RhcGVfYnV0dG9uIiwidmlkZW90YXBlX2J1dHRvbl9hcnIiLCJTcHJpdGVGcmFtZSIsIm9uX3dhdGVyaW5nX2J1dHRvbl9jbGljayIsInNvdW5kX2NvbnRyb2wiLCJwbGF5X3NvdW5kX2VmZmVjdCIsIm5vZGUiLCJnYW1lX3NjZW5lX2pzIiwiY3JlYXRlX2J1dHRvbl9ncm91cCIsInpJbmRleCIsImdldENvbXBvbmVudCIsImluaV9ub2RlIiwib25fdGlsbF9idXR0b25fY2xpY2siLCJvbl9zdHVkeV9idXR0b25fY2xpY2siLCJjcmVhdGVfc3R1ZHlfdWkiLCJvbl9ob21lX2J1dHRvbl9jbGljayIsImNyZWF0ZV9vcHRpb25fdWkiLCJvbl9wZXRfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX3BldF91aSIsIm9uX2hvdGVsX2J1dHRvbl9jbGljayIsImNyZWF0ZV9ob3RlbF91aSIsIm9uX3N0YWZmX2J1dHRvbl9jbGljayIsImNyZWF0ZV9zdGFmZl91aSIsImNyZWF0ZV9sYW5kIiwiYXJyIiwiT2JqZWN0Iiwia2V5cyIsImxhbmQiLCJpIiwibGVuZ3RoIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJjcmVhdGVfcGxheWVyIiwiY3JlYXRlX3N0YWZmIiwic3RhZmZfaW5kZXgiLCJzdGFmZiIsImhhdmUiLCJjaGlsZHJlbiIsImFkZF9nb2xkIiwibnVtIiwiYWRkX2dvbGRfYW5pbSIsInRpbWVDb3VudCIsImdvbGQiLCJnb2xkX21heCIsInNraWxsIiwiY2FsbGJhY2siLCJQbnVtIiwicGFyc2VJbnQiLCJzdHJpbmciLCJjcmVhdGVfdGlwc191aSIsInVuc2NoZWR1bGUiLCJzZXRfZ29sZF9wcm9ncmVzcyIsInNjaGVkdWxlIiwiYWRkX2RpYW1vbmQiLCJkaWFtb25kIiwiYWRkX2V4IiwiYWRkX2V4X2FuaW0iLCJleCIsIm5vd19leCIsIm5leHRfZXgiLCJsZXZlbCIsInNraWxsX3BvaW50Iiwic2V0X2V4X3Byb2dyZXNzIiwidHdlZW4iLCJ0byIsInByb2dyZXNzIiwic3RhcnQiLCJvbl93YXJlSG91c2VfY2xpY2siLCJjcmVhdGVfc2VsbF91aSIsIndhcmVIb3VzZV9mdWxsIiwid2FyZUhvdXNlX3NoY2VkdWxlIiwid2FyZUhvdXNlIiwiYWxsX2NhcGFjaXR5Iiwid2FyZUhvdXNlX2xldmVsIiwiY291bnQiLCJnZXRDaGlsZEJ5TmFtZSIsImFjdGl2ZSIsIm9uX29yY2hhcmRfYnV0dG9uX2NsaWNrIiwiYXV0b19zYXZlIiwiZngiLCJzYXZlIiwibWFjcm8iLCJSRVBFQVRfRk9SRVZFUiIsInVwZGF0YV9sYW5kIiwibGFuZF9pbmRleCIsInNhdmVfbG9naW5fdGltZSIsImxvZ2luX3RpbWUiLCJEYXRlIiwiZ2V0VGltZSIsIm9mZmxpbmVfcHJvZml0X3VpIiwibm93X3RpbWUiLCJtaW4iLCJNYXRoIiwiZmxvb3IiLCJjcmVhdGVfb2ZmbGluZV9wcm9maXRfdWkiLCJvbl9zaG9wX2J1dHRvbl9jbGljayIsImNyZWF0ZV9zaG9wX3VpIiwib25faWFwX2J1dHRvbl9jbGljayIsImNyZWF0ZV9pYXBfdWkiLCJjcmVhdGVfbm92aWNlIiwibm92aWNlIiwiY3JlYXRlX25vdmljZV91aSIsImNyZWF0ZV9idXR0b25fdGlwcyIsInBvc2l0aW9uIiwic3R1ZHlfdWlfdGlwcyIsInN0YWZmX3VpX3RpcHMiLCJzaG9wX3VpX3RpcHMiLCJzaG9wX3VpX2NhbGxiYWNrIiwibGFuZF9hcnIiLCJwbGFudF9hcnIiLCJwbGFudCIsImNvc3QiLCJuZWVkX2xldmVsIiwiaiIsInN0ZHV5X3RpcHNfY2FsbGJhY2siLCJzdGFmZl90aXBzX2NhbGxiYWNrIiwiY3JlYXRlX3BldCIsInBldCIsImNyZWF0ZV9wZXRfYSIsImluZGV4Iiwib25fZ2V0X2hvdGVsX3Byb2R1Y2VfY2xpY2siLCJlIiwidGFyZ2V0IiwiY3JlYXRlX2dvbGRfZWZmZWN0IiwiaG90ZWxfY2FjaGVfZ29sZCIsInVwZGF0ZV9ob3RlbF9wcm9kdWNlIiwibGFiZWwiLCJob3RlbF9idXlfcm9vbSIsInJvb21faW5kZXgiLCJob3RlbF8wIiwiaG90ZWxfMSIsImhvdGVsXzIiLCJob3RlbF8zIiwiaW5pX2hvdGVsX3Byb2R1Y2UiLCJob3RlbCIsImhvdGVsXzBfc2NoZWR1bGUiLCJwcm9kdWNlX3RpbWUiLCJwcm9kdWNlIiwiaG90ZWxfMV9zY2hlZHVsZSIsImhvdGVsXzJfc2NoZWR1bGUiLCJob3RlbF8zX3NjaGVkdWxlIiwianVkZ2VfZGF0ZSIsIm5vd19kYXRlIiwiZ2V0RGF0ZSIsInNhdmVfZGF0ZSIsInNoYXJlX2NvdW50IiwidW5kZWZpbmVkIiwiaW5pX3ZpZGVvdGFwZSIsInZpZGVvdGFwZV9wYXRoIiwidmlkZW90YXBlX3N0YXJ0X3RpbWUiLCJ2aWRlb3RhcGVfc3RhdGUiLCJvbl92aWRlb3RhcGVfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX3ZpZGVvdGFwZV91aSIsInZpZGVvdGFwZV90aW1lIiwic3RvcF92aWRlb3RhcGUiLCJzdGFydF92aWRlb3RhcGUiLCJ3eCIsInZpZGVvdGFwZV90aW1lQ29udHJvbCIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwicmVjb3JkZXIiLCJnZXRHYW1lUmVjb3JkZXJNYW5hZ2VyIiwib25TdGFydCIsInJlcyIsImR1cmF0aW9uIiwib25TdG9wIiwidmlkZW9QYXRoIiwic3RvcCIsInRpbWVfY291bnQiLCJsb2FkIiwibWFuYWdlciIsImRpcmVjdG9yIiwiZ2V0Q29sbGlzaW9uTWFuYWdlciIsImVuYWJsZWQiLCJwbGF5X2JnX3NvdW5kIiwib25fdGVzdF9idXR0b25fY2xpY2siLCJjdXN0b20iLCJvbkxvYWQiLCJmaW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBSEEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQSxJQUFJQyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUNBLElBQUlFLElBQUksR0FBR0YsT0FBTyxDQUFDLE1BQUQsQ0FBbEI7O0FBRUFHLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxXQUFXLEVBQUVKLEVBQUUsQ0FBQ0ssTUFEUjtBQUVSQyxJQUFBQSxlQUFlLEVBQUVOLEVBQUUsQ0FBQ08sSUFGWjtBQUdSQyxJQUFBQSxXQUFXLEVBQUVSLEVBQUUsQ0FBQ08sSUFIUjtBQUlSRSxJQUFBQSxVQUFVLEVBQUVULEVBQUUsQ0FBQ1UsS0FKUDtBQUtSQyxJQUFBQSxRQUFRLEVBQUVYLEVBQUUsQ0FBQ1UsS0FMTDtBQU1SRSxJQUFBQSxXQUFXLEVBQUVaLEVBQUUsQ0FBQ1UsS0FOUjtBQU9SRyxJQUFBQSxhQUFhLEVBQUViLEVBQUUsQ0FBQ1UsS0FQVjtBQVFSSSxJQUFBQSxrQkFBa0IsRUFBRWQsRUFBRSxDQUFDZSxXQVJmO0FBU1JDLElBQUFBLGdCQUFnQixFQUFFaEIsRUFBRSxDQUFDZSxXQVRiO0FBVVJFLElBQUFBLGFBQWEsRUFBRWpCLEVBQUUsQ0FBQ0ssTUFWVjtBQVdSYSxJQUFBQSxnQkFBZ0IsRUFBRSxDQUFDbEIsRUFBRSxD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QixDQUF4QixFQUEyQmpGLElBQTNCLEdBQWtDLENBQWxDO0FBQ0E7O0FBQ0osV0FBSyxHQUFMO0FBQ0loRSxRQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0JpSixHQUFwQixDQUF3QixDQUF4QixFQUEyQmpGLElBQTNCLEdBQWtDLENBQWxDO0FBQ0E7QUFsQ1I7O0FBbUNDO0FBQ0osR0E1b0JJO0FBOG9CTDZJLEVBQUFBLE1BOW9CSyxvQkE4b0JJO0FBQ0wsU0FBSzFLLGFBQUwsR0FBcUIvQixFQUFFLENBQUMwTSxJQUFILENBQVEsU0FBUixFQUFtQnhLLFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0EsU0FBS04sYUFBTCxHQUFxQjVCLEVBQUUsQ0FBQzBNLElBQUgsQ0FBUSxlQUFSLEVBQXlCeEssWUFBekIsQ0FBc0MsZUFBdEMsQ0FBckI7QUFDQSxTQUFLQyxRQUFMO0FBQ0gsR0FscEJJO0FBb3BCTHVELEVBQUFBLEtBcHBCSyxtQkFvcEJHLENBRVAsQ0F0cEJJLENBd3BCTDs7QUF4cEJLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xyXG52YXIgY29uZmlnID0gcmVxdWlyZShcImNvbmZpZ1wiKTtcclxudmFyIHB1c2ggPSByZXF1aXJlKFwicHVzaFwiKTtcclxuaW1wb3J0IGZ4IGZyb20gXCJmeFwiO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGxhbmRfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgbGFuZF9ncm91cF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGNlbnRlcl9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGdvbGRfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGV4X2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBsZXZlbF9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgZGlhbW9uZF9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgZ29sZF9wcm9ncmVzc19ub2RlOiBjYy5Qcm9ncmVzc0JhcixcclxuICAgICAgICBleF9wcm9ncmVzc19ub2RlOiBjYy5Qcm9ncmVzc0JhcixcclxuICAgICAgICBwbGF5ZXJfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgc3RhZmZfcHJlZmFiX2FycjogW2NjLlByZWZhYl0sXHJcbiAgICAgICAgd2FyZUhvdXNlX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgbWFpbl9jYW1lcmE6IGNjLk5vZGUsXHJcbiAgICAgICAgdGlwc19ncm91cF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGJ1dHRvbl9ncm91cF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGhvdGVsX3Byb2R1Y2Vfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICB2aWRlb3RhcGVfYnV0dG9uOiBjYy5Ob2RlLFxyXG4gICAgICAgIHZpZGVvdGFwZV9idXR0b25fYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLy/mtYfmsLTmjInpkq7ooqvngrnlh7tcclxuICAgIG9uX3dhdGVyaW5nX2J1dHRvbl9jbGljazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcIm1haW5fYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9idXR0b25fZ3JvdXAodGhpcy5jZW50ZXJfbm9kZSk7XHJcbiAgICAgICAgbm9kZS56SW5kZXggPSAzO1xyXG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJidXR0b25fbW9yZVwiKS5pbmlfbm9kZShcIndhdGVyaW5nXCIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/ogJXlnLDmjInpkq7ooqvngrnlh7tcclxuICAgIG9uX3RpbGxfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwibWFpbl9idXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2J1dHRvbl9ncm91cCh0aGlzLmNlbnRlcl9ub2RlKTtcclxuICAgICAgICBub2RlLnpJbmRleCA9IDM7XHJcbiAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcImJ1dHRvbl9tb3JlXCIpLmluaV9ub2RlKFwidGlsbFwiKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5a2m5Lmg5oyJ6ZKu6KKr54K55Ye7XHJcbiAgICBvbl9zdHVkeV9idXR0b25fY2xpY2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJtYWluX2J1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfc3R1ZHlfdWkodGhpcy5ub2RlKTtcclxuICAgICAgICBpZiAobm9kZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic3R1ZHlfdWlcIikuaW5pX25vZGUoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8vaG9tZSDooqvngrnlh7vml7ZcclxuICAgIG9uX2hvbWVfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX29wdGlvbl91aSgpO1xyXG4gICAgfSxcclxuICAgIC8v5a6g54mp5oyJ6ZKu6KKr54K55Ye7XHJcbiAgICBvbl9wZXRfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwibWFpbl9idXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldF91aSh0aGlzLm5vZGUpO1xyXG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJwZXRfdWlcIikuaW5pX25vZGUoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5peF6aaG5oyJ6ZKu6KKr54K55Ye7XHJcbiAgICBvbl9ob3RlbF9idXR0b25fY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfaG90ZWxfdWkoKTtcclxuICAgIH0sXHJcbiAgICAvL+mbh+S9o+WRmOW3pVxyXG4gICAgb25fc3RhZmZfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwibWFpbl9idXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3N0YWZmX3VpKHRoaXMubm9kZSk7XHJcbiAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInN0YWZmX3VpXCIpLmluaV9ub2RlKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+eUn+aIkOWcn+WcsFxyXG4gICAgY3JlYXRlX2xhbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubGFuZF9wcmVmYWIpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubGFuZF9ncm91cF9ub2RlO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcImxhbmRcIikuaW5pX25vZGUoaSk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+WIm+W7uueOqeWutuWwj+S6ulxyXG4gICAgY3JlYXRlX3BsYXllcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJfcHJlZmFiKTtcclxuICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuY2VudGVyX25vZGU7XHJcbiAgICB9LFxyXG4gICAgLy/liJvlu7rkvaPkurpcclxuICAgIGNyZWF0ZV9zdGFmZjogZnVuY3Rpb24gKHN0YWZmX2luZGV4KSB7XHJcbiAgICAgICAgaWYgKHN0YWZmX2luZGV4ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmYpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbaV0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnN0YWZmX3ByZWZhYl9hcnJbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5sYW5kX2dyb3VwX25vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzdGFmZl9haVwiKS5pbmlfbm9kZShpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3RhZmZfcHJlZmFiX2FycltzdGFmZl9pbmRleF0pO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubGFuZF9ncm91cF9ub2RlLmNoaWxkcmVuW3N0YWZmX2luZGV4XTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzdGFmZl9haVwiKS5pbmlfbm9kZShzdGFmZl9pbmRleCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9LFxyXG4gICAgLy/liLfmlrDph5HluIHmlbBcclxuICAgIGFkZF9nb2xkOiBmdW5jdGlvbiAobnVtKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWRkX2dvbGRfYW5pbSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkX2dvbGRfYW5pbSA9IDE7XHJcbiAgICAgICAgICAgIHZhciB0aW1lQ291bnQgPSAxMDtcclxuICAgICAgICAgICAgdmFyIGdvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XHJcbiAgICAgICAgICAgIHZhciBnb2xkX21heCA9IDUwMCAqIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJnb2xkX21heFwiXSArIDUwMDtcclxuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIFBudW0gPSBwYXJzZUludChudW0gLyB0aW1lQ291bnQpXHJcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29sZF9sYWJlbC5zdHJpbmcgPSBnb2xkICsgUG51bSArIFwiL1wiICsgZ29sZF9tYXg7XHJcbiAgICAgICAgICAgICAgICBpZiAodGltZUNvdW50IDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgKz0gbnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPiBnb2xkX21heCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJ1bl9jbGlja1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZSwgXCJnb2xkX2Z1bGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA9IGdvbGRfbWF4O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdvbGRfbGFiZWwuc3RyaW5nID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkICsgXCIvXCIgKyBnb2xkX21heDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0X2dvbGRfcHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZF9nb2xkX2FuaW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4wMyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkICs9IG51bTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGRfZGlhbW9uZDogZnVuY3Rpb24gKG51bSkge1xyXG4gICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuZGlhbW9uZCArPSBudW07XHJcbiAgICB9LFxyXG4gICAgLy/liLfmlrBleOaVsFxyXG4gICAgYWRkX2V4OiBmdW5jdGlvbiAobnVtKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWRkX2V4X2FuaW0gPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZF9leF9hbmltID0gMTtcclxuICAgICAgICAgICAgdmFyIHRpbWVDb3VudCA9IDEwO1xyXG4gICAgICAgICAgICB2YXIgZXggPSB1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leDtcclxuICAgICAgICAgICAgdmFyIG5leHRfZXggPSAyICogdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbDtcclxuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIFBudW0gPSBwYXJzZUludChudW0gLyB0aW1lQ291bnQpXHJcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhfbGFiZWwuc3RyaW5nID0gZXggKyBQbnVtICsgXCIvXCIgKyBuZXh0X2V4O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbWVDb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXggKz0gbnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leCA+IG5leHRfZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxfcG9pbnQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcImdpZnRfYWRfbGV2ZWxcIik7ICAgIC8vIHNob3cgbm90aWMgbGV2ZWwgdXBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldF9leF9wcm9ncmVzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkX2V4X2FuaW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4wNSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXggKz0gbnVtO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSxcclxuICAgIHNldF9nb2xkX3Byb2dyZXNzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGdvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XHJcbiAgICAgICAgdmFyIGdvbGRfbWF4ID0gNTAwICogdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImdvbGRfbWF4XCJdICsgNTAwO1xyXG4gICAgICAgIHRoaXMuZ29sZF9sYWJlbC5zdHJpbmcgPSBnb2xkICsgXCIvXCIgKyBnb2xkX21heDtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLmdvbGRfcHJvZ3Jlc3Nfbm9kZSlcclxuICAgICAgICAgICAgLnRvKDAuMywgeyBwcm9ncmVzczogZ29sZCAvIGdvbGRfbWF4IH0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxuICAgIHNldF9leF9wcm9ncmVzczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBub3dfZXggPSB1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leDtcclxuICAgICAgICB2YXIgbmV4dF9leCA9IDIgKiB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsO1xyXG4gICAgICAgIHRoaXMubGV2ZWxfbGFiZWwuc3RyaW5nID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbDtcclxuICAgICAgICB0aGlzLmV4X2xhYmVsLnN0cmluZyA9IG5vd19leCArIFwiL1wiICsgbmV4dF9leDtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLmV4X3Byb2dyZXNzX25vZGUpXHJcbiAgICAgICAgICAgIC50bygwLjMsIHsgcHJvZ3Jlc3M6IG5vd19leCAvIG5leHRfZXggfSlcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG4gICAgLy/ku5PlupPooqvngrnlh7tcclxuICAgIG9uX3dhcmVIb3VzZV9jbGljazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfc2VsbF91aSh0aGlzLm5vZGUpO1xyXG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzZWxsX3VpXCIpLmluaV9ub2RlKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+S7k+W6k+W3sua7oVxyXG4gICAgd2FyZUhvdXNlX2Z1bGw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMud2FyZUhvdXNlX3NoY2VkdWxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2UpO1xyXG4gICAgICAgICAgICB2YXIgYWxsX2NhcGFjaXR5ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VfbGV2ZWwgKiBjb25maWcud2FyZUhvdXNlW1wiYWxsX2NhcGFjaXR5XCJdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmNvdW50ID49IGFsbF9jYXBhY2l0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FyZUhvdXNlX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ3YXJlSG91c2VfZnVsbFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXJlSG91c2Vfbm9kZS5nZXRDaGlsZEJ5TmFtZShcIndhcmVIb3VzZV9mdWxsXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy53YXJlSG91c2Vfc2hjZWR1bGUsIDAuMSk7XHJcbiAgICB9LFxyXG4gICAgLy/mnpzlm63ooqvngrnlh7tcclxuICAgIG9uX29yY2hhcmRfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfYmdfc291bmQoXCJ2aWxsYWdlX2JnXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcInVuX2NsaWNrXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLm5vZGUsIFwidW5fZGV2ZWxvcFwiKTtcclxuICAgIH0sXHJcbiAgICAvL+iHquWKqOWtmOaho1xyXG4gICAgYXV0b19zYXZlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmeC5zYXZlKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XHJcbiAgICB9LFxyXG4gICAgLy/liLfmlrDlnJ/lnLBcclxuICAgIHVwZGF0YV9sYW5kOiBmdW5jdGlvbiAobGFuZF9pbmRleCkge1xyXG4gICAgICAgIC8v5Yid5aeL5YyW5Zyf5Zyw54q25oCBXHJcbiAgICAgICAgdGhpcy5sYW5kX2dyb3VwX25vZGUuY2hpbGRyZW5bbGFuZF9pbmRleF0uZ2V0Q29tcG9uZW50KFwibGFuZFwiKS5pbmlfbm9kZShsYW5kX2luZGV4KTtcclxuICAgIH0sXHJcbiAgICAvL+iusOW9leS4iue6v+aXtumXtFxyXG4gICAgc2F2ZV9sb2dpbl90aW1lOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubG9naW5fdGltZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubG9naW5fdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/liJvlu7rnprvnur/mlLbnm4p1aVxyXG4gICAgb2ZmbGluZV9wcm9maXRfdWk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbG9naW5fdGltZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubG9naW5fdGltZTtcclxuICAgICAgICB2YXIgbm93X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICB2YXIgbWluID0gTWF0aC5mbG9vcigobm93X3RpbWUgLSBsb2dpbl90aW1lKSAvICgxMDAwICogNjApKTtcclxuICAgICAgICBpZiAobWluID49IDUpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9vZmZsaW5lX3Byb2ZpdF91aSh0aGlzLm5vZGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5LqS5o6o5oyJ6ZKu6KKr54K55Ye7XHJcbiAgICAvLyBvbl9wdXNoX2J1dHRvbl9jbGljazogZnVuY3Rpb24gKGUsIG5hbWUpIHtcclxuICAgIC8vICAgICBpZiAodHlwZW9mICh3eCkgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIC8vICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgIC8vICAgICAgICAgICAgIGFwcElkOiBwdXNoW25hbWVdLmFwcGlkLFxyXG4gICAgLy8gICAgICAgICAgICAgcGF0aDogJycsXHJcbiAgICAvLyAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9KVxyXG4gICAgLy8gICAgIH07XHJcbiAgICAvLyB9LFxyXG4gICAgLy/llYblupfmjInpkq7ooqvngrnlh7tcclxuICAgIG9uX3Nob3BfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3Nob3BfdWkoKTtcclxuICAgIH0sXHJcbiAgICBvbl9pYXBfYnV0dG9uX2NsaWNrKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2lhcF91aSgpO1xyXG4gICAgfSxcclxuICAgIC8v5Yib5bu65paw5omL5byV5a+8XHJcbiAgICBjcmVhdGVfbm92aWNlKCkge1xyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLm5vdmljZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfbm92aWNlX3VpKCk7XHJcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubm92aWNlID0gMTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5Yib5bu65oyJ6ZKu5o+Q56S6XHJcbiAgICBjcmVhdGVfYnV0dG9uX3RpcHMoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmJ1dHRvbl9ncm91cF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfYnV0dG9uX3RpcHModGhpcy50aXBzX2dyb3VwX25vZGUsIHRoaXMuYnV0dG9uX2dyb3VwX25vZGUuY2hpbGRyZW5baV0ucG9zaXRpb24pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zdHVkeV91aV90aXBzKCk7XHJcbiAgICAgICAgdGhpcy5zdGFmZl91aV90aXBzKCk7XHJcbiAgICAgICAgdGhpcy5zaG9wX3VpX3RpcHMoKTtcclxuICAgIH0sXHJcbiAgICAvL+i0reS5sOWVhuWTgeaPkOekulxyXG4gICAgc2hvcF91aV90aXBzKCkge1xyXG4gICAgICAgIHRoaXMuc2hvcF91aV9jYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGxhbmRfYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kKVxyXG4gICAgICAgICAgICB2YXIgcGxhbnRfYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5wbGFudClcclxuICAgICAgICAgICAgdmFyIGdvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XHJcbiAgICAgICAgICAgIHZhciBsZXZlbCA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWw7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFuZF9hcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChnb2xkID49IGNvbmZpZy5sYW5kW2ldLmNvc3QgJiYgbGV2ZWwgPj0gY29uZmlnLmxhbmRbaV0ubmVlZF9sZXZlbCAmJiB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbaV0uaGF2ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aXBzX2dyb3VwX25vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwbGFudF9hcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChnb2xkID49IGNvbmZpZy5wbGFudFtqXS5jb3N0ICYmIGxldmVsID49IGNvbmZpZy5wbGFudFtqXS5uZWVkX2xldmVsICYmIHVzZXJfZGF0YS51c2VyX2RhdGEucGxhbnRbal0uaGF2ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aXBzX2dyb3VwX25vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zaG9wX3VpX2NhbGxiYWNrLCAxKTtcclxuICAgIH0sXHJcbiAgICAvL+WKoOeCueaPkOekulxyXG4gICAgc3R1ZHlfdWlfdGlwcygpIHtcclxuICAgICAgICB0aGlzLnN0ZHV5X3RpcHNfY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBza2lsbF9wb2ludCA9IHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxfcG9pbnQ7XHJcbiAgICAgICAgICAgIGlmIChza2lsbF9wb2ludCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL+aKgOiDveeCueS4jei2s+S4jeaPkOekulxyXG4gICAgICAgICAgICAgICAgdGhpcy50aXBzX2dyb3VwX25vZGUuY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuc3RkdXlfdGlwc19jYWxsYmFjaywgMSwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xyXG4gICAgfSxcclxuICAgIC8v6ZuH5L2j5bel5Lq65o+Q56S6XHJcbiAgICBzdGFmZl91aV90aXBzKCkge1xyXG4gICAgICAgIHRoaXMuc3RhZmZfdGlwc19jYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmYpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy/mi6XmnInov5nlnZflnJ/lnLBcclxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbaV0uaGF2ZSA9PSAxICYmIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA+PSBjb25maWcuc3RhZmZbaV0uY29zdCAmJiB1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW2ldLmhhdmUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzNdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblszXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuc3RhZmZfdGlwc19jYWxsYmFjaywgMSwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xyXG4gICAgfSxcclxuICAgIC8v5Yib5bu65a6g54mpXHJcbiAgICBjcmVhdGVfcGV0KCkge1xyXG4gICAgICAgIHZhciBhcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLnBldCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W2ldLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9wZXQodGhpcy5jZW50ZXJfbm9kZSwgaSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/ljZXkuKrliJvlu7rlrqDnialcclxuICAgIGNyZWF0ZV9wZXRfYShpbmRleCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMuY2VudGVyX25vZGUsIGluZGV4KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgLy/pooblj5bmlLbnm4pcclxuICAgIG9uX2dldF9ob3RlbF9wcm9kdWNlX2NsaWNrKGUpIHtcclxuICAgICAgICB2YXIgbm9kZSA9IGUudGFyZ2V0O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfZ29sZF9lZmZlY3Qobm9kZSwgaSwgMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWRkX2dvbGQodXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbF9jYWNoZV9nb2xkKTtcclxuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQgPSAwO1xyXG4gICAgfSxcclxuICAgIC8v5Yi35paw5peF6aaG5pS255uKXHJcbiAgICB1cGRhdGVfaG90ZWxfcHJvZHVjZSgpIHtcclxuICAgICAgICAvLzFz5pu05paw5LiA5qyh5pWw5o2uXHJcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWxfY2FjaGVfZ29sZCA9IHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxfY2FjaGVfZ29sZDtcclxuICAgICAgICAgICAgaWYgKGhvdGVsX2NhY2hlX2dvbGQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF9wcm9kdWNlX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGVsX3Byb2R1Y2Vfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgbGFiZWwgPSB0aGlzLmhvdGVsX3Byb2R1Y2Vfbm9kZS5nZXRDaGlsZEJ5TmFtZShcImhvdGVsX3Byb2R1Y2VfbGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgbGFiZWwuc3RyaW5nID0gaG90ZWxfY2FjaGVfZ29sZDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcclxuICAgIH0sXHJcbiAgICAvL+i0reS5sOS4gOS4quaIv+mXtFxyXG4gICAgaG90ZWxfYnV5X3Jvb20ocm9vbV9pbmRleCkge1xyXG4gICAgICAgIHN3aXRjaCAocm9vbV9pbmRleCkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGVsXzAoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGVsXzEoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGVsXzIoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGVsXzMoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/liJ3lp4vljJbml4Xppobkuqflh7pcclxuICAgIGluaV9ob3RlbF9wcm9kdWNlKCkge1xyXG5cclxuICAgICAgICAvL+WQr+WKqOWIt+aWsOaUtuebilxyXG4gICAgICAgIHRoaXMudXBkYXRlX2hvdGVsX3Byb2R1Y2UoKTtcclxuXHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxbMF0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG90ZWxfMCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxbMV0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG90ZWxfMSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxbMl0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG90ZWxfMigpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxbM10uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG90ZWxfMygpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSxcclxuICAgIC8vaG90ZWwwIOeUn+aIkFxyXG4gICAgaG90ZWxfMCgpIHtcclxuICAgICAgICB2YXIgdGltZUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmhvdGVsXzBfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRpbWVDb3VudCsrO1xyXG4gICAgICAgICAgICBpZiAodGltZUNvdW50ID49IGNvbmZpZy5ob3RlbFswXS5wcm9kdWNlX3RpbWUpIHtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxfY2FjaGVfZ29sZCArPSBjb25maWcuaG90ZWxbMF0ucHJvZHVjZTtcclxuICAgICAgICAgICAgICAgIHRpbWVDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuaG90ZWxfMF9zY2hlZHVsZSwgMSwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xyXG4gICAgfSxcclxuICAgIC8vaG90ZWwxIOeUn+aIkFxyXG4gICAgaG90ZWxfMSgpIHtcclxuICAgICAgICB2YXIgdGltZUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmhvdGVsXzFfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRpbWVDb3VudCsrO1xyXG4gICAgICAgICAgICBpZiAodGltZUNvdW50ID49IGNvbmZpZy5ob3RlbFsxXS5wcm9kdWNlX3RpbWUpIHtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxfY2FjaGVfZ29sZCArPSBjb25maWcuaG90ZWxbMV0ucHJvZHVjZTtcclxuICAgICAgICAgICAgICAgIHRpbWVDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuaG90ZWxfMV9zY2hlZHVsZSwgMSwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xyXG4gICAgfSxcclxuICAgIC8vaG90ZWwyIOeUn+aIkFxyXG4gICAgaG90ZWxfMigpIHtcclxuICAgICAgICB2YXIgdGltZUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmhvdGVsXzJfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRpbWVDb3VudCsrO1xyXG4gICAgICAgICAgICBpZiAodGltZUNvdW50ID49IGNvbmZpZy5ob3RlbFsyXS5wcm9kdWNlX3RpbWUpIHtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxfY2FjaGVfZ29sZCArPSBjb25maWcuaG90ZWxbMl0ucHJvZHVjZTtcclxuICAgICAgICAgICAgICAgIHRpbWVDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuaG90ZWxfMl9zY2hlZHVsZSwgMSwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xyXG4gICAgfSxcclxuICAgIC8vaG90ZWwzIOeUn+aIkFxyXG4gICAgaG90ZWxfMygpIHtcclxuICAgICAgICB2YXIgdGltZUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmhvdGVsXzNfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRpbWVDb3VudCsrO1xyXG4gICAgICAgICAgICBpZiAodGltZUNvdW50ID49IGNvbmZpZy5ob3RlbFszXS5wcm9kdWNlX3RpbWUpIHtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxfY2FjaGVfZ29sZCArPSBjb25maWcuaG90ZWxbM10ucHJvZHVjZTtcclxuICAgICAgICAgICAgICAgIHRpbWVDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuaG90ZWxfM19zY2hlZHVsZSwgMSwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xyXG4gICAgfSxcclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy/liKTmlq3lvZPliY3ml6XmnJ9cclxuICAgIGp1ZGdlX2RhdGUoKSB7XHJcbiAgICAgICAgdmFyIG5vd19kYXRlID0gbmV3IERhdGUoKS5nZXREYXRlKCk7XHJcbiAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEucGV0KTtcclxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgPT0gMCkge1xyXG4gICAgICAgICAgICAvL+aWsOWtmOaho+iusOW9leaXpeacn1xyXG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNhdmVfZGF0ZSA9IG5vd19kYXRlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgIT0gbm93X2RhdGUpIHtcclxuICAgICAgICAgICAgLy/ml6XmnJ/kuI3nm7jlkIzvvIzpu5jorqTnrKzkuozlpKnlj4rku6XlkI4s6YeN572u5YiG5Lqr5qyh5pWwXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbaV0uc2hhcmVfY291bnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W2ldLnNoYXJlX2NvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyX2RhdGEudXNlcl9kYXRhLnZpZGVvdGFwZV9zaGFyZV9jb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgPSBub3dfZGF0ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+aXpeacn+S4uuWQjOS4gOWkqVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgLy/liJ3lp4vljJblvZXlsY/lip/og71cclxuICAgIGluaV92aWRlb3RhcGUoKSB7XHJcbiAgICAgICAgLy/lvZXlsY/nmoTkv53lrZjot6/lvoRcclxuICAgICAgICB0aGlzLnZpZGVvdGFwZV9wYXRoID0gbnVsbDtcclxuICAgICAgICB0aGlzLnZpZGVvdGFwZV9zdGFydF90aW1lID0gMDtcclxuICAgICAgICB0aGlzLnZpZGVvdGFwZV9zdGF0ZSA9IFwidW5zdGFydFwiO1xyXG4gICAgfSxcclxuICAgIG9uX3ZpZGVvdGFwZV9idXR0b25fY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLnZpZGVvdGFwZV9zdGF0ZSA9PSBcInVuc3RhcnRcIikge1xyXG4gICAgICAgICAgICAvL+acquW8gOWni+i/m+WFpeWlluWKseeVjOmdolxyXG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3ZpZGVvdGFwZV91aSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy52aWRlb3RhcGVfc3RhdGUgPT0gXCJzdGFydFwiKSB7XHJcbiAgICAgICAgICAgIC8v5byA5aeL5ZCO5aSn5LqOM+enkuaJjeiDveWFs+mXrVxyXG4gICAgICAgICAgICB2YXIgbm93X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgdmFyIHZpZGVvdGFwZV90aW1lID0gbm93X3RpbWUgLSB0aGlzLnZpZGVvdGFwZV9zdGFydF90aW1lO1xyXG4gICAgICAgICAgICBpZiAodmlkZW90YXBlX3RpbWUgPCAzMDAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5ub2RlLCBcInZpZGVvdGFwZV9ub190aW1lXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wX3ZpZGVvdGFwZSgpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/lvIDlp4vmuLjmiI/lvZXlsY9cclxuICAgIHN0YXJ0X3ZpZGVvdGFwZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8v6K6w5b2V5LiA5Liq5pe26Ze05oizXHJcbiAgICAgICAgdGhpcy52aWRlb3RhcGVfc3RhcnRfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnZpZGVvdGFwZV9zdGF0ZSA9IFwic3RhcnRcIjtcclxuICAgICAgICAgICAgdGhpcy52aWRlb3RhcGVfdGltZUNvbnRyb2woKTtcclxuICAgICAgICAgICAgLy/liIfmjaLlvZXlsY/mjInpkq7lm77moIdcclxuICAgICAgICAgICAgdGhpcy52aWRlb3RhcGVfYnV0dG9uLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy52aWRlb3RhcGVfYnV0dG9uX2FyclsxXTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZSwgXCJ2aWRlb3RhcGVfc3RhcnRcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlY29yZGVyID0gd3guZ2V0R2FtZVJlY29yZGVyTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLnJlY29yZGVyLm9uU3RhcnQocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5b2V5bGP5byA5aeLXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gZG8gc29tZXRoaW5lO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5yZWNvcmRlci5zdGFydCh7XHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogNjBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9LFxyXG4gICAgLy/nu5PmnZ/muLjmiI/lvZXlsY9cclxuICAgIHN0b3BfdmlkZW90YXBlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy52aWRlb3RhcGVfc3RhdGUgPSBcInVuc3RhcnRcIjtcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZSwgXCJ2aWRvdGFwZV9vdmVyXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvdGFwZV9idXR0b24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnZpZGVvdGFwZV9idXR0b25fYXJyWzBdO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZWNvcmRlci5vblN0b3AocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcy52aWRlb1BhdGgsIFwi5b2V5bGP57uT5p2fXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gZG8gc29tZXRoaW5lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb3RhcGVfcGF0aCA9IHJlcy52aWRlb1BhdGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3ZpZGVvdGFwZV91aSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5yZWNvcmRlci5zdG9wKCk7XHJcblxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/lvZXlsY/ml7bpl7TmjqfliLZcclxuICAgIHZpZGVvdGFwZV90aW1lQ29udHJvbCgpIHtcclxuICAgICAgICB2YXIgdGltZV9jb3VudCA9IDA7XHJcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aW1lX2NvdW50Kys7XHJcbiAgICAgICAgICAgIC8v6LaF6L+H5LqG5pyA5aSn5pe26ZW/5oiW6ICF5b2V5Yi254q25oCB5Li65pyq5byA5ZCvXHJcbiAgICAgICAgICAgIGlmICh0aW1lX2NvdW50ID49IDYwIHx8IHRoaXMudmlkZW90YXBlX3N0YXRlID09IFwidW5zdGFydFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgdGltZV9jb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BfdmlkZW90YXBlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5ub2RlLCBcInZpZG90YXBlX292ZXJcIik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIC8v5Yid5aeL5YyW6IqC54K5XHJcbiAgICBpbmlfbm9kZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ4LmxvYWQoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZV9sYW5kKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVfcGV0KCk7XHJcbiAgICAgICAgdGhpcy5hZGRfZ29sZF9hbmltID0gMDtcclxuICAgICAgICB0aGlzLmFkZF9leF9hbmltID0gMDtcclxuICAgICAgICAvL+iwg+eUqOeisOaSnuajgOa1i+e7hOS7tlxyXG4gICAgICAgIHRoaXMubWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKTtcclxuICAgICAgICAvL+m7mOiupOeisOaSnuS4uuWFs1xyXG4gICAgICAgIHRoaXMubWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNldF9nb2xkX3Byb2dyZXNzKCk7XHJcbiAgICAgICAgdGhpcy5zZXRfZXhfcHJvZ3Jlc3MoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZV9wbGF5ZXIoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZV9zdGFmZigpO1xyXG4gICAgICAgIHRoaXMuYXV0b19zYXZlKCk7XHJcbiAgICAgICAgdGhpcy5zYXZlX2xvZ2luX3RpbWUoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZV9idXR0b25fdGlwcygpO1xyXG4gICAgICAgIHRoaXMub2ZmbGluZV9wcm9maXRfdWkoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZV9ub3ZpY2UoKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9iZ19zb3VuZChcImhvbWVfYmdcIik7XHJcbiAgICAgICAgdGhpcy5pbmlfaG90ZWxfcHJvZHVjZSgpO1xyXG4gICAgICAgIHRoaXMuanVkZ2VfZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMud2FyZUhvdXNlX2Z1bGwoKTtcclxuICAgICAgICB0aGlzLmluaV92aWRlb3RhcGUoKTtcclxuICAgICAgICB0aGlzLmRpYW1vbmRfbGFiZWwuc3RyaW5nID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5kaWFtb25kO1xyXG4gICAgfSxcclxuXHJcblxyXG5cclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIG9uX3Rlc3RfYnV0dG9uX2NsaWNrKGUsIGN1c3RvbSkge1xyXG4gICAgICAgIHN3aXRjaCAoY3VzdG9tKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZF9nb2xkKHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGwuZ29sZF9tYXggKiA1MDAgKyA1MDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZF9leCgyICogdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbCArIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIyXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMF0uaGF2ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMF0uaGF2ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9wZXQodGhpcy5ub2RlLCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFsxXS5oYXZlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFsxXS5oYXZlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLm5vZGUsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzJdLmhhdmUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzJdLmhhdmUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMubm9kZSwgMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbM10uaGF2ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbM10uaGF2ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9wZXQodGhpcy5ub2RlLCAzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMubm9kZSwgMCk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLm5vZGUsIDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJoYXZlIHBldCBcIiArIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzBdLmhhdmUpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJoYXZlIHBldCBcIiArIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzFdLmhhdmUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIzXCI6XHJcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFsyXS5oYXZlID0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiNFwiOlxyXG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMl0uaGF2ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuaW5pX25vZGUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==