$(function(){
    $(".startcarousel").click(function(){
        mySwiper.autoplay.start();
        mySwiper.params.autoplay.delay = 2000;
    })
    $(".stopcarousel").click(function(){
        mySwiper.autoplay.stop();
    })
    $(".fastcarousel").click(function(){
        var autoplaydelay = mySwiper.params.autoplay.delay;
        if(autoplaydelay >= 200)
        {
            autoplaydelay = autoplaydelay - 200;
        }
        mySwiper.params.autoplay.delay = autoplaydelay;
    })
    $(".stopcarousel").click(function(){
        var autoplaydelay = mySwiper.params.autoplay.delay;
        if(autoplaydelay <= 4000)
        {
            autoplaydelay = autoplaydelay + 200;
        }
        mySwiper.params.autoplay.delay = autoplaydelay;
    })
})