
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/config/config.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3cc9d7Es5xFNpKW7/q614wf', 'config');
// script/config/config.js

"use strict";

module.exports = {
  ad_state: 1,
  //广告开关
  all_water_num: 50,
  till_time: 5,
  wareHouse: {
    all_capacity: 30
  },
  videotape_share_max: 5,
  staff: {
    0: {
      name: "Alice",
      introduce: "Dream of owning \nyour own farm, \nbelieve it or not",
      work_time: 120,
      rest_time: 220,
      cost: 30
    },
    1: {
      name: "Norman",
      introduce: "It's impossible to \nwork part-time, it's impossible to work \npart-time in this life",
      work_time: 125,
      rest_time: 225,
      cost: 60
    },
    2: {
      name: "Peter",
      introduce: "I'm creater of this\ngame",
      work_time: 130,
      rest_time: 230,
      cost: 600
    },
    3: {
      name: "Samatha",
      introduce: "Supper cute",
      work_time: 135,
      rest_time: 235,
      cost: 2400
    },
    4: {
      name: "Richad",
      introduce: "A simp lord :))",
      work_time: 140,
      rest_time: 240,
      cost: 12000
    },
    5: {
      name: "Owen",
      introduce: "Why can't i meet my grandma",
      work_time: 145,
      rest_time: 245,
      cost: 24000
    }
  },
  iap_gold: {
    0: {
      amount: 5000,
      bonus: 0,
      cost: 0.99
    },
    1: {
      amount: 10000,
      bonus: 500,
      cost: 1.99
    },
    2: {
      amount: 25000,
      bonus: 2000,
      cost: 4.99
    },
    3: {
      amount: 50000,
      bonus: 6000,
      cost: 9.99
    },
    4: {
      amount: 100000,
      bonus: 18000,
      cost: 19.99
    },
    5: {
      amount: 200000,
      bonus: 50000,
      cost: 39.99
    }
  },
  iap_diamond: {
    0: {
      amount: 50,
      bonus: 0,
      cost: 0.99
    },
    1: {
      amount: 100,
      bonus: 5,
      cost: 1.99
    },
    2: {
      amount: 250,
      bonus: 25,
      cost: 4.99
    },
    3: {
      amount: 500,
      bonus: 100,
      cost: 9.99
    },
    4: {
      amount: 1000,
      bonus: 300,
      cost: 19.99
    },
    5: {
      amount: 2000,
      bonus: 800,
      cost: 39.99
    }
  },
  plant: {
    0: {
      name: "Potato",
      introduce: "Rich in dietary fiber",
      cost: 0,
      grow_time: 20,
      cut_time: 5,
      plant_time: 5,
      sell: 10,
      need_level: 1,
      exp: 1
    },
    1: {
      name: "Cabbage",
      introduce: "Enhance the body's anti-cancer ability",
      cost: 300,
      grow_time: 30,
      cut_time: 7,
      plant_time: 10,
      sell: 15,
      need_level: 5,
      exp: 1
    },
    2: {
      name: "Turnip",
      introduce: "Thousands of years of cultivation history",
      cost: 500,
      grow_time: 40,
      cut_time: 9,
      plant_time: 15,
      sell: 20,
      need_level: 10,
      exp: 2
    },
    3: {
      name: "Tomato",
      introduce: "The fruit is rich in nutrients",
      cost: 1000,
      grow_time: 50,
      cut_time: 11,
      plant_time: 20,
      sell: 25,
      need_level: 15,
      exp: 2
    },
    4: {
      name: "Cucumber",
      introduce: "Good for health",
      cost: 3000,
      grow_time: 60,
      cut_time: 13,
      plant_time: 25,
      sell: 30,
      need_level: 20,
      exp: 3
    },
    5: {
      name: "Strawberry",
      introduce: "Rich in nutritional value",
      cost: 5000,
      grow_time: 70,
      cut_time: 15,
      plant_time: 30,
      sell: 35,
      need_level: 25,
      exp: 3
    },
    6: {
      name: "Broccoli",
      introduce: "Known as the \"vegetable crown\"",
      cost: 10000,
      grow_time: 80,
      cut_time: 17,
      plant_time: 30,
      sell: 45,
      need_level: 35,
      exp: 4
    },
    7: {
      name: "Corn",
      introduce: "The most productive crop in the world",
      cost: 20000,
      grow_time: 90,
      cut_time: 20,
      plant_time: 30,
      sell: 60,
      need_level: 45,
      exp: 4
    }
  },
  land: {
    0: {
      name: "Land No.1",
      cost: 0,
      need_level: 1
    },
    1: {
      name: "Land No.2",
      cost: 50,
      need_level: 3
    },
    2: {
      name: "Land No.3",
      cost: 500,
      need_level: 15
    },
    3: {
      name: "Land No.4",
      cost: 2500,
      need_level: 25
    },
    4: {
      name: "Land No.5",
      cost: 10000,
      need_level: 35
    },
    5: {
      name: "Land No.6",
      cost: 30000,
      need_level: 50
    }
  },
  //商人
  trader: {
    cooker: {
      recipes: 0,
      need_level: 1
    }
  },
  pet: {
    0: {
      name: "Dog",
      introduce: "A cute dog",
      skill_introduce: "Every 60 seconds, give the player 3 exp",
      need_ad: 5,
      produce_ex: 3,
      produce_ex_time: 60,
      cost: 500,
      type_buy: "gold",
      stay_time: 300,
      get_type: "ad"
    },
    1: {
      name: "Gray cat",
      introduce: "A cute dog",
      skill_introduce: "Every 80 seconds, give the player 5 exp",
      need_ad: 10,
      produce_ex: 5,
      produce_ex_time: 80,
      cost: 700,
      type_buy: "gold",
      stay_time: 300,
      get_type: "ad"
    },
    2: {
      name: "Yellow dog",
      introduce: "Little Eight's brother will stay for 300s",
      skill_introduce: "Every 60 seconds, give the player 3 exp",
      need_ad: 1,
      produce_ex: 5,
      produce_ex_time: 80,
      get_type: "share",
      cost: 500,
      type_buy: "gold",
      stay_time: 300,
      share_max: 3
    },
    3: {
      name: "Yellow cat",
      introduce: "The white rabbit will only stay for 400s",
      skill_introduce: "Every 80 seconds, give the player 5 exp",
      need_ad: 1,
      produce_ex: 5,
      produce_ex_time: 80,
      get_type: "share",
      cost: 700,
      type_buy: "gold",
      stay_time: 400,
      share_max: 3
    }
  },
  hotel: {
    0: {
      need_level: 5,
      produce: 3,
      produce_time: 30,
      cost: 200
    },
    1: {
      need_level: 10,
      produce: 5,
      produce_time: 60,
      cost: 1000
    },
    2: {
      need_level: 15,
      produce: 10,
      produce_time: 80,
      cost: 5000
    },
    3: {
      need_level: 25,
      produce: 15,
      produce_time: 120,
      cost: 20000
    }
  }
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxjb25maWdcXGNvbmZpZy5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiYWRfc3RhdGUiLCJhbGxfd2F0ZXJfbnVtIiwidGlsbF90aW1lIiwid2FyZUhvdXNlIiwiYWxsX2NhcGFjaXR5IiwidmlkZW90YXBlX3NoYXJlX21heCIsInN0YWZmIiwibmFtZSIsImludHJvZHVjZSIsIndvcmtfdGltZSIsInJlc3RfdGltZSIsImNvc3QiLCJpYXBfZ29sZCIsImFtb3VudCIsImJvbnVzIiwiaWFwX2RpYW1vbmQiLCJwbGFudCIsImdyb3dfdGltZSIsImN1dF90aW1lIiwicGxhbnRfdGltZSIsInNlbGwiLCJuZWVkX2xldmVsIiwiZXhwIiwibGFuZCIsInRyYWRlciIsImNvb2tlciIsInJlY2lwZXMiLCJwZXQiLCJza2lsbF9pbnRyb2R1Y2UiLCJuZWVkX2FkIiwicHJvZHVjZV9leCIsInByb2R1Y2VfZXhfdGltZSIsInR5cGVfYnV5Iiwic3RheV90aW1lIiwiZ2V0X3R5cGUiLCJzaGFyZV9tYXgiLCJob3RlbCIsInByb2R1Y2UiLCJwcm9kdWNlX3RpbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNiQyxFQUFBQSxRQUFRLEVBQUUsQ0FERztBQUNHO0FBQ2hCQyxFQUFBQSxhQUFhLEVBQUUsRUFGRjtBQUdiQyxFQUFBQSxTQUFTLEVBQUUsQ0FIRTtBQUliQyxFQUFBQSxTQUFTLEVBQUU7QUFDUEMsSUFBQUEsWUFBWSxFQUFFO0FBRFAsR0FKRTtBQU9iQyxFQUFBQSxtQkFBbUIsRUFBRSxDQVBSO0FBUWJDLEVBQUFBLEtBQUssRUFBRTtBQUNILE9BQUc7QUFDQ0MsTUFBQUEsSUFBSSxFQUFFLE9BRFA7QUFFQ0MsTUFBQUEsU0FBUyxFQUFFLHNEQUZaO0FBR0NDLE1BQUFBLFNBQVMsRUFBRSxHQUhaO0FBSUNDLE1BQUFBLFNBQVMsRUFBRSxHQUpaO0FBS0ND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Z0IsTUFBQUEsT0FBTyxFQUFFLENBRlY7QUFHQ0MsTUFBQUEsWUFBWSxFQUFFLEVBSGY7QUFJQzNCLE1BQUFBLElBQUksRUFBRTtBQUpQLEtBUEE7QUFhSCxPQUFHO0FBQ0NVLE1BQUFBLFVBQVUsRUFBRSxFQURiO0FBRUNnQixNQUFBQSxPQUFPLEVBQUUsRUFGVjtBQUdDQyxNQUFBQSxZQUFZLEVBQUUsRUFIZjtBQUlDM0IsTUFBQUEsSUFBSSxFQUFFO0FBSlAsS0FiQTtBQW1CSCxPQUFHO0FBQ0NVLE1BQUFBLFVBQVUsRUFBRSxFQURiO0FBRUNnQixNQUFBQSxPQUFPLEVBQUUsRUFGVjtBQUdDQyxNQUFBQSxZQUFZLEVBQUUsR0FIZjtBQUlDM0IsTUFBQUEsSUFBSSxFQUFFO0FBSlA7QUFuQkE7QUExU00sQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgYWRfc3RhdGU6IDEsICAgIC8v5bm/5ZGK5byA5YWzXHJcbiAgICBhbGxfd2F0ZXJfbnVtOiA1MCxcclxuICAgIHRpbGxfdGltZTogNSxcclxuICAgIHdhcmVIb3VzZToge1xyXG4gICAgICAgIGFsbF9jYXBhY2l0eTogMzAsXHJcbiAgICB9LFxyXG4gICAgdmlkZW90YXBlX3NoYXJlX21heDogNSxcclxuICAgIHN0YWZmOiB7XHJcbiAgICAgICAgMDoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkFsaWNlXCIsXHJcbiAgICAgICAgICAgIGludHJvZHVjZTogXCJEcmVhbSBvZiBvd25pbmcgXFxueW91ciBvd24gZmFybSwgXFxuYmVsaWV2ZSBpdCBvciBub3RcIixcclxuICAgICAgICAgICAgd29ya190aW1lOiAxMjAsXHJcbiAgICAgICAgICAgIHJlc3RfdGltZTogMjIwLFxyXG4gICAgICAgICAgICBjb3N0OiAzMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDE6IHtcclxuICAgICAgICAgICAgbmFtZTogXCJOb3JtYW5cIixcclxuICAgICAgICAgICAgaW50cm9kdWNlOiBcIkl0J3MgaW1wb3NzaWJsZSB0byBcXG53b3JrIHBhcnQtdGltZSwgaXQncyBpbXBvc3NpYmxlIHRvIHdvcmsgXFxucGFydC10aW1lIGluIHRoaXMgbGlmZVwiLFxyXG4gICAgICAgICAgICB3b3JrX3RpbWU6IDEyNSxcclxuICAgICAgICAgICAgcmVzdF90aW1lOiAyMjUsXHJcbiAgICAgICAgICAgIGNvc3Q6IDYwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlBldGVyXCIsXHJcbiAgICAgICAgICAgIGludHJvZHVjZTogXCJJJ20gY3JlYXRlciBvZiB0aGlzXFxuZ2FtZVwiLFxyXG4gICAgICAgICAgICB3b3JrX3RpbWU6IDEzMCxcclxuICAgICAgICAgICAgcmVzdF90aW1lOiAyMzAsXHJcbiAgICAgICAgICAgIGNvc3Q6IDYwMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDM6IHtcclxuICAgICAgICAgICAgbmFtZTogXCJTYW1hdGhhXCIsXHJcbiAgICAgICAgICAgIGludHJvZHVjZTogXCJTdXBwZXIgY3V0ZVwiLFxyXG4gICAgICAgICAgICB3b3JrX3RpbWU6IDEzNSxcclxuICAgICAgICAgICAgcmVzdF90aW1lOiAyMzUsXHJcbiAgICAgICAgICAgIGNvc3Q6IDI0MDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICA0OiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiUmljaGFkXCIsXHJcbiAgICAgICAgICAgIGludHJvZHVjZTogXCJBIHNpbXAgbG9yZCA6KSlcIixcclxuICAgICAgICAgICAgd29ya190aW1lOiAxNDAsXHJcbiAgICAgICAgICAgIHJlc3RfdGltZTogMjQwLFxyXG4gICAgICAgICAgICBjb3N0OiAxMjAwMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDU6IHtcclxuICAgICAgICAgICAgbmFtZTogXCJPd2VuXCIsXHJcbiAgICAgICAgICAgIGludHJvZHVjZTogXCJXaHkgY2FuJ3QgaSBtZWV0IG15IGdyYW5kbWFcIixcclxuICAgICAgICAgICAgd29ya190aW1lOiAxNDUsXHJcbiAgICAgICAgICAgIHJlc3RfdGltZTogMjQ1LFxyXG4gICAgICAgICAgICBjb3N0OiAyNDAwMCxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIGlhcF9nb2xkOiB7XHJcbiAgICAgICAgMDoge1xyXG4gICAgICAgICAgICBhbW91bnQ6IDUwMDAsXHJcbiAgICAgICAgICAgIGJvbnVzOiAwLFxyXG4gICAgICAgICAgICBjb3N0OiAwLjk5LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMToge1xyXG4gICAgICAgICAgICBhbW91bnQ6IDEwMDAwLFxyXG4gICAgICAgICAgICBib251czogNTAwLFxyXG4gICAgICAgICAgICBjb3N0OiAxLjk5LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMjoge1xyXG4gICAgICAgICAgICBhbW91bnQ6IDI1MDAwLFxyXG4gICAgICAgICAgICBib251czogMjAwMCxcclxuICAgICAgICAgICAgY29zdDogNC45OSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDM6IHtcclxuICAgICAgICAgICAgYW1vdW50OiA1MDAwMCxcclxuICAgICAgICAgICAgYm9udXM6IDYwMDAsXHJcbiAgICAgICAgICAgIGNvc3Q6IDkuOTksXHJcbiAgICAgICAgfSxcclxuICAgICAgICA0OiB7XHJcbiAgICAgICAgICAgIGFtb3VudDogMTAwMDAwLFxyXG4gICAgICAgICAgICBib251czogMTgwMDAsXHJcbiAgICAgICAgICAgIGNvc3Q6IDE5Ljk5LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgNToge1xyXG4gICAgICAgICAgICBhbW91bnQ6IDIwMDAwMCxcclxuICAgICAgICAgICAgYm9udXM6IDUwMDAwLFxyXG4gICAgICAgICAgICBjb3N0OiAzOS45OSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIGlhcF9kaWFtb25kOiB7XHJcbiAgICAgICAgMDoge1xyXG4gICAgICAgICAgICBhbW91bnQ6IDUwLFxyXG4gICAgICAgICAgICBib251czogMCxcclxuICAgICAgICAgICAgY29zdDogMC45OSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDE6IHtcclxuICAgICAgICAgICAgYW1vdW50OiAxMDAsXHJcbiAgICAgICAgICAgIGJvbnVzOiA1LFxyXG4gICAgICAgICAgICBjb3N0OiAxLjk5LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMjoge1xyXG4gICAgICAgICAgICBhbW91bnQ6IDI1MCxcclxuICAgICAgICAgICAgYm9udXM6IDI1LFxyXG4gICAgICAgICAgICBjb3N0OiA0Ljk5LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMzoge1xyXG4gICAgICAgICAgICBhbW91bnQ6IDUwMCxcclxuICAgICAgICAgICAgYm9udXM6IDEwMCxcclxuICAgICAgICAgICAgY29zdDogOS45OSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDQ6IHtcclxuICAgICAgICAgICAgYW1vdW50OiAxMDAwLFxyXG4gICAgICAgICAgICBib251czogMzAwLFxyXG4gICAgICAgICAgICBjb3N0OiAxOS45OSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDU6IHtcclxuICAgICAgICAgICAgYW1vdW50OiAyMDAwLFxyXG4gICAgICAgICAgICBib251czogODAwLFxyXG4gICAgICAgICAgICBjb3N0OiAzOS45OSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIHBsYW50OiB7XHJcbiAgICAgICAgMDoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlBvdGF0b1wiLFxyXG4gICAgICAgICAgICBpbnRyb2R1Y2U6IFwiUmljaCBpbiBkaWV0YXJ5IGZpYmVyXCIsXHJcbiAgICAgICAgICAgIGNvc3Q6IDAsXHJcbiAgICAgICAgICAgIGdyb3dfdGltZTogMjAsXHJcbiAgICAgICAgICAgIGN1dF90aW1lOiA1LFxyXG4gICAgICAgICAgICBwbGFudF90aW1lOiA1LFxyXG4gICAgICAgICAgICBzZWxsOiAxMCxcclxuICAgICAgICAgICAgbmVlZF9sZXZlbDogMSxcclxuICAgICAgICAgICAgZXhwOiAxLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMToge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkNhYmJhZ2VcIixcclxuICAgICAgICAgICAgaW50cm9kdWNlOiBcIkVuaGFuY2UgdGhlIGJvZHkncyBhbnRpLWNhbmNlciBhYmlsaXR5XCIsXHJcbiAgICAgICAgICAgIGNvc3Q6IDMwMCxcclxuICAgICAgICAgICAgZ3Jvd190aW1lOiAzMCxcclxuICAgICAgICAgICAgY3V0X3RpbWU6IDcsXHJcbiAgICAgICAgICAgIHBsYW50X3RpbWU6IDEwLFxyXG4gICAgICAgICAgICBzZWxsOiAxNSxcclxuICAgICAgICAgICAgbmVlZF9sZXZlbDogNSxcclxuICAgICAgICAgICAgZXhwOiAxLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlR1cm5pcFwiLFxyXG4gICAgICAgICAgICBpbnRyb2R1Y2U6IFwiVGhvdXNhbmRzIG9mIHllYXJzIG9mIGN1bHRpdmF0aW9uIGhpc3RvcnlcIixcclxuICAgICAgICAgICAgY29zdDogNTAwLFxyXG4gICAgICAgICAgICBncm93X3RpbWU6IDQwLFxyXG4gICAgICAgICAgICBjdXRfdGltZTogOSxcclxuICAgICAgICAgICAgcGxhbnRfdGltZTogMTUsXHJcbiAgICAgICAgICAgIHNlbGw6IDIwLFxyXG4gICAgICAgICAgICBuZWVkX2xldmVsOiAxMCxcclxuICAgICAgICAgICAgZXhwOiAyLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMzoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlRvbWF0b1wiLFxyXG4gICAgICAgICAgICBpbnRyb2R1Y2U6IFwiVGhlIGZydWl0IGlzIHJpY2ggaW4gbnV0cmllbnRzXCIsXHJcbiAgICAgICAgICAgIGNvc3Q6IDEwMDAsXHJcbiAgICAgICAgICAgIGdyb3dfdGltZTogNTAsXHJcbiAgICAgICAgICAgIGN1dF90aW1lOiAxMSxcclxuICAgICAgICAgICAgcGxhbnRfdGltZTogMjAsXHJcbiAgICAgICAgICAgIHNlbGw6IDI1LFxyXG4gICAgICAgICAgICBuZWVkX2xldmVsOiAxNSxcclxuICAgICAgICAgICAgZXhwOiAyLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgNDoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkN1Y3VtYmVyXCIsXHJcbiAgICAgICAgICAgIGludHJvZHVjZTogXCJHb29kIGZvciBoZWFsdGhcIixcclxuICAgICAgICAgICAgY29zdDogMzAwMCxcclxuICAgICAgICAgICAgZ3Jvd190aW1lOiA2MCxcclxuICAgICAgICAgICAgY3V0X3RpbWU6IDEzLFxyXG4gICAgICAgICAgICBwbGFudF90aW1lOiAyNSxcclxuICAgICAgICAgICAgc2VsbDogMzAsXHJcbiAgICAgICAgICAgIG5lZWRfbGV2ZWw6IDIwLFxyXG4gICAgICAgICAgICBleHA6IDMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICA1OiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiU3RyYXdiZXJyeVwiLFxyXG4gICAgICAgICAgICBpbnRyb2R1Y2U6IFwiUmljaCBpbiBudXRyaXRpb25hbCB2YWx1ZVwiLFxyXG4gICAgICAgICAgICBjb3N0OiA1MDAwLFxyXG4gICAgICAgICAgICBncm93X3RpbWU6IDcwLFxyXG4gICAgICAgICAgICBjdXRfdGltZTogMTUsXHJcbiAgICAgICAgICAgIHBsYW50X3RpbWU6IDMwLFxyXG4gICAgICAgICAgICBzZWxsOiAzNSxcclxuICAgICAgICAgICAgbmVlZF9sZXZlbDogMjUsXHJcbiAgICAgICAgICAgIGV4cDogMyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDY6IHtcclxuICAgICAgICAgICAgbmFtZTogXCJCcm9jY29saVwiLFxyXG4gICAgICAgICAgICBpbnRyb2R1Y2U6IFwiS25vd24gYXMgdGhlIFxcXCJ2ZWdldGFibGUgY3Jvd25cXFwiXCIsXHJcbiAgICAgICAgICAgIGNvc3Q6IDEwMDAwLFxyXG4gICAgICAgICAgICBncm93X3RpbWU6IDgwLFxyXG4gICAgICAgICAgICBjdXRfdGltZTogMTcsXHJcbiAgICAgICAgICAgIHBsYW50X3RpbWU6IDMwLFxyXG4gICAgICAgICAgICBzZWxsOiA0NSxcclxuICAgICAgICAgICAgbmVlZF9sZXZlbDogMzUsXHJcbiAgICAgICAgICAgIGV4cDogNFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgNzoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkNvcm5cIixcclxuICAgICAgICAgICAgaW50cm9kdWNlOiBcIlRoZSBtb3N0IHByb2R1Y3RpdmUgY3JvcCBpbiB0aGUgd29ybGRcIixcclxuICAgICAgICAgICAgY29zdDogMjAwMDAsXHJcbiAgICAgICAgICAgIGdyb3dfdGltZTogOTAsXHJcbiAgICAgICAgICAgIGN1dF90aW1lOiAyMCxcclxuICAgICAgICAgICAgcGxhbnRfdGltZTogMzAsXHJcbiAgICAgICAgICAgIHNlbGw6IDYwLFxyXG4gICAgICAgICAgICBuZWVkX2xldmVsOiA0NSxcclxuICAgICAgICAgICAgZXhwOiA0LFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgbGFuZDoge1xyXG4gICAgICAgIDA6IHtcclxuICAgICAgICAgICAgbmFtZTogXCJMYW5kIE5vLjFcIixcclxuICAgICAgICAgICAgY29zdDogMCxcclxuICAgICAgICAgICAgbmVlZF9sZXZlbDogMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDE6IHtcclxuICAgICAgICAgICAgbmFtZTogXCJMYW5kIE5vLjJcIixcclxuICAgICAgICAgICAgY29zdDogNTAsXHJcbiAgICAgICAgICAgIG5lZWRfbGV2ZWw6IDMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAyOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiTGFuZCBOby4zXCIsXHJcbiAgICAgICAgICAgIGNvc3Q6IDUwMCxcclxuICAgICAgICAgICAgbmVlZF9sZXZlbDogMTUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAzOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiTGFuZCBOby40XCIsXHJcbiAgICAgICAgICAgIGNvc3Q6IDI1MDAsXHJcbiAgICAgICAgICAgIG5lZWRfbGV2ZWw6IDI1LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgNDoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkxhbmQgTm8uNVwiLFxyXG4gICAgICAgICAgICBjb3N0OiAxMDAwMCxcclxuICAgICAgICAgICAgbmVlZF9sZXZlbDogMzUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICA1OiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiTGFuZCBOby42XCIsXHJcbiAgICAgICAgICAgIGNvc3Q6IDMwMDAwLFxyXG4gICAgICAgICAgICBuZWVkX2xldmVsOiA1MCxcclxuICAgICAgICB9LFxyXG5cclxuICAgIH0sXHJcbiAgICAvL+WVhuS6ulxyXG4gICAgdHJhZGVyOiB7XHJcbiAgICAgICAgY29va2VyOiB7XHJcbiAgICAgICAgICAgIHJlY2lwZXM6IDAsXHJcbiAgICAgICAgICAgIG5lZWRfbGV2ZWw6IDEsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBwZXQ6IHtcclxuICAgICAgICAwOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiRG9nXCIsXHJcbiAgICAgICAgICAgIGludHJvZHVjZTogXCJBIGN1dGUgZG9nXCIsXHJcbiAgICAgICAgICAgIHNraWxsX2ludHJvZHVjZTogXCJFdmVyeSA2MCBzZWNvbmRzLCBnaXZlIHRoZSBwbGF5ZXIgMyBleHBcIixcclxuICAgICAgICAgICAgbmVlZF9hZDogNSxcclxuICAgICAgICAgICAgcHJvZHVjZV9leDogMyxcclxuICAgICAgICAgICAgcHJvZHVjZV9leF90aW1lOiA2MCxcclxuICAgICAgICAgICAgY29zdDogNTAwLFxyXG4gICAgICAgICAgICB0eXBlX2J1eTogXCJnb2xkXCIsXHJcbiAgICAgICAgICAgIHN0YXlfdGltZTogMzAwLFxyXG4gICAgICAgICAgICBnZXRfdHlwZTogXCJhZFwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMToge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkdyYXkgY2F0XCIsXHJcbiAgICAgICAgICAgIGludHJvZHVjZTogXCJBIGN1dGUgZG9nXCIsXHJcbiAgICAgICAgICAgIHNraWxsX2ludHJvZHVjZTogXCJFdmVyeSA4MCBzZWNvbmRzLCBnaXZlIHRoZSBwbGF5ZXIgNSBleHBcIixcclxuICAgICAgICAgICAgbmVlZF9hZDogMTAsXHJcbiAgICAgICAgICAgIHByb2R1Y2VfZXg6IDUsXHJcbiAgICAgICAgICAgIHByb2R1Y2VfZXhfdGltZTogODAsXHJcbiAgICAgICAgICAgIGNvc3Q6IDcwMCxcclxuICAgICAgICAgICAgdHlwZV9idXk6IFwiZ29sZFwiLFxyXG4gICAgICAgICAgICBzdGF5X3RpbWU6IDMwMCxcclxuICAgICAgICAgICAgZ2V0X3R5cGU6IFwiYWRcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIDI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCJZZWxsb3cgZG9nXCIsXHJcbiAgICAgICAgICAgIGludHJvZHVjZTogXCJMaXR0bGUgRWlnaHQncyBicm90aGVyIHdpbGwgc3RheSBmb3IgMzAwc1wiLFxyXG4gICAgICAgICAgICBza2lsbF9pbnRyb2R1Y2U6IFwiRXZlcnkgNjAgc2Vjb25kcywgZ2l2ZSB0aGUgcGxheWVyIDMgZXhwXCIsXHJcbiAgICAgICAgICAgIG5lZWRfYWQ6IDEsXHJcbiAgICAgICAgICAgIHByb2R1Y2VfZXg6IDUsXHJcbiAgICAgICAgICAgIHByb2R1Y2VfZXhfdGltZTogODAsXHJcbiAgICAgICAgICAgIGdldF90eXBlOiBcInNoYXJlXCIsXHJcbiAgICAgICAgICAgIGNvc3Q6IDUwMCxcclxuICAgICAgICAgICAgdHlwZV9idXk6IFwiZ29sZFwiLFxyXG4gICAgICAgICAgICBzdGF5X3RpbWU6IDMwMCxcclxuICAgICAgICAgICAgc2hhcmVfbWF4OiAzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMzoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlllbGxvdyBjYXRcIixcclxuICAgICAgICAgICAgaW50cm9kdWNlOiBcIlRoZSB3aGl0ZSByYWJiaXQgd2lsbCBvbmx5IHN0YXkgZm9yIDQwMHNcIixcclxuICAgICAgICAgICAgc2tpbGxfaW50cm9kdWNlOiBcIkV2ZXJ5IDgwIHNlY29uZHMsIGdpdmUgdGhlIHBsYXllciA1IGV4cFwiLFxyXG4gICAgICAgICAgICBuZWVkX2FkOiAxLFxyXG4gICAgICAgICAgICBwcm9kdWNlX2V4OiA1LFxyXG4gICAgICAgICAgICBwcm9kdWNlX2V4X3RpbWU6IDgwLFxyXG4gICAgICAgICAgICBnZXRfdHlwZTogXCJzaGFyZVwiLFxyXG4gICAgICAgICAgICBjb3N0OiA3MDAsXHJcbiAgICAgICAgICAgIHR5cGVfYnV5OiBcImdvbGRcIixcclxuICAgICAgICAgICAgc3RheV90aW1lOiA0MDAsXHJcbiAgICAgICAgICAgIHNoYXJlX21heDogMyxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIGhvdGVsOiB7XHJcbiAgICAgICAgMDoge1xyXG4gICAgICAgICAgICBuZWVkX2xldmVsOiA1LFxyXG4gICAgICAgICAgICBwcm9kdWNlOiAzLFxyXG4gICAgICAgICAgICBwcm9kdWNlX3RpbWU6IDMwLFxyXG4gICAgICAgICAgICBjb3N0OiAyMDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAxOiB7XHJcbiAgICAgICAgICAgIG5lZWRfbGV2ZWw6IDEwLFxyXG4gICAgICAgICAgICBwcm9kdWNlOiA1LFxyXG4gICAgICAgICAgICBwcm9kdWNlX3RpbWU6IDYwLFxyXG4gICAgICAgICAgICBjb3N0OiAxMDAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMjoge1xyXG4gICAgICAgICAgICBuZWVkX2xldmVsOiAxNSxcclxuICAgICAgICAgICAgcHJvZHVjZTogMTAsXHJcbiAgICAgICAgICAgIHByb2R1Y2VfdGltZTogODAsXHJcbiAgICAgICAgICAgIGNvc3Q6IDUwMDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAzOiB7XHJcbiAgICAgICAgICAgIG5lZWRfbGV2ZWw6IDI1LFxyXG4gICAgICAgICAgICBwcm9kdWNlOiAxNSxcclxuICAgICAgICAgICAgcHJvZHVjZV90aW1lOiAxMjAsXHJcbiAgICAgICAgICAgIGNvc3Q6IDIwMDAwLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59OyJdfQ==