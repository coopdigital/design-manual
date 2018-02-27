//= include includes/coop-toolkit.js
//= include includes/feedback.js
//= include includes/FeedbackWrongInfo.js

$(function(){

  $('.dm-page-nav').fixedsticky();

  // $.fn.isInViewport = function() {
  //   var elementTop = $(".example-full").offset().top;
  //   var elementBottom = elementTop + $(".example-full").outerHeight();
  //   var viewportTop = $(window).scrollTop();
  //   var viewportBottom = viewportTop + $(window).height();
  //   return elementBottom > viewportTop && elementTop < viewportBottom;
  // };
  //
  //
  // $(window).on('resize scroll', function() {
  //   var fixed = $('.fixedsticky');
  //
  //   var fixed_position = $('.fixedsticky').offset().top;
  //   var fixed_height = $('.fixedsticky').height();
  //
  //   if ($('.example-full').isInViewport()) {
  //
  //     var toCross_position = $('.example-full').offset().top;
  //     var toCross_height = $('.example-full').height();
  //
  //     // $('.example-full').each(function() {
  //     //
  //     //
  //     //
  //     // });
  //
  //     if (fixed_position + fixed_height  < toCross_position) {
  //       fixed.removeClass('is--hidden');
  //     } else if (fixed_position > toCross_position + toCross_height) {
  //       fixed.removeClass('is--hidden');
  //     } else {
  //       fixed.addClass('is--hidden');
  //     }
  //
  //   }
  // });

  Coop.init();

  function showElement(element) {
    $(element).show().removeAttr('hidden').attr('aria-hidden', false);
    $(element).find(':input').prop('disabled', false);
  }

  function hideElement(element) {
    $(element).hide().attr('hidden', '').attr('aria-hidden', true);
    $(element).find(':input').prop('disabled', true);
  }

  // When "none of the above" checked, uncheck all others in fieldset
  $(document).on('change', '[data-none-of-the-above]', function(){
    if ($(this).is(':checked')) {
      $(this).parents('fieldset')
        .find(':input').not(this)
        .prop('checked', false)
        .trigger('change');
    }
  });

  // When any checkbox checked, uncheck "none of the above" if it exists
  $(document).on('change', 'input[type=checkbox]', function(){
    if ($(this).is(':checked')) {
      $(this).parents('fieldset')
        .find('[data-none-of-the-above]').not(this)
        .prop('checked', false)
        .trigger('change');
    }
  });

  // Allow content to be revealed after selecting a radio button.
  // Add a data-show attribute to the input
  // and specify the target with data-target='#foo'
  $(document).on('change', "input[type=radio][data-show]", function(){
    // hide all targets within the container
    $(this).parents("form").find("input[data-show]").each(function(){
      hideElement($(this).data('target'));
    });

    // show the selected target
    showElement($(this).data('target'));
  });

  $(document).on('change', "input[type=radio][data-hide]", function(){
    hideElement($(this).data('target'));
  });

  // On page load, hide all the toggle-able content
  $("input[data-show]").each(function(){
    hideElement($(this).data('target'));
  });

  // ...and show the selected radio button's target
  var $target = $("input[type=radio][data-show]:checked").data('target');
  showElement($target);

  function toggleInputLabelClass(input) {
    var $input = $(input);

    $input.parents(".block-label").toggleClass("checked", $input.is(":checked"));
  }

  $(".block-label").find("input[type=checkbox], input[type=radio]").on("change", function(){
    $(this).parents('fieldset').find('input[type=checkbox], input[type=radio]').each(function(){
      toggleInputLabelClass(this);
    });
  });

  $(".block-label").find("input[type=checkbox], input[type=radio]").each(function(){
    toggleInputLabelClass(this);
  });

// In page nav add class to active link
$("#in-page-nav li a").click(function() {
    $(this).parent().addClass('selected').siblings().removeClass('selected');
    });
});
