var Provider = {
    0: 'TopG',
    1: '',
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
}