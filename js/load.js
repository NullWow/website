var loadIndex = function(){
    $('#content').load('components/content/index.html');
    $('#onlineListLink').removeClass('active');
    $('#homeLink').addClass('active');
};

var loadList = function(){
    $('#homeLink').removeClass('active');
    $('#onlineListLink').addClass('active');
    $('#content').load('components/content/onlineList.html');
    getListPlayersOnline();
};