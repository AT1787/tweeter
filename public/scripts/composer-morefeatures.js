/* jQuery event handlers for animation effects with error messages, composer buttons, and scroller */

$(document).ready(function () {

    $('.error-message').hide()
    $('.new-tweet').hide()
    $('.scrollUp').hide()
    
    $('.composer').on('click', function() {
      if ($('.new-tweet').is(':visible')) {
        $('.new-tweet').slideUp(500)
      } else {
      $('.new-tweet').slideDown(500)
      $('.new-tweet form textarea').focus()
    }
    })
    
    $('.composer').hover(function() {
      $('nav .composer span:nth-child(2)').css('animation-play-state', 'running')
    }, function() {
      $('nav .composer span:nth-child(2)').css('animation-play-state', 'paused')
    })

    $(window).scroll(function() {
        if ($(document).scrollTop() > 50) {
            $('.scrollUp').show() 
        } else {
            $('.scrollUp').hide() 
        }
    })

    $('.scrollUp').on('click', function () {
        window.scrollTo(0, 0)
    })

    $('.scrollUp').hover(function() {
        $('.scrollUp').css('animation-play-state', 'running')
        $('.scrollUp').css('filter', 'drop-shadow(10px 15px 7px grey)');
      }, function() {
        $('.scrollUp').css('animation-play-state', 'paused')
        $('.scrollUp').css('filter', 'none');

    })

})