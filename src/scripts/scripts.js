fluidvids.init({
  selector: ['iframe'],
  players: ['www.youtube.com', 'player.vimeo.com']
});

$("#show-navigation").on("click", function() {
  $("body").toggleClass("show-nav");
});

$("#hide-navigation").on("click", function() {
  $("body").toggleClass("show-nav");
});


 $(function() {        
    $("#tabContent").organicTabs({
        "speed": 200
    });
});

 jQuery(document).ready(function($) {
  // Please note that autoHeight option has some conflicts with options like imageScaleMode, imageAlignCenter and autoScaleSlider
  // it's recommended to disable them when using autoHeight module
  $('#content-slider-1').royalSlider({
    autoHeight: true,
    arrowsNav: true,
    fadeinLoadedSlide: false,
    controlNavigation: 'bullets',
    controlsInside: false,
    imageScaleMode: 'none',
    imageAlignCenter:false,
    loop: false,
    loopRewind: true,
    numImagesToPreload: 6,
    keyboardNavEnabled: true,
    usePreloader: false
  });
});