
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/pet_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8490cizMe1PDbfuzcbu3dJI', 'pet_ui');
// script/ui/pet_ui.js

"use strict";

var config = require("config");

cc.Class({
  "extends": cc.Component,
  properties: {
    pet_content_prefab: cc.Prefab,
    content_node: cc.Node
  },
  //初始化节点
  ini_node: function ini_node() {
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control.show_bannerAd();
  },
  //创建宠物content
  create_pet_content: function create_pet_content() {
    var arr = Object.keys(config.pet);

    for (var i = 0; i < arr.length; i++) {
      var node = cc.instantiate(this.pet_content_prefab);
      node.parent = this.content_node;
      node.getComponent("pet_content").ini_node(i);
    }

    ;
  },
  //点击退出
  touch_exit: function touch_exit() {
    this.sound_control.play_sound_effect("button_exit");
    this.game_scene_js.on_node_kill(this.node);
  },
  onLoad: function onLoad() {},
  start: function start() {
    this.create_pet_content();
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxccGV0X3VpLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInBldF9jb250ZW50X3ByZWZhYiIsIlByZWZhYiIsImNvbnRlbnRfbm9kZSIsIk5vZGUiLCJpbmlfbm9kZSIsImFkX2NvbnRyb2wiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9zY2VuZV9qcyIsInNvdW5kX2NvbnRyb2wiLCJzaG93X2Jhbm5lckFkIiwiY3JlYXRlX3BldF9jb250ZW50IiwiYXJyIiwiT2JqZWN0Iiwia2V5cyIsInBldCIsImkiLCJsZW5ndGgiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJ0b3VjaF9leGl0IiwicGxheV9zb3VuZF9lZmZlY3QiLCJvbl9ub2RlX2tpbGwiLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxNQUFNLEdBQUdDLE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUNBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsa0JBQWtCLEVBQUVKLEVBQUUsQ0FBQ0ssTUFEZjtBQUVSQyxJQUFBQSxZQUFZLEVBQUVOLEVBQUUsQ0FBQ087QUFGVCxHQUhQO0FBT0w7QUFDQUMsRUFBQUEsUUFSSyxzQkFRTTtBQUNQLFNBQUtDLFVBQUwsR0FBa0JULEVBQUUsQ0FBQ1UsSUFBSCxDQUFRLFlBQVIsRUFBc0JDLFlBQXRCLENBQW1DLFlBQW5DLENBQWxCO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQlosRUFBRSxDQUFDVSxJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFDQSxTQUFLRSxhQUFMLEdBQXFCYixFQUFFLENBQUNVLElBQUgsQ0FBUSxlQUFSLEVBQXlCQyxZQUF6QixDQUFzQyxlQUF0QyxDQUFyQjtBQUNBLFNBQUtGLFVBQUwsQ0FBZ0JLLGFBQWhCO0FBQ0gsR0FiSTtBQWNMO0FBQ0FDLEVBQUFBLGtCQWZLLGdDQWVnQjtBQUNqQixRQUFJQyxHQUFHLEdBQUdDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZcEIsTUFBTSxDQUFDcUIsR0FBbkIsQ0FBVjs7QUFDQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdKLEdBQUcsQ0FBQ0ssTUFBeEIsRUFBZ0NELENBQUMsRUFBakMsRUFBcUM7QUFDakMsVUFBSUUsSUFBSSxHQUFHdEIsRUFBRSxDQUFDdUIsV0FBSCxDQUFlLEtBQUtuQixrQkFBcEIsQ0FBWDtBQUNBa0IsTUFBQUEsSUFBSSxDQUFDRSxNQUFMLEdBQWMsS0FBS2xCLFlBQW5CO0FBQ0FnQixNQUFBQSxJQUFJLENBQUNYLFlBQUwsQ0FBa0IsYUFBbEIsRUFBaUNILFFBQWpDLENBQTBDWSxDQUExQztBQUNIOztBQUFBO0FBQ0osR0F0Qkk7QUF1Qkw7QUFDQUssRUFBQUEsVUF4Qkssd0JBd0JRO0FBQ1QsU0FBS1osYUFBTCxDQUFtQmEsaUJBQW5CLENBQXFDLGFBQXJDO0FBQ0EsU0FBS2QsYUFBTCxDQUFtQmUsWUFBbkIsQ0FBZ0MsS0FBS0wsSUFBckM7QUFDSCxHQTNCSTtBQTRCTE0sRUFBQUEsTUE1Qkssb0JBNEJJLENBRVIsQ0E5Qkk7QUFnQ0xDLEVBQUFBLEtBaENLLG1CQWdDRztBQUNKLFNBQUtkLGtCQUFMO0FBQ0gsR0FsQ0ksQ0FvQ0w7O0FBcENLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBjb25maWcgPSByZXF1aXJlKFwiY29uZmlnXCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHBldF9jb250ZW50X3ByZWZhYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIGNvbnRlbnRfbm9kZTogY2MuTm9kZSxcclxuICAgIH0sXHJcbiAgICAvL+WIneWni+WMluiKgueCuVxyXG4gICAgaW5pX25vZGUoKSB7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfYmFubmVyQWQoKTtcclxuICAgIH0sXHJcbiAgICAvL+WIm+W7uuWuoOeJqWNvbnRlbnRcclxuICAgIGNyZWF0ZV9wZXRfY29udGVudCgpIHtcclxuICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXMoY29uZmlnLnBldCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBldF9jb250ZW50X3ByZWZhYik7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5jb250ZW50X25vZGU7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwicGV0X2NvbnRlbnRcIikuaW5pX25vZGUoaSk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+eCueWHu+mAgOWHulxyXG4gICAgdG91Y2hfZXhpdCgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMub25fbm9kZV9raWxsKHRoaXMubm9kZSk7XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVfcGV0X2NvbnRlbnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pOyJdfQ==