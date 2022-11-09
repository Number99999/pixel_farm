
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/plant_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f2d8fybXzpH55xj2230YIaA', 'plant_ui');
// script/ui/plant_ui.js

"use strict";

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    icon_grop: cc.Node
  },
  //ini node
  ini_node: function ini_node(land_index) {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.land_group = cc.find("UI_ROOT/center/land_group");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.set_icon();
    this.land_index = land_index;
  },
  //exit
  on_touch_exit_click: function on_touch_exit_click() {
    this.sound_control.play_sound_effect("button_exit");
    this.game_scene_js.on_node_kill(this.node);
  },
  //plant unlock judge
  set_icon: function set_icon() {
    for (var i = 0; i < this.icon_grop.children.length; i++) {
      //拥有种子
      if (user_data.user_data.plant[i].have == 1) {
        this.icon_grop.children[i].active = true;
      } else {
        this.icon_grop.children[i].active = false;
      }

      ;
    }

    ;
  },
  //plant click 
  on_plant_click: function on_plant_click(e, plant_index) {
    this.sound_control.play_sound_effect("button_click");
    this.land_group.children[this.land_index].getComponent("land").plant(plant_index);
    this.on_touch_exit_click();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxccGxhbnRfdWkuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiaWNvbl9ncm9wIiwiTm9kZSIsImluaV9ub2RlIiwibGFuZF9pbmRleCIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwibGFuZF9ncm91cCIsImFkX2NvbnRyb2wiLCJzb3VuZF9jb250cm9sIiwic2V0X2ljb24iLCJvbl90b3VjaF9leGl0X2NsaWNrIiwicGxheV9zb3VuZF9lZmZlY3QiLCJvbl9ub2RlX2tpbGwiLCJub2RlIiwiaSIsImNoaWxkcmVuIiwibGVuZ3RoIiwicGxhbnQiLCJoYXZlIiwiYWN0aXZlIiwib25fcGxhbnRfY2xpY2siLCJlIiwicGxhbnRfaW5kZXgiLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFFSixFQUFFLENBQUNLO0FBRE4sR0FIUDtBQU9MO0FBQ0FDLEVBQUFBLFFBQVEsRUFBRSxrQkFBVUMsVUFBVixFQUFzQjtBQUM1QixTQUFLQyxhQUFMLEdBQXFCUixFQUFFLENBQUNTLElBQUgsQ0FBUSxTQUFSLEVBQW1CQyxZQUFuQixDQUFnQyxZQUFoQyxDQUFyQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0JYLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLDJCQUFSLENBQWxCO0FBQ0EsU0FBS0csVUFBTCxHQUFrQlosRUFBRSxDQUFDUyxJQUFILENBQVEsWUFBUixFQUFzQkMsWUFBdEIsQ0FBbUMsWUFBbkMsQ0FBbEI7QUFDQSxTQUFLRyxhQUFMLEdBQXFCYixFQUFFLENBQUNTLElBQUgsQ0FBUSxlQUFSLEVBQXlCQyxZQUF6QixDQUFzQyxlQUF0QyxDQUFyQjtBQUVBLFNBQUtJLFFBQUw7QUFDQSxTQUFLUCxVQUFMLEdBQWtCQSxVQUFsQjtBQUNILEdBaEJJO0FBaUJMO0FBQ0FRLEVBQUFBLG1CQUFtQixFQUFFLCtCQUFZO0FBQzdCLFNBQUtGLGFBQUwsQ0FBbUJHLGlCQUFuQixDQUFxQyxhQUFyQztBQUNBLFNBQUtSLGFBQUwsQ0FBbUJTLFlBQW5CLENBQWdDLEtBQUtDLElBQXJDO0FBQ0gsR0FyQkk7QUFzQkw7QUFDQUosRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ2xCLFNBQUssSUFBSUssQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLZixTQUFMLENBQWVnQixRQUFmLENBQXdCQyxNQUE1QyxFQUFvREYsQ0FBQyxFQUFyRCxFQUF5RDtBQUNyRDtBQUNBLFVBQUlyQixTQUFTLENBQUNBLFNBQVYsQ0FBb0J3QixLQUFwQixDQUEwQkgsQ0FBMUIsRUFBNkJJLElBQTdCLElBQXFDLENBQXpDLEVBQTRDO0FBQ3hDLGFBQUtuQixTQUFMLENBQWVnQixRQUFmLENBQXdCRCxDQUF4QixFQUEyQkssTUFBM0IsR0FBb0MsSUFBcEM7QUFDSCxPQUZELE1BRU87QUFDSCxhQUFLcEIsU0FBTCxDQUFlZ0IsUUFBZixDQUF3QkQsQ0FBeEIsRUFBMkJLLE1BQTNCLEdBQW9DLEtBQXBDO0FBQ0g7O0FBQUE7QUFDSjs7QUFBQTtBQUNKLEdBaENJO0FBaUNMO0FBQ0FDLEVBQUFBLGNBQWMsRUFBRSx3QkFBVUMsQ0FBVixFQUFhQyxXQUFiLEVBQTBCO0FBQ3RDLFNBQUtkLGFBQUwsQ0FBbUJHLGlCQUFuQixDQUFxQyxjQUFyQztBQUNBLFNBQUtMLFVBQUwsQ0FBZ0JTLFFBQWhCLENBQXlCLEtBQUtiLFVBQTlCLEVBQTBDRyxZQUExQyxDQUF1RCxNQUF2RCxFQUErRFksS0FBL0QsQ0FBcUVLLFdBQXJFO0FBQ0EsU0FBS1osbUJBQUw7QUFDSCxHQXRDSTtBQXVDTGEsRUFBQUEsTUF2Q0ssb0JBdUNJLENBRVIsQ0F6Q0k7QUEyQ0xDLEVBQUFBLEtBM0NLLG1CQTJDRyxDQUVQLENBN0NJLENBK0NMOztBQS9DSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBpY29uX2dyb3A6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vaW5pIG5vZGVcclxuICAgIGluaV9ub2RlOiBmdW5jdGlvbiAobGFuZF9pbmRleCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XHJcbiAgICAgICAgdGhpcy5sYW5kX2dyb3VwID0gY2MuZmluZChcIlVJX1JPT1QvY2VudGVyL2xhbmRfZ3JvdXBcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5zZXRfaWNvbigpO1xyXG4gICAgICAgIHRoaXMubGFuZF9pbmRleCA9IGxhbmRfaW5kZXg7XHJcbiAgICB9LFxyXG4gICAgLy9leGl0XHJcbiAgICBvbl90b3VjaF9leGl0X2NsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2V4aXRcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuICAgIC8vcGxhbnQgdW5sb2NrIGp1ZGdlXHJcbiAgICBzZXRfaWNvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pY29uX2dyb3AuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy/mi6XmnInnp43lrZBcclxuICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEucGxhbnRbaV0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZ3JvcC5jaGlsZHJlbltpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2dyb3AuY2hpbGRyZW5baV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL3BsYW50IGNsaWNrIFxyXG4gICAgb25fcGxhbnRfY2xpY2s6IGZ1bmN0aW9uIChlLCBwbGFudF9pbmRleCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICB0aGlzLmxhbmRfZ3JvdXAuY2hpbGRyZW5bdGhpcy5sYW5kX2luZGV4XS5nZXRDb21wb25lbnQoXCJsYW5kXCIpLnBsYW50KHBsYW50X2luZGV4KTtcclxuICAgICAgICB0aGlzLm9uX3RvdWNoX2V4aXRfY2xpY2soKTtcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19