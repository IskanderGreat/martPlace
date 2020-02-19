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
    console.log("hello");
    $(this).addClass('filter-bar__btn_active');
    $('.filter-bar__btn-grid').removeClass('filter-bar__btn_active');
  });



  // single-buy start 
  $('.single-buy__radio').click(function() {
    if($(this).hasClass('js-active-radio')) {
      
      $('.single-buy__radio').not($(this)).removeClass('js-active-radio');
    }
    $(this).next().next().slideToggle(300);
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
}); 