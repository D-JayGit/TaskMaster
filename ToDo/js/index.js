$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});
var token=null;
$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});

$("#myForm").submit(function(e) {
   id=document.getElementById("em").value;
  pass=document.getElementById("pwd").value;
  domain=document.getElementById("domain").value;
var data = JSON.stringify({"email":id,"password":pass,"domain_name":domain});
    $.ajax({
           type: "POST",
           url: "http://happytodo.int2root.com/v1/signin",
            dataType :'json',
           data:data, 
            contentType : "application/json",
           success: function(data)
           {
            token=data["auth_token"];
            if (token!=null) {            
              window.location.href="/home/mangospring/Todo App/sign-up-login-form/home.html";
            }else{
              alert("Invalide Credentials");
            }
           }
         });

    e.preventDefault(); 
});



$("#CreateTODO").submit(function(e){
  var values = {};
    $.each($(this).serializeArray(), function(){ values[this.name] = this.value; });
    var todo = {
        desc: values["desc"],
        state: values["state"],
        schedule_attributes: {
                  date: values["date"],
                  time:values["time"],
                  rule:values["rule"],
                  day:[values["day0"],values["day1"]]
              }
    };
    $.ajax({
      type: "POST",
          url: "http://happytodo.int2root.com/v1/todos",
          dataType :'json',
          data:JSON.stringify(todo), // serializes the form's elements.
          contentType : "application/json",
           beforeSend : function(xhr) {
           if (token!=null) {
            xhr.setRequestHeader("Authorization", "Bearer " +token);
          }
        },
          success: function(data)
           {
            alert("TO Do Created!!!!");
           }
    });
    e.preventDefault();

});

 /*function submitform(){
  
    var values = {};
    $.each($(this).serializeArray(), function(){ values[this.name] = this.value; });
    var todo = {
        desc: values["desc"],
        state: values["state"],
        schedule_attributes: {
                  date: values["date"],
                  time:values["time"],
                  rule:values["rule"],
                  day:[values["day0"],values["day1"]]
              }
    };
  console.log(JSON.stringify(todo));
  var xhr = new XMLHttpRequest();
  xhr.open(this.method,this.action,true);
  xhr.setRequestHeader('Authorization','Bearer ' +token);  
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  xhr.send(JSON.stringify(todo));
    return false;
  };*/



function getTime() {
  var datetime = new Date().today() + new Date().timeNow();
  return datetime;
};
function getRepeat(prio) {
  document.getElementById("repeate").innerHTML=prio;
  document.getElementById("rule").value=prio;
};
