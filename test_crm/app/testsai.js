var id;
var name;
var pay;

$(function() {
 
 
ZOHO.embeddedApp.on("PageLoad", function(data) {
  arr = data.EntityId;

  id = arr[0];
  console.log(id);
  //Custom Bussiness logic goes here
});



ZOHO.embeddedApp.init(
  console.log("initializing")
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
document.getElementById("name").disabled = true;
var em = document.getElementById("email");
em.value =  myJSON.customer_email_id  
document.getElementById("email").disabled = true;

var am = document.getElementById("amount");
am.value =  myJSON.Grand_Total
document.getElementById("amount").disabled = true;

console.log(myJSON.id)
      })
    }, 100);


   
   
    $(document).ready(function () {
    
      $('#dropdown').change(function () {
      
          var doc = document.getElementById("dropdown");
          pay = doc.options[doc.selectedIndex].value;
          console.log(pay)
      });
    });
    
 
})



  });
  
  
 
  function myFunction() {

    var func_name = "update_rec";
    console.log("Update Func");
    var req_data = {
      arguments: JSON.stringify({
        id: id,
        Module:"Sales_Orders",
        Map_Json:{


          "customer_email_id":"sai@raysandreach.com"
        }
      })
    };
    console.log(req_data);
    ZOHO.CRM.FUNCTIONS.execute(func_name, req_data).then(function(data) {
   
      console.log(resp+"-"+data);
    })

   }