let form = document.querySelector("form");
let username = form.username;
let highscore = form.highscore;
const div = document.querySelector("div");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let userName = username.value;
  let highScore = highscore.value;
  postUserToBackEnd(userName, highScore);
});

const fetchAllUsers = () =>
  fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((users) => {
      console.log(users);
      users.forEach((element) => {
        addUserToPage(element);
      });
    });

const addUserToPage = (user) => {
  let h2 = document.createElement("h2");
  h2.textContent = `user_name: ${user["user_name"]}, score: ${user["high_score"]}`;
  div.append(h2);
};

const postUserToBackEnd = (userName, highScore) => {
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_name: `${userName}`,
      high_score: `${highScore}`,
    }),
  })
    .then((res) => res.json())
    .then((user) => {
      div.innerHTML = "";
      fetchAllUsers();
    });
};  

fetchAllUsers();
