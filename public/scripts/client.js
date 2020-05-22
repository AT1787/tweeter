
$(document).ready(function () {


/* Takes a data object and transforms in to html template literal form before appended to the main body */

const createTweetElement = function(tweetObj, callback) {

 const newDate = moment(`/Date(${tweetObj['created_at']})`).fromNow()

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
      <span>${newDate} </span>
      <span><img src='/images/symbol.png'>
      <img src='/images/square.png'>
      <img src='/images/heart.png'>
      </span>
    </footer>
  </article>` 

  return $(articleTweet) 
}

/* Escape function to sanitize textarea input to prevent cross site scripting (XSS) */

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

/* Takes 'tweets' data from an object, uses createTweetElement and prepends to html' */

  const renderTweets = function(tweets) {
    $('.posted-tweet').empty()
    const tweetKeys = Object.keys(tweets) 

    for(let key of tweetKeys) {
      $('.posted-tweet').prepend(createTweetElement(tweets[key], escape));
    }
  }

/* Event listener for submitting new tweets - posts to /tweets using ajax' */


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
      $('#tweet-text').val('')
      $('.counter').text(140)
      $('.new-tweet form textarea').focus()
    })
  }
})

/* Function 'loadTweets' for getting tweets, using renderTweets as a callback function' */

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

