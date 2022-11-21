
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
    this.ad_control.hide_bannerAd();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxccGV0X3VpLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInBldF9jb250ZW50X3ByZWZhYiIsIlByZWZhYiIsImNvbnRlbnRfbm9kZSIsIk5vZGUiLCJpbmlfbm9kZSIsImFkX2NvbnRyb2wiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9zY2VuZV9qcyIsInNvdW5kX2NvbnRyb2wiLCJzaG93X2Jhbm5lckFkIiwiY3JlYXRlX3BldF9jb250ZW50IiwiYXJyIiwiT2JqZWN0Iiwia2V5cyIsInBldCIsImkiLCJsZW5ndGgiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJ0b3VjaF9leGl0IiwicGxheV9zb3VuZF9lZmZlY3QiLCJoaWRlX2Jhbm5lckFkIiwib25fbm9kZV9raWxsIiwib25Mb2FkIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGtCQUFrQixFQUFFSixFQUFFLENBQUNLLE1BRGY7QUFFUkMsSUFBQUEsWUFBWSxFQUFFTixFQUFFLENBQUNPO0FBRlQsR0FIUDtBQU9MO0FBQ0FDLEVBQUFBLFFBUkssc0JBUU07QUFDUCxTQUFLQyxVQUFMLEdBQWtCVCxFQUFFLENBQUNVLElBQUgsQ0FBUSxZQUFSLEVBQXNCQyxZQUF0QixDQUFtQyxZQUFuQyxDQUFsQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUJaLEVBQUUsQ0FBQ1UsSUFBSCxDQUFRLFNBQVIsRUFBbUJDLFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0EsU0FBS0UsYUFBTCxHQUFxQmIsRUFBRSxDQUFDVSxJQUFILENBQVEsZUFBUixFQUF5QkMsWUFBekIsQ0FBc0MsZUFBdEMsQ0FBckI7QUFDQSxTQUFLRixVQUFMLENBQWdCSyxhQUFoQjtBQUNILEdBYkk7QUFjTDtBQUNBQyxFQUFBQSxrQkFmSyxnQ0FlZ0I7QUFDakIsUUFBSUMsR0FBRyxHQUFHQyxNQUFNLENBQUNDLElBQVAsQ0FBWXBCLE1BQU0sQ0FBQ3FCLEdBQW5CLENBQVY7O0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSixHQUFHLENBQUNLLE1BQXhCLEVBQWdDRCxDQUFDLEVBQWpDLEVBQXFDO0FBQ2pDLFVBQUlFLElBQUksR0FBR3RCLEVBQUUsQ0FBQ3VCLFdBQUgsQ0FBZSxLQUFLbkIsa0JBQXBCLENBQVg7QUFDQWtCLE1BQUFBLElBQUksQ0FBQ0UsTUFBTCxHQUFjLEtBQUtsQixZQUFuQjtBQUNBZ0IsTUFBQUEsSUFBSSxDQUFDWCxZQUFMLENBQWtCLGFBQWxCLEVBQWlDSCxRQUFqQyxDQUEwQ1ksQ0FBMUM7QUFDSDs7QUFBQTtBQUNKLEdBdEJJO0FBdUJMO0FBQ0FLLEVBQUFBLFVBeEJLLHdCQXdCUTtBQUNULFNBQUtaLGFBQUwsQ0FBbUJhLGlCQUFuQixDQUFxQyxhQUFyQztBQUNBLFNBQUtqQixVQUFMLENBQWdCa0IsYUFBaEI7QUFDQSxTQUFLZixhQUFMLENBQW1CZ0IsWUFBbkIsQ0FBZ0MsS0FBS04sSUFBckM7QUFDSCxHQTVCSTtBQTZCTE8sRUFBQUEsTUE3Qkssb0JBNkJJLENBRVIsQ0EvQkk7QUFpQ0xDLEVBQUFBLEtBakNLLG1CQWlDRztBQUNKLFNBQUtmLGtCQUFMO0FBQ0gsR0FuQ0ksQ0FxQ0w7O0FBckNLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBjb25maWcgPSByZXF1aXJlKFwiY29uZmlnXCIpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcGV0X2NvbnRlbnRfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIGNvbnRlbnRfbm9kZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIC8v5Yid5aeL5YyW6IqC54K5XG4gICAgaW5pX25vZGUoKSB7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5zaG93X2Jhbm5lckFkKCk7XG4gICAgfSxcbiAgICAvL+WIm+W7uuWuoOeJqWNvbnRlbnRcbiAgICBjcmVhdGVfcGV0X2NvbnRlbnQoKSB7XG4gICAgICAgIHZhciBhcnIgPSBPYmplY3Qua2V5cyhjb25maWcucGV0KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wZXRfY29udGVudF9wcmVmYWIpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLmNvbnRlbnRfbm9kZTtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwicGV0X2NvbnRlbnRcIikuaW5pX25vZGUoaSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+eCueWHu+mAgOWHulxuICAgIHRvdWNoX2V4aXQoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMub25fbm9kZV9raWxsKHRoaXMubm9kZSk7XG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlX3BldF9jb250ZW50KCk7XG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7Il19