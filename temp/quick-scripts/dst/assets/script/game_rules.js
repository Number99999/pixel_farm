
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lX3J1bGVzLmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjb25maWciLCJwdXNoIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsYW5kX3ByZWZhYiIsIlByZWZhYiIsImxhbmRfZ3JvdXBfbm9kZSIsIk5vZGUiLCJjZW50ZXJfbm9kZSIsImdvbGRfbGFiZWwiLCJMYWJlbCIsImV4X2xhYmVsIiwibGV2ZWxfbGFiZWwiLCJkaWFtb25kX2xhYmVsIiwiZ29sZF9wcm9ncmVzc19ub2RlIiwiUHJvZ3Jlc3NCYXIiLCJleF9wcm9ncmVzc19ub2RlIiwicGxheWVyX3ByZWZhYiIsInN0YWZmX3ByZWZhYl9hcnIiLCJ3YXJlSG91c2Vfbm9kZSIsIm1haW5fY2FtZXJhIiwidGlwc19ncm91cF9ub2RlIiwiYnV0dG9uX2dyb3VwX25vZGUiLCJob3RlbF9wcm9kdWNlX25vZGUiLCJ2aWRlb3RhcGVfYnV0dG9uIiwidmlkZW90YXBlX2J1dHRvbl9hcnIiLCJTcHJpdGVGcmFtZSIsIm9uX3dhdGVyaW5nX2J1dHRvbl9jbGljayIsInNvdW5kX2NvbnRyb2wiLCJwbGF5X3NvdW5kX2VmZmVjdCIsIm5vZGUiLCJnYW1lX3NjZW5lX2pzIiwiY3JlYXRlX2J1dHRvbl9ncm91cCIsInpJbmRleCIsImdldENvbXBvbmVudCIsImluaV9ub2RlIiwib25fdGlsbF9idXR0b25fY2xpY2siLCJvbl9zdHVkeV9idXR0b25fY2xpY2siLCJjcmVhdGVfc3R1ZHlfdWkiLCJvbl9ob21lX2J1dHRvbl9jbGljayIsImNyZWF0ZV9vcHRpb25fdWkiLCJvbl9wZXRfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX3BldF91aSIsIm9uX2hvdGVsX2J1dHRvbl9jbGljayIsImNyZWF0ZV9ob3RlbF91aSIsIm9uX3N0YWZmX2J1dHRvbl9jbGljayIsImNyZWF0ZV9zdGFmZl91aSIsImNyZWF0ZV9sYW5kIiwiYXJyIiwiT2JqZWN0Iiwia2V5cyIsImxhbmQiLCJpIiwibGVuZ3RoIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJjcmVhdGVfcGxheWVyIiwiY3JlYXRlX3N0YWZmIiwic3RhZmZfaW5kZXgiLCJzdGFmZiIsImhhdmUiLCJjaGlsZHJlbiIsImFkZF9nb2xkIiwibnVtIiwiYWRkX2dvbGRfYW5pbSIsInRpbWVDb3VudCIsImdvbGQiLCJnb2xkX21heCIsInNraWxsIiwiY2FsbGJhY2siLCJQbnVtIiwicGFyc2VJbnQiLCJzdHJpbmciLCJjcmVhdGVfdGlwc191aSIsInVuc2NoZWR1bGUiLCJzZXRfZ29sZF9wcm9ncmVzcyIsInNjaGVkdWxlIiwiYWRkX2V4IiwiYWRkX2V4X2FuaW0iLCJleCIsIm5vd19leCIsIm5leHRfZXgiLCJsZXZlbCIsInNraWxsX3BvaW50Iiwic2V0X2V4X3Byb2dyZXNzIiwidHdlZW4iLCJ0byIsInByb2dyZXNzIiwic3RhcnQiLCJvbl93YXJlSG91c2VfY2xpY2siLCJjcmVhdGVfc2VsbF91aSIsIndhcmVIb3VzZV9mdWxsIiwid2FyZUhvdXNlX3NoY2VkdWxlIiwid2FyZUhvdXNlIiwiYWxsX2NhcGFjaXR5Iiwid2FyZUhvdXNlX2xldmVsIiwiY291bnQiLCJnZXRDaGlsZEJ5TmFtZSIsImFjdGl2ZSIsIm9uX29yY2hhcmRfYnV0dG9uX2NsaWNrIiwiYXV0b19zYXZlIiwiZngiLCJzYXZlIiwibWFjcm8iLCJSRVBFQVRfRk9SRVZFUiIsInVwZGF0YV9sYW5kIiwibGFuZF9pbmRleCIsInNhdmVfbG9naW5fdGltZSIsImxvZ2luX3RpbWUiLCJEYXRlIiwiZ2V0VGltZSIsIm9mZmxpbmVfcHJvZml0X3VpIiwibm93X3RpbWUiLCJtaW4iLCJNYXRoIiwiZmxvb3IiLCJjcmVhdGVfb2ZmbGluZV9wcm9maXRfdWkiLCJvbl9zaG9wX2J1dHRvbl9jbGljayIsImNyZWF0ZV9zaG9wX3VpIiwiY3JlYXRlX25vdmljZSIsIm5vdmljZSIsImNyZWF0ZV9ub3ZpY2VfdWkiLCJjcmVhdGVfYnV0dG9uX3RpcHMiLCJwb3NpdGlvbiIsInN0dWR5X3VpX3RpcHMiLCJzdGFmZl91aV90aXBzIiwic2hvcF91aV90aXBzIiwic2hvcF91aV9jYWxsYmFjayIsImxhbmRfYXJyIiwicGxhbnRfYXJyIiwicGxhbnQiLCJjb3N0IiwibmVlZF9sZXZlbCIsImoiLCJzdGR1eV90aXBzX2NhbGxiYWNrIiwic3RhZmZfdGlwc19jYWxsYmFjayIsImNyZWF0ZV9wZXQiLCJwZXQiLCJjcmVhdGVfcGV0X2EiLCJpbmRleCIsIm9uX2dldF9ob3RlbF9wcm9kdWNlX2NsaWNrIiwiZSIsInRhcmdldCIsImNyZWF0ZV9nb2xkX2VmZmVjdCIsImhvdGVsX2NhY2hlX2dvbGQiLCJ1cGRhdGVfaG90ZWxfcHJvZHVjZSIsImxhYmVsIiwiaG90ZWxfYnV5X3Jvb20iLCJyb29tX2luZGV4IiwiaG90ZWxfMCIsImhvdGVsXzEiLCJob3RlbF8yIiwiaG90ZWxfMyIsImluaV9ob3RlbF9wcm9kdWNlIiwiaG90ZWwiLCJob3RlbF8wX3NjaGVkdWxlIiwicHJvZHVjZV90aW1lIiwicHJvZHVjZSIsImhvdGVsXzFfc2NoZWR1bGUiLCJob3RlbF8yX3NjaGVkdWxlIiwiaG90ZWxfM19zY2hlZHVsZSIsImp1ZGdlX2RhdGUiLCJub3dfZGF0ZSIsImdldERhdGUiLCJzYXZlX2RhdGUiLCJzaGFyZV9jb3VudCIsInVuZGVmaW5lZCIsImluaV92aWRlb3RhcGUiLCJ2aWRlb3RhcGVfcGF0aCIsInZpZGVvdGFwZV9zdGFydF90aW1lIiwidmlkZW90YXBlX3N0YXRlIiwib25fdmlkZW90YXBlX2J1dHRvbl9jbGljayIsImNyZWF0ZV92aWRlb3RhcGVfdWkiLCJ2aWRlb3RhcGVfdGltZSIsInN0b3BfdmlkZW90YXBlIiwic3RhcnRfdmlkZW90YXBlIiwid3giLCJ2aWRlb3RhcGVfdGltZUNvbnRyb2wiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsInJlY29yZGVyIiwiZ2V0R2FtZVJlY29yZGVyTWFuYWdlciIsIm9uU3RhcnQiLCJyZXMiLCJkdXJhdGlvbiIsIm9uU3RvcCIsInZpZGVvUGF0aCIsInN0b3AiLCJ0aW1lX2NvdW50IiwibG9hZCIsIm1hbmFnZXIiLCJkaXJlY3RvciIsImdldENvbGxpc2lvbk1hbmFnZXIiLCJlbmFibGVkIiwicGxheV9iZ19zb3VuZCIsIm9uX3Rlc3RfYnV0dG9uX2NsaWNrIiwiY3VzdG9tIiwib25Mb2FkIiwiZmluZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUhBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0EsSUFBSUMsTUFBTSxHQUFHRCxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQSxJQUFJRSxJQUFJLEdBQUdGLE9BQU8sQ0FBQyxNQUFELENBQWxCOztBQUVBRyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsV0FBVyxFQUFFSixFQUFFLENBQUNLLE1BRFI7QUFFUkMsSUFBQUEsZUFBZSxFQUFFTixFQUFFLENBQUNPLElBRlo7QUFHUkMsSUFBQUEsV0FBVyxFQUFFUixFQUFFLENBQUNPLElBSFI7QUFJUkUsSUFBQUEsVUFBVSxFQUFFVCxFQUFFLENBQUNVLEtBSlA7QUFLUkMsSUFBQUEsUUFBUSxFQUFFWCxFQUFFLENBQUNVLEtBTEw7QUFNUkUsSUFBQUEsV0FBVyxFQUFFWixFQUFFLENBQUNVLEtBTlI7QUFPUkcsSUFBQUEsYUFBYSxFQUFFYixFQUFFLENBQUNVLEtBUFY7QUFRUkksSUFBQUEsa0JBQWtCLEVBQUVkLEVBQUUsQ0FBQ2UsV0FSZjtBQVNSQyxJQUFBQSxnQkFBZ0IsRUFBRWhCLEVBQUUsQ0FBQ2UsV0FUYjtBQVVSRSxJQUFBQSxhQUFhLEVBQUVqQixFQUFFLENBQUNLLE1BVlY7QUFXUmEsSUFBQUEsZ0JBQWdCLEVBQUUsQ0FBQ2xCLEVBQUUsQ0FBQ0ssTUFBSixDQVhWO0FBWVJjLElBQUFBLGNBQWMsRUFBRW5CLEVBQUUsQ0FBQ08sSUFaWDtBQWFSYSxJ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LElBQUgsQ0FBUSxlQUFSLEVBQXlCcEssWUFBekIsQ0FBc0MsZUFBdEMsQ0FBckI7QUFDQSxTQUFLQyxRQUFMO0FBQ0gsR0Exb0JJO0FBNG9CTHFELEVBQUFBLEtBNW9CSyxtQkE0b0JHLENBRVAsQ0E5b0JJLENBZ3BCTDs7QUFocEJLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCJjb25maWdcIik7XG52YXIgcHVzaCA9IHJlcXVpcmUoXCJwdXNoXCIpO1xuaW1wb3J0IGZ4IGZyb20gXCJmeFwiO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbGFuZF9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgbGFuZF9ncm91cF9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBjZW50ZXJfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgZ29sZF9sYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIGV4X2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgbGV2ZWxfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBkaWFtb25kX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgZ29sZF9wcm9ncmVzc19ub2RlOiBjYy5Qcm9ncmVzc0JhcixcbiAgICAgICAgZXhfcHJvZ3Jlc3Nfbm9kZTogY2MuUHJvZ3Jlc3NCYXIsXG4gICAgICAgIHBsYXllcl9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgc3RhZmZfcHJlZmFiX2FycjogW2NjLlByZWZhYl0sXG4gICAgICAgIHdhcmVIb3VzZV9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBtYWluX2NhbWVyYTogY2MuTm9kZSxcbiAgICAgICAgdGlwc19ncm91cF9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBidXR0b25fZ3JvdXBfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgaG90ZWxfcHJvZHVjZV9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICB2aWRlb3RhcGVfYnV0dG9uOiBjYy5Ob2RlLFxuICAgICAgICB2aWRlb3RhcGVfYnV0dG9uX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICB9LFxuXG5cbiAgICAvL+a1h+awtOaMiemSruiiq+eCueWHu1xuICAgIG9uX3dhdGVyaW5nX2J1dHRvbl9jbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJtYWluX2J1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2J1dHRvbl9ncm91cCh0aGlzLmNlbnRlcl9ub2RlKTtcbiAgICAgICAgbm9kZS56SW5kZXggPSAzO1xuICAgICAgICBpZiAobm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcImJ1dHRvbl9tb3JlXCIpLmluaV9ub2RlKFwid2F0ZXJpbmdcIik7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+iAleWcsOaMiemSruiiq+eCueWHu1xuICAgIG9uX3RpbGxfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcIm1haW5fYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfYnV0dG9uX2dyb3VwKHRoaXMuY2VudGVyX25vZGUpO1xuICAgICAgICBub2RlLnpJbmRleCA9IDM7XG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiYnV0dG9uX21vcmVcIikuaW5pX25vZGUoXCJ0aWxsXCIpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/lrabkuaDmjInpkq7ooqvngrnlh7tcbiAgICBvbl9zdHVkeV9idXR0b25fY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwibWFpbl9idXR0b25fY2xpY2tcIik7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9zdHVkeV91aSh0aGlzLm5vZGUpO1xuICAgICAgICBpZiAobm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInN0dWR5X3VpXCIpLmluaV9ub2RlKCk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL2hvbWUg6KKr54K55Ye75pe2XG4gICAgb25faG9tZV9idXR0b25fY2xpY2soKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9vcHRpb25fdWkoKTtcbiAgICB9LFxuICAgIC8v5a6g54mp5oyJ6ZKu6KKr54K55Ye7XG4gICAgb25fcGV0X2J1dHRvbl9jbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJtYWluX2J1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldF91aSh0aGlzLm5vZGUpO1xuICAgICAgICBpZiAobm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInBldF91aVwiKS5pbmlfbm9kZSgpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/ml4XppobmjInpkq7ooqvngrnlh7tcbiAgICBvbl9ob3RlbF9idXR0b25fY2xpY2soKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9ob3RlbF91aSgpO1xuICAgIH0sXG4gICAgLy/pm4fkvaPlkZjlt6VcbiAgICBvbl9zdGFmZl9idXR0b25fY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwibWFpbl9idXR0b25fY2xpY2tcIik7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9zdGFmZl91aSh0aGlzLm5vZGUpO1xuICAgICAgICBpZiAobm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInN0YWZmX3VpXCIpLmluaV9ub2RlKCk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+eUn+aIkOWcn+WcsFxuICAgIGNyZWF0ZV9sYW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmQpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmxhbmRfcHJlZmFiKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5sYW5kX2dyb3VwX25vZGU7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcImxhbmRcIikuaW5pX25vZGUoaSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+WIm+W7uueOqeWutuWwj+S6ulxuICAgIGNyZWF0ZV9wbGF5ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllcl9wcmVmYWIpO1xuICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuY2VudGVyX25vZGU7XG4gICAgfSxcbiAgICAvL+WIm+W7uuS9o+S6ulxuICAgIGNyZWF0ZV9zdGFmZjogZnVuY3Rpb24gKHN0YWZmX2luZGV4KSB7XG4gICAgICAgIGlmIChzdGFmZl9pbmRleCA9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZik7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW2ldLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3RhZmZfcHJlZmFiX2FycltpXSk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5sYW5kX2dyb3VwX25vZGUuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic3RhZmZfYWlcIikuaW5pX25vZGUoaSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnN0YWZmX3ByZWZhYl9hcnJbc3RhZmZfaW5kZXhdKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5sYW5kX2dyb3VwX25vZGUuY2hpbGRyZW5bc3RhZmZfaW5kZXhdO1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzdGFmZl9haVwiKS5pbmlfbm9kZShzdGFmZl9pbmRleCk7XG4gICAgICAgIH07XG5cbiAgICB9LFxuICAgIC8v5Yi35paw6YeR5biB5pWwXG4gICAgYWRkX2dvbGQ6IGZ1bmN0aW9uIChudW0pIHtcbiAgICAgICAgaWYgKHRoaXMuYWRkX2dvbGRfYW5pbSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmFkZF9nb2xkX2FuaW0gPSAxO1xuICAgICAgICAgICAgdmFyIHRpbWVDb3VudCA9IDEwO1xuICAgICAgICAgICAgdmFyIGdvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XG4gICAgICAgICAgICB2YXIgZ29sZF9tYXggPSA1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDA7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIFBudW0gPSBwYXJzZUludChudW0gLyB0aW1lQ291bnQpXG4gICAgICAgICAgICAgICAgdGltZUNvdW50LS07XG4gICAgICAgICAgICAgICAgdGhpcy5nb2xkX2xhYmVsLnN0cmluZyA9IGdvbGQgKyBQbnVtICsgXCIvXCIgKyBnb2xkX21heDtcbiAgICAgICAgICAgICAgICBpZiAodGltZUNvdW50IDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkICs9IG51bTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA+IGdvbGRfbWF4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJ1bl9jbGlja1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLm5vZGUsIFwiZ29sZF9mdWxsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID0gZ29sZF9tYXg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nb2xkX2xhYmVsLnN0cmluZyA9IHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCArIFwiL1wiICsgZ29sZF9tYXg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0X2dvbGRfcHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRfZ29sZF9hbmltID0gMDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMDMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkICs9IG51bTtcbiAgICAgICAgfTtcblxuICAgIH0sXG4gICAgLy/liLfmlrBleOaVsFxuICAgIGFkZF9leDogZnVuY3Rpb24gKG51bSkge1xuICAgICAgICBpZiAodGhpcy5hZGRfZXhfYW5pbSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmFkZF9leF9hbmltID0gMTtcbiAgICAgICAgICAgIHZhciB0aW1lQ291bnQgPSAxMDtcbiAgICAgICAgICAgIHZhciBleCA9IHVzZXJfZGF0YS51c2VyX2RhdGEubm93X2V4O1xuICAgICAgICAgICAgdmFyIG5leHRfZXggPSAyICogdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbDtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgUG51bSA9IHBhcnNlSW50KG51bSAvIHRpbWVDb3VudClcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQtLTtcbiAgICAgICAgICAgICAgICB0aGlzLmV4X2xhYmVsLnN0cmluZyA9IGV4ICsgUG51bSArIFwiL1wiICsgbmV4dF9leDtcbiAgICAgICAgICAgICAgICBpZiAodGltZUNvdW50IDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXggKz0gbnVtO1xuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXggPiBuZXh0X2V4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsX3BvaW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwiZ2lmdF9hZF9sZXZlbFwiKTsgICAgLy8gc2hvdyBub3RpYyBsZXZlbCB1cFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0X2V4X3Byb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkX2V4X2FuaW0gPSAwO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4wNSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leCArPSBudW07XG4gICAgICAgIH07XG5cbiAgICB9LFxuICAgIHNldF9nb2xkX3Byb2dyZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xuICAgICAgICB2YXIgZ29sZF9tYXggPSA1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDA7XG4gICAgICAgIHRoaXMuZ29sZF9sYWJlbC5zdHJpbmcgPSBnb2xkICsgXCIvXCIgKyBnb2xkX21heDtcbiAgICAgICAgY2MudHdlZW4odGhpcy5nb2xkX3Byb2dyZXNzX25vZGUpXG4gICAgICAgICAgICAudG8oMC4zLCB7IHByb2dyZXNzOiBnb2xkIC8gZ29sZF9tYXggfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH0sXG4gICAgc2V0X2V4X3Byb2dyZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBub3dfZXggPSB1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leDtcbiAgICAgICAgdmFyIG5leHRfZXggPSAyICogdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbDtcbiAgICAgICAgdGhpcy5sZXZlbF9sYWJlbC5zdHJpbmcgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsO1xuICAgICAgICB0aGlzLmV4X2xhYmVsLnN0cmluZyA9IG5vd19leCArIFwiL1wiICsgbmV4dF9leDtcbiAgICAgICAgY2MudHdlZW4odGhpcy5leF9wcm9ncmVzc19ub2RlKVxuICAgICAgICAgICAgLnRvKDAuMywgeyBwcm9ncmVzczogbm93X2V4IC8gbmV4dF9leCB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgfSxcbiAgICAvL+S7k+W6k+iiq+eCueWHu1xuICAgIG9uX3dhcmVIb3VzZV9jbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9zZWxsX3VpKHRoaXMubm9kZSk7XG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic2VsbF91aVwiKS5pbmlfbm9kZSgpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/ku5PlupPlt7Lmu6FcbiAgICB3YXJlSG91c2VfZnVsbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAvL1xuICAgICAgICB0aGlzLndhcmVIb3VzZV9zaGNlZHVsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZSk7XG4gICAgICAgICAgICB2YXIgYWxsX2NhcGFjaXR5ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VfbGV2ZWwgKiBjb25maWcud2FyZUhvdXNlW1wiYWxsX2NhcGFjaXR5XCJdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uY291bnQgPj0gYWxsX2NhcGFjaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FyZUhvdXNlX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ3YXJlSG91c2VfZnVsbFwiKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXJlSG91c2Vfbm9kZS5nZXRDaGlsZEJ5TmFtZShcIndhcmVIb3VzZV9mdWxsXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMud2FyZUhvdXNlX3NoY2VkdWxlLCAwLjEpO1xuICAgIH0sXG4gICAgLy/mnpzlm63ooqvngrnlh7tcbiAgICBvbl9vcmNoYXJkX2J1dHRvbl9jbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9iZ19zb3VuZChcInZpbGxhZ2VfYmdcIik7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcInVuX2NsaWNrXCIpO1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5ub2RlLCBcInVuX2RldmVsb3BcIik7XG4gICAgfSxcbiAgICAvL+iHquWKqOWtmOaho1xuICAgIGF1dG9fc2F2ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmeC5zYXZlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8v5Yi35paw5Zyf5ZywXG4gICAgdXBkYXRhX2xhbmQ6IGZ1bmN0aW9uIChsYW5kX2luZGV4KSB7XG4gICAgICAgIC8v5Yid5aeL5YyW5Zyf5Zyw54q25oCBXG4gICAgICAgIHRoaXMubGFuZF9ncm91cF9ub2RlLmNoaWxkcmVuW2xhbmRfaW5kZXhdLmdldENvbXBvbmVudChcImxhbmRcIikuaW5pX25vZGUobGFuZF9pbmRleCk7XG4gICAgfSxcbiAgICAvL+iusOW9leS4iue6v+aXtumXtFxuICAgIHNhdmVfbG9naW5fdGltZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sb2dpbl90aW1lID09IDApIHtcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubG9naW5fdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/liJvlu7rnprvnur/mlLbnm4p1aVxuICAgIG9mZmxpbmVfcHJvZml0X3VpOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsb2dpbl90aW1lID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sb2dpbl90aW1lO1xuICAgICAgICB2YXIgbm93X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdmFyIG1pbiA9IE1hdGguZmxvb3IoKG5vd190aW1lIC0gbG9naW5fdGltZSkgLyAoMTAwMCAqIDYwKSk7XG4gICAgICAgIGlmIChtaW4gPj0gNSkge1xuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9vZmZsaW5lX3Byb2ZpdF91aSh0aGlzLm5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/kupLmjqjmjInpkq7ooqvngrnlh7tcbiAgICAvLyBvbl9wdXNoX2J1dHRvbl9jbGljazogZnVuY3Rpb24gKGUsIG5hbWUpIHtcbiAgICAvLyAgICAgaWYgKHR5cGVvZiAod3gpICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgLy8gICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xuICAgIC8vICAgICAgICAgICAgIGFwcElkOiBwdXNoW25hbWVdLmFwcGlkLFxuICAgIC8vICAgICAgICAgICAgIHBhdGg6ICcnLFxuICAgIC8vICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIH0pXG4gICAgLy8gICAgIH07XG4gICAgLy8gfSxcbiAgICAvL+WVhuW6l+aMiemSruiiq+eCueWHu1xuICAgIG9uX3Nob3BfYnV0dG9uX2NsaWNrKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfc2hvcF91aSgpO1xuICAgIH0sXG4gICAgLy/liJvlu7rmlrDmiYvlvJXlr7xcbiAgICBjcmVhdGVfbm92aWNlKCkge1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5ub3ZpY2UgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9ub3ZpY2VfdWkoKTtcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubm92aWNlID0gMTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5Yib5bu65oyJ6ZKu5o+Q56S6XG4gICAgY3JlYXRlX2J1dHRvbl90aXBzKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYnV0dG9uX2dyb3VwX25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfYnV0dG9uX3RpcHModGhpcy50aXBzX2dyb3VwX25vZGUsIHRoaXMuYnV0dG9uX2dyb3VwX25vZGUuY2hpbGRyZW5baV0ucG9zaXRpb24pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnN0dWR5X3VpX3RpcHMoKTtcbiAgICAgICAgdGhpcy5zdGFmZl91aV90aXBzKCk7XG4gICAgICAgIHRoaXMuc2hvcF91aV90aXBzKCk7XG4gICAgfSxcbiAgICAvL+i0reS5sOWVhuWTgeaPkOekulxuICAgIHNob3BfdWlfdGlwcygpIHtcbiAgICAgICAgdGhpcy5zaG9wX3VpX2NhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGxhbmRfYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kKVxuICAgICAgICAgICAgdmFyIHBsYW50X2FyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEucGxhbnQpXG4gICAgICAgICAgICB2YXIgZ29sZCA9IHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZDtcbiAgICAgICAgICAgIHZhciBsZXZlbCA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWw7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhbmRfYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdvbGQgPj0gY29uZmlnLmxhbmRbaV0uY29zdCAmJiBsZXZlbCA+PSBjb25maWcubGFuZFtpXS5uZWVkX2xldmVsICYmIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFtpXS5oYXZlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aXBzX2dyb3VwX25vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwbGFudF9hcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZ29sZCA+PSBjb25maWcucGxhbnRbal0uY29zdCAmJiBsZXZlbCA+PSBjb25maWcucGxhbnRbal0ubmVlZF9sZXZlbCAmJiB1c2VyX2RhdGEudXNlcl9kYXRhLnBsYW50W2pdLmhhdmUgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aXBzX2dyb3VwX25vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zaG9wX3VpX2NhbGxiYWNrLCAxKTtcbiAgICB9LFxuICAgIC8v5Yqg54K55o+Q56S6XG4gICAgc3R1ZHlfdWlfdGlwcygpIHtcbiAgICAgICAgdGhpcy5zdGR1eV90aXBzX2NhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNraWxsX3BvaW50ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbF9wb2ludDtcbiAgICAgICAgICAgIGlmIChza2lsbF9wb2ludCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL+aKgOiDveeCueS4jei2s+S4jeaPkOekulxuICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnN0ZHV5X3RpcHNfY2FsbGJhY2ssIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8v6ZuH5L2j5bel5Lq65o+Q56S6XG4gICAgc3RhZmZfdWlfdGlwcygpIHtcbiAgICAgICAgdGhpcy5zdGFmZl90aXBzX2NhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmYpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvL+aLpeaciei/meWdl+Wcn+WcsFxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbaV0uaGF2ZSA9PSAxICYmIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA+PSBjb25maWcuc3RhZmZbaV0uY29zdCAmJiB1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW2ldLmhhdmUgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblszXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aXBzX2dyb3VwX25vZGUuY2hpbGRyZW5bM10uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zdGFmZl90aXBzX2NhbGxiYWNrLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XG4gICAgfSxcbiAgICAvL+WIm+W7uuWuoOeJqVxuICAgIGNyZWF0ZV9wZXQoKSB7XG4gICAgICAgIHZhciBhcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLnBldCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbaV0uaGF2ZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9wZXQodGhpcy5jZW50ZXJfbm9kZSwgaSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/ljZXkuKrliJvlu7rlrqDnialcbiAgICBjcmVhdGVfcGV0X2EoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9wZXQodGhpcy5jZW50ZXJfbm9kZSwgaW5kZXgpO1xuICAgIH0sXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAvL+mihuWPluaUtuebilxuICAgIG9uX2dldF9ob3RlbF9wcm9kdWNlX2NsaWNrKGUpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBlLnRhcmdldDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfZ29sZF9lZmZlY3Qobm9kZSwgaSwgMCk7XG4gICAgICAgIH07XG4gICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWRkX2dvbGQodXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbF9jYWNoZV9nb2xkKTtcbiAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbF9jYWNoZV9nb2xkID0gMDtcbiAgICB9LFxuICAgIC8v5Yi35paw5peF6aaG5pS255uKXG4gICAgdXBkYXRlX2hvdGVsX3Byb2R1Y2UoKSB7XG4gICAgICAgIC8vMXPmm7TmlrDkuIDmrKHmlbDmja5cbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGhvdGVsX2NhY2hlX2dvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQ7XG4gICAgICAgICAgICBpZiAoaG90ZWxfY2FjaGVfZ29sZCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF9wcm9kdWNlX25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaG90ZWxfcHJvZHVjZV9ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGxhYmVsID0gdGhpcy5ob3RlbF9wcm9kdWNlX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJob3RlbF9wcm9kdWNlX2xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBob3RlbF9jYWNoZV9nb2xkO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XG4gICAgfSxcbiAgICAvL+i0reS5sOS4gOS4quaIv+mXtFxuICAgIGhvdGVsX2J1eV9yb29tKHJvb21faW5kZXgpIHtcbiAgICAgICAgc3dpdGNoIChyb29tX2luZGV4KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF8wKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF8xKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF8yKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF8zKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+WIneWni+WMluaXhemmhuS6p+WHulxuICAgIGluaV9ob3RlbF9wcm9kdWNlKCkge1xuXG4gICAgICAgIC8v5ZCv5Yqo5Yi35paw5pS255uKXG4gICAgICAgIHRoaXMudXBkYXRlX2hvdGVsX3Byb2R1Y2UoKTtcblxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbFswXS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuaG90ZWxfMCgpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbFsxXS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuaG90ZWxfMSgpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbFsyXS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuaG90ZWxfMigpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbFszXS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuaG90ZWxfMygpO1xuICAgICAgICB9O1xuXG4gICAgfSxcbiAgICAvL2hvdGVsMCDnlJ/miJBcbiAgICBob3RlbF8wKCkge1xuICAgICAgICB2YXIgdGltZUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5ob3RlbF8wX3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGltZUNvdW50Kys7XG4gICAgICAgICAgICBpZiAodGltZUNvdW50ID49IGNvbmZpZy5ob3RlbFswXS5wcm9kdWNlX3RpbWUpIHtcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQgKz0gY29uZmlnLmhvdGVsWzBdLnByb2R1Y2U7XG4gICAgICAgICAgICAgICAgdGltZUNvdW50ID0gMDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5ob3RlbF8wX3NjaGVkdWxlLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XG4gICAgfSxcbiAgICAvL2hvdGVsMSDnlJ/miJBcbiAgICBob3RlbF8xKCkge1xuICAgICAgICB2YXIgdGltZUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5ob3RlbF8xX3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGltZUNvdW50Kys7XG4gICAgICAgICAgICBpZiAodGltZUNvdW50ID49IGNvbmZpZy5ob3RlbFsxXS5wcm9kdWNlX3RpbWUpIHtcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQgKz0gY29uZmlnLmhvdGVsWzFdLnByb2R1Y2U7XG4gICAgICAgICAgICAgICAgdGltZUNvdW50ID0gMDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5ob3RlbF8xX3NjaGVkdWxlLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XG4gICAgfSxcbiAgICAvL2hvdGVsMiDnlJ/miJBcbiAgICBob3RlbF8yKCkge1xuICAgICAgICB2YXIgdGltZUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5ob3RlbF8yX3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGltZUNvdW50Kys7XG4gICAgICAgICAgICBpZiAodGltZUNvdW50ID49IGNvbmZpZy5ob3RlbFsyXS5wcm9kdWNlX3RpbWUpIHtcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQgKz0gY29uZmlnLmhvdGVsWzJdLnByb2R1Y2U7XG4gICAgICAgICAgICAgICAgdGltZUNvdW50ID0gMDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5ob3RlbF8yX3NjaGVkdWxlLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XG4gICAgfSxcbiAgICAvL2hvdGVsMyDnlJ/miJBcbiAgICBob3RlbF8zKCkge1xuICAgICAgICB2YXIgdGltZUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5ob3RlbF8zX3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGltZUNvdW50Kys7XG4gICAgICAgICAgICBpZiAodGltZUNvdW50ID49IGNvbmZpZy5ob3RlbFszXS5wcm9kdWNlX3RpbWUpIHtcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQgKz0gY29uZmlnLmhvdGVsWzNdLnByb2R1Y2U7XG4gICAgICAgICAgICAgICAgdGltZUNvdW50ID0gMDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5ob3RlbF8zX3NjaGVkdWxlLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XG4gICAgfSxcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy/liKTmlq3lvZPliY3ml6XmnJ9cbiAgICBqdWRnZV9kYXRlKCkge1xuICAgICAgICB2YXIgbm93X2RhdGUgPSBuZXcgRGF0ZSgpLmdldERhdGUoKTtcbiAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEucGV0KTtcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc2F2ZV9kYXRlID09IDApIHtcbiAgICAgICAgICAgIC8v5paw5a2Y5qGj6K6w5b2V5pel5pyfXG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNhdmVfZGF0ZSA9IG5vd19kYXRlO1xuICAgICAgICB9IGVsc2UgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc2F2ZV9kYXRlICE9IG5vd19kYXRlKSB7XG4gICAgICAgICAgICAvL+aXpeacn+S4jeebuOWQjO+8jOm7mOiupOesrOS6jOWkqeWPiuS7peWQjizph43nva7liIbkuqvmrKHmlbBcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W2ldLnNoYXJlX2NvdW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbaV0uc2hhcmVfY291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyX2RhdGEudXNlcl9kYXRhLnZpZGVvdGFwZV9zaGFyZV9jb3VudCA9IDA7XG5cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2F2ZV9kYXRlID0gbm93X2RhdGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL+aXpeacn+S4uuWQjOS4gOWkqVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgLy/liJ3lp4vljJblvZXlsY/lip/og71cbiAgICBpbmlfdmlkZW90YXBlKCkge1xuICAgICAgICAvL+W9leWxj+eahOS/neWtmOi3r+W+hFxuICAgICAgICB0aGlzLnZpZGVvdGFwZV9wYXRoID0gbnVsbDtcbiAgICAgICAgdGhpcy52aWRlb3RhcGVfc3RhcnRfdGltZSA9IDA7XG4gICAgICAgIHRoaXMudmlkZW90YXBlX3N0YXRlID0gXCJ1bnN0YXJ0XCI7XG4gICAgfSxcbiAgICBvbl92aWRlb3RhcGVfYnV0dG9uX2NsaWNrKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG4gICAgICAgIGlmICh0aGlzLnZpZGVvdGFwZV9zdGF0ZSA9PSBcInVuc3RhcnRcIikge1xuICAgICAgICAgICAgLy/mnKrlvIDlp4vov5vlhaXlpZblirHnlYzpnaJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdmlkZW90YXBlX3VpKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy52aWRlb3RhcGVfc3RhdGUgPT0gXCJzdGFydFwiKSB7XG4gICAgICAgICAgICAvL+W8gOWni+WQjuWkp+S6jjPnp5LmiY3og73lhbPpl61cbiAgICAgICAgICAgIHZhciBub3dfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgdmFyIHZpZGVvdGFwZV90aW1lID0gbm93X3RpbWUgLSB0aGlzLnZpZGVvdGFwZV9zdGFydF90aW1lO1xuICAgICAgICAgICAgaWYgKHZpZGVvdGFwZV90aW1lIDwgMzAwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLm5vZGUsIFwidmlkZW90YXBlX25vX3RpbWVcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcF92aWRlb3RhcGUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+W8gOWni+a4uOaIj+W9leWxj1xuICAgIHN0YXJ0X3ZpZGVvdGFwZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAvL+iusOW9leS4gOS4quaXtumXtOaIs1xuICAgICAgICB0aGlzLnZpZGVvdGFwZV9zdGFydF90aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XG5cbiAgICAgICAgICAgIHRoaXMudmlkZW90YXBlX3N0YXRlID0gXCJzdGFydFwiO1xuICAgICAgICAgICAgdGhpcy52aWRlb3RhcGVfdGltZUNvbnRyb2woKTtcbiAgICAgICAgICAgIC8v5YiH5o2i5b2V5bGP5oyJ6ZKu5Zu+5qCHXG4gICAgICAgICAgICB0aGlzLnZpZGVvdGFwZV9idXR0b24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnZpZGVvdGFwZV9idXR0b25fYXJyWzFdO1xuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZSwgXCJ2aWRlb3RhcGVfc3RhcnRcIik7XG5cbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIgPSB3eC5nZXRHYW1lUmVjb3JkZXJNYW5hZ2VyKCk7XG4gICAgICAgICAgICB0aGlzLnJlY29yZGVyLm9uU3RhcnQocmVzID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuW9leWxj+W8gOWni1wiKTtcbiAgICAgICAgICAgICAgICAvLyBkbyBzb21ldGhpbmU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIuc3RhcnQoe1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA2MFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICB9LFxuICAgIC8v57uT5p2f5ri45oiP5b2V5bGPXG4gICAgc3RvcF92aWRlb3RhcGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMudmlkZW90YXBlX3N0YXRlID0gXCJ1bnN0YXJ0XCI7XG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5ub2RlLCBcInZpZG90YXBlX292ZXJcIik7XG4gICAgICAgICAgICB0aGlzLnZpZGVvdGFwZV9idXR0b24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnZpZGVvdGFwZV9idXR0b25fYXJyWzBdO1xuXG4gICAgICAgICAgICB0aGlzLnJlY29yZGVyLm9uU3RvcChyZXMgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcy52aWRlb1BhdGgsIFwi5b2V5bGP57uT5p2fXCIpO1xuICAgICAgICAgICAgICAgIC8vIGRvIHNvbWV0aGluZTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvdGFwZV9wYXRoID0gcmVzLnZpZGVvUGF0aDtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3ZpZGVvdGFwZV91aSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnJlY29yZGVyLnN0b3AoKTtcblxuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/lvZXlsY/ml7bpl7TmjqfliLZcbiAgICB2aWRlb3RhcGVfdGltZUNvbnRyb2woKSB7XG4gICAgICAgIHZhciB0aW1lX2NvdW50ID0gMDtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGltZV9jb3VudCsrO1xuICAgICAgICAgICAgLy/otoXov4fkuobmnIDlpKfml7bplb/miJbogIXlvZXliLbnirbmgIHkuLrmnKrlvIDlkK9cbiAgICAgICAgICAgIGlmICh0aW1lX2NvdW50ID49IDYwIHx8IHRoaXMudmlkZW90YXBlX3N0YXRlID09IFwidW5zdGFydFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB0aW1lX2NvdW50ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BfdmlkZW90YXBlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZSwgXCJ2aWRvdGFwZV9vdmVyXCIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMSwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xuICAgIH0sXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAvL+WIneWni+WMluiKgueCuVxuICAgIGluaV9ub2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ4LmxvYWQoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVfbGFuZCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZV9wZXQoKTtcbiAgICAgICAgdGhpcy5hZGRfZ29sZF9hbmltID0gMDtcbiAgICAgICAgdGhpcy5hZGRfZXhfYW5pbSA9IDA7XG4gICAgICAgIC8v6LCD55So56Kw5pKe5qOA5rWL57uE5Lu2XG4gICAgICAgIHRoaXMubWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKTtcbiAgICAgICAgLy/pu5jorqTnorDmkp7kuLrlhbNcbiAgICAgICAgdGhpcy5tYW5hZ2VyLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNldF9nb2xkX3Byb2dyZXNzKCk7XG4gICAgICAgIHRoaXMuc2V0X2V4X3Byb2dyZXNzKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlX3BsYXllcigpO1xuICAgICAgICB0aGlzLmNyZWF0ZV9zdGFmZigpO1xuICAgICAgICB0aGlzLmF1dG9fc2F2ZSgpO1xuICAgICAgICB0aGlzLnNhdmVfbG9naW5fdGltZSgpO1xuICAgICAgICB0aGlzLmNyZWF0ZV9idXR0b25fdGlwcygpO1xuICAgICAgICB0aGlzLm9mZmxpbmVfcHJvZml0X3VpKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlX25vdmljZSgpO1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9iZ19zb3VuZChcImhvbWVfYmdcIik7XG4gICAgICAgIHRoaXMuaW5pX2hvdGVsX3Byb2R1Y2UoKTtcbiAgICAgICAgdGhpcy5qdWRnZV9kYXRlKCk7XG4gICAgICAgIHRoaXMud2FyZUhvdXNlX2Z1bGwoKTtcbiAgICAgICAgdGhpcy5pbmlfdmlkZW90YXBlKCk7XG4gICAgfSxcblxuXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIG9uX3Rlc3RfYnV0dG9uX2NsaWNrKGUsIGN1c3RvbSkge1xuICAgICAgICBzd2l0Y2ggKGN1c3RvbSkge1xuICAgICAgICAgICAgY2FzZSBcIjBcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmFkZF9nb2xkKHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGwuZ29sZF9tYXggKiA1MDAgKyA1MDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIjFcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmFkZF9leCgyICogdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbCArIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIjJcIjpcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMF0uaGF2ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzBdLmhhdmUgPSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLm5vZGUsIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMV0uaGF2ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzFdLmhhdmUgPSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLm5vZGUsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMl0uaGF2ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzJdLmhhdmUgPSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLm5vZGUsIDIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbM10uaGF2ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzNdLmhhdmUgPSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLm5vZGUsIDMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLm5vZGUsIDApO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMubm9kZSwgMSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJoYXZlIHBldCBcIiArIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzBdLmhhdmUpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGF2ZSBwZXQgXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFsxXS5oYXZlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCIzXCI6XG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMl0uaGF2ZSA9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiNFwiOlxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzJdLmhhdmUgPSAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuaW5pX25vZGUoKTtcbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==