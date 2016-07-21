(function($){
$.fn.exists = function() {
    return this.length !== 0;
}
function createExcerpts() {
    // do nothing on single post or page views
    if($('body').hasClass('blog') || $('body').hasClass('archive') || $('body').hasClass('search')) {
        // duplicate each post, adding appropriate classes
        $('.postcontent').each(function() {
            // create excerpt
            if(!$(this).hasClass('excerptCreated')) {
                // do nothing to short posts if they have no image
                if($(this).text().length <= 300 && !$(this).find('img').exists()) {
                    $(this).addClass('excerptCreated');
                }
                else {
                    var img = "";
                    // indicate post has been processed
                    $(this).addClass('excerptCreated');
                    // begin by cloning the full post
                    var excerpt = $(this).clone();
                    // remove title link
                    // make it contract fullpost instead
                    if($(this).find('h2').exists()) {
                        $(this).find('h2:first').find('a').addClass('showless');
                        $(this).find('h2:first').find('a').removeAttr('href');
                    }
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
                            // check if image is self hosted
                            if(img.attr('src').indexOf(document.domain) >= 0) {
                                var oldSrc = img.attr('src');
                                // remove Jetpack Photon resizing info
                                oldSrc = oldSrc.replace(/\?(.*)/, '');
                                // check size of image
                                if(img.hasClass('size-full')) {
                                    img.removeClass('size-full');
                                    // do nothing to filename
                                    // add -150x150 to filename later
                                }
                                else if(img.hasClass('size-large')) {
                                    img.removeClass('size-large');
                                    // remove dimensions from filename (ie. 1024x575)
                                    oldSrc = oldSrc.replace(/\-[0-9]{1,4}x[0-9]{1,3}\./, '.');
                                }
                                else {
                                    img.removeClass('size-medium');
                                    // remove dimensions from filename (ie. 300x168)
                                    oldSrc = oldSrc.replace(/\-[0-9]{1,3}x[0-9]{1,3}\./, '.');
                                }
                                img.removeClass('alignnone alignright aligncenter');
                                img.addClass('alignleft size-thumbnail');
                                // Set size to thumbnail...
                                img.attr('width', '150');
                                img.attr('height', '150');
                                // Strip attributes (including Jetpack Gallery attributes)...
                                img.removeAttr('title sizes srcset data-image-description data-attachment-id data-orig-file data-orig-size data-medium-file data-comments-opened data-image-meta data-image-title data-image-description-medium-file data-large-file data-original-width data-original-height itemprop style');
                                // Add "-150x150" before file extension
                                var extension = oldSrc.substr(oldSrc.lastIndexOf('.') +1);
                                var newSrc = oldSrc.replace('.' + extension, '-150x150.' + extension);
                                img.attr('src', newSrc);
                            }
                            // if image isn't self-hosted, then process it differently
                            // no way of knowing that adding -150x150 will return thumbnail
                            // force image to stretch to 150x150 pixels
                            else {
                                img.removeClass('alignright aligncenter alignnone');
                                img.addClass('alignleft size-thumbnail');
                                img.attr('width', '150');
                                img.attr('height', '150');
                                img.attr('style', 'width:150px !important;height:150px !important;');
                            }
                        }
                        img.addClass('showmore');
                    }
                    else {
                        img = "";
                    }
                    // get blog post title
                    var title = "";
                    if( excerpt.find('h2').exists() ) {
                        title = excerpt.find('h2:first').clone();
                        title.find('a').addClass('showmore');
                        title.find('a').removeAttr('href');
                        excerpt.find('h2:first').remove();
                    }
                    // shorten the text inside the excerpt, removing HTML tags
                    excerpt.html("<p>" + excerpt.text().substring(0,300) + "</p>");
                    excerpt.find('p').prepend(img);
                    excerpt.prepend(title);
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
            var excerpt = $(this).parents('.fullpost').next();
            var fullpost = $(this).parents('.fullpost');
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
            var excerpt = $(this).parents('.excerpt');
            var fullpost = $(this).parents('.excerpt').prev();
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
