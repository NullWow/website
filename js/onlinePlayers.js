var Races = {
    1:  'Human',
    2:  'Orc',
    3:  'Dwarf',
    4:  'Night Elf',
    5:  'Undead',
    6:  'Tauren',
    7:  'Gnome',
    8:  'Troll',
    10: 'Blood Elf',
    11: 'Drainei'
};

var colors = {
    'Warrior'       : '#C79C6E', 
    'Paladin'       : '#F58CBA', 
    'Hunter'        : '#ABD473', 
    'Rogue'         : '#FFF569', 
    'Priest'        : '#FFFFFF', 
    'Deathknight'   : '#C41F3B', 
    'Shaman'        : '#0070DE', 
    'Mage'          : '#60CCF0', 
    'Warlock'       : '#9482C9', 
    'Druid'         : '#FF7D0A'
};

var Class = {
    1:  'Warrior',
    2:  'Paladin',
    3:  'Hunter',
    4:  'Rogue',
    5:  'Priest',
    6:  'Deathknight',
    7:  'Shaman',
    8:  'Mage',
    9:  'Warlock',
    11: 'Druid'
};

var Gender = {
    0: 'img/si-glyph-male.svg',
    1: 'img/si-glyph-female.svg'
};

var populateOnline = function(elements){
    for(var i = 0; i < elements.length; i++){
        $('#tableUsers-content')
        .append($('<tr>')
            .append($('<th>').attr('scope', "row").append($('<p>').text(i + 1)))
            .append($('<td>').text(elements[i][0]))
            .append($('<td>').text(Races[elements[i][1]]))
            .append($('<td>').text(elements[i][2]))
            .append($('<td>').text(Class[elements[i][3]]))
            .append($('<td>').append($('<img>').attr('src', Gender[elements[i][4]])))
        )
    }
}

var getListPlayersOnline = function(cb){
    $.ajax({
		type: "get",
        url: API_URI + 'listas/who',
        error: function(msg) {
            cb(null);
        },
		success: function (msg) {
            cb(msg.players);
		}
	});
};

var getNumPlayersOnline = function(cb){
    $.ajax({
		type: "get",
        url: API_URI + 'listas/who/number',
		success: function (msg) {
            cb(msg.number);
        },
        error: function(err){
            console.log(err);
        }
	});
};

var getRankList = function(){
    $.ajax({
		type: "get",
        url: API_URI + 'listas/rank',
		success: function (msg) {
            populateOnline(msg.players);
		}
	});
};