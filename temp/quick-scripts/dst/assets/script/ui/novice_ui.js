
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/novice_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f2791mzrUZGEJbaCM5hzs1f', 'novice_ui');
// script/ui/novice_ui.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    talk_group: cc.Node,
    paper_node: cc.Node,
    exit_button_node: cc.Node,
    title_node: cc.Node
  },
  //ini_node
  ini_node: function ini_node() {
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.exit_button_node.active = false;
    this.title_node.active = false;

    for (var i = 0; i < this.talk_group.children.length; i++) {
      this.talk_group.children[i].opacity = 0;
    }

    ;
    this.talk_count = 0;
    this.paper_node.height = 505;
    this.ini_paper_anim();
  },
  //纸动画
  ini_paper_anim: function ini_paper_anim() {
    var _this = this;

    cc.tween(this.paper_node).to(0.3, {
      height: 1042
    }, {
      easing: "sineIn"
    }).call(function () {
      _this.title_node.active = true;

      _this.ini_talk_anim();

      _this.show_exit_button_node();
    }).start();
  },
  //ini anim
  ini_talk_anim: function ini_talk_anim() {
    var callback = function callback() {
      this.talk_group.children[this.talk_count].opacity = 255;
      this.talk_count++;

      if (this.talk_count >= this.talk_group.children.length) {
        return;
      }

      ;
      this.ini_talk_anim();
    };

    this.scheduleOnce(callback, 0.2);
  },
  show_exit_button_node: function show_exit_button_node() {
    var _this2 = this;

    this.scheduleOnce(function () {
      _this2.exit_button_node.active = true;
    }, 1.5);
  },
  //退出按钮
  on_exit_button_click: function on_exit_button_click() {
    this.sound_control.play_sound_effect("button_exit");
    this.node.destroy();
  },
  // onLoad () {},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcbm92aWNlX3VpLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidGFsa19ncm91cCIsIk5vZGUiLCJwYXBlcl9ub2RlIiwiZXhpdF9idXR0b25fbm9kZSIsInRpdGxlX25vZGUiLCJpbmlfbm9kZSIsInNvdW5kX2NvbnRyb2wiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiYWN0aXZlIiwiaSIsImNoaWxkcmVuIiwibGVuZ3RoIiwib3BhY2l0eSIsInRhbGtfY291bnQiLCJoZWlnaHQiLCJpbmlfcGFwZXJfYW5pbSIsInR3ZWVuIiwidG8iLCJlYXNpbmciLCJjYWxsIiwiaW5pX3RhbGtfYW5pbSIsInNob3dfZXhpdF9idXR0b25fbm9kZSIsInN0YXJ0IiwiY2FsbGJhY2siLCJzY2hlZHVsZU9uY2UiLCJvbl9leGl0X2J1dHRvbl9jbGljayIsInBsYXlfc291bmRfZWZmZWN0Iiwibm9kZSIsImRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUVKLEVBQUUsQ0FBQ0ssSUFEUDtBQUVSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ0ssSUFGUDtBQUdSRSxJQUFBQSxnQkFBZ0IsRUFBRVAsRUFBRSxDQUFDSyxJQUhiO0FBSVJHLElBQUFBLFVBQVUsRUFBRVIsRUFBRSxDQUFDSztBQUpQLEdBSFA7QUFVTDtBQUNBSSxFQUFBQSxRQVhLLHNCQVdNO0FBQ1AsU0FBS0MsYUFBTCxHQUFxQlYsRUFBRSxDQUFDVyxJQUFILENBQVEsZUFBUixFQUF5QkMsWUFBekIsQ0FBc0MsZUFBdEMsQ0FBckI7QUFDQSxTQUFLTCxnQkFBTCxDQUFzQk0sTUFBdEIsR0FBK0IsS0FBL0I7QUFDQSxTQUFLTCxVQUFMLENBQWdCSyxNQUFoQixHQUF5QixLQUF6Qjs7QUFFQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS1YsVUFBTCxDQUFnQlcsUUFBaEIsQ0FBeUJDLE1BQTdDLEVBQXFERixDQUFDLEVBQXRELEVBQTBEO0FBQ3RELFdBQUtWLFVBQUwsQ0FBZ0JXLFFBQWhCLENBQXlCRCxDQUF6QixFQUE0QkcsT0FBNUIsR0FBc0MsQ0FBdEM7QUFDSDs7QUFBQTtBQUNELFNBQUtDLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxTQUFLWixVQUFMLENBQWdCYSxNQUFoQixHQUF5QixHQUF6QjtBQUNBLFNBQUtDLGNBQUw7QUFFSCxHQXZCSTtBQXlCTDtBQUNBQSxFQUFBQSxjQTFCSyw0QkEwQlk7QUFBQTs7QUFDYnBCLElBQUFBLEVBQUUsQ0FBQ3FCLEtBQUgsQ0FBUyxLQUFLZixVQUFkLEVBQ0tnQixFQURMLENBQ1EsR0FEUixFQUNhO0FBQUVILE1BQUFBLE1BQU0sRUFBRTtBQUFWLEtBRGIsRUFDK0I7QUFBRUksTUFBQUEsTUFBTSxFQUFFO0FBQVYsS0FEL0IsRUFFS0MsSUFGTCxDQUVVLFlBQU07QUFDUixNQUFBLEtBQUksQ0FBQ2hCLFVBQUwsQ0FBZ0JLLE1BQWhCLEdBQXlCLElBQXpCOztBQUNBLE1BQUEsS0FBSSxDQUFDWSxhQUFMOztBQUNBLE1BQUEsS0FBSSxDQUFDQyxxQkFBTDtBQUNILEtBTkwsRUFPS0MsS0FQTDtBQVFILEdBbkNJO0FBcUNMO0FBQ0FGLEVBQUFBLGFBdENLLDJCQXNDVztBQUNaLFFBQUlHLFFBQVEsR0FBRyxTQUFYQSxRQUFXLEdBQVk7QUFDdkIsV0FBS3hCLFVBQUwsQ0FBZ0JXLFFBQWhCLENBQXlCLEtBQUtHLFVBQTlCLEVBQTBDRCxPQUExQyxHQUFvRCxHQUFwRDtBQUNBLFdBQUtDLFVBQUw7O0FBQ0EsVUFBSSxLQUFLQSxVQUFMLElBQW1CLEtBQUtkLFVBQUwsQ0FBZ0JXLFFBQWhCLENBQXlCQyxNQUFoRCxFQUF3RDtBQUNwRDtBQUNIOztBQUFBO0FBQ0QsV0FBS1MsYUFBTDtBQUNILEtBUEQ7O0FBUUEsU0FBS0ksWUFBTCxDQUFrQkQsUUFBbEIsRUFBNEIsR0FBNUI7QUFDSCxHQWhESTtBQWlETEYsRUFBQUEscUJBakRLLG1DQWlEbUI7QUFBQTs7QUFDcEIsU0FBS0csWUFBTCxDQUFrQixZQUFNO0FBQ3BCLE1BQUEsTUFBSSxDQUFDdEIsZ0JBQUwsQ0FBc0JNLE1BQXRCLEdBQStCLElBQS9CO0FBQ0gsS0FGRCxFQUVHLEdBRkg7QUFHSCxHQXJESTtBQXNETDtBQUNBaUIsRUFBQUEsb0JBdkRLLGtDQXVEa0I7QUFDbkIsU0FBS3BCLGFBQUwsQ0FBbUJxQixpQkFBbkIsQ0FBcUMsYUFBckM7QUFDQSxTQUFLQyxJQUFMLENBQVVDLE9BQVY7QUFDSCxHQTFESTtBQTRETDtBQUVBTixFQUFBQSxLQTlESyxtQkE4REcsQ0FFUCxDQWhFSSxDQWtFTDs7QUFsRUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICB0YWxrX2dyb3VwOiBjYy5Ob2RlLFxuICAgICAgICBwYXBlcl9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBleGl0X2J1dHRvbl9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICB0aXRsZV9ub2RlOiBjYy5Ob2RlLFxuICAgIH0sXG5cbiAgICAvL2luaV9ub2RlXG4gICAgaW5pX25vZGUoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuZXhpdF9idXR0b25fbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aXRsZV9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50YWxrX2dyb3VwLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnRhbGtfZ3JvdXAuY2hpbGRyZW5baV0ub3BhY2l0eSA9IDA7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGFsa19jb3VudCA9IDA7XG4gICAgICAgIHRoaXMucGFwZXJfbm9kZS5oZWlnaHQgPSA1MDU7XG4gICAgICAgIHRoaXMuaW5pX3BhcGVyX2FuaW0oKTtcblxuICAgIH0sXG5cbiAgICAvL+e6uOWKqOeUu1xuICAgIGluaV9wYXBlcl9hbmltKCkge1xuICAgICAgICBjYy50d2Vlbih0aGlzLnBhcGVyX25vZGUpXG4gICAgICAgICAgICAudG8oMC4zLCB7IGhlaWdodDogMTA0MiB9LCB7IGVhc2luZzogXCJzaW5lSW5cIiB9KVxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudGl0bGVfbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pX3RhbGtfYW5pbSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd19leGl0X2J1dHRvbl9ub2RlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgfSxcblxuICAgIC8vaW5pIGFuaW1cbiAgICBpbmlfdGFsa19hbmltKCkge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnRhbGtfZ3JvdXAuY2hpbGRyZW5bdGhpcy50YWxrX2NvdW50XS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICAgICAgdGhpcy50YWxrX2NvdW50Kys7XG4gICAgICAgICAgICBpZiAodGhpcy50YWxrX2NvdW50ID49IHRoaXMudGFsa19ncm91cC5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5pbmlfdGFsa19hbmltKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGNhbGxiYWNrLCAwLjIpO1xuICAgIH0sXG4gICAgc2hvd19leGl0X2J1dHRvbl9ub2RlKCkge1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV4aXRfYnV0dG9uX25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSwgMS41KVxuICAgIH0sXG4gICAgLy/pgIDlh7rmjInpkq5cbiAgICBvbl9leGl0X2J1dHRvbl9jbGljaygpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2V4aXRcIik7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIC8vIG9uTG9hZCAoKSB7fSxcblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=