//= include coop-frontend-toolkit/scripts/coop-toolkit.js
//= include coop-frontend-toolkit/scripts/modules/coop.Tabs.js
//= include coop-frontend-toolkit/scripts/modules/coop.Toggles.js
//= include coop-frontend-toolkit/scripts/modules/coop.TapCheck.js

$(function() {
  Coop.init();
});

// Responsive sidebar navigation

var sidebar = $('.side-nav'),
    sidebarTrigger = $('.nav-trigger'),
    appWrap = $('.app-content'),
    winHeight = $(document).height();
    keyTrigger = $('#side-navigtion-keytrigger');


function openNavigation(){
  sidebarTrigger.on('click', function(event){
    $(appWrap).toggleClass('nav-is--open');
    $(sidebar).toggleClass('nav-is--closed');
    $(this).toggleClass('trigger-is--on');
    event.preventDefault();
  });
  keyTrigger.on('click', function(event){
    $(appWrap).toggleClass('nav-is--open');
    $(sidebar).toggleClass('nav-is--closed');
    $(sidebarTrigger).toggleClass('trigger-is--on');
    event.preventDefault();
  });
}

function ariaToggle(){
  if ($(appWrap).hasClass('nav-is--open')) {
    $(sidebar).attr('aria-expanded', 'true');
  }
  else {
    $(sidebar).attr('aria-expanded', 'false');
  }
}

// set tab index
function tabIndexing(){
  if ($(appWrap).hasClass('nav-is--open')) {
    $('.side-nav-list-link').attr('tabIndex', 0);
  }
  else {
    $('.side-nav-list-link').attr('tabIndex', -1);
  }
}

function toggleIndexing(){
  if ($('.toggle-content').hasClass('open')) {
    $('.side-nav-list-sub-link').attr('tabIndex', 0);
  }
  else {
    $('.side-nav-list-sub-link').attr('tabIndex', -1);
  }
}
$(sidebar).css({
  'height': winHeight,
});

$(document).ready(function(){
  openNavigation();
  tabIndexing();

  sidebarTrigger.on('click', function(){
    tabIndexing();
    ariaToggle();
  });

  keyTrigger.on('click', function(){
    tabIndexing();
    ariaToggle();
  });

  $('.toggle-content .side-nav-list-sub-link').attr('tabIndex', -1);

  $('.toggle-trigger').on('click', function(){
    toggleIndexing();
    ariaToggle();
  });

});

$(window).on('resize', function(){
  $(sidebar).css({
    'height': winHeight,
  });
});
