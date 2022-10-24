
cc.Class({
    extends: cc.Component,

    properties: {
        talk_group: cc.Node,
        paper_node: cc.Node,
        exit_button_node: cc.Node,
        title_node: cc.Node,
    },

    //ini_node
    ini_node() {
        this.sound_control = cc.find("sound_control").getComponent("sound_control");
        this.exit_button_node.active = false;
        this.title_node.active = false;

        for (var i = 0; i < this.talk_group.children.length; i++) {
            this.talk_group.children[i].opacity = 0;
        };
        this.talk_count = 0;
        this.paper_node.height = 505;
        this.ini_paper_anim();

    },

    //纸动画
    ini_paper_anim() {
        cc.tween(this.paper_node)
            .to(0.3, { height: 1042 }, { easing: "sineIn" })
            .call(() => {
                this.title_node.active = true;
                this.ini_talk_anim();
                this.show_exit_button_node();
            })
            .start();
    },

    //ini anim
    ini_talk_anim() {
        var callback = function () {
            this.talk_group.children[this.talk_count].opacity = 255;
            this.talk_count++;
            if (this.talk_count >= this.talk_group.children.length) {
                return;
            };
            this.ini_talk_anim();
        };
        this.scheduleOnce(callback, 0.2);
    },
    show_exit_button_node() {
        this.scheduleOnce(() => {
            this.exit_button_node.active = true;
        }, 1.5)
    },
    //退出按钮
    on_exit_button_click() {
        this.sound_control.play_sound_effect("button_exit");
        this.node.destroy();
    },

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
