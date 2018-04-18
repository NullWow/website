
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
                $('#registerResponse').text(ret.responseJSON.response);
                console.error('Erro cadastro', ret);
            });            
        },
        success: function(err, resp){
            $('#content').load('components/content/register.html', function(){
                $('#registerResponse').text(ret.responseJSON.response);
            });   
        }
    })
};