var id;
var name;

$(function() {
 
 
ZOHO.embeddedApp.on("PageLoad", function(data) {
  arr = data.EntityId;

  id = arr[0];
  console.log(id);
  //Custom Bussiness logic goes here
});



ZOHO.embeddedApp.init(
  console.log("reinitializing")
).then(()=>{



  

  
    setTimeout(function() {
      
      console.log("ID-"+id);
      var func_name = "rest_func";
      console.log("id-" + id);
      var req_data = {
        arguments: JSON.stringify({
          id: id
        })
      };
      ZOHO.CRM.FUNCTIONS.execute(func_name, req_data).then(function(data) {
        console.log(data);
     


      
        var resp = data.details;
        var myJSON = JSON.parse(resp.output);

        //  name = resp.output
        //  email = resp.Email
          console.log(myJSON)
          
          
           
var input = document.getElementById("name");
input.value =  myJSON.Subject
var em = document.getElementById("email");
em.value =  myJSON.customer_email_id  
var am = document.getElementById("amount");
am.value =  myJSON.Grand_Total
alert(myJSON.id)
      })
    }, 300);
    
    
 
})



  });
 