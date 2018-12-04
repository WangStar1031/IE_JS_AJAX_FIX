 $( document ).ready(function() {
$("#role").change(function(){
    if($(this).val() == 'Non-Lawyer'){
      $("#department-non-lawyers").show();
       $("#department").hide();
    }else{
      $("#department-non-lawyers").hide();
      $("#department").show();
    }
    
});

 });