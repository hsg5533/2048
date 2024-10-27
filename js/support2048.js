function getPosTop(r, e) {
  return cellSpace + r * (cellSpace + cellSideLength);
}
function getPosLeft(r, e) {
  return cellSpace + e * (cellSpace + cellSideLength);
}
function getNumberBackgroundColor(r) {
  switch (r) {
    case 2:
      return "#eee4da";
    case 4:
      return "#ede0c8";
    case 8:
      return "#f2b179";
    case 16:
      return "#f59563";
    case 32:
      return "#f67c5f";
    case 64:
      return "#f65e3b";
    case 128:
      return "#edcf72";
    case 256:
      return "#edcc61";
    case 512:
      return "#9c0";
    case 1024:
      return "#33b5e5";
    case 2048:
      return "#09c";
    case 4096:
      return "#a6c";
    case 8192:
      return "#93c";
  }
  return "black";
}
function getNumberColor(r) {
  return r <= 4 ? "#776e65" : "white";
}
function nospace(r) {
  for (var e = 0; e < 4; e++)
    for (var n = 0; n < 4; n++) if (0 == r[e][n]) return !1;
  return !0;
}
function canMoveLeft(r) {
  for (var e = 0; e < 4; e++)
    for (var n = 1; n < 4; n++)
      if (0 != r[e][n] && (0 == r[e][n - 1] || r[e][n - 1] == r[e][n]))
        return !0;
  return !1;
}
function canMoveRight(r) {
  for (var e = 0; e < 4; e++)
    for (var n = 2; n >= 0; n--)
      if (0 != r[e][n] && (0 == r[e][n + 1] || r[e][n + 1] == r[e][n]))
        return !0;
  return !1;
}
function canMoveUp(r) {
  for (var e = 0; e < 4; e++)
    for (var n = 1; n < 4; n++)
      if (0 != r[n][e] && (0 == r[n - 1][e] || r[n - 1][e] == r[n][e]))
        return !0;
  return !1;
}
function canMoveDown(r) {
  for (var e = 0; e < 4; e++)
    for (var n = 2; n >= 0; n--)
      if (0 != r[n][e] && (0 == r[n + 1][e] || r[n + 1][e] == r[n][e]))
        return !0;
  return !1;
}
function noBlockHorizontal(r, e, n, t) {
  for (var o = e + 1; o < n; o++) if (0 != t[r][o]) return !1;
  return !0;
}
function noBlockVertical(r, e, n, t) {
  for (var o = e + 1; o < n; o++) if (0 != t[o][r]) return !1;
  return !0;
}
function nomove(r) {
  return !(canMoveLeft(r) || canMoveRight(r) || canMoveUp(r) || canMoveDown(r));
}
(gridContainerWidth = 0.92 * (documentWidth = window.screen.availWidth)),
  (cellSideLength = 0.18 * documentWidth),
  (cellSpace = 0.04 * documentWidth);
