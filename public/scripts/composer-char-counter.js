$(document).ready(function () {

    $('.new-tweet textarea').on('keyup', function(event) {
        const valueLength = this.value.length
        const keycount = $( this ).next().find('.counter').text(140 - valueLength)

        if (valueLength > 140) {
            keycount.addClass('errorcount')
        } else if (valueLength <= 140) {
          keycount.removeClass('errorcount')
        }
    })

});


