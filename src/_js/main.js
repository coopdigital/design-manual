//= require ../../node_modules/coop-frontend-toolkit/scripts/coop-toolkit.js
//= require ../../node_modules/coop-frontend-toolkit/scripts/modules/coop.Tabs.js
//= require ../../node_modules/coop-frontend-toolkit/scripts/modules/coop.Toggles.js
//= require ../../node_modules/coop-frontend-toolkit/scripts/modules/coop.TapCheck.js   

$(function() {
  Coop.init();
});    

// Responsive sidebar navigation

var sidebar = $('.side-nav'),
    sidebarTrigger = $('.nav-trigger'),
    appWrap = $('.app-content'),
    winHeight = $(document).height();

// Different navigation pattern at different break points
function openNavigation(){

  sidebarTrigger.on('click', function(event){
    // $(sidebar).toggleClass('nav-is--open');
    $(appWrap).toggleClass('nav-is--open');
    event.preventDefault();
  }); 

}

// set tab index
function tabIndexing(){

  if ( $('html').attr('class') == 'nav-is--closed' ) {
    $(sidebar).prop('tabIndex', 0);
  } else {
    $(sidebar).prop('tabIndex', -1);
  }

}

$(sidebar).css({
  'height': winHeight,
});

$(document).ready(function(){

  openNavigation();
  tabIndexing();

});

$(window).on('resize', function(){

  $(sidebar).css({
    'height': winHeight,
  });

});
