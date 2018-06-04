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
                horde++;
                break;
            case '3':
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
                horde++;
                break;
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
                display: false,
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
    });
    return cb('classesChart', classesValue);
}

var generateClassesGraph = function(chartId, classes) {
    var ctxD = document.getElementById(chartId).getContext('2d');
    var bgColors = [];
    var data = [];
    var labels = [];
    
    for (var key in classes) {
        if(classes[key] > 0){
            data.push(classes[key]);
            labels.push(key);
        }
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
                    borderWidth: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            legend: {
                display: false,
                labels: {
                    fontColor: 'white'
                }
            }

        }    
    });
    return;

}