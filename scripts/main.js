$(document).foundation();

$(document).ready(function() {

  // Allow skip nav to work correctly
  $(".skip-nav a").click(function(event){
    // strip the leading hash and declare
    // the content we're skipping to
    var skipTo="#"+this.href.split('#')[1];
    // Setting 'tabindex' to -1 takes an element out of normal 
    // tab flow but allows it to be focused via javascript
    $(skipTo).attr('tabindex', -1).on('blur focusout', function () {
        // when focus leaves this element, 
        // remove the tabindex attribute
        $(this).removeAttr('tabindex');
    }).focus(); // focus on the content container
  });

  // Toggle primary navigation mobile
  $('#primary-trigger').on('click', function(e) {
    $('#nav-wrap').toggleClass('is--open');
    $(this).toggleClass('is--active');
    if ($('.mobile-menu-text').text() == "Close")
      $('.mobile-menu-text').text("Menu")
    else
      $('.mobile-menu-text').text("Close");
    e.preventDefault();
  });

  $('#storefinder-toggle').on('click', function(e) {
    $('#store-finder').toggleClass('is--open');
    // if ($(this).text() == "Close")
    //    $(this).text("Find a store")
    // else
    //    $(this).text("Close");
    e.preventDefault();
  });


  (function($) {  
    $.fn.changeElementType = function(newType) {
      for (var k=0;k<this.length; k++) {
       var e = this[k];
       var new_element = document.createElement(newType),
        old_attributes = e.attributes,
        new_attributes = new_element.attributes,
        child = e.firstChild;
       for(var i = 0, len = old_attributes.length; i < len; i++) {
        new_attributes.setNamedItem(old_attributes.item(i).cloneNode());
       }
       do {
        new_element.appendChild(e.firstChild);
       }
       while(e.firstChild);
       e.parentNode.replaceChild(new_element, e);
      }
      return this;
    }
  })(jQuery);

 
  // Toggle
  // Change element type
  $(".toggle--trigger").changeElementType("a");

  // Added CSS 3 transitions with fallback to Jquery for the crap
  if(!Modernizr.csstransitions) {
    $('.toggle--content').hide();
  } else {
    // jQuery won't allow chaining with max-height
    $('.toggle--content').css('max-height', '0px');
    $('.toggle--content').css('opacity', '0');
  }

  $('.toggle--trigger').on("click", function() {

    $(this).toggleClass('is--active');

    // Check for CSS 3 transitions
    if(!Modernizr.csstransitions) {
      // If no use jQuery
      $(this).parent().next().slideToggle();
    } else {
      // If yes use add a class and use CSS bay-bee
      $(this).parent().next().toggleClass('is--expanded');
    }

    return false;

  });


  // Accordion
  $(".accordion-section-title").changeElementType("a");

  // Added CSS 3 transitions with fallback to Jquery for the oldies 
  if(!Modernizr.csstransitions) {
    $('.accordion-section-content').hide();
  } else {
    // jQuery won't allow chaining with max-height
    $('.accordion-section-content').css('max-height', '0px');
    $('.accordion-section-content').css('opacity', '0');

  }

  function close_accordion_section() {
      $('.accordion .accordion-section-title').removeClass('active');
      $('.accordion .accordion-section-content').slideUp(100).removeClass('open');
      $('.accordion--trigger_icon').css('-webkit-transform', 'rotate(0deg)');
    }

  $('.accordion-section-title').click(function(e) {
      // Grab current anchor value
      var currentAttrValue = $(this).attr('href');

      if($(e.target).is('.active')) {
          close_accordion_section();

      } else {
          close_accordion_section();
          $(this).addClass('active');
          $('.accordion ' + currentAttrValue).slideDown(100).addClass('open');
          $(this).children('.accordion--trigger_icon').css('-webkit-transform', 'rotate(180deg)');
      }

      e.preventDefault();
  });



  
});