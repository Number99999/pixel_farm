"use strict";
cc._RF.push(module, '65eace6nBJP0Zhj60rjCfIY', 'user_data');
// script/user_data.js

"use strict";

exports.__esModule = true;
exports["default"] = void 0;
//对象转json数据存储
// cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
//--------------------------------------------------------------------
//读取json数据
//var userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
var user_data = {
  save_date: 0,
  novice: 0,
  gold: 0,
  diamond: 0,
  level: 1,
  now_ex: 0,
  wareHouse_level: 1,
  skill_point: 1,
  login_time: 0,
  sound_state: 1,
  hotel_cache_gold: 0,
  videotape_share_count: 0,
  watch_video: 0,
  auto_sell: 0,
  // tự động bán rau củ
  staff: {
    0: {
      have: 0,
      over_time: 0
    },
    1: {
      have: 0,
      over_time: 0
    },
    2: {
      have: 0,
      over_time: 0
    },
    3: {
      have: 0,
      over_time: 0
    },
    4: {
      have: 0,
      over_time: 0
    },
    5: {
      have: 0,
      over_time: 0
    }
  },
  skill: {
    gold_max: 0,
    speed_the_cut: 0,
    water_saving: 0,
    tool_improve: 0,
    labor_contract: 0,
    offline_profit: 1
  },
  pet: {
    0: {
      have: 0,
      have_ad: 0
    },
    1: {
      have: 0,
      have_ad: 0
    },
    2: {
      have: 0,
      have_ad: 1,
      create_time: 0,
      share_count: 0
    },
    3: {
      have: 0,
      have_ad: 1,
      create_time: 0,
      share_count: 0
    }
  },
  //商人
  trader: {
    recipes: 0
  },
  land: {
    0: {
      land_state: "wait_till",
      have: 1,
      plant_type: 0,
      alive_stage: 0,
      water_num: 50,
      have_water: 1
    },
    1: {
      land_state: "wait_till",
      have: 0,
      plant_type: 0,
      alive_stage: 0,
      water_num: 50,
      have_water: 1
    },
    2: {
      land_state: "wait_till",
      have: 0,
      plant_type: 0,
      alive_stage: 0,
      water_num: 50,
      have_water: 1
    },
    3: {
      land_state: "wait_till",
      have: 0,
      plant_type: 0,
      alive_stage: 0,
      water_num: 50,
      have_water: 1
    },
    4: {
      land_state: "wait_till",
      have: 0,
      plant_type: 0,
      alive_stage: 0,
      water_num: 50,
      have_water: 1
    },
    5: {
      land_state: "wait_till",
      have: 0,
      plant_type: 0,
      alive_stage: 0,
      water_num: 50,
      have_water: 1
    }
  },
  wareHouse: {
    0: {
      have: 1,
      type_buy: 'gold',
      cost: 0,
      id_product: 8,
      count: 0
    },
    1: {
      have: 1,
      type_buy: 'gold',
      cost: 0,
      id_product: 8,
      count: 0
    },
    2: {
      have: 1,
      type_buy: 'gold',
      cost: 0,
      id_product: 8,
      count: 0
    },
    3: {
      have: 0,
      type_buy: 'gold',
      cost: 5000,
      id_product: 8,
      count: 0
    },
    4: {
      have: 0,
      type_buy: 'gold',
      cost: 8000,
      id_product: 8,
      count: 0
    },
    5: {
      have: 0,
      type_buy: 'gold',
      cost: 12000,
      id_product: 8,
      count: 0
    },
    6: {
      have: 0,
      type_buy: 'gold',
      cost: 20000,
      id_product: 8,
      count: 0
    },
    7: {
      have: 0,
      type_buy: 'gold',
      cost: 30000,
      id_product: 8,
      count: 0
    },
    8: {
      have: 0,
      type_buy: 'diamond',
      cost: 10,
      id_product: 8,
      count: 0
    },
    9: {
      have: 0,
      type_buy: 'diamond',
      cost: 20,
      id_product: 8,
      count: 0
    },
    10: {
      have: 0,
      type_buy: 'diamond',
      cost: 40,
      id_product: 8,
      count: 0
    },
    11: {
      have: 0,
      type_buy: 'diamond',
      cost: 60,
      id_product: 8,
      count: 0
    },
    12: {
      have: 0,
      type_buy: 'diamond',
      cost: 80,
      id_product: 8,
      count: 0
    },
    13: {
      have: 0,
      type_buy: 'diamond',
      cost: 100,
      id_product: 8,
      count: 0
    },
    14: {
      have: 0,
      type_buy: 'diamond',
      cost: 120,
      id_product: 8,
      count: 0
    },
    15: {
      have: 0,
      type_buy: 'diamond',
      cost: 140,
      id_product: 8,
      count: 0
    },
    16: {
      have: 0,
      type_buy: 'diamond',
      cost: 160,
      id_product: 8,
      count: 0
    },
    17: {
      have: 0,
      type_buy: 'diamond',
      cost: 180,
      id_product: 8,
      count: 0
    },
    18: {
      have: 0,
      type_buy: 'diamond',
      cost: 200,
      id_product: 8,
      count: 0
    },
    19: {
      have: 0,
      type_buy: 'diamond',
      cost: 220,
      id_product: 8,
      count: 0
    },
    20: {
      have: 0,
      type_buy: 'diamond',
      cost: 240,
      id_product: 8,
      count: 0
    },
    21: {
      have: 0,
      type_buy: 'diamond',
      cost: 260,
      id_product: 8,
      count: 0
    },
    22: {
      have: 0,
      type_buy: 'diamond',
      cost: 280,
      id_product: 8,
      count: 0
    },
    23: {
      have: 0,
      type_buy: 'diamond',
      cost: 300,
      id_product: 8,
      count: 0
    },
    24: {
      have: 0,
      type_buy: 'diamond',
      cost: 320,
      id_product: 8,
      count: 0
    },
    25: {
      have: 0,
      type_buy: 'diamond',
      cost: 340,
      id_product: 8,
      count: 0
    },
    26: {
      have: 0,
      type_buy: 'diamond',
      cost: 360,
      id_product: 8,
      count: 0
    },
    27: {
      have: 0,
      type_buy: 'diamond',
      cost: 380,
      id_product: 8,
      count: 0
    },
    28: {
      have: 0,
      type_buy: 'diamond',
      cost: 400,
      id_product: 8,
      count: 0
    },
    29: {
      have: 0,
      type_buy: 'diamond',
      cost: 420,
      id_product: 8,
      count: 0
    }
  },
  plant: {
    0: {
      have: 1
    },
    1: {
      have: 0
    },
    2: {
      have: 0
    },
    3: {
      have: 0
    },
    4: {
      have: 0
    },
    5: {
      have: 0
    },
    6: {
      have: 0
    },
    7: {
      have: 0
    }
  },
  hotel: {
    0: {
      have: 0,
      start_time: 0
    },
    1: {
      have: 0,
      start_time: 0
    },
    2: {
      have: 0,
      start_time: 0
    },
    3: {
      have: 0,
      start_time: 0
    }
  }
};
var _default = {
  user_data: user_data
};
exports["default"] = _default;
module.exports = exports["default"];

cc._RF.pop();