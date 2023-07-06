//create global variables

//div contains profile information:
const overview = document.querySelector(".overview");

const username = "learningcoding2022"; 

const repoList = document.querySelector(".repo-list");

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
    const repoData = await fetchRepos.json();
    //which const do I logout to make sure the code is retrieving the repos?
    displayRepoInfo(repoData);
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