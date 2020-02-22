$(function() {

  $('.filter-bar__chevron').click(function(){
    $(this).toggleClass('filter-bar__chevron_active');
  });


  $('.filter-bar__btn-grid').click(function() {
    if($(this).hasClass('filter-bar__btn_active')) {
      $(this).removeClass('filter-bar__btn_active');
    }
    $(this).addClass('filter-bar__btn_active');
    $('.filter-bar__btn-row').removeClass('filter-bar__btn_active');
  });

  $('.filter-bar__btn-row').click(function() {
    $(this).addClass('filter-bar__btn_active');
    $('.filter-bar__btn-grid').removeClass('filter-bar__btn_active');
  });



  // single-buy start 
  $(".js-radio").click(function() {
    $(".single-buy__description").removeClass("see");
    $(this).parent().next().addClass("see");
  });


  $(".single-rating__star").rateYo({
    rating: 5,
    starWidth: '16px'
  });
  // single-buy end

  // single-tabs start
  $(".js-single-tabs .js-single-tabs__tab").click(function(event){
    var id = $(this).attr("data-id");
    $(".js-single-tabs").find(".js-single-tabs__content-item").removeClass("js-single-tabs__content-item_active").hide();
    $(".js-single-tabs__list").find(".js-single-tabs__tab").removeClass("js-single-tabs__tab_active, single-tabs__tab_active");
    $(this).addClass("single-tabs__tab_active");
    $("#"+id).addClass("js-single-tabs__content-item_active").fadeIn();
    return false;
  });
  // single-tabs-end

  // category-list start
  $(".js-category-list__item-title").click(function() {
    $(this).next().slideToggle(300);
    $(this).toggleClass("lnr-chevron-up");
    $(this).toggleClass("lnr-chevron-down");
  });
  // category-list end 

  // pricing-range__slider start
  $(".js-pricing-range__slider").ionRangeSlider({
    type: "double",
    min: 0,
    max: 350,
    from: 30,
    to: 300,
    hide_min_max: true,
    prefix: "$",
  });
  // pricing-range__slider end

  // 
  $(".js-filter-bar__btn-row").click(function() {
    $(".ticket").addClass("ticket-large");

  });

  $(".js-filter-bar__btn-grid").click(function() {
    $(".ticket").removeClass("ticket-large");

  });
  // 
}); 