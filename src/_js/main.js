//= include includes/coop-toolkit.js
//= include includes/feedback.js
//= include includes/FeedbackWrongInfo.js
//= include includes/handlebars.js

$(function(){

  $('.in-page-nav').fixedsticky();

  // var stickyNav = $('.fixedsticky--horz').offset().top;

  // $(window).scroll(function() {  
  //     if ($(window).scrollTop() > stickyNav) {
  //         $('.fixedsticky--horz').addClass('fixedsticky--horz-styled');
  //     }
  //     else {
  //         $('.fixedsticky--horz').removeClass('fixedsticky--horz-styled');
  //     }  
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
    $input.parents(".coop-c-checkbox-radio__label").toggleClass("is--checked", $input.is(":checked"));
  }

  $(".coop-c-checkbox-radio__label").find("input[type=checkbox], input[type=radio]").on("change", function(){
    $(this).parents('fieldset').find('input[type=checkbox], input[type=radio]').each(function(){
      toggleInputLabelClass(this);
    });
  });

  $(".coop-c-checkbox-radio__label").find("input[type=checkbox], input[type=radio]").each(function(){
    toggleInputLabelClass(this);
  });

// In page nav add class to active link
$("#in-page-nav li a").click(function() {
    $(this).parent().addClass('selected').siblings().removeClass('selected');
    });
});

