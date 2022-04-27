/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

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
      <p><strong>${userData.created_at}</strong></p>
      <div class="icon-group">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`);
  return $tweet;
};

const renderTweets = function(tweetData) {

  for (const tweeter of tweetData) {
    $('#tweets-container').prepend(createTweetElement(tweeter));
  }
};

$(document).ready(function() {
  renderTweets(tweetData);
});
