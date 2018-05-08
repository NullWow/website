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
            Cookies.set('NULLWOW-SESSION', resp.session, { expires: 1/24 });
            USER_LOGGED = resp.user;
            $('#loginButton').load('components/login/loggedIn.html');
            return doToastr('success', 'Login Success' , 'Seja bem vindo: ' + USER_LOGGED.username + '!');
        }
    });
};

var doGetSession = function(){
    $.ajax({
        type: 'GET',
        url: API_URI + 'session/',
        beforeSend: function(request) {
            request.setRequestHeader("NULLWOW-SESSION", Cookies.get('NULLWOW-SESSION'));
        },
        error: function(ret){
    //        $('#loginButton').load('components/login/loggedOut.html');
            USER_LOGGED = resp.user;                    
            return doToastr('warning', 'Login!' , 'Sessão expirou, faça login novamente!');
        },
        success: function(resp){
            if(resp.error == true){
                return;
            }
            if(resp.session != null) {
                USER_LOGGED = resp.user;
                $('#loginButton').load('components/login/loggedIn.html');
                return doToastr('success', 'Login!' , 'Seja bem vindo: ' + USER_LOGGED.username + '!');
            }
        }
    });
}

var doLogout = function(){
    $.ajax({
        type: 'GET',
        url: API_URI + 'session/logout',
        beforeSend: function(request) {
            request.setRequestHeader("NULLWOW-SESSION", Cookies.get('NULLWOW-SESSION'));
        },
        error: function(ret){
            return doToastr('warning', 'Logout Failed' , 'Erro no logout, fale com um administrador!');
        },
        success: function(resp){
            if(resp.error == true){
                return doToastr('warning', 'Logout Failed' , 'Erro no logout, fale com um administrador!');
            }
            Cookies.remove('NULLWOW-SESSION');
            USER_LOGGED = null;
            $('#loginButton').load('components/login/loggedOut.html');
            return doToastr('success', 'Logout' , 'Você saiu com Sucesso!');
        }
    });
}

var doGetChar = function(){
    if(!USER_LOGGED){
        return doToastr('warning', 'Error', 'Você precisa estar logado para fazer qualquer compra na store!');
    }
    $.ajax({
        type: 'GET',
        url: API_URI + 'user/char/' + USER_LOGGED.id,
        error: function(ret){
            doToastr('warning', 'Error', 'Você não está logado!', 5000);
        },
        success: function(resp){
            doToastr('success', 'deu certo', 'deu certo');
            populateCharactersStore(resp.characters);
        }
    });
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
