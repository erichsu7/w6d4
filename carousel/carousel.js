$.Carousel = function(el) {
  this.$el = $(el);
  this.activeIdx = 0;
  this.$el.find(".items img:first-child").addClass("active");
  // this.$el.find(".items img:nth-child(2)").addClass("right");
  this.transitioning = false;
  this.slideLeft();
  this.slideRight();
};

$.fn.carousel = function() {
  return this.each( function () {
    new $.Carousel(this);
  })
};

$.Carousel.prototype.slide = function (dir) {
  console.log("transitioning:" + this.transitioning);
  if (this.transitioning === true) {
    console.log(this.activeIdx);
    return;
  }
  this.transitioning = true;

  var that = this;
  var $prevImg = $(".items img").eq(that.activeIdx);
  var activeIdx = that.activeIdx += dir;
  var $activeImg = $(".items img").eq(activeIdx);


  $activeImg.addClass("active");

  if (dir === 1) {
    $activeImg.addClass("right");
    $prevImg.addClass("left");
  } else {
    $activeImg.addClass("left");
    $prevImg.addClass("right");
    // $(".items img").eq(that.activeIdx + 1).addClass("right");
  }
  setTimeout(function(){
    if (dir === 1) {
      $activeImg.removeClass("right");
    } else {
      $activeImg.removeClass("left");
    }
  }, 0)

  $activeImg.one("transitionend", function () {
    $prevImg.removeClass("active");
    $prevImg.removeClass("left");
    $prevImg.removeClass("right");
    that.transitioning = false;
  })

};


$.Carousel.prototype.slideRight = function () {
  var that = this;
  $(".slide-right").on("click", function(event) {
    if (that.activeIdx === 0) {
    } else {
      that.slide.bind(that)(-1);
    }
  })
}

$.Carousel.prototype.slideLeft = function () {
  var that = this;
  $(".slide-left").on("click", function(event) {
    if (that.activeIdx === ($(".items img").length - 1)) {
    } else {
      that.slide.bind(that)(1);
    }
  })
};
