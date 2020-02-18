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
}); 