/**
 * Show a toastr!
 * @param {String} type Type: success|error|warning|info
 * @param {String} head Header text!
 * @param {String} text Text that will appea
 * @param {Number} hide Milliseconds toastr will be visible!
 */
var doToastr = function(type, head, text, hide = 2000){
    $.toast({
        heading: head,
        text: text,
        showHideTransition: 'slide',
        icon: type.toLowerCase(),
        position: 'bottom-right',
        stack: true,
        hideAfter: hide
    });
}

var doSendRequest = function(obj) {
    var header          = Cookies.get('NULLWOW-SESSION');
    var options         = {};
    options.type        = obj.type;
    options.url         = obj.url;
    options.error       = obj.error;
    options.success     = obj.success;

    if(obj.forcedOnline){
        if(!header){
            return doToastr('warning', 'Logged-out', 'Você precisa estar logado para fazer essa requisição!');
        }
    }
    if(header){
        options.beforeSend = function(request){ request.setRequestHeader("NULLWOW-SESSION", Cookies.get('NULLWOW-SESSION')); }
    }
    if(obj.type != 'get' && obj.data != null){
        options.data    = obj.data;
    }

    $.ajax(options);
}