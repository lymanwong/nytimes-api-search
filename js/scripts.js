(function ($) {
  //Modal tool tip hide
  $('.modal-author-hint,.modal-title-hint,.modal-publisher-hint,.modal-contributor-hint').slideUp();

//Top 5 A-C Button
  $('#over').on('click', function () {
      // remove resultset if this has already been run
      $('.content div').remove();
      $('.table-content div').remove();
      var url = "https://api.nytimes.com/svc/books/v3/lists/overview.jsonp?callback=foobar";
      url += '&' + $.param({
        'api-key': "API_KEY"
        });
      $.ajax({
        url: url,
        method: 'GET',
        dataType:'jsonp',
      })
      .done(function(result) {
          var data = result;
          var items = [];
          $( "#count" ).html("Showing top 5 for <b style='color:blue;'><span id='topcategory'></span></b>");
          Object.keys(result).forEach(function(key,value){
              if(key == "results"){
                for(var i = 0; i<result[key].lists[1].books.length; i++) {
                  var toprank =(result[key].lists[1].books[i].rank)
                  var topranklw=(result[key].lists[1].books[i].rank_last_week)
                  var topauthor =(result[key].lists[1].books[i].author);
                  var toptitle=(result[key].lists[1].books[i].title);
                  var topdescription=(result[key].lists[1].books[i].description);
                  var toppublisher=(result[key].lists[1].books[i].publisher);
                  var topbookimage=(result[key].lists[1].books[i].book_image);
                  var topcontributor=(result[key].lists[1].books[i].contributor);
                  var copyright = result.copyright;
                  var topcategory = result[key].lists[1].list_name;
                  var topbookurl = (result[key].lists[1].books[i].amazon_product_url);
                  items.push(

                        '<div class="col-sm-6 col-md-4">'+
                          '<div class="thumbnail">'+
                            '<a href="'+topbookurl+'" target="_blank"><img class="overimg" src="'+topbookimage+'" alt="img/book.png"></a>'+
                            '<div class="caption">'+
                              '<h5><b>Title: </b>' + toptitle + '</h5>'+
                              '<h5><b>Author: </b>' + topauthor + '</h5>'+
                              '<p><b>Description: </b>' + topdescription + '</p>'+
                              '<p><b>Publisher: </b>' + toppublisher + '</p>'+
                              '<p><b>Current Rank: </b>' + toprank + '</p>'+
                              '<p><b>Last Weeks Rank </b>' + topranklw+ '</p>'+
                            '</div>'+
                          '</div>'+
                        '</div>'
                      )
                  }
                  $ul = $('<div class="row" />').appendTo('.content');
                  $ul.append(items);
              }
          $('.panel-footer').html(copyright);
          $('#topcategory').html(topcategory);
        });
      })
  }); //close #abs click function


//Best-Seller List - View All Button
  $('#abs').on('click', function () {
      // remove resultset if this has already been run
      $('.content div').remove();
      $('.table-content div').remove();
      var url = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json";
      url += '?' + $.param({
        'api-key': "API_KEY"
        });
      $.ajax({
        url: url,
        method: 'GET',
      })
      .done(function(result) {
          var data = result;
          var items = [];
          $( "#count" ).html("<b style='color:blue;'>"+result.num_results+"</b> books found. ");
          $( "#face").html(":P");
          Object.keys(result).forEach(function(key,value){
              if(key == "results"){
                  for(var i = 0; i<result[key].length; i++)
                  {
                  var title = (result[key][i].title);
                  var author = (result[key][i].author);
                  var description = (result[key][i].description);
                  var publisher = (result[key][i].publisher)
                  var contributor = (result[key][i].contributor)
                  var copyright = result.copyright;
                  items.push(

                        '<div class="col-sm-6 col-md-4">'+
                          '<div class="thumbnail">'+
                            '<img src="img/book.png" alt="...">'+
                            '<div class="caption">'+
                              '<h5><b>Title: </b>' + title + '</h5>'+
                              '<h5><b>Author: </b>' + author + '</h5>'+
                              '<p><b>Description: </b>' + description + '</p>'+
                              '<p><b>Publisher: </b>' + publisher + '</p>'+
                              '<p><b>Contributor: </b>' + contributor + '</p>'+
                            '</div>'+
                          '</div>'+
                        '</div>'
                      )
                  }
                  $ul = $('<div class="row" />').appendTo('.content');
                  $ul.append(items);
                  // $('.content').append(items);
              }
          $('.panel-footer').html(copyright);
        });
      })
  }); //close #abs click function


  //All Category Names - View All
  $('#names').on('click', function () {
      // remove resultset if this has already been run
      $('.content div').remove();
      $('.table-content div').remove();
      var url = "https://api.nytimes.com/svc/books/v3/lists/names.json";
      url += '?' + $.param({
        'api-key': "API_KEY"
      });
      $.ajax({
        url: url,
        method: 'GET',
      })
      .done(function(result) {
        console.log(result);
          var items = [];
          $( "#count" ).html("<b style='color:blue;'>"+result.num_results+"</b> categories found. ");
          Object.keys(result).forEach(function(key,value){
              if(key == "results"){
                  for(var i = 0; i<result[key].length; i++)
                  {
                  var listName = (result[key][i].list_name);
                  var displayName = (result[key][i].displayName);
                  var oldest = (result[key][i].oldest_published_date);
                  var newest = (result[key][i].newest_published_date);
                  var copyright = result.copyright;
                  items.push("<tr>"+"<td>"+listName+"</td>" + "</td>" + "<td>"+oldest+"</td>" + "<td>" + newest + "</td>"+"</tr>");
                  }
                  $ul = $(
                      '<table class="table table-hover">'+
                        '<thead>'+
                          '<tr>'+
                            '<th>Category Name</th>'+
                            '<th>Oldest Publish Date</th>'+
                            '<th>Newest Publish Date</th>'+
                          '</tr>'+
                        '</thead>'+
                        '<tbody class="table-rows">'+

                          '</tbody>'+
                      '</table>'
                      ).appendTo('.table-content');
                  $ul.append(items);
              }
          $('.panel-footer').html(copyright);
        });
      })
  }); //close #name click function

//Custom Search Modal - Submit Button
$("button#submit").click(function(){
  $('.content div').remove();
  $('.table-content div').remove();
  var str = $("form").serialize();
  var url = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json";
  url += '?' + $.param({
  'api-key': "API_KEY"
  })+"&"+str;
    $.ajax({
      url: url,
      method: 'GET',
    })
    .done(function(result) {
      $('#exampleModal').modal('hide');
        var data = result;
        var items = [];
        $( "#count" ).html("<b style='color:blue;'>"+result.num_results+"</b> books found. ");
        $( "#face").html(":P");
        Object.keys(result).forEach(function(key,value){
            if(key == "results"){
                for(var i = 0; i<result[key].length; i++)
                {
                var title = (result[key][i].title);
                var author = (result[key][i].author);
                var description = (result[key][i].description);
                var copyright = result.copyright;
                items.push(

                      '<div class="col-sm-6 col-md-4">'+
                        '<div class="thumbnail">'+
                          '<img src="img/book.png" alt="...">'+
                          '<div class="caption">'+
                            '<h5>' + title + '</h5>'+
                            '<h5>' + author + '</h5>'+
                            '<p>' + description + '</p>'+
                          '</div>'+
                        '</div>'+
                      '</div>'
                    )
                }
                $ul = $('<div class="row" />').appendTo('.content');
                $ul.append(items);
                // $('.content').append(items);
            }
        $('.panel-footer').html(copyright);
      });
    })
  }); //close #abs click function

  //Modal tool tip show/hide
  $('#author').mouseover(function(){
    $('.modal-author-hint').slideDown('slow');
  }).mouseout(function(){
    $('.modal-author-hint').slideUp('slow');
  });
    $('#title').mouseover(function(){
    $('.modal-title-hint').slideDown('slow');
  }).mouseout(function(){
    $('.modal-title-hint').slideUp('slow');
  });
    $('#contributor').mouseover(function(){
    $('.modal-contributor-hint').slideDown('slow');
  }).mouseout(function(){
    $('.modal-contributor-hint').slideUp('slow');
  });
    $('#publisher').mouseover(function(){
    $('.modal-publisher-hint').slideDown('slow');
  }).mouseout(function(){
    $('.modal-publisher-hint').slideUp('slow');
  });
}(jQuery));

