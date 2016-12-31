$(function(){
     $('.selectOption').change(function(){
         var selected = $(this).find(':selected').text();
         $(".desc").hide();
         $('#' + selected).show();
     }).change()
});