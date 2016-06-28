(function($){
$.fn.exists = function() {
    return this.length !== 0;
}
function createExcerpts() {
    // do nothing on single post or page views
    if($('body').hasClass('blog')) {
        // duplicate each post, adding appropriate classes
        $('.postcontent').each(function() {
            if($(this).hasClass('excerptCreated')) {
                // do nothing
            }
            // create excerpt
            else {
                // do nothing to short posts if they have no image
                if($(this).text().length <= 300 && !$(this).find('img').exists()) {
                    $(this).addClass('excerptCreated');
                }
                else {
                    var img = "";
                    var vimeo = "";
                    // indicate post has been processed
                    $(this).addClass('excerptCreated');
                    // begin by cloning the full post
                    var excerpt = $(this).clone();
                    // remove ID from excerpt
                    excerpt.removeAttr('id');
                    // hide fullpost
                    $(this).hide();
                    // grab the first image (if there is one) and resize it to a thumbnail
                    if(excerpt.find('img').exists()) {
                        var noEmoji = "";
                        excerpt.find('img').each(function(){
                            if(!$(this).hasClass('emoji')) {
                                noEmoji = $(this);
                                return false; // non-emoji found, exit early
                            }
                            else {
                                // do nothing
                            }
                        });
                        if( noEmoji != "") {
                            img = noEmoji;
                            img.removeClass('alignnone size-full size-large size-medium');
                            img.addClass('alignleft size-thumbnail');
                            // Set size to thumbnail...
                            img.attr('width', '150');
                            img.attr('height', '150');
                            // Strip attributes (including Jetpack Gallery attributes)...
                            img.removeAttr('title sizes srcset data-image-description data-attachment-id data-orig-file data-orig-size data-medium-file data-comments-opened data-image-meta data-image-title data-image-description-medium-file data-large-file data-original-width data-original-height itemprop style');
                            // Remove Jetpack Photon Resizing Info
                            var oldSrc = img.attr('src');
                            oldSrc = oldSrc.replace(/\?resize=([0-9]|[A-Z])([0-9]|[A-Z])([0-9]|[A-Z])\%([0-9]|[A-Z])([0-9]|[A-Z])([0-9]|[A-Z])([0-9]|[A-Z])([0-9]|[A-Z])/, '');
                            // Add "-150x150" before file extension
                            var extension = oldSrc.substr(oldSrc.lastIndexOf('.') +1);
                            var newSrc = oldSrc.replace('.' + extension, '-150x150.' + extension);
                            img.attr('src', newSrc);
                        }
                    }
                    // grab the vimeo iframe if there is one and there is no image
                    else if (excerpt.find('.embed-vimeo').exists()) {
                        vimeo = $(this).clone();
                    }
                    else {
                        var img = "";
                    }
                    // shorten the text inside the excerpt, removing HTML tags
                    excerpt.html("<p>" + excerpt.text().substring(0,300) + "</p>");
                    excerpt.append(vimeo);
                    excerpt.find('p').prepend(img);
                    // add classes to indicate which is excerpt
                    excerpt.addClass('excerpt');
                    $(this).addClass('fullpost');
                    // add "Show More/Less..." links
                    $(this).append("<a class='showless'>(Show less...)</a>");
                    excerpt.append("&nbsp;<a class='showmore'>(Show more...)</a>");
                    // create excerpt element
                    $(this).after(excerpt);
                }
            }
        });
        $('.showless').click(function(){
            var excerpt = $(this).parent().next();
            var fullpost = $(this).parent();
            // animate
            fullpost.slideUp("slow", function() {
                excerpt.slideDown("slow", function() {
                    $('html, body').stop().animate({
                        scrollTop: excerpt.prev().prev().offset().top
                    });
                });
            });
        });
        $('.showmore').click(function(){
            var excerpt = $(this).parent();
            var fullpost = $(this).parent().prev();
            // animate
            excerpt.slideUp("slow", function() {
                fullpost.slideDown("slow", function() {
                    $('html, body').stop().animate({
                        scrollTop: fullpost.prev().offset().top
                    });
                });
            });
        });
        // undo processing if you want to edit the post
        $('.edit-post-link').click(function(){
            var rel = $(this).attr('rel');
            $('#content-' + rel).show();
            $('#content-' + rel).find('.showless').remove();
            $('#content-' + rel).next().remove();
        });
    }
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
