import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const markCommit = (x, y) => {
  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();

  // Start and end dates
  const start = moment("2026-07-30");
  const end = moment("2026-08-03").endOf("day");

  // Random timestamp between the two dates
  const randomTime =
    start.valueOf() +
    Math.floor(Math.random() * (end.valueOf() - start.valueOf()));

  const date = moment(randomTime).format();

  const data = {
    date,
  };

  console.log(date);

  jsonfile.writeFile(path, data, () => {
    simpleGit()
      .add([path])
      .commit(date, { "--date": date }, makeCommits.bind(this, --n));
  });
};

makeCommits(100);

makeCommits(100);
