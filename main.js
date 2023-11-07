let htmlBtnStartEasy = document.querySelector(".splash-screen .start-btn.easy");
let htmlBtnStartMid = document.querySelector(".splash-screen .start-btn.midum");
let htmlBtnStartHard = document.querySelector(".splash-screen .start-btn.hard");
let htmlMemGameBlocks = document.querySelector(".mem-app .mem-game-blocks");
let level_Difficulty = 10; //10 || 15 || 20
let htmlTimer = document.querySelector(".info .timer");
let mainTimerCount = 0;
let mainTimerInterval;
let htmlWrongTries = document.querySelector(".info .tries span");
let countWrong;
let durationFlip = 500; //in milesecond
let correctFlipped = 0;

htmlBtnStartEasy.onclick = function () {
  level_Difficulty = 10;
  letsPlay();
};

htmlBtnStartMid.onclick = function () {
  level_Difficulty = 15;
  letsPlay();
};

htmlBtnStartHard.onclick = function () {
  level_Difficulty = 20;
  letsPlay();
};

function letsPlay() {
  let userName =
    document.querySelector(".splash-screen input").value || "Hndsme";
  document.querySelector(".info .name span").innerHTML = userName;
  document.querySelector(".splash-screen").remove();
  createBackBrands();
  flipAllFirstTime();
  startPlay();
}

function startPlay() {
  let blocks = Array.from(htmlMemGameBlocks.children);
  blocks.forEach((ele) => {
    ele.addEventListener("click", function () {
      flipBlock(ele);
    });
  });
}

function startTimer() {
  mainTimerCount++;

  mainTimerInterval = setInterval(() => {
    let minutes, seconds;
    minutes = parseInt(mainTimerCount / 60);
    seconds = parseInt(mainTimerCount % 60);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    htmlTimer.innerHTML = `${minutes}:${seconds}`;
    mainTimerCount++;
  }, 1000);
}

function flipBlock(block) {
  block.classList.add("is-flipped");
  let currentFlipped = document.querySelectorAll(
    ".mem-game-blocks .is-flipped"
  );
  if (currentFlipped.length === 2) {
    stopClicking();
    checkMatchedBlocks(currentFlipped[0], currentFlipped[1]);

    if (correctFlipped == level_Difficulty * 2) finishTheGame();
  }
}

function stopClicking() {
  htmlMemGameBlocks.classList.add("no-clicking");
  setTimeout(() => {
    htmlMemGameBlocks.classList.remove("no-clicking");
  }, durationFlip);
}

function checkMatchedBlocks(firstBlock, secondBlock) {
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    correctFlipped += 2;
    document.getElementById("success").play();
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
  } else {
    editWrongTries();
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, durationFlip);
    document.getElementById("fail").play();
  }
}

function finishTheGame() {
  clearInterval(mainTimerInterval);
  document.getElementById("doneAll").play();

  setTimeout(createEndSplash, 1500);
}

function createEndSplash() {
  let createEndSplash = document.createElement("div");
  createEndSplash.classList = "splash-screen splash-screen-end";
  let spanEndBtn = document.createElement("span");
  spanEndBtn.classList = "start-btn";
  spanEndBtn.innerHTML = "Again!";
  createEndSplash.append(spanEndBtn);
  htmlMemGameBlocks.append(createEndSplash);

  spanEndBtn.onclick = function () {
    window.location.reload();
  };
}

function editWrongTries() {
  countWrong = parseInt(htmlWrongTries.innerHTML);
  console.log(countWrong + "");
  countWrong < 9
    ? (htmlWrongTries.innerHTML = `0${countWrong + 1}`)
    : (htmlWrongTries.innerHTML = `${countWrong + 1}`);
}

function createBackBrands() {
  let brandsIconsName = [
    "twitter",
    "tiktok",
    "discord",
    "apple",
    "paypal",
    "firefox",
    "android",
    "gitlab",
    "playstation",
    "tumblr",
    "sticker-mule",
    "sass",
    "pinterest-p",
    "git-alt",
    "fort-awesome",
    "css3",
    "space-awesome",
    "mailchimp",
    "jenkins",
    "facebook-f",
    "freebsd",
  ];
  let shuffledBrands = shuffle(brandsIconsName);
  let orderBrands = shuffle([...Array(level_Difficulty * 2).keys()]);

  let t = 2;
  //to add card two times
  while (t--) {
    for (let i = 0; i < level_Difficulty; i++) {
      let gameBlock = document.createElement("div");
      gameBlock.classList = "game-block";
      gameBlock.style.order = orderBrands.pop();
      gameBlock.dataset.technology = shuffledBrands[i];
      let front = document.createElement("div");
      front.classList = "face front";
      front.innerHTML = `<i class="fa-solid fa-question"></i>`;
      let back = document.createElement("div");
      back.classList = "face back";
      back.innerHTML = `<i class="fa-brands fa-${shuffledBrands[i]}"></i>`;
      gameBlock.append(front, back);
      htmlMemGameBlocks.append(gameBlock);
      htmlMemGameBlocks.append(gameBlock);
    }
  }
}

function flipAllFirstTime() {
  let htmlFlipAll = document.querySelectorAll(".mem-game-blocks .game-block");
  let rndm = shuffle([...Array(level_Difficulty * 2).keys()]);

  let rptTime = setInterval(() => {
    htmlFlipAll[rndm.pop()].classList.add("is-flipped");
    if (rndm.length == 0) clearInterval(rptTime);
  }, 300);

  //hide all
  setTimeout(() => {
    htmlFlipAll.forEach((ele) => {
      ele.classList.remove("is-flipped");
    });
    htmlMemGameBlocks.classList.remove("no-clicking");
    startTimer(); //to start the timer
  }, 300 * level_Difficulty * 2 + 1000);
}

function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element using destruction
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
