// function for sorting the blog posts in the correct order
function markdown_comparer(a, b) {
  var textA = a.innerText
  var textB = b.innerText
  if (textA < textB) 
       return -1; 
  if (textA > textB)
       return 1;
  return 0; 
}

// function for making side nav scroll
function scrollToClass(className) {
  $('html,body').animate({
     scrollTop: $("." + className).offset().top
  });  
}


$( document ).ready(function() {
  // load the nav
  $(".top-nav").load("nav.html");
  
  // read markdown directory
  $.get("./markdown/", function(data) {
    // loop through each file
    $.each(data.split('\n').sort(),function(i, v){
      
      // get the file name
      var file_name = v
      var div_id = file_name.replace(".md","")

      // add a blog-post div
      $(".blog-main").prepend('<div id="' + div_id + '" class="blog-post"></div>')
      // read in each markdown file
      $.get("markdown/" + file_name, function( data ) {
        // convert it to HTML
        html_content = markdown.toHTML( data.toString());
        // give the appropriate classes and convert soundcloud links to players
        $(html_content).each(function(index) { 
          if ( index == 0 ) {
            $("#" + div_id).append( $( this ).addClass("blog-post-title") ) ; 
          } else if( index == 2 ) {
            $("#" + div_id).append( $( this ).addClass("blog-post-meta") ) ;  
            var blog_post_date = $( this ).contents()[0].textContent;
            var blog_post_month = blog_post_date.replace(/ [0-9]{1,2}, /,"");
            $("#" + div_id).addClass( blog_post_month );
          } else if( this.textContent.includes('api.soundcloud.com')) {
            $("#" + div_id).append(
              '<iframe width="100%" height="160" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//' + this.textContent + '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=false"></iframe>'
            )
          } else {
            $("#" + div_id).append( this ) ;  
          }
        });
      });
    });
  });
});
