$(document).keypress(function(e) {
    // 回车键事件  
    if (e.which == 13) {
        Login.LoginWeb();
    }
});

var loginHtml = '<div class="fancybox-opened fancybox" style="width: 767px; height: auto; position: fixed; top: 133px; left: 328px;display:block">';
loginHtml += '<div class="fancybox-skin" style="padding:50px;">';
loginHtml += '<div class="fancybox-outer">';
loginHtml += '<div class="fancybox-inner" style="overflow: auto; width: 667px;">';
loginHtml += '<div class="wrapper">';
loginHtml += '<div class="box_login">';
loginHtml += '<h2 class="heading-title">You must be a registered user to participate!</h2>';
loginHtml += '<div class="left">';
loginHtml += '<p>Login with your e-mail</p>';
loginHtml += '<p><span class="submitwarning" id="msg" style="display: none;"></span>';
loginHtml += '<p><input type="text" value="" class="text-input data-options="required:true,validType:\'length[0,255]\'"';
loginHtml += 'validtype="email" name="email" id="email" maxlength="255" placeholder="E-mail"></p>';
loginHtml += '<p><input type="password" class="text-input  inputbox easyui-validatebox" data-options="required:true,validType:\'password\'"';
loginHtml += 'id="pwd" autocomplete="off" maxlength="255" placeholder="Password" name="pwd"></p>';
loginHtml += '<p><input type="submit" class="button bold" value="LOG IN" name="button" onclick="Login.LoginWeb()"></p>';
loginHtml += '<input type="hidden" name="act" value="save" /></div>';
loginHtml += '<div class="right">';
loginHtml += '<p class="or">Or with..</p>';
loginHtml += '<meta charset="UTF-8">';
loginHtml += '<div>';
loginHtml += '<div class="socialconnect">';
loginHtml += '<a class="facebook icon-sprite" href="javascript:void(0)" onclick="FaceBookLogin()">Login with Facebook</a>';
//loginHtml += '<a class="twitter icon-sprite" href="http://www.pcbway.com/login/twitter">Login with Twitter</a>';
loginHtml += '</div>';
loginHtml += '</div>';
loginHtml += '</div>';
loginHtml += '</div>';
loginHtml += '<p>Not a member yet? <a class="underline" href="http://www.pcbway.com/project/reg.aspx">Register here in a seconds</a></p>';
loginHtml += '</div>';
loginHtml += '</div>';
loginHtml += '</div>';
loginHtml += '<a href="javascript:;" class="fancybox-item fancybox-close" title="Close" onclick="Login.Close()"></a>';
loginHtml += '</div>';
loginHtml += '</div>';
loginHtml += '<div class="fancybox-overlay fancybox fancybox-overlay-fixed" style="display: block; width: auto; height: auto;"></div>';

var Login = {
    LoginHtml: loginHtml,
    ShowLoginHtml: function() {
        if ($(".fancybox-overlay").length == 0) {
            $("body").append(Login.LoginHtml);
        } else {
            $(".fancybox").show();
        }
    },
    Close: function() {
        $(".fancybox").hide();
    },
    LoginWeb: function() {
        var email = $("#email").val();
        var pwd = $("#pwd").val();

        if (email == "" || pwd == "") {
            alert("please input the login info");
            return false;
        }
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/project/ajax/ajaxcheck.aspx?act=login",
            data: { email: email, pwd: pwd },
            success: function(data) {
                if (data.ok) {
                    location.reload();
                } else {
                    $("#msg").html(data.msg);
                    $("#msg").show();
                }
            },
            error: function() {
                alert("error");
            }
        });
    }
}

var Fav = {
    Add: function(blogId, obj) {

        var follow = $.trim($(obj).attr("follow"));
        var type = follow == true ? 0 : 1;
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/project/ajax/ajaxcheck.aspx?act=fav",
            data: { blogid: blogId, type: type },
            success: function(data) {
                if (data.ok) {
                    if (type == 1)
                        $(obj).attr("follow", 0).html("following");
                    else
                        $(obj).attr("follow", 1).html("follow");
                } else {
                    alert(data.msg);
                    return false;
                }
            },
            error: function() {
                alert("error");
            }
        });
    }
}


var Follow = {
    Add: function(objId, obj) {
        if ($("#mbId").val() == 0) {
            Login.ShowLoginHtml();
        } else {
            var type = $.trim($(obj).html()) == "Follow" ? 1 : 0;
            $.ajax({
                type: "post",
                dataType: "json",
                url: "/project/ajax/ajaxcheck.aspx?act=follow",
                data: { mbid: objId, type: type },
                success: function(data) {
                    if (data.ok) {
                        if (type == 1)
                            $(obj).html("Following").removeClass("unfollow");
                        else
                            $(obj).html("Follow").addClass("unfollow");
                    } else {
                        alert(data.msg);
                        return false;
                    }
                },
                error: function() {
                    alert("error");
                }
            });
        }
    },
    AddMember: function(objId, type) {
        if ($("#mbId").val() == 0) {
            Login.ShowLoginHtml();
        } else {
            $.ajax({
                type: "post",
                dataType: "json",
                url: "/project/ajax/ajaxcheck.aspx?act=follow",
                data: { mbid: objId, type: type },
                success: function(data) {
                    if (data.ok) {
                        history.go(0);
                    } else {
                        alert(data.msg);
                        return false;
                    }
                },
                error: function() {
                    alert("error");
                }
            });
        }
    }
}
  
  
  
  
  
  
  
  