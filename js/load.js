var loadIndex = function(){
    $('#content').load('components/content/index.html');
    $('#onlineListLink').removeClass('active');
    $('#registerLink').removeClass('active');
    $('#homeLink').addClass('active');
};

var loadList = function(){
    $('#homeLink').removeClass('active');
    $('#registerLink').removeClass('active');
    $('#onlineListLink').addClass('active');
    $('#content').load('components/content/onlineList.html');
    getListPlayersOnline();
};

var loadRegister = function(){
    $('#homeLink').removeClass('active');
    $('#onlineListLink').removeClass('active');
    $('#registerLink').addClass('active');
    $('#content').load('components/content/register.html');
}

var registerResponse = function(){
    $('content').load('components/content/registerResponse.html');
}

var doSubmit = function(response){
    $('#gResponse').val(response);
    $('#requestForm').submit();
};