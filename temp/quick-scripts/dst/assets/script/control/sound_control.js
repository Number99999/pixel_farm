
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/control/sound_control.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxjb250cm9sXFxzb3VuZF9jb250cm9sLmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImhvbWVfYmdfc291bmQiLCJ0eXBlIiwiQXVkaW9DbGlwIiwidmlsbGFnZV9iZyIsImJ1dHRvbl9jbGljayIsIm1haW5fYnV0dG9uX2NsaWNrIiwidW5fY2xpY2siLCJsZXZlbF91cCIsImFkZF9leCIsImFkZF9nb2xkIiwiYnV0dG9uX2V4aXQiLCJjdXRfb3ZlciIsInBsYXlfYmdfc291bmQiLCJuYW1lIiwic291bmRfc3RhdGUiLCJhdWRpb0VuZ2luZSIsInBhdXNlTXVzaWMiLCJzdG9wX2JnX3NvdW5kIiwicGxheU11c2ljIiwic3RvcE11c2ljIiwic3RvcF9hbGxFZmZlY3RzIiwic3RvcEFsbEVmZmVjdHMiLCJwYXVzZV9hbGxfc291bmQiLCJwYXVzZUFsbEVmZmVjdHMiLCJyZXN1bWVfYWxsX3NvdW5kIiwicmVzdW1lTXVzaWMiLCJyZXN1bWVBbGxFZmZlY3RzIiwicGxheV9zb3VuZF9lZmZlY3QiLCJwbGF5RWZmZWN0IiwiaW5pX25vZGUiLCJzZXRNdXNpY1ZvbHVtZSIsInNldEVmZmVjdHNWb2x1bWUiLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsYUFBYSxFQUFFO0FBQ1hDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxTQURFO0FBRVgsaUJBQVM7QUFGRSxLQURQO0FBS1JDLElBQUFBLFVBQVUsRUFBRTtBQUNSRixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ00s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SWIsVUFBQUEsRUFBRSxDQUFDbUIsV0FBSCxDQUFlYSxVQUFmLENBQTBCLEtBQUtqQixRQUEvQixFQUF5QyxLQUF6QyxFQUFnRCxDQUFoRDtBQUNBO0FBeEJSOztBQTBCQztBQUNKOztBQUFBO0FBQ0osR0FuSUk7QUFvSUxrQixFQUFBQSxRQUFRLEVBQUUsb0JBQVk7QUFDbEJqQyxJQUFBQSxFQUFFLENBQUNtQixXQUFILENBQWVlLGNBQWYsQ0FBOEIsR0FBOUI7QUFDQWxDLElBQUFBLEVBQUUsQ0FBQ21CLFdBQUgsQ0FBZWdCLGdCQUFmLENBQWdDLEdBQWhDO0FBQ0gsR0F2SUk7QUF3SUxDLEVBQUFBLE1BeElLLG9CQXdJSSxDQUVSLENBMUlJO0FBNElMQyxFQUFBQSxLQTVJSyxtQkE0SUcsQ0FDUCxDQTdJSSxDQStJTDs7QUEvSUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzZXJfZGF0YSA9IHJlcXVpcmUoXCJ1c2VyX2RhdGFcIik7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgaG9tZV9iZ19zb3VuZDoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB2aWxsYWdlX2JnOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ1dHRvbl9jbGljazoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtYWluX2J1dHRvbl9jbGljazoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB1bl9jbGljazoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsZXZlbF91cDoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGRfZXg6IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkX2dvbGQ6IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnV0dG9uX2V4aXQ6IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3V0X292ZXI6IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG4gICAgLy/mkq3mlL7og4zmma/pn7PkuZBcclxuICAgIHBsYXlfYmdfc291bmQ6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdmFyIHNvdW5kX3N0YXRlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5zb3VuZF9zdGF0ZTtcclxuICAgICAgICBpZiAoc291bmRfc3RhdGUgPT0gMCkge1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZU11c2ljKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BfYmdfc291bmQoKTtcclxuICAgICAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiaG9tZV9iZ1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLmhvbWVfYmdfc291bmQsIHRydWUsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInZpbGxhZ2VfYmdcIjpcclxuICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy52aWxsYWdlX2JnLCB0cnVlLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/lgZzmraLmiYDmnInnmoTog4zmma/pn7PkuZBcclxuICAgIHN0b3BfYmdfc291bmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wTXVzaWMoKTtcclxuICAgIH0sXHJcbiAgICAvL+WBnOatouaJgOaciemfs+aViFxyXG4gICAgc3RvcF9hbGxFZmZlY3RzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbEVmZmVjdHMoKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8v5pqC5YGc5omA5pyJ5aOw6Z+zXHJcbiAgICBwYXVzZV9hbGxfc291bmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZUFsbEVmZmVjdHMoKTtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZU11c2ljKCk7XHJcbiAgICB9LFxyXG4gICAgLy/mgaLlpI3mkq3mlL7mmoLlgZxcclxuICAgIHJlc3VtZV9hbGxfc291bmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc291bmRfc3RhdGUgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNvdW5kX3N0YXRlO1xyXG4gICAgICAgIGlmIChzb3VuZF9zdGF0ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZU11c2ljKCk7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZUFsbEVmZmVjdHMoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy/mkq3mlL7pn7PmlYhcclxuICAgIHBsYXlfc291bmRfZWZmZWN0OiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHZhciBzb3VuZF9zdGF0ZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEuc291bmRfc3RhdGU7XHJcbiAgICAgICAgaWYgKHNvdW5kX3N0YXRlID09IDApIHtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2VBbGxFZmZlY3RzKCk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImJ1dHRvbl9jbGlja1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5idXR0b25fY2xpY2ssIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJtYWluX2J1dHRvbl9jbGlja1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5tYWluX2J1dHRvbl9jbGljaywgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImJ1dHRvbl9leGl0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmJ1dHRvbl9leGl0LCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwidW5fY2xpY2tcIjpcclxuICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMudW5fY2xpY2ssIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJsZXZlbF91cFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5sZXZlbF91cCwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImFkZF9leFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5hZGRfZXgsIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJhZGRfZ29sZFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5hZGRfZ29sZCwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImN1dF9vdmVyXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmN1dF9vdmVyLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRNdXNpY1ZvbHVtZSgwLjMpO1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldEVmZmVjdHNWb2x1bWUoMC40KTtcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=