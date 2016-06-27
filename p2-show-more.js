(function($){
function createExcerpts() {
    // duplicate each post, adding appropriate classes
    $('.postcontent').each(function() {
        if($(this).hasClass('excerptCreated')) {
            // do nothing if the excerpt was already made
        }
        else {
            // indicate post has been processed
            $(this).addClass('excerptCreated');
            // begin by cloning the full post
            var excerpt = $(this).clone();
            // remove the unique ID from the fullpost
            $(this).attr('id','');
            // shorten the text inside the excerpt, removing HTML tags
            excerpt.html("<p>" + excerpt.text().substring(0,300) + "</p>");
            // hide fullpost
            $(this).hide();
            // add classes to indicate which is excerpt
            excerpt.addClass('excerpt');
            $(this).addClass('fullpost');
            // add "Show More/Less..." links
            $(this).append("<a class='showless'>(Show less...)</a>");
            excerpt.append("&nbsp;<a class='showmore'>(Show more...)</a>");
            // create excerpt element
            $(this).after(excerpt);
        }
    });
    $('.showless').click(function(){
        var excerpt = $(this).parent().next();
        var fullpost = $(this).parent();
        // prevent duplicate IDs
        var ID = fullpost.attr('id');
        fullpost.attr('id','');
        excerpt.attr('id',ID);
        // animate
        fullpost.slideUp("slow", function() {
            excerpt.slideDown("slow");
            $('html, body').stop().animate({
                scrollTop: excerpt.offset().top
            });
        });
    });
    $('.showmore').click(function(){
        var excerpt = $(this).parent();
        var fullpost = $(this).parent().prev();
        // prevent duplicate IDs
        var ID = $(this).parent().attr('id');
        fullpost.attr('id',ID);
        excerpt.attr('id','');
        // animate
        excerpt.slideUp("slow", function() {
            fullpost.slideDown("slow");
            $('html, body').stop().animate({
                scrollTop: fullpost.prev().offset().top
            });
        });
    });
}
    $(document).ready(createExcerpts());
    
    // infinite scroll support:
    var lastScrollTop = 0;
    $(window).scroll(function(event) {
        var st = $(this).scrollTop();
        if (st > lastScrollTop) {
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
