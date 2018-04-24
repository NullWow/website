var login = function() {
    $.ajax({
        type: 'POST',
        data: $('#loginForm').serialize(),
        url: API_URI + 'session/',
        error: function(ret){
                return doToastr('warning', 'Login Failed' , 'Usuário ou senha inválidos');

        },
        success: function(resp){
            if(resp.login == false || resp.error == true){
                return doToastr('warning', 'Login Failed' , 'Usuário ou senha inválidos');

                // return $('#loginMessage').text('Usuario ou senha inválidos!');
            }
            USER_LOGGED = resp.session;
            $('#loginButton').load('components/login/loggedIn.html');
            return doToastr('success', 'Login Success' , 'Seja bem vindo: ' + USER_LOGGED.username + '!');
        }
    });
};

var verifyLoggedIn = function(cb){
    $.ajax({
        type: 'GET',
        url: API_URI + 'session/',
        error: function(ret){
           $('#loginMessage').text(ret.error);
        },
        success: function(resp){
            USER_LOGGED = resp.session;
            if(cb){
                cb(false, resp.session);
            }
        }
    })
};



var doLogout = function() {
    $.ajax({
        type: 'DELETE',
        url: API_URI + 'session/',
        error: function(ret){
           console.error(ret);
        },
        success: function(resp){
            user = resp.session;
            $('#loginButton').load('components/login/loggedOut.html');
        }
    })
};