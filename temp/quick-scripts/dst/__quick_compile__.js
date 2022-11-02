
(function () {
var scripts = [{"deps":{"./assets/migration/use_reversed_rotateBy":38,"./assets/script/fx":8,"./assets/script/game_rules":7,"./assets/script/game_scene":10,"./assets/script/loading_scene":12,"./assets/script/user_data":36,"./assets/script/AdsManager":9,"./assets/script/ai/player_role":11,"./assets/script/ai/staff_ai":13,"./assets/script/ai/pet_ai":2,"./assets/script/config/push":14,"./assets/script/config/videotape":15,"./assets/script/config/config":4,"./assets/script/control/sound_control":5,"./assets/script/control/ad_control":16,"./assets/script/effect/light":3,"./assets/script/effect/ad_car":17,"./assets/script/ui/gift_ui":22,"./assets/script/ui/hotel_ui":6,"./assets/script/ui/iap_content_ui":40,"./assets/script/ui/land":18,"./assets/script/ui/novice_ui":19,"./assets/script/ui/offline_profit":20,"./assets/script/ui/option_ui":24,"./assets/script/ui/pet_content":21,"./assets/script/ui/pet_ui":25,"./assets/script/ui/plant_ui":23,"./assets/script/ui/rest_ui":29,"./assets/script/ui/sell_ui":26,"./assets/script/ui/shop_buy_ui":27,"./assets/script/ui/shop_content":28,"./assets/script/ui/shop_ui":30,"./assets/script/ui/skill_content":32,"./assets/script/ui/staff_content":31,"./assets/script/ui/staff_ui":33,"./assets/script/ui/study_ui":34,"./assets/script/ui/tips_ui":35,"./assets/script/ui/videotape_ui":39,"./assets/script/ui/button_more":37,"./assets/migration/use_v2.1-2.2.1_cc.Toggle_event":1},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_v2.1-2.2.1_cc.Toggle_event.js"},{"deps":{"user_data":36,"config":4},"path":"preview-scripts/assets/script/ai/pet_ai.js"},{"deps":{"user_data":36},"path":"preview-scripts/assets/script/effect/light.js"},{"deps":{},"path":"preview-scripts/assets/script/config/config.js"},{"deps":{"user_data":36},"path":"preview-scripts/assets/script/control/sound_control.js"},{"deps":{"user_data":36,"config":4},"path":"preview-scripts/assets/script/ui/hotel_ui.js"},{"deps":{"user_data":36,"fx":8,"config":4,"push":14},"path":"preview-scripts/assets/script/game_rules.js"},{"deps":{"user_data":36},"path":"preview-scripts/assets/script/fx.js"},{"deps":{},"path":"preview-scripts/assets/script/AdsManager.js"},{"deps":{"config":4,"user_data":36},"path":"preview-scripts/assets/script/game_scene.js"},{"deps":{},"path":"preview-scripts/assets/script/ai/player_role.js"},{"deps":{},"path":"preview-scripts/assets/script/loading_scene.js"},{"deps":{"user_data":36,"config":4},"path":"preview-scripts/assets/script/ai/staff_ai.js"},{"deps":{},"path":"preview-scripts/assets/script/config/push.js"},{"deps":{},"path":"preview-scripts/assets/script/config/videotape.js"},{"deps":{"config":4},"path":"preview-scripts/assets/script/control/ad_control.js"},{"deps":{},"path":"preview-scripts/assets/script/effect/ad_car.js"},{"deps":{"user_data":36,"config":4},"path":"preview-scripts/assets/script/ui/land.js"},{"deps":{},"path":"preview-scripts/assets/script/ui/novice_ui.js"},{"deps":{"user_data":36},"path":"preview-scripts/assets/script/ui/offline_profit.js"},{"deps":{"config":4,"user_data":36},"path":"preview-scripts/assets/script/ui/pet_content.js"},{"deps":{"user_data":36},"path":"preview-scripts/assets/script/ui/gift_ui.js"},{"deps":{"user_data":36},"path":"preview-scripts/assets/script/ui/plant_ui.js"},{"deps":{"user_data":36},"path":"preview-scripts/assets/script/ui/option_ui.js"},{"deps":{"config":4},"path":"preview-scripts/assets/script/ui/pet_ui.js"},{"deps":{"user_data":36,"config":4},"path":"preview-scripts/assets/script/ui/sell_ui.js"},{"deps":{"user_data":36,"config":4},"path":"preview-scripts/assets/script/ui/shop_buy_ui.js"},{"deps":{"user_data":36,"config":4},"path":"preview-scripts/assets/script/ui/shop_content.js"},{"deps":{"user_data":36,"config":4},"path":"preview-scripts/assets/script/ui/rest_ui.js"},{"deps":{"user_data":36,"config":4},"path":"preview-scripts/assets/script/ui/shop_ui.js"},{"deps":{"user_data":36,"config":4},"path":"preview-scripts/assets/script/ui/staff_content.js"},{"deps":{"user_data":36},"path":"preview-scripts/assets/script/ui/skill_content.js"},{"deps":{"config":4,"user_data":36},"path":"preview-scripts/assets/script/ui/staff_ui.js"},{"deps":{"user_data":36,"skill_content":32},"path":"preview-scripts/assets/script/ui/study_ui.js"},{"deps":{},"path":"preview-scripts/assets/script/ui/tips_ui.js"},{"deps":{},"path":"preview-scripts/assets/script/user_data.js"},{"deps":{"user_data":36},"path":"preview-scripts/assets/script/ui/button_more.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_reversed_rotateBy.js"},{"deps":{"user_data":36,"config":4},"path":"preview-scripts/assets/script/ui/videotape_ui.js"},{"deps":{"user_data":36,"config":4},"path":"preview-scripts/assets/script/ui/iap_content_ui.js"}];
var entries = ["preview-scripts/__qc_index__.js"];
var bundleScript = 'preview-scripts/__qc_bundle__.js';

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

// Will generated by module.js plugin
// var scripts = ${scripts};
// var entries = ${entries};
// var bundleScript = ${bundleScript};

if (typeof global === 'undefined') {
    window.global = window;
}

var isJSB = typeof jsb !== 'undefined';

function getXMLHttpRequest () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP');
}

function downloadText(url, callback) {
    if (isJSB) {
        var result = jsb.fileUtils.getStringFromFile(url);
        callback(null, result);
        return;
    }

    var xhr = getXMLHttpRequest(),
        errInfo = 'Load text file failed: ' + url;
    xhr.open('GET', url, true);
    if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.responseText);
            }
            else {
                callback({status:xhr.status, errorMessage:errInfo + ', status: ' + xhr.status});
            }
        }
        else {
            callback({status:xhr.status, errorMessage:errInfo + '(wrong readyState)'});
        }
    };
    xhr.onerror = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(error)'});
    };
    xhr.ontimeout = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(time out)'});
    };
    xhr.send(null);
};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            let depIndex = m.deps[request];
            // dependence script was excluded
            if (depIndex === -1) {
                return null;
            }
            else {
                requestScript = scripts[ m.deps[request] ];
            }
        }
        
        let requestPath = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                requestPath = name2path[request];
            }

            if (!requestPath) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            requestPath = formatPath(requestScript.path);
        }

        let requestModule = modules[requestPath];
        if (!requestModule) {
            console.warn('Can not find request module for path : ' + requestPath);
            return null;
        }

        if (!requestModule.module && requestModule.func) {
            requestModule.func();
        }

        if (!requestModule.module) {
            console.warn('Can not find requestModule.module for path : ' + path);
            return null;
        }

        return requestModule.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;

            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
            return path;
        });

        console.time && console.time('load __quick_compile_project__');
        // jsb can not analysis sourcemap, so keep separate files.
        if (bundleScript && !isJSB) {
            downloadText(formatPath(bundleScript), function (err, bundleSource) {
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                if (err) {
                    console.error(err);
                    return;
                }

                let evalTime = 'eval __quick_compile_project__ : ' + srcs.length + ' files';
                console.time && console.time(evalTime);
                var sources = bundleSource.split('\n//------QC-SOURCE-SPLIT------\n');
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]) {
                        window.eval(sources[i]);
                        // not sure why new Function cannot set breakpoints precisely
                        // new Function(sources[i])()
                    }
                }
                self.run();
                console.timeEnd && console.timeEnd(evalTime);
                cb();
            })
        }
        else {
            loadScripts(srcs, function () {
                self.run();
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                cb();
            });
        }
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    