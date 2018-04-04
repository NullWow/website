var populateTable = function(elements){
    for(var i = 0; i < elements.length; i++){
        $('#table-content')
        .append($('<tr>')
            .append($('<th>').attr('scope', "row").append($('<p>').text(i)))
            .append($('<td>').append($('<p>').text(elements[i][0])))
            .append($('<td>').append($('<p>').text(elements[i][1])))
            .append($('<td>').append($('<p>').text(elements[i][2])))
            .append($('<td>').append($('<p>').text(elements[i][3])))
            .append($('<td>').append($('<img>').attr('src', elements[i][4] == 0 ? 'img/si-glyph-male.svg' : 'img/si-glyph-female.svg')))
            .append($('<td>').append($('<p>').text(elements[i][5])))
        )
    }
}

var getListPlayersOnline = function(cb){
    $.ajax({
		type: "get",
        // url: './register/usersOnline.php',
        url: 'https://nullwow.bovendorp.org/register/usersOnline.php',
		success: function (msg) {
            populateTable(msg.Characters);
		}
	});
}