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

var login = function() {
    $.ajax({
        type: 'POST',
        data: $('#loginForm').serialize(),
        url: API_URI + 'session/',
        error: function(ret){
           $('#loginMessage').text('Usuario ou senha inválidos!');
        },
        success: function(resp){
            if(resp.login == false || resp.error == true){
                return $('#loginMessage').text('Usuario ou senha inválidos!');   
            }
            USER_LOGGED = resp.session;
            $('#loginButton').load('components/login/loggedIn.html');
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

var swapLogin = function(){
    
}

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
}
var createVoteLinks = function(id){
    $('#voteStore')
        .after($('<a>')
            .addClass('dropdown-item')
            .addClass('white')
            .prop('href','https://www.xtremetop100.com/in.php?site=1132365223&postback=' + id)
            .prop('target', '_blank')
            .text('XtremeTop100')
            .append($('<img>')
                .addClass('float-right')
                .prop('src','https://www.xtremeTop100.com/votenew.jpg')
                .prop('width',55)
                .prop('height', 30)
                .prop('border', 0)
            )
        )
        .after($('<a>')
            .addClass('dropdown-item')
            .addClass('white')
            .prop('href','http://www.topservers200.com/in.php?id=19999&userId=' + id)
            .prop('target', '_blank')
            .text('TopServers200')
            .append($('<img>')
                .addClass('float-right')
                .prop('src','https://www.topservers200.com/button/19999.png')
                .prop('width',55)
                .prop('height', 30)
                .prop('border', 0)
            )
        )
        .after($('<a>')
            .addClass('dropdown-item')
            .addClass('white')
            .prop('href','http://www.top100arena.com/in.asp?id=93676?incentive=' + id)
            .prop('target', '_blank')
            .text('Top100Arena')
            .append($('<img>')
                .addClass('float-right')
                .prop('src','https://www.top100arena.com/hit.asp?id=93676&c=WoW&t=1')
                .prop('width',55)
                .prop('height', 30)
                .prop('border', 0)
            )
        )
        .after($('<a>')
                .addClass('dropdown-item')
                .addClass('white')
                .prop('href','https://topg.org/wow-private-servers/in-488461-' + id)
                .prop('target', '_blank')
                .text('TopG Vote')
                .append($('<img>')
                    .addClass('float-right')
                    .prop('src','https://topg.org/topg2.gif')
                    .prop('width',55)
                    .prop('height', 30)
                    .prop('border', 0)
                )
        )
}