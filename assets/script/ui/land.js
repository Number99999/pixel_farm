var user_data = require("user_data");
var config = require("config");

/*land state :{
    cut :
    till:
    water:
    plant:
    grow :
};*/

cc.Class({
    extends: cc.Component,
    properties: {
        tips_node: cc.Node,
        plant_node: cc.Node,
        plant_progress_node: cc.Node,
        water_progress_node: cc.Node,
        plant_progress_label: cc.Label,
        button: cc.Node,
        button_frame_arr: [cc.SpriteFrame],
        land_frame_arr: [cc.SpriteFrame],
        plant0_frame_arr: [cc.SpriteFrame],
        plant1_frame_arr: [cc.SpriteFrame],
        plant2_frame_arr: [cc.SpriteFrame],
        plant3_frame_arr: [cc.SpriteFrame],
        plant4_frame_arr: [cc.SpriteFrame],
        plant5_frame_arr: [cc.SpriteFrame],
        plant6_frame_arr: [cc.SpriteFrame],
        plant7_frame_arr: [cc.SpriteFrame],
    },

    // LIFE-CYCLE CALLBACKS:

    //设置种植的植物
    set_plant: function () {
        this.plant_node.active = true;
        var alive_stage = user_data.user_data.land[this.land_index].alive_stage;
        for (var i = 0; i < this.plant_node.children.length; i++) {
            this.plant_node.children[i].getComponent(cc.Sprite).spriteFrame = this.plant_frame_arr[this.plant_type][alive_stage];
        };
        this.plant_grow();
    },
    //植物生长
    plant_grow: function () {
        user_data.user_data.land[this.land_index].land_state = "grow"; // note thì growing chạy quá 100%
        var land_state = user_data.user_data.land[this.land_index].land_state;
        this.plant_progress_node.active = true;
        var grow_time = config.plant[this.plant_type].grow_time;
        var now_time = 0;
        var bar = this.plant_progress_node.getComponent(cc.ProgressBar);
        this.watering();
        this.plant_grow_schedule = function () {
            now_time += 0.1 * this.water_buff;
            if (now_time >= grow_time && land_state == "grow") {
                this.unschedule(this.plant_grow_schedule);
                this.plant_progress_label.string = "Waiting for harvest";
                this.wait_next("wait_cut");
                return;
            } else {
                bar.progress = now_time / grow_time;
                var progress_num = parseInt(bar.progress * 100);
                this.plant_progress_label.string = "Growing " + progress_num + "%";
                this.update_plant_alive_stage(progress_num);
                if (progress_num < 25) {
                    for (var i = 0; i < this.plant_node.children.length; i++) {
                        this.plant_node.children[i].getComponent(cc.Sprite).spriteFrame = this.plant_frame_arr[this.plant_type][0];
                    };
                }
                else if (progress_num < 50) {
                    for (var i = 0; i < this.plant_node.children.length; i++) {
                        this.plant_node.children[i].getComponent(cc.Sprite).spriteFrame = this.plant_frame_arr[this.plant_type][1];

                    };
                }
                else if (progress_num < 75) {
                    for (var i = 0; i < this.plant_node.children.length; i++) {
                        this.plant_node.children[i].getComponent(cc.Sprite).spriteFrame = this.plant_frame_arr[this.plant_type][2];
                    };
                }
                else for (var i = 0; i < this.plant_node.children.length; i++) {
                    this.plant_node.children[i].getComponent(cc.Sprite).spriteFrame = this.plant_frame_arr[this.plant_type][3];
                };
            };
        };
        this.schedule(this.plant_grow_schedule, 0.1);
    },
    //更新植物等级
    update_plant_alive_stage: function (progress_num) {
        //2的倍数
        var alive_stage = user_data.user_data.land[this.land_index].alive_stage;
        let plantSprite = this.plant_node.children[this.plant_index].getComponent(cc.Sprite).spriteFrame;
        if (plantSprite) {
            plantSprite = this.plant_frame_arr[this.plant_type][alive_stage];
        };
        if (progress_num >= 25 / 12 * this.plant_count) {
            this.plant_index++;
            this.plant_count++;
            if (this.plant_count > 48) {
                this.plant_count = 48;
            };
            if (this.plant_index > 11) {
                user_data.user_data.land[this.land_index].alive_stage++;
                if (user_data.user_data.land[this.land_index].alive_stage > 3) {
                    user_data.user_data.land[this.land_index].alive_stage = 3;
                };
                this.plant_index = 0;
            };
        };
    },
    //重置植物的生长状态
    rest_plat_alive_stage: function () {
        user_data.user_data.land[this.land_index].alive_stage = 0;
        this.plant_index = 0;
        this.plant_count = 0;
        this.unschedule(this.water_schedule);
        this.unschedule(this.plant_grow_schedule);
        this.set_plant();
    },
    //đợi trạng thái tiếp theo
    wait_next: function (type) {
        this.button.state = type;
        switch (type) {
            case "wait_cut":
                this.button.children[0].getComponent(cc.Sprite).spriteFrame = this.button_frame_arr[0];
                user_data.user_data.land[this.land_index].land_state = "wait_cut";
                break;
            case "plant":
                this.button.children[0].getComponent(cc.Sprite).spriteFrame = this.button_frame_arr[1];
                break;
            case "wait_till":
                this.button.children[0].getComponent(cc.Sprite).spriteFrame = this.button_frame_arr[2];
                break;

        };
        this.button.active = true;
        this.unschedule(this.water_schedule);
    },
    //cutting
    cut: function () {
        if (user_data.user_data.land[this.land_index].land_state !== "wait_cut") {
            return;
        };
        user_data.user_data.land[this.land_index].land_state = "cuting";
        var land_state = user_data.user_data.land[this.land_index].land_state
        this.button.active = false;
        var cut_time = config.plant[this.plant_type].cut_time * (1 - user_data.user_data.skill["speed_the_cut"] / 100);
        var now_time = 0;
        var bar = this.plant_progress_node.getComponent(cc.ProgressBar);
        this.cut_schedule = function () {
            now_time += 0.1;
            if (now_time >= cut_time && land_state == "cuting") {
                now_time = 0;
                user_data.user_data.land[this.land_index].land_state = "cut_over";
                this.sound_control.play_sound_effect("cut_over");
                this.unschedule(this.cut_schedule);
                this.rest_plat_alive_stage();
                var node = this.game_scene_js.create_light_effect(this.node, 1, this.plant_type);

                if (node != null) {
                    node.getComponent("light").ini_node(this.plant_type, this.node);
                };
                return;
            } else {
                bar.progress = now_time / cut_time;
                var progress_num = parseInt(bar.progress * 100);
                this.plant_progress_label.string = "Harvesting " + progress_num + "%";
            };
        };
        this.schedule(this.cut_schedule, 0.1);
    },
    //按钮被点击
    on_button_click: function () {
        this.sound_control.play_sound_effect("button_click");
        switch (this.button.state) {
            case "wait_cut":
                this.cut();
                // console.log("hello 123 cutt"); // harvesting
                break;
            case "plant":
                var node = this.game_scene_js.create_plant_ui(this.game_scene_js.node);
                if (node != null) {
                    node.getComponent("plant_ui").ini_node(this.land_index);
                };
                // console.log("hello plant"); // choose plant 
                break;
            case "wait_till":
                user_data.user_data.land[this.land_index].land_state = "wait_till";
                this.till();
                // console.log("hello 123");   // planting
                break;
            default:
                return;
        };
    },
    //浇水
    watering: function () {
        this.water_buff = 2;
        this.water_progress_node.active = true;
        var all_water = config.all_water_num;
        var bar = this.water_progress_node.getComponent(cc.ProgressBar);
        this.water_schedule = function () {
            if (user_data.user_data.land[this.land_index].land_state == "grow") {
                var water_num = user_data.user_data.land[this.land_index].water_num;
                user_data.user_data.land[this.land_index].water_num -= 0.1 * (1 - user_data.user_data.skill["water_saving"] / 100);
                water_num = user_data.user_data.land[this.land_index].water_num;
                if (user_data.user_data.land[this.land_index].have_water == 0) water_num = 0;
                if (water_num <= 0) {
                    this.unschedule(this.water_schedule);
                    this.water_buff = 1;
                    user_data.user_data.land[this.land_index].have_water = 0;
                    user_data.user_data.land[this.land_index].water_num = 0;
                    // user_data.user_data.land[this.land_index].have_water = 0;   // lưu trạng thái có nước hay k của ô đất
                    // console.log("hello " + user_data.user_data.land[this.land_index].have_water)
                    return;
                } else {
                    if (user_data.user_data.land[this.land_index].have_water == 0) bar.progress = 0;
                    else bar.progress = water_num / all_water;
                };
            } else {
                this.unschedule(this.water_schedule);
                return;
            };
        };
        this.schedule(this.water_schedule, 0.1);
    },
    water_charge: function () {
        if (this.water_state == null) {
            this.unschedule(this.water_schedule);
            this.water_state = "charge";
            var all_water = config.all_water_num;
            var bar = this.water_progress_node.getComponent(cc.ProgressBar);
            user_data.user_data.land[this.land_index].have_water = 1;
            var callback = function () {
                var now_water = user_data.user_data.land[this.land_index].water_num
                user_data.user_data.land[this.land_index].water_num += 1;

                if (now_water >= all_water) {
                    this.unschedule(callback);
                    user_data.user_data.land[this.land_index].water_num = all_water;
                    this.water_state = null;
                    if (user_data.user_data.land[this.land_index].land_state == "cut") {
                        //
                    } else {
                        this.watering();
                    };
                    return;
                };
                bar.progress = now_water / all_water;
            };
            this.schedule(callback, 0.1);
        } else if (this.water_state == "charge") {
            user_data.user_data.land[this.land_index].water_num += 10;
        };
    },
    //初始化节点
    ini_node: function (index) {
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        var have = user_data.user_data.land[index].have;
        this.land_index = index;
        this.plant_type = user_data.user_data.land[this.land_index].plant_type;
        var land_state = user_data.user_data.land[this.land_index].land_state;
        this.plant_index = 0; //植物索引
        this.plant_count = 0; //生长编号
        this.water_buff = 1;  // 初始化水buff
        this.water_state = null;
        this.plant_frame_arr = [
            this.plant0_frame_arr,
            this.plant1_frame_arr,
            this.plant2_frame_arr,
            this.plant3_frame_arr,
            this.plant4_frame_arr,
            this.plant5_frame_arr,
            this.plant6_frame_arr,
            this.plant7_frame_arr,
        ];
        switch (have) {
            case 0:
                this.tips_node.active = true;
                this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[0];
                this.plant_node.active = false;
                this.plant_progress_node.active = false;
                this.water_progress_node.active = false;
                break;
            case 1:
                //till state
                this.tips_node.active = false;
                switch (land_state) {
                    case "wait_till":
                        this.wait_next("wait_till");
                        this.plant_node.active = false;
                        this.plant_progress_node.active = false;
                        this.water_progress_node.active = true;
                        this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[0];
                        // this.wait_next("wait_till");
                        break;
                    case "wait_plant":
                        this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[1];
                        this.plant_progress_node.active = true;
                        this.water_progress_node.active = true;
                        // var bar = this.water_progress_node.getComponent(cc.ProgressBar);
                        // if (user_data.user_data.land[this.land_index].have_water == 0) bar.progress = 0;
                        this.plant_progress_label.string = "Waiting to be planted";
                        this.plant_node.active = false;
                        this.wait_next("plant");
                        break;
                    case "wait_cut":
                        this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[1];
                        this.plant_node.active = true;
                        this.plant_progress_node.active = true;
                        this.water_progress_node.active = true;
                        // var bar = this.water_progress_node.getComponent(cc.ProgressBar);
                        // if (user_data.user_data.land[this.land_index].have_water == 0) bar.progress = 0;
                        this.plant_progress_label.string = "Waiting for harvest";
                        this.plant_progress_node.getComponent(cc.ProgressBar).progress = 1;
                        for (var i = 0; i < this.plant_node.children.length; i++) {
                            this.plant_node.children[i].getComponent(cc.Sprite).spriteFrame = this.plant_frame_arr[this.plant_type][3];
                        };
                        this.wait_next("wait_cut");
                        // console.log(land_state + " hello");
                        break;
                    // case "tilling":     // trạng thái chưa trồng cây
                    //     this.till();
                    default:
                        this.set_plant();
                        this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[1];
                        // cc.log(land_state);
                        console.log("new land");
                        return;

                };
                break;
        };

    },
    //耕地
    till: function () {
        //只允许触发一次
        if (user_data.user_data.land[this.land_index].land_state !== "tilling") {
            user_data.user_data.land[this.land_index].land_state = "tilling";
            var land_state = user_data.user_data.land[this.land_index].land_state;
            user_data.user_data.land[this.land_index].alive_stage = 0;
            this.plant_index = 0;
            this.plant_count = 0;
            //停掉所有的计时器
            this.unschedule(this.water_schedule);
            this.unschedule(this.plant_grow_schedule);
            this.unschedule(this.cut_schedule);
            this.unschedule(this.plant_schedule);
            this.plant_node.active = false;
            this.button.active = false;
            var till_time = config.till_time * (1 - user_data.user_data.skill["tool_improve"] / 100);
            var bar = this.plant_progress_node.getComponent(cc.ProgressBar);
            var now_time = 0;
            this.plant_progress_node.active = true;
            this.water_progress_node.active = true;
            this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[0];
            var callback = function () {
                now_time += 0.1;
                if (now_time >= till_time && land_state == "tilling") {
                    //                    cc.log("till over");
                    this.unschedule(callback);
                    this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[1];
                    this.plant_progress_label.string = "Waiting to be planted";
                    this.wait_next("plant");
                } else {
                    bar.progress = now_time / till_time;
                    var progress_num = parseInt(bar.progress * 100);
                    this.plant_progress_label.string = "In the ground " + progress_num + "%";
                };
            };
            this.schedule(callback, 0.1);
        } else {
            return;
        };
    },
    //种植
    plant: function (plant_index) {
        user_data.user_data.land[this.land_index].land_state = "wait_plant";
        user_data.user_data.land[this.land_index].plant_type = plant_index;
        this.plant_type = plant_index;
        user_data.user_data.land[this.land_index].alive_stage = 0;
        var now_time = 0;
        var plant_time = config.plant[plant_index].plant_time * (1 - user_data.user_data.skill["tool_improve"] / 100);
        var bar = this.plant_progress_node.getComponent(cc.ProgressBar);
        this.button.active = false;
        this.plant_schedule = function () {
            now_time += 0.1;
            if (now_time >= plant_time) {
                cc.log("plant_over");
                this.unschedule(this.plant_schedule);
                this.set_plant();
            } else {
                bar.progress = now_time / plant_time;
                var progress_num = parseInt(bar.progress * 100);
                this.plant_progress_label.string = "Planting " + progress_num + "%";
            };
        };
        this.schedule(this.plant_schedule, 0.1);
    },
    onLoad() {
        this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    },

    start() {
    },

    // update (dt) {},
});
