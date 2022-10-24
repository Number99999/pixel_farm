"use strict";
cc._RF.push(module, 'e6dc0dAPTpJI6mvKxmIq3jL', 'sound_control');
// script/control/sound_control.js

"use strict";

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    home_bg_sound: {
      type: cc.AudioClip,
      "default": null
    },
    village_bg: {
      type: cc.AudioClip,
      "default": null
    },
    button_click: {
      type: cc.AudioClip,
      "default": null
    },
    main_button_click: {
      type: cc.AudioClip,
      "default": null
    },
    un_click: {
      type: cc.AudioClip,
      "default": null
    },
    level_up: {
      type: cc.AudioClip,
      "default": null
    },
    add_ex: {
      type: cc.AudioClip,
      "default": null
    },
    add_gold: {
      type: cc.AudioClip,
      "default": null
    },
    button_exit: {
      type: cc.AudioClip,
      "default": null
    },
    cut_over: {
      type: cc.AudioClip,
      "default": null
    }
  },
  // LIFE-CYCLE CALLBACKS:
  //播放背景音乐
  play_bg_sound: function play_bg_sound(name) {
    var sound_state = user_data.user_data.sound_state;

    if (sound_state == 0) {
      cc.audioEngine.pauseMusic();
      return;
    } else {
      this.stop_bg_sound();

      switch (name) {
        case "home_bg":
          cc.audioEngine.playMusic(this.home_bg_sound, true, 1);
          break;

        case "village_bg":
          cc.audioEngine.playMusic(this.village_bg, true, 1);
          break;
      }

      ;
    }

    ;
  },
  //停止所有的背景音乐
  stop_bg_sound: function stop_bg_sound() {
    cc.audioEngine.stopMusic();
  },
  //停止所有音效
  stop_allEffects: function stop_allEffects() {
    cc.audioEngine.stopAllEffects();
  },
  //暂停所有声音
  pause_all_sound: function pause_all_sound() {
    cc.audioEngine.pauseAllEffects();
    cc.audioEngine.pauseMusic();
  },
  //恢复播放暂停
  resume_all_sound: function resume_all_sound() {
    var sound_state = user_data.user_data.sound_state;

    if (sound_state == 0) {
      return;
    } else {
      cc.audioEngine.resumeMusic();
      cc.audioEngine.resumeAllEffects();
    }

    ;
  },
  //--------------------------------------------------------
  //--------------------------------------------------------
  //播放音效
  play_sound_effect: function play_sound_effect(name) {
    var sound_state = user_data.user_data.sound_state;

    if (sound_state == 0) {
      cc.audioEngine.pauseAllEffects();
      return;
    } else {
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
          break;
      }

      ;
    }

    ;
  },
  ini_node: function ini_node() {
    cc.audioEngine.setMusicVolume(0.3);
    cc.audioEngine.setEffectsVolume(0.4);
  },
  onLoad: function onLoad() {},
  start: function start() {} // update (dt) {},

});

cc._RF.pop();