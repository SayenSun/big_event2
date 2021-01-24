$(function() {
    // 点击“去注册账号”的链接
    $("#link_reg").on("click", function() {
        $(".login-box").hide();
        $(".reg-box").show();
    });

    // 点击“去登录”的链接
    $("#link_login").on("click", function() {
        $(".login-box").show();
        $(".reg-box").hide();
    });
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        username: function(value, item) {
            //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return "用户名不能有特殊字符";
            }
        },
        repwd: function(value) {
            var pwd = $(".reg-box [name=password]").val();
            if (pwd != value) {
                return "两次密码输入不一致!";
            }
        },
    });

    // 监听注册提交事件
    $("#form_reg").on("submit", function(e) {
        e.preventDefault();
        var data = {
            username: $("#form_reg [name = username]").val(),
            password: $("#form_reg [name = password]").val(),
        };
        $.post("/api/reguser", data, function(res) {
            console.log(res);
            if (res.status == 0) {
                layer.msg(res.message, { icon: 6 });
            } else if (res.status == 1) {
                return layer.msg(res.message, { icon: 5 });
            }
            $("#link_login").click();
        });
    });

    // 监听登录提交事件
    $("#form_login").submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                if (status != 0) {
                    return layer.msg("登陆失败!");
                }
                layer.msg("登陆成功!");
                //console.log(res.token);
                localStorage.setItem("token", res.token);
<<<<<<< HEAD
                //location.href = "../../index.html";
=======
                location.href = "./index.html";
>>>>>>> index
            },
        });
    });
});