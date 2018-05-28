var doToastr = function(type, head, text, hide = 2000){
    $.toast({
        heading: head,
        text: text,
        showHideTransition: 'slide',
        icon: type.toLowerCase(),
        position: 'bottom-right',
        stack: false,
        hideAfter: hide
    });
};

var calculateFaction = function(players, cb){
    if(!players){
        return cb(false);
    }
    var horde = 0;
    var ally = 0;
    players.forEach(element => {
        switch (element[1]) {
            case '1':
                ally++;
                break;
            case '2':
            case '3':
                horde++;
                break;
            case '4':
                ally++;
                break;
            case '5':
            case '6':
                horde++;
                break;
            case '7':
                ally++;
                break;
            case '8':
                horde++;
                break;
            case '10':
            case '11':
                ally++;
                break;
            default:
                break;
        }
    });
    return cb( 'factionChart', { horde: horde, ally: ally });

}

var generateFactionGraph = function (chartId, factions) {
    var ctxD = document.getElementById(chartId).getContext('2d');
    var myLineChart = new Chart(ctxD, {
        type: 'doughnut',
        data: {
            labels: ["Hordes", "Ally"],
            datasets: [
                {
                    data: [factions.horde, factions.ally],
                    backgroundColor: ["#8C1616", "#000080"],
                    hoverBackgroundColor: ["#CC311B", "#2D217F"],
                    borderWidth: 0.2
                }
            ]
        },
        options: {
            responsive: true,
            legend: {
                labels: {
                    fontColor: 'white'
                }
            }

        }    
    });
    return;
}

var calculateClasses = function (players, cb) {
    if(!players) { return cb(false); }

    var classes = [];
    var classesValue = {};
    classesValue['Warrior']      = 0;
    classesValue['Rogue']        = 0;
    classesValue['Paladin']      = 0;
    classesValue['Priest']       = 0;
    classesValue['Warlock']      = 0;
    classesValue['Hunter']       = 0;
    classesValue['Deathknight']  = 0;
    classesValue['Druid']        = 0;
    classesValue['Mage']         = 0;
    classesValue['Shaman']       = 0;
    
    players.forEach(element => {
        classesValue[Class[element[3]]]++;
        if(! classes.includes(Class[element[3]])) {
            classes.push(Class[element[3]]);
        }
    });
    return cb('classesChart', classesValue, classes);
}

var generateClassesGraph = function(chartId, classes, labels) {
    var ctxD = document.getElementById(chartId).getContext('2d');
    var bgColors = [];
    var data = [];
    var colors = {
        'Warrior': '#C79C6E', 
        'Paladin': '#F58CBA', 
        'Hunter': '#ABD473', 
        'Rogue': '#FFF569', 
        'Priest': '#FFFFFF', 
        'Deathknight': '#C41F3B', 
        'Shaman': '#0070DE', 
        'Mage': '#6OCCF0', 
        'Warlock': '#9482C9', 
        'Druid': '#FF7D0A'
    };


    for (var key in classes) {
        if(classes[key] > 0)
            data.push(classes[key]);
    }

    labels.forEach(element => {
        bgColors.push(colors[element]);
    });

    var myLineChart = new Chart(ctxD, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: bgColors,
                    hoverBackgroundColor: bgColors,
                    borderWidth: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            legend: {
                labels: {
                    fontColor: 'white'
                }
            }

        }    
    });
    return;

}