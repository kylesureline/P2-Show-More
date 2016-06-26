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
        var ID = $(this).parent().attr('id');
        $(this).parent().attr('id','');
        $(this).parent().slideUp(100,function(){
            $(this).parent().next().attr('id',ID);
            $(this).parent().next().slideDown(100);
        });
    });
    $('.showmore').click(function(){
        var ID = $(this).parent().attr('id');
        $(this).parent().attr('id','');
        $(this).parent().slideUp(100, function(){
            $(this).parent().prev().attr('id',ID);
            $(this).parent().prev().slideDown(100);
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
