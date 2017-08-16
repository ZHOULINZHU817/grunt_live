/**
 * @ jQuery Plugins: pub safe component util
 * @ Create time: 2013-06-26
 * @ Author: John Zhou
 * @ Email: pansmaze@gmail.com
 * @ Usage:
        js:
            var pwd_component = new $.safe_component();pwd_component.encrypt(function() {form.submit();});
        html:
            <input type="hidden" id="foo" name="FIXME" />
            <input type="password" id="pay_pwd" data-encrypt="rsa" name="FIXME" />

 * @ Details:
        Note for 20140626
        M-wfc: RSA(SHA256(val)+salt) for all case
 */
(function() {
    FM.plugin.pwd = function(conf) {
        var self = this;

        FM.helper.reqJs('/resource/js/plugin/sha256.js', function() {
            // console.log(FM.plugin.sha256)
            /** conf setting **/
            conf = $.extend(true, {
                em: $("#pay_pwd"), // elements for safe component, need data-encrypt="rsa" for submit. get salt once for this em set!
                saltApi: "/api/srv/get_salt", // salt api to get salt
                base64Cert: "-----BEGIN CERTIFICATE-----\nMIICCzCCAXQCCQDS3bwzUSZwWTANBgkqhkiG9w0BAQUFADBJMQswCQYDVQQGEwJBVTETMBEGA1UEChMKV0VJSFVJLkNPTTElMCMGA1UECxMcV0VJSFVJIFRlbXBvcmFyeSBDZXJ0aWZpY2F0ZTAgFw0xMjA5MjkwMDUzNDJaGA8yMTEyMDkwNTAwNTM0MlowSTELMAkGA1UEBhMCQVUxEzARBgNVBAoTCldFSUhVSS5DT00xJTAjBgNVBAsTHFdFSUhVSSBUZW1wb3JhcnkgQ2VydGlmaWNhdGUwgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBAOInRLmoDJp1whLf3jvuaFGyB7OlmS5u4LmDX5rattEpLQ9uvUeEBPw8++ldD2Z6d5RNe7s5Y4RsaIn+FgjF+tSy3yIkpiZxxzXJMtIwzSbtXRgpa5fo0w0l/LgdHnMSTJzWncOGTrzmuuzAVtwa9NV89MzcsPoFOxftnVucud2xAgMBAAEwDQYJKoZIhvcNAQEFBQADgYEAvLtaFZb49HOKToh9/562CZlCZz9QNl3OQh+EmFP3tvuTsF0/0vRTM5fkfVXMilBBLiDiCchpY063iinV5oDgMjWQ4MfOj5jt2GUXiwsRXMM1Grb4NzSiMrwOEHoB3tm1W7Or/ffvcGF76WyE7fBg9s1sYT9xU/6gbkt0IyDuwj0=\n-----END CERTIFICATE-----",
                pubkey: false
            }, conf);

            /** self tools fn **/
            var key_to_hex = function(key) {
                var _hex = "";
                for (var i = 0; i < key.length; i++) {
                    _hex += key.charCodeAt(i).toString(16);
                }
                return _hex;
            };

            /** private fn **/
            // init fn
            this._init = function() {
                self.encrypt = function(encrypt_callback, encrypt_failure_callback) {
                    FM.helper.ajx({
                        api: conf.saltApi,
                        type: 'GET',
                        success: function(data) {
                            FM.helper.ajax_success(data, function(body) {
                                if (body.salt) {
                                    var _salt = body.salt;


                                    var encrypt_lib = [];

                                    (conf.em.filter('[data-encrypt=rsa]').length) &&
                                        encrypt_lib.push('/resource/js/plugin/rsa.js');
                                    (conf.em.filter('[data-encrypt=aes]').length) &&
                                        encrypt_lib.push('/resource/js/plugin/aes.js');

                                    FM.helper.reqJs(encrypt_lib, function() {

                                        function ___sha($em) {
                                            var _value = FM.plugin.sha256(FM.plugin.sha256($em.val()) + _salt);
                                            if ($(".payPwd").length == 0) {
                                                $em.parents("form").prepend('<input class="payPwd" type="hidden" name="' + $em.attr("name") + '">');
                                                $(".payPwd").val(_value);
                                            } else {
                                                $(".payPwd").val(_value);
                                            }
                                            // $em.val(FM.plugin.sha256(FM.plugin.sha256($em.val()) + _salt));
                                        }

                                        function ___aes($em) {
                                            var _value = FM.plugin.aes.encrypt(key_to_hex(_salt), FM.plugin.sha256($em.val()));
                                            if ($(".payPwd").length == 0) {
                                                $em.parents("form").prepend('<input class="payPwd" type="hidden" name="' + $em.attr("name") + '">');
                                                $(".payPwd").val(_value);
                                            } else {
                                                $(".payPwd").val(_value);
                                            }
                                            // $em.val(FM.plugin.aes.encrypt(key_to_hex(_salt), FM.plugin.sha256($em.val())));
                                        }

                                        function ___rsa($em) {
                                            conf.component.pubkey = conf.component.pubkey || FM.plugin.rsa.readCertPEM(conf.component.base64Cert);

                                            FM.plugin.rsa.setMaxDigits(Math.floor(conf.component.pubkey[0].length / 2) + 3);

                                            var key = new FM.plugin.rsa.RSAKeyPair(conf.component.pubkey[1], '', conf.component.pubkey[0]);

                                            var _value = FM.plugin.rsa.encryptedString(key, FM.plugin.sha256($em.val()) + _salt);

                                            if ($(".payPwd").length == 0) {
                                                $em.parents("form").prepend('<input class="payPwd" type="hidden" name="' + $em.attr("name") + '">');
                                                $(".payPwd").val(_value);
                                            } else {
                                                $(".payPwd").val(_value);
                                            }

                                            // $em.val(_value);
                                        }

                                        conf.em.each(function() {
                                            var $this = $(this);
                                            $this.data("cache_val", $this.val());

                                            var etype = $(this).attr('data-encrypt');
                                            switch (etype) {
                                                case 'rsa':
                                                    ___rsa($this);
                                                    break;
                                                case 'aes':
                                                    ___aes($this);
                                                    break;
                                                case 'sha':
                                                default:
                                                    ___sha($this);
                                            }

                                            encrypt_callback();
                                        });

                                    });
                                } else {
                                    encrypt_failure_callback(data, 'system error', 'salt can not get');
                                }
                            });
                        },
                        error: function(xhr, status, error) {
                            encrypt_failure_callback(xhr, status, error);
                        }
                    });
                }
            };

            /** pub fn **/
            // get all conf
            this.get_conf = function() {
                return conf;
            };

            this._init();
        });
    };
})();