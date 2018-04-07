var Races = {
    1: 'Human',
    2: 'Orc',
    3: 'Dwarf',
    4: 'Night Elf',
    5: 'Undead',
    6: 'Tauren',
    7: 'Gnome',
    8: 'Troll',
    10: 'Blood Elf',
    11: 'Drainei'
};

var Class = {
    1: 'Warrior',
    2: 'Paladin',
    3: 'Hunter',
    4: 'Rogue',
    5: 'Priest',
    6: 'Deathknight',
    7: 'Shaman',
    8: 'Mage',
    9: 'Warlock',
    11: 'Druid'
};

var Gender = {
    0: 'img/si-glyph-male.svg',
    1: 'img/si-glyph-female.svg'
};

var populateTable = function(elements){
    for(var i = 0; i < elements.length; i++){
        $('#table-content')
        .append($('<tr>')
            .append($('<th>').attr('scope', "row").append($('<p>').text(i)))
            .append($('<td>').text(elements[i][0]))
            .append($('<td>').text(Races[elements[i][1]]))
            .append($('<td>').text(elements[i][2]))
            .append($('<td>').text(Class[elements[i][3]]))
            .append($('<td>').append($('<img>').attr('src', Gender[elements[i][4]])))
            .append($('<td>').text(elements[i][5]))
        )
    }
}

var getListPlayersOnline = function(cb){
    $.ajax({
		type: "get",
        url: 'usersOnline.php',
        // url: 'https://nullwow.bovendorp.org/register/usersOnline.php', // TEst url
		success: function (msg) {
            populateTable(msg.Characters);
		}
	});
};

var getNumPlayersOnline = function(cb){
    $.ajax({
		type: "get",
        url: 'usersOnline.php',
        // url: 'https://nullwow.bovendorp.org/usersOnline.php', // TEst url
		success: function (msg) {
            cb(msg.Online);
        },
        error: function(err){
            console.log(err);
        }
	});
};