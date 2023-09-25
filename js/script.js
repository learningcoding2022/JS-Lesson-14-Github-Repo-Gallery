//create global variables

//contains profile information:
const overview = document.querySelector(".overview");

const username = "learningcoding2022"; 

const repoList = document.querySelector(".repo-list");

//selects the section with a class of "repos" where the repo information appears
const allReposContainer = document.querySelector(".repos");

//selects the individual repo data will appear
const selectsRepoData = document.querySelector(".repo-data");

const backToReposButton = document.querySelector(".view-repos");

//selects the input with the "search by name" placeholder
const filterInput = document.querySelector(".filter-repos");

//fetch API JSON Data

//fetchs information from the GitHub profile
const getGitData = async function () {
    const gitData  = await fetch (`https://api.github.com/users/${username}`); 
    const data = await gitData.json(); 
    showUserData(data);

};

getGitData();

//this function fetches and displays user info
const showUserData = function (data) {
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
    overview.append(div);
    gitRepos(username);
};

//this async function to fetches the repos
const gitRepos = async function (username) {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const selectsRepoData = await fetchRepos.json();
    displayRepoInfo(selectsRepoData);
};

//displays repo information
const displayRepoInfo = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

//click event shows repo information
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
}
);

//function provides specific repo info when the repo is clicked
const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    
    displaySpecificRepoInfo(repoInfo, languages);
};

const displaySpecificRepoInfo = function (repoInfo, languages) {
    backToReposButton.classList.remove("hide");
    selectsRepoData.innerHTML = "";
    selectsRepoData.classList.remove("hide");
    allReposContainer.classList.add("hide");
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

//click event to the back button
backToReposButton.addEventListener("click", function () {
    allReposContainer.classList.remove("hide");
    selectsRepoData.classList.add("hide");
    backToReposButton.classList.add("hide");
});

//dynamic search

//"input" event listener for filterInput
filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchLowerText = searchText.toLowerCase();
  
    for (const repo of repos) {
      const repoLowerText = repo.innerText.toLowerCase();
      if (repoLowerText.includes(searchLowerText)) {
        repo.classList.remove("hide");
      } else {
        repo.classList.add("hide");
      }
    }
  });

