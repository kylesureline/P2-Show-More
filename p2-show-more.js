(function($){
function createExcerpts() {
    // duplicate each post, adding appropriate classes
    $('.postcontent').each(function() {
      if($(this).hasClass('excerptCreated')) {
        // do nothing if the excerpt was already made
      }
      else {
        $(this).addClass('excerptCreated');
        var ID = $(this).attr('id');
        var excerpt = $(this).clone();
        $(this).attr('id','');
        excerpt.attr('id',ID);
        excerpt.html(excerpt.text().substring(0,300))
        $(this).append("<a class='showless'>(Show less...)</a>");
        $(this).hide();
        excerpt.addClass('excerpt');
        $(this).addClass('fullpost');
        excerpt.append("&nbsp;<a class='showmore'>(Show more...)</a>");
        $(this).after(excerpt);
      }
    });
    $('.showless').click(function(){
      var ID = $(this).parent().attr('id');
      $(this).parent().attr('id','');
      $(this).parent().hide();
      $(this).parent().next().attr('id',ID);
      $(this).parent().next().show();
    });
    $('.showmore').click(function(){
      var ID = $(this).parent().attr('id');
      $(this).parent().attr('id','');
      $(this).parent().hide();
      $(this).parent().prev().attr('id',ID);
      $(this).parent().prev().show();
    });
  }
  $(document).ready(createExcerpts());
  // infinite scroll support:
  var lastScrollTop = 0;
  $(window).scroll(function(event){
    var st = $(this).scrollTop();
    if (st > lastScrollTop){
      // downscroll code
      createExcerpts();
    }
    else {
      // upscroll code
      // do nothing
    }
    lastScrollTop = st;
  });
})(jQuery);