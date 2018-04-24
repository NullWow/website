var loadIndex = function(){
    $('#content').load('components/content/index.html');
    $('#onlineListLink').removeClass('active');
    $('#registerLink').removeClass('active');
    $('#homeLink').addClass('active');
    window.history.pushState("", "", '/');
    
};

var loadList = function(){
    $('#homeLink').removeClass('active');
    $('#registerLink').removeClass('active');
    $('#onlineListLink').addClass('active');
    $('#content').load('components/content/onlineList.html');
    getListPlayersOnline();
    window.history.pushState("", "", '/online');    
};

var loadRegister = function(){
    $('#homeLink').removeClass('active');
    $('#onlineListLink').removeClass('active');
    $('#registerLink').addClass('active');
    $('#content').load('components/content/register.html');
    window.history.pushState("", "", '/register');      
}

var doToastr = function(type, head, text, hide = 2000){
    $.toast({
        heading: head,
        text: text,
        showHideTransition: 'slide',
        icon: type.toLowerCase(),
        position: 'bottom-right',
        stack: false,
        hideAfter: hide
    });
}