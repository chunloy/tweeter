$(document).ready(function() {
  //use input event handler
  $('#tweet-text').on('input', function() {
    const charLimit = 140;
    const characters = $(this).val().length; //get character length from input

    //update remaining characters dynamically
    $(this).siblings('div').children('#counter').val(charLimit - characters);

    //change the color of remaining characters if limit is exceeded
    if (characters > charLimit) {
      $('#counter').css('color', 'red');
    } else {
      $('#counter').css('color', '#545454');
    }
  });
});