//= require ../../node_modules/coop-frontend-toolkit/scripts/coop-toolkit.js
//= require ../../node_modules/coop-frontend-toolkit/scripts/modules/coop.MenuToggle.js
//= require ../../node_modules/coop-frontend-toolkit/scripts/modules/coop.Tabs.js
//= require ../../node_modules/coop-frontend-toolkit/scripts/modules/coop.Toggles.js

$(function() {
  Coop.init();

  // Mock mobile menu functionality for the header example
  $('.example .mobile-menu-toggle')
    .off('click.MenuToggle')
    .on('click', function(e) {
      e.preventDefault();
      if($(this).hasClass('open')) {
        $(this).add('#navigation-example').removeClass('open').find('.mobile-menu-text').text('Menu');
      }
      else {
        $(this).add('#navigation-example').addClass('open').find('.mobile-menu-text').text('Close');
      }
    });
});
