$(function() {

  $('.js-card-slider__inner_b').slick({
    appendArrows: '.js-card-slider__title-arrows_b',
    nextArrow: '<span class="card-slider__next-arrow card-slider__arrow"></span>',
    prevArrow: '<span class="card-slider__prev-arrow card-slider__arrow"></span>'
  });

  $('.js-card-slider__inner_s').slick({
    appendArrows: '.js-card-slider__title-arrows_s',
    slidesToShow: 3,
    variableWidth: true,
    rows: 0,
    nextArrow: '<span class="card-slider__next-arrow card-slider__arrow"></span>',
    prevArrow: '<span class="card-slider__prev-arrow card-slider__arrow"></span>'
  });

});