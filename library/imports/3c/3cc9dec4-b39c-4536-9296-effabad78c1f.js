"use strict";
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