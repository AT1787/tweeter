/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

$('.error-message').hide()
$('.new-tweet').hide()

$('.composer').on('click', function() {
  $('.new-tweet').slideDown(500)
})

$('.composer').hover(function() {
  $('#test').css('animation-play-state', 'running')
}, function() {
  $('#test').css('animation-play-state', 'paused')
})


const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

const createTweetElement = function(tweetObj, callback) {

  
 const articleTweet = `
    <article class="tweet">
    <header>
      <span><img src=${tweetObj['user']['avatars']}></span>
      <span>${tweetObj['user']['name']}</span>
      <span>${tweetObj['user']['handle']}</span>
    </header>
    <div>
      <span>${callback(tweetObj['content']['text'])}</span>
    </div>
    <footer>
      <span>${tweetObj['created_at']} </span>
      <span><img src='/images/symbol.png'>
      <img src='/images/square.png'>
      <img src='/images/heart.png'>
      </span>
    </footer>
  </article>` 

  const output = $(articleTweet) 

    return output
}



const renderTweets = function(tweets) {
    $('.posted-tweet').empty()
    const tweetKeys = Object.keys(tweets) 
    for(let key of tweetKeys) {
        $('.posted-tweet').prepend(createTweetElement(tweets[key], escape));
    }

  }

  $('.new-tweet form').on('submit', function (event) {
    event.preventDefault();
    const charInput = $('#tweet-text').val()
    
    if(charInput.length > 140) {
      $('.error-message').empty().prepend(`<b>Please enter a character count of less than 140 characters.</b>`)
      $('.error-message').slideDown(300)
    } else if (charInput === '') {
      $('.error-message').empty().prepend('<b>Please enter a tweet.</b>')
      $('.error-message').slideDown(300)

    } else {

    $('.error-message').slideUp(300)

    const tweetOutput = $(this).serialize()
  
    $.ajax( {
      url: '/tweets',
      method: 'POST',
      data: tweetOutput
    })
    .done(function(data) {
      loadTweets(renderTweets)
    })
  }
})
  
  const loadTweets = function(callback) {

  const ajaxResponse = $.ajax( {
      url: '/tweets',
      method: 'GET',
    })
    .done(function(data) {
      callback(data)
    })
    .fail()
  }

  loadTweets(renderTweets)


})

