/**
 * Base lib v1.0
 * Base on jQuery v2.1.4
 *
 * Author: ella.liu
 */
(function() {
    var XJB;
    (function($, window, undefined) {
        /* is local env or not */
        var ISLOCAL = (window.location.host.indexOf('localhost') !== -1 || window.location.host.indexOf('10.65') !== -1);

        XJB = {
            // js util
            util: {
                redirect: function(url, replace) {
                    if (replace) {
                        window.location.replace(url);
                    } else {
                        window.location.href = url;
                    }
                },
                getUrlParam: function(name, str) {
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                    var search = ("string" == typeof str) ? str : window.location.search;
                    var r = search.substr(1).match(reg);
                    (r != null) ? r = decodeURIComponent(r[2]) : r = undefined;
                    return r;
                },
                html_decode: function(str) {
                    var s = "";
                    if (str.length == 0) return "";
                    s = str.replace(/&amp;/g, "&");
                    s = s.replace(/&lt;/g, "<");
                    s = s.replace(/&gt;/g, ">");
                    s = s.replace(/&nbsp;/g, " ");
                    s = s.replace(/&#39;/g, "\'");
                    s = s.replace(/&quot;/g, "\"");
                    s = s.replace(/<br>/g, "\n");
                    return s;
                },
                isWeiXin: function() {
                    var ua = window.navigator.userAgent.toLowerCase();
                    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            // UI function
            UI: {
                alert: function(msg, func, time, link_text, link) {
                    var _time = time || 1000;
                    $(".dialog_top").stop().remove();
                    var _dialog_top = '<article class="ns-show"><div class="dialog_top"><div class="dialog_mask"></div><p class="text">' + msg + '</p></div></article>';
                    $("body").prepend(_dialog_top);
                    var scrollTop = $(window).scrollTop() || document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;;
                    $(".ns-show").css({
                        "top": 56 + scrollTop + "px"
                    })
                    if (link_text) {
                        $(".ns-show .text").append('，<a href="' + link + '">' + link_text + '</a>');
                    }
                    setTimeout(function() {
                        $(".dialog_top").stop().fadeOut('fast', function() {
                            $(".ns-show").remove();
                        });
                        if (func) {
                            func();
                        }
                    }, _time)
                },
                vcode_count_down: function(em, configure) {
                    clearTimeout(XJB._data.timer);
                    var conf = {
                        start: 60,
                        // start time
                        end: 0,
                        // end now
                        suffix: '',
                        // suffix of display html
                        speed: 1,
                        // speed for 1 animate
                        cb: function() { // callback
                            console.log('count down over!');
                        },
                        set_context: function(that_em, context) {
                            that_em.html(context);
                        }
                    }
                    $.extend(conf, configure);
                    var _html = em.html();
                    var _count;
                    em.addClass("btn-disabled");
                    em.data("cd", parseInt(conf.start, 10) + 1);
                    var cd = function() {
                        if (conf.end != em.data("cd")) {
                            var _now = em.data("cd") - 1;
                            if (_now < 0) {
                                conf.set_context(em, '<span>' + "获取验证码" + '</span>');
                                conf.cb();
                            } else {
                                em.data("cd", _now);
                                conf.set_context(em, '<span>' + _now + conf.suffix + "秒后重新发送" + '</span>');
                                XJB._data.timer = setTimeout(cd, 1000 * conf.speed);
                            }
                        } else {
                            em.removeClass("btn-disabled").html(_html);
                            conf.cb();
                        }
                    }

                    cd();
                },

                loading: function(show) {
                    $(".loading").remove();
                    if (show) {
                        $("body").prepend("<div class='loading'><p></p></div>")
                    } else {
                        $(".loading").remove();
                    }
                }
            },
            // pub helper fn
            helper: {
                reqJs: function(urlArr, reqcallback) {
                    if (Object.prototype.toString.call(urlArr).slice(8, -1).toLowerCase() === "array") {
                        var l = urlArr.length;
                        if (l > 0) {
                            var n = 0;

                            function _getjs(k) {
                                $.getScript(XJB._data.siteurl + urlArr[k], function() {
                                    n++;
                                    if (n < l) {
                                        _getjs(k + 1)
                                    } else {
                                        reqcallback();
                                    }
                                })
                            }
                            _getjs(0)
                        } else {
                            reqcallback();
                        }

                    } else {
                        $.getScript(urlArr, reqcallback);
                    }

                },
                ajax_success: function(data, callback, show_err_fn) {
                    // (data.head.code !== '100');
                    // 100 返回正确
                    // 500 异常错误
                    // 1043, "登录状态已失效，请重新登录"
                    // 1005, "请求参数格式验证错误"
                    show_err_fn = show_err_fn || function(param) {
                        // alert(param);
                            XJB.UI.alert(param.head.msg);
                    };
                    data.body && data.body.errMsg && (data.head.msg = data.body.errMsg);
                    switch (data.head.code) {
                        case "200":
                            callback(data.body);
                            break;
                        case '500':
                            data.head.msg = "网络错误，请稍后再试！";
                            show_err_fn(data);
                            break;
                        case '1043':
                        case '1012':
                        case '401':
                            XJB.util.redirectR('/auth/login');
                            break;
                        case '1019':
                            if (data.head.msg === "非法流程") {
                                XJB.UI.alert(data.head.msg, function() {
                                    XJB.util.redirect('/home');
                                });
                            }
                            break;
                        default:
                            show_err_fn(data);
                    }
                },
                ajax_error: function(xhr, status, error, show_err_fn) {
                    show_err_fn = show_err_fn || function(param) {
                        // alert(param);
                            XJB.UI.alert(param);
                    };
                    switch (status) {
                        case "timeout":
                            show_err_fn("服务器响应超时，请重新再试！");
                            break;
                        case "error":
                            if (xhr.status == 401) {
                                XJB.util.redirectR('/auth/login');
                            } else {
                                show_err_fn("服务器错误，请重新再试！");
                            }
                            break;
                        case "abort":
                            console.log("用户放弃请求");
                            break;
                        case "parsererror":
                            console.log("ajax parsererror:" + error);
                            break;
                            // case "session-timeout":
                            // XJB.UI.show_login_dialog(true);
                            //     break;
                        case null:
                        default:
                            show_err_fn("网络错误，请稍后再试！");
                    }
                },
                ajx: function(axconf, axdata) {
                    axconf.dataType = 'json';
                    if (axconf.cacheTime) {
                        var _cts = '';
                        var _now = new Date().getTime();

                        _cts = Math.ceil(_now / axconf.cacheTime);
                        axconf.url.indexOf('?') === -1 ? (axconf.url += '?_=' + _cts) : (axconf.url += '&_=' + _cts);
                    }
                    $.extend(axconf, {
                        url: axconf.api,
                        data: axdata
                    });
                    ISLOCAL ? (axconf.type = "GET") : (axconf.type = "POST");

                    // for error
                    (typeof axconf.error !== 'function') && (axconf.error = function(xhr, textStatus, errorThrown) {
                        XJB.helper.ajax_error(xhr, textStatus, errorThrown);
                    });
                    $.ajax(axconf);
                }

            },

            plugin: {},
            /* client session fn by sessionstorage */
            session: {},
            // base static data, must be const
            _data: {
                baseurl: '/', // 站点ajax请求基础url
                islocal: ISLOCAL
            }
        };

        XJB.sessionStorage = window.sessionStorage;
        try {
            window.sessionStorage.setItem('testval', '');
            window.sessionStorage.removeItem('testval');
        } catch (e) {
            // XJB.sessionStorage = sessionStorage;
            XJB.sessionStorage = {
                setItem: function(key, val) {
                    XJB.util.cookie(key, val, {
                        expires: 0.05,
                        path: '/'
                    });
                },
                getItem: function(key, val) {
                    return XJB.util.cookie(key);
                },
                removeItem: function(key) {
                    var date = new Date();
                    date.setTime(date.getTime() - 10000);
                    XJB.util.cookie(key, null);
                },
                clear: function() {}
            };
        }

        window['XJB'] = XJB;

        // pub ready fn
        $(function() {
            //表单输入框内容清除
            $("form .form_line input").keyup(function() {
                var _this = $(this);
                if (_this.val()) {
                    _this.siblings(".delete").show().click(function() {
                        var _this_btn = $(this);
                        _this_btn.parents(".form_line").find("input").val("");
                        _this_btn.hide();
                    })
                }
            });

            //页面loading
            XJB.UI.loading(false);

        });


    })(jQuery, window);
    return XJB;
})();