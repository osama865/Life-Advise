const fs = require("fs");
const path = "/home/osama/Desktop/Meteors/Life/imports/api/all.json";
const encode = "utf-8";

const readFile = () => {
  const data = fs.readFileSync(path, encode);
  return data;
};

function shuffle(arr) {
  const shuffled = arr.sort(() => Math.random() - 0.5).reverse();
  return shuffled;
}

const writeFile = () => {
  const jsonData = readFile();
  const shuffledData = shuffle(JSON.parse(jsonData));
  fs.writeFileSync(
    "/home/osama/Desktop/Meteors/Life/imports/api/all2.json",
    JSON.stringify(shuffledData)
  );
};

writeFile();
