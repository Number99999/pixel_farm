
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxccGV0X3VpLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInBldF9jb250ZW50X3ByZWZhYiIsIlByZWZhYiIsImNvbnRlbnRfbm9kZSIsIk5vZGUiLCJpbmlfbm9kZSIsImFkX2NvbnRyb2wiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9zY2VuZV9qcyIsInNvdW5kX2NvbnRyb2wiLCJjcmVhdGVfcGV0X2NvbnRlbnQiLCJhcnIiLCJPYmplY3QiLCJrZXlzIiwicGV0IiwiaSIsImxlbmd0aCIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsInRvdWNoX2V4aXQiLCJwbGF5X3NvdW5kX2VmZmVjdCIsIm9uX25vZGVfa2lsbCIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE1BQU0sR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxrQkFBa0IsRUFBRUosRUFBRSxDQUFDSyxNQURmO0FBRVJDLElBQUFBLFlBQVksRUFBRU4sRUFBRSxDQUFDTztBQUZULEdBSFA7QUFPTDtBQUNBQyxFQUFBQSxRQVJLLHNCQVFNO0FBQ1AsU0FBS0MsVUFBTCxHQUFrQlQsRUFBRSxDQUFDVSxJQUFILENBQVEsWUFBUixFQUFzQkMsWUFBdEIsQ0FBbUMsWUFBbkMsQ0FBbEI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCWixFQUFFLENBQUNVLElBQUgsQ0FBUSxTQUFSLEVBQW1CQyxZQUFuQixDQUFnQyxZQUFoQyxDQUFyQjtBQUNBLFNBQUtFLGFBQUwsR0FBcUJiLEVBQUUsQ0FBQ1UsSUFBSCxDQUFRLGVBQVIsRUFBeUJDLFlBQXpCLENBQXNDLGVBQXRDLENBQXJCO0FBRUgsR0FiSTtBQWNMO0FBQ0FHLEVBQUFBLGtCQWZLLGdDQWVnQjtBQUNqQixRQUFJQyxHQUFHLEdBQUdDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZbkIsTUFBTSxDQUFDb0IsR0FBbkIsQ0FBVjs7QUFDQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdKLEdBQUcsQ0FBQ0ssTUFBeEIsRUFBZ0NELENBQUMsRUFBakMsRUFBcUM7QUFDakMsVUFBSUUsSUFBSSxHQUFHckIsRUFBRSxDQUFDc0IsV0FBSCxDQUFlLEtBQUtsQixrQkFBcEIsQ0FBWDtBQUNBaUIsTUFBQUEsSUFBSSxDQUFDRSxNQUFMLEdBQWMsS0FBS2pCLFlBQW5CO0FBQ0FlLE1BQUFBLElBQUksQ0FBQ1YsWUFBTCxDQUFrQixhQUFsQixFQUFpQ0gsUUFBakMsQ0FBMENXLENBQTFDO0FBQ0g7O0FBQUE7QUFDSixHQXRCSTtBQXVCTDtBQUNBSyxFQUFBQSxVQXhCSyx3QkF3QlE7QUFDVCxTQUFLWCxhQUFMLENBQW1CWSxpQkFBbkIsQ0FBcUMsYUFBckM7QUFDQSxTQUFLYixhQUFMLENBQW1CYyxZQUFuQixDQUFnQyxLQUFLTCxJQUFyQztBQUNILEdBM0JJO0FBNEJMTSxFQUFBQSxNQTVCSyxvQkE0QkksQ0FFUixDQTlCSTtBQWdDTEMsRUFBQUEsS0FoQ0ssbUJBZ0NHO0FBQ0osU0FBS2Qsa0JBQUw7QUFDSCxHQWxDSSxDQW9DTDs7QUFwQ0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbmZpZyA9IHJlcXVpcmUoXCJjb25maWdcIik7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgcGV0X2NvbnRlbnRfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgY29udGVudF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuICAgIC8v5Yid5aeL5YyW6IqC54K5XHJcbiAgICBpbmlfbm9kZSgpIHtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wgPSBjYy5maW5kKFwiYWRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJhZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcclxuXHJcbiAgICB9LFxyXG4gICAgLy/liJvlu7rlrqDnialjb250ZW50XHJcbiAgICBjcmVhdGVfcGV0X2NvbnRlbnQoKSB7XHJcbiAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKGNvbmZpZy5wZXQpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wZXRfY29udGVudF9wcmVmYWIpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuY29udGVudF9ub2RlO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInBldF9jb250ZW50XCIpLmluaV9ub2RlKGkpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/ngrnlh7vpgIDlh7pcclxuICAgIHRvdWNoX2V4aXQoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2V4aXRcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlX3BldF9jb250ZW50KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTsiXX0=