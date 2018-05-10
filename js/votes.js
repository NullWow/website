var Provider = {
    0: 'TopG',
    1: 'Top100Arena',
    2: '' 
};

var populateVotes = function(elements){
    for(var i = 0; i < elements.length; i++){
        $('#tableVote-content')
        .append($('<tr>')
            .append($('<th>').attr('scope', "row").append($('<p>').text(i)))
            .append($('<td>').text(elements[i][1]))
            .append($('<td>').text(Provider[elements[i][0]]))
            .append($('<td>').text(elements[i][2]))
        )
    }
};

var loadVotes = function(id){
    if(!id){
        return doToastr('warning', 'Logged Out', 'Você precisa estar logado para ver sua lista de votos');
    }
    $.ajax({
        type: 'get',
        url: API_URI + 'user/votes/' + id,
        error: function(ret){
            doToastr('error', 'Error', 'Contate um administrador no Discord, erro não previsto!');
            console.error(ret);
        },
        success: function(resp){
            populateVotes(resp.votes);
        }
    })
};

var createVoteLinks = function(id){
    $('#voteStore')
        .after($('<a>')
            .addClass('dropdown-item')
            .addClass('white')
            .addClass('disabled')
            // .prop('href','http://www.topservers200.com/in.php?id=19999&userId=' + id)
            // .prop('target', '_blank')
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
            // .addClass('disabled')
            .prop('href','http://www.top100arena.com/in.asp?id=93676&incentive=' + id)
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
