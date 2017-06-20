(function ($) {
  //Modal tool tip hide
  function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
      if ("withCredentials" in xhr){
          xhr.open(method, url, true);
      } else if (typeof XDomainRequest != "undefined"){
          xhr = new XDomainRequest();
          xhr.open(method, url);
      } else {
          xhr = null;
      }
      return xhr;
  }

$('.modal-author-hint,.modal-title-hint,.modal-publisher-hint,.modal-contributor-hint').slideUp();

//Top 5 A-C Button
$('#over').on('click', function () {
    // remove resultset if this has already been run
    $('.content div').remove();
    $('.table-content div').remove();
    var url = "https://api.nytimes.com/svc/books/v3/lists/overview.jsonp?callback=foobar";
    url += '&' + $.param({
      'api-key': "974e184c7cfd4c44904bfee8f625fef5"
      });
    // call to API
    var request = createCORSRequest("GET", url);
    if (!request) {
      alert('CORS not supported');
      return;
   }
   // Response handlers.
   request.onload = function() {
      // var text = request.responseText;
      console.log(request.responseText);
      // request.onload = function(){
            var f = new Function("foobar", request.responseText);
            f(function(json){
            var items = [];
          $( "#count" ).html("Showing top 5 for <b style='color:blue;'><span id='topcategory'></span></b>");
          Object.keys(json).forEach(function(key,value){
              if(key == "results"){
                for(var i = 0; i<json[key].lists[1].books.length; i++) {
                  var toprank =(json[key].lists[1].books[i].rank);
                  var topranklw=(json[key].lists[1].books[i].rank_last_week);
                  var topauthor =(json[key].lists[1].books[i].author);
                  var toptitle=(json[key].lists[1].books[i].title);
                  var topdescription=(json[key].lists[1].books[i].description);
                  var toppublisher=(json[key].lists[1].books[i].publisher);
                  var topbookimage=(json[key].lists[1].books[i].book_image);
                  var topcontributor=(json[key].lists[1].books[i].contributor);
                  var copyright = json.copyright;
                  var topcategory = json[key].lists[1].list_name;
                  var topbookurl = (json[key].lists[1].books[i].amazon_product_url);
                  items.push(
                        '<div class="col-sm-6 col-md-4">'+
                          '<a href="'+topbookurl+'" target="_blank"><div class="thumbnail">'+
                            '<img class="overimg" src="'+topbookimage+'" alt="img/book.png">'+
                            '<div class="caption">'+
                              '<h5><b>Title: </b>' + toptitle + '</h5>'+
                              '<h5><b>Author: </b>' + topauthor + '</h5>'+
                              '<p><b>Description: </b>' + topdescription + '</p>'+
                              '<p><b>Publisher: </b>' + toppublisher + '</p>'+
                              '<p><b>Current Rank: </b>' + toprank +'</p>'+
                              '<p><b>Last Week\'s Rank: </b>' + topranklw+ '</p>'+
                            '</div>'+
                          '</div></a>'+
                        '</div>'
                      );
                  }
                  $ul = $('<div class="row" />').appendTo('.content');
                  $ul.append(items);
                }
              $('.panel-footer').html(copyright);
              $('#topcategory').html(topcategory);
            });
          });
        };
   });

   request.onerror = function() {
      alert('Woops, there was an error making the request.');
   };
   request.send();


    // if (request){
    //   request.onload = function(){
    //       var f = new Function("foobar", request.responseText);
    //       f(function(json){
    //       var items = [];
    //     $( "#count" ).html("Showing top 5 for <b style='color:blue;'><span id='topcategory'></span></b>");
    //     Object.keys(json).forEach(function(key,value){
    //         if(key == "results"){
    //           for(var i = 0; i<json[key].lists[1].books.length; i++) {
    //             var toprank =(json[key].lists[1].books[i].rank);
    //             var topranklw=(json[key].lists[1].books[i].rank_last_week);
    //             var topauthor =(json[key].lists[1].books[i].author);
    //             var toptitle=(json[key].lists[1].books[i].title);
    //             var topdescription=(json[key].lists[1].books[i].description);
    //             var toppublisher=(json[key].lists[1].books[i].publisher);
    //             var topbookimage=(json[key].lists[1].books[i].book_image);
    //             var topcontributor=(json[key].lists[1].books[i].contributor);
    //             var copyright = json.copyright;
    //             var topcategory = json[key].lists[1].list_name;
    //             var topbookurl = (json[key].lists[1].books[i].amazon_product_url);
    //             items.push(
    //                   '<div class="col-sm-6 col-md-4">'+
    //                     '<a href="'+topbookurl+'" target="_blank"><div class="thumbnail">'+
    //                       '<img class="overimg" src="'+topbookimage+'" alt="img/book.png">'+
    //                       '<div class="caption">'+
    //                         '<h5><b>Title: </b>' + toptitle + '</h5>'+
    //                         '<h5><b>Author: </b>' + topauthor + '</h5>'+
    //                         '<p><b>Description: </b>' + topdescription + '</p>'+
    //                         '<p><b>Publisher: </b>' + toppublisher + '</p>'+
    //                         '<p><b>Current Rank: </b>' + toprank +'</p>'+
    //                         '<p><b>Last Week\'s Rank: </b>' + topranklw+ '</p>'+
    //                       '</div>'+
    //                     '</div></a>'+
    //                   '</div>'
    //                 );
    //             }
    //             $ul = $('<div class="row" />').appendTo('.content');
    //             $ul.append(items);
    //           }
    //         $('.panel-footer').html(copyright);
    //         $('#topcategory').html(topcategory);
    //       });
    //     });
    //   };
    //   request.send();
    // }
  });

