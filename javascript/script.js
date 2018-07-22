
//Constant to store user's profile data from the api
var profileData =[];


//Grab the UI element that we need to manipulate
var img = document.getElementById('img');
var userName= document.getElementById('user-name');
var userId = document.getElementById('user-id');
var userProfile = document.getElementById('user-profile');
var repositoriesCounter = document.getElementById('repositoriesCounter');
var starsCounter = document.getElementById('starsCounter');
var followersCounter = document.getElementById('followersCounter');
var followingCounter = document.getElementById('followingCounter');
var userDetailList = document.getElementById('user-detail-list');
var button = document.getElementsByTagName('button');
var typeoption = document.getElementById('typeOption').children;
var languageoption = document.getElementById('languageOption').children;
var mainbutton = document.getElementsByClassName('mainbutton');
var option = document.getElementsByClassName('option');




// function to convert month from number to words
function convertMonth(numMonth)
{
var months = ["January","February","March","April","May",
              "June","July","August","September","October",
              "November","December"];
return months[numMonth];
}


//Fetching data from api for user detail in vanilla javascript
fetch('https://api.github.com/users/supreetsingh247').then(function(response) {
  if(response.ok) {
    response.json().then(function(json) {
      profileData = json;
      loadData(profileData);
    });
  } else {
    console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
  }
});


 
//Function to load data of user in the html page from api
 function loadData(profileData)
  {
    img.setAttribute('src',profileData.avatar_url);
    userName.innerHTML = profileData.name;
    userId.innerHTML = profileData.login;
    userProfile.innerHTML = profileData.bio;
    repositoriesCounter.innerHTML = profileData.public_repos;
    starsCounter.innerHTML = profileData.public_gists;
    followersCounter.innerHTML = profileData.followers;
    followingCounter.innerHTML = profileData.following;
     
     //Concatenating the element for user detail
     let output = `
          <li class="corporation"><i class="far fa-building padding-right-5"></i> ${profileData.company}</li>
		  <li class="country"><i class="fas fa-map-marker-alt padding-right-5"></i> ${profileData.location}</li>
		  <li class="email-id"><a href="#"><i class="fas fa-envelope padding-right-5"></i> ${profileData.email} </a></li>
         `;
      
      userDetailList.innerHTML = output;   
       
       //checking for null value
       //if the api data returns the null value then that element will not be displayed in the screen
      if(profileData.company == null) 
      document.getElementsByClassName('corporation')[0].style.display = "none";
      if(profileData.location == null) 
      document.getElementsByClassName('country')[0].style.display = "none";
      if(profileData.email == null)  
      document.getElementsByClassName('email-id')[0].style.display = "none";
   }

/* <a href=""><i class="fas fa-balance-scale padding-right-5"></i>?${repos.license}</a>  */



 // Fetching the repositories data from the another api
fetch('https://api.github.com/users/supreetsingh247/repos').then(function(response) {
  if(response.ok) {
    response.json().then(function(json) {
      reposData = json;
      loadReposData(reposData);
      removeNull(reposData);
      languageColor(reposData);
      formatDate(reposData);
    });
  } else {
    console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
  }
});



  //Function to load repositories data into the html page and arrange the element 
	function loadReposData(reposData)
	{
       let output = "" ;
	   reposData.forEach(function(repos){

	    output += `  <ul>
	                   <li class="repositories-block-container">
						    <div class="rp-title"><h3><a href="">${repos.name}</h3></a></div>
						    <div class="rp-value"><span>${repos.description}</span></div>
						    <div class="rp-icon">  
							    <span class="circle"></span>
							    <span class="rp-text">${repos.language}</span>
							    <span class="rp-date"></span>
							</div>
						</li>
						</ul>
	   	`;             
	   });
	   document.getElementById('fetch-repos').innerHTML = output;
    }


   

   //function to remove the element if the content data is null
   function removeNull(reposData)
   {
    for (var i = reposData.length - 1; i >= 0; i--)
     {
    	if(reposData[i].description == null)
        document.getElementsByClassName('rp-value')[i].style.display = "none";	
     }
   }
   


   //function to change the color of circle in repositories according to given language
     function languageColor(reposData)
      {
         for (var i = reposData.length - 1; i >= 0; i--)
          {
            if(reposData[i].language == null){
	         document.getElementsByClassName('rp-text')[i].style.display = "none";
	         document.getElementsByClassName('circle')[i].style.display = "none";}
	       
	        else if(reposData[i].language == "JavaScript" )
	         document.getElementsByClassName('circle')[i].style.backgroundColor = "#f1e05a";
	        
	        else if(reposData[i].language == "CSS")
	        document.getElementsByClassName('circle')[i].style.backgroundColor = "#563d7c";
          
          }
      }

   


  //Function to change the given date in ISO format to required format
   function formatDate(reposData)
   {
   	for (var i = reposData.length - 1; i >= 0; i--)
   	 {
	    var dateTime = reposData[i].updated_at;
        var dateIso = dateTime.split("T");
	    
	    var d = new Date(dateIso[0]);
	    var year = d.getFullYear();
	    var month = d.getMonth();
	    
	    var date = d.getDate();
	    var final = "Updated on " + date +" " + convertMonth(month) + "," + year;
	    
	    document.getElementsByClassName('rp-date')[i].innerHTML = final;
    }

  }



  //Function to display and hide the search filter
  function hide(q){
  document.getElementById(q).style.display = "none";



  }


//Function to select the option from dropdown
function select1(g)
{
   for (var i = typeoption.length - 1; i >= 1; i--) {
   	typeoption[i].children[0].style.display = "none";
   }

  g.children[0].style.display = "block";
  var value = g.value;
  document.getElementById('typeOption').style.display = "none";
  mainbutton[0].children[1].innerHTML = value;
  mainbutton[0].classList.remove("active"); 
  return value; 
}

function select2(g)
{
   for (var i = languageoption.length - 1; i >= 1; i--) {
   	languageoption[i].children[0].style.display = "none";
   }

  g.children[0].style.display = "block";
  var value = g.value;
  document.getElementById('languageOption').style.display = "none";
  mainbutton[1].children[1].innerHTML = value;
  mainbutton[1].classList.remove("active"); 
  return value; 
}





//toggle function on the button and display the list

function toggle(q,nav) {
	
  var change =  document.getElementById(nav);

  if(q.classList.contains('active') == false)
  {
  for(var i=0; i<mainbutton.length; i++ )
  {
  	mainbutton[i].classList.remove("active");
    option[i].style.display = "none";
   }
   q.classList.add("active");
   change.style.display = "block";
  }
  else{
     q.classList.remove("active");
     change.style.display = "none";
  }   
}


//make disappear some of the item on page load
function makeNone()
{
  for (var i = typeoption.length - 1; i >= 2; i--) {
    typeoption[i].children[0].style.display = "none";
  }
  for (var i = languageoption.length - 1; i >= 2; i--) {
    languageoption[i].children[0].style.display = "none";
  }
}




  
2