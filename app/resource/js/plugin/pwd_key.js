(function() {

    FM.plugin.pwd_key = function(conf) {
        var self = this;
        var ISLOCAL = (window.location.host.indexOf('localhost') !== -1 || window.location.host.indexOf('10.65') !== -1);
        FM.helper.reqJs('/resource/js/plugin/sha256_key.js', function() {
            // console.log(FM.plugin.sha256)
            /** conf setting **/
            conf = $.extend(true, {
                em: $('input[data-encrypt-key]'),
                salt_url: "/api/srv/get_salt",
                pubkey: "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDUAJwoIlFZTBbxXvq0aT+SuYdcVdYY6+sRL7hmW7XvXBL+Mb4Bu4h/ZEU0cntO73kWAyLqrIF8sdd2x2ZuECgwZTPLFhYFFR1Fq7ZPLxHLzJYYWjRK7v9NzzqRBFsXyf902ybfY7KO9loLG8B0wjdOuli3wKO2u/gGif+9WCX55FqNa62udmeWFGBYrSQaj91vTMowpa2GSPmKqa59oKJqxnbRRQTQyw1lWUwQDuffyoPvKKEms4tz3D8wgB8Av5vJ+IO3f+nzjcMDMwJAhhuwHw1iy9r7DGiCT2zNgVRRoBakkN3Iv3pBMRqllRuz2JRUb9WXgQ5Ud09pa0zGeOwIDAQAB-----END PUBLIC KEY-----",
                RSAJSEncrypt: false
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
                self.pre_submit = function(pre_submit_callback, pre_submit_failure_callback) {
                    $.ajax({
                        url: (ISLOCAL ? '/api_mock/wcfpay' + conf.salt_url : FM._data.siteurl + conf.salt_url) + '?' + Math.random(),
                        dataType: 'json',
                        type: 'GET',
                        success: function(data) {

                            if (data.body.salt) {

                                var _salt = data.body.salt;

                                // function ___sha_go() {
                                //     conf.em.each(function() {
                                //         var $this = $(this);
                                //         $this.data("cache_val", $this.val());

                                //         // sha256 only
                                //         var _value = sha256_digest(sha256_digest($this.val()) + _salt);

                                //         $this.val(_value);
                                //     });
                                //     pre_submit_callback();
                                // }

                                // function ___aes_sha_go(AES) {
                                //     conf.em.each(function() {
                                //         var $this = $(this);
                                //         $this.data("cache_val", $this.val());

                                //         var _value = AES.encrypt(key_to_hex(_salt), sha256_digest($this.val()) + _salt);

                                //         $this.val(_value);

                                //     });
                                //     pre_submit_callback();
                                // }

                                function ___rsa_sha_go() {

                                    conf.em.each(function() {
                                        var $this = $(this);
                                        $this.data("cache_val", $this.val());

                                        if (!conf.RSAJSEncrypt) {
                                            conf.RSAJSEncrypt = new FM.plugin.pwd_key.JSEncrypt();
                                            conf.RSAJSEncrypt.setPublicKey(conf.pubkey);
                                        }

                                        var _value = conf.RSAJSEncrypt.encrypt(sha256_digest($this.val()) + _salt);
                                        $this.val(_value);
                                    });
                                    pre_submit_callback();
                                }

                                FM.helper.reqJs('/resource/js/plugin/rsa_key.js', function() {
                                    // alert(1111)
                                    ___rsa_sha_go();
                                })
                                // if (conf.em.filter("[data-encrypt-key=aes]").length) { // rsa aes can only choose one within a form
                                //     FM.helper.reqJs('plugin/sha256', function(AES) {
                                //         ___aes_sha_go(AES);
                                //     })
                                // } else if (conf.em.filter("[data-encrypt-key=rsa]").length) { // rsa aes can only choose one within a form
                                //     FM.helper.reqJs('plugin/rsa_key', function() {
                                //         // alert(1111)
                                //         ___rsa_sha_go();
                                //     })
                                // } else {
                                //     ___sha_go();
                                // }
                            } else {
                                pre_submit_failure_callback(data, 'system error', 'salt can not get');
                            }
                        },
                        error: function(xhr, status, error) {
                            pre_submit_failure_callback(xhr, status, error);
                        }
                    });
                }
            };

            /** pub fn **/
            // get all conf
            this.get_conf = function() {
                return conf;
            };
            this.pre_submit = function() {
                console.log('error, can not init safe component...');
            }

            this._init();
        });
    };
})();