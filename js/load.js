var loadIndex = function(){
    $('#content').load('components/content/index.html');
    $('#onlineListLink').removeClass('active');
    $('#registerLink').removeClass('active');
    $('#rankList').removeClass('active');
    $('#infoLink').removeClass('active');
    $('#homeLink').addClass('active');
    
};

var loadList = function(){
    $('#homeLink').removeClass('active');
    $('#registerLink').removeClass('active');
    $('#rankList').removeClass('active');
    $('#infoLink').removeClass('active');
    $('#onlineListLink').addClass('active');
    $('#content').load('components/content/onlineList.html');
};


var lodInfo = function(){
    $('#homeLink').removeClass('active');
    $('#registerLink').removeClass('active');
    $('#rankList').removeClass('active');
    $('#onlineListLink').removeClass('active');
    $('#infoLink').addClass('active');
    $('#content').load('components/content/info.html');
};

var loadRankList = function(){
    $('#homeLink').removeClass('active');
    $('#registerLink').removeClass('active');
    $('#onlineListLink').removeClass('active');
    $('#infoLink').removeClass('active');
    $('#rankList').addClass('active');
    $('#content').load('components/content/rankList.html');
};

var loadRegister = function(){
    $('#homeLink').removeClass('active');
    $('#onlineListLink').removeClass('active');
    $('#rankList').removeClass('active');
    $('#infoLink').removeClass('active');
    $('#registerLink').addClass('active');
    $('#content').load('components/content/register.html');
}