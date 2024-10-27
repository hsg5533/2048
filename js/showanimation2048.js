function showNumberWithAnimation(t, o, e) {
  var n = $("#number-cell-" + t + "-" + o);
  n.css("background-color", getNumberBackgroundColor(e)),
    n.css("color", getNumberColor(e)),
    n.text(e),
    n.animate(
      {
        width: cellSideLength,
        height: cellSideLength,
        top: getPosTop(t, o),
        left: getPosLeft(t, o),
      },
      200
    );
}
function showMoveAnimation(t, o, e, n) {
  $("#number-cell-" + t + "-" + o).animate(
    { top: getPosTop(e, n), left: getPosLeft(e, n) },
    200
  );
}
function updateScore(t) {
  $("#score").text(t);
}
