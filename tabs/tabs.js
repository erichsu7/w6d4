
$.Tabs = function (el) {
  this.$el = $(el);
  this.$contentTabs = $(this.$el.data('content-tabs'));
  this.$activeTab = this.$contentTabs.find(".active");
  this.clickTab();
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};

$.Tabs.prototype.clickTab = function () {
  var $activeTab = this.$activeTab;
  $("ul.tabs").on("click", "a", function(event) {
    event.preventDefault();

    var $currentTarget = $(event.currentTarget);
    var oldHref = $activeTab.attr("id");
    var oldAnchor = $("[href=#" + oldHref +"]");
    oldAnchor.removeClass("active");
    $activeTab.removeClass("active");
    $activeTab.addClass("transitioning");
    $activeTab.css("transition", "opacity 500ms")
    $currentTarget.addClass("active");
    $activeTab.one("transitionend", function() {
      $activeTab.removeClass("transitioning");
      var href = $currentTarget.attr("href");
      $activeTab = $(href);
      $activeTab.addClass("active transitioning");
      setTimeout(function () {
        $activeTab.removeClass("transitioning");
        $activeTab.css("transition", "opacity 500ms");
      }, 0)

    })


  })
};

// $("[href=\"#alaskan-malamute\"]")
