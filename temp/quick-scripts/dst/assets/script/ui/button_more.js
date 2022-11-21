
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/button_more.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0f2a6fEGqpNiZbr09LBCQyz', 'button_more');
// script/ui/button_more.js

"use strict";

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    frame_arr: {
      "default": [],
      type: cc.SpriteFrame
    },
    group_node: cc.Node
  },
  //初始化按钮
  ini_node: function ini_node(type) {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.land_group = cc.find("UI_ROOT/center/land_group");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.ad_control.show_bannerAd();
    this.button_type = type;
    this.set_button_frame();
    this.set_button_position();
  },
  //设置按钮的图片样式
  set_button_frame: function set_button_frame() {
    switch (this.button_type) {
      case "watering":
        for (var i = 0; i < this.land_group.children.length; i++) {
          if (user_data.user_data.land[i].have == 1) {
            this.group_node.children[i].active = true;
            this.group_node.children[i].getChildByName("button_icon").getComponent(cc.Sprite).spriteFrame = this.frame_arr[1];
          }

          ;
        }

        ;
        break;

      case "till":
        for (var i = 0; i < this.land_group.children.length; i++) {
          if (user_data.user_data.land[i].have == 1) {
            this.group_node.children[i].active = true;
            this.group_node.children[i].getChildByName("button_icon").getComponent(cc.Sprite).spriteFrame = this.frame_arr[2];
          }

          ;
        }

        ;
        break;

      case "plant":
        for (var i = 0; i < this.land_group.children.length; i++) {
          if (user_data.user_data.land[i].have == 1) {
            this.group_node.children[i].active = true;
            this.group_node.children[i].getChildByName("button_icon").getComponent(cc.Sprite).spriteFrame = this.frame_arr[0];
          }

          ;
        }

        ;
        break;
    }

    ;
  },
  //设置按钮位置
  set_button_position: function set_button_position() {
    for (var i = 0; i < this.land_group.children.length; i++) {
      this.group_node.children[i].setPosition(this.land_group.children[i].position.x, this.land_group.children[i].position.y + 16);
    }

    ;
  },
  //touch exit
  on_touch_exit_button_click: function on_touch_exit_button_click() {
    this.sound_control.play_sound_effect("button_exit");
    this.ad_control.hide_bannerAd();
    this.game_scene_js.on_node_kill(this.node);
  },
  //当按钮被点击
  on_button_click: function on_button_click(e, land_index) {
    this.sound_control.play_sound_effect("button_click");
    this.ad_control.hide_bannerAd();

    switch (this.button_type) {
      case "watering":
        this.land_group.children[land_index].getComponent("land").water_charge(); // console.log("hello land "+land_index);

        break;

      case "till":
        this.land_group.children[land_index].getComponent("land").till();
        user_data.user_data.land[land_index].land_state = "wait_plant"; // console.log("hello land "+land_index  + " "+ user_data.user_data.land[land_index].land_state + " till");

        break;

      case "plant":
        var node = this.game_scene_js.create_plant_ui(this.game_scene_js.node);

        if (node != null) {
          node.getComponent("plant_ui").ini_node(land_index);
        }

        ;
        break;
    }

    ;
    this.game_scene_js.on_node_kill(this.node);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcYnV0dG9uX21vcmUuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiZnJhbWVfYXJyIiwidHlwZSIsIlNwcml0ZUZyYW1lIiwiZ3JvdXBfbm9kZSIsIk5vZGUiLCJpbmlfbm9kZSIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50Iiwic291bmRfY29udHJvbCIsImxhbmRfZ3JvdXAiLCJhZF9jb250cm9sIiwic2hvd19iYW5uZXJBZCIsImJ1dHRvbl90eXBlIiwic2V0X2J1dHRvbl9mcmFtZSIsInNldF9idXR0b25fcG9zaXRpb24iLCJpIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJsYW5kIiwiaGF2ZSIsImFjdGl2ZSIsImdldENoaWxkQnlOYW1lIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJzZXRQb3NpdGlvbiIsInBvc2l0aW9uIiwieCIsInkiLCJvbl90b3VjaF9leGl0X2J1dHRvbl9jbGljayIsInBsYXlfc291bmRfZWZmZWN0IiwiaGlkZV9iYW5uZXJBZCIsIm9uX25vZGVfa2lsbCIsIm5vZGUiLCJvbl9idXR0b25fY2xpY2siLCJlIiwibGFuZF9pbmRleCIsIndhdGVyX2NoYXJnZSIsInRpbGwiLCJsYW5kX3N0YXRlIiwiY3JlYXRlX3BsYW50X3VpIiwib25Mb2FkIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBRTtBQUNQLGlCQUFTLEVBREY7QUFFUEMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkYsS0FESDtBQUtSQyxJQUFB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QXlCbUIsVUFBekIsRUFBcUM1QixZQUFyQyxDQUFrRCxNQUFsRCxFQUEwRDZCLFlBQTFELEdBREosQ0FFSTs7QUFDQTs7QUFDSixXQUFLLE1BQUw7QUFDSSxhQUFLM0IsVUFBTCxDQUFnQk8sUUFBaEIsQ0FBeUJtQixVQUF6QixFQUFxQzVCLFlBQXJDLENBQWtELE1BQWxELEVBQTBEOEIsSUFBMUQ7QUFDQTVDLFFBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQnlCLElBQXBCLENBQXlCaUIsVUFBekIsRUFBcUNHLFVBQXJDLEdBQWdELFlBQWhELENBRkosQ0FHSTs7QUFDQTs7QUFDSixXQUFLLE9BQUw7QUFDSSxZQUFJTixJQUFJLEdBQUcsS0FBSzNCLGFBQUwsQ0FBbUJrQyxlQUFuQixDQUFtQyxLQUFLbEMsYUFBTCxDQUFtQjJCLElBQXRELENBQVg7O0FBQ0EsWUFBSUEsSUFBSSxJQUFJLElBQVosRUFBa0I7QUFDZEEsVUFBQUEsSUFBSSxDQUFDekIsWUFBTCxDQUFrQixVQUFsQixFQUE4QkgsUUFBOUIsQ0FBdUMrQixVQUF2QztBQUNIOztBQUFBO0FBQ0Q7QUFmUjs7QUFnQkM7QUFDRCxTQUFLOUIsYUFBTCxDQUFtQjBCLFlBQW5CLENBQWdDLEtBQUtDLElBQXJDO0FBQ0gsR0F2Rkk7QUF3RkxRLEVBQUFBLE1BeEZLLG9CQXdGSSxDQUdSLENBM0ZJO0FBNEZMQyxFQUFBQSxLQTVGSyxtQkE0RkcsQ0FFUCxDQTlGSSxDQWdHTDs7QUFoR0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzZXJfZGF0YSA9IHJlcXVpcmUoXCJ1c2VyX2RhdGFcIik7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBmcmFtZV9hcnI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsXG4gICAgICAgIH0sXG4gICAgICAgIGdyb3VwX25vZGU6IGNjLk5vZGUsXG4gICAgfSxcblxuICAgIC8v5Yid5aeL5YyW5oyJ6ZKuXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMubGFuZF9ncm91cCA9IGNjLmZpbmQoXCJVSV9ST09UL2NlbnRlci9sYW5kX2dyb3VwXCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wgPSBjYy5maW5kKFwiYWRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJhZF9jb250cm9sXCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuc2hvd19iYW5uZXJBZCgpO1xuICAgICAgICB0aGlzLmJ1dHRvbl90eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5zZXRfYnV0dG9uX2ZyYW1lKCk7XG4gICAgICAgIHRoaXMuc2V0X2J1dHRvbl9wb3NpdGlvbigpO1xuICAgIH0sXG4gICAgLy/orr7nva7mjInpkq7nmoTlm77niYfmoLflvI9cbiAgICBzZXRfYnV0dG9uX2ZyYW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5idXR0b25fdHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcIndhdGVyaW5nXCI6XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxhbmRfZ3JvdXAuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFtpXS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiYnV0dG9uX2ljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInRpbGxcIjogICAgXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxhbmRfZ3JvdXAuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFtpXS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiYnV0dG9uX2ljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmZyYW1lX2FyclsyXTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBsYW50XCI6XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxhbmRfZ3JvdXAuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFtpXS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiYnV0dG9uX2ljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmZyYW1lX2FyclswXTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvL+iuvue9ruaMiemSruS9jee9rlxuICAgIHNldF9idXR0b25fcG9zaXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxhbmRfZ3JvdXAuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5zZXRQb3NpdGlvbih0aGlzLmxhbmRfZ3JvdXAuY2hpbGRyZW5baV0ucG9zaXRpb24ueCwgdGhpcy5sYW5kX2dyb3VwLmNoaWxkcmVuW2ldLnBvc2l0aW9uLnkgKyAxNik7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL3RvdWNoIGV4aXRcbiAgICBvbl90b3VjaF9leGl0X2J1dHRvbl9jbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLmhpZGVfYmFubmVyQWQoKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xuICAgIH0sXG5cbiAgICAvL+W9k+aMiemSruiiq+eCueWHu1xuICAgIG9uX2J1dHRvbl9jbGljazogZnVuY3Rpb24gKGUsIGxhbmRfaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuYnV0dG9uX3R5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJ3YXRlcmluZ1wiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFuZF9ncm91cC5jaGlsZHJlbltsYW5kX2luZGV4XS5nZXRDb21wb25lbnQoXCJsYW5kXCIpLndhdGVyX2NoYXJnZSgpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGVsbG8gbGFuZCBcIitsYW5kX2luZGV4KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ0aWxsXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYW5kX2dyb3VwLmNoaWxkcmVuW2xhbmRfaW5kZXhdLmdldENvbXBvbmVudChcImxhbmRcIikudGlsbCgpO1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFtsYW5kX2luZGV4XS5sYW5kX3N0YXRlPVwid2FpdF9wbGFudFwiO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGVsbG8gbGFuZCBcIitsYW5kX2luZGV4ICArIFwiIFwiKyB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbbGFuZF9pbmRleF0ubGFuZF9zdGF0ZSArIFwiIHRpbGxcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicGxhbnRcIjpcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGxhbnRfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJwbGFudF91aVwiKS5pbmlfbm9kZShsYW5kX2luZGV4KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMub25fbm9kZV9raWxsKHRoaXMubm9kZSk7XG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG5cblxuICAgIH0sXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIFxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19