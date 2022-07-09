


$(function() {
  $('a#calculate').bind('click', function() {
    console.log("mustapha work fine");
    $.getJSON( '/_add_numbers', {
      a: $('input[name="a"]').val(),
      b: $('input[name="b"]').val()
    }, function(data) {
      $("#result").text(data.result);
    });
    return false;
  });
});



$(function() {
  $('#fliterdata').bind('click', function() {
    console.log("mustapha work fine");
  });
});