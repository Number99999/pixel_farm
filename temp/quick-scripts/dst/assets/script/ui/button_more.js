
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
    this.game_scene_js.on_node_kill(this.node);
  },
  //当按钮被点击
  on_button_click: function on_button_click(e, land_index) {
    this.sound_control.play_sound_effect("button_click");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcYnV0dG9uX21vcmUuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiZnJhbWVfYXJyIiwidHlwZSIsIlNwcml0ZUZyYW1lIiwiZ3JvdXBfbm9kZSIsIk5vZGUiLCJpbmlfbm9kZSIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50Iiwic291bmRfY29udHJvbCIsImxhbmRfZ3JvdXAiLCJhZF9jb250cm9sIiwiYnV0dG9uX3R5cGUiLCJzZXRfYnV0dG9uX2ZyYW1lIiwic2V0X2J1dHRvbl9wb3NpdGlvbiIsImkiLCJjaGlsZHJlbiIsImxlbmd0aCIsImxhbmQiLCJoYXZlIiwiYWN0aXZlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsInNldFBvc2l0aW9uIiwicG9zaXRpb24iLCJ4IiwieSIsIm9uX3RvdWNoX2V4aXRfYnV0dG9uX2NsaWNrIiwicGxheV9zb3VuZF9lZmZlY3QiLCJvbl9ub2RlX2tpbGwiLCJub2RlIiwib25fYnV0dG9uX2NsaWNrIiwiZSIsImxhbmRfaW5kZXgiLCJ3YXRlcl9jaGFyZ2UiLCJ0aWxsIiwibGFuZF9zdGF0ZSIsImNyZWF0ZV9wbGFudF91aSIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUU7QUFDUCxpQkFBUyxFQURGO0FBRVBDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZGLEtBREg7QUFLUkMsSUFBQUEsVUFBVSxFQUFFUCxFQUFFLENBQUNRO0FBTFAsR0FI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ekIsRUFBcUMxQixZQUFyQyxDQUFrRCxNQUFsRCxFQUEwRDRCLElBQTFEO0FBQ0ExQyxRQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0J3QixJQUFwQixDQUF5QmdCLFVBQXpCLEVBQXFDRyxVQUFyQyxHQUFnRCxZQUFoRCxDQUZKLENBR0k7O0FBQ0E7O0FBQ0osV0FBSyxPQUFMO0FBQ0ksWUFBSU4sSUFBSSxHQUFHLEtBQUt6QixhQUFMLENBQW1CZ0MsZUFBbkIsQ0FBbUMsS0FBS2hDLGFBQUwsQ0FBbUJ5QixJQUF0RCxDQUFYOztBQUNBLFlBQUlBLElBQUksSUFBSSxJQUFaLEVBQWtCO0FBQ2RBLFVBQUFBLElBQUksQ0FBQ3ZCLFlBQUwsQ0FBa0IsVUFBbEIsRUFBOEJILFFBQTlCLENBQXVDNkIsVUFBdkM7QUFDSDs7QUFBQTtBQUNEO0FBZlI7O0FBZ0JDO0FBQ0QsU0FBSzVCLGFBQUwsQ0FBbUJ3QixZQUFuQixDQUFnQyxLQUFLQyxJQUFyQztBQUNILEdBdEZJO0FBdUZMUSxFQUFBQSxNQXZGSyxvQkF1RkksQ0FHUixDQTFGSTtBQTJGTEMsRUFBQUEsS0EzRkssbUJBMkZHLENBRVAsQ0E3RkksQ0ErRkw7O0FBL0ZLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGZyYW1lX2Fycjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBncm91cF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WIneWni+WMluaMiemSrlxyXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICh0eXBlKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMubGFuZF9ncm91cCA9IGNjLmZpbmQoXCJVSV9ST09UL2NlbnRlci9sYW5kX2dyb3VwXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5idXR0b25fdHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5zZXRfYnV0dG9uX2ZyYW1lKCk7XHJcbiAgICAgICAgdGhpcy5zZXRfYnV0dG9uX3Bvc2l0aW9uKCk7XHJcbiAgICB9LFxyXG4gICAgLy/orr7nva7mjInpkq7nmoTlm77niYfmoLflvI9cclxuICAgIHNldF9idXR0b25fZnJhbWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuYnV0dG9uX3R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIndhdGVyaW5nXCI6XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGFuZF9ncm91cC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbaV0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJidXR0b25faWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ0aWxsXCI6ICAgIFxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxhbmRfZ3JvdXAuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW2ldLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwX25vZGUuY2hpbGRyZW5baV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiYnV0dG9uX2ljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmZyYW1lX2FyclsyXTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicGxhbnRcIjpcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sYW5kX2dyb3VwLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFtpXS5oYXZlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImJ1dHRvbl9pY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5mcmFtZV9hcnJbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+iuvue9ruaMiemSruS9jee9rlxyXG4gICAgc2V0X2J1dHRvbl9wb3NpdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sYW5kX2dyb3VwLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5zZXRQb3NpdGlvbih0aGlzLmxhbmRfZ3JvdXAuY2hpbGRyZW5baV0ucG9zaXRpb24ueCwgdGhpcy5sYW5kX2dyb3VwLmNoaWxkcmVuW2ldLnBvc2l0aW9uLnkgKyAxNik7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL3RvdWNoIGV4aXRcclxuICAgIG9uX3RvdWNoX2V4aXRfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2V4aXRcIik7XHJcbiBcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMub25fbm9kZV9raWxsKHRoaXMubm9kZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5b2T5oyJ6ZKu6KKr54K55Ye7XHJcbiAgICBvbl9idXR0b25fY2xpY2s6IGZ1bmN0aW9uIChlLCBsYW5kX2luZGV4KSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHRoaXMuYnV0dG9uX3R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIndhdGVyaW5nXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhbmRfZ3JvdXAuY2hpbGRyZW5bbGFuZF9pbmRleF0uZ2V0Q29tcG9uZW50KFwibGFuZFwiKS53YXRlcl9jaGFyZ2UoKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGVsbG8gbGFuZCBcIitsYW5kX2luZGV4KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidGlsbFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYW5kX2dyb3VwLmNoaWxkcmVuW2xhbmRfaW5kZXhdLmdldENvbXBvbmVudChcImxhbmRcIikudGlsbCgpO1xyXG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW2xhbmRfaW5kZXhdLmxhbmRfc3RhdGU9XCJ3YWl0X3BsYW50XCI7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImhlbGxvIGxhbmQgXCIrbGFuZF9pbmRleCAgKyBcIiBcIisgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW2xhbmRfaW5kZXhdLmxhbmRfc3RhdGUgKyBcIiB0aWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJwbGFudFwiOlxyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BsYW50X3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInBsYW50X3VpXCIpLmluaV9ub2RlKGxhbmRfaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuXHJcblxyXG4gICAgfSxcclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==