
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lX3J1bGVzLmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjb25maWciLCJwdXNoIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsYW5kX3ByZWZhYiIsIlByZWZhYiIsImxhbmRfZ3JvdXBfbm9kZSIsIk5vZGUiLCJjZW50ZXJfbm9kZSIsImdvbGRfbGFiZWwiLCJMYWJlbCIsImV4X2xhYmVsIiwibGV2ZWxfbGFiZWwiLCJnb2xkX3Byb2dyZXNzX25vZGUiLCJQcm9ncmVzc0JhciIsImV4X3Byb2dyZXNzX25vZGUiLCJwbGF5ZXJfcHJlZmFiIiwic3RhZmZfcHJlZmFiX2FyciIsIndhcmVIb3VzZV9ub2RlIiwibWFpbl9jYW1lcmEiLCJ0aXBzX2dyb3VwX25vZGUiLCJidXR0b25fZ3JvdXBfbm9kZSIsImhvdGVsX3Byb2R1Y2Vfbm9kZSIsInZpZGVvdGFwZV9idXR0b24iLCJ2aWRlb3RhcGVfYnV0dG9uX2FyciIsIlNwcml0ZUZyYW1lIiwib25fd2F0ZXJpbmdfYnV0dG9uX2NsaWNrIiwic291bmRfY29udHJvbCIsInBsYXlfc291bmRfZWZmZWN0Iiwibm9kZSIsImdhbWVfc2NlbmVfanMiLCJjcmVhdGVfYnV0dG9uX2dyb3VwIiwiekluZGV4IiwiZ2V0Q29tcG9uZW50IiwiaW5pX25vZGUiLCJvbl90aWxsX2J1dHRvbl9jbGljayIsIm9uX3N0dWR5X2J1dHRvbl9jbGljayIsImNyZWF0ZV9zdHVkeV91aSIsIm9uX2hvbWVfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX29wdGlvbl91aSIsIm9uX3BldF9idXR0b25fY2xpY2siLCJjcmVhdGVfcGV0X3VpIiwib25faG90ZWxfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX2hvdGVsX3VpIiwib25fc3RhZmZfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX3N0YWZmX3VpIiwiY3JlYXRlX2xhbmQiLCJhcnIiLCJPYmplY3QiLCJrZXlzIiwibGFuZCIsImkiLCJsZW5ndGgiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsImNyZWF0ZV9wbGF5ZXIiLCJjcmVhdGVfc3RhZmYiLCJzdGFmZl9pbmRleCIsInN0YWZmIiwiaGF2ZSIsImNoaWxkcmVuIiwiYWRkX2dvbGQiLCJudW0iLCJhZGRfZ29sZF9hbmltIiwidGltZUNvdW50IiwiZ29sZCIsImdvbGRfbWF4Iiwic2tpbGwiLCJjYWxsYmFjayIsIlBudW0iLCJwYXJzZUludCIsInN0cmluZyIsImNyZWF0ZV90aXBzX3VpIiwidW5zY2hlZHVsZSIsInNldF9nb2xkX3Byb2dyZXNzIiwic2NoZWR1bGUiLCJhZGRfZXgiLCJhZGRfZXhfYW5pbSIsImV4Iiwibm93X2V4IiwibmV4dF9leCIsImxldmVsIiwic2tpbGxfcG9pbnQiLCJzZXRfZXhfcHJvZ3Jlc3MiLCJ0d2VlbiIsInRvIiwicHJvZ3Jlc3MiLCJzdGFydCIsIm9uX3dhcmVIb3VzZV9jbGljayIsImNyZWF0ZV9zZWxsX3VpIiwid2FyZUhvdXNlX2Z1bGwiLCJ3YXJlSG91c2Vfc2hjZWR1bGUiLCJ3YXJlSG91c2UiLCJhbGxfY2FwYWNpdHkiLCJ3YXJlSG91c2VfbGV2ZWwiLCJjb3VudCIsImdldENoaWxkQnlOYW1lIiwiYWN0aXZlIiwib25fb3JjaGFyZF9idXR0b25fY2xpY2siLCJhdXRvX3NhdmUiLCJmeCIsInNhdmUiLCJtYWNybyIsIlJFUEVBVF9GT1JFVkVSIiwidXBkYXRhX2xhbmQiLCJsYW5kX2luZGV4Iiwic2F2ZV9sb2dpbl90aW1lIiwibG9naW5fdGltZSIsIkRhdGUiLCJnZXRUaW1lIiwib2ZmbGluZV9wcm9maXRfdWkiLCJub3dfdGltZSIsIm1pbiIsIk1hdGgiLCJmbG9vciIsImNyZWF0ZV9vZmZsaW5lX3Byb2ZpdF91aSIsIm9uX3Nob3BfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX3Nob3BfdWkiLCJjcmVhdGVfbm92aWNlIiwibm92aWNlIiwiY3JlYXRlX25vdmljZV91aSIsImNyZWF0ZV9idXR0b25fdGlwcyIsInBvc2l0aW9uIiwic3R1ZHlfdWlfdGlwcyIsInN0YWZmX3VpX3RpcHMiLCJzaG9wX3VpX3RpcHMiLCJzaG9wX3VpX2NhbGxiYWNrIiwibGFuZF9hcnIiLCJwbGFudF9hcnIiLCJwbGFudCIsImNvc3QiLCJuZWVkX2xldmVsIiwiaiIsInN0ZHV5X3RpcHNfY2FsbGJhY2siLCJzdGFmZl90aXBzX2NhbGxiYWNrIiwiY3JlYXRlX3BldCIsInBldCIsImNyZWF0ZV9wZXRfYSIsImluZGV4Iiwib25fZ2V0X2hvdGVsX3Byb2R1Y2VfY2xpY2siLCJlIiwidGFyZ2V0IiwiY3JlYXRlX2dvbGRfZWZmZWN0IiwiaG90ZWxfY2FjaGVfZ29sZCIsInVwZGF0ZV9ob3RlbF9wcm9kdWNlIiwibGFiZWwiLCJob3RlbF9idXlfcm9vbSIsInJvb21faW5kZXgiLCJob3RlbF8wIiwiaG90ZWxfMSIsImhvdGVsXzIiLCJob3RlbF8zIiwiaW5pX2hvdGVsX3Byb2R1Y2UiLCJob3RlbCIsImhvdGVsXzBfc2NoZWR1bGUiLCJwcm9kdWNlX3RpbWUiLCJwcm9kdWNlIiwiaG90ZWxfMV9zY2hlZHVsZSIsImhvdGVsXzJfc2NoZWR1bGUiLCJob3RlbF8zX3NjaGVkdWxlIiwianVkZ2VfZGF0ZSIsIm5vd19kYXRlIiwiZ2V0RGF0ZSIsInNhdmVfZGF0ZSIsInNoYXJlX2NvdW50IiwidW5kZWZpbmVkIiwiaW5pX3ZpZGVvdGFwZSIsInZpZGVvdGFwZV9wYXRoIiwidmlkZW90YXBlX3N0YXJ0X3RpbWUiLCJ2aWRlb3RhcGVfc3RhdGUiLCJvbl92aWRlb3RhcGVfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX3ZpZGVvdGFwZV91aSIsInZpZGVvdGFwZV90aW1lIiwic3RvcF92aWRlb3RhcGUiLCJzdGFydF92aWRlb3RhcGUiLCJ3eCIsInZpZGVvdGFwZV90aW1lQ29udHJvbCIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwicmVjb3JkZXIiLCJnZXRHYW1lUmVjb3JkZXJNYW5hZ2VyIiwib25TdGFydCIsInJlcyIsImR1cmF0aW9uIiwib25TdG9wIiwidmlkZW9QYXRoIiwic3RvcCIsInRpbWVfY291bnQiLCJsb2FkIiwibWFuYWdlciIsImRpcmVjdG9yIiwiZ2V0Q29sbGlzaW9uTWFuYWdlciIsImVuYWJsZWQiLCJwbGF5X2JnX3NvdW5kIiwib25fdGVzdF9idXR0b25fY2xpY2siLCJjdXN0b20iLCJvbkxvYWQiLCJmaW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBSEEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQSxJQUFJQyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUNBLElBQUlFLElBQUksR0FBR0YsT0FBTyxDQUFDLE1BQUQsQ0FBbEI7O0FBRUFHLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxXQUFXLEVBQUVKLEVBQUUsQ0FBQ0ssTUFEUjtBQUVSQyxJQUFBQSxlQUFlLEVBQUVOLEVBQUUsQ0FBQ08sSUFGWjtBQUdSQyxJQUFBQSxXQUFXLEVBQUVSLEVBQUUsQ0FBQ08sSUFIUjtBQUlSRSxJQUFBQSxVQUFVLEVBQUVULEVBQUUsQ0FBQ1UsS0FKUDtBQUtSQyxJQUFBQSxRQUFRLEVBQUVYLEVBQUUsQ0FBQ1UsS0FMTDtBQU1SRSxJQUFBQSxXQUFXLEVBQUVaLEVBQUUsQ0FBQ1UsS0FOUjtBQU9SRyxJQUFBQSxrQkFBa0IsRUFBRWIsRUFBRSxDQUFDYyxXQVBmO0FBUVJDLElBQUFBLGdCQUFnQixFQUFFZixFQUFFLENBQUNjLFdBUmI7QUFTUkUsSUFBQUEsYUFBYSxFQUFFaEIsRUFBRSxDQUFDSyxNQVRWO0FBVVJZLElBQUFBLGdCQUFnQixFQUFFLENBQUNqQixFQUFFLENBQUNLLE1BQUosQ0FWVjtBQVdSYSxJQUFBQSxjQUFjLEVBQUVsQixFQUFFLENBQUNPLElBWFg7QUFZUlksSUFBQUEsV0FBVyxFQUFFbkIsRUFBRSxDQUFDTyxJQVpSO0FBYVJhLElBQUFBLGVBQWUsRUFBRXBC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UUFBTDtBQUNILEdBem9CSTtBQTJvQkxxRCxFQUFBQSxLQTNvQkssbUJBMm9CRyxDQUVQLENBN29CSSxDQStvQkw7O0FBL29CSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcbnZhciBjb25maWcgPSByZXF1aXJlKFwiY29uZmlnXCIpO1xudmFyIHB1c2ggPSByZXF1aXJlKFwicHVzaFwiKTtcbmltcG9ydCBmeCBmcm9tIFwiZnhcIjtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGxhbmRfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIGxhbmRfZ3JvdXBfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgY2VudGVyX25vZGU6IGNjLk5vZGUsXG4gICAgICAgIGdvbGRfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBleF9sYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIGxldmVsX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgZ29sZF9wcm9ncmVzc19ub2RlOiBjYy5Qcm9ncmVzc0JhcixcbiAgICAgICAgZXhfcHJvZ3Jlc3Nfbm9kZTogY2MuUHJvZ3Jlc3NCYXIsXG4gICAgICAgIHBsYXllcl9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgc3RhZmZfcHJlZmFiX2FycjogW2NjLlByZWZhYl0sXG4gICAgICAgIHdhcmVIb3VzZV9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBtYWluX2NhbWVyYTogY2MuTm9kZSxcbiAgICAgICAgdGlwc19ncm91cF9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBidXR0b25fZ3JvdXBfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgaG90ZWxfcHJvZHVjZV9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICB2aWRlb3RhcGVfYnV0dG9uOiBjYy5Ob2RlLFxuICAgICAgICB2aWRlb3RhcGVfYnV0dG9uX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICB9LFxuXG5cbiAgICAvL+a1h+awtOaMiemSruiiq+eCueWHu1xuICAgIG9uX3dhdGVyaW5nX2J1dHRvbl9jbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJtYWluX2J1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2J1dHRvbl9ncm91cCh0aGlzLmNlbnRlcl9ub2RlKTtcbiAgICAgICAgbm9kZS56SW5kZXggPSAzO1xuICAgICAgICBpZiAobm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcImJ1dHRvbl9tb3JlXCIpLmluaV9ub2RlKFwid2F0ZXJpbmdcIik7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+iAleWcsOaMiemSruiiq+eCueWHu1xuICAgIG9uX3RpbGxfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcIm1haW5fYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfYnV0dG9uX2dyb3VwKHRoaXMuY2VudGVyX25vZGUpO1xuICAgICAgICBub2RlLnpJbmRleCA9IDM7XG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiYnV0dG9uX21vcmVcIikuaW5pX25vZGUoXCJ0aWxsXCIpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/lrabkuaDmjInpkq7ooqvngrnlh7tcbiAgICBvbl9zdHVkeV9idXR0b25fY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwibWFpbl9idXR0b25fY2xpY2tcIik7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9zdHVkeV91aSh0aGlzLm5vZGUpO1xuICAgICAgICBpZiAobm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInN0dWR5X3VpXCIpLmluaV9ub2RlKCk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL2hvbWUg6KKr54K55Ye75pe2XG4gICAgb25faG9tZV9idXR0b25fY2xpY2soKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9vcHRpb25fdWkoKTtcbiAgICB9LFxuICAgIC8v5a6g54mp5oyJ6ZKu6KKr54K55Ye7XG4gICAgb25fcGV0X2J1dHRvbl9jbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJtYWluX2J1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldF91aSh0aGlzLm5vZGUpO1xuICAgICAgICBpZiAobm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInBldF91aVwiKS5pbmlfbm9kZSgpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/ml4XppobmjInpkq7ooqvngrnlh7tcbiAgICBvbl9ob3RlbF9idXR0b25fY2xpY2soKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9ob3RlbF91aSgpO1xuICAgIH0sXG4gICAgLy/pm4fkvaPlkZjlt6VcbiAgICBvbl9zdGFmZl9idXR0b25fY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwibWFpbl9idXR0b25fY2xpY2tcIik7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9zdGFmZl91aSh0aGlzLm5vZGUpO1xuICAgICAgICBpZiAobm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInN0YWZmX3VpXCIpLmluaV9ub2RlKCk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+eUn+aIkOWcn+WcsFxuICAgIGNyZWF0ZV9sYW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmQpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmxhbmRfcHJlZmFiKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5sYW5kX2dyb3VwX25vZGU7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcImxhbmRcIikuaW5pX25vZGUoaSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+WIm+W7uueOqeWutuWwj+S6ulxuICAgIGNyZWF0ZV9wbGF5ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllcl9wcmVmYWIpO1xuICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuY2VudGVyX25vZGU7XG4gICAgfSxcbiAgICAvL+WIm+W7uuS9o+S6ulxuICAgIGNyZWF0ZV9zdGFmZjogZnVuY3Rpb24gKHN0YWZmX2luZGV4KSB7XG4gICAgICAgIGlmIChzdGFmZl9pbmRleCA9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZik7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW2ldLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3RhZmZfcHJlZmFiX2FycltpXSk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5sYW5kX2dyb3VwX25vZGUuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic3RhZmZfYWlcIikuaW5pX25vZGUoaSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnN0YWZmX3ByZWZhYl9hcnJbc3RhZmZfaW5kZXhdKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5sYW5kX2dyb3VwX25vZGUuY2hpbGRyZW5bc3RhZmZfaW5kZXhdO1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzdGFmZl9haVwiKS5pbmlfbm9kZShzdGFmZl9pbmRleCk7XG4gICAgICAgIH07XG5cbiAgICB9LFxuICAgIC8v5Yi35paw6YeR5biB5pWwXG4gICAgYWRkX2dvbGQ6IGZ1bmN0aW9uIChudW0pIHtcbiAgICAgICAgaWYgKHRoaXMuYWRkX2dvbGRfYW5pbSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmFkZF9nb2xkX2FuaW0gPSAxO1xuICAgICAgICAgICAgdmFyIHRpbWVDb3VudCA9IDEwO1xuICAgICAgICAgICAgdmFyIGdvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XG4gICAgICAgICAgICB2YXIgZ29sZF9tYXggPSA1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDA7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIFBudW0gPSBwYXJzZUludChudW0gLyB0aW1lQ291bnQpXG4gICAgICAgICAgICAgICAgdGltZUNvdW50LS07XG4gICAgICAgICAgICAgICAgdGhpcy5nb2xkX2xhYmVsLnN0cmluZyA9IGdvbGQgKyBQbnVtICsgXCIvXCIgKyBnb2xkX21heDtcbiAgICAgICAgICAgICAgICBpZiAodGltZUNvdW50IDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkICs9IG51bTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA+IGdvbGRfbWF4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJ1bl9jbGlja1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLm5vZGUsIFwiZ29sZF9mdWxsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID0gZ29sZF9tYXg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nb2xkX2xhYmVsLnN0cmluZyA9IHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCArIFwiL1wiICsgZ29sZF9tYXg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0X2dvbGRfcHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRfZ29sZF9hbmltID0gMDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMDMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkICs9IG51bTtcbiAgICAgICAgfTtcblxuICAgIH0sXG4gICAgLy/liLfmlrBleOaVsFxuICAgIGFkZF9leDogZnVuY3Rpb24gKG51bSkge1xuICAgICAgICBpZiAodGhpcy5hZGRfZXhfYW5pbSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmFkZF9leF9hbmltID0gMTtcbiAgICAgICAgICAgIHZhciB0aW1lQ291bnQgPSAxMDtcbiAgICAgICAgICAgIHZhciBleCA9IHVzZXJfZGF0YS51c2VyX2RhdGEubm93X2V4O1xuICAgICAgICAgICAgdmFyIG5leHRfZXggPSAyICogdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbDtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgUG51bSA9IHBhcnNlSW50KG51bSAvIHRpbWVDb3VudClcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQtLTtcbiAgICAgICAgICAgICAgICB0aGlzLmV4X2xhYmVsLnN0cmluZyA9IGV4ICsgUG51bSArIFwiL1wiICsgbmV4dF9leDtcbiAgICAgICAgICAgICAgICBpZiAodGltZUNvdW50IDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXggKz0gbnVtO1xuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXggPiBuZXh0X2V4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsX3BvaW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwiZ2lmdF9hZF9sZXZlbFwiKTsgICAgLy8gc2hvdyBub3RpYyBsZXZlbCB1cFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0X2V4X3Byb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkX2V4X2FuaW0gPSAwO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4wNSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leCArPSBudW07XG4gICAgICAgIH07XG5cbiAgICB9LFxuICAgIHNldF9nb2xkX3Byb2dyZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xuICAgICAgICB2YXIgZ29sZF9tYXggPSA1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDA7XG4gICAgICAgIHRoaXMuZ29sZF9sYWJlbC5zdHJpbmcgPSBnb2xkICsgXCIvXCIgKyBnb2xkX21heDtcbiAgICAgICAgY2MudHdlZW4odGhpcy5nb2xkX3Byb2dyZXNzX25vZGUpXG4gICAgICAgICAgICAudG8oMC4zLCB7IHByb2dyZXNzOiBnb2xkIC8gZ29sZF9tYXggfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH0sXG4gICAgc2V0X2V4X3Byb2dyZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBub3dfZXggPSB1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leDtcbiAgICAgICAgdmFyIG5leHRfZXggPSAyICogdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbDtcbiAgICAgICAgdGhpcy5sZXZlbF9sYWJlbC5zdHJpbmcgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsO1xuICAgICAgICB0aGlzLmV4X2xhYmVsLnN0cmluZyA9IG5vd19leCArIFwiL1wiICsgbmV4dF9leDtcbiAgICAgICAgY2MudHdlZW4odGhpcy5leF9wcm9ncmVzc19ub2RlKVxuICAgICAgICAgICAgLnRvKDAuMywgeyBwcm9ncmVzczogbm93X2V4IC8gbmV4dF9leCB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgfSxcbiAgICAvL+S7k+W6k+iiq+eCueWHu1xuICAgIG9uX3dhcmVIb3VzZV9jbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9zZWxsX3VpKHRoaXMubm9kZSk7XG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic2VsbF91aVwiKS5pbmlfbm9kZSgpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/ku5PlupPlt7Lmu6FcbiAgICB3YXJlSG91c2VfZnVsbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAvL1xuICAgICAgICB0aGlzLndhcmVIb3VzZV9zaGNlZHVsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZSk7XG4gICAgICAgICAgICB2YXIgYWxsX2NhcGFjaXR5ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VfbGV2ZWwgKiBjb25maWcud2FyZUhvdXNlW1wiYWxsX2NhcGFjaXR5XCJdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uY291bnQgPj0gYWxsX2NhcGFjaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FyZUhvdXNlX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ3YXJlSG91c2VfZnVsbFwiKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXJlSG91c2Vfbm9kZS5nZXRDaGlsZEJ5TmFtZShcIndhcmVIb3VzZV9mdWxsXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMud2FyZUhvdXNlX3NoY2VkdWxlLCAwLjEpO1xuICAgIH0sXG4gICAgLy/mnpzlm63ooqvngrnlh7tcbiAgICBvbl9vcmNoYXJkX2J1dHRvbl9jbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9iZ19zb3VuZChcInZpbGxhZ2VfYmdcIik7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcInVuX2NsaWNrXCIpO1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5ub2RlLCBcInVuX2RldmVsb3BcIik7XG4gICAgfSxcbiAgICAvL+iHquWKqOWtmOaho1xuICAgIGF1dG9fc2F2ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmeC5zYXZlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8v5Yi35paw5Zyf5ZywXG4gICAgdXBkYXRhX2xhbmQ6IGZ1bmN0aW9uIChsYW5kX2luZGV4KSB7XG4gICAgICAgIC8v5Yid5aeL5YyW5Zyf5Zyw54q25oCBXG4gICAgICAgIHRoaXMubGFuZF9ncm91cF9ub2RlLmNoaWxkcmVuW2xhbmRfaW5kZXhdLmdldENvbXBvbmVudChcImxhbmRcIikuaW5pX25vZGUobGFuZF9pbmRleCk7XG4gICAgfSxcbiAgICAvL+iusOW9leS4iue6v+aXtumXtFxuICAgIHNhdmVfbG9naW5fdGltZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sb2dpbl90aW1lID09IDApIHtcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubG9naW5fdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/liJvlu7rnprvnur/mlLbnm4p1aVxuICAgIG9mZmxpbmVfcHJvZml0X3VpOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsb2dpbl90aW1lID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sb2dpbl90aW1lO1xuICAgICAgICB2YXIgbm93X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdmFyIG1pbiA9IE1hdGguZmxvb3IoKG5vd190aW1lIC0gbG9naW5fdGltZSkgLyAoMTAwMCAqIDYwKSk7XG4gICAgICAgIGlmIChtaW4gPj0gNSkge1xuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9vZmZsaW5lX3Byb2ZpdF91aSh0aGlzLm5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/kupLmjqjmjInpkq7ooqvngrnlh7tcbiAgICAvLyBvbl9wdXNoX2J1dHRvbl9jbGljazogZnVuY3Rpb24gKGUsIG5hbWUpIHtcbiAgICAvLyAgICAgaWYgKHR5cGVvZiAod3gpICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgLy8gICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xuICAgIC8vICAgICAgICAgICAgIGFwcElkOiBwdXNoW25hbWVdLmFwcGlkLFxuICAgIC8vICAgICAgICAgICAgIHBhdGg6ICcnLFxuICAgIC8vICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIH0pXG4gICAgLy8gICAgIH07XG4gICAgLy8gfSxcbiAgICAvL+WVhuW6l+aMiemSruiiq+eCueWHu1xuICAgIG9uX3Nob3BfYnV0dG9uX2NsaWNrKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfc2hvcF91aSgpO1xuICAgIH0sXG4gICAgLy/liJvlu7rmlrDmiYvlvJXlr7xcbiAgICBjcmVhdGVfbm92aWNlKCkge1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5ub3ZpY2UgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9ub3ZpY2VfdWkoKTtcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubm92aWNlID0gMTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5Yib5bu65oyJ6ZKu5o+Q56S6XG4gICAgY3JlYXRlX2J1dHRvbl90aXBzKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYnV0dG9uX2dyb3VwX25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfYnV0dG9uX3RpcHModGhpcy50aXBzX2dyb3VwX25vZGUsIHRoaXMuYnV0dG9uX2dyb3VwX25vZGUuY2hpbGRyZW5baV0ucG9zaXRpb24pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnN0dWR5X3VpX3RpcHMoKTtcbiAgICAgICAgdGhpcy5zdGFmZl91aV90aXBzKCk7XG4gICAgICAgIHRoaXMuc2hvcF91aV90aXBzKCk7XG4gICAgfSxcbiAgICAvL+i0reS5sOWVhuWTgeaPkOekulxuICAgIHNob3BfdWlfdGlwcygpIHtcbiAgICAgICAgdGhpcy5zaG9wX3VpX2NhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGxhbmRfYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kKVxuICAgICAgICAgICAgdmFyIHBsYW50X2FyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEucGxhbnQpXG4gICAgICAgICAgICB2YXIgZ29sZCA9IHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZDtcbiAgICAgICAgICAgIHZhciBsZXZlbCA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWw7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhbmRfYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdvbGQgPj0gY29uZmlnLmxhbmRbaV0uY29zdCAmJiBsZXZlbCA+PSBjb25maWcubGFuZFtpXS5uZWVkX2xldmVsICYmIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFtpXS5oYXZlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aXBzX2dyb3VwX25vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwbGFudF9hcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZ29sZCA+PSBjb25maWcucGxhbnRbal0uY29zdCAmJiBsZXZlbCA+PSBjb25maWcucGxhbnRbal0ubmVlZF9sZXZlbCAmJiB1c2VyX2RhdGEudXNlcl9kYXRhLnBsYW50W2pdLmhhdmUgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aXBzX2dyb3VwX25vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zaG9wX3VpX2NhbGxiYWNrLCAxKTtcbiAgICB9LFxuICAgIC8v5Yqg54K55o+Q56S6XG4gICAgc3R1ZHlfdWlfdGlwcygpIHtcbiAgICAgICAgdGhpcy5zdGR1eV90aXBzX2NhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNraWxsX3BvaW50ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbF9wb2ludDtcbiAgICAgICAgICAgIGlmIChza2lsbF9wb2ludCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL+aKgOiDveeCueS4jei2s+S4jeaPkOekulxuICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnN0ZHV5X3RpcHNfY2FsbGJhY2ssIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8v6ZuH5L2j5bel5Lq65o+Q56S6XG4gICAgc3RhZmZfdWlfdGlwcygpIHtcbiAgICAgICAgdGhpcy5zdGFmZl90aXBzX2NhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmYpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvL+aLpeaciei/meWdl+Wcn+WcsFxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbaV0uaGF2ZSA9PSAxICYmIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA+PSBjb25maWcuc3RhZmZbaV0uY29zdCAmJiB1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW2ldLmhhdmUgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblszXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aXBzX2dyb3VwX25vZGUuY2hpbGRyZW5bM10uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zdGFmZl90aXBzX2NhbGxiYWNrLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XG4gICAgfSxcbiAgICAvL+WIm+W7uuWuoOeJqVxuICAgIGNyZWF0ZV9wZXQoKSB7XG4gICAgICAgIHZhciBhcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLnBldCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbaV0uaGF2ZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9wZXQodGhpcy5jZW50ZXJfbm9kZSwgaSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/ljZXkuKrliJvlu7rlrqDnialcbiAgICBjcmVhdGVfcGV0X2EoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9wZXQodGhpcy5jZW50ZXJfbm9kZSwgaW5kZXgpO1xuICAgIH0sXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAvL+mihuWPluaUtuebilxuICAgIG9uX2dldF9ob3RlbF9wcm9kdWNlX2NsaWNrKGUpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBlLnRhcmdldDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfZ29sZF9lZmZlY3Qobm9kZSwgaSwgMCk7XG4gICAgICAgIH07XG4gICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWRkX2dvbGQodXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbF9jYWNoZV9nb2xkKTtcbiAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbF9jYWNoZV9nb2xkID0gMDtcbiAgICB9LFxuICAgIC8v5Yi35paw5peF6aaG5pS255uKXG4gICAgdXBkYXRlX2hvdGVsX3Byb2R1Y2UoKSB7XG4gICAgICAgIC8vMXPmm7TmlrDkuIDmrKHmlbDmja5cbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGhvdGVsX2NhY2hlX2dvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQ7XG4gICAgICAgICAgICBpZiAoaG90ZWxfY2FjaGVfZ29sZCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF9wcm9kdWNlX25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaG90ZWxfcHJvZHVjZV9ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGxhYmVsID0gdGhpcy5ob3RlbF9wcm9kdWNlX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJob3RlbF9wcm9kdWNlX2xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBob3RlbF9jYWNoZV9nb2xkO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XG4gICAgfSxcbiAgICAvL+i0reS5sOS4gOS4quaIv+mXtFxuICAgIGhvdGVsX2J1eV9yb29tKHJvb21faW5kZXgpIHtcbiAgICAgICAgc3dpdGNoIChyb29tX2luZGV4KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF8wKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF8xKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF8yKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF8zKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+WIneWni+WMluaXhemmhuS6p+WHulxuICAgIGluaV9ob3RlbF9wcm9kdWNlKCkge1xuXG4gICAgICAgIC8v5ZCv5Yqo5Yi35paw5pS255uKXG4gICAgICAgIHRoaXMudXBkYXRlX2hvdGVsX3Byb2R1Y2UoKTtcblxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbFswXS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuaG90ZWxfMCgpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbFsxXS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuaG90ZWxfMSgpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbFsyXS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuaG90ZWxfMigpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbFszXS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuaG90ZWxfMygpO1xuICAgICAgICB9O1xuXG4gICAgfSxcbiAgICAvL2hvdGVsMCDnlJ/miJBcbiAgICBob3RlbF8wKCkge1xuICAgICAgICB2YXIgdGltZUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5ob3RlbF8wX3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGltZUNvdW50Kys7XG4gICAgICAgICAgICBpZiAodGltZUNvdW50ID49IGNvbmZpZy5ob3RlbFswXS5wcm9kdWNlX3RpbWUpIHtcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQgKz0gY29uZmlnLmhvdGVsWzBdLnByb2R1Y2U7XG4gICAgICAgICAgICAgICAgdGltZUNvdW50ID0gMDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5ob3RlbF8wX3NjaGVkdWxlLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XG4gICAgfSxcbiAgICAvL2hvdGVsMSDnlJ/miJBcbiAgICBob3RlbF8xKCkge1xuICAgICAgICB2YXIgdGltZUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5ob3RlbF8xX3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGltZUNvdW50Kys7XG4gICAgICAgICAgICBpZiAodGltZUNvdW50ID49IGNvbmZpZy5ob3RlbFsxXS5wcm9kdWNlX3RpbWUpIHtcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQgKz0gY29uZmlnLmhvdGVsWzFdLnByb2R1Y2U7XG4gICAgICAgICAgICAgICAgdGltZUNvdW50ID0gMDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5ob3RlbF8xX3NjaGVkdWxlLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XG4gICAgfSxcbiAgICAvL2hvdGVsMiDnlJ/miJBcbiAgICBob3RlbF8yKCkge1xuICAgICAgICB2YXIgdGltZUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5ob3RlbF8yX3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGltZUNvdW50Kys7XG4gICAgICAgICAgICBpZiAodGltZUNvdW50ID49IGNvbmZpZy5ob3RlbFsyXS5wcm9kdWNlX3RpbWUpIHtcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQgKz0gY29uZmlnLmhvdGVsWzJdLnByb2R1Y2U7XG4gICAgICAgICAgICAgICAgdGltZUNvdW50ID0gMDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5ob3RlbF8yX3NjaGVkdWxlLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XG4gICAgfSxcbiAgICAvL2hvdGVsMyDnlJ/miJBcbiAgICBob3RlbF8zKCkge1xuICAgICAgICB2YXIgdGltZUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5ob3RlbF8zX3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGltZUNvdW50Kys7XG4gICAgICAgICAgICBpZiAodGltZUNvdW50ID49IGNvbmZpZy5ob3RlbFszXS5wcm9kdWNlX3RpbWUpIHtcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQgKz0gY29uZmlnLmhvdGVsWzNdLnByb2R1Y2U7XG4gICAgICAgICAgICAgICAgdGltZUNvdW50ID0gMDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5ob3RlbF8zX3NjaGVkdWxlLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XG4gICAgfSxcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy/liKTmlq3lvZPliY3ml6XmnJ9cbiAgICBqdWRnZV9kYXRlKCkge1xuICAgICAgICB2YXIgbm93X2RhdGUgPSBuZXcgRGF0ZSgpLmdldERhdGUoKTtcbiAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEucGV0KTtcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc2F2ZV9kYXRlID09IDApIHtcbiAgICAgICAgICAgIC8v5paw5a2Y5qGj6K6w5b2V5pel5pyfXG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNhdmVfZGF0ZSA9IG5vd19kYXRlO1xuICAgICAgICB9IGVsc2UgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc2F2ZV9kYXRlICE9IG5vd19kYXRlKSB7XG4gICAgICAgICAgICAvL+aXpeacn+S4jeebuOWQjO+8jOm7mOiupOesrOS6jOWkqeWPiuS7peWQjizph43nva7liIbkuqvmrKHmlbBcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W2ldLnNoYXJlX2NvdW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbaV0uc2hhcmVfY291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyX2RhdGEudXNlcl9kYXRhLnZpZGVvdGFwZV9zaGFyZV9jb3VudCA9IDA7XG5cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2F2ZV9kYXRlID0gbm93X2RhdGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL+aXpeacn+S4uuWQjOS4gOWkqVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgLy/liJ3lp4vljJblvZXlsY/lip/og71cbiAgICBpbmlfdmlkZW90YXBlKCkge1xuICAgICAgICAvL+W9leWxj+eahOS/neWtmOi3r+W+hFxuICAgICAgICB0aGlzLnZpZGVvdGFwZV9wYXRoID0gbnVsbDtcbiAgICAgICAgdGhpcy52aWRlb3RhcGVfc3RhcnRfdGltZSA9IDA7XG4gICAgICAgIHRoaXMudmlkZW90YXBlX3N0YXRlID0gXCJ1bnN0YXJ0XCI7XG4gICAgfSxcbiAgICBvbl92aWRlb3RhcGVfYnV0dG9uX2NsaWNrKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG4gICAgICAgIGlmICh0aGlzLnZpZGVvdGFwZV9zdGF0ZSA9PSBcInVuc3RhcnRcIikge1xuICAgICAgICAgICAgLy/mnKrlvIDlp4vov5vlhaXlpZblirHnlYzpnaJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdmlkZW90YXBlX3VpKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy52aWRlb3RhcGVfc3RhdGUgPT0gXCJzdGFydFwiKSB7XG4gICAgICAgICAgICAvL+W8gOWni+WQjuWkp+S6jjPnp5LmiY3og73lhbPpl61cbiAgICAgICAgICAgIHZhciBub3dfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgdmFyIHZpZGVvdGFwZV90aW1lID0gbm93X3RpbWUgLSB0aGlzLnZpZGVvdGFwZV9zdGFydF90aW1lO1xuICAgICAgICAgICAgaWYgKHZpZGVvdGFwZV90aW1lIDwgMzAwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLm5vZGUsIFwidmlkZW90YXBlX25vX3RpbWVcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcF92aWRlb3RhcGUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+W8gOWni+a4uOaIj+W9leWxj1xuICAgIHN0YXJ0X3ZpZGVvdGFwZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAvL+iusOW9leS4gOS4quaXtumXtOaIs1xuICAgICAgICB0aGlzLnZpZGVvdGFwZV9zdGFydF90aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XG5cbiAgICAgICAgICAgIHRoaXMudmlkZW90YXBlX3N0YXRlID0gXCJzdGFydFwiO1xuICAgICAgICAgICAgdGhpcy52aWRlb3RhcGVfdGltZUNvbnRyb2woKTtcbiAgICAgICAgICAgIC8v5YiH5o2i5b2V5bGP5oyJ6ZKu5Zu+5qCHXG4gICAgICAgICAgICB0aGlzLnZpZGVvdGFwZV9idXR0b24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnZpZGVvdGFwZV9idXR0b25fYXJyWzFdO1xuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZSwgXCJ2aWRlb3RhcGVfc3RhcnRcIik7XG5cbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIgPSB3eC5nZXRHYW1lUmVjb3JkZXJNYW5hZ2VyKCk7XG4gICAgICAgICAgICB0aGlzLnJlY29yZGVyLm9uU3RhcnQocmVzID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuW9leWxj+W8gOWni1wiKTtcbiAgICAgICAgICAgICAgICAvLyBkbyBzb21ldGhpbmU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIuc3RhcnQoe1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA2MFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICB9LFxuICAgIC8v57uT5p2f5ri45oiP5b2V5bGPXG4gICAgc3RvcF92aWRlb3RhcGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMudmlkZW90YXBlX3N0YXRlID0gXCJ1bnN0YXJ0XCI7XG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5ub2RlLCBcInZpZG90YXBlX292ZXJcIik7XG4gICAgICAgICAgICB0aGlzLnZpZGVvdGFwZV9idXR0b24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnZpZGVvdGFwZV9idXR0b25fYXJyWzBdO1xuXG4gICAgICAgICAgICB0aGlzLnJlY29yZGVyLm9uU3RvcChyZXMgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcy52aWRlb1BhdGgsIFwi5b2V5bGP57uT5p2fXCIpO1xuICAgICAgICAgICAgICAgIC8vIGRvIHNvbWV0aGluZTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvdGFwZV9wYXRoID0gcmVzLnZpZGVvUGF0aDtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3ZpZGVvdGFwZV91aSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnJlY29yZGVyLnN0b3AoKTtcblxuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/lvZXlsY/ml7bpl7TmjqfliLZcbiAgICB2aWRlb3RhcGVfdGltZUNvbnRyb2woKSB7XG4gICAgICAgIHZhciB0aW1lX2NvdW50ID0gMDtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGltZV9jb3VudCsrO1xuICAgICAgICAgICAgLy/otoXov4fkuobmnIDlpKfml7bplb/miJbogIXlvZXliLbnirbmgIHkuLrmnKrlvIDlkK9cbiAgICAgICAgICAgIGlmICh0aW1lX2NvdW50ID49IDYwIHx8IHRoaXMudmlkZW90YXBlX3N0YXRlID09IFwidW5zdGFydFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB0aW1lX2NvdW50ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BfdmlkZW90YXBlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZSwgXCJ2aWRvdGFwZV9vdmVyXCIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMSwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xuICAgIH0sXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAvL+WIneWni+WMluiKgueCuVxuICAgIGluaV9ub2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ4LmxvYWQoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVfbGFuZCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZV9wZXQoKTtcbiAgICAgICAgdGhpcy5hZGRfZ29sZF9hbmltID0gMDtcbiAgICAgICAgdGhpcy5hZGRfZXhfYW5pbSA9IDA7XG4gICAgICAgIC8v6LCD55So56Kw5pKe5qOA5rWL57uE5Lu2XG4gICAgICAgIHRoaXMubWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKTtcbiAgICAgICAgLy/pu5jorqTnorDmkp7kuLrlhbNcbiAgICAgICAgdGhpcy5tYW5hZ2VyLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNldF9nb2xkX3Byb2dyZXNzKCk7XG4gICAgICAgIHRoaXMuc2V0X2V4X3Byb2dyZXNzKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlX3BsYXllcigpO1xuICAgICAgICB0aGlzLmNyZWF0ZV9zdGFmZigpO1xuICAgICAgICB0aGlzLmF1dG9fc2F2ZSgpO1xuICAgICAgICB0aGlzLnNhdmVfbG9naW5fdGltZSgpO1xuICAgICAgICB0aGlzLmNyZWF0ZV9idXR0b25fdGlwcygpO1xuICAgICAgICB0aGlzLm9mZmxpbmVfcHJvZml0X3VpKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlX25vdmljZSgpO1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9iZ19zb3VuZChcImhvbWVfYmdcIik7XG4gICAgICAgIHRoaXMuaW5pX2hvdGVsX3Byb2R1Y2UoKTtcbiAgICAgICAgdGhpcy5qdWRnZV9kYXRlKCk7XG4gICAgICAgIHRoaXMud2FyZUhvdXNlX2Z1bGwoKTtcbiAgICAgICAgdGhpcy5pbmlfdmlkZW90YXBlKCk7XG4gICAgfSxcblxuXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIG9uX3Rlc3RfYnV0dG9uX2NsaWNrKGUsIGN1c3RvbSkge1xuICAgICAgICBzd2l0Y2ggKGN1c3RvbSkge1xuICAgICAgICAgICAgY2FzZSBcIjBcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmFkZF9nb2xkKHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGwuZ29sZF9tYXggKiA1MDAgKyA1MDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIjFcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmFkZF9leCgyICogdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbCArIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIjJcIjpcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMF0uaGF2ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzBdLmhhdmUgPSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLm5vZGUsIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMV0uaGF2ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzFdLmhhdmUgPSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLm5vZGUsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMl0uaGF2ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzJdLmhhdmUgPSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLm5vZGUsIDIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbM10uaGF2ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzNdLmhhdmUgPSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLm5vZGUsIDMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLm5vZGUsIDApO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMubm9kZSwgMSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJoYXZlIHBldCBcIiArIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzBdLmhhdmUpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGF2ZSBwZXQgXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFsxXS5oYXZlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCIzXCI6XG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMl0uaGF2ZSA9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiNFwiOlxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzJdLmhhdmUgPSAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuaW5pX25vZGUoKTtcbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==