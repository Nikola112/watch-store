$(document).ready(function()
{
    var didScroll;
    var lastScrollTop = 0;
    var delta = 50;
    var navbarHeight = $('#main-navigation').outerHeight();

    $(window).scroll(function(event)
    {
        didScroll = true;
    });

    setInterval(function()
    {
        if (didScroll && $(window).width() < 991.98)
        {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled()
    {
        var st = $(this).scrollTop();

        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight)
        {
            $('#main-navigation').addClass('nav-up');
        }
        else if(st + $(window).height() < $(document).height())
        {
            $('#main-navigation').removeClass('nav-up');
        }
        
        lastScrollTop = st;
    }

    $(".scrollToTop").click(function()
    {
        $('html, body').animate({scrollTop : 0}, 600);
    });
});