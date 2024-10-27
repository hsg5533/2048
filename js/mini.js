var score,
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  tableID = [
    ["00", "01", "02", "03"],
    ["10", "11", "12", "13"],
    ["20", "21", "22", "23"],
    ["30", "31", "32", "33"],
  ];
function keyDownEventHandler(r) {
  switch (r.keyCode) {
    case 38:
      moveDir(0);
      break;
    case 40:
      moveDir(1);
      break;
    case 37:
      moveDir(2);
      break;
    case 39:
      moveDir(3);
  }
}
function init() {
  score = 0;
  for (var r = 0; r < 4; r++) for (var o = 0; o < 4; o++) board[r][o] = 0;
  for (var r = 0; r < 2; r++) {
    var e = parseInt(16 * Math.random()),
      a = parseInt(e / 4),
      $ = e % 4;
    0 == board[a][$] ? (board[a][$] = getNewNum()) : r--;
  }
  update();
}
function update() {
  for (var r = 0; r < 4; r++)
    for (var o = 0; o < 4; o++) {
      var e = document.getElementById(tableID[r][o]);
      (e.innerHTML = 0 == board[r][o] ? "" : board[r][o]), coloring(e);
    }
  document.getElementById("score").innerHTML = score;
}
function coloring(r) {
  var o = parseInt(r.innerHTML);
  switch (o) {
    case 0:
    case 2:
      (r.style.color = "#684A23"), (r.style.background = "#FBEDDC");
      break;
    case 4:
      (r.style.color = "#684A23"), (r.style.background = "#F9E2C7");
      break;
    case 8:
      (r.style.color = "#684A23"), (r.style.background = "#F6D5AB");
      break;
    case 16:
      (r.style.color = "#684A23"), (r.style.background = "#F2C185");
      break;
    case 32:
      (r.style.color = "#684A23"), (r.style.background = "#EFB46D");
      break;
    case 64:
      (r.style.color = "#FFFFFF"), (r.style.background = "#EBA24A");
      break;
    case 128:
      (r.style.color = "#FFFFFF"), (r.style.background = "#E78F24");
      break;
    case 256:
      (r.style.color = "#FFFFFF"), (r.style.background = "#E87032");
      break;
    case 512:
      (r.style.color = "#FFFFFF"), (r.style.background = "#E85532");
      break;
    case 1024:
      (r.style.color = "#FFFFFF"), (r.style.background = "#E84532");
      break;
    case 2048:
      (r.style.color = "#FFFFFF"), (r.style.background = "#E83232");
      break;
    default:
      o > 2048
        ? ((r.style.color = "#FFFFFF"), (r.style.background = "#E51A1A"))
        : ((r.style.color = "#684A23"), (r.style.background = "#FBEDDC"));
  }
}
function moveDir(r) {
  switch (r) {
    case 0:
      move();
      break;
    case 1:
      rotate(2), move(), rotate(2);
      break;
    case 2:
      rotate(1), move(), rotate(3);
      break;
    case 3:
      rotate(3), move(), rotate(1);
  }
  update();
}
function rotate(r) {
  for (; r--; ) {
    for (
      var o = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        e = 0;
      e < 4;
      e++
    )
      for (var a = 0; a < 4; a++) o[e][a] = board[e][a];
    for (var e = 0; e < 4; e++)
      for (var a = 0; a < 4; a++) board[a][3 - e] = o[e][a];
  }
}
function move() {
  for (
    var r = !1,
      o = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      e = 1;
    e < 4;
    e++
  )
    for (var a = 0; a < 4; a++)
      if (0 != board[e][a]) {
        for (var $ = e - 1; $ > 0 && 0 == board[$][a]; ) $--;
        if (0 == board[$][a])
          (board[$][a] = board[e][a]), (board[e][a] = 0), (r = !0);
        else if (board[$][a] != board[e][a]) {
          if ($ + 1 == e) continue;
          (board[$ + 1][a] = board[e][a]), (board[e][a] = 0), (r = !0);
        } else
          0 == o[$][a]
            ? ((board[$][a] *= 2),
              (score += board[$][a]),
              (board[e][a] = 0),
              (o[$][a] = 1),
              (r = !0))
            : ((board[$ + 1][a] = board[e][a]), (board[e][a] = 0), (r = !0));
      }
  r ? generate() : checkGameOver();
}
function generate() {
  for (var r = 0, o = 0; o < 4; o++)
    for (var e = 0; e < 4; e++) 0 == board[o][e] && r++;
  for (;;)
    for (var o = 0; o < 4; o++)
      for (var e = 0; e < 4; e++)
        if (0 == board[o][e] && 0 == parseInt(Math.random() * r)) {
          board[o][e] = getNewNum();
          return;
        }
}
function getNewNum() {
  return 0 == parseInt(10 * Math.random()) ? 4 : 2;
}
function getMaxNum() {
  for (var r = 0, o = 0; o < 4; o++)
    for (var e = 0; e < 4; e++) board[o][e] > r && (r = board[o][e]);
  return r;
}
function checkGameOver() {
  for (var r = 0; r < 4; r++) {
    var o = board[r][0];
    if (0 == o) return;
    for (var e = 1; e < 4; e++) {
      if (board[r][e] == o || 0 == board[r][e]) return;
      o = board[r][e];
    }
  }
  for (var r = 0; r < 4; r++) {
    var a = board[0][r];
    if (0 == a) return;
    for (var e = 1; e < 4; e++) {
      if (board[e][r] == a || 0 == board[e][r]) return;
      a = board[e][r];
    }
  }
  gameover();
}
function gameover() {
  alert("[Game Over]\nMax: " + getMaxNum() + "\nScore" + score), init();
}
(document.onkeydown = keyDownEventHandler), init();
