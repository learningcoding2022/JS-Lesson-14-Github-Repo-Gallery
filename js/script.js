//create global variables

//div contains profile information:
const overview = document.querySelector(".overview");

const username = "learningcoding2022"; 

const repoList = document.querySelector(".repo-list");

//variable selects the section with a class of "repos" where all your repo information appears
const selectsRepos = document.querySelector(".repos");

//variable selects the sections with a class of "repo-data" where the individual repo data will appear
const selectsRepoData = document.querySelector(".repo-data");

//variable selects the Back to Repo Gallery Button
const backToReposButton = document.querySelector(".view-repos");
//why doesn't this need "view-repos hide"?

//variable selects the input with the "search by name" placeholder
const filterInput = document.querySelector("filter-repos");
//why doesn't this need "filter-repos hide"?

//fetch API JSON Data

//create and name an async function to fetch information from your GitHub profile
const getGitData = async function () {
    const gitData  = await fetch (`https://api.github.com/users/${username}`); 
    //convert from json file to javascript object in order to manipulate data and display on webpage
    const data = await gitData.json();
    showUserData(data);
};

getGitData();

//fetch and display user info
//name a new function to display the fetched user information on the page. This function should accept the JSON data as a parameter.
const showUserData = function (data) {
//Inside the function, create a new div and give it a class of “user-info”. 
    const div = document.createElement("div");
    div.classList.add("user-info");
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
    overview.append(div);
    //use json file to grab specific data/properties
    gitRepos();
};

//create and anem a new asynch function to fetch your repos
const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    //how do you get the endpoints used above??
    const selectsRepoData = await fetchRepos.json();
    //which const do I logout to make sure the code is retrieving the repos?
    displayRepoInfo(selectsRepoData);
};

//display info about your repos
const displayRepoInfo = function (repos) {
    //where does the const repos come from?
    //inside the function, loop and create a list item for each repo and give each item: a class, h3
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

//add a click event
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        //why is the = e.target.innerText??
        //console.log(repoName);
        getRepoInfo(repoName);
    }
}
);


//create a function to get specific repo info
const getRepoInfo = async function (repoName) {
    //In the function, make a fetch request to grab information about the specific repository.
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);
    //create an array of languages 
    //create a variable called fetchLanguagues to fetch data from language_url property of your repoInfo
    const fetchLanguages = await fetch(repoInfo.languages_url);
    //create a variable called languageData to save the JSON response
    const languageData = await fetchLanguages.json();
    console.log(languageData);
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
    //empty the HTML of the section with a class of "repo-data"
    selectsRepoData.innerHTML = "";
    //Unhide (show) the “repo-data” element. 
    selectsRepoData.classList.remove("hide");
    //Hide the element with the class of “repos”.
    selectsRepos.classList.add("hide");
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
    repos.classList.remove("hide");
    //add the "hide" class to the section where the undividual repo data will appear 
    selectsRepoData.classList.add("hide");
    //add the "hide" class to the Back to Repo Gallery button itself

}
);



