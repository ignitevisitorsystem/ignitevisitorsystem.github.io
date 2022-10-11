      var firebaseConfig = {
         apiKey: "AIzaSyDkdpSjBHIrzPNzhuw2_2Em1C0TPDffpiI",
  authDomain: "ignitecheckin.firebaseapp.com",
  projectId: "ignitecheckin",
  storageBucket: "ignitecheckin.appspot.com",
  messagingSenderId: "128183687677",
  appId: "1:128183687677:web:af290d58201ce2c6076194",
  measurementId: "G-631B6Y9QF4"
      };

      firebase.initializeApp(firebaseConfig);
      
      document.getElementById("update_db").disabled = true;
      document.getElementById('update_db').style.visibility = 'hidden';
      
      var key_checkin = "";
      var key_checkout = "";
      var gbit = "";
	    var myResponse;
  
     function createbitly(web){
  var url = web["web"]; 
    var accessToken = "fca44606568a64c736093bf2404ad2e4048b1d51";

    var params = {
        "long_url" : url           
    };

   $.ajax({
        url: "https://api-ssl.bitly.com/v4/shorten",
        cache: false,
        dataType: "json",
        method: "POST",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        },
        data: JSON.stringify(params)
    }).done(function(data) {
	  document.getElementById("bitly").value =  data.link;
    }).fail(function(ex) {
          document.getElementById("bitly").value =  url;
      //  alert(ex.responseText);
      //alert("ShoppingList URL Copied");
    });
}
      
 var checkindb = function(data){
        var db = firebase.firestore();
        var key = data["fname"] + data["lname"] + data["date"];
        var SaveDoc = db.collection("checkin").doc(key);  
	var login = data["login"];
	    var d = new Date();
             myTime = new Date(d).toLocaleString();
        SaveDoc.set({
              login: data["login"],
            firstname: data["fname"],
          lastname: data["lname"],
	  grade: data["grade"],
          guardianname: data["pname"],
            email: data["pemail"],
            phone: data["pphone"],
            timestamp: Date.now(),
            key: data["key"],
	  checkin:myTime,
          remove:'No'
        })
        .then(function(doc) {  
            //alert("Schedule was created successfully!")
            console.log("doc added");
           if (login != 'walkin'){
           window.location.href = 'https://ignitevisitorsystem.github.io/?id=' + key;
	   }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
      }

      var push_to_firebase = function(data){
        var db = firebase.firestore();
        var key = data["fname"] + data["lname"] + data["date"];
        var SaveDoc = db.collection("members").doc(key);  
	var login = data["login"];
        SaveDoc.set({
              login: data["login"],
            firstname: data["fname"],
          lastname: data["lname"],
	  grade: data["grade"],
          guardianname: data["pname"],
          date: data["date"],
            email: data["pemail"],
            phone: data["pphone"],
            timestamp: Date.now(),
            key: data["key"],
          remove:'No'
        })
        .then(function(doc) {  
            //alert("Schedule was created successfully!")
            console.log("doc added");
           if (login != 'walkin'){
           window.location.href = 'https://ignitevisitorsystem.github.io/?id=' + key;
	   }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
      }
      
      var update = function(data){
        var db = firebase.firestore();
          var key = data["id"];
        db.collection("members").doc(key).update({
          firstname: data["fname"],
          lastname: data["lname"],
          guardianname: data["name"],
          date: data["date"],
            email: data["email"],
            phone: data["phone"],
	   grade: data["grade"],
            timestamp: Date.now()
}) .then(function(doc) {
    console.log("doc updated");
            location.reload();
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
      }
      
        var updateremoveYes = function(data){
        var db = firebase.firestore();
          var key = data["id"];
        db.collection("messages").doc(key).update({
           remove: 'Yes'
}) .then(function(doc) {
    console.log("doc updated");
            window.location = "https://aquavisitorsystem.github.io/?id=" + key;
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
      }
        
        var updateremoveNO = function(data){
        var db = firebase.firestore();
          var key = data["id"];
        db.collection("messages").doc(key).update({
           remove: 'No'
}) .then(function(doc) {
    console.log("doc updated");
             window.location = "https://aquavisitorsystem.github.io/?id=" + key;
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
      }
      
      var get_firebase = function(){
        var db = firebase.firestore();
         var get_fname = document.getElementById("fname").value ;
        var get_lname = document.getElementById("lname").value ;
          var get_date = document.getElementById("date").value ;
       get_fname  = get_fname.toString();
         get_lname  = get_lname.toString();
         get_date  = get_date.toString();
        if (get_fname != null &&  get_fname != '' && get_lname != null &&  get_lname != '' && get_date  != null &&  get_date  != '') {
          console.log(get_fname);
         console.log(get_lname);
         console.log(get_date);
    db.collection("messages").where("lastname", "==",get_lname).where("firstname", "==",get_fname).where("date", "==", get_date )
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
           document.getElementById("login").value = doc.data().login;
           document.getElementById("login").readOnly = true;
            document.getElementById("fname").value = doc.data().firstname;
            document.getElementById("lname").value = doc.data().lastname;
            document.getElementById("cname").value = doc.data().company;
            var dates = new Date(doc.data().date).toISOString();
            document.getElementById("date").value = dates;
            document.getElementById("email").value = doc.data().email;
            document.getElementById("message").value = doc.data().message;
        });
        document.getElementById('update_db').style.visibility = 'visible';
       document.getElementById('submit_msg').style.visibility = 'hidden';
       document.getElementById("update_db").disabled = false;
        document.getElementById("submit_msg").disabled = true;
    })
    .catch((error) => {
       document.getElementById("update_db").disabled = true;
        console.log("Error getting documents: ", error);
    });
} else {
    alert("All fields required!")
}

      }
      
       var get_data = function(data){
        var db = firebase.firestore();
         var get_id = data["id"];
	  var get_iPad = data["iPad"];
	   var website = get_id  + '&checkin=Now';	
	  
           var cwebsite = "https://ignitevisitorsystem.github.io/?key=" + website;
         console.log(get_id);
         db.collection("members").where("key", "==",get_id)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
	     var dates = new Date(doc.data().date).toLocaleString();
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            document.getElementById("id").value = doc.data().key;
           document.getElementById("login").value = doc.data().login;
        
		   document.getElementById("login").readOnly = true;
            document.getElementById("fname").value = doc.data().firstname;
            document.getElementById("lname").value = doc.data().lastname;
            document.getElementById("pname").value = doc.data().guardianname;
	    //document.getElementById("date").value = doc.data().date;
            document.getElementById("pemail").value = doc.data().email;
            document.getElementById("pphone").value = doc.data().phone;
            var removewebsiteYes = "https://ignitevisitorsystem.github.io/?id=" + doc.data().key + "&Remove=Yes";
           var removewebsiteNo = "https://ignitevisitorsystem.github.io/?id=" + doc.data().key + "&Remove=No";
	var video = "https://youtu.be/6hxZn-wAfwY";
	document.getElementById("emaillink").innerHTML = "<a href='mailto:" + doc.data().email + "?subject=Upcoming Kids Church at Ignite Church" + '' + "&body=" + doc.data().firstname + " " + doc.data().lastname  + "%0D%0A%0D%0AA unique QR code can be used to Check-in at the iPad stand in our lobby.%0D%0A%0D%0APlease use the below link to get your QR code.%0D%0A" + document.getElementById("bitly").value + "%0D%0A%0D%0AWatch below video to learn how to use our check-in/check-out system:%0D%0A" + video + "'>Click here to create email to guest...</a>";
        console.log("Remove:" + doc.data().remove);
          if (doc.data().remove === 'Yes'){
            document.getElementById('qrcode').style.display = 'none';
            document.getElementById('emaillink').style.display = 'none';
             document.getElementById('removeYes').style.display = 'none';
             document.getElementById("remove").innerHTML  = "Status: InActive";
             document.getElementById("removeNo").innerHTML = "<a href='" + removewebsiteNo + "'>Click here to update status to: Active</a>";
             document.getElementById("removeYes").innerHTML = "";
          }
           if (doc.data().remove === 'No'){
             document.getElementById('removeNo').style.display = 'none';
             document.getElementById("remove").innerHTML  = "Status: Active";
             document.getElementById("removeNo").innerHTML = "";
              document.getElementById("removeYes").innerHTML = "<a href='" + removewebsiteYes + "'>Click here to update status to: InActive</a><br>";
          }
         if (get_iPad === 'Yes'){
		    document.getElementById("date").readOnly = false;
              document.getElementById("message").readOnly = false;
		   document.getElementById('qrcode').style.display = 'none';
               document.getElementById('logins').style.display = 'none';
             document.getElementById('removeYes').style.display = 'none';
	      document.getElementById('removeNo').style.display = 'none'
       document.getElementById('get_id').style.display = 'none';
		  document.getElementById('get_id2').style.display = 'none';
      document.getElementById('get_msg').style.display = 'none';
		 document.getElementById('update_db').innerText = 'Update';
		  document.getElementById("emaillink").innerHTML = "";
		 document.getElementById("remove").innerHTML = "If needed, update 'Guest' fields above then tap 'Update' button below";
		 document.getElementById('update_db').style.width = 'min-content';
		  document.getElementById('checkin').style.display = 'block';
		 
		  
	 }
           var website = doc.data().key + '&checkin=Now';
	// var emailwebsite2 = document.getElementById("bitly").value; //document.getElementById("bitly").value;
         // console.log("bitly: " + document.getElementById("bitly").value);
          //createbitly
         // var emailwebsite1 = "<a href=" + document.getElementById("bitly").value + ">Click Here for QR Code</a>";
          var qrcode = new QRious({
  element: document.getElementById("qrcode"),
  background: '#ffffff',
  backgroundAlpha: 1,
  foreground: '#5868bf',
  foregroundAlpha: 1,
  level: 'H',
  padding: 0,
  size: 128,
  value: website
});
        }); 
           document.getElementById('update_db').style.visibility = 'visible';
        document.getElementById('submit_msg').style.visibility = 'hidden';
         document.getElementById("update_db").disabled = false;
        document.getElementById("submit_msg").disabled = true;
    })
    .catch((error) => {
       console.log("Error getting documents: ", error);
    });
      }
       
  
       
       var get_checkin_data = function(data){
	  var d = new Date();
          var NowTime = new Date(d).toLocaleString();
        var db = firebase.firestore();
         var get_id = data["id"];
         db.collection("members").where("key", "==",get_id)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           key_checkin ='';
           key_checkout = '';
           varFName = doc.data().firstname;
           varLName = doc.data().lastname;
           var dates = new Date(doc.data().date).toLocaleString();
	   varwebsite = doc.data().key + '&checkin=Now';
           varDT = dates;
           varAqua = doc.data().login;
	   varcp =  doc.data().pname;
	    var data3 = {
               login: doc.data().login,
            firstname: doc.data().fname,
          lastname: doc.data().lname,
	  grade: doc.data().grade,
          guardianname: doc.data().pname,
          date: doc.data().date,
            email: doc.data().pemail,
            phone: doc.data().pphone,
            timestamp: Date.now(),
            key: doc.data().key,
          remove:'No'
        }
        }); 
  if ((key_checkin === null || key_checkin === '') && (key_checkout === null || key_checkout === '')){
	    document.getElementById("checkedin").value = 'No';
	   console.log("checkedin ID: No");
           checkindb(data3);	
           document.write('<body style="font-family: sans-serif;color: black;">');
	  var timeToAdd = 1000 * 60 * 60 * 24 * 7 * 4 * 6;
var date = new Date();
var expiryTime = parseInt(date.getTime()) + timeToAdd;
date.setTime(expiryTime);
var utcTime = date.toUTCString();
	   document.cookie = "checkin=" + get_id + "; expires=" + utcTime + ";";
	  //document.cookie = "YOUR_COOKIE=yes; expires=" + utcTime + ";";
	   document.write("<center>");
	  document.write('<img id="logo" src="aqua.jpg" width="500px">');
	    document.write("<p style='font-size:47px;'>Guest: <b>" + varFName + " " + varLName + "</b></p>");
	  document.write('<canvas id="qrcodes"></canvas>');
	  document.write("<p style='font-size:25px;color: black;'>Company: " + varcp + "</p>");
	  // document.write("<p style='font-size:16px;color: black;'><br><br><br>printed: " + NowTime + "</p></center>");
   var qrcode = new QRious({
  element: document.getElementById("qrcodes"),
  background: '#ffffff',
  backgroundAlpha: 1,
  foreground: '#000000',
  foregroundAlpha: 1,
  level: 'H',
  size: 230,
  value: varwebsite
});
    document.write("</center>");
    document.write('</body>');
    console.log("checkin successful");
  }else if ((key_checkin !=null && key_checkin != '') && (key_checkout === null || key_checkout === '')){
	   console.log("checkedin ID: Yes");
	    document.getElementById("checkedin").value = 'Yes';
           set_checkout(data);
	    document.write('<body style="font-family: sans-serif;color: blue;">');
           	   document.write("<center>");
	  document.write('<img id="logo" src="aqua.jpg" width="500px">');
	    document.write("<p style='font-size:47px;'>Thank you, " + varFName + " " + varLName + "</p>");
          document.write("<p style='font-size:25px;color: black;'>You have been successfully checked out!</p>");
           document.write("<p style='font-size:20px;color: black;'>Please dispose of your badge before leaving reception/lobby!</p>");
            document.write("<p style='font-size:20px;color: blue;'>Have a great day!</p>");
	  document.write("<p style='font-size:15px;color: black;'><br><br><br>current date/time: " + NowTime + "</p>");
	   document.write("</center>");
    document.write('</body>');
    console.log("checkout successful");
  }else if ((key_checkin !=null && key_checkin != '') && (key_checkout !=null && key_checkout != '') ){
           //qr code used already
	   console.log("checkedin ID: Yes");
	     document.getElementById("checkedin").value = 'Yes';
        console.log("already used");
	    document.write('<body style="font-family: sans-serif;color: blue;">');
             	   document.write("<center>");
	  document.write('<img id="logo" src="aqua.jpg" width="500px">');
	    document.write("<p style='font-size:47px;'>Hello, " + varFName + " " + varLName + "</p>");
         document.write("<p style='font-size:25px;color: black;'>This QR code has expired!</p>");
	   document.write("<p style='font-size:20px;color: black;'>Please dispose of your badge before leaving reception/lobby!</p>");
            document.write("<p style='font-size:20px;color: blue;'>Have a great day!</p>");
	   document.write("<p style='font-size:15px;color: black;'><br><br><br>current date/time: " + NowTime + "</p></center>");
	   document.write("</center>");
         document.write('</body>');
  }else{
    
  }
    })
    .catch((error) => {
       console.log("Error getting documents: ", error);
    });
      }
       
       function toTimestamp(strDate){
   var datum = Date.parse(strDate);
   return datum/1000;
}
       
             var set_checkin = function(data){
        var db = firebase.firestore();
          var key = data["id"];
         		var d = new Date();
             myTime = new Date(d).toLocaleString();
        db.collection("messages").doc(key).update({
           checkin: myTime
}) .then(function(doc) {
    console.log("doc updated");
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
      }
	     
	     function ConvertUTCTimeToLocalTime(UTCDateString)
    {
        var convertdLocalTime = new Date(UTCDateString);

        var hourOffset = convertdLocalTime.getTimezoneOffset() / 60;

        convertdLocalTime.setHours( convertdLocalTime.getHours() + hourOffset ); 

        return convertdLocalTime;
    }
             
      var set_checkout = function(data){
        var db = firebase.firestore();
          var key = data["id"];
	      	    var d = new Date();
             myTime = new Date(d).toLocaleString();
        db.collection("messages").doc(key).update({
           checkout: myTime
}) .then(function(doc) {
    console.log("doc updated");
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
      }
       
       var loadweb = function(){
      window.location.href = window.location.pathname;
       }
      
       var loadfromid = function(data){
        var db = firebase.firestore();
    db.collection("messages").where("lastname", "==",data["lname"]).where("firstname", "==",data["fname"]).where("date", "==", data["date"])
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
           document.getElementById("login").value = doc.data().login;
           document.getElementById("login").readOnly = true;
            document.getElementById("fname").value = doc.data().firstname;
            document.getElementById("lname").value = doc.data().lastname;
            document.getElementById("cname").value = doc.data().company;
            document.getElementById("date").value = doc.data().date;
            document.getElementById("email").value = doc.data().email;
            document.getElementById("message").value = doc.data().message;
        });
                 document.getElementById('update_db').style.visibility = 'visible';
        document.getElementById('submit_msg').style.visibility = 'hidden';
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
      }
      
       var loaddb =  function(data){
        var db = firebase.firestore();
          var get_login  = data["userid"];
         if (get_login  === null || get_login === '') {
               alert("Enter your Network Login ID above & try again!");
          }else{
       get_login  = get_login.toString();
     var title = "<center><h1>Aqua-Aerobic Systems Check-in/out Visitor Schedule</h1><h2>Active Visitor Schedule(s) for: " + get_login + "</h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";
     console.log(get_login);
      var header = "<style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;}</style></head>";
      var lines = "";
            let today = new Date().toISOString().slice(0, 10);
         db.collection("members").where("login", "==",get_login).where("remove", "==","No").orderBy("date","desc")
    .get()
    .then((querySnapshot) => {
          var cnt = querySnapshot.size;
		  document.write(title);
	 if (cnt === 0){
		 var nodata = "<br>No data found<br>";
	         document.write(nodata);
	}else{
		document.write("<table>  <tr>    <th>Ignite Admin</th>    <th>First Name</th>    <th>Last Name</th>    <th>Guardian</th>     <th>Date/Time</th>      <th>Email</th>       <th>Phone</th><th>Grade</th><th>Remove</th><th>Edit</th>  </tr>");
   
	}
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
	   var dates = new Date(doc.data().date).toLocaleString();
          document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().guardianname + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().phone + '</td><td>' + doc.data().grade + '</td><td>' + doc.data().remove + '</td><td><a href="https://ignitevisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
        });
                  document.write("</table>");
       document.head.innerHTML = header;
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
           }
      }
       
       var loaddbeverything =  function(){
       var db = firebase.firestore();
      var header = "<head><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;}</style></head>";
    var lines = "";
            let today = new Date().toISOString().slice(0, 10);
	   var title = "<center><h1>Aqua-Aerobic Systems Check-in/out Visitor Schedule</h1><h2>Active Visitor Schedule(s) </h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";
         db.collection("messages").where("remove", "==","No").orderBy("date","desc")
    .get()
    .then((querySnapshot) => {
	   var cnt = querySnapshot.size;
		 document.write(title);
	    if (cnt === 0){
		 var nodata = "<br>No data found<br>";
	  document.write(nodata);
	}else{
	  document.write("<table>  <tr>    <th>Aqua Employee</th>    <th>First Name</th>    <th>Last Name</th>    <th>Company</th>     <th>Date/Time</th>      <th>Email</th>       <th>Purpose of Visit</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
	}
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
	   var dates = new Date(doc.data().date).toLocaleString();
          document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
	});
         document.write("</table>");
         document.head.innerHTML = header;
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
      }
       
        var loadinactive =  function(){
       var db = firebase.firestore();
      var header = "<head><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;}</style></head>";
    var lines = "";
            let today = new Date().toISOString().slice(0, 10);
	   var title = "<center><h1>Aqua-Aerobic Systems Check-in/out Visitor Schedule</h1><h2>In-Active Visitor Schedule(s) </h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";
         db.collection("messages").where("remove", "==","Yes").orderBy("date","desc")
    .get()
    .then((querySnapshot) => {
	   var cnt = querySnapshot.size;
		 document.write(title);
	    if (cnt === 0){
		 var nodata = "<br>No data found<br>";
	  document.write(nodata);
	}else{
	  document.write("<table>  <tr>    <th>Aqua Employee</th>    <th>First Name</th>    <th>Last Name</th>    <th>Company</th>     <th>Date/Time</th>      <th>Email</th>       <th>Purpose of Visit</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
	}
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
	   var dates = new Date(doc.data().date).toLocaleString();
          document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
	});
         document.write("</table>");
         document.head.innerHTML = header;
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
      }
       
       var loaddbtoday =  function(){
         var db = firebase.firestore();
	 let todaysdate = new Date().toISOString().slice(0, 10);
	 var count = 0;
	 var start = new Date();
         start.setHours(0,0,0,0);
         var end = new Date(start.getTime());
         end.setHours(23,59,59,999);
         start = new Date(start.getTime() - (start.getTimezoneOffset() * 60000)).toISOString();
         end = new Date(end.getTime() - (end.getTimezoneOffset() * 60000)).toISOString();	 
         console.log(start);
         console.log(end);		  
         var lines = "";
	       
         let todays = new Date().toLocaleDateString();
         var header = "<head><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;}</style></head>";
	 var title = "<center><h2>Active Visitor Schedule(s) for: " + todays + "</h2><center><a href='https://aquavisitorsystem.github.io/'></a><br></center>";      
         db.collection("messages").where("date", ">=",start).where("date", "<=",end).where("remove", "==","No").orderBy("date","desc")
    .get()
    .then((querySnapshot) => {
	 console.log("Snapshot:" + querySnapshot.size); 
        var cnt = querySnapshot.size;
	document.write(title);
	document.write("<center><h3>Find your schedule and Tap 'Select'</b></center></h3>If your schedule is not found below, click <a href='" +  "https://aquameeting.github.io/?ipad=Yes"   + "'>here</a> to continue!<br><br>");
        if (cnt === 0){
		 var nodata = "<br>No data found<br>";
	  document.write(nodata);
	}else{
			  document.write("<table>  <tr>   <th>First Name</th>    <th>Last Name</th>    <th>Company</th>     <th>Date/Time</th>      <th>Email</th><th></th>  </tr>");
   
	}
         querySnapshot.forEach((doc) => {
		var nodata = "";
            // doc.data() is never undefined for query doc snapshots
           var dates = new Date(doc.data().date).toLocaleString();
          document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
	});
		   document.write("</table>");
		// let sendingText = "https://aquameeting.github.io/?ipad=Yes"
	           document.head.innerHTML = header;
    }) 
    .catch((error) => {
         console.log("Error getting documents: ", error);
          document.write(title);
          document.write("<br>If schedule not found below, click <a href='" +  "https://aquameeting.github.io"   + "'>here</a> to continue<br>");
	  var nodata = "<br>No data found<br>";
	  document.write(nodata);
          document.head.innerHTML = header;
    });
      }
       
       
        var loadtoday =  function(){
           var db = firebase.firestore();
	 let todaysdate = new Date().toISOString().slice(0, 10);
	 var count = 0;
	 var start = new Date();
         start.setHours(0,0,0,0);
         var end = new Date(start.getTime());
         end.setHours(23,59,59,999);
         start = new Date(start.getTime() - (start.getTimezoneOffset() * 60000)).toISOString();
         end = new Date(end.getTime() - (end.getTimezoneOffset() * 60000)).toISOString();	 
         console.log(start);
         console.log(end);		  
         var lines = "";
	       
         let todays = new Date().toLocaleDateString();
         var header = "<head><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;}</style></head>";
	 var title = "<center><h2>Active Visitor Schedule(s) for: " + todays + "</h2><center><a href='https://aquavisitorsystem.github.io/'>Go Home</a></center><br>";      
         db.collection("messages").where("date", ">=",start).where("date", "<=",end).where("remove", "==","No").orderBy("date","desc")
    .get()
    .then((querySnapshot) => {
	 console.log("Snapshot:" + querySnapshot.size); 
        var cnt = querySnapshot.size;
	document.write(title);
	//document.write("<center><h3>Find your schedule and Tap 'Select'</b></center></h3>If your schedule is not found below, click <a href='" +  "https://aquameeting.github.io/?ipad=Yes"   + "'>here</a> to continue!<br><br>");
        if (cnt === 0){
		 var nodata = "<br>No data found<br>";
	  document.write(nodata);
	}else{
	  document.write("<table>  <tr>    <th>Aqua Employee</th>    <th>First Name</th>    <th>Last Name</th>    <th>Company</th>     <th>Date/Time</th>      <th>Email</th>       <th>Purpose of Visit</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
	
	}
         querySnapshot.forEach((doc) => {
		var nodata = "";
            // doc.data() is never undefined for query doc snapshots
         var dates = new Date(doc.data().date).toLocaleString();
          document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
		});
		   document.write("</table>");
		// let sendingText = "https://aquameeting.github.io/?ipad=Yes"
	           document.head.innerHTML = header;
    }) 
    .catch((error) => {
         console.log("Error getting documents: ", error);
          document.write(title);
          document.write("<br>If schedule not found below, click <a href='" +  "https://aquameeting.github.io"   + "'>here</a> to continue<br>");
	  var nodata = "<br>No data found<br>";
	  document.write(nodata);
          document.head.innerHTML = header;
    });
      }
       
       
       
         var loaddball =  function(data){
        var db = firebase.firestore();
         var get_login = data["userid"];
         if (get_login  === null || get_login === '') {
               alert("Enter your Network Login ID above & try again!");
          }else{
       get_login  = get_login.toString();
     console.log(get_login);
      var header = "<head><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;}</style></head>";
    var title = "<center><h1>Aqua-Aerobic Systems Check-in/out Visitor Schedule</h1><h2>In-Active Visitor Schedule(s) for: " + get_login + "</h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br></center>";      
     
		  var lines = "";
            let today = new Date().toISOString().slice(0, 10);
         db.collection("messages").where("login", "==",get_login).where("remove", "==","Yes").orderBy("date","desc")
    .get()
    .then((querySnapshot) => {
		   var cnt = querySnapshot.size;
		 document.write(title);
	 if (cnt === 0){
		 var nodata = "<br>No data found<br>";
	  document.write(nodata);
	}else{
	   document.write("<table>  <tr>    <th>Aqua Employee</th>    <th>First Name</th>    <th>Last Name</th>    <th>Company</th>     <th>Date/Time</th>      <th>Email</th>       <th>Purpose of Visit</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
 
	}
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
          document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + doc.data().date.replace("T", " ") + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
        });
          	   document.write("</table>");
	           document.head.innerHTML = header;
    })
    .catch((error) => {
       document.write("</table>");
		    document.write("<p>NO DATA FOUND for today's date</p>");
        console.log("Error getting documents: ", error);
    });
           }
      }
	 
	  var getall = function(data){
             var data = {
          "userid": 'walkin'
        }
	    console.log('Getall');
           loaddbeverything(data);
       }
       
       var getloginname = function(){
            var username = document.getElementById("login").value;
         console.log("LoginName: " + username);
          if (username  === null || username === '') {
               alert("Enter your Network Login ID above & try again!");
          }else{
             var data = {
          "userid": username
        }
           loaddb(data);
          }
       }
       
        var gocheckin = function(){
             var get_id = document.getElementById("id").value;
	     var website = get_id  + '&checkin=Now';	
           var cwebsite = "https://aquavisitorsystem.github.io/?key=" + website;
             window.location = cwebsite;
       }
       
       var getloginname2 = function(){
            var username = document.getElementById("login").value;
         console.log("LoginName: " + username);
          if (username  === null || username === '') {
               alert("Enter your Network Login ID above & try again!");
          }else{
             var data = {
          "userid": username
        }
           loaddball(data);
          }
       }


      var contact_submit = function(){
         var login = document.getElementById("login");
        var fname = document.getElementById("fname");
        var lname = document.getElementById("lname");
        var pname = document.getElementById("pname");
	const d = new Date();
        let text = d.toISOString().slice(0, 19);
          var datess = text; 
	var pphone = document.getElementById("pphone");
        var pemail = document.getElementById("pemail");
        var grade = document.getElementById("grade");
	      console.log(login.value);
	            console.log(fname.value);
	            console.log(lname.value);
	            console.log(pname.value);
	            console.log(datess);
	            console.log(pphone.value);
	            console.log(pemail.value);
	            console.log(grade.value);
        var data = {
          "login": login.value,
          "fname": fname.value,
               "lname": lname.value,
               "pname": pname.value,
          "pemail": pemail.value,
          "pphone": pphone.value,
          "date": datess,
	 "grade": grade.value,
          "key": fname.value + lname.value + datess
        }
        
// empty string
if (login.value != null &&  login.value != '' && fname.value != null &&  fname.value != '' && lname.value != null &&  lname.value != '' && pname.value != null &&  pname.value != '' && pemail.value != null &&  pemail.value != ''  && pphone.value != null &&  pphone.value != ''   && grade.value != null &&  grade.value != '') {
     push_to_firebase(data);
} else {
    alert("All fields required!")
}}
	      
	      
	      var contact_walkup = function(data){
         var login = 'walkin';
        var fname =  data["fname"];
        var lname =  data["lname"];
        var cname =  data["cname"];
          var date =  data["date"];
        var email =  data["email"];
        var msg =  data["message"];
        var data = {
          "login": login.value,
          "fname": fname.value,
               "lname": lname.value,
               "cname": cname.value,
          "email": email.value,
          "msg": msg.value,
          "date": date.value,
          "key": fname.value + lname.value + date.value
	}
         push_to_firebase(data);
      }
      
     
      
       var update_submit = function(){
            var id = document.getElementById("id");
           var login = document.getElementById("login");
        var fname = document.getElementById("fname");
        var lname = document.getElementById("lname");
        var name = document.getElementById("pname");
          var grade = document.getElementById("grade");
        var email = document.getElementById("pemail");
        var phone = document.getElementById("pphone");
        var dates = new Date(date.value).toLocaleString();
        var data = {
             "id": id.value,
            "login": login.value,
          "fname": fname.value,
               "lname": lname.value,
               "name": name.value,
          "email": email.value,
	  "phone": phone.value,
          "grade": grade.value,
          "date": date.value
        }
        update(data);

      }
       
       var schedule = function(){
        document.getElementById('logins').style.display = 'contents';
          document.getElementById('logins').style.display = 'block';
        document.getElementById('schedule').style.display = 'none';
        document.getElementById('getall').style.display = 'none';
        document.getElementById('meetingfields').style.display = 'block';
        document.getElementById('submit_msg').style.display = 'block';
       document.getElementById('update_db').style.display = 'none';
       document.getElementById('get_id').style.display = 'block';
      document.getElementById('get_msg').style.display = 'block';
         document.getElementById('get_id2').style.display = 'block';
       }
       
         var updateschedule = function(){
        document.getElementById('logins').style.display = 'contents';
          document.getElementById('logins').style.display = 'block';
        document.getElementById('schedule').style.display = 'none';
        document.getElementById('getall').style.display = 'none';
        document.getElementById('meetingfields').style.display = 'block';
        document.getElementById('submit_msg').style.display = 'none';
       document.getElementById('update_db').style.display = 'block';
       document.getElementById('get_id').style.display = 'block';
      document.getElementById('get_msg').style.display = 'block';
                 document.getElementById('get_id2').style.display = 'block';
       }
       
       var getall = function(){
           
         document.getElementById('logins').style.display = 'contents';
          document.getElementById('logins').style.display = 'block';
       document.getElementById('schedule').style.display = 'none';
        document.getElementById('getall').style.display = 'none';
        document.getElementById('meetingfields').style.display = 'none';
        document.getElementById('submit_msg').style.display = 'none';
       document.getElementById('update_db').style.display = 'none';
       document.getElementById('get_id').style.display = 'block';
      document.getElementById('get_msg').style.display = 'block';
          document.getElementById('get_id2').style.display = 'block';
       }
       
       // <button id="checkin" type="button">Everything look ok? Tap Here to Check-In</button>
       
         document.getElementById('schedule').style.display = 'block';
        document.getElementById('getall').style.display = 'block';
        document.getElementById('meetingfields').style.display = 'none';
        document.getElementById('submit_msg').style.display = 'none';
       document.getElementById('update_db').style.display = 'none';
       document.getElementById('get_id').style.display = 'none';
      document.getElementById('get_msg').style.display = 'none';
       document.getElementById('logins').style.display = 'none';
       document.getElementById('get_id2').style.display = 'none';
	     document.getElementById('checkin').style.display = 'none';

      document.getElementById("submit_msg").addEventListener("click", contact_submit);
       document.getElementById("update_db").addEventListener("click",update_submit);
       document.getElementById("get_id").addEventListener("click",getloginname);
             document.getElementById("get_msg").addEventListener("click", loadweb);
            document.getElementById("get_id2").addEventListener("click", getloginname2);
            document.getElementById("schedule").addEventListener("click", schedule);
            document.getElementById("getall").addEventListener("click", getall);
	    document.getElementById("checkin").addEventListener("click", gocheckin);
   //iPadid
	    
          var queryString = window.location.search;
      console.log(queryString);
      var urlParams = new URLSearchParams(queryString);
      
	      var g_all= urlParams.get('all')
      console.log(g_all);
	    
          var g_fname = urlParams.get('fname')
      console.log(g_fname);
	    
	     var g_iPadid = urlParams.get('iPadid')
      console.log(g_iPadid);
	    
	        var g_lname = urlParams.get('lname')
      console.log(g_lname);
	    
	        var g_cname = urlParams.get('company')
      console.log(g_cname);
	    
	      var g_email = urlParams.get('email')
      console.log(g_email);
	    
	        var g_message = urlParams.get('message')
      console.log(g_message);
	    
	        var g_date = urlParams.get('date')
      console.log(g_date);
	    
	    
        var id_remove = urlParams.get('Remove')
      console.log(id_remove);
      
        var id_active = urlParams.get('Active')
      console.log(id_active);
      
      var id = urlParams.get('id')
      console.log(id);
      
        var userid = urlParams.get('userid')
      console.log(userid);
      
      var keyid = urlParams.get('key')
      console.log(keyid);
      
            var checkin = urlParams.get('checkin')
      console.log(checkin);
      
            var checkout = urlParams.get('checkout')
      console.log(checkout);
	    
      var g_today = urlParams.get('today')
      console.log(g_today);
	    
	    //loaddbtoday
	    
	    
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
	    
if (g_today != null && g_today != '') {
	document.getElementById('loading').style.display = 'none';
	document.getElementById('schedule').style.display = 'none';
        document.getElementById('getall').style.display = 'none';
	 document.getElementById('header').style.display = 'none';
	 document.getElementById('logo').style.display = 'none';
	loaddbtoday();
}	    
	
	    
// empty string
if (g_all == 'yes') {
       loaddbeverything();
} else {
  console.log('string IS empty');
}   

if (g_all == 'no') {
       loadinactive();
} else {
  console.log('string IS empty');
}   

if (g_all == 'today') {
       loadtoday();
} else {
  console.log('string IS empty');
}  

// empty string
if ((id_active === 'No') && (userid != null && userid != '')) {
   var data = {
          "userid": userid,
        }
       loaddball(data);
} else {
  console.log('string IS empty');
}     
      
if ((id_active === 'Yes') && (userid != null && userid != '')) {
   var data = {
          "userid": userid,
        }
       loaddb(data);
} else {
  console.log('string IS empty');
}    
      
if ((id_remove === 'Yes') && (id != null && id != '')) {
  var data = {
          "id": id
        }
      updateremoveYes(data);
} else {
  console.log('string IS empty');
}      
      
 if ((id_remove === 'No') && (id != null && id != '')) {
  var data = {
          "id": id
        }
      updateremoveNO(data);
} else {
  console.log('string IS empty');
}       
      
      
if (id != null && id != '') {
	  document.getElementById('schedule').style.display = 'none';
        document.getElementById('getall').style.display = 'none';
	 document.getElementById('header').style.display = 'none';
	 document.getElementById('logo').style.display = 'none';
  console.log('string is NOT empty');
  var website = id + '&checkin=Now';	
	var emailwebsite = "https://ignitevisitorsystem.github.io/?key=" + website;
	var data2 = {
          "web": emailwebsite
        }
         createbitly(data2);
	sleep(1000).then(() => {
		 var data = {
          "id": id,
	  "iPad": 'No'
        }
        key_id="";
        updateschedule();
         get_data(data);
        });
} else {
  console.log('string IS empty');
}
	    
 if (g_iPadid != null && g_iPadid != '') {
	  document.getElementById('schedule').style.display = 'none';
        document.getElementById('getall').style.display = 'none';
	 document.getElementById('header').style.display = 'none';
	 document.getElementById('logo').style.display = 'none';
  console.log('string is NOT empty');
  var website = g_iPadid + '&checkin=Now';	
 var cwebsite = "https://ignitevisitorsystem.github.io/?key=" + website;
	var emailwebsite = website; //"https://aquameeting.github.io/?key=" + website;
	var data2 = {
          "web": emailwebsite
        }
        // createbitly(data2);
	//sleep(1000).then(() => {
		 var data = {
          "id": g_iPadid,
          "iPad": 'Yes'
        }
        key_id="";
        updateschedule();
         get_data(data);
		    
      console.log("loaded g_iPadid");
      //  });
} else {
  console.log('string IS empty');
}
      
      // empty string
if ((checkin != null && checkin != '') &&  (keyid != null && keyid != '')) {
  console.log('string is NOT empty');
if (checkin === 'walkin'){
	document.getElementById('schedule').style.display = 'none';
        document.getElementById('getall').style.display = 'none';
	 document.getElementById('header').style.display = 'none';
	 document.getElementById('logo').style.display = 'none';
     var data = {
	   "login": 'walkin',
	   "key": g_fname + g_lname + g_date,
          "fname": g_fname,
          "lname": g_lname,
          "email": g_email,
          "cname": g_cname,
         "msg": g_message, 
         "date": g_date
        }
    push_to_firebase(data);
		sleep(3000).then(() => {
		 var data1 = {
          "checkin": checkin,
           "id": g_fname + g_lname + g_date
        }
  get_checkin_data(data1);
        });
    }else{
	 document.getElementById('schedule').style.display = 'none';
        document.getElementById('getall').style.display = 'none';
	 document.getElementById('header').style.display = 'none';
	 document.getElementById('logo').style.display = 'none';
	 var data3 = {
          "checkin": checkin,
           "id": keyid
        }
  get_checkin_data(data3);
}
 
} else {
  console.log('string IS empty');
}
