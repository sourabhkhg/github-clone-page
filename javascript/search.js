
// variable to store all the object of json data that has been fetched from api
var repositories;


//grap the UI element that we need to manipulate
var input = document.getElementById('input');
var reposContainer = document.getElementById('fetch-repos');


// Fetching the data from api and storing in a variable using vanilla javascript
fetch('https://api.github.com/users/supreetsingh247/repos')
.then(repos => repos.json())
.then(data => repositories = data)



//Function to search the input data from the fetched repositories
function searchInName(wordToSearch, repositories)
{
	return repositories.filter(word => {

		const regexp = RegExp(wordToSearch,'gi');
		return word.name.match(regexp) || word.updated_at.match(regexp)
	});
}


//Function to display the seached content on the screen
function display()
{
  let final = searchInName(this.value,repositories) ;
  const html = final.map(word => {
      return `
             <ul>
                 <li class="repositories-block-container">
				    <div class="rp-title"><h3><a href="">${word.name}</h3></a></div>
					<div class="rp-value"><span>${word.description}</span></div>
					<div class="rp-icon">  
				       <span class="circle"></span>
				       <span class="rp-text">${word.language}</span>
				       <span class="rp-date"></span>
					</div>
				 </li>
			</ul>
          `;

  }).join('');
    reposData = final;
  reposContainer.innerHTML = html;
     removeNull(reposData);
     languageColor(reposData);
     formatDate(reposData);
}



// Event listner to record the event on any given input
input.addEventListener('change',display);
input.addEventListener('keyup',display);
