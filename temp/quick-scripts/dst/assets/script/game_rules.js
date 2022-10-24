
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
    this.sound_control.play_sound_effect("main_button_click");
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
          }

          this.unschedule(callback);
          this.set_ex_progress();
          this.add_ex_anim = 0;
        }

        ;
      };

      this.schedule(callback, 0.03);
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

    this.schedule(this.wareHouse_shcedule, 0.5);
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

    this.schedule(callback, 10, cc.macro.REPEAT_FOREVER);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lX3J1bGVzLmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjb25maWciLCJwdXNoIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsYW5kX3ByZWZhYiIsIlByZWZhYiIsImxhbmRfZ3JvdXBfbm9kZSIsIk5vZGUiLCJjZW50ZXJfbm9kZSIsImdvbGRfbGFiZWwiLCJMYWJlbCIsImV4X2xhYmVsIiwibGV2ZWxfbGFiZWwiLCJnb2xkX3Byb2dyZXNzX25vZGUiLCJQcm9ncmVzc0JhciIsImV4X3Byb2dyZXNzX25vZGUiLCJwbGF5ZXJfcHJlZmFiIiwic3RhZmZfcHJlZmFiX2FyciIsIndhcmVIb3VzZV9ub2RlIiwibWFpbl9jYW1lcmEiLCJ0aXBzX2dyb3VwX25vZGUiLCJidXR0b25fZ3JvdXBfbm9kZSIsImhvdGVsX3Byb2R1Y2Vfbm9kZSIsInZpZGVvdGFwZV9idXR0b24iLCJ2aWRlb3RhcGVfYnV0dG9uX2FyciIsIlNwcml0ZUZyYW1lIiwib25fd2F0ZXJpbmdfYnV0dG9uX2NsaWNrIiwic291bmRfY29udHJvbCIsInBsYXlfc291bmRfZWZmZWN0Iiwibm9kZSIsImdhbWVfc2NlbmVfanMiLCJjcmVhdGVfYnV0dG9uX2dyb3VwIiwiekluZGV4IiwiZ2V0Q29tcG9uZW50IiwiaW5pX25vZGUiLCJvbl90aWxsX2J1dHRvbl9jbGljayIsIm9uX3N0dWR5X2J1dHRvbl9jbGljayIsImNyZWF0ZV9zdHVkeV91aSIsIm9uX2hvbWVfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX29wdGlvbl91aSIsIm9uX3BldF9idXR0b25fY2xpY2siLCJjcmVhdGVfcGV0X3VpIiwib25faG90ZWxfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX2hvdGVsX3VpIiwib25fc3RhZmZfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX3N0YWZmX3VpIiwiY3JlYXRlX2xhbmQiLCJhcnIiLCJPYmplY3QiLCJrZXlzIiwibGFuZCIsImkiLCJsZW5ndGgiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsImNyZWF0ZV9wbGF5ZXIiLCJjcmVhdGVfc3RhZmYiLCJzdGFmZl9pbmRleCIsInN0YWZmIiwiaGF2ZSIsImNoaWxkcmVuIiwiYWRkX2dvbGQiLCJudW0iLCJhZGRfZ29sZF9hbmltIiwidGltZUNvdW50IiwiZ29sZCIsImdvbGRfbWF4Iiwic2tpbGwiLCJjYWxsYmFjayIsIlBudW0iLCJwYXJzZUludCIsInN0cmluZyIsImNyZWF0ZV90aXBzX3VpIiwidW5zY2hlZHVsZSIsInNldF9nb2xkX3Byb2dyZXNzIiwic2NoZWR1bGUiLCJhZGRfZXgiLCJhZGRfZXhfYW5pbSIsImV4Iiwibm93X2V4IiwibmV4dF9leCIsImxldmVsIiwic2tpbGxfcG9pbnQiLCJzZXRfZXhfcHJvZ3Jlc3MiLCJ0d2VlbiIsInRvIiwicHJvZ3Jlc3MiLCJzdGFydCIsIm9uX3dhcmVIb3VzZV9jbGljayIsImNyZWF0ZV9zZWxsX3VpIiwid2FyZUhvdXNlX2Z1bGwiLCJ3YXJlSG91c2Vfc2hjZWR1bGUiLCJ3YXJlSG91c2UiLCJhbGxfY2FwYWNpdHkiLCJ3YXJlSG91c2VfbGV2ZWwiLCJjb3VudCIsImdldENoaWxkQnlOYW1lIiwiYWN0aXZlIiwib25fb3JjaGFyZF9idXR0b25fY2xpY2siLCJhdXRvX3NhdmUiLCJmeCIsInNhdmUiLCJtYWNybyIsIlJFUEVBVF9GT1JFVkVSIiwidXBkYXRhX2xhbmQiLCJsYW5kX2luZGV4Iiwic2F2ZV9sb2dpbl90aW1lIiwibG9naW5fdGltZSIsIkRhdGUiLCJnZXRUaW1lIiwib2ZmbGluZV9wcm9maXRfdWkiLCJub3dfdGltZSIsIm1pbiIsIk1hdGgiLCJmbG9vciIsImNyZWF0ZV9vZmZsaW5lX3Byb2ZpdF91aSIsIm9uX3Nob3BfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX3Nob3BfdWkiLCJjcmVhdGVfbm92aWNlIiwibm92aWNlIiwiY3JlYXRlX25vdmljZV91aSIsImNyZWF0ZV9idXR0b25fdGlwcyIsInBvc2l0aW9uIiwic3R1ZHlfdWlfdGlwcyIsInN0YWZmX3VpX3RpcHMiLCJzaG9wX3VpX3RpcHMiLCJzaG9wX3VpX2NhbGxiYWNrIiwibGFuZF9hcnIiLCJwbGFudF9hcnIiLCJwbGFudCIsImNvc3QiLCJuZWVkX2xldmVsIiwiaiIsInN0ZHV5X3RpcHNfY2FsbGJhY2siLCJzdGFmZl90aXBzX2NhbGxiYWNrIiwiY3JlYXRlX3BldCIsInBldCIsImNyZWF0ZV9wZXRfYSIsImluZGV4Iiwib25fZ2V0X2hvdGVsX3Byb2R1Y2VfY2xpY2siLCJlIiwidGFyZ2V0IiwiY3JlYXRlX2dvbGRfZWZmZWN0IiwiaG90ZWxfY2FjaGVfZ29sZCIsInVwZGF0ZV9ob3RlbF9wcm9kdWNlIiwibGFiZWwiLCJob3RlbF9idXlfcm9vbSIsInJvb21faW5kZXgiLCJob3RlbF8wIiwiaG90ZWxfMSIsImhvdGVsXzIiLCJob3RlbF8zIiwiaW5pX2hvdGVsX3Byb2R1Y2UiLCJob3RlbCIsImhvdGVsXzBfc2NoZWR1bGUiLCJwcm9kdWNlX3RpbWUiLCJwcm9kdWNlIiwiaG90ZWxfMV9zY2hlZHVsZSIsImhvdGVsXzJfc2NoZWR1bGUiLCJob3RlbF8zX3NjaGVkdWxlIiwianVkZ2VfZGF0ZSIsIm5vd19kYXRlIiwiZ2V0RGF0ZSIsInNhdmVfZGF0ZSIsInNoYXJlX2NvdW50IiwidW5kZWZpbmVkIiwiaW5pX3ZpZGVvdGFwZSIsInZpZGVvdGFwZV9wYXRoIiwidmlkZW90YXBlX3N0YXJ0X3RpbWUiLCJ2aWRlb3RhcGVfc3RhdGUiLCJvbl92aWRlb3RhcGVfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX3ZpZGVvdGFwZV91aSIsInZpZGVvdGFwZV90aW1lIiwic3RvcF92aWRlb3RhcGUiLCJzdGFydF92aWRlb3RhcGUiLCJ3eCIsInZpZGVvdGFwZV90aW1lQ29udHJvbCIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwicmVjb3JkZXIiLCJnZXRHYW1lUmVjb3JkZXJNYW5hZ2VyIiwib25TdGFydCIsInJlcyIsImR1cmF0aW9uIiwib25TdG9wIiwidmlkZW9QYXRoIiwic3RvcCIsInRpbWVfY291bnQiLCJsb2FkIiwibWFuYWdlciIsImRpcmVjdG9yIiwiZ2V0Q29sbGlzaW9uTWFuYWdlciIsImVuYWJsZWQiLCJwbGF5X2JnX3NvdW5kIiwib25fdGVzdF9idXR0b25fY2xpY2siLCJjdXN0b20iLCJvbkxvYWQiLCJmaW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBSEEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQSxJQUFJQyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUNBLElBQUlFLElBQUksR0FBR0YsT0FBTyxDQUFDLE1BQUQsQ0FBbEI7O0FBRUFHLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxXQUFXLEVBQUVKLEVBQUUsQ0FBQ0ssTUFEUjtBQUVSQyxJQUFBQSxlQUFlLEVBQUVOLEVBQUUsQ0FBQ08sSUFGWjtBQUdSQyxJQUFBQSxXQUFXLEVBQUVSLEVBQUUsQ0FBQ08sSUFIUjtBQUlSRSxJQUFBQSxVQUFVLEVBQUVULEVBQUUsQ0FBQ1UsS0FKUDtBQUtSQyxJQUFBQSxRQUFRLEVBQUVYLEVBQUUsQ0FBQ1UsS0FMTDtBQU1SRSxJQUFBQSxXQUFXLEVBQUVaLEVBQUUsQ0FBQ1UsS0FOUjtBQU9SRyxJQUFBQSxrQkFBa0IsRUFBRWIsRUFBRSxDQUFDYyxXQVBmO0FBUVJDLElBQUFBLGdCQUFnQixFQUFFZixFQUFFLENBQUNjLFdBUmI7QUFTUkUsSUFBQUEsYUFBYSxFQUFFaEIsRUFBRSxDQUFDSyxNQVRWO0FBVVJZLElBQUFBLGdCQUFnQixFQUFFLENBQUNqQixFQUFFLENBQUNLLE1BQUosQ0FWVjtBQVdSYSxJQUFBQSxjQUFjLEVBQUVsQixFQUFFLENBQUNPLElBWFg7QUFZUlksSUFBQUEsV0FBVyxFQUFFbkIsRUFBRSxDQUFDTyxJQVpSO0FBYVJhLElBQUFBLGVBQWUsRUFBRXBC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Q0E1b0JJLENBOG9CTDs7QUE5b0JLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCJjb25maWdcIik7XG52YXIgcHVzaCA9IHJlcXVpcmUoXCJwdXNoXCIpO1xuaW1wb3J0IGZ4IGZyb20gXCJmeFwiO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbGFuZF9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgbGFuZF9ncm91cF9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBjZW50ZXJfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgZ29sZF9sYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIGV4X2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgbGV2ZWxfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBnb2xkX3Byb2dyZXNzX25vZGU6IGNjLlByb2dyZXNzQmFyLFxuICAgICAgICBleF9wcm9ncmVzc19ub2RlOiBjYy5Qcm9ncmVzc0JhcixcbiAgICAgICAgcGxheWVyX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBzdGFmZl9wcmVmYWJfYXJyOiBbY2MuUHJlZmFiXSxcbiAgICAgICAgd2FyZUhvdXNlX25vZGU6IGNjLk5vZGUsXG4gICAgICAgIG1haW5fY2FtZXJhOiBjYy5Ob2RlLFxuICAgICAgICB0aXBzX2dyb3VwX25vZGU6IGNjLk5vZGUsXG4gICAgICAgIGJ1dHRvbl9ncm91cF9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBob3RlbF9wcm9kdWNlX25vZGU6IGNjLk5vZGUsXG4gICAgICAgIHZpZGVvdGFwZV9idXR0b246IGNjLk5vZGUsXG4gICAgICAgIHZpZGVvdGFwZV9idXR0b25fYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgIH0sXG5cblxuICAgIC8v5rWH5rC05oyJ6ZKu6KKr54K55Ye7XG4gICAgb25fd2F0ZXJpbmdfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcIm1haW5fYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfYnV0dG9uX2dyb3VwKHRoaXMuY2VudGVyX25vZGUpO1xuICAgICAgICBub2RlLnpJbmRleCA9IDM7XG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiYnV0dG9uX21vcmVcIikuaW5pX25vZGUoXCJ3YXRlcmluZ1wiKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v6ICV5Zyw5oyJ6ZKu6KKr54K55Ye7XG4gICAgb25fdGlsbF9idXR0b25fY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwibWFpbl9idXR0b25fY2xpY2tcIik7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9idXR0b25fZ3JvdXAodGhpcy5jZW50ZXJfbm9kZSk7XG4gICAgICAgIG5vZGUuekluZGV4ID0gMztcbiAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJidXR0b25fbW9yZVwiKS5pbmlfbm9kZShcInRpbGxcIik7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+WtpuS5oOaMiemSruiiq+eCueWHu1xuICAgIG9uX3N0dWR5X2J1dHRvbl9jbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJtYWluX2J1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3N0dWR5X3VpKHRoaXMubm9kZSk7XG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic3R1ZHlfdWlcIikuaW5pX25vZGUoKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8vaG9tZSDooqvngrnlh7vml7ZcbiAgICBvbl9ob21lX2J1dHRvbl9jbGljaygpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX29wdGlvbl91aSgpO1xuICAgIH0sXG4gICAgLy/lrqDnianmjInpkq7ooqvngrnlh7tcbiAgICBvbl9wZXRfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcIm1haW5fYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0X3VpKHRoaXMubm9kZSk7XG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwicGV0X3VpXCIpLmluaV9ub2RlKCk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+aXhemmhuaMiemSruiiq+eCueWHu1xuICAgIG9uX2hvdGVsX2J1dHRvbl9jbGljaygpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2hvdGVsX3VpKCk7XG4gICAgfSxcbiAgICAvL+mbh+S9o+WRmOW3pVxuICAgIG9uX3N0YWZmX2J1dHRvbl9jbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJtYWluX2J1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3N0YWZmX3VpKHRoaXMubm9kZSk7XG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic3RhZmZfdWlcIikuaW5pX25vZGUoKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v55Sf5oiQ5Zyf5ZywXG4gICAgY3JlYXRlX2xhbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubGFuZF9wcmVmYWIpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLmxhbmRfZ3JvdXBfbm9kZTtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwibGFuZFwiKS5pbmlfbm9kZShpKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5Yib5bu6546p5a625bCP5Lq6XG4gICAgY3JlYXRlX3BsYXllcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyX3ByZWZhYik7XG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5jZW50ZXJfbm9kZTtcbiAgICB9LFxuICAgIC8v5Yib5bu65L2j5Lq6XG4gICAgY3JlYXRlX3N0YWZmOiBmdW5jdGlvbiAoc3RhZmZfaW5kZXgpIHtcbiAgICAgICAgaWYgKHN0YWZmX2luZGV4ID09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBhcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbaV0uaGF2ZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdGFmZl9wcmVmYWJfYXJyW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLmxhbmRfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzdGFmZl9haVwiKS5pbmlfbm9kZShpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3RhZmZfcHJlZmFiX2FycltzdGFmZl9pbmRleF0pO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLmxhbmRfZ3JvdXBfbm9kZS5jaGlsZHJlbltzdGFmZl9pbmRleF07XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInN0YWZmX2FpXCIpLmluaV9ub2RlKHN0YWZmX2luZGV4KTtcbiAgICAgICAgfTtcblxuICAgIH0sXG4gICAgLy/liLfmlrDph5HluIHmlbBcbiAgICBhZGRfZ29sZDogZnVuY3Rpb24gKG51bSkge1xuICAgICAgICBpZiAodGhpcy5hZGRfZ29sZF9hbmltID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuYWRkX2dvbGRfYW5pbSA9IDE7XG4gICAgICAgICAgICB2YXIgdGltZUNvdW50ID0gMTA7XG4gICAgICAgICAgICB2YXIgZ29sZCA9IHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZDtcbiAgICAgICAgICAgIHZhciBnb2xkX21heCA9IDUwMCAqIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJnb2xkX21heFwiXSArIDUwMDtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgUG51bSA9IHBhcnNlSW50KG51bSAvIHRpbWVDb3VudClcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQtLTtcbiAgICAgICAgICAgICAgICB0aGlzLmdvbGRfbGFiZWwuc3RyaW5nID0gZ29sZCArIFBudW0gKyBcIi9cIiArIGdvbGRfbWF4O1xuICAgICAgICAgICAgICAgIGlmICh0aW1lQ291bnQgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgKz0gbnVtO1xuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID4gZ29sZF9tYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcInVuX2NsaWNrXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZSwgXCJnb2xkX2Z1bGxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPSBnb2xkX21heDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdvbGRfbGFiZWwuc3RyaW5nID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkICsgXCIvXCIgKyBnb2xkX21heDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRfZ29sZF9wcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZF9nb2xkX2FuaW0gPSAwO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4wMyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgKz0gbnVtO1xuICAgICAgICB9O1xuXG4gICAgfSxcbiAgICAvL+WIt+aWsGV45pWwXG4gICAgYWRkX2V4OiBmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgIGlmICh0aGlzLmFkZF9leF9hbmltID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuYWRkX2V4X2FuaW0gPSAxO1xuICAgICAgICAgICAgdmFyIHRpbWVDb3VudCA9IDEwO1xuICAgICAgICAgICAgdmFyIGV4ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXg7XG4gICAgICAgICAgICB2YXIgbmV4dF9leCA9IDIgKiB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsO1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBQbnVtID0gcGFyc2VJbnQobnVtIC8gdGltZUNvdW50KVxuICAgICAgICAgICAgICAgIHRpbWVDb3VudC0tO1xuICAgICAgICAgICAgICAgIHRoaXMuZXhfbGFiZWwuc3RyaW5nID0gZXggKyBQbnVtICsgXCIvXCIgKyBuZXh0X2V4O1xuICAgICAgICAgICAgICAgIGlmICh0aW1lQ291bnQgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leCArPSBudW07XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leCA+IG5leHRfZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubm93X2V4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWwrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxfcG9pbnQrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldF9leF9wcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZF9leF9hbmltID0gMDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMDMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXggKz0gbnVtO1xuICAgICAgICB9O1xuXG4gICAgfSxcbiAgICBzZXRfZ29sZF9wcm9ncmVzczogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZ29sZCA9IHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZDtcbiAgICAgICAgdmFyIGdvbGRfbWF4ID0gNTAwICogdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImdvbGRfbWF4XCJdICsgNTAwO1xuICAgICAgICB0aGlzLmdvbGRfbGFiZWwuc3RyaW5nID0gZ29sZCArIFwiL1wiICsgZ29sZF9tYXg7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuZ29sZF9wcm9ncmVzc19ub2RlKVxuICAgICAgICAgICAgLnRvKDAuMywgeyBwcm9ncmVzczogZ29sZCAvIGdvbGRfbWF4IH0pXG4gICAgICAgICAgICAuc3RhcnQoKTtcbiAgICB9LFxuICAgIHNldF9leF9wcm9ncmVzczogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbm93X2V4ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXg7XG4gICAgICAgIHZhciBuZXh0X2V4ID0gMiAqIHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWw7XG4gICAgICAgIHRoaXMubGV2ZWxfbGFiZWwuc3RyaW5nID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbDtcbiAgICAgICAgdGhpcy5leF9sYWJlbC5zdHJpbmcgPSBub3dfZXggKyBcIi9cIiArIG5leHRfZXg7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuZXhfcHJvZ3Jlc3Nfbm9kZSlcbiAgICAgICAgICAgIC50bygwLjMsIHsgcHJvZ3Jlc3M6IG5vd19leCAvIG5leHRfZXggfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH0sXG4gICAgLy/ku5PlupPooqvngrnlh7tcbiAgICBvbl93YXJlSG91c2VfY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfc2VsbF91aSh0aGlzLm5vZGUpO1xuICAgICAgICBpZiAobm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInNlbGxfdWlcIikuaW5pX25vZGUoKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5LuT5bqT5bey5ruhXG4gICAgd2FyZUhvdXNlX2Z1bGw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy9cbiAgICAgICAgdGhpcy53YXJlSG91c2Vfc2hjZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2UpO1xuICAgICAgICAgICAgdmFyIGFsbF9jYXBhY2l0eSA9IHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlX2xldmVsICogY29uZmlnLndhcmVIb3VzZVtcImFsbF9jYXBhY2l0eVwiXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmNvdW50ID49IGFsbF9jYXBhY2l0eSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhcmVIb3VzZV9ub2RlLmdldENoaWxkQnlOYW1lKFwid2FyZUhvdXNlX2Z1bGxcIikuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FyZUhvdXNlX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ3YXJlSG91c2VfZnVsbFwiKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLndhcmVIb3VzZV9zaGNlZHVsZSwgMC41KTtcbiAgICB9LFxuICAgIC8v5p6c5Zut6KKr54K55Ye7XG4gICAgb25fb3JjaGFyZF9idXR0b25fY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfYmdfc291bmQoXCJ2aWxsYWdlX2JnXCIpO1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJ1bl9jbGlja1wiKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZSwgXCJ1bl9kZXZlbG9wXCIpO1xuICAgIH0sXG4gICAgLy/oh6rliqjlrZjmoaNcbiAgICBhdXRvX3NhdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZnguc2F2ZSgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAxMCwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xuICAgIH0sXG4gICAgLy/liLfmlrDlnJ/lnLBcbiAgICB1cGRhdGFfbGFuZDogZnVuY3Rpb24gKGxhbmRfaW5kZXgpIHtcbiAgICAgICAgLy/liJ3lp4vljJblnJ/lnLDnirbmgIFcbiAgICAgICAgdGhpcy5sYW5kX2dyb3VwX25vZGUuY2hpbGRyZW5bbGFuZF9pbmRleF0uZ2V0Q29tcG9uZW50KFwibGFuZFwiKS5pbmlfbm9kZShsYW5kX2luZGV4KTtcbiAgICB9LFxuICAgIC8v6K6w5b2V5LiK57q/5pe26Ze0XG4gICAgc2F2ZV9sb2dpbl90aW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxvZ2luX3RpbWUgPT0gMCkge1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sb2dpbl90aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+WIm+W7uuemu+e6v+aUtuebinVpXG4gICAgb2ZmbGluZV9wcm9maXRfdWk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxvZ2luX3RpbWUgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxvZ2luX3RpbWU7XG4gICAgICAgIHZhciBub3dfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB2YXIgbWluID0gTWF0aC5mbG9vcigobm93X3RpbWUgLSBsb2dpbl90aW1lKSAvICgxMDAwICogNjApKTtcbiAgICAgICAgaWYgKG1pbiA+PSA1KSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX29mZmxpbmVfcHJvZml0X3VpKHRoaXMubm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+S6kuaOqOaMiemSruiiq+eCueWHu1xuICAgIC8vIG9uX3B1c2hfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoZSwgbmFtZSkge1xuICAgIC8vICAgICBpZiAodHlwZW9mICh3eCkgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAvLyAgICAgICAgIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XG4gICAgLy8gICAgICAgICAgICAgYXBwSWQ6IHB1c2hbbmFtZV0uYXBwaWQsXG4gICAgLy8gICAgICAgICAgICAgcGF0aDogJycsXG4gICAgLy8gICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8g5omT5byA5oiQ5YqfXG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgfSlcbiAgICAvLyAgICAgfTtcbiAgICAvLyB9LFxuICAgIC8v5ZWG5bqX5oyJ6ZKu6KKr54K55Ye7XG4gICAgb25fc2hvcF9idXR0b25fY2xpY2soKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9zaG9wX3VpKCk7XG4gICAgfSxcbiAgICAvL+WIm+W7uuaWsOaJi+W8leWvvFxuICAgIGNyZWF0ZV9ub3ZpY2UoKSB7XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLm5vdmljZSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX25vdmljZV91aSgpO1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3ZpY2UgPSAxO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/liJvlu7rmjInpkq7mj5DnpLpcbiAgICBjcmVhdGVfYnV0dG9uX3RpcHMoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5idXR0b25fZ3JvdXBfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9idXR0b25fdGlwcyh0aGlzLnRpcHNfZ3JvdXBfbm9kZSwgdGhpcy5idXR0b25fZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5wb3NpdGlvbik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3R1ZHlfdWlfdGlwcygpO1xuICAgICAgICB0aGlzLnN0YWZmX3VpX3RpcHMoKTtcbiAgICAgICAgdGhpcy5zaG9wX3VpX3RpcHMoKTtcbiAgICB9LFxuICAgIC8v6LSt5Lmw5ZWG5ZOB5o+Q56S6XG4gICAgc2hvcF91aV90aXBzKCkge1xuICAgICAgICB0aGlzLnNob3BfdWlfY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbGFuZF9hcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmQpXG4gICAgICAgICAgICB2YXIgcGxhbnRfYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5wbGFudClcbiAgICAgICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xuICAgICAgICAgICAgdmFyIGxldmVsID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFuZF9hcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZ29sZCA+PSBjb25maWcubGFuZFtpXS5jb3N0ICYmIGxldmVsID49IGNvbmZpZy5sYW5kW2ldLm5lZWRfbGV2ZWwgJiYgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW2ldLmhhdmUgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aXBzX2dyb3VwX25vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBsYW50X2Fyci5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChnb2xkID49IGNvbmZpZy5wbGFudFtqXS5jb3N0ICYmIGxldmVsID49IGNvbmZpZy5wbGFudFtqXS5uZWVkX2xldmVsICYmIHVzZXJfZGF0YS51c2VyX2RhdGEucGxhbnRbal0uaGF2ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnNob3BfdWlfY2FsbGJhY2ssIDEpO1xuICAgIH0sXG4gICAgLy/liqDngrnmj5DnpLpcbiAgICBzdHVkeV91aV90aXBzKCkge1xuICAgICAgICB0aGlzLnN0ZHV5X3RpcHNfY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2tpbGxfcG9pbnQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsX3BvaW50O1xuICAgICAgICAgICAgaWYgKHNraWxsX3BvaW50ID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8v5oqA6IO954K55LiN6Laz5LiN5o+Q56S6XG4gICAgICAgICAgICAgICAgdGhpcy50aXBzX2dyb3VwX25vZGUuY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuc3RkdXlfdGlwc19jYWxsYmFjaywgMSwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xuICAgIH0sXG4gICAgLy/pm4fkvaPlt6Xkurrmj5DnpLpcbiAgICBzdGFmZl91aV90aXBzKCkge1xuICAgICAgICB0aGlzLnN0YWZmX3RpcHNfY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZik7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIC8v5oul5pyJ6L+Z5Z2X5Zyf5ZywXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFtpXS5oYXZlID09IDEgJiYgdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID49IGNvbmZpZy5zdGFmZltpXS5jb3N0ICYmIHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbaV0uaGF2ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzNdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblszXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnN0YWZmX3RpcHNfY2FsbGJhY2ssIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8v5Yib5bu65a6g54mpXG4gICAgY3JlYXRlX3BldCgpIHtcbiAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEucGV0KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFtpXS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLmNlbnRlcl9ub2RlLCBpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+WNleS4quWIm+W7uuWuoOeJqVxuICAgIGNyZWF0ZV9wZXRfYShpbmRleCkge1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLmNlbnRlcl9ub2RlLCBpbmRleCk7XG4gICAgfSxcblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIC8v6aKG5Y+W5pS255uKXG4gICAgb25fZ2V0X2hvdGVsX3Byb2R1Y2VfY2xpY2soZSkge1xuICAgICAgICB2YXIgbm9kZSA9IGUudGFyZ2V0O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9nb2xkX2VmZmVjdChub2RlLCBpLCAwKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hZGRfZ29sZCh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQpO1xuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQgPSAwO1xuICAgIH0sXG4gICAgLy/liLfmlrDml4XppobmlLbnm4pcbiAgICB1cGRhdGVfaG90ZWxfcHJvZHVjZSgpIHtcbiAgICAgICAgLy8xc+abtOaWsOS4gOasoeaVsOaNrlxuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaG90ZWxfY2FjaGVfZ29sZCA9IHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxfY2FjaGVfZ29sZDtcbiAgICAgICAgICAgIGlmIChob3RlbF9jYWNoZV9nb2xkID09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGVsX3Byb2R1Y2Vfbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF9wcm9kdWNlX25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgbGFiZWwgPSB0aGlzLmhvdGVsX3Byb2R1Y2Vfbm9kZS5nZXRDaGlsZEJ5TmFtZShcImhvdGVsX3Byb2R1Y2VfbGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IGhvdGVsX2NhY2hlX2dvbGQ7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8v6LSt5Lmw5LiA5Liq5oi/6Ze0XG4gICAgaG90ZWxfYnV5X3Jvb20ocm9vbV9pbmRleCkge1xuICAgICAgICBzd2l0Y2ggKHJvb21faW5kZXgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGVsXzAoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGVsXzEoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGVsXzIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGVsXzMoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5Yid5aeL5YyW5peF6aaG5Lqn5Ye6XG4gICAgaW5pX2hvdGVsX3Byb2R1Y2UoKSB7XG5cbiAgICAgICAgLy/lkK/liqjliLfmlrDmlLbnm4pcbiAgICAgICAgdGhpcy51cGRhdGVfaG90ZWxfcHJvZHVjZSgpO1xuXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsWzBdLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5ob3RlbF8wKCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsWzFdLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5ob3RlbF8xKCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsWzJdLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5ob3RlbF8yKCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsWzNdLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5ob3RlbF8zKCk7XG4gICAgICAgIH07XG5cbiAgICB9LFxuICAgIC8vaG90ZWwwIOeUn+aIkFxuICAgIGhvdGVsXzAoKSB7XG4gICAgICAgIHZhciB0aW1lQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmhvdGVsXzBfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aW1lQ291bnQrKztcbiAgICAgICAgICAgIGlmICh0aW1lQ291bnQgPj0gY29uZmlnLmhvdGVsWzBdLnByb2R1Y2VfdGltZSkge1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxfY2FjaGVfZ29sZCArPSBjb25maWcuaG90ZWxbMF0ucHJvZHVjZTtcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQgPSAwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhvdGVsXzBfc2NoZWR1bGUsIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8vaG90ZWwxIOeUn+aIkFxuICAgIGhvdGVsXzEoKSB7XG4gICAgICAgIHZhciB0aW1lQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmhvdGVsXzFfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aW1lQ291bnQrKztcbiAgICAgICAgICAgIGlmICh0aW1lQ291bnQgPj0gY29uZmlnLmhvdGVsWzFdLnByb2R1Y2VfdGltZSkge1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxfY2FjaGVfZ29sZCArPSBjb25maWcuaG90ZWxbMV0ucHJvZHVjZTtcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQgPSAwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhvdGVsXzFfc2NoZWR1bGUsIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8vaG90ZWwyIOeUn+aIkFxuICAgIGhvdGVsXzIoKSB7XG4gICAgICAgIHZhciB0aW1lQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmhvdGVsXzJfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aW1lQ291bnQrKztcbiAgICAgICAgICAgIGlmICh0aW1lQ291bnQgPj0gY29uZmlnLmhvdGVsWzJdLnByb2R1Y2VfdGltZSkge1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxfY2FjaGVfZ29sZCArPSBjb25maWcuaG90ZWxbMl0ucHJvZHVjZTtcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQgPSAwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhvdGVsXzJfc2NoZWR1bGUsIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8vaG90ZWwzIOeUn+aIkFxuICAgIGhvdGVsXzMoKSB7XG4gICAgICAgIHZhciB0aW1lQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmhvdGVsXzNfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aW1lQ291bnQrKztcbiAgICAgICAgICAgIGlmICh0aW1lQ291bnQgPj0gY29uZmlnLmhvdGVsWzNdLnByb2R1Y2VfdGltZSkge1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxfY2FjaGVfZ29sZCArPSBjb25maWcuaG90ZWxbM10ucHJvZHVjZTtcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQgPSAwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhvdGVsXzNfc2NoZWR1bGUsIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvL+WIpOaWreW9k+WJjeaXpeacn1xuICAgIGp1ZGdlX2RhdGUoKSB7XG4gICAgICAgIHZhciBub3dfZGF0ZSA9IG5ldyBEYXRlKCkuZ2V0RGF0ZSgpO1xuICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5wZXQpO1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgPT0gMCkge1xuICAgICAgICAgICAgLy/mlrDlrZjmoaPorrDlvZXml6XmnJ9cbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2F2ZV9kYXRlID0gbm93X2RhdGU7XG4gICAgICAgIH0gZWxzZSBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgIT0gbm93X2RhdGUpIHtcbiAgICAgICAgICAgIC8v5pel5pyf5LiN55u45ZCM77yM6buY6K6k56ys5LqM5aSp5Y+K5Lul5ZCOLOmHjee9ruWIhuS6q+asoeaVsFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbaV0uc2hhcmVfY291bnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFtpXS5zaGFyZV9jb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZXJfZGF0YS51c2VyX2RhdGEudmlkZW90YXBlX3NoYXJlX2NvdW50ID0gMDtcblxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgPSBub3dfZGF0ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8v5pel5pyf5Li65ZCM5LiA5aSpXG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAvL+WIneWni+WMluW9leWxj+WKn+iDvVxuICAgIGluaV92aWRlb3RhcGUoKSB7XG4gICAgICAgIC8v5b2V5bGP55qE5L+d5a2Y6Lev5b6EXG4gICAgICAgIHRoaXMudmlkZW90YXBlX3BhdGggPSBudWxsO1xuICAgICAgICB0aGlzLnZpZGVvdGFwZV9zdGFydF90aW1lID0gMDtcbiAgICAgICAgdGhpcy52aWRlb3RhcGVfc3RhdGUgPSBcInVuc3RhcnRcIjtcbiAgICB9LFxuICAgIG9uX3ZpZGVvdGFwZV9idXR0b25fY2xpY2soKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgaWYgKHRoaXMudmlkZW90YXBlX3N0YXRlID09IFwidW5zdGFydFwiKSB7XG4gICAgICAgICAgICAvL+acquW8gOWni+i/m+WFpeWlluWKseeVjOmdolxuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV92aWRlb3RhcGVfdWkoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZpZGVvdGFwZV9zdGF0ZSA9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgICAgIC8v5byA5aeL5ZCO5aSn5LqOM+enkuaJjeiDveWFs+mXrVxuICAgICAgICAgICAgdmFyIG5vd190aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICB2YXIgdmlkZW90YXBlX3RpbWUgPSBub3dfdGltZSAtIHRoaXMudmlkZW90YXBlX3N0YXJ0X3RpbWU7XG4gICAgICAgICAgICBpZiAodmlkZW90YXBlX3RpbWUgPCAzMDAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZSwgXCJ2aWRlb3RhcGVfbm9fdGltZVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wX3ZpZGVvdGFwZSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5byA5aeL5ri45oiP5b2V5bGPXG4gICAgc3RhcnRfdmlkZW90YXBlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8v6K6w5b2V5LiA5Liq5pe26Ze05oizXG4gICAgICAgIHRoaXMudmlkZW90YXBlX3N0YXJ0X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9IFwidW5kZWZpbmVkXCIpIHtcblxuICAgICAgICAgICAgdGhpcy52aWRlb3RhcGVfc3RhdGUgPSBcInN0YXJ0XCI7XG4gICAgICAgICAgICB0aGlzLnZpZGVvdGFwZV90aW1lQ29udHJvbCgpO1xuICAgICAgICAgICAgLy/liIfmjaLlvZXlsY/mjInpkq7lm77moIdcbiAgICAgICAgICAgIHRoaXMudmlkZW90YXBlX2J1dHRvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMudmlkZW90YXBlX2J1dHRvbl9hcnJbMV07XG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5ub2RlLCBcInZpZGVvdGFwZV9zdGFydFwiKTtcblxuICAgICAgICAgICAgdGhpcy5yZWNvcmRlciA9IHd4LmdldEdhbWVSZWNvcmRlck1hbmFnZXIoKTtcbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIub25TdGFydChyZXMgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5b2V5bGP5byA5aeLXCIpO1xuICAgICAgICAgICAgICAgIC8vIGRvIHNvbWV0aGluZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5yZWNvcmRlci5zdGFydCh7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDYwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgIH0sXG4gICAgLy/nu5PmnZ/muLjmiI/lvZXlsY9cbiAgICBzdG9wX3ZpZGVvdGFwZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy52aWRlb3RhcGVfc3RhdGUgPSBcInVuc3RhcnRcIjtcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLm5vZGUsIFwidmlkb3RhcGVfb3ZlclwiKTtcbiAgICAgICAgICAgIHRoaXMudmlkZW90YXBlX2J1dHRvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMudmlkZW90YXBlX2J1dHRvbl9hcnJbMF07XG5cbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIub25TdG9wKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLnZpZGVvUGF0aCwgXCLlvZXlsY/nu5PmnZ9cIik7XG4gICAgICAgICAgICAgICAgLy8gZG8gc29tZXRoaW5lO1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW90YXBlX3BhdGggPSByZXMudmlkZW9QYXRoO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdmlkZW90YXBlX3VpKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIuc3RvcCgpO1xuXG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+W9leWxj+aXtumXtOaOp+WItlxuICAgIHZpZGVvdGFwZV90aW1lQ29udHJvbCgpIHtcbiAgICAgICAgdmFyIHRpbWVfY291bnQgPSAwO1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aW1lX2NvdW50Kys7XG4gICAgICAgICAgICAvL+i2hei/h+S6huacgOWkp+aXtumVv+aIluiAheW9leWItueKtuaAgeS4uuacquW8gOWQr1xuICAgICAgICAgICAgaWYgKHRpbWVfY291bnQgPj0gNjAgfHwgdGhpcy52aWRlb3RhcGVfc3RhdGUgPT0gXCJ1bnN0YXJ0XCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIHRpbWVfY291bnQgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcF92aWRlb3RhcGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5ub2RlLCBcInZpZG90YXBlX292ZXJcIik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XG4gICAgfSxcblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIC8v5Yid5aeL5YyW6IqC54K5XG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZngubG9hZCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZV9sYW5kKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlX3BldCgpO1xuICAgICAgICB0aGlzLmFkZF9nb2xkX2FuaW0gPSAwO1xuICAgICAgICB0aGlzLmFkZF9leF9hbmltID0gMDtcbiAgICAgICAgLy/osIPnlKjnorDmkp7mo4DmtYvnu4Tku7ZcbiAgICAgICAgdGhpcy5tYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpO1xuICAgICAgICAvL+m7mOiupOeisOaSnuS4uuWFs1xuICAgICAgICB0aGlzLm1hbmFnZXIuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2V0X2dvbGRfcHJvZ3Jlc3MoKTtcbiAgICAgICAgdGhpcy5zZXRfZXhfcHJvZ3Jlc3MoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVfcGxheWVyKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlX3N0YWZmKCk7XG4gICAgICAgIHRoaXMuYXV0b19zYXZlKCk7XG4gICAgICAgIHRoaXMuc2F2ZV9sb2dpbl90aW1lKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlX2J1dHRvbl90aXBzKCk7XG4gICAgICAgIHRoaXMub2ZmbGluZV9wcm9maXRfdWkoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVfbm92aWNlKCk7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X2JnX3NvdW5kKFwiaG9tZV9iZ1wiKTtcbiAgICAgICAgdGhpcy5pbmlfaG90ZWxfcHJvZHVjZSgpO1xuICAgICAgICB0aGlzLmp1ZGdlX2RhdGUoKTtcbiAgICAgICAgdGhpcy53YXJlSG91c2VfZnVsbCgpO1xuICAgICAgICB0aGlzLmluaV92aWRlb3RhcGUoKTtcbiAgICB9LFxuXG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgb25fdGVzdF9idXR0b25fY2xpY2soZSwgY3VzdG9tKSB7XG4gICAgICAgIHN3aXRjaCAoY3VzdG9tKSB7XG4gICAgICAgICAgICBjYXNlIFwiMFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkX2dvbGQodXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbC5nb2xkX21heCAqIDUwMCArIDUwMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiMVwiOlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkX2V4KDIgKiB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsICsgMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiMlwiOlxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFswXS5oYXZlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMF0uaGF2ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMubm9kZSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFsxXS5oYXZlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMV0uaGF2ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMubm9kZSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFsyXS5oYXZlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMl0uaGF2ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMubm9kZSwgMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFszXS5oYXZlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbM10uaGF2ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMubm9kZSwgMyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMubm9kZSwgMCk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9wZXQodGhpcy5ub2RlLCAxKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImhhdmUgcGV0IFwiICsgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMF0uaGF2ZSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJoYXZlIHBldCBcIiArIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzFdLmhhdmUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIjNcIjpcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFsyXS5oYXZlID0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCI0XCI6XG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMl0uaGF2ZSA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5pbmlfbm9kZSgpO1xuICAgIH0sXG5cbiAgICBzdGFydCgpIHtcblxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19