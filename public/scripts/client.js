/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const MAX_CHARS = 140;

//function to prevent XSS
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//generate html using user data
const createTweetElement = function(userData) {
  const $tweet = $(`
  <article>
    <header>
      <div class="profile-header">
        <img src="${escape(userData.user.avatars)}">
        <span>${escape(userData.user.name)}</span>
      </div>
      <span><strong>${escape(userData.user.handle)}</strong></span>
    </header>
    <p><strong>${escape(userData.content.text)}</strong></p>
    <footer>
      <p><strong>${timeago.format(escape(userData.created_at))}</strong></p>
      <div class="icon-group">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`);

  return $tweet;
};

//render tweets in index.html
const renderTweets = function(data) {

  //empty container to prevent duplicates on reder
  $('#tweet-container').empty();

  for (const user of data) {
    $('#tweets-container').prepend(createTweetElement(user));
  }
};

$(document).ready(function() {
  //render html using .json file
  const loadTweets = function() {
    $.get('/tweets', function(data) {
      renderTweets(data);
    });
  };

  //event triggers when button is pressed
  $('form').submit(function(event) {
    event.preventDefault();

    const textInput = $('#tweet-text').val().trim();

    $('#empty-string').slideUp();
    $('#max-limit').slideUp();

    //send alert if input text is empty
    if (!textInput) {
      return $('#empty-string').slideDown();
    }

    //send alert if text input exceeds limit
    if (textInput.length > MAX_CHARS) {
      return $('#max-limit').slideDown();
    }

    //send input data to .json file
    $.post('http://localhost:8080/tweets', $('#tweet-text').serialize(), function() {
      loadTweets();

      //clear form after posting
      $('form').trigger('reset');
    });
  });

  //load database when ready
  loadTweets();
});
