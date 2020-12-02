const fs = require("fs");
const path = require("path");

const list1 = require("./data/1.json");
const list2 = require("./data/2.json");
const list_ignore = require("./data/ignore.json");
const list_add = require("./data/add.json");

const list = [];

[...list_add, ...list1, ...list2].forEach((word) => {
  if (list.indexOf(word) === -1 && list_ignore.indexOf(word) === -1) {
    list.push(word);
  }
});

console.log(list.length);

const wordHtml = list.sort().map((word) => {
  return `<p>${word}</p>`;
});

const result = `
<!DOCTYPE html>
<html>
  <head>
    <title>计算机英语词汇</title>
  </head>
  <body>
  ${wordHtml.join("\n")}
  </body>
</html>
`;

fs.writeFile(
  path.resolve(__dirname, "./output/result.html"),
  result,
  { encoding: "utf-8" },
  (err) => {
    if (!err) {
      console.log("完成");
    }
  }
);

function getSectionMd(section) {
  const str = `## ${section.firstletter.toUpperCase()}(${
    section.wordList.length
  })\n`;

  const wordList = section.wordList;

  let tableStr = `
  | 1 | 2 | 3 | 4 | 5 | 6 |
  | ---- | ---- | ---- | ---- | ---- | ---- |
  `;
  for (let i = 0; i < wordList.length; i++) {
    if (i % 6 === 0) {
      tableStr += "|";
    }
    tableStr += `${wordList[i]}|`;
    if (i % 6 === 5) {
      tableStr += "\n";
    }
  }

  return str + tableStr;
}

const sectionList = [
  { firstletter: "a" },
  { firstletter: "b" },
  { firstletter: "c" },
  { firstletter: "d" },
  { firstletter: "e" },
  { firstletter: "f" },
  { firstletter: "g" },
  { firstletter: "h" },
  { firstletter: "i" },
  { firstletter: "j" },
  { firstletter: "k" },
  { firstletter: "l" },
  { firstletter: "m" },
  { firstletter: "n" },
  { firstletter: "o" },
  { firstletter: "p" },
  { firstletter: "q" },
  { firstletter: "r" },
  { firstletter: "s" },
  { firstletter: "t" },
  { firstletter: "u" },
  { firstletter: "v" },
  { firstletter: "w" },
  { firstletter: "x" },
  { firstletter: "y" },
  { firstletter: "z" },
]
  .map((section) => {
    return {
      ...section,
      wordList: list.filter(
        (w) => w.charCodeAt(0) === section.firstletter.charCodeAt(0)
      ),
    };
  })
  .map((section) => {
    return getSectionMd(section);
  });

const md = `
# 计算机英语词汇
${sectionList.join("\n")}
`;

fs.writeFile(
  path.resolve(__dirname, "./output/result.md"),
  md,
  { encoding: "utf-8" },
  (err) => {
    if (!err) {
      console.log("完成");
    }
  }
);