/* Accessible tabs > accordian */
/* replace this JS handlebars implementation */
(function () {
  var Tabs;

  Tabs = (function () {

    var templates = {
      tplTabNav: Handlebars.compile("<ul class='coop-list-inline ds-tabs' role='tablist'>{{#each tab}}<li role='presentation' class='ds-tabs__item'><a href='#{{tabId}}' id='TabController-{{tabId}}' class='btn-pill' role='tab' aria-selected='false' aria-controls='{{tabId}}' tabindex=-1 aria-expanded='false' data-title='{{tabTitle}}'>{{tabTitle}}</a></li>{{/each}}</ul>")
    };

    /**
     * Sets up the Tabs
     *
     * @param $container - parent of the items that will be tabbed together
     * @param $options - any overrides to the classes set below
    */
    function Tabs($container, options) {

      var defaults = {
        default_tab: "0",                          // index of tab to open on page load
        tab_class_panel: ".tabs-container__panel", // wrapper for each tab/accordion title and content
        tab_class_title: ".tabs-container__title", // title element for each tab/accordion
        tab_nav_id: "TabNav"                       // ID to provide the constructed tab navigation
      };

      this.$container = $container.addClass("tabs-init");
      this.options = $.extend({}, defaults, options);
      this.currentTab = null;
      this.init();

    }

    /**
     * Creates a data object for all tabs within the widget
     * Saves each tab ID and title, to be used to create desktop tab nav if needed
     * Attaches Aria roles as it fetches tab data
    */
    Tabs.prototype.fetchTabData = function () {
      // stores data for all tabs in the widget
      this.tabData = [];

      var i = 0,
        $tab_panels = this.$tab_panels,
        len = $tab_panels.length,
        $currentPanel,
        $panelTitle,
        currentPanelData;

      // for each of the tabs, save its title and ID from the HTML
      for (i; i < len; i++) {
        $currentPanel = $($tab_panels[i]);
        $panelTitle = $currentPanel.prev(this.options.tab_class_title);
        currentPanelData = {
          tabId: $tab_panels[i].id,
          tabTitle: $panelTitle.text()
        };

        this.tabData.push(currentPanelData);

        // update ARIA attrs for the panel and accordion title
        $currentPanel.attr({
          "role": "tabpanel",
          "aria-hidden": "true"
        });

        $panelTitle
          .attr({
            "tabindex": "-1",
            "role": "tab",
            "aria-controls": currentPanelData.tabId,
            "aria-selected": "false",
            "aria-expanded": "false"
          });
      }
    };

    /**
     * Builds HTML for the desktop tab navigation
    */
    Tabs.prototype.createTabNav = function () {
      this.tabNav = true;

      this.$tabNav = $(templates.tplTabNav({
        "tab": this.tabData
      })).prependTo(this.$container);

      this.$tabNavItems = this.$tabNav.find("a");

      // add class to indicate that there's a navigation
      this.$container.addClass("tabs-nav-init");
    };

    /**
     * Binds the navigation events
    */
    Tabs.prototype.bindNavEvents = function () {
      var app = this;

      this.$tabNav.on("click", "a", function (e) {
        e.preventDefault();
        var $target = $(e.currentTarget),
          $tabPanel = $(this.getAttribute('href'));
        if (!app.isCurrentTab($tabPanel)) {
          app.closeTab();
          app.openTab($tabPanel);
        }
      });

      this.$tabNav.on("keydown", "a", function (e) {
        var currentIndex = app.handleKeyPress(e);
        if (currentIndex !== null) {
          app.closeTab();
          var panelId = app.tabData[currentIndex].tabId;
          app.openTab($(document.getElementById(panelId)));
          app.currentTab.$navItem.focus(); // focus only here so doesn't steal focus on page load
        }
      });
    };

    /**
     * helper to identify if the clicked tab is what's currently open
     * @param $tab_panel - jQuery collection of the tab to be evaluated
    */
    Tabs.prototype.isCurrentTab = function ($tab_panel) {
      return this.currentTab.$tab_panel.get(0) == $tab_panel.get(0);
    };

    /**
     * Key handler for tabs
     * @param e - event
    */
    Tabs.prototype.handleKeyPress = function (e) {
      var keyCodes,
        currentIndex = this.currentTab.position;
      keyCodes = {
        DOWN: 40,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
      };

      switch (e.keyCode) {
        case keyCodes.LEFT:
        case keyCodes.UP:
          currentIndex--;
          if (currentIndex < 0) {
              currentIndex = this.tabData.length - 1;
          }
          //console.log(currentIndex);
          break;
        case keyCodes.END:
          currentIndex = this.tabData.length - 1;
          break;
        case keyCodes.HOME:
          currentIndex = 0;
          break;
        case keyCodes.SPACE:
        case keyCodes.ENTER:
          currentIndex = this.handleEnter(currentIndex);
          break;
        case keyCodes.RIGHT:
        case keyCodes.DOWN:
          currentIndex++;
          if (currentIndex >= this.tabData.length) {
              currentIndex = 0;
          }
          break;
        default:
          currentIndex = null;
      }
      return currentIndex;
    };

    Tabs.prototype.handleEnter = function(currentIndex) {
      // enter will either select a new panel or do nothing if it's focused on an active panel
      // so we have to deal with the currently focused element rather than the selected tab
      var currentTabByFocusIndex = document.getElementById(document.activeElement.getAttribute("aria-controls"));

      if (currentTabByFocusIndex !== this.currentTab.$tab_panel.get(0)) {
        currentIndex = this.$tab_panels.index(currentTabByFocusIndex);
      }
      return currentIndex;
    };

    /**
     * Opens the tab
     * @param $tab_panel - jQuery collection of the tab that's being opened
    */
    Tabs.prototype.openTab = function ($tab_panel) {
      var options = this.options;
      this.currentTab = {
        $tab_panel: $tab_panel
          .attr({
            "aria-hidden": "false",
            "tabindex"   : "0"
          }),
        $title: $tab_panel.prev(options.tab_class_title).attr({
          "aria-selected": true,
          "aria-expanded": true,
          "tabindex": "0"
        }),
        position: this.$tab_panels.index($tab_panel)
      };

      if (this.tabNav) {
        this.updateTabNav();
      }
    };

    /**
     * closes a tab if there's one open and a new one has been activated
     * Only one tab/accordion can be open at any given time
    */
    Tabs.prototype.closeTab = function () {
      var currentTab = this.currentTab;

      currentTab.$tab_panel
        .attr({
          "aria-hidden": "true"
        })
        .removeAttr("tabindex");

      // update accordion title values as well so everything is in synch
      currentTab.$title.attr({
        "tabindex": "-1",
        "aria-selected": "false",
        "aria-expanded" : "false"
      });

      if (this.tabNav) {
        currentTab.$navItem
          .attr({
            "tabindex": "-1",
            "aria-selected": "false",
            "aria-expanded" : "false"
          });
      }

      this.currentTab = null;
    };

    /**
     * Updates the dynamically created tab nav in desktop once a new tab has been opened
     * @param $tab - jQuery element for the tab that was just opened
    */
    Tabs.prototype.updateTabNav = function () {
      var currentTab = this.currentTab;

      currentTab.$navItem = this.$tabNavItems.eq(currentTab.position);
      currentTab.$navItem.attr({
        "tabindex": "0",
        "aria-selected": "true",
        "aria-expanded": "true"
      });
    };

    /**
     * Binds any events specific to Accordion functionality (tablet and mobile only)
     * ARIA initially didn't work here because:
      * there's no tablist role on any container
      * the tab panels are controlled by the nav and not the headers
    */
    Tabs.prototype.bindAccordionEvents = function () {
      var app = this;

      this.$accordion
        .on("keydown", this.options.tab_class_title, function (e) {
          var currentIndex = app.handleKeyPress(e);

          if (currentIndex !== null) {
            app.handleAccordion(app.$tab_panels.eq(currentIndex));
          }
        })
        //https://bugs.webkit.org/show_bug.cgi?id=133613
        .find(".tabs-container__title")
          .on("click", function (e) {
            e.preventDefault();
            app.handleAccordion($(e.currentTarget).next(app.options.tab_class_panel));
          });
    };

    Tabs.prototype.handleAccordion = function($tab_panel) {
      if (!this.isCurrentTab($tab_panel)) {
        this.openAccordion($tab_panel);
      }
    };

    /**
     * Helper to open an accordion.
     * Just calls openTab() and adds animation to scroll viewer to active accordion panel
     * @param $tab_panel - jQuery element of the tabpnael being opened
    */
    Tabs.prototype.openAccordion = function ($tab_panel) {
      this.closeTab();
      this.openTab($tab_panel);
      this.currentTab.$title.focus();

      $("html, body").animate({
        scrollTop: $tab_panel.offset().top - 75
      }, 200);
    };


    /**
     * Init function - calls necessary set up and opens the first relevent tab
    */
    Tabs.prototype.init = function () {
      var $startingTab;
      // save all the elements that will become tabs
      this.$tab_panels = this.$container.find(this.options.tab_class_panel);

      this.fetchTabData();

      this.$accordion = this.$container.find(".accordion-wrapper").attr("role","tablist");
      this.bindAccordionEvents();

      // if there's more than 1 tab, then a tab navigation is created on desktop
      if (this.$tab_panels.length > 1) {
        this.createTabNav();
        this.bindNavEvents();
      }

      $startingTab = this.$tab_panels.eq(this.options.default_tab);
      if (this.$tab_panels.filter(".tabs-container__default").length) {
        $startingTab = this.$tab_panels.filter(".tabs-container__default");
      }
      this.openTab($startingTab);
    };

    return Tabs;

  })();

  $(function () {
    window.Tabs = Tabs;
    new window.Tabs($("#TabContainer"));
  });
}).call(this);
