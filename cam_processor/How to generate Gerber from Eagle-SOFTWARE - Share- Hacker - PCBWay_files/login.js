

    function FaceBookLogin() {
        FB.login(function() {
            checkLoginState();
        }, { scope: 'public_profile,email' });
    }
    function statusChangeCallback(response) {

        if (response.status === 'connected') {
            FBLogin(response);

        } else if (response.status === 'not_authorized') {
            alert("login failed");
            //            document.getElementById('status').innerHTML = 'Please log ' +
            //        'into this app.';
        } else {
            alert("login failed");
        }
    }

    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    function checkLoginState() {
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
    }

    window.fbAsyncInit = function() {
        FB.init({
            appId: '371627576337894',
            cookie: false,  
            xfbml: false,  
            version: 'v2.1' 
        });

    };

    // Load the SDK asynchronously
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    } (document, 'script', 'facebook-jssdk'));


    function FBLogin(response) {
        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;
        var form = document.createElement("form");
        form.setAttribute("method", 'post');
        form.setAttribute("action", '/project/member/facebooklogin.aspx');

        var field = document.createElement("input");
        field.setAttribute("type", "hidden");
        field.setAttribute("name", 'accessToken');
        field.setAttribute("value", accessToken);
        form.appendChild(field);
        document.body.appendChild(form);
        form.submit();
    }
