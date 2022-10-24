cc.Class({
    extends: cc.Component,
    properties: {
        loadingBar: {
            type: cc.ProgressBar,
            default: null,
        },
        work_label: {
            type: cc.Label,
            default: null,
        },
        progress_label: cc.Label,
        center_node: cc.Node,
    },

    //加载成功
    load_Succes: function () {
        cc.tween(this.center_node)
            .to(0.5, { opacity: 0 }, { easing: "sineOut" })
            .call(() => {
                cc.director.loadScene("game_scene");
            })
            .start();
    },

    ini_node: function () {
        this.loadingBar.progress = 0;
        this.on_load_progress();
    },
    //加载进度条
    on_load_progress: function () {
        var self = this;
        cc.director.preloadScene("game_scene", (completedCount, totalCount, item) => {
            if (completedCount / totalCount > self.loadingBar.progress) {
                self.loadingBar.progress = completedCount / totalCount;
                self.progress_label.string = parseInt((completedCount / totalCount) * 100) + "%";

            };
            // self.loadingBar.width = 350* (completedCount/totalCount);
        }, function (error, asset) {
            if (error) {
                cc.log("加载失败");
                return;
            } else {
                self.load_Succes();
                cc.log("加载成功");
            };
        })
    },

    //重新加载游戏
    rest_load_game: function (dt) {
        this.time += dt;
        if (this.time >= 15) {
            this.time = 0;
            this.rest_count++;
            this.work_label.string = "正在尝试重新加载...";
            if (this.rest_count >= 2) {
                this.progress_label.node.active = false;
                this.work_label.string = "由于网络波动加载失败，请清除缓存后重新进入~o(╥﹏╥)o~"
            };
            this.ini_node();
        }
    },
    onLoad() {
        this.time = 0;
        this.rest_count = 0;
        this.ini_node();
    },

    start() {

    },

    update(dt) {
        this.rest_load_game(dt);
    },
});
