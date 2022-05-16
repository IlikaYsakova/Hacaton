// ! ============= todo list ===============
// ? CRUD - create read update delete
let btn = document.querySelector(".twitterMain_btn");
let inp = document.querySelector(".twitter-input");
let list = document.querySelector(".post__header");
const API = "http://localhost:8000/posts";
let allPosts = document.querySelector(".allPosts");

btn.addEventListener("click", () => {
  if (!inp.value) {
    alert("Заполните поле!");
    return;
  }
  let newPost = {
    // создаем новый объект, куда добавляем значения наших инпутов
    newTweet: inp.value,
  };
  createPost(newPost);
  showPost();
});
showPost();
// ! ================= CREATE =====================
// Функция для добавления новых книг в базу данных (db.json)
function createPost(post) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(post),
  }).then(() => showPost());
  inp.value = "";
}

// !=============== READ ====================
// Создаём функцию для отображения
function showPost() {
  //получение данных из db.json
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      allPosts.innerHTML = ""; //очищаем тэг section, чтобыне было дубликатов
      data
        .sort((a, b) => {
          return b.id - a.id;
        })
        .forEach((item) => {
          // перебираем наш полученный массив с объектами
          //добавляем в наш тэг section верстку карточек с данными из массива, при каждом цикле
          allPosts.innerHTML += `
        <div class="post">
          <div class="post__avatar">
            <img
              src="https://cms.qz.com/wp-content/uploads/2017/03/twitter_egg_blue.png?quality=75&strip=all&w=900&h=900&crop=1"
              alt=""
            />
          </div>
          <div class="post__body">
            <div class="post__header">
              <div class="post__headerText">
                <h3>Ilika Ysakova</h3>
              </div>
              <div class="post__headerDescription">
                <p>${item.newTweet}
                </p>
              </div>
            </div>
            <img
              src="https://phantom-marca.unidadeditorial.es/1019ed0a72dcfbffe748b8a69bac7fe1/resize/1320/f/jpg/assets/multimedia/imagenes/2022/05/06/16518234543202.jpg"
              alt=""
            />
            <div class="post__footer">
              <div class="reply">
                <a href="#">
                  <img src="./assets/reply.svg" alt="" />
                </a>
              </div>
              <div class="retweet">
                <a href="#">
                  <img src="./assets/retweet.svg" alt="" />
                </a>
              </div>
              <div  class="favorits">
                  <img src="./assets/edit.svg" alt="" />
              </div>
              <div onclick="deletePost(${item.id})" class="trash" id="${item.id}">
                  <img src="./assets/trash.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
        `;
        });
    });
}

function deletePost(id) {
  console.log(id);
  fetch(`${API}/${id}`, {
    method: "DELETE",
  }).then(() => showPost());
}