//Best-Seller List - View All Button
  $('#abs').on('click', function () {
      // remove resultset if this has already been run
      $('.content div').remove();
      $('.table-content div').remove();
      var url = "https://api.nytimes.com/svc/books/v3/lists.jsonp?callback=foobar";
      url += '&' + $.param({
        'api-key': "API_KEY"
        });
      var request = createCORSRequest("GET", url);
        if (request){
          request.onload = function(){
            var f = new Function("foobar", request.responseText);
            f(function(json){
          var items = [];
          $( "#count" ).html("<b style='color:blue;'>"+result.num_results+"</b> books found. ");
          $( "#face").html(":P");
          Object.keys(json).forEach(function(key,value){
              if(key == "jsons"){
                  for(var i = 0; i<json[key].length; i++)
                  {
                  var title = (json[key][i].title);
                  var author = (json[key][i].author);
                  var description = (json[key][i].description);
                  var publisher = (json[key][i].publisher);
                  var contributor = (json[key][i].contributor);
                  var copyright = json.copyright;
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
                      );
                    }
                  $ul = $('<div class="row" />').appendTo('.content');
                  $ul.append(items);
                }
            $('.panel-footer').html(copyright);
          });
        });
      };
      request.send();
    }
  }); //close #abs click function


  //All Category Names - View All
  $('#names').on('click', function () {
      // remove resultset if this has already been run
      $('.content div').remove();
      $('.table-content div').remove();
      var url = "https://api.nytimes.com/svc/books/v3/lists/names.jsop?callback=foobar";
      url += '&' + $.param({
        'api-key': "API_KEY"
      });
      var request = createCORSRequest("GET", url);
        if (request){
          request.onload = function(){
            var f = new Function("foobar", request.responseText);
            f(function(json){
          var items = [];
          $( "#count" ).html("<b style='color:blue;'>"+result.num_results+"</b> categories found. ");
          Object.keys(json).forEach(function(key,value){
              if(key == "results"){
                  for(var i = 0; i<json[key].length; i++)
                  {
                  var listName = (json[key][i].list_name);
                  var displayName = (json[key][i].displayName);
                  var oldest = (json[key][i].oldest_published_date);
                  var newest = (json[key][i].newest_published_date);
                  var copyright = json.copyright;
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
        });
      };
      request.send();
    }
  }); //close #abs click function

//Custom Search Modal - Submit Button
$("button#submit").click(function(){
  $('.content div').remove();
  $('.table-content div').remove();
  var str = $("form").serialize();
  var url = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.jsonp?callback=foobar";
  url += '&' + $.param({
  'api-key': "API_KEY"
  })+"&"+str;
    // $.ajax({
    //   url: url,
    //   method: 'GET',
    // })
    // .done(function(result) {
    //   $('#exampleModal').modal('hide');
    //     var data = result;
  var request = createCORSRequest("GET", url);
    if (request){
      request.onload = function(){
        var f = new Function("foobar", request.responseText);
        f(function(json){
        var items = [];
        $( "#count" ).html("<b style='color:blue;'>"+result.num_results+"</b> books found. ");
        $( "#face").html(":P");
        Object.keys(json).forEach(function(key,value){
            if(key == "results"){
                for(var i = 0; i<result[key].length; i++)
                {
                var title = (json[key][i].title);
                var author = (json[key][i].author);
                var description = (json[key][i].description);
                var copyright = json.copyright;
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
                    );
                  }
                $ul = $('<div class="row" />').appendTo('.content');
                $ul.append(items);
              }
            $('.panel-footer').html(copyright);
          });
        });
      };
      request.send();
    }
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
