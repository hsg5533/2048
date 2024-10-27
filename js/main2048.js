var board = [],
  score = 0,
  hasConflicted = [],
  startx = 0,
  starty = 0,
  endx = 0,
  endy = 0;
function prepareForMobile() {
  documentWidth > 500 &&
    ((gridContainerWidth = 500), (cellSpace = 20), (cellSideLength = 100)),
    $("#grid-container").css("width", gridContainerWidth - 2 * cellSpace),
    $("#grid-container").css("height", gridContainerWidth - 2 * cellSpace),
    $("#grid-container").css("padding", cellSpace),
    $("#grid-container").css("border-radius", 0.02 * gridContainerWidth),
    $(".grid-cell").css("width", cellSideLength),
    $(".grid-cell").css("height", cellSideLength),
    $(".grid-cell").css("border-radius", 0.04 * cellSideLength),
    $(".number-cell").css("width", cellSideLength),
    $(".number-cell").css("height", cellSideLength),
    $(".number-cell").css("border-radius", 0.02 * cellSideLength);
}
function newgame() {
  init(), generateOneNumber(), generateOneNumber();
}
function init() {
  for (var r = 0; r < 4; r++)
    for (var e = 0; e < 4; e++) {
      var o = $("#grid-cell-" + r + "-" + e);
      o.css("top", getPosTop(r, e)), o.css("left", getPosLeft(r, e));
    }
  for (var r = 0; r < 4; r++) {
    (board[r] = []), (hasConflicted[r] = []);
    for (var e = 0; e < 4; e++) (board[r][e] = 0), (hasConflicted[r][e] = !1);
  }
  updateBoardView(), (score = 0);
}
function updateBoardView() {
  $(".number-cell").remove();
  for (var r = 0; r < 4; r++)
    for (var e = 0; e < 4; e++) {
      $("#grid-container").append(
        '<div class="number-cell" id="number-cell-' + r + "-" + e + '"></div>'
      );
      var o = $("#number-cell-" + r + "-" + e);
      0 == board[r][e]
        ? (o.css("width", "0px"),
          o.css("height", "0px"),
          o.css("top", getPosTop(r, e) + cellSideLength / 2),
          o.css("left", getPosLeft(r, e) + cellSideLength / 2))
        : (o.css("width", cellSideLength),
          o.css("height", cellSideLength),
          o.css("top", getPosTop(r, e)),
          o.css("left", getPosLeft(r, e)),
          o.css("background-color", getNumberBackgroundColor(board[r][e])),
          o.css("color", getNumberColor(board[r][e])),
          o.text(board[r][e])),
        (hasConflicted[r][e] = !1);
    }
  $(".number-cell").css("line-height", cellSideLength + "px"),
    $(".number-cell").css("font-size", 0.6 * cellSideLength + "px");
}
function generateOneNumber() {
  if (nospace(board)) return !1;
  for (
    var r = parseInt(Math.floor(4 * Math.random())),
      e = parseInt(Math.floor(4 * Math.random())),
      o = 0;
    o < 50 && 0 != board[r][e];

  )
    (r = parseInt(Math.floor(4 * Math.random()))),
      (e = parseInt(Math.floor(4 * Math.random()))),
      o++;
  if (50 == o)
    for (var a = 0; a < 4; a++)
      for (var n = 0; n < 4; n++) 0 == board[a][n] && ((r = a), (e = n));
  var d = 0.5 > Math.random() ? 2 : 4;
  return (board[r][e] = d), showNumberWithAnimation(r, e, d), !0;
}
function isgameover() {
  nospace(board) && nomove(board) && gameover();
}
function gameover() {
  alert("游戏结束！您的得分为：" + score);
}
function moveLeft() {
  if (!canMoveLeft(board)) return !1;
  for (var r = 0; r < 4; r++)
    for (var e = 1; e < 4; e++)
      if (0 != board[r][e])
        for (var o = 0; o < e; o++) {
          if (0 == board[r][o] && noBlockHorizontal(r, o, e, board)) {
            showMoveAnimation(r, e, r, o),
              (board[r][o] = board[r][e]),
              (board[r][e] = 0);
            continue;
          }
          if (
            board[r][o] == board[r][e] &&
            noBlockHorizontal(r, o, e, board) &&
            !hasConflicted[r][o]
          ) {
            showMoveAnimation(r, e, r, o),
              (board[r][o] += board[r][e]),
              (board[r][e] = 0),
              updateScore((score += board[r][o])),
              (hasConflicted[r][o] = !0);
            continue;
          }
        }
  return setTimeout("updateBoardView()", 200), !0;
}
function moveRight() {
  if (!canMoveRight(board)) return !1;
  for (var r = 0; r < 4; r++)
    for (var e = 2; e >= 0; e--)
      if (0 != board[r][e])
        for (var o = 3; o > e; o--) {
          if (0 == board[r][o] && noBlockHorizontal(r, e, o, board)) {
            showMoveAnimation(r, e, r, o),
              (board[r][o] = board[r][e]),
              (board[r][e] = 0);
            continue;
          }
          if (
            board[r][o] == board[r][e] &&
            noBlockHorizontal(r, e, o, board) &&
            !hasConflicted[r][o]
          ) {
            showMoveAnimation(r, e, r, o),
              (board[r][o] += board[r][e]),
              (board[r][e] = 0),
              updateScore((score += board[r][o])),
              (hasConflicted[r][o] = !0);
            continue;
          }
        }
  return setTimeout("updateBoardView()", 200), !0;
}
function moveUp() {
  if (!canMoveUp(board)) return !1;
  for (var r = 0; r < 4; r++)
    for (var e = 1; e < 4; e++)
      if (0 != board[e][r])
        for (var o = 0; o < e; o++) {
          if (0 == board[o][r] && noBlockVertical(r, o, e, board)) {
            showMoveAnimation(e, r, o, r),
              (board[o][r] = board[e][r]),
              (board[e][r] = 0);
            continue;
          }
          if (
            board[o][r] == board[e][r] &&
            noBlockVertical(r, o, e, board) &&
            !hasConflicted[o][r]
          ) {
            showMoveAnimation(e, r, o, r),
              (board[o][r] += board[e][r]),
              (board[e][r] = 0),
              updateScore((score += board[o][r])),
              (hasConflicted[o][r] = !0);
            continue;
          }
        }
  return setTimeout("updateBoardView()", 200), !0;
}
function moveDown() {
  if (!canMoveDown(board)) return !1;
  for (var r = 0; r < 4; r++)
    for (var e = 2; e >= 0; e--)
      if (0 != board[e][r])
        for (var o = 3; o > e; o--) {
          if (0 == board[o][r] && noBlockVertical(r, e, o, board)) {
            showMoveAnimation(e, r, o, r),
              (board[o][r] = board[e][r]),
              (board[e][r] = 0);
            continue;
          }
          if (
            board[o][r] == board[e][r] &&
            noBlockVertical(r, e, o, board) &&
            !hasConflicted[o][r]
          ) {
            showMoveAnimation(e, r, o, r),
              (board[o][r] += board[e][r]),
              (board[e][r] = 0),
              updateScore((score += board[o][r])),
              (hasConflicted[o][r] = !0);
            continue;
          }
        }
  return setTimeout("updateBoardView()", 200), !0;
}
$(document).ready(function () {
  prepareForMobile(),
    $("body").bind("touchmove", function (r) {
      r.preventDefault();
    }),
    newgame();
}),
  $(document).keydown(function (r) {
    switch ((r.preventDefault(), r.keyCode)) {
      case 37:
        moveLeft() &&
          (setTimeout("generateOneNumber()", 210),
          setTimeout("isgameover()", 300));
        break;
      case 38:
        moveUp() &&
          (setTimeout("generateOneNumber()", 210),
          setTimeout("isgameover()", 300));
        break;
      case 39:
        moveRight() &&
          (setTimeout("generateOneNumber()", 210),
          setTimeout("isgameover()", 300));
        break;
      case 40:
        moveDown() &&
          (setTimeout("generateOneNumber()", 210),
          setTimeout("isgameover()", 300));
    }
  }),
  document.addEventListener("touchstart", function (r) {
    (startx = r.touches[0].pageX), (starty = r.touches[0].pageY);
  }),
  document.addEventListener("touchend", function (r) {
    (endx = r.changedTouches[0].pageX), (endy = r.changedTouches[0].pageY);
    var e = endx - startx,
      o = endy - starty;
    !(Math.abs(e) < 0.3 * documentWidth && Math.abs(o) < 0.3 * documentWidth) &&
      (Math.abs(e) >= Math.abs(o)
        ? e > 0
          ? moveRight() &&
            (setTimeout("generateOneNumber()", 210),
            setTimeout("isgameover()", 300))
          : moveLeft() &&
            (setTimeout("generateOneNumber()", 210),
            setTimeout("isgameover()", 300))
        : o > 0
        ? moveDown() &&
          (setTimeout("generateOneNumber()", 210),
          setTimeout("isgameover()", 300))
        : moveUp() &&
          (setTimeout("generateOneNumber()", 210),
          setTimeout("isgameover()", 300)));
  });
