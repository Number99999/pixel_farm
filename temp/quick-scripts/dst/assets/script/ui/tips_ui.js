
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcdGlwc191aS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImxhYmVsIiwiTGFiZWwiLCJmbG9vcl9ub2RlIiwiTm9kZSIsImljb25fZnJhbWUiLCJTcHJpdGUiLCJpY29uX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwiaW5pX25vZGUiLCJ0eXBlIiwibnVtIiwieSIsIm9wYWNpdHkiLCJzdHJpbmciLCJzcHJpdGVGcmFtZSIsImVuZF9hbmltIiwidHdlZW4iLCJkZWxheSIsInRvIiwiZWFzaW5nIiwiY2FsbCIsImdhbWVfc2NlbmVfanMiLCJvbl9ub2RlX2tpbGwiLCJub2RlIiwic3RhcnQiLCJvbkxvYWQiLCJmaW5kIiwiZ2V0Q29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFFSixFQUFFLENBQUNLLEtBREY7QUFFUkMsSUFBQUEsVUFBVSxFQUFFTixFQUFFLENBQUNPLElBRlA7QUFHUkMsSUFBQUEsVUFBVSxFQUFFUixFQUFFLENBQUNTLE1BSFA7QUFJUkMsSUFBQUEsY0FBYyxFQUFFLENBQUNWLEVBQUUsQ0FBQ1csV0FBSjtBQUpSLEdBSFA7QUFTTEMsRUFBQUEsUUFBUSxFQUFFLGtCQUFVQyxJQUFWLEVBQWdCQyxHQUFoQixFQUFxQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQUtSLFVBQUwsQ0FBZ0JTLENBQWhCLEdBQW9CLEdBQXBCO0FBQ0EsU0FBS1QsVUFBTCxDQUFnQlUsT0FBaEIsR0FBMEIsR0FBMUI7O0FBQ0EsWUFBUUgsSUFBUjtBQUNJLFdBQUssTUFBTDtBQUNJLGFBQUtULEtBQUwsQ0FBV2EsTUFBWCxHQUFvQixVQUFVSCxHQUE5QjtBQUNBLGFBQUtO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c0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBmbG9vcl9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBpY29uX2ZyYW1lOiBjYy5TcHJpdGUsXG4gICAgICAgIGljb25fZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgIH0sXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICh0eXBlLCBudW0pIHtcbiAgICAgICAgLy8gdGhpcy5sYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIC8vIHRoaXMuaWNvbl9mcmFtZS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIC8vIHRoaXMuZmxvb3Jfbm9kZS53aWR0aCA9IDA7XG4gICAgICAgIC8vIHRoaXMuZmxvb3Jfbm9kZS5oZWlnaHQgPSA2MDtcbiAgICAgICAgdGhpcy5mbG9vcl9ub2RlLnkgPSAzOTU7XG4gICAgICAgIHRoaXMuZmxvb3Jfbm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJnb2xkXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIkdvbGQrXCIgKyBudW07XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwZXRfbGVhdmVcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiR29uZVwiXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ2aWRlb3RhcGVfbm9fdGltZVwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJTY3JlZW4gcmVjb3JkaW5nIHRpbWUgc2hvdWxkIGJlIG1vcmUgdGhhbiAzIHNlY29uZHNcIlxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidmlkZW90YXBlX3NoYXJlX2ZhaWxcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU2NyZWVuIHJlY29yZGluZyBhbmQgc2hhcmluZyBmYWlsZWR+XCJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInZpZGVvdGFwZV9zaGFyZV9zdWNjZXNcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU2NyZWVuIHJlY29yZGluZyBhbmQgc2hhcmluZyBzdWNjZXNzIVwiXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ2aWRlb3RhcGVfc3RhcnRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU2NyZWVuIHJlY29yZGluZyBzdGFydGVkXCJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInZpZG90YXBlX2NhbmNlbFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJTY3JlZW4gcmVjb3JkaW5nIGhhcyBiZWVuIHJlc2V0XCJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInZpZG90YXBlX292ZXJcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU2NyZWVuIHJlY29yZGluZyBoYXMgZW5kZWRcIlxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidmlkZW9fZXhpdFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJXYXRjaCB0aGUgZnVsbCB2aWRlb35cIlxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidmlkZW9fd2FpdFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJBZCBicmVha35+XCJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5vX3NlbGxcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiTm90aGluZyB0byBzZWxsXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJub19tb25leV9nb2xkXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIkdvbGQgbm90IGVub3VnaHRcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5vX21vbmV5X2RpYW1vbmRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiRGlhbW9uZCBub3QgZW5vdWdodFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibm9fbGV2ZWxcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiTGV2ZWwgbm90IGVub3VnaHRcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5vX3NraWxsX3BvaW50XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlNraWxsIHBvaW50IG5vdCBlbm91Z2h0XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJlbXBvbHlfc3VjY2VzXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIkhpcmUgc3VjY2Vzc1wiO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnV5X3N1Y2Nlc1wiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJTdWNjZXNzZnVsIHB1cmNoYXNlXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJnZXRfb2ZmbGluZV9wcm9maXRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiUmVjZWl2ZSBvZmZsaW5lIGVhcm5pbmdzXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjdWx0cnVlX3N1Y2Nlc1wiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJBZG9wdGlvbiBpcyBzdWNjZXNzZnVsXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ1bl9kZXZlbG9wXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIk5vdCB1bmxvY2tlZCB5ZXRcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInNoYXJlX3N1Y2Nlc1wiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJTaGFyZSBzdWNjZXNzXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwZXRfYWxyZWFkeV9saWZlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlBldCBhbHJlYWR5IGV4aXN0c35cIjtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInNoYXJlX2ZhaWxcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiVHJ5IHNoYXJpbmcgYWdhaW5+XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJkb3VibGVfb2ZmbGluZV9wcm9maXRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU3VjY2Vzc2Z1bGx5IHJlY2VpdmUgZG91YmxlIHJld2FyZHNcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImN1bHRydWVfcGV0X3N1Y2Nlc1wiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJJbmNyZWFzZWQgcGV0IGZhdm9yYWJpbGl0eVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic3RhZmZfcmVzdF9vdmVyXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIldvcmsgZmFzdGVyIVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic2tpbGxfcmVzdFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJTa2lsbCBoYXMgYmVlbiByZXNldFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZ2lmdF9hZF9leFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJHYWluIGEgbG90IG9mIGV4cGVyaWVuY2VcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImdvbGRfZnVsbFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJDYW4ndCBob2xkIG1vcmUgY29pbnMhXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJnaWZ0X2FkX2xldmVsXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIkxldmVsIHVwIVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic2hhcmVfbWF4XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlJlYWNoZWQgdG9kYXkncyBsaW1pdH5cIjtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmVuZF9hbmltKCk7XG4gICAgfSxcbiAgICAvLyBpbmlfYW5pbTogZnVuY3Rpb24gKCkge1xuICAgIC8vICAgICBjYy50d2Vlbih0aGlzLmZsb29yX25vZGUpXG4gICAgLy8gICAgICAgICAudG8oMC4yLCB7IHk6IDEwMCB9LCB7IGVhc2luZzogXCJzaW5lT3V0XCIgfSlcbiAgICAvLyAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmxhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgIC8vICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5lbmRfYW5pbSgpO1xuICAgIC8vICAgICAgICAgICAgIH07XG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoY2FsbGJhY2ssIDEuNSk7XG4gICAgLy8gICAgICAgICB9KVxuICAgIC8vICAgICAgICAgLnN0YXJ0KCk7XG4gICAgLy8gfSxcbiAgICBlbmRfYW5pbTogZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy50d2Vlbih0aGlzLmZsb29yX25vZGUpXG4gICAgICAgICAgICAuZGVsYXkoMSlcbiAgICAgICAgICAgIC50bygwLjMsIHsgeTogdGhpcy5mbG9vcl9ub2RlLnkgKyAxNTAsIG9wYWNpdHk6IDAgfSwgeyBlYXNpbmc6IFwic2luZU91dFwiIH0pXG4gICAgICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH0sXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XG4gICAgfSxcblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=