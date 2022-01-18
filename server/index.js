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


/**
|--------------------------------------------------
|  const path = "/home/osama/Desktop/Meteors/Life/imports/api/all2.json";
  const encode = "utf-8";

  const readFile = () => {
    const data = fs.readFileSync(path, encode);
    return data;
  };

  const fetchedData = JSON.parse(readFile());

  //console.log(fetchedData);
  fetchedData.forEach((element) => {
    Meteor.call("insertAdvise", element);
  });
const path = "/home/osama/Desktop/Meteors/Life/imports/api/all2.json";
const encode = "utf-8";

const readFile = () => {
  const data = fs.readFileSync(path, encode);
  return data;
};



const toAdvise = (arr) => {
  let advises = []
  let c = 0
  arr.forEach((element) => {
    const { text, author, language } = element;
    const ad = {
      text,
      author,
      date: new Date(),
      index: c,
      language,
    };
    advises.push(ad)
    Meteor.call("insertAdvise" , ad)
    c = c + 1
  });
  return advises
};

fs.writeFileSync(
    "/home/osama/Desktop/Meteors/Life/imports/api/test3.json",
    JSON.stringify(toAdvise(fetchedData))
);


console.log('successed');
|--------------------------------------------------
*/
