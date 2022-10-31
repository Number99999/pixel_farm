
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lX3J1bGVzLmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjb25maWciLCJwdXNoIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsYW5kX3ByZWZhYiIsIlByZWZhYiIsImxhbmRfZ3JvdXBfbm9kZSIsIk5vZGUiLCJjZW50ZXJfbm9kZSIsImdvbGRfbGFiZWwiLCJMYWJlbCIsImV4X2xhYmVsIiwibGV2ZWxfbGFiZWwiLCJkaWFtb25kX2xhYmVsIiwiZ29sZF9wcm9ncmVzc19ub2RlIiwiUHJvZ3Jlc3NCYXIiLCJleF9wcm9ncmVzc19ub2RlIiwicGxheWVyX3ByZWZhYiIsInN0YWZmX3ByZWZhYl9hcnIiLCJ3YXJlSG91c2Vfbm9kZSIsIm1haW5fY2FtZXJhIiwidGlwc19ncm91cF9ub2RlIiwiYnV0dG9uX2dyb3VwX25vZGUiLCJob3RlbF9wcm9kdWNlX25vZGUiLCJ2aWRlb3RhcGVfYnV0dG9uIiwidmlkZW90YXBlX2J1dHRvbl9hcnIiLCJTcHJpdGVGcmFtZSIsIm9uX3dhdGVyaW5nX2J1dHRvbl9jbGljayIsInNvdW5kX2NvbnRyb2wiLCJwbGF5X3NvdW5kX2VmZmVjdCIsIm5vZGUiLCJnYW1lX3NjZW5lX2pzIiwiY3JlYXRlX2J1dHRvbl9ncm91cCIsInpJbmRleCIsImdldENvbXBvbmVudCIsImluaV9ub2RlIiwib25fdGlsbF9idXR0b25fY2xpY2siLCJvbl9zdHVkeV9idXR0b25fY2xpY2siLCJjcmVhdGVfc3R1ZHlfdWkiLCJvbl9ob21lX2J1dHRvbl9jbGljayIsImNyZWF0ZV9vcHRpb25fdWkiLCJvbl9wZXRfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX3BldF91aSIsIm9uX2hvdGVsX2J1dHRvbl9jbGljayIsImNyZWF0ZV9ob3RlbF91aSIsIm9uX3N0YWZmX2J1dHRvbl9jbGljayIsImNyZWF0ZV9zdGFmZl91aSIsImNyZWF0ZV9sYW5kIiwiYXJyIiwiT2JqZWN0Iiwia2V5cyIsImxhbmQiLCJpIiwibGVuZ3RoIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJjcmVhdGVfcGxheWVyIiwiY3JlYXRlX3N0YWZmIiwic3RhZmZfaW5kZXgiLCJzdGFmZiIsImhhdmUiLCJjaGlsZHJlbiIsImFkZF9nb2xkIiwibnVtIiwiYWRkX2dvbGRfYW5pbSIsInRpbWVDb3VudCIsImdvbGQiLCJnb2xkX21heCIsInNraWxsIiwiY2FsbGJhY2siLCJQbnVtIiwicGFyc2VJbnQiLCJzdHJpbmciLCJjcmVhdGVfdGlwc191aSIsInVuc2NoZWR1bGUiLCJzZXRfZ29sZF9wcm9ncmVzcyIsInNjaGVkdWxlIiwiYWRkX2RpYW1vbmQiLCJkaWFtb25kIiwiYWRkX2V4IiwiYWRkX2V4X2FuaW0iLCJleCIsIm5vd19leCIsIm5leHRfZXgiLCJsZXZlbCIsInNraWxsX3BvaW50Iiwic2V0X2V4X3Byb2dyZXNzIiwidHdlZW4iLCJ0byIsInByb2dyZXNzIiwic3RhcnQiLCJvbl93YXJlSG91c2VfY2xpY2siLCJjcmVhdGVfc2VsbF91aSIsIndhcmVIb3VzZV9mdWxsIiwid2FyZUhvdXNlX3NoY2VkdWxlIiwid2FyZUhvdXNlIiwiYWxsX2NhcGFjaXR5Iiwid2FyZUhvdXNlX2xldmVsIiwiY291bnQiLCJnZXRDaGlsZEJ5TmFtZSIsImFjdGl2ZSIsIm9uX29yY2hhcmRfYnV0dG9uX2NsaWNrIiwiYXV0b19zYXZlIiwiZngiLCJzYXZlIiwibWFjcm8iLCJSRVBFQVRfRk9SRVZFUiIsInVwZGF0YV9sYW5kIiwibGFuZF9pbmRleCIsInNhdmVfbG9naW5fdGltZSIsImxvZ2luX3RpbWUiLCJEYXRlIiwiZ2V0VGltZSIsIm9mZmxpbmVfcHJvZml0X3VpIiwibm93X3RpbWUiLCJtaW4iLCJNYXRoIiwiZmxvb3IiLCJjcmVhdGVfb2ZmbGluZV9wcm9maXRfdWkiLCJvbl9zaG9wX2J1dHRvbl9jbGljayIsImNyZWF0ZV9zaG9wX3VpIiwiY3JlYXRlX25vdmljZSIsIm5vdmljZSIsImNyZWF0ZV9ub3ZpY2VfdWkiLCJjcmVhdGVfYnV0dG9uX3RpcHMiLCJwb3NpdGlvbiIsInN0dWR5X3VpX3RpcHMiLCJzdGFmZl91aV90aXBzIiwic2hvcF91aV90aXBzIiwic2hvcF91aV9jYWxsYmFjayIsImxhbmRfYXJyIiwicGxhbnRfYXJyIiwicGxhbnQiLCJjb3N0IiwibmVlZF9sZXZlbCIsImoiLCJzdGR1eV90aXBzX2NhbGxiYWNrIiwic3RhZmZfdGlwc19jYWxsYmFjayIsImNyZWF0ZV9wZXQiLCJwZXQiLCJjcmVhdGVfcGV0X2EiLCJpbmRleCIsIm9uX2dldF9ob3RlbF9wcm9kdWNlX2NsaWNrIiwiZSIsInRhcmdldCIsImNyZWF0ZV9nb2xkX2VmZmVjdCIsImhvdGVsX2NhY2hlX2dvbGQiLCJ1cGRhdGVfaG90ZWxfcHJvZHVjZSIsImxhYmVsIiwiaG90ZWxfYnV5X3Jvb20iLCJyb29tX2luZGV4IiwiaG90ZWxfMCIsImhvdGVsXzEiLCJob3RlbF8yIiwiaG90ZWxfMyIsImluaV9ob3RlbF9wcm9kdWNlIiwiaG90ZWwiLCJob3RlbF8wX3NjaGVkdWxlIiwicHJvZHVjZV90aW1lIiwicHJvZHVjZSIsImhvdGVsXzFfc2NoZWR1bGUiLCJob3RlbF8yX3NjaGVkdWxlIiwiaG90ZWxfM19zY2hlZHVsZSIsImp1ZGdlX2RhdGUiLCJub3dfZGF0ZSIsImdldERhdGUiLCJzYXZlX2RhdGUiLCJzaGFyZV9jb3VudCIsInVuZGVmaW5lZCIsImluaV92aWRlb3RhcGUiLCJ2aWRlb3RhcGVfcGF0aCIsInZpZGVvdGFwZV9zdGFydF90aW1lIiwidmlkZW90YXBlX3N0YXRlIiwib25fdmlkZW90YXBlX2J1dHRvbl9jbGljayIsImNyZWF0ZV92aWRlb3RhcGVfdWkiLCJ2aWRlb3RhcGVfdGltZSIsInN0b3BfdmlkZW90YXBlIiwic3RhcnRfdmlkZW90YXBlIiwid3giLCJ2aWRlb3RhcGVfdGltZUNvbnRyb2wiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsInJlY29yZGVyIiwiZ2V0R2FtZVJlY29yZGVyTWFuYWdlciIsIm9uU3RhcnQiLCJyZXMiLCJkdXJhdGlvbiIsIm9uU3RvcCIsInZpZGVvUGF0aCIsInN0b3AiLCJ0aW1lX2NvdW50IiwibG9hZCIsIm1hbmFnZXIiLCJkaXJlY3RvciIsImdldENvbGxpc2lvbk1hbmFnZXIiLCJlbmFibGVkIiwicGxheV9iZ19zb3VuZCIsIm9uX3Rlc3RfYnV0dG9uX2NsaWNrIiwiY3VzdG9tIiwib25Mb2FkIiwiZmluZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUhBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0EsSUFBSUMsTUFBTSxHQUFHRCxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQSxJQUFJRSxJQUFJLEdBQUdGLE9BQU8sQ0FBQyxNQUFELENBQWxCOztBQUVBRyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsV0FBVyxFQUFFSixFQUFFLENBQUNLLE1BRFI7QUFFUkMsSUFBQUEsZUFBZSxFQUFFTixFQUFFLENBQUNPLElBRlo7QUFHUkMsSUFBQUEsV0FBVyxFQUFFUixFQUFFLENBQUNPLElBSFI7QUFJUkUsSUFBQUEsVUFBVSxFQUFFVCxFQUFFLENBQUNVLEtBSlA7QUFLUkMsSUFBQUEsUUFBUSxFQUFFWCxFQUFFLENBQUNVLEtBTEw7QUFNUkUsSUFBQUEsV0FBVyxFQUFFWixFQUFFLENBQUNVLEtBTlI7QUFPUkcsSUFBQUEsYUFBYSxFQUFFYixFQUFFLENBQUNVLEtBUFY7QUFRUkksSUFBQUEsa0JBQWtCLEVBQUVkLEVBQUUsQ0FBQ2UsV0FSZjtBQVNSQyxJQUFBQSxnQkFBZ0IsRUFBRWhCLEVBQUUsQ0FBQ2UsV0FUYjtBQVVSRSxJQUFBQSxhQUFhLEVBQUVqQixFQUFFLENBQUNLLE1BVlY7QUFXUmEsSUFBQUEsZ0JBQWdCLEVBQUUsQ0FBQ2xCLEVBQUUsQ0FBQ0ssTUFBSixDQVhWO0FBWVJjLElBQUFBLGNBQWMsRUFBRW5C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QixFQUEyQi9FLElBQTNCLEdBQWtDLENBQWxDO0FBQ0E7QUFsQ1I7O0FBbUNDO0FBQ0osR0F4b0JJO0FBMG9CTDJJLEVBQUFBLE1BMW9CSyxvQkEwb0JJO0FBQ0wsU0FBS3hLLGFBQUwsR0FBcUIvQixFQUFFLENBQUN3TSxJQUFILENBQVEsU0FBUixFQUFtQnRLLFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0EsU0FBS04sYUFBTCxHQUFxQjVCLEVBQUUsQ0FBQ3dNLElBQUgsQ0FBUSxlQUFSLEVBQXlCdEssWUFBekIsQ0FBc0MsZUFBdEMsQ0FBckI7QUFDQSxTQUFLQyxRQUFMO0FBQ0gsR0E5b0JJO0FBZ3BCTHVELEVBQUFBLEtBaHBCSyxtQkFncEJHLENBRVAsQ0FscEJJLENBb3BCTDs7QUFwcEJLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xyXG52YXIgY29uZmlnID0gcmVxdWlyZShcImNvbmZpZ1wiKTtcclxudmFyIHB1c2ggPSByZXF1aXJlKFwicHVzaFwiKTtcclxuaW1wb3J0IGZ4IGZyb20gXCJmeFwiO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGxhbmRfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgbGFuZF9ncm91cF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGNlbnRlcl9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGdvbGRfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGV4X2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBsZXZlbF9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgZGlhbW9uZF9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgZ29sZF9wcm9ncmVzc19ub2RlOiBjYy5Qcm9ncmVzc0JhcixcclxuICAgICAgICBleF9wcm9ncmVzc19ub2RlOiBjYy5Qcm9ncmVzc0JhcixcclxuICAgICAgICBwbGF5ZXJfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgc3RhZmZfcHJlZmFiX2FycjogW2NjLlByZWZhYl0sXHJcbiAgICAgICAgd2FyZUhvdXNlX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgbWFpbl9jYW1lcmE6IGNjLk5vZGUsXHJcbiAgICAgICAgdGlwc19ncm91cF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGJ1dHRvbl9ncm91cF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGhvdGVsX3Byb2R1Y2Vfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICB2aWRlb3RhcGVfYnV0dG9uOiBjYy5Ob2RlLFxyXG4gICAgICAgIHZpZGVvdGFwZV9idXR0b25fYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLy/mtYfmsLTmjInpkq7ooqvngrnlh7tcclxuICAgIG9uX3dhdGVyaW5nX2J1dHRvbl9jbGljazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcIm1haW5fYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9idXR0b25fZ3JvdXAodGhpcy5jZW50ZXJfbm9kZSk7XHJcbiAgICAgICAgbm9kZS56SW5kZXggPSAzO1xyXG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJidXR0b25fbW9yZVwiKS5pbmlfbm9kZShcIndhdGVyaW5nXCIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/ogJXlnLDmjInpkq7ooqvngrnlh7tcclxuICAgIG9uX3RpbGxfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwibWFpbl9idXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2J1dHRvbl9ncm91cCh0aGlzLmNlbnRlcl9ub2RlKTtcclxuICAgICAgICBub2RlLnpJbmRleCA9IDM7XHJcbiAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcImJ1dHRvbl9tb3JlXCIpLmluaV9ub2RlKFwidGlsbFwiKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5a2m5Lmg5oyJ6ZKu6KKr54K55Ye7XHJcbiAgICBvbl9zdHVkeV9idXR0b25fY2xpY2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJtYWluX2J1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfc3R1ZHlfdWkodGhpcy5ub2RlKTtcclxuICAgICAgICBpZiAobm9kZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic3R1ZHlfdWlcIikuaW5pX25vZGUoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8vaG9tZSDooqvngrnlh7vml7ZcclxuICAgIG9uX2hvbWVfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX29wdGlvbl91aSgpO1xyXG4gICAgfSxcclxuICAgIC8v5a6g54mp5oyJ6ZKu6KKr54K55Ye7XHJcbiAgICBvbl9wZXRfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwibWFpbl9idXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldF91aSh0aGlzLm5vZGUpO1xyXG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJwZXRfdWlcIikuaW5pX25vZGUoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5peF6aaG5oyJ6ZKu6KKr54K55Ye7XHJcbiAgICBvbl9ob3RlbF9idXR0b25fY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfaG90ZWxfdWkoKTtcclxuICAgIH0sXHJcbiAgICAvL+mbh+S9o+WRmOW3pVxyXG4gICAgb25fc3RhZmZfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwibWFpbl9idXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3N0YWZmX3VpKHRoaXMubm9kZSk7XHJcbiAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInN0YWZmX3VpXCIpLmluaV9ub2RlKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+eUn+aIkOWcn+WcsFxyXG4gICAgY3JlYXRlX2xhbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubGFuZF9wcmVmYWIpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubGFuZF9ncm91cF9ub2RlO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcImxhbmRcIikuaW5pX25vZGUoaSk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+WIm+W7uueOqeWutuWwj+S6ulxyXG4gICAgY3JlYXRlX3BsYXllcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJfcHJlZmFiKTtcclxuICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuY2VudGVyX25vZGU7XHJcbiAgICB9LFxyXG4gICAgLy/liJvlu7rkvaPkurpcclxuICAgIGNyZWF0ZV9zdGFmZjogZnVuY3Rpb24gKHN0YWZmX2luZGV4KSB7XHJcbiAgICAgICAgaWYgKHN0YWZmX2luZGV4ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmYpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbaV0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnN0YWZmX3ByZWZhYl9hcnJbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5sYW5kX2dyb3VwX25vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzdGFmZl9haVwiKS5pbmlfbm9kZShpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3RhZmZfcHJlZmFiX2FycltzdGFmZl9pbmRleF0pO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubGFuZF9ncm91cF9ub2RlLmNoaWxkcmVuW3N0YWZmX2luZGV4XTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzdGFmZl9haVwiKS5pbmlfbm9kZShzdGFmZl9pbmRleCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9LFxyXG4gICAgLy/liLfmlrDph5HluIHmlbBcclxuICAgIGFkZF9nb2xkOiBmdW5jdGlvbiAobnVtKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWRkX2dvbGRfYW5pbSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkX2dvbGRfYW5pbSA9IDE7XHJcbiAgICAgICAgICAgIHZhciB0aW1lQ291bnQgPSAxMDtcclxuICAgICAgICAgICAgdmFyIGdvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XHJcbiAgICAgICAgICAgIHZhciBnb2xkX21heCA9IDUwMCAqIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJnb2xkX21heFwiXSArIDUwMDtcclxuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIFBudW0gPSBwYXJzZUludChudW0gLyB0aW1lQ291bnQpXHJcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29sZF9sYWJlbC5zdHJpbmcgPSBnb2xkICsgUG51bSArIFwiL1wiICsgZ29sZF9tYXg7XHJcbiAgICAgICAgICAgICAgICBpZiAodGltZUNvdW50IDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgKz0gbnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPiBnb2xkX21heCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJ1bl9jbGlja1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZSwgXCJnb2xkX2Z1bGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA9IGdvbGRfbWF4O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdvbGRfbGFiZWwuc3RyaW5nID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkICsgXCIvXCIgKyBnb2xkX21heDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0X2dvbGRfcHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZF9nb2xkX2FuaW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4wMyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkICs9IG51bTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGRfZGlhbW9uZDogZnVuY3Rpb24gKG51bSkge1xyXG4gICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuZGlhbW9uZCArPSBudW07XHJcbiAgICB9LFxyXG4gICAgLy/liLfmlrBleOaVsFxyXG4gICAgYWRkX2V4OiBmdW5jdGlvbiAobnVtKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWRkX2V4X2FuaW0gPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZF9leF9hbmltID0gMTtcclxuICAgICAgICAgICAgdmFyIHRpbWVDb3VudCA9IDEwO1xyXG4gICAgICAgICAgICB2YXIgZXggPSB1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leDtcclxuICAgICAgICAgICAgdmFyIG5leHRfZXggPSAyICogdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbDtcclxuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIFBudW0gPSBwYXJzZUludChudW0gLyB0aW1lQ291bnQpXHJcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhfbGFiZWwuc3RyaW5nID0gZXggKyBQbnVtICsgXCIvXCIgKyBuZXh0X2V4O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbWVDb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXggKz0gbnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leCA+IG5leHRfZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxfcG9pbnQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcImdpZnRfYWRfbGV2ZWxcIik7ICAgIC8vIHNob3cgbm90aWMgbGV2ZWwgdXBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldF9leF9wcm9ncmVzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkX2V4X2FuaW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4wNSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXggKz0gbnVtO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSxcclxuICAgIHNldF9nb2xkX3Byb2dyZXNzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGdvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XHJcbiAgICAgICAgdmFyIGdvbGRfbWF4ID0gNTAwICogdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImdvbGRfbWF4XCJdICsgNTAwO1xyXG4gICAgICAgIHRoaXMuZ29sZF9sYWJlbC5zdHJpbmcgPSBnb2xkICsgXCIvXCIgKyBnb2xkX21heDtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLmdvbGRfcHJvZ3Jlc3Nfbm9kZSlcclxuICAgICAgICAgICAgLnRvKDAuMywgeyBwcm9ncmVzczogZ29sZCAvIGdvbGRfbWF4IH0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxuICAgIHNldF9leF9wcm9ncmVzczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBub3dfZXggPSB1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leDtcclxuICAgICAgICB2YXIgbmV4dF9leCA9IDIgKiB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsO1xyXG4gICAgICAgIHRoaXMubGV2ZWxfbGFiZWwuc3RyaW5nID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbDtcclxuICAgICAgICB0aGlzLmV4X2xhYmVsLnN0cmluZyA9IG5vd19leCArIFwiL1wiICsgbmV4dF9leDtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLmV4X3Byb2dyZXNzX25vZGUpXHJcbiAgICAgICAgICAgIC50bygwLjMsIHsgcHJvZ3Jlc3M6IG5vd19leCAvIG5leHRfZXggfSlcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG4gICAgLy/ku5PlupPooqvngrnlh7tcclxuICAgIG9uX3dhcmVIb3VzZV9jbGljazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfc2VsbF91aSh0aGlzLm5vZGUpO1xyXG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzZWxsX3VpXCIpLmluaV9ub2RlKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+S7k+W6k+W3sua7oVxyXG4gICAgd2FyZUhvdXNlX2Z1bGw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMud2FyZUhvdXNlX3NoY2VkdWxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2UpO1xyXG4gICAgICAgICAgICB2YXIgYWxsX2NhcGFjaXR5ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VfbGV2ZWwgKiBjb25maWcud2FyZUhvdXNlW1wiYWxsX2NhcGFjaXR5XCJdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmNvdW50ID49IGFsbF9jYXBhY2l0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FyZUhvdXNlX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ3YXJlSG91c2VfZnVsbFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXJlSG91c2Vfbm9kZS5nZXRDaGlsZEJ5TmFtZShcIndhcmVIb3VzZV9mdWxsXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy53YXJlSG91c2Vfc2hjZWR1bGUsIDAuMSk7XHJcbiAgICB9LFxyXG4gICAgLy/mnpzlm63ooqvngrnlh7tcclxuICAgIG9uX29yY2hhcmRfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfYmdfc291bmQoXCJ2aWxsYWdlX2JnXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcInVuX2NsaWNrXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLm5vZGUsIFwidW5fZGV2ZWxvcFwiKTtcclxuICAgIH0sXHJcbiAgICAvL+iHquWKqOWtmOaho1xyXG4gICAgYXV0b19zYXZlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmeC5zYXZlKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XHJcbiAgICB9LFxyXG4gICAgLy/liLfmlrDlnJ/lnLBcclxuICAgIHVwZGF0YV9sYW5kOiBmdW5jdGlvbiAobGFuZF9pbmRleCkge1xyXG4gICAgICAgIC8v5Yid5aeL5YyW5Zyf5Zyw54q25oCBXHJcbiAgICAgICAgdGhpcy5sYW5kX2dyb3VwX25vZGUuY2hpbGRyZW5bbGFuZF9pbmRleF0uZ2V0Q29tcG9uZW50KFwibGFuZFwiKS5pbmlfbm9kZShsYW5kX2luZGV4KTtcclxuICAgIH0sXHJcbiAgICAvL+iusOW9leS4iue6v+aXtumXtFxyXG4gICAgc2F2ZV9sb2dpbl90aW1lOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubG9naW5fdGltZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubG9naW5fdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/liJvlu7rnprvnur/mlLbnm4p1aVxyXG4gICAgb2ZmbGluZV9wcm9maXRfdWk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbG9naW5fdGltZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubG9naW5fdGltZTtcclxuICAgICAgICB2YXIgbm93X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICB2YXIgbWluID0gTWF0aC5mbG9vcigobm93X3RpbWUgLSBsb2dpbl90aW1lKSAvICgxMDAwICogNjApKTtcclxuICAgICAgICBpZiAobWluID49IDUpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9vZmZsaW5lX3Byb2ZpdF91aSh0aGlzLm5vZGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5LqS5o6o5oyJ6ZKu6KKr54K55Ye7XHJcbiAgICAvLyBvbl9wdXNoX2J1dHRvbl9jbGljazogZnVuY3Rpb24gKGUsIG5hbWUpIHtcclxuICAgIC8vICAgICBpZiAodHlwZW9mICh3eCkgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIC8vICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgIC8vICAgICAgICAgICAgIGFwcElkOiBwdXNoW25hbWVdLmFwcGlkLFxyXG4gICAgLy8gICAgICAgICAgICAgcGF0aDogJycsXHJcbiAgICAvLyAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9KVxyXG4gICAgLy8gICAgIH07XHJcbiAgICAvLyB9LFxyXG4gICAgLy/llYblupfmjInpkq7ooqvngrnlh7tcclxuICAgIG9uX3Nob3BfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3Nob3BfdWkoKTtcclxuICAgIH0sXHJcbiAgICAvL+WIm+W7uuaWsOaJi+W8leWvvFxyXG4gICAgY3JlYXRlX25vdmljZSgpIHtcclxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5ub3ZpY2UgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX25vdmljZV91aSgpO1xyXG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLm5vdmljZSA9IDE7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+WIm+W7uuaMiemSruaPkOekulxyXG4gICAgY3JlYXRlX2J1dHRvbl90aXBzKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5idXR0b25fZ3JvdXBfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2J1dHRvbl90aXBzKHRoaXMudGlwc19ncm91cF9ub2RlLCB0aGlzLmJ1dHRvbl9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLnBvc2l0aW9uKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc3R1ZHlfdWlfdGlwcygpO1xyXG4gICAgICAgIHRoaXMuc3RhZmZfdWlfdGlwcygpO1xyXG4gICAgICAgIHRoaXMuc2hvcF91aV90aXBzKCk7XHJcbiAgICB9LFxyXG4gICAgLy/otK3kubDllYblk4Hmj5DnpLpcclxuICAgIHNob3BfdWlfdGlwcygpIHtcclxuICAgICAgICB0aGlzLnNob3BfdWlfY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBsYW5kX2FyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZClcclxuICAgICAgICAgICAgdmFyIHBsYW50X2FyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEucGxhbnQpXHJcbiAgICAgICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xyXG4gICAgICAgICAgICB2YXIgbGV2ZWwgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhbmRfYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ29sZCA+PSBjb25maWcubGFuZFtpXS5jb3N0ICYmIGxldmVsID49IGNvbmZpZy5sYW5kW2ldLm5lZWRfbGV2ZWwgJiYgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW2ldLmhhdmUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcGxhbnRfYXJyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ29sZCA+PSBjb25maWcucGxhbnRbal0uY29zdCAmJiBsZXZlbCA+PSBjb25maWcucGxhbnRbal0ubmVlZF9sZXZlbCAmJiB1c2VyX2RhdGEudXNlcl9kYXRhLnBsYW50W2pdLmhhdmUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuc2hvcF91aV9jYWxsYmFjaywgMSk7XHJcbiAgICB9LFxyXG4gICAgLy/liqDngrnmj5DnpLpcclxuICAgIHN0dWR5X3VpX3RpcHMoKSB7XHJcbiAgICAgICAgdGhpcy5zdGR1eV90aXBzX2NhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2tpbGxfcG9pbnQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsX3BvaW50O1xyXG4gICAgICAgICAgICBpZiAoc2tpbGxfcG9pbnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy/mioDog73ngrnkuI3otrPkuI3mj5DnpLpcclxuICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnN0ZHV5X3RpcHNfY2FsbGJhY2ssIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcclxuICAgIH0sXHJcbiAgICAvL+mbh+S9o+W3peS6uuaPkOekulxyXG4gICAgc3RhZmZfdWlfdGlwcygpIHtcclxuICAgICAgICB0aGlzLnN0YWZmX3RpcHNfY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8v5oul5pyJ6L+Z5Z2X5Zyf5ZywXHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW2ldLmhhdmUgPT0gMSAmJiB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPj0gY29uZmlnLnN0YWZmW2ldLmNvc3QgJiYgdXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZltpXS5oYXZlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblszXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aXBzX2dyb3VwX25vZGUuY2hpbGRyZW5bM10uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnN0YWZmX3RpcHNfY2FsbGJhY2ssIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcclxuICAgIH0sXHJcbiAgICAvL+WIm+W7uuWuoOeJqVxyXG4gICAgY3JlYXRlX3BldCgpIHtcclxuICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5wZXQpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFtpXS5oYXZlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMuY2VudGVyX25vZGUsIGkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5Y2V5Liq5Yib5bu65a6g54mpXHJcbiAgICBjcmVhdGVfcGV0X2EoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLmNlbnRlcl9ub2RlLCBpbmRleCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIC8v6aKG5Y+W5pS255uKXHJcbiAgICBvbl9nZXRfaG90ZWxfcHJvZHVjZV9jbGljayhlKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBlLnRhcmdldDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2dvbGRfZWZmZWN0KG5vZGUsIGksIDApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFkZF9nb2xkKHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxfY2FjaGVfZ29sZCk7XHJcbiAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbF9jYWNoZV9nb2xkID0gMDtcclxuICAgIH0sXHJcbiAgICAvL+WIt+aWsOaXhemmhuaUtuebilxyXG4gICAgdXBkYXRlX2hvdGVsX3Byb2R1Y2UoKSB7XHJcbiAgICAgICAgLy8xc+abtOaWsOS4gOasoeaVsOaNrlxyXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGhvdGVsX2NhY2hlX2dvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQ7XHJcbiAgICAgICAgICAgIGlmIChob3RlbF9jYWNoZV9nb2xkID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG90ZWxfcHJvZHVjZV9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF9wcm9kdWNlX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIGxhYmVsID0gdGhpcy5ob3RlbF9wcm9kdWNlX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJob3RlbF9wcm9kdWNlX2xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IGhvdGVsX2NhY2hlX2dvbGQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XHJcbiAgICB9LFxyXG4gICAgLy/otK3kubDkuIDkuKrmiL/pl7RcclxuICAgIGhvdGVsX2J1eV9yb29tKHJvb21faW5kZXgpIHtcclxuICAgICAgICBzd2l0Y2ggKHJvb21faW5kZXgpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF8wKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF8xKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF8yKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF8zKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5Yid5aeL5YyW5peF6aaG5Lqn5Ye6XHJcbiAgICBpbmlfaG90ZWxfcHJvZHVjZSgpIHtcclxuXHJcbiAgICAgICAgLy/lkK/liqjliLfmlrDmlLbnm4pcclxuICAgICAgICB0aGlzLnVwZGF0ZV9ob3RlbF9wcm9kdWNlKCk7XHJcblxyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsWzBdLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmhvdGVsXzAoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsWzFdLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmhvdGVsXzEoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsWzJdLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmhvdGVsXzIoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsWzNdLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmhvdGVsXzMoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgIH0sXHJcbiAgICAvL2hvdGVsMCDnlJ/miJBcclxuICAgIGhvdGVsXzAoKSB7XHJcbiAgICAgICAgdmFyIHRpbWVDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5ob3RlbF8wX3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aW1lQ291bnQrKztcclxuICAgICAgICAgICAgaWYgKHRpbWVDb3VudCA+PSBjb25maWcuaG90ZWxbMF0ucHJvZHVjZV90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQgKz0gY29uZmlnLmhvdGVsWzBdLnByb2R1Y2U7XHJcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhvdGVsXzBfc2NoZWR1bGUsIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcclxuICAgIH0sXHJcbiAgICAvL2hvdGVsMSDnlJ/miJBcclxuICAgIGhvdGVsXzEoKSB7XHJcbiAgICAgICAgdmFyIHRpbWVDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5ob3RlbF8xX3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aW1lQ291bnQrKztcclxuICAgICAgICAgICAgaWYgKHRpbWVDb3VudCA+PSBjb25maWcuaG90ZWxbMV0ucHJvZHVjZV90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQgKz0gY29uZmlnLmhvdGVsWzFdLnByb2R1Y2U7XHJcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhvdGVsXzFfc2NoZWR1bGUsIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcclxuICAgIH0sXHJcbiAgICAvL2hvdGVsMiDnlJ/miJBcclxuICAgIGhvdGVsXzIoKSB7XHJcbiAgICAgICAgdmFyIHRpbWVDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5ob3RlbF8yX3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aW1lQ291bnQrKztcclxuICAgICAgICAgICAgaWYgKHRpbWVDb3VudCA+PSBjb25maWcuaG90ZWxbMl0ucHJvZHVjZV90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQgKz0gY29uZmlnLmhvdGVsWzJdLnByb2R1Y2U7XHJcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhvdGVsXzJfc2NoZWR1bGUsIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcclxuICAgIH0sXHJcbiAgICAvL2hvdGVsMyDnlJ/miJBcclxuICAgIGhvdGVsXzMoKSB7XHJcbiAgICAgICAgdmFyIHRpbWVDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5ob3RlbF8zX3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aW1lQ291bnQrKztcclxuICAgICAgICAgICAgaWYgKHRpbWVDb3VudCA+PSBjb25maWcuaG90ZWxbM10ucHJvZHVjZV90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQgKz0gY29uZmlnLmhvdGVsWzNdLnByb2R1Y2U7XHJcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhvdGVsXzNfc2NoZWR1bGUsIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcclxuICAgIH0sXHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8v5Yik5pat5b2T5YmN5pel5pyfXHJcbiAgICBqdWRnZV9kYXRlKCkge1xyXG4gICAgICAgIHZhciBub3dfZGF0ZSA9IG5ldyBEYXRlKCkuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIHZhciBhcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLnBldCk7XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc2F2ZV9kYXRlID09IDApIHtcclxuICAgICAgICAgICAgLy/mlrDlrZjmoaPorrDlvZXml6XmnJ9cclxuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgPSBub3dfZGF0ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc2F2ZV9kYXRlICE9IG5vd19kYXRlKSB7XHJcbiAgICAgICAgICAgIC8v5pel5pyf5LiN55u45ZCM77yM6buY6K6k56ys5LqM5aSp5Y+K5Lul5ZCOLOmHjee9ruWIhuS6q+asoeaVsFxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W2ldLnNoYXJlX2NvdW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFtpXS5zaGFyZV9jb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlcl9kYXRhLnVzZXJfZGF0YS52aWRlb3RhcGVfc2hhcmVfY291bnQgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2F2ZV9kYXRlID0gbm93X2RhdGU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy/ml6XmnJ/kuLrlkIzkuIDlpKlcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5b2V5bGP5Yqf6IO9XHJcbiAgICBpbmlfdmlkZW90YXBlKCkge1xyXG4gICAgICAgIC8v5b2V5bGP55qE5L+d5a2Y6Lev5b6EXHJcbiAgICAgICAgdGhpcy52aWRlb3RhcGVfcGF0aCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy52aWRlb3RhcGVfc3RhcnRfdGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy52aWRlb3RhcGVfc3RhdGUgPSBcInVuc3RhcnRcIjtcclxuICAgIH0sXHJcbiAgICBvbl92aWRlb3RhcGVfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICBpZiAodGhpcy52aWRlb3RhcGVfc3RhdGUgPT0gXCJ1bnN0YXJ0XCIpIHtcclxuICAgICAgICAgICAgLy/mnKrlvIDlp4vov5vlhaXlpZblirHnlYzpnaJcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV92aWRlb3RhcGVfdWkoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudmlkZW90YXBlX3N0YXRlID09IFwic3RhcnRcIikge1xyXG4gICAgICAgICAgICAvL+W8gOWni+WQjuWkp+S6jjPnp5LmiY3og73lhbPpl61cclxuICAgICAgICAgICAgdmFyIG5vd190aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIHZhciB2aWRlb3RhcGVfdGltZSA9IG5vd190aW1lIC0gdGhpcy52aWRlb3RhcGVfc3RhcnRfdGltZTtcclxuICAgICAgICAgICAgaWYgKHZpZGVvdGFwZV90aW1lIDwgMzAwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZSwgXCJ2aWRlb3RhcGVfbm9fdGltZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcF92aWRlb3RhcGUoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5byA5aeL5ri45oiP5b2V5bGPXHJcbiAgICBzdGFydF92aWRlb3RhcGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL+iusOW9leS4gOS4quaXtumXtOaIs1xyXG4gICAgICAgIHRoaXMudmlkZW90YXBlX3N0YXJ0X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cclxuICAgICAgICAgICAgdGhpcy52aWRlb3RhcGVfc3RhdGUgPSBcInN0YXJ0XCI7XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW90YXBlX3RpbWVDb250cm9sKCk7XHJcbiAgICAgICAgICAgIC8v5YiH5o2i5b2V5bGP5oyJ6ZKu5Zu+5qCHXHJcbiAgICAgICAgICAgIHRoaXMudmlkZW90YXBlX2J1dHRvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMudmlkZW90YXBlX2J1dHRvbl9hcnJbMV07XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLm5vZGUsIFwidmlkZW90YXBlX3N0YXJ0XCIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZWNvcmRlciA9IHd4LmdldEdhbWVSZWNvcmRlck1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWNvcmRlci5vblN0YXJ0KHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuW9leWxj+W8gOWni1wiKTtcclxuICAgICAgICAgICAgICAgIC8vIGRvIHNvbWV0aGluZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIuc3RhcnQoe1xyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDYwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSxcclxuICAgIC8v57uT5p2f5ri45oiP5b2V5bGPXHJcbiAgICBzdG9wX3ZpZGVvdGFwZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW90YXBlX3N0YXRlID0gXCJ1bnN0YXJ0XCI7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLm5vZGUsIFwidmlkb3RhcGVfb3ZlclwiKTtcclxuICAgICAgICAgICAgdGhpcy52aWRlb3RhcGVfYnV0dG9uLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy52aWRlb3RhcGVfYnV0dG9uX2FyclswXTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIub25TdG9wKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMudmlkZW9QYXRoLCBcIuW9leWxj+e7k+adn1wiKTtcclxuICAgICAgICAgICAgICAgIC8vIGRvIHNvbWV0aGluZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlkZW90YXBlX3BhdGggPSByZXMudmlkZW9QYXRoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV92aWRlb3RhcGVfdWkoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIuc3RvcCgpO1xyXG5cclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5b2V5bGP5pe26Ze05o6n5Yi2XHJcbiAgICB2aWRlb3RhcGVfdGltZUNvbnRyb2woKSB7XHJcbiAgICAgICAgdmFyIHRpbWVfY291bnQgPSAwO1xyXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGltZV9jb3VudCsrO1xyXG4gICAgICAgICAgICAvL+i2hei/h+S6huacgOWkp+aXtumVv+aIluiAheW9leWItueKtuaAgeS4uuacquW8gOWQr1xyXG4gICAgICAgICAgICBpZiAodGltZV9jb3VudCA+PSA2MCB8fCB0aGlzLnZpZGVvdGFwZV9zdGF0ZSA9PSBcInVuc3RhcnRcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIHRpbWVfY291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wX3ZpZGVvdGFwZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZSwgXCJ2aWRvdGFwZV9vdmVyXCIpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMSwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICAvL+WIneWni+WMluiKgueCuVxyXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmeC5sb2FkKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVfbGFuZCgpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlX3BldCgpO1xyXG4gICAgICAgIHRoaXMuYWRkX2dvbGRfYW5pbSA9IDA7XHJcbiAgICAgICAgdGhpcy5hZGRfZXhfYW5pbSA9IDA7XHJcbiAgICAgICAgLy/osIPnlKjnorDmkp7mo4DmtYvnu4Tku7ZcclxuICAgICAgICB0aGlzLm1hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCk7XHJcbiAgICAgICAgLy/pu5jorqTnorDmkp7kuLrlhbNcclxuICAgICAgICB0aGlzLm1hbmFnZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZXRfZ29sZF9wcm9ncmVzcygpO1xyXG4gICAgICAgIHRoaXMuc2V0X2V4X3Byb2dyZXNzKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVfcGxheWVyKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVfc3RhZmYoKTtcclxuICAgICAgICB0aGlzLmF1dG9fc2F2ZSgpO1xyXG4gICAgICAgIHRoaXMuc2F2ZV9sb2dpbl90aW1lKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVfYnV0dG9uX3RpcHMoKTtcclxuICAgICAgICB0aGlzLm9mZmxpbmVfcHJvZml0X3VpKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVfbm92aWNlKCk7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfYmdfc291bmQoXCJob21lX2JnXCIpO1xyXG4gICAgICAgIHRoaXMuaW5pX2hvdGVsX3Byb2R1Y2UoKTtcclxuICAgICAgICB0aGlzLmp1ZGdlX2RhdGUoKTtcclxuICAgICAgICB0aGlzLndhcmVIb3VzZV9mdWxsKCk7XHJcbiAgICAgICAgdGhpcy5pbmlfdmlkZW90YXBlKCk7XHJcbiAgICAgICAgdGhpcy5kaWFtb25kX2xhYmVsLnN0cmluZyA9IHVzZXJfZGF0YS51c2VyX2RhdGEuZGlhbW9uZDtcclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBvbl90ZXN0X2J1dHRvbl9jbGljayhlLCBjdXN0b20pIHtcclxuICAgICAgICBzd2l0Y2ggKGN1c3RvbSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiMFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRfZ29sZCh1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsLmdvbGRfbWF4ICogNTAwICsgNTAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRfZXgoMiAqIHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWwgKyAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMlwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzBdLmhhdmUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzBdLmhhdmUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMubm9kZSwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMV0uaGF2ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMV0uaGF2ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9wZXQodGhpcy5ub2RlLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFsyXS5oYXZlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFsyXS5oYXZlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLm5vZGUsIDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzNdLmhhdmUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzNdLmhhdmUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMubm9kZSwgMyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLm5vZGUsIDApO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9wZXQodGhpcy5ub2RlLCAxKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGF2ZSBwZXQgXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFswXS5oYXZlKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGF2ZSBwZXQgXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFsxXS5oYXZlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiM1wiOlxyXG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMl0uaGF2ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjRcIjpcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzJdLmhhdmUgPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLmluaV9ub2RlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=