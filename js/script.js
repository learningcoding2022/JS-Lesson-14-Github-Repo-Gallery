//create global variables

//div contains profile information:
const overview = document.querySelector(".overview");

const username = "learningcoding2022"; 

const repoList = document.querySelector(".repo-list");

//variable selects the section with a class of "repos" where all your repo information appears
const allReposContainer = document.querySelector(".repos");

//variable selects the sections with a class of "repo-data" where the individual repo data will appear
const selectsRepoData = document.querySelector(".repo-data");

//variable selects the Back to Repo Gallery Button
const backToReposButton = document.querySelector(".view-repos");
//why doesn't this need "view-repos hide"?

//variable selects the input with the "search by name" placeholder
const filterInput = document.querySelector(".filter-repos");
//why doesn't this need "filter-repos hide"?

//fetch API JSON Data

//create and name an async function to fetch information from your GitHub profile
const getGitData = async function () {
    const gitData  = await fetch (`https://api.github.com/users/${username}`); 
    //resolve the JSON response and convert from json file to javascript object in order to manipulate data and display on webpage
    const data = await gitData.json();
    //console.log(data); 
    //want to message out data because this holds the information I fetched
    showUserData(data);
    //this calls the display function, but why here?
  
};

getGitData();

//fetch and ***display my user info (rather than just general profile info)
//name a new function to display the fetched user (my user info) information on the page. This function should accept the JSON data as a parameter.
const showUserData = function (data) {
//Inside the function, create a new div and give it a class of “user-info”. 
//we are creating a list of my user info
    //create a new div
    const div = document.createElement("div");
    //give the new div a class of "user-info"
    div.classList.add("user-info");
    //use the JSON data to grab the relevant properties to display on the page
    //grabs the info you want to display
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div> 
    `;
    // append the div to the overview element
    //aka this makes the list, but it won't show up yet because you still need to call the function
    overview.append(div);
    //use json file to grab specific data/properties
    gitRepos(username);
    //how do you know to use this function??
};

//now we need to get the repo information to eventually display (we already got the user info and made a list of this to display)
//create and name a new async function to fetch/get your repos
const gitRepos = async function (username) {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    //researched the endpoints above and added parameters to sort the repos by the most recently updated to last updated and show up to 100 repos per page at a time
    const selectsRepoData = await fetchRepos.json();
    //this is asking the computer to wait for this data
    //which const do I logout to make sure the code is retrieving the repos and look for properties I will need?
    //is it console.log(selectsRepoData); ?
    displayRepoInfo(selectsRepoData);
    //where does this function come from (step 3 of 7)???? how can I explain this??
};

//now that I have gotten the repo info, I need to display the info about my repos
//why is repos used as a parameter? (use repos as a parameter so that the function accepts the data returned from your last API call)
const displayRepoInfo = function (repos) {
    //at the top of the function that displays your repos show the filterInput element
    filterInput.classList.remove("hide");
    //inside the function, loop and create a list item for each repo and give each item: a class, h3
    //below I'm giving each repo a class and an h3 and then adding it to an unordered repos list
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

//add a click event to show repo information when someone clicks on a title of one
repoList.addEventListener("click", function (e) {
//how do you know to include (e) in this function?
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        ////why is the = e.target.innerText?? what does this do?
        //console.log(repoName);
        getRepoInfo(repoName);
        ////why does this function go here?
    }
}
);

//create a function to get specific repo info (to provide the repo description when you click on the repo)
const getRepoInfo = async function (repoName) {
    //In the function, make a fetch request to grab information about the specific repository.
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    //how do you know to put {repoName} instead of {repo} (listed on github page)
    const repoInfo = await fetchInfo.json();
    //console.log(repoInfo); this allows you to see the information grabbed/fetched
    //create an array of languages 
    //create a variable called fetchLanguagues to fetch data from language_url property of your repoInfo
    const fetchLanguages = await fetch(repoInfo.languages_url);
    //create a variable called languageData to save the JSON response
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    //when tested this pulled up all properties rather than just the languages

    //add each language to an empty array called languages- make a list of languages
    const languages = [];
    //the language data is an object- you'll want to loop through an object to add the languages to the end of the array
    for (const language in languageData) {
        languages.push(language);
    }
    
    displaySpecificRepoInfo(repoInfo, languages);
};

const displaySpecificRepoInfo = function (repoInfo, languages) {
    //shows the Back to Repo Gallery Button and the back to Repo Gallery button
    backToReposButton.classList.remove("hide");
    //empty the HTML of the section with a class of "repo-data"
    selectsRepoData.innerHTML = "";
    //Unhide (show) the “repo-data” element. 
    selectsRepoData.classList.remove("hide");
    //Hide the element with the class of “repos”.
    allReposContainer.classList.add("hide");
    //create a new div element and add the selected repository's name, description, default branch, and link to its code on GitHub
    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    selectsRepoData.append(div);
};

//add a click event to the back button
backToReposButton.addEventListener("click", function () {
    //unhide (display) the section where all the repo information appears
    allReposContainer.classList.remove("hide");
    //add the "hide" class to the section where the undividual repo data will appear 
    selectsRepoData.classList.add("hide");
    //add the "hide" class to the Back to Repo Gallery button itself
    backToReposButton.classList.add("hide");
});

// dynamic search

// attach an "input" event listener to filterInput. Pass the event (e) the call back function
filterInput.addEventListener("input", function (e) {
    //add a const to capture the value of the search text
    const searchText = e.target.value;
    //create a variable called repos to select ALL elements on the page with a class of "repo"
    const repos = document.querySelectorAll("repo");
    //create a variable and assign it to the lowercase value of the search text.
    const searchLowerText = searchText.toLowerCase();

    //loop through each repo inside your repos element
    for (const repo of repos) {
        //inside the loop, create a variable and assign it to the lowercase value of the innerText of each repo
        const repoLowerText = repo.innerText.toLowerCase();
        if (repoLowerText.includes) {
        //if the repo contains text, show it. If it doesn't contain the text, hide the repo.
        repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});

//Create a gh-pages branch in your repo to host your project on GitHub Pages.
