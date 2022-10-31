
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/tips_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '15751deW4pCXaxc+NoBZAzf', 'tips_ui');
// script/ui/tips_ui.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    label: cc.Label,
    floor_node: cc.Node,
    icon_frame: cc.Sprite,
    icon_frame_arr: [cc.SpriteFrame]
  },
  ini_node: function ini_node(type, num) {
    // this.label.node.active = true;
    // this.icon_frame.node.active = true;
    // this.floor_node.width = 0;
    // this.floor_node.height = 60;
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

      case "cant_unlock_repo":
        this.label.string = "Can't unlock this repository yet";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "no_video_today":
        this.label.string = "Out of video view";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;
    }

    ;
    this.end_anim();
  },
  // ini_anim: function () {
  //     cc.tween(this.floor_node)
  //         .to(0.2, { y: 100 }, { easing: "sineOut" })
  //         .call(() => {
  //             this.label.node.active = true;
  //             this.icon_frame.node.active = true;
  //             var callback = function () {
  //                 this.end_anim();
  //             };
  //             this.scheduleOnce(callback, 1.5);
  //         })
  //         .start();
  // },
  end_anim: function end_anim() {
    var _this = this;

    cc.tween(this.floor_node).delay(1).to(0.3, {
      y: this.floor_node.y + 150,
      opacity: 0
    }, {
      easing: "sineOut"
    }).call(function () {
      _this.game_scene_js.on_node_kill(_this.node);
    }).start();
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcdGlwc191aS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImxhYmVsIiwiTGFiZWwiLCJmbG9vcl9ub2RlIiwiTm9kZSIsImljb25fZnJhbWUiLCJTcHJpdGUiLCJpY29uX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwiaW5pX25vZGUiLCJ0eXBlIiwibnVtIiwieSIsIm9wYWNpdHkiLCJzdHJpbmciLCJzcHJpdGVGcmFtZSIsImVuZF9hbmltIiwidHdlZW4iLCJkZWxheSIsInRvIiwiZWFzaW5nIiwiY2FsbCIsImdhbWVfc2NlbmVfanMiLCJvbl9ub2RlX2tpbGwiLCJub2RlIiwic3RhcnQiLCJvbkxvYWQiLCJmaW5kIiwiZ2V0Q29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFFSixFQUFFLENBQUNLLEtBREY7QUFFUkMsSUFBQUEsVUFBVSxFQUFFTixFQUFFLENBQUNPLElBRlA7QUFHUkMsSUFBQUEsVUFBVSxFQUFFUixFQUFFLENBQUNTLE1BSFA7QUFJUkMsSUFBQUEsY0FBYyxFQUFFLENBQUNWLEVBQUUsQ0FBQ1csV0FBSjtBQUpSLEdBSFA7QUFTTEMsRUFBQUEsUUFBUSxFQUFFLGtCQUFVQyxJQUFWLEVBQWdCQyxHQUFoQixFQUFxQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQUtSLFVBQUwsQ0FBZ0JTLENBQWhCLEdBQW9CLEdBQXBCO0FBQ0EsU0FBS1QsVUFBTCxDQUFnQlUsT0FBaEIsR0FBMEIsR0FBMUI7O0FBQ0EsWUFBUUgsSUFBUjtBQUNJLFdBQUssTUFBTDtBQUNJLGFBQUtULEtBQUwsQ0FBV2EsTUFBWCxHQUFvQixVQUFVSCxHQUE5QjtBQUNBLGFBQUtO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QU8sRUFBRTtBQUF2QyxLQUZiLEVBRXlEO0FBQUVPLE1BQUFBLE1BQU0sRUFBRTtBQUFWLEtBRnpELEVBR0tDLElBSEwsQ0FHVSxZQUFNO0FBQ1IsTUFBQSxLQUFJLENBQUNDLGFBQUwsQ0FBbUJDLFlBQW5CLENBQWdDLEtBQUksQ0FBQ0MsSUFBckM7QUFDSCxLQUxMLEVBTUtDLEtBTkw7QUFPSCxHQWpMSTtBQWtMTDtBQUVBQyxFQUFBQSxNQXBMSyxvQkFvTEk7QUFDTCxTQUFLSixhQUFMLEdBQXFCekIsRUFBRSxDQUFDOEIsSUFBSCxDQUFRLFNBQVIsRUFBbUJDLFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0gsR0F0TEk7QUF3TExILEVBQUFBLEtBeExLLG1CQXdMRyxDQUVQLENBMUxJLENBNExMOztBQTVMSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGxhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBmbG9vcl9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGljb25fZnJhbWU6IGNjLlNwcml0ZSxcclxuICAgICAgICBpY29uX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgIH0sXHJcbiAgICBpbmlfbm9kZTogZnVuY3Rpb24gKHR5cGUsIG51bSkge1xyXG4gICAgICAgIC8vIHRoaXMubGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vIHRoaXMuaWNvbl9mcmFtZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gdGhpcy5mbG9vcl9ub2RlLndpZHRoID0gMDtcclxuICAgICAgICAvLyB0aGlzLmZsb29yX25vZGUuaGVpZ2h0ID0gNjA7XHJcbiAgICAgICAgdGhpcy5mbG9vcl9ub2RlLnkgPSAzOTU7XHJcbiAgICAgICAgdGhpcy5mbG9vcl9ub2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJnb2xkXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiR29sZCtcIiArIG51bTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMF07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInBldF9sZWF2ZVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIkdvbmVcIlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidmlkZW90YXBlX25vX3RpbWVcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJTY3JlZW4gcmVjb3JkaW5nIHRpbWUgc2hvdWxkIGJlIG1vcmUgdGhhbiAzIHNlY29uZHNcIlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidmlkZW90YXBlX3NoYXJlX2ZhaWxcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJTY3JlZW4gcmVjb3JkaW5nIGFuZCBzaGFyaW5nIGZhaWxlZH5cIlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidmlkZW90YXBlX3NoYXJlX3N1Y2Nlc1wiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlNjcmVlbiByZWNvcmRpbmcgYW5kIHNoYXJpbmcgc3VjY2VzcyFcIlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidmlkZW90YXBlX3N0YXJ0XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU2NyZWVuIHJlY29yZGluZyBzdGFydGVkXCJcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInZpZG90YXBlX2NhbmNlbFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlNjcmVlbiByZWNvcmRpbmcgaGFzIGJlZW4gcmVzZXRcIlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidmlkb3RhcGVfb3ZlclwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlNjcmVlbiByZWNvcmRpbmcgaGFzIGVuZGVkXCJcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInZpZGVvX2V4aXRcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJXYXRjaCB0aGUgZnVsbCB2aWRlb35cIlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidmlkZW9fd2FpdFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIkFkIGJyZWFrfn5cIlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibm9fc2VsbFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIk5vdGhpbmcgdG8gc2VsbFwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibm9fbW9uZXlfZ29sZFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIkdvbGQgbm90IGVub3VnaHRcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm5vX21vbmV5X2RpYW1vbmRcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJEaWFtb25kIG5vdCBlbm91Z2h0XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJub19sZXZlbFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIkxldmVsIG5vdCBlbm91Z2h0XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJub19za2lsbF9wb2ludFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlNraWxsIHBvaW50IG5vdCBlbm91Z2h0XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJlbXBvbHlfc3VjY2VzXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiSGlyZSBzdWNjZXNzXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidXlfc3VjY2VzXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU3VjY2Vzc2Z1bCBwdXJjaGFzZVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZ2V0X29mZmxpbmVfcHJvZml0XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiUmVjZWl2ZSBvZmZsaW5lIGVhcm5pbmdzXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjdWx0cnVlX3N1Y2Nlc1wiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIkFkb3B0aW9uIGlzIHN1Y2Nlc3NmdWxcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInVuX2RldmVsb3BcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJOb3QgdW5sb2NrZWQgeWV0XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzaGFyZV9zdWNjZXNcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJTaGFyZSBzdWNjZXNzXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJwZXRfYWxyZWFkeV9saWZlXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiUGV0IGFscmVhZHkgZXhpc3RzflwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwic2hhcmVfZmFpbFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlRyeSBzaGFyaW5nIGFnYWluflwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZG91YmxlX29mZmxpbmVfcHJvZml0XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU3VjY2Vzc2Z1bGx5IHJlY2VpdmUgZG91YmxlIHJld2FyZHNcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImN1bHRydWVfcGV0X3N1Y2Nlc1wiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIkluY3JlYXNlZCBwZXQgZmF2b3JhYmlsaXR5XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzdGFmZl9yZXN0X292ZXJcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJXb3JrIGZhc3RlciFcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInNraWxsX3Jlc3RcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJTa2lsbCBoYXMgYmVlbiByZXNldFwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZ2lmdF9hZF9leFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIkdhaW4gYSBsb3Qgb2YgZXhwZXJpZW5jZVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZ29sZF9mdWxsXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiQ2FuJ3QgaG9sZCBtb3JlIGNvaW5zIVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZ2lmdF9hZF9sZXZlbFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIkxldmVsIHVwIVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwic2hhcmVfbWF4XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiUmVhY2hlZCB0b2RheSdzIGxpbWl0flwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidW5sb2NrZWRfcmVwb1wiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlVubG9ja2VkIHRoaXMgcmVwb3NpdG9yeVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY2FudF91bmxvY2tfcmVwb1wiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIkNhbid0IHVubG9jayB0aGlzIHJlcG9zaXRvcnkgeWV0XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJub192aWRlb190b2RheVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIk91dCBvZiB2aWRlbyB2aWV3XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmVuZF9hbmltKCk7XHJcbiAgICB9LFxyXG4gICAgLy8gaW5pX2FuaW06IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgICBjYy50d2Vlbih0aGlzLmZsb29yX25vZGUpXHJcbiAgICAvLyAgICAgICAgIC50bygwLjIsIHsgeTogMTAwIH0sIHsgZWFzaW5nOiBcInNpbmVPdXRcIiB9KVxyXG4gICAgLy8gICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmxhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAvLyAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5lbmRfYW5pbSgpO1xyXG4gICAgLy8gICAgICAgICAgICAgfTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGNhbGxiYWNrLCAxLjUpO1xyXG4gICAgLy8gICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgICAuc3RhcnQoKTtcclxuICAgIC8vIH0sXHJcbiAgICBlbmRfYW5pbTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuZmxvb3Jfbm9kZSlcclxuICAgICAgICAgICAgLmRlbGF5KDEpXHJcbiAgICAgICAgICAgIC50bygwLjMsIHsgeTogdGhpcy5mbG9vcl9ub2RlLnkgKyAxNTAsIG9wYWNpdHk6IDAgfSwgeyBlYXNpbmc6IFwic2luZU91dFwiIH0pXHJcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5vbl9ub2RlX2tpbGwodGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=