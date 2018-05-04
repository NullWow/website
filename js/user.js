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