$(function(){

  $.get('/weeds', appendToList);

  $('form').on('submit', function(event) {
    event.preventDefault();

    var form = $(this);
    var weedData = form.serialize();

    $('.alert').hide();

    $.ajax({ type: 'POST', url: '/weeds', data: weedData })
     .error(function() {
      $('.alert').show();
      console.log(weedData);
      })
      .success(function(weedName){
        appendToList([weedName]);
        form.trigger('reset');
      });
  });

  function appendToList(weeds) {
    var list = [];
    var content, weed;
    for(var i in weeds){
      weed = weeds[i];
      content = '<a href="/weedes/'+weed+'">'+weed+'</a>'+ // + // example on how to serve static images
        ' <a href="#" data-weed="'+weed+'">'+
        '<img src="delete.png" width="15px"></a>';
      list.push($('<li>', { html: content }));
    }

    $('.weed-list').append(list)
  }


  $('.weed-list').on('click', 'a[data-weed]', function (event) {
    if(!confirm('Are you sure ?')){
      return false;
    }

    var target = $(event.currentTarget);

    $.ajax({
      type: 'DELETE',
      url: '/weeds/' + target.data('weed')
    }).done(function () {
      target.parents('li').remove();
    });
  });

});
