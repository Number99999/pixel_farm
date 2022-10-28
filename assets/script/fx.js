import user_data from "user_data";
export default {
    //更新存档
    mergeJSON(n, o) {
        let oType = Object.prototype.toString.call(o);
        let nType = Object.prototype.toString.call(n);
        if (nType == '[object Object]' && oType == '[object Object]') {
            //合并属性(object)
            for (let p in n) {
                if (n.hasOwnProperty(p) && !o.hasOwnProperty(p)) {
                    //新的有，旧的没有
                    o[p] = n[p];
                } else if (n.hasOwnProperty(p) && (o.hasOwnProperty(p))) {
                    //两者都有
                    let oPType = Object.prototype.toString.call(o[p]);
                    let nPType = Object.prototype.toString.call(n[p]);
                    if ((nPType == '[object Object]' && oPType == '[object Object]') || (nPType == '[object Array]' && oPType == '[object Array]')) {
                        this.mergeJSON(n[p], o[p]);
                    }
                };
            }
        } else if (nType == '[object Array]' && oType == '[object Array]') {
            //合并属性(array)
            for (let i in n) {
                let oIType = Object.prototype.toString.call(o[i]);
                let nIType = Object.prototype.toString.call(n[i]);
                if ((nIType == '[object Object]' && oIType == '[object Object]') || (nIType == '[object Array]' && oIType == '[object Array]')) {
                    this.mergeJSON(n[i], o[i]);
                }
            }
        };
        //合并属性(other)
        n = o;
        return n;
    },
    //刷新数据
    updata_user_data: function (local_user_data) {
        //合并对象，源对象合并到目标对象
        //Object.assign(target,sources)
        var now_ud = this.mergeJSON(user_data.user_data, local_user_data);
        Object.assign(user_data.user_data, now_ud)
        cc.log(user_data.user_data, "user_data");
    },
    //读取本地数据
    load: function () {
        try {
            var local_user_data = JSON.parse(cc.sys.localStorage.getItem('user_data'));
            // var local_user_data = null;
            if (local_user_data !== null) {
                this.updata_user_data(local_user_data);
                cc.log("load successfull");
            } else {
                this.save();
                //否则就初始化
            };
        } catch (err) {
            this.save();
            cc.log("error load exception5");
            cc.log(err);
        }
    },
    //将缓存数据写入到本地中
    save: function () {
        var cache_user_data = user_data.user_data;
        this.remove_all();
        cc.sys.localStorage.setItem('user_data', JSON.stringify(cache_user_data));
        // cc.log("已存档");
        // cc.log(JSON.stringify(user_data));
    },
    //清除所有数据
    remove_all: function () {
        cc.sys.localStorage.removeItem('user_data');
        // cc.log("清除本地所有数据");
    },

};
