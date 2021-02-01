export const arrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length == b.length &&
    a.every((val, index) => val == b[index])
  );
};

export const verifyWinner = (tabuleiro) => {
  //verifying rows
  for (let row of tabuleiro) {
    if (row.every((val) => val == "x")) {
      return "x";
    } else if (row.every((val) => val == "o")) {
      return "o";
    }
  }

  //verifying column
  if (tabuleiro.every((val, index) => val[index] == "x")) {
    return "x";
  }

  //verifying column
  else if (tabuleiro.every((val, index) => val[index] == "o")) {
    return "o";
  }

  //verifying diagonal
  else if (
    tabuleiro.every((val, index) => val[val.length - (index + 1)] == "o")
  ) {
    return "o";
  }

  //verifying diagonal
  else if (
    tabuleiro.every((val, index) => val[val.length - (index + 1)] == "x")
  ) {
    return "x";
  }

  return false;
};
