
var registerResponse = function(){
    $('content').load('components/content/registerResponse.html');
}

var doRegister = function(response){
    $('#gResponse').val(response);
    $('#buttonRegister').addClass('hide');
    $('#loaderRegister').removeClass('hide');
    
    $.ajax({
        type: 'POST',
        data: $('#registerForm').serialize(),
        url: API_URI + 'user/register',
        error: function(ret){
            $('#content').load('components/content/register.html', function(){
                if(ret.status == 400){
                    return doToastr('error', 'Registro', 'Erro no cadastro, ' + ret.responseJSON.response);                
                }
                doToastr('error', 'Registro', 'Erro no cadastro!, entre em contato com o administrador pelo facebook ou discord!')
                console.error('Erro cadastro', ret);
            });            
        },
        success: function(err, resp){
            $('#content').load('components/content/register.html', function(){
                doToastr('success', 'Registro', 'Registro efetuado com sucesso! Enviamos um e-mail de boas vindas!');
            });   
        }
    });
};

var doChangePassword = function(){
    if(!USER_LOGGED.id){
        return doToastr('warning', 'Você não está Logado', 'Você precisa estar logado para trocar sua senha!');
    }
    $.ajax({
        type: 'POST',
        data: $('#updatePasswordForm').serialize(),
        url: API_URI + 'user/updatePassword',
        error: function(ret){
            doToastr('warning', 'Error', 'Credenciais Inválidas! Tente novamente ou entre em contato com o administrador pelo <b>Discord</b> ou Facebook!', 5000);    
            $('#updatePasswordForm').trigger('reset');
        },
        success: function(err, resp){
            doToastr('success', 'Sucesso!', 'Senha trocada com sucesso!');
            $('#updatePasswordForm').trigger('reset');
        }
    });
}