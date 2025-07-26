const board = document.querySelector(".board");
let turn = "✖";
let total_turn = 0;

let winner = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board_array = new Array(9).fill("E");

function checkWinner() {
  for (let [index0, index1, index2] of winner) {
    if (
      board_array[index0] != "E" &&
      board_array[index0] === board_array[index1] &&
      board_array[index1] === board_array[index2]
    )
      return 1;
  }
  return 0;
}

const printer = (event) => {
  const element = event.target;

  if (element.innerHTML !== "") return; // ✅ prevent overwriting

  if (turn === "〇") {
    element.innerHTML = "〇";
    board_array[+element.id] = "〇";
    if (checkWinner()) {
      document.getElementById("winningMessage").innerHTML = "Winner is 〇";
      board.removeEventListener("click", printer);
      return;
    }
    turn = "✖";
  } else {
    element.innerHTML = "✖";
    board_array[+element.id] = "✖";
    if (checkWinner()) {
      document.getElementById("winningMessage").innerHTML = "Winner is ✖";
      board.removeEventListener("click", printer);
      return;
    }
    turn = "〇";
  }

  total_turn++; // ✅ count both player turns

  if (total_turn === 9) {
    document.getElementById("winningMessage").innerHTML = "Match is Drawn";
    document.getElementById("winningMessage").style.marginLeft ='100px';
    
    board.removeEventListener("click", printer); // ✅ stop game after draw
  }
};

board.addEventListener("click", printer);

const Restart = document.getElementById("restartButton");
Restart.addEventListener("click", () => {
  const cell = document.getElementsByClassName("cell");

  Array.from(cell).forEach((value) => {
    value.innerHTML = "";
  });

  turn = "〇";
  total_turn = 0;
  board_array = new Array(9).fill("E");
  document.getElementById("winningMessage").innerHTML = "";
  board.addEventListener("click", printer);
});
