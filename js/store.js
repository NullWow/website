var populateItemsStore = function(elements){
    for(var i = 0; i < elements.length; i++){
        $('#tableStore-content')
        .append($('<tr>')
            .append($('<th>').attr('scope', "row").text(i))
            .append($('<td>').append($('<a>').attr('data-wowhead', 'item='+elements[i][0]).text(elements[i][3])))
            .append($('<td>').text(ITEM_TYPES[elements[i][1]][elements[i][2]]))
            .append($('<td>').text(elements[i][4]))
        )
    }
};

var doLoadStore = function(){
    $.ajax({
        type: 'GET',
        url: API_URI + 'store/items',
        error: function(ret){
            doToastr('warning', 'Error', 'Erro ao dar load na store, tente novamente mais tarde!', 5000);
        },
        success: function(resp){
            populateItemsStore(resp.items);
        }
    });
}

var ITEM_TYPES = {
    2: {
        0: 'One Handed Axe',
        1: 'Two Handed Axe',
        2: 'Bow',
        3: 'Gun',
        4: 'One Handed Mace',
        5: 'Two Handed Mace',
        6: 'Polearm',
        7: 'One Handed Sword',
        8: 'Two Handed Sword',
        10: 'Staff',
        13: 'Fist Weapon',
        15: 'Dagger',
        16: 'Throw',
        17: 'Spear',
        18: 'Crossbow',
        19: 'Wand',
        20: 'Fishing Pole' 
    },
    4: {
        0: 'Miscellaneous',
        1: 'Cloth',
        2: 'Leather',
        3: 'Mail',
        4: 'Plate',
        6: 'Shield',
        7: 'Libram',
        8: 'Idol',
        9: 'Totem',
        10: 'Sigil'
        }
}