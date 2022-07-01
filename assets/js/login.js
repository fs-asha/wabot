(function () {
    "use strict";
    
    var loginbtn = $('#loginBtn');
    var email = $('#email');
    var password = $('#password');
    var alertErr = $('#error-alert');
    var errMsg = $('.error-message');
    var errMsgText = '<strong>Warning!</strong> Please enter valid details.';
    var isNotEmpty;

    loginbtn.on('click', ()=>validate());

    window.validate = function(){
        var username = email.val();
        var passwordkey = password.val();
        isNotEmpty = username!=='' && passwordkey!==''?true:false;
        alertErr.addClass('hide').removeClass('show');
        errMsg.html('');
        alertErr.slideUp(300);
        if (isNotEmpty && username == "demo@fs.com" && passwordkey == "demo1234"){
            loginbtn.html('Login &nbsp;<i class="fa fa-spinner fa-spin fa-fw"></i>');
            loginbtn.attr("disabled", "disabled");
            setTimeout(()=>{
                window.location = "message.html"; // Redirecting to other page.
                return false;
            },1200);
        } else {
            alertErr.addClass('show').removeClass('hide');
            errMsg.html(errMsgText);
            alertErr.slideDown(300);
        }
    };

    $(document).ready(function () {
        alertErr.hide();
    });

})();