
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

      case "no_money":
        this.label.string = "Not engought gold and diamond!!!";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcdGlwc191aS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImxhYmVsIiwiTGFiZWwiLCJmbG9vcl9ub2RlIiwiTm9kZSIsImljb25fZnJhbWUiLCJTcHJpdGUiLCJpY29uX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwiaW5pX25vZGUiLCJ0eXBlIiwibnVtIiwieSIsIm9wYWNpdHkiLCJzdHJpbmciLCJzcHJpdGVGcmFtZSIsImVuZF9hbmltIiwidHdlZW4iLCJkZWxheSIsInRvIiwiZWFzaW5nIiwiY2FsbCIsImdhbWVfc2NlbmVfanMiLCJvbl9ub2RlX2tpbGwiLCJub2RlIiwic3RhcnQiLCJvbkxvYWQiLCJmaW5kIiwiZ2V0Q29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFFSixFQUFFLENBQUNLLEtBREY7QUFFUkMsSUFBQUEsVUFBVSxFQUFFTixFQUFFLENBQUNPLElBRlA7QUFHUkMsSUFBQUEsVUFBVSxFQUFFUixFQUFFLENBQUNTLE1BSFA7QUFJUkMsSUFBQUEsY0FBYyxFQUFFLENBQUNWLEVBQUUsQ0FBQ1csV0FBSjtBQUpSLEdBSFA7QUFTTEMsRUFBQUEsUUFBUSxFQUFFLGtCQUFVQyxJQUFWLEVBQWdCQyxHQUFoQixFQUFxQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQUtSLFVBQUwsQ0FBZ0JTLENBQWhCLEdBQW9CLEdBQXBCO0FBQ0EsU0FBS1QsVUFBTCxDQUFnQlUsT0FBaEIsR0FBMEIsR0FBMUI7O0FBQ0EsWUFBUUgsSUFBUjtBQUNJLFdBQUssTUFBTDtBQUNJLGFBQUtULEtBQUwsQ0FBV2EsTUFBWCxHQUFvQixVQUFVSCxHQUE5QjtBQUNBLGFBQUtO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VUFBZCxFQUNLZSxLQURMLENBQ1csQ0FEWCxFQUVLQyxFQUZMLENBRVEsR0FGUixFQUVhO0FBQUVQLE1BQUFBLENBQUMsRUFBRSxLQUFLVCxVQUFMLENBQWdCUyxDQUFoQixHQUFvQixHQUF6QjtBQUE4QkMsTUFBQUEsT0FBTyxFQUFFO0FBQXZDLEtBRmIsRUFFeUQ7QUFBRU8sTUFBQUEsTUFBTSxFQUFFO0FBQVYsS0FGekQsRUFHS0MsSUFITCxDQUdVLFlBQU07QUFDUixNQUFBLEtBQUksQ0FBQ0MsYUFBTCxDQUFtQkMsWUFBbkIsQ0FBZ0MsS0FBSSxDQUFDQyxJQUFyQztBQUNILEtBTEwsRUFNS0MsS0FOTDtBQU9ILEdBckxJO0FBc0xMO0FBRUFDLEVBQUFBLE1BeExLLG9CQXdMSTtBQUNMLFNBQUtKLGFBQUwsR0FBcUJ6QixFQUFFLENBQUM4QixJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFDSCxHQTFMSTtBQTRMTEgsRUFBQUEsS0E1TEssbUJBNExHLENBRVAsQ0E5TEksQ0FnTUw7O0FBaE1LLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGxhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgZmxvb3Jfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgaWNvbl9mcmFtZTogY2MuU3ByaXRlLFxuICAgICAgICBpY29uX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICB9LFxuICAgIGluaV9ub2RlOiBmdW5jdGlvbiAodHlwZSwgbnVtKSB7XG4gICAgICAgIC8vIHRoaXMubGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAvLyB0aGlzLmljb25fZnJhbWUubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAvLyB0aGlzLmZsb29yX25vZGUud2lkdGggPSAwO1xuICAgICAgICAvLyB0aGlzLmZsb29yX25vZGUuaGVpZ2h0ID0gNjA7XG4gICAgICAgIHRoaXMuZmxvb3Jfbm9kZS55ID0gMzk1O1xuICAgICAgICB0aGlzLmZsb29yX25vZGUub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwiZ29sZFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJHb2xkK1wiICsgbnVtO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMF07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicGV0X2xlYXZlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIkdvbmVcIlxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidmlkZW90YXBlX25vX3RpbWVcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU2NyZWVuIHJlY29yZGluZyB0aW1lIHNob3VsZCBiZSBtb3JlIHRoYW4gMyBzZWNvbmRzXCJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInZpZGVvdGFwZV9zaGFyZV9mYWlsXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlNjcmVlbiByZWNvcmRpbmcgYW5kIHNoYXJpbmcgZmFpbGVkflwiXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ2aWRlb3RhcGVfc2hhcmVfc3VjY2VzXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlNjcmVlbiByZWNvcmRpbmcgYW5kIHNoYXJpbmcgc3VjY2VzcyFcIlxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidmlkZW90YXBlX3N0YXJ0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlNjcmVlbiByZWNvcmRpbmcgc3RhcnRlZFwiXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ2aWRvdGFwZV9jYW5jZWxcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU2NyZWVuIHJlY29yZGluZyBoYXMgYmVlbiByZXNldFwiXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ2aWRvdGFwZV9vdmVyXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlNjcmVlbiByZWNvcmRpbmcgaGFzIGVuZGVkXCJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInZpZGVvX2V4aXRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiV2F0Y2ggdGhlIGZ1bGwgdmlkZW9+XCJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInZpZGVvX3dhaXRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiQWQgYnJlYWt+flwiXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJub19zZWxsXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIk5vdGhpbmcgdG8gc2VsbFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibm9fbW9uZXlfZ29sZFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJHb2xkIG5vdCBlbm91Z2h0XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJub19tb25leV9kaWFtb25kXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIkRpYW1vbmQgbm90IGVub3VnaHRcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5vX2xldmVsXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIkxldmVsIG5vdCBlbm91Z2h0XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJub19za2lsbF9wb2ludFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJTa2lsbCBwb2ludCBub3QgZW5vdWdodFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZW1wb2x5X3N1Y2Nlc1wiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJIaXJlIHN1Y2Nlc3NcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJ1eV9zdWNjZXNcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU3VjY2Vzc2Z1bCBwdXJjaGFzZVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZ2V0X29mZmxpbmVfcHJvZml0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlJlY2VpdmUgb2ZmbGluZSBlYXJuaW5nc1wiO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY3VsdHJ1ZV9zdWNjZXNcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiQWRvcHRpb24gaXMgc3VjY2Vzc2Z1bFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidW5fZGV2ZWxvcFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJOb3QgdW5sb2NrZWQgeWV0XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzaGFyZV9zdWNjZXNcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU2hhcmUgc3VjY2Vzc1wiO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicGV0X2FscmVhZHlfbGlmZVwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJQZXQgYWxyZWFkeSBleGlzdHN+XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzaGFyZV9mYWlsXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlRyeSBzaGFyaW5nIGFnYWluflwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZG91YmxlX29mZmxpbmVfcHJvZml0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlN1Y2Nlc3NmdWxseSByZWNlaXZlIGRvdWJsZSByZXdhcmRzXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjdWx0cnVlX3BldF9zdWNjZXNcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiSW5jcmVhc2VkIHBldCBmYXZvcmFiaWxpdHlcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInN0YWZmX3Jlc3Rfb3ZlclwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJXb3JrIGZhc3RlciFcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInNraWxsX3Jlc3RcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU2tpbGwgaGFzIGJlZW4gcmVzZXRcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImdpZnRfYWRfZXhcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiR2FpbiBhIGxvdCBvZiBleHBlcmllbmNlXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJnb2xkX2Z1bGxcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiQ2FuJ3QgaG9sZCBtb3JlIGNvaW5zIVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZ2lmdF9hZF9sZXZlbFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJMZXZlbCB1cCFcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInNoYXJlX21heFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJSZWFjaGVkIHRvZGF5J3MgbGltaXR+XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ1bmxvY2tlZF9yZXBvXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlVubG9ja2VkIHRoaXMgcmVwb3NpdG9yeVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY2FudF91bmxvY2tfcmVwb1wiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJDYW4ndCB1bmxvY2sgdGhpcyByZXBvc2l0b3J5IHlldFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibm9fdmlkZW9fdG9kYXlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiT3V0IG9mIHZpZGVvIHZpZXdcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5vX21vbmV5XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIk5vdCBlbmdvdWdodCBnb2xkIGFuZCBkaWFtb25kISEhXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5lbmRfYW5pbSgpO1xuICAgIH0sXG4gICAgLy8gaW5pX2FuaW06IGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgY2MudHdlZW4odGhpcy5mbG9vcl9ub2RlKVxuICAgIC8vICAgICAgICAgLnRvKDAuMiwgeyB5OiAxMDAgfSwgeyBlYXNpbmc6IFwic2luZU91dFwiIH0pXG4gICAgLy8gICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgLy8gICAgICAgICAgICAgdGhpcy5sYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgLy8gICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAvLyAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuZW5kX2FuaW0oKTtcbiAgICAvLyAgICAgICAgICAgICB9O1xuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGNhbGxiYWNrLCAxLjUpO1xuICAgIC8vICAgICAgICAgfSlcbiAgICAvLyAgICAgICAgIC5zdGFydCgpO1xuICAgIC8vIH0sXG4gICAgZW5kX2FuaW06IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MudHdlZW4odGhpcy5mbG9vcl9ub2RlKVxuICAgICAgICAgICAgLmRlbGF5KDEpXG4gICAgICAgICAgICAudG8oMC4zLCB7IHk6IHRoaXMuZmxvb3Jfbm9kZS55ICsgMTUwLCBvcGFjaXR5OiAwIH0sIHsgZWFzaW5nOiBcInNpbmVPdXRcIiB9KVxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5vbl9ub2RlX2tpbGwodGhpcy5ub2RlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhcnQoKTtcbiAgICB9LFxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xuICAgIH0sXG5cbiAgICBzdGFydCgpIHtcblxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19