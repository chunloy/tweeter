/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//generate html using user data
const createTweetElement = function(userData) {
  const $tweet = $(`
  <article>
    <header>
      <div class="profile-header">
        <img src="${userData.user.avatars}">
        <span>${userData.user.name}</span>
      </div>
      <span><strong>${userData.user.handle}</strong></span>
    </header>
    <p><strong>${userData.content.text}</strong></p>
    <footer>
      <p><strong>${timeago.format(userData.created_at)}</strong></p>
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
  for (const user of data) {
    $('#tweets-container').prepend(createTweetElement(user));
  }
};

$(document).ready(function() {
  //event triggers when button is pressed
  $('form').submit(function(event) {
    event.preventDefault();
    const $queryString = $('#tweet-text').serialize();

    //send input data to .json file
    $.post('http://localhost:8080/tweets/', $queryString, function() {
      loadTweets();
    });

    //render html using .json file
    const loadTweets = function() {
      $.get('http://localhost:8080/tweets/', function(data) {
        renderTweets(data);
      });
    };
  });
});
