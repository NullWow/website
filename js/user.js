var login = function() {
    var error = function(ret) {
        return doToastr('warning', 'Login Failed' , 'Usuário ou senha inválidos');
    };

    var success = function(resp){
        if(resp.login == false || resp.error == true){
            return doToastr('warning', 'Login Failed' , 'Usuário ou senha inválidos');

            // return $('#loginMessage').text('Usuario ou senha inválidos!');
        }
        Cookies.set('NULLWOW-SESSION', resp.session, { expires: 1/24 });
        USER_LOGGED = resp.user;
        $('#loginButton').load('components/login/loggedIn.html');
        return doToastr('success', 'Login Success' , 'Seja bem vindo: ' + USER_LOGGED.username + '!');
    };
    var options = {
        type: 'POST',
        data: $('#loginForm').serialize(),
        url: API_URI + 'session/',
        error: error,
        success: success
    };
    doSendRequest(options);
};

var doGetSession = function(){
    var success = function(resp){
        if(resp.error == true){
            console.error(resp);
            return;
        }
        if(resp.session != null) {
            USER_LOGGED = resp.user;
            $('#loginButton').load('components/login/loggedIn.html');
            return doToastr('success', 'Login!' , 'Seja bem vindo: ' + USER_LOGGED.username + '!');
        }
    };

    var options = {
        type: 'GET',
        url: API_URI + 'session',
        success: success
    };

    doSendRequest(options);
}

var doLogout = function(){
    var error =  function(ret){
        return doToastr('warning', 'Logout Failed' , 'Erro no logout, fale com um administrador!');
    };

    var success = function(resp){
        if(resp.error == true){
            return doToastr('warning', 'Logout Failed' , 'Erro no logout, fale com um administrador!');
        }
        Cookies.remove('NULLWOW-SESSION');
        USER_LOGGED = null;
        $('#loginButton').load('components/login/loggedOut.html');
        $('#content').load('components/content/index.html')
        return doToastr('success', 'Logout' , 'Você saiu com Sucesso!');
    }

    var options = {
        type : 'GET',
        url: API_URI + 'session/logout',
        error: error,
        success: success
    };
   
    doSendRequest(options);
}

var doGetChar = function(){
    var success = function(resp){
        populateCharactersStore(resp.characters);
    };
    var error = function(ret){
        doToastr('warning', 'Error', 'Você não está logado!', 5000);
    };
    var obj = {
        type: 'GET',
        url: API_URI + 'user/char/' + USER_LOGGED.id,
        error: error,
        success: success,
        forcedOnline: true
    };
    doSendRequest(obj);
}

var doRecoverPassword = function() {
    var email = $('#emailRecoverPassword').val();
    $('#recoverPasswordButton').prop('disabled', true);
    $.ajax({
        type: 'get',
        url: API_URI + 'recover/password/' + email,
        error: function(){
            $('#recoverPasswordForm').trigger('reset');
            $('#recoverPasswordButton').prop('disabled', false);
            return doToastr('warning', 'Erro Recuperar Senha' , 'Email não existe!');            
        },
        success: function(){
            $('#recoverPasswordForm').trigger('reset');
            $('#recoverPasswordButton').prop('disabled', false);
            return doToastr('success', 'Recuperar Senha' , 'Foi enviado um e-mail de recuperação, por favor, siga os passos nele descrito!');                        
        }
    })
}
