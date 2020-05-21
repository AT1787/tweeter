$(document).ready(function () {

    $('.error-message').hide()
    $('.new-tweet').hide()
    
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

})