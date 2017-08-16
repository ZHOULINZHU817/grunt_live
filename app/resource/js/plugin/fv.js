(function() {
    var DICT = { /*空*/
        empty: {
            exp: /[^\s]/,
            err: '请填写%s'
        },
        /*纯数字*/
        number: {
            exp: /^[0-9]+$/,
            err: '%s只能输入数字'
        },
        /*整数*/
        integer: {
            exp: /^[0-9]+$/,
            err: '%s只能输入整数'
        },
        /*小数*/
        decimal: {
            exp: /^[0-9]+(\.[0-9]+)?$/,
            err: '%s只能输入整数或小数'
        },
        /*中文*/
        chinese: {
            exp: /^[\u2E80-\uFE4F]+$/,
            err: '%s只能输入汉字'
        },
        /*姓名*/
        name: {
            exp: /^([\u4e00-\u9fa5|A-Z]+\s*\.?\s*)+$/,
            err: '%s只能由中文汉字或大写英文字母构成'
        },

        /*真实姓名*/
        chinese_ch: {
            exp: /^[\u2E80-\uFE4F]{2,6}$/,
            err: '%s只能输入2-6位中文字'
        },

        /*中文名字加点*/
        chinese_name: {
            exp: /^[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*$/,
            err: '%s只能输入中文姓名'
        },

        consignee: {
            exp: /^[a-zA-Z\u4E00-\u9FA5]+$/i,
            err: '%s只能由中文汉字或英文字母构成'
        },
        address: {
            exp: /^[0-9a-zA-Z\-\u4E00-\u9FA5]+$/i,
            err: '%s只能由中文汉字、英文字母或者数字构成'
        },
        captcha: {
            exp: /^\w{4}$/,
            err: '%s只能由4位英文字母或者数字构成'
        },
        /*true name*/
        //truename: {exp: /^[\u2E80-\uFE4F]{2,50}|^\w{4,110}$/, err: '%s只能由2-50个中文汉字或4-110个英文字母构成'},
        truename: {
            exp: /^[^\*]{2,50}$/,
            err: '%s输入错误，请重新输入'
        },
        /*身份证*/
        id: {
            exp: /^\d{14}[0-9a-zA-Z]$|^\d{17}[0-9a-zA-Z]$/,
            // exp: /^\d{14}[0-9xX]$|^\d{17}[0-9xX]$/,
            err: '身份证号码输入错误，请重新输入'
        },
        passport: {
            exp: /^[A-Za-z]\d{7,8}$/,
            err: '护照号码输入错误，请重新输入'
        },
        /*邮箱*/
        email: {
            exp: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
            err: '邮箱格式错误'
        },
        miemail: {
            exp: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2,5})?)$/,
            err: '邮箱格式错误'
        },
        /*手机号*/
        mobile: {
            exp: /^1\d{10}$/,
            // err: '手机号格式有误，请重新输入'
            err: '你输入的是一个无效手机号'
        },
        r_mobile: {
            exp: /^1\d{10}$/,
            err: '请填写11位手机号码'
        },
        t_mobile_e: {
            exp: /[^\s]/,
            err: '手机号未填写'
        },
        t_mobile: {
            exp: /^1\d{10}$/,
            err: '请填写11位手机号码'
        },
        /* 卡号 */
        bank_card: {
            exp: /^[0-9\-]{8,32}$/,
            err: '请输入正确的%s'
        },
        // bank_credit_card {
        //     exp: /^\d{6,25}$/,
        //     err: '%s只能是6~25位数字'
        // }
        /* CVV */
        CVV: {
            exp: /^\d{3,4}$/,
            err: '%s只能是3或4位数字'
        },
        /* 验证码 */
        vcode: {
            exp: /^\w{6}$/,
            err: '%s有误，请重新输入'
        },
        /* 图片验证码 */
        pvcode: {
            exp: /^\w{4,8}$/,
            err: '%s有误，请重新输入'
        },
        /* 验证短信码 */
        sms_vcode: {
            exp: /^\w{6}$/,
            err: '%s有误，请重新输入'
        },
        /* 有效期 */
        validDate: {
            exp: /^\d{4,10}$/,
            err: '%s只能是4~10位数字'
        },
        /*金额*/
        amount: {
            // exp: /^[0-9]+(\.[0-9]{0,2})?$/,
            exp: /^(([1-9][0-9]*)|0)\.[0-9]{1,2}$|^[1-9][0-9]*$/,
            err: '%s只能是整数或2位以内小数'
        },
        /*整数*/
        amount_integer: {
            exp: /^[0-9]+$/,
            err: '%s只能输入整数'
        },
        /*必须为100的倍数*/
        amount_hundred: {
            exp: /^[1-9]\d*00$/,
            err: '%s只能是100的倍数'
        },
        /*必须为1000的倍数*/
        amount_thousand: {
            exp: /^[1-9]\d*000$/,
            err: '%s只能是1000的倍数'
        },
        /*微博账号*/
        wbAccount: {
            exp: /^1\d{10}$|^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
            err: '%s必须是手机号或邮箱地址'
        },
        /*密码*/
        password: {
            exp: /^\S{8,16}$/,
            err: '%s长度只能是8~16位'
        },
        /*支付密码*/
        paypassword: {
            exp: /^.{8,16}$/,
            err: '%s长度只能是8~16位'
        },
        /*验证支付密码*/
        v_paypassword: {
            exp: /^.{1,50}$/,
            err: '%s长度必须小于50位'
        },
        //m_paypassword: {exp: /^\S{8,20}$/, err: '支付密码太简单了，请重新输入，建议你修改成大小写字母+数字+符号的混合式密码'},
        /*微博密码*/
        wbPassword: {
            exp: /[^\s]/,
            err: '请输入微博登录密码'
        },
        /* 邮编 */
        zip: {
            exp: /^\d{6}$|^[\s]$/,
            err: '请正确的邮政编码'
        }
    };
    var LEN = {
        len: '%s1长度为%s2位',
        minlen: '%s1长度不能小于%s2位',
        maxlen: '%s1长度不能超过%s2位',
        minval: '%s1不能小于%s2',
        maxval: '%s1不能大于%s2',
        paybalance: ' '
    };

    FM.plugin.fv = function($form, config, RULE) {
        var _this = this;
        // validation core
        function v_it(show_err_fn, em) {
            var _set = em || $form.find("input[data-vfield]:visible:enabled,select[data-vfield]:enabled,input[type=hidden][data-vfield],input[type=checkbox][data-vfield]:visible,textarea[data-vfield]");
            // console.log(_set)
            var _v_ret = {
                result: true,
                ary: []
            };
            $form.find('.input_hint').hide();
            $.each(_set, function(k, v) {
                var $this = $(this);
                $this.val($.trim($this.val()));
                var _ret = true;
                var _msg = "";

                var name = $this.attr("data-vfield"),
                    val = $this.val(),
                    rules, empty_ignore, same_as_em, etext_same_as;

                var this_id = $this.attr('id');
                if (RULE[this_id] && typeof RULE[this_id].forcepass === 'function' && RULE[this_id].forcepass(val)) { // force pass
                    // do nothings
                } else {
                    // console.log(RULE)
                    rules = RULE[this_id].rules;
                    empty_ignore = RULE[this_id].empty_ignore || false;
                    same_as_em = RULE[this_id].same_as;
                    etext_same_as = RULE[this_id].etext_same_as;
                    // console.log(rules)

                    if ($this[0].tagName == "SELECT") {
                        (val === "selectplease" || !val) && (val = "");
                        // console.log(val)
                    }
                    if ($this.attr('type') === 'checkbox') {
                        if (!$this.is(':checked')) {
                            _ret = false;
                            _msg = $this.attr('data-vfield');
                        }
                    } else {
                        rules = rules.split(" ");
                        for (var i = 0; i < rules.length; i++) {
                            // amount trim '0'
                            if (rules[i].indexOf('amount') !== -1) {
                                var _this_v = $this.val();
                                while (_this_v[0] === '0') {
                                    if (_this_v[1] === '.') {
                                        break;
                                    } else {
                                        _this_v = _this_v.slice(1);
                                    }
                                }
                                $this.val(_this_v);
                                val = _this_v;
                            }
                            // ignore empty
                            if (rules[i] === "empty") {
                                if (empty_ignore === $this.val()) {
                                    _ret = false;
                                    break;
                                }
                            }
                            // 重复支付密码
                            if (rules[i] === "same_as") {
                                if ($(same_as_em).val() != $this.val()) {
                                    _ret = false;
                                    _msg = etext_same_as; // must be private msg
                                    break;
                                }
                            }
                            if (DICT[rules[i]]) {
                                if (!DICT[rules[i]].exp.test(val)) {
                                    var alert_msg = RULE[this_id]["etext_" + rules[i]] || DICT[rules[i]]['err'];
                                    _ret = false;
                                    _msg = alert_msg.replace(/%s/g, name);
                                    break;
                                }
                            }
                            //自定义整数倍
                            if (rules[i] === "integer_multiples") {
                                var expect_text = parseInt(RULE[this_id][rules[i]]);
                                if (val % expect_text !== 0) {
                                    _ret = false;
                                    _msg = "请输入" + expect_text + "的整数倍";
                                    break;
                                }
                            }
                            if (LEN[rules[i]]) {
                                var r = true;
                                var expect_text = RULE[this_id][rules[i]];
                                var expect_int = parseInt(expect_text, 10);
                                var expect_float = parseFloat(expect_text, 10);
                                switch (rules[i]) {
                                    case "len":
                                        r = val.length == expect_int;
                                        break;
                                    case "minlen":
                                        r = val.length >= expect_int;
                                        break;
                                    case "maxlen":
                                        r = val.length <= expect_int;
                                        break;
                                    case "minval":
                                        r = parseFloat(val, 10) >= expect_float;
                                        // console.log(val, parseFloat(val, 10) >= expect_float, expect_float)
                                        break;
                                    case "maxval":
                                        r = parseFloat(val, 10) <= expect_float;
                                        break;
                                    case "paybalance":
                                        r = parseFloat(val, 10) <= expect_float;
                                        break;
                                    default:
                                        r = true;
                                }
                                if (!r) {
                                    var alert_msg = RULE[this_id]["etext_" + rules[i]] || LEN[rules[i]];
                                    _ret = false;
                                    _msg = alert_msg.replace(/%s1/g, name).replace(/%s2/g, expect_text);
                                    break;
                                }
                            }

                            /* 需要强制重置值为空的校验规则需要发生在empty校验之后 */
                            // 验证支付密码
                            if (rules[i] === "v_paypassword") {
                                if ((/[^\x00-\xff]/.test(val)) || /\s+/.test(val)) {
                                    // $this.val("");
                                    _ret = false;
                                    _msg = "支付密码错误";
                                    break;
                                }
                            }
                            // 修改支付密码
                            if (rules[i] === "m_paypassword") {

                                if (/[^\x00-\xff]/.test(val) || /\s+/.test(val) || !(/^.{8,16}$/.test(val))) { // 特殊字符
                                    _ret = false;
                                    _msg = "支付密码必须由8-16位字母、数字或符号组成";
                                    break;
                                }
                                var _s = val.slice(0, 1),
                                    _ss = '';
                                for (var j = 0; j < val.length; j++) {
                                    _ss += _s;
                                }
                                if (_ss === val) {
                                    _ret = false;
                                    _msg = "支付密码不能设置相同的字母/数字/符号";
                                    break;
                                }
                                if (/^[0-9]+$/.test(val)) {
                                    var _s1 = '',
                                        _s2 = '';
                                    _s = parseInt(_s, 10);
                                    for (var j = 0; j < val.length; j++) {
                                        _s1 += _s + j;
                                        _s2 += _s - j;
                                    }
                                    if (_s1 === val || _s2 === val) {
                                        _ret = false;
                                        _msg = "支付密码不能设置连续的数字";
                                        break;
                                    }
                                }
                            }
                            // 金额不能为0
                            if (rules[i].indexOf("amount") !== -1) {
                                if (parseFloat((val), 10) === 0) {
                                    // $this.val("");
                                    _ret = false;
                                    _msg = "金额必须大于0";
                                    break;
                                }
                            }
                        }
                    }
                    if (!_ret) { // push ret
                        _v_ret.result = false;
                        _v_ret.ary.push({
                            em: $this,
                            key: $this.attr('data-vfield'),
                            err: _msg
                        });

                        if (typeof show_err_fn === "function") {
                            show_err_fn($this, _msg);
                        }
                    }

                }
            });
            return _v_ret;
        }

        // form ajax submit core
        function form_ajax(configure) {
            var conf = {
                show_v_error: function(input_em, msg) {},
                _init_even: function(s_v_e_fn) {},
                returnbeforesubmit: function() {
                    return true;
                },
                start: function() {
                    // console.log("start");
                },
                end: function() {
                    // console.log("end");
                },
                success: function(data) {
                    console.log(data);
                },
                privatehandle: function() {

                },
                error: function(data) {
                    console.log(data);
                },
                _error: function(xhr, status, error) {
                    FM.helper.ajax_error(xhr, status, error);
                },
                no_ajax: false,
                just_verify: false,
                unit: ""
            };

            $.extend(conf, configure);
            conf._init_even(conf.show_v_error);

            // pub pay pwd fn
            var pwd_component = false;
            var safe_em_set = $form.find("input[data-encrypt]:visible");
            if (safe_em_set.length) {
                FM.helper.reqJs('/resource/js/plugin/pwd.js', function() {
                    pwd_component = new FM.plugin.pwd({
                        em: safe_em_set,
                        saltApi: '/api/srv/get_salt'
                    });
                });
            }


            var pwd_component_key = false;
            var safe_em_set_key = $form.find("input[data-encrypt-key]:visible"); // data-encrypt & data-key_em only exists one type
            if (safe_em_set_key.length) {
                FM.helper.reqJs('/resource/js/plugin/pwd_key.js', function() {
                    pwd_component_key = new FM.plugin.pwd_key({
                        em: safe_em_set_key,
                        salt_url: '/api/srv/get_salt'
                    });
                })

            }

            $form.unbind("submit").submit(function(e) {
                var submiter = $form.find('[type=submit]') || $form.find('button:first') || $form.find('[type=button]:first');


                if (submiter.hasClass("disabled")) {
                    return false;
                }

                var ret = v_it(conf.show_v_error);
                if (!ret.result) {
                    conf.end();
                    FM.UI.alert(ret.ary[0].err + conf.unit);
                    return false;
                };

                var retsubmit = conf.returnbeforesubmit();

                if (!retsubmit) {
                    return false;
                }

                function _really_submit(callback) {
                    // console.log(4)
                    // conf.returnbeforesubmit();
                    conf.start();
                    
                    FM.UI.loading(true);

                    var send_data = {};
                    $.each($form.serializeArray(), function(key, val) {
                        if ($.trim(val.value) === "") {
                            if ($form.find("[name=" + val.name + "]:visible").length) {
                                send_data[val.name] = val.value;
                            }
                        } else {
                            send_data[val.name] = val.value;
                        }
                    });
                    send_data._rd = Math.random();

                    FM.helper.ajx({
                        api: $form.find('input[name="operationType"]').val(),
                        type: $form.attr("method"),
                        success: function(ret) {
                            // 表单提交成功
                            $form.removeData("submitting");
                            FM.UI.loading(false);
                            FM.helper.ajax_success(ret, function(body) {
                                FM.UI.loading(true);
                                // 执行conf.success
                                (typeof callback === "function") && callback();
                                conf.end();
                                conf.success(body);
                            }, function(data) {
                                // 按reasons来显示form错误或者顶部alert
                                // console.log(data)
                                if (typeof callback === "function") {
                                    callback();
                                }
                                if (data.head.code !== '414') { // 414错误，不需要显示公共报错浮层，私有处理
                                    FM.UI.alert(data.head.msg);
                                }
                                conf.end();
                                // 执行额外的error处理
                                conf.error(data);
                            });
                        },
                        error: function(xhr, status, error) {
                            $form.removeData("submitting");
                            (typeof callback === "function") && callback();
                            conf.end();
                            conf._error(xhr, status, error);
                        }
                    }, send_data);


                }

                if (!conf.no_ajax) {
                    if ($form.data("submitting") == "yes") {
                        return false;
                    }
                    $form.data("submitting", "yes");
                    if (!(pwd_component || pwd_component_key)) {
                        _really_submit();
                    } else if (pwd_component) {
                        pwd_component.encrypt(function() {
                            // avoid remember pwd fn of browser
                            safe_em_set.each(function() {
                                var _name = $(this).attr('name');
                                // $form.find('input[type=hidden][name=' + _name + ']').remove().end().prepend('<input name="' + _name + '" type="hidden" />').find('input[type=hidden][name=' + _name + ']').val($(this).val());
                                $(this).attr('data-name', $(this).attr('name')).removeAttr('name');
                            });
                            _really_submit(function() {
                                safe_em_set.each(function() {
                                    $(this).attr('name', $(this).attr('data-name')).removeAttr('data-name');
                                    if ($(this).data('data-keep') === 'yes' && $(this).data("cache_val")) {
                                        $(this).val($(this).data("cache_val")).removeData("cache_val");
                                    }
                                });
                            });
                        }, function(xhr, status, error) {
                            $form.removeData("submitting");
                            FM.UI.submiter_block(submiter, false);
                            FM.UI.alert({
                                msg: '获取加密salt失败'
                            });
                            conf.error(xhr, status, error);
                        });
                    } else {
                        pwd_component_key.pre_submit(function() {
                            // avoid remember pwd fn of browser
                            save_pwd_avoider(safe_em_set_key, false);
                            _really_submit(function() {
                                save_pwd_avoider(safe_em_set_key, true);
                            });
                        });

                        function save_pwd_avoider(em_set, isRevert) {
                            if (isRevert) {
                                em_set.each(function() {
                                    $(this).attr('name', $(this).attr('data-name')).removeAttr('data-name');
                                    if ($(this).data('data-keep') === 'yes' && $(this).data("cache_val")) {
                                        $(this).val($(this).data("cache_val")).removeData("cache_val");
                                    }
                                });
                            } else {
                                em_set.each(function() {
                                    var _name = $(this).attr('name');
                                    $form.find('input[type=hidden][name=' + _name + ']').remove().end().prepend('<input name="' + _name + '" type="hidden" />').find('input[type=hidden][name=' + _name + ']').val($(this).val());
                                    $(this).attr('data-name', $(this).attr('name')).removeAttr('name').val('');
                                });
                            }
                        }
                    }

                    e.preventDefault();
                    return false;
                } else {
                    conf.start();
                    FM.UI.submiter_block(submiter, true);
                    return true;
                }
            });

            if (conf.just_verify) {
                $form.unbind('submit').submit(function() {
                    var ret = v_it(conf.show_v_error);
                    if (ret.result) {
                        conf.start();
                    } else {
                        conf.end();
                    }
                    return false;
                })
            }

            _this.v_it = function() {
                return v_it(conf.show_v_error);
            };
        }

        form_ajax(config);


        /* deal with other pub form trick */
        // 金额输入规范化
        $form.find('.amount_fix').on('keydown', function(e) {
            // console.log(e.which);return true;
            var keydict = {
                8: true, // backspace
                46: true, // del
                18: true, // tab
                37: true, // <-
                35: true, // home
                36: true, // end
                39: true, // ->
                116: true, // F5
                110: true, // del .
                190: true // .
            }
            if ((47 < e.which && e.which < 58) || (95 < e.which && e.which < 106) || keydict[e.which]) {
                void 0;
            } else {
                e.preventDefault();
                return false;
            }
        }).on('keyup', function() {
            // 搜狗输入法会改变e.which，只好强制干掉非金额部分
            var $this = $(this);
            var this_val = $this.val();
            var this_val_replaced = this_val.replace(/[^0-9\.]/g, '');
            (this_val !== this_val_replaced) && $this.val(this_val_replaced);
        });


        function toChinese(n) {
            if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
                return "";
            var unit = "千百拾亿千百拾万千百拾元角分",
                str = "";
            n += "00";
            var p = n.indexOf('.');
            if (p >= 0)
                n = n.substring(0, p) + n.substr(p + 1, 2);
            unit = unit.substr(unit.length - n.length);
            for (var i = 0; i < n.length; i++)
                str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
            return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
        }


        if ($form.find('[data-chinese]').length) {
            function chinese_go() {
                setTimeout(function() {
                    $form.find('[data-chinese]').each(function(e) {
                        var _val = $(this).data('val_cached') || '';

                        if (_val !== $(this).val()) {
                            _val = $(this).val();
                            $(this).data('val_cached', _val);
                            $($(this).attr('data-chinese')).html(toChinese(_val));
                        }
                    });
                    chinese_go();
                }, 100);
            }
            chinese_go();
        }

    };

})();