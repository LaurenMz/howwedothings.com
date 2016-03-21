"use strict";

var _ = require("underscore");

function attachFlipcardEvents ($el) {

  var animDuration = 200;

  $el
  .on("mouseenter", ".box--flipcard", function (e) {
    var $this = $(this);
    $this.addClass('-anim-start').addClass('-anim-end');
  })
  .on("mouseleave", ".box--flipcard", function (e) {
    var $this = $(this);
    $this.removeClass('-anim-end');
    $this.removeClass('-flipped');
    setTimeout(function () {
      $this.removeClass('-anim-start');
    }, animDuration);
  })
  .on("click", ".box--flipcard", function (e) {

    e.preventDefault();

    var $this = $(this);

    $this.removeClass('-anim-end');
    setTimeout(function () {
      $this.removeClass('-anim-start');
      $this.addClass('-flipped');
    }, animDuration);

  });

}

var Cards = function () {

  if(!(this instanceof Cards)) {
    return new Cards();
  }

  var self = this,
      $window = $(window),
      winHeight = $window.height();

  self.offset = 0;
  self.cardsPerDraw = 20;
  self.$moreEl = $('#more-properties');
  self.moreOffsetY = 0;
  self.pauseLoad = false;
  self.$el = $("#properties");
  self.tpl = _.template($("#property").html());
  $.get("/data/properties.json", function (data) {
    self.data = data;
    self.total = data.length;
    _.each(data, function (item, k) {
      window.hiltonImagePreloader(item.image);
    });
  }, "json");

  attachFlipcardEvents(self.$el);

  // self.$el.on("click", "#more-properties", function (e) {
  //   e.preventDefault();
  //   self.addCards();
  // });
  $(window).off("scroll").on("scroll", function (e) {

    if (self.moreOffsetY === 0 || self.pauseLoad !== false) { return; }

    var scroll = $window.scrollTop();
    if (scroll > (self.moreOffsetY - winHeight) + 100) {
      self.pauseLoad = true;
      self.addCards();
    }

  });

};

Cards.prototype.addCards = function (offset, amount) {

  var self = this;

  offset = offset || self.offset;
  amount = amount || self.cardsPerDraw;

  // protect against async not being ready!
  if (!self.data) {
    setTimeout(function () {
      self.addCards();
    },250);
    return;
  }

  var rows = [],
      i = 0;

  // make sets of 5.
  _.each(self.data, function (property, k) {

    if (k < offset || k >= (offset + amount)) {
      return;
    }

    if (k % 5 === 0 && k !== offset) {
      i += 1;
    }

    rows[i] = rows[i] || "";
    rows[i] += self.tpl({
      title: property.title,
      image: property.image,
      body: property.body,
      key: k
    });

  });

  // Add to DOM.
  _.each(rows, function (row, k) {
    self.$el.find(".section__body").append("<div class=\"row-alt\">" + row + "</div>");
  });

  self.moreOffsetY = Math.ceil(self.$moreEl.offset().top);
  self.pauseLoad = false;
  self.offset += 20;

  if (self.offset >= self.total) {
    self.pauseLoad = true;
    self.$moreEl.remove();
  }

  self.cardsPerDraw = amount;

};

//Exports the page module for app.js to use
module.exports = Cards;