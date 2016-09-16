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


function openNavigation(){

  sidebarTrigger.on('click', function(event){
    $(appWrap).toggleClass('nav-is--open');
    $(sidebar).toggleClass('nav-is--closed');
    $(this).toggleClass('trigger-is--on');
    event.preventDefault();
  });

}

// set tab index
function tabIndexing(){
   if ($(sidebar).hasClass('nav-is--closed') ) {
    $(this).prop('tabIndex', -1);
  } else {
    $(this).prop('tabIndex', 0);
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
