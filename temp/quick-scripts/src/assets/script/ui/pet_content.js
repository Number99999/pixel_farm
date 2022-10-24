"use strict";
cc._RF.push(module, '18de8zrDEZL84roo614WUE/', 'pet_content');
// script/ui/pet_content.js

"use strict";

var config = require("config");

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    name_label: cc.Label,
    introduce_label: cc.Label,
    skill_introduce_label: cc.Label,
    progress: cc.ProgressBar,
    cultrue_button_node: cc.Node,
    button_frame_arr: [cc.SpriteFrame],
    pet_icon_arr: [cc.SpriteFrame],
    pet_sprite: cc.Sprite,
    share_label: cc.Node,
    button_buy: cc.Node,
    label_cost: cc.Label
  },
  // LIFE-CYCLE CALLBACKS:
  //初始化节点
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
    this.label_cost.string = config.pet[this.index].cost; // else this.icon.getComponent(cc.Sprite).SpriteFrame = icon_arr[1];
    // this.progress.progress = user_data.user_data.pet[this.index].have_ad / config.pet[this.index].need_ad;

    if (user_data.user_data.pet[this.index].have == 1) this.button_buy.active = false;
  },
  //培养按钮被点击
  on_cultrue_button_click: function on_cultrue_button_click() {
    this.sound_control.play_sound_effect("button_click"); // if (config.pet[this.index].get_type == "ad"){
    //     this.ad_control.show_videoAd("cultrue_pet");
    //     this.video_succes();
    // } else {
    //分享获取

    var share_count = user_data.user_data.pet[this.index].share_count;
    var share_max = config.pet[this.index].share_max; // if (share_count < share_max) {
    //正常分享

    this.ad_control.manual_share("pet");
    this.share_succes(); // } else {
    //     //次数已满
    //     this.game_scene_js.create_tips_ui(this.game_rules_js.node, "share_max");
    // };
    // };
  },
  //检测视频是否播放成功
  video_succes: function video_succes() {
    if (typeof wx != "undefined") {
      var callback = function callback() {
        if (this.ad_control.video_state == 1 && this.ad_control.video_tag == "cultrue_pet") {
          this.ad_control.video_tag = null;
          this.ad_control.video_state = 2;
          user_data.user_data.pet[this.index].have_ad++;

          if (user_data.user_data.pet[this.index].have_ad >= config.pet[this.index].need_ad) {
            user_data.user_data.pet[this.index].have = 1;
            this.game_rules_js.create_pet_a(this.index);
            this.game_scene_js.create_tips_ui(this.game_rules_js.node, "cultrue_succes");
          }

          ;
          this.update_content();
          this.game_scene_js.create_tips_ui(this.game_scene_js.node, "cultrue_pet_succes");
          this.unschedule(callback);
        } else {
          if (this.ad_control.video_tag == null && this.ad_control.video_state == 2) {
            this.unschedule(callback);
          }

          ;
        }

        ;
      };

      this.schedule(callback, 0.1);
    }

    ;
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
        break;

      case "diamond": // chưa có diamond trong config 
      // if (user_data.user_data.diamond >= config.pet[this.index].cost) {
      //     user_data.user_data.diamond -= config.pet[this.index].cost;
      //     user_data.user_data.pet[this.index].have = 1;
      //     this.game_scene_js.create_pet(this.game_scene_js.node, this.index);
      //     this.button_buy.active = false;
      // }
      // else this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money");
      // this.update_content();
      // break;

    }
  },
  //分享检测
  share_succes: function share_succes() {
    var share_schedule = function share_schedule() {
      if (this.ad_control.share_state == "share_succes" && this.ad_control.share_tag == "pet") {
        this.ad_control.ini_share(); //宠物生成的时间

        var now_time = new Date().getTime();

        if ((now_time - user_data.user_data.pet[this.index].create_time) * 1000 >= config.pet[this.index].stay_time) {
          //宠物不存在
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

        ;
      } else {
        //未分享停止检测
        if (this.ad_control.share_state == "un_share" && this.ad_control.share_tag == null) {
          this.unschedule(share_schedule);
        }

        ;
      }

      ;
    };

    this.schedule(share_schedule, 0.2);
  },
  //onLoad() { },
  start: function start() {
    this.update_content();
  } // update (dt) {},

});

cc._RF.pop();