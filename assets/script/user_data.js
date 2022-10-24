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
    auto_sell: 0,   // tự động bán rau củ
    staff: {
        0: {
            have: 0,
            over_time: 0,
        },
        1: {
            have: 0,
            over_time: 0,
        },
        2: {
            have: 0,
            over_time: 0,
        },
        3: {
            have: 0,
            over_time: 0,
        },
        4: {
            have: 0,
            over_time: 0,
        },
        5: {
            have: 0,
            over_time: 0,
        },
    },
    skill: {
        gold_max: 0,
        speed_the_cut: 0,
        water_saving: 0,
        tool_improve: 0,
        labor_contract: 0,
        offline_profit: 1,
    },
    pet: {
        0: {
            have: 0,
            have_ad: 0,
        },
        1: {
            have: 0,
            have_ad: 0,
        },
        2: {
            have: 0,
            have_ad: 1,
            create_time: 0,
            share_count: 0,
        },
        3: {
            have: 0,
            have_ad: 1,
            create_time: 0,
            share_count: 0,
        },
    },
    //商人
    trader: {
        recipes: 0,
    },
    land: {
        0: {
            land_state: "wait_till",
            have: 1,
            plant_type: 0,
            alive_stage: 0,
            water_num: 50,
            have_water: 1,
        },
        1: {
            land_state: "wait_till",
            have: 0,
            plant_type: 0,
            alive_stage: 0,
            water_num: 50,
            have_water: 1,
        },
        2: {
            land_state: "wait_till",
            have: 0,
            plant_type: 0,
            alive_stage: 0,
            water_num: 50,
            have_water: 1,
        },
        3: {
            land_state: "wait_till",
            have: 0,
            plant_type: 0,
            alive_stage: 0,
            water_num: 50,
            have_water: 1,
        },
        4: {
            land_state: "wait_till",
            have: 0,
            plant_type: 0,
            alive_stage: 0,
            water_num: 50,
            have_water: 1,
        },
        5: {
            land_state: "wait_till",
            have: 0,
            plant_type: 0,
            alive_stage: 0,
            water_num: 50,
            have_water: 1,
        },
    },
    wareHouse: {
        0: {
            have: 1,
            type_bye: 'gold',
            cost: 500,
            id_product: 8,
            count: 0,
        },
        1: {
            have: 1,
            type_bye: 'gold',
            cost: 500,
            id_product: 8,
            count: 0,
        },
        2: {
            have: 1,
            type_bye: 'gold',
            cost: 500,
            id_product: 8,
            count: 0,
        },
        3: {
            have: 0,
            type_bye: 'gold',
            cost: 500,
            id_product: 8,
            count: 0,
        },
        4: {
            have: 0,
            type_bye: 'gold',
            cost: 500,
            id_product: 8,
            count: 0,
        },
        5: {
            have: 0,
            type_bye: 'gold',
            cost: 500,
            id_product: 8,
            count: 0,
        },
        6: {
            have: 0,
            type_bye: 'gold',
            cost: 500,
            id_product: 8,
            count: 0,
        },
        7: {
            have: 0,
            type_bye: 'gold',
            cost: 500,
            id_product: 8,
            count: 0,
        },
        8: {
            have: 0,
            type_bye: 'gold',
            cost: 500,
            id_product: 8,
            count: 0,
        },
        9: {
            have: 0,
            type_bye: 'gold',
            cost: 500,
            id_product: 8,
            count: 0,
        },
        10: {
            have: 0,
            type_bye: 'gold',
            cost: 500,
            id_product: 8,
            count: 0,
        },
        11: {
            have: 0,
            type_bye: 'gold',
            cost: 500,
            id_product: 8,
            count: 0,
        },
        12: {
            have: 0,
            type_bye: 'gold',
            cost: 500,
            id_product: 8,
            count: 0,
        },
        13: {
            have: 0,
            type_bye: 'gold',
            cost: 500,
            id_product: 8,
            count: 0,
        },
        14: {
            have: 0,
            type_bye: 'gold',
            cost: 500,
            id_product: 8,
            count: 0,
        },
        15: {
            have: 0,
            type_bye: 'gold',
            cost: 500,
            id_product: 8,
            count: 0,
        },
        16: {
            have: 0,
            type_bye: 'gold',
            cost: 500,
            id_product: 8,
            count: 0,
        },
        17: {
            have: 0,
            type_bye: 'gold',
            cost: 500,
            id_product: 8,
            count: 0,
        },
        18: {
            have: 0,
            type_bye: 'gold',
            cost: 500,
            id_product: 8,
            count: 0,
        },
        19: {
            have: 0,
            type_bye: 'gold',
            cost: 500,
            id_product: 8,
            count: 0,
        },
    },
    plant: {
        0: {
            have: 1,
        },
        1: {
            have: 0,
        },
        2: {
            have: 0,
        },
        3: {
            have: 0,
        },
        4: {
            have: 0,
        },
        5: {
            have: 0,
        },
        6: {
            have: 0,
        },
        7: {
            have: 0,
        },
    },
    hotel: {
        0: {
            have: 0,
            start_time: 0,
        },
        1: {
            have: 0,
            start_time: 0,
        },
        2: {
            have: 0,
            start_time: 0,
        },
        3: {
            have: 0,
            start_time: 0,
        },
    },
};

export default {
    user_data,
};
