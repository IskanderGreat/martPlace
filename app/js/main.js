$(function() {

  $('.filter-bar__chevron').click(function(){
    $(this).toggleClass('filter-bar__chevron_active');
  });


  $('.filter-bar__btn-grid').click(function() {
    if($(this).hasClass('filter-bar__btn_active')) {
      $(rhis).removeClass('filter-bar__btn_active');
    }
    $(this).addClass('filter-bar__btn_active');
    $('.filter-bar__btn-row').removeClass('filter-bar__btn_active');
  });

  $('.filter-bar__btn-row').click(function() {
    console.log("hello");
    $(this).addClass('filter-bar__btn_active');
    $('.filter-bar__btn-grid').removeClass('filter-bar__btn_active');
  });

}); 