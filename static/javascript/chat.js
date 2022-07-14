$(function() {
      $.getJSON('/myapi', {
      }, function(data) {
        var sel = document.querySelector('.mus');
        sel.innerHTML = data.result;
       });
  });