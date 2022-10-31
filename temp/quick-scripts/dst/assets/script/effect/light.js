
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/effect/light.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bd476vt0nVFUaH5OIbXIPmN', 'light');
// script/effect/light.js

"use strict";

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    icon_frame_arr: [cc.SpriteFrame],
    icon_frame: cc.Sprite,
    light_group: cc.Node
  },
  ini_node: function ini_node(plant_index, start_node) {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.plant_index = plant_index;
    this.light_group.active = true;
    this.icon_frame.spriteFrame = this.icon_frame_arr[plant_index];
    this.node.setPosition(start_node.position.x, start_node.position.y + 50);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxlZmZlY3RcXGxpZ2h0LmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImljb25fZnJhbWVfYXJyIiwiU3ByaXRlRnJhbWUiLCJpY29uX2ZyYW1lIiwiU3ByaXRlIiwibGlnaHRfZ3JvdXAiLCJOb2RlIiwiaW5pX25vZGUiLCJwbGFudF9pbmRleCIsInN0YXJ0X25vZGUiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImdhbWVfcnVsZXNfanMiLCJzb3VuZF9jb250cm9sIiwiYWN0aXZlIiwic3ByaXRlRnJhbWUiLCJub2RlIiwic2V0UG9zaXRpb24iLCJwb3NpdGlvbiIsIngiLCJ5Iiwib25Mb2FkIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGNBQWMsRUFBRSxDQUFDSixFQUFFLENBQUNLLFdBQUosQ0FEUjtBQUVSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ08sTUFGUDtBQUdSQyxJQUFBQSxXQUFXLEVBQUVSLEVBQUUsQ0FBQ1M7QUFIUixHQUhQO0FBUUxDLEVBQUFBLFFBQVEsRUFBRSxrQkFBVUMsV0FBVixFQUF1QkMsVUFBdkIsRUFBbUM7QUFDekMsU0FBS0MsYUFBTCxHQUFxQmIsRUFBRSxDQUFDYyxJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCaEIsRUFBRSxDQUFDYyxJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFDQSxTQUFLRSxhQUFMLEdBQXFCakIsRUFBRSxDQUFDYyxJQUFILENBQVEsZUFBUixFQUF5QkMsWUFBekIsQ0FBc0MsZUFBdEMsQ0FBckI7QUFDQSxTQUFLSixXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFNBQUtILFdBQUwsQ0FBaUJVLE1BQWpCLEdBQTBCLElBQTFCO0FBQ0EsU0FBS1osVUFBTCxDQUFnQmEsV0FBaEIsR0FBOEIsS0FBS2YsY0FBTCxDQUFvQk8sV0FBcEIsQ0FBOUI7QUFDQSxTQUFLUyxJQUFMLENBQVVDLFdBQVYsQ0FBc0JULFVBQVUsQ0FBQ1UsUUFBWCxDQUFvQkMsQ0FBMUMsRUFBNkNYLFVBQVUsQ0FBQ1UsUUFBWCxDQUFvQkUsQ0FBcEIsR0FBd0IsRUFBckU7QUFDSCxHQWhCSTtBQWlCTEMsRUFBQUEsTUFqQkssb0JBaUJJLENBR1IsQ0FwQkk7QUFzQkxDLEVBQUFBLEtBdEJLLG1CQXNCRyxDQUVQLENBeEJJLENBMEJMOztBQTFCSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBpY29uX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBpY29uX2ZyYW1lOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgbGlnaHRfZ3JvdXA6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uIChwbGFudF9pbmRleCwgc3RhcnRfbm9kZSkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMucGxhbnRfaW5kZXggPSBwbGFudF9pbmRleDtcclxuICAgICAgICB0aGlzLmxpZ2h0X2dyb3VwLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FycltwbGFudF9pbmRleF07XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHN0YXJ0X25vZGUucG9zaXRpb24ueCwgc3RhcnRfbm9kZS5wb3NpdGlvbi55ICsgNTApO1xyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19