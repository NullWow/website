var populateItemsStore = function(elements){
    elements.forEach(element => {
        $('#storeContent')
        .append($('<div>')
            .addClass('col-md-3')
            .addClass('outerBox')
            .append($('<a>')
                .attr('data-wowhead', 'item=' + element[0])
                .append($('<div>')
                    .addClass('col-md-12')
                    .addClass('storeItemName')
                    .append($('<span>')
                        .addClass('text-center')
                        .text(element[3])
                    )
                )
                .append($('<div>')
                    .addClass('row')
                    .addClass('storeButton')
                    .append($('<button>')
                        .addClass('btn')
                        .addClass('btn-secondary')
                        .addClass('btn-block')
                        .text('Adicionar a Conta')
                        .click(function() {storeBuyItem(element)})
                    )
                )
                .append($('<div>')
                    .addClass('row')
                    .addClass('storeContentBottom')
                    .append($('<div>')
                        .addClass('col-md-8')
                        .text(ITEM_TYPES[element[1]][element[2]])
                    )
                    .append($('<div>')
                        .addClass('col-md-4')
                        .text(element[4] + ' VPs')
                    )
                )
            )
        )

    });
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

var storeBuyItem = function(item){
    if(!USER_LOGGED){
        return doToast('warning', 'Error', 'Você precisa estar logado para fazer qualquer compra na store!');
    }
    if(USER_LOGGED.votes < item[4]){
        return doToast('warning', 'VP Insuficiente', 'Você não possúi VP suficiente para comprar esse item!');        
    }
    var selectedChar = $('select[name=storeCharacterSelect]').val();
    // if($('select[name=storeCharacterSelect]').val()){
    //     return doToast('warning', 'Online', 'Você não pode estar online no jogo para comprar itens na loja!')
    // }

    doBuyItem(item[0], selectedChar);
    
}

var doBuyItem = function(itemId, charName){
    $.ajax({
        type: 'POST',
        url: API_URI + 'store/buy',
        data: { item: itemId, name: charName },
        error: function(ret){
            doToastr('warning', 'Error', ret.message, 5000);
        },
        success: function(resp){
            doToastr('success', 'sucesso', 'Logo o ' + charName + ' receberá o item comprado!')
        }
    });
}


var populateCharactersStore = function(chars){
    CHARACTERS = chars;
    chars.forEach(element => {
        if(element[1] == 1){
            $('#storeCharacterSelect')
            .append($('<option>')
                .attr('value', element[0])
                .attr('disabled', true)
                .text(element[0])
            )
        } else {
            $('#storeCharacterSelect')
            .append($('<option>')
                .attr('value', element[0])
                .text(element[0])
            )
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
        },
    15: {
        5: 'Mounts'
    }
}