const FB = require("fb");
const fs = require("fs");
const { createCanvas, loadImage, registerFont, Image } = require("canvas");
registerFont("./facebook/NotoSansThai.ttf", { family: "Noto Sans Thai" });
registerFont("./facebook/Kanit-Bold.ttf", { family: "Kanit-Bold" });
registerFont("./facebook/Kanit-Regular.ttf", { family: "Kanit-Regular" });
const firebase = require("firebase-admin");
const serviceAccount = require("./facebook/serviceaccount.json");
const { async } = require("@firebase/util");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL:
    "https://bet-balls-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = firebase.database();

const current = new Date();
const year = current.getFullYear();
const month = `${current.getMonth() + 1}`.padStart(2, "0");
const day = `${current.getDate()}`.padStart(2, "0");
const stringDate = [year, month, day].join("/");

const monthNamesThai = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤษจิกายน",
  "ธันวาคม",
];
const dayNames = [
  "วันอาทิตย์ ที่",
  "วันจันทร์ ที่",
  "วันอังคาร ที่",
  "วันพุทธ ที่",
  "วันพฤหัสบดี ที่",
  "วันศุกร์ ที่",
  "วันเสาร์ ที่",
];

const dxTh =
  dayNames[current.getDay()] +
  "  " +
  current.getDate() +
  "" +
  monthNamesThai[current.getMonth()] +
  "  " +
  current.getFullYear();

Array.prototype.randomEMX = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const imgRx = [
  "./img/กล่องแพคเกจ-เขียว-300x202.png",
  "./img/กล่องแพคเกจ-แดง-300x202.png",
  "./img/กล่องแพคเกจ-เหลือง-300x202.png",
];

FB.setAccessToken(
  ""
);

const reflotto = db.ref("/nakalottolatest");
const reflottoX3 = db.ref("/lottoX3");
const reflottoX1 = db.ref("/lottoX");
reflotto.on("child_changed",(snapshot) => {
    if (
      snapshot.val()["THREE_UP"] !== "-" &&
      snapshot.val()["THREE_UP"] !== "undefined"
    ) {
      ggximg(snapshot.val());
    }
  },
  (errorObject) => {
    console.log("The read failed: " + errorObject.name);
  }
);


reflottoX1.on("child_changed", async (snapshot) => {
  const lottoRex = await reflottoX3.once(
    "value",
    async (snapshotX3) => {
      return snapshotX3.val();
    },
    (errorObject) => {
      console.log("The read failed: " + errorObject.name);
    }
  );
  const lottoRex3 = lottoRex.val().map((numLotto) => {
    return {
      id_lotto: numLotto.id,
      name_lotto: numLotto.name,
      reward_lotto: numLotto.reward,
      amount_lotto: numLotto.amount,
      number1_lotto: numLotto.number[0],
      number2_lotto: numLotto.number?.[1],
    };
  });
  ggx1img(lottoRex3, snapshot.val());
});

async function ggx1img(Rex3, dataLotto) {
  console.log(Rex3, dataLotto)
  const width = 1200;
  const height = 1200;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  loadImage("./img/lotto.png").then((data) => {
    context.drawImage(data, 0, 0, width, height);
    context.font = "bold 45pt Kanit-Bold";
    context.textBaseline = "top";
    context.textAlign = "center";

    context.fillStyle = "#000C54";
    context.font = "30pt Kanit-Regular";
    context.fillText("งวดประจำวันที่ " + dxTh, 600, 250);
    context.strokeStyle = "#ffffff";
    context.strokeText("งวดประจำวันที่ " + dxTh, 600, 250);

    context.fillStyle = "#FFFFFF";
    context.font = "bold 10rem Kanit-Bold";
    context.fillText("" + dataLotto["number"], 600, 390);

    context.font = "bold 10.2rem Kanit-Bold";
    context.strokeText("" + dataLotto["number"], 600, 390);
    context.fillStyle = "#000954";

/////////////////////////////////////////////////////////////////////////////////
    context.fillStyle = "#FFFFFF";
    context.font = "bold 4.2rem Kanit-Bold";
    context.fillText(""+Rex3[0]['number1_lotto'], 250, 740);

    context.font = "bold 4.3rem Kanit-Bold";
    context.strokeText(""+Rex3[0]['number1_lotto'], 250, 740);
    context.strokeStyle = "#000954";

    context.fillStyle = "#FFFFFF";
    context.font = "bold 4.2rem Kanit-Bold";
    context.fillText(""+Rex3[0]['number2_lotto'], 531, 740);

    context.font = "bold 4.3rem Kanit-Bold";
    context.strokeText(""+Rex3[0]['number2_lotto'], 531, 740);
    context.strokeStyle = "#000954";
/////////////////////////////////////////////////////////////////////////////////
    context.fillStyle = "#FFFFFF";
    context.font = "bold 4.2rem Kanit-Bold";
    context.fillText(""+Rex3[1]['number1_lotto'], 250, 935);

    context.font = "bold 4.3rem Kanit-Bold";
    context.strokeText(""+Rex3[1]['number1_lotto'], 250, 935);
    context.strokeStyle = "#000954";

    context.fillStyle = "#FFFFFF";
    context.font = "bold 4.2rem Kanit-Bold";
    context.fillText(""+Rex3[1]['number2_lotto'], 531, 935);

    context.font = "bold 4.3rem Kanit-Bold";
    context.strokeText(""+Rex3[1]['number2_lotto'], 531, 935);
    context.strokeStyle = "#000954";
/////////////////////////////////////////////////////////////////////////////////
    context.fillStyle = "#FFFFFF";
    context.font = "bold 15rem Kanit-Bold";
    context.fillText(""+Rex3[2]['number1_lotto'], 890, 650);

    context.font = "bold 15.3rem Kanit-Bold";
    context.strokeText(""+Rex3[2]['number1_lotto'], 890, 650);
    context.strokeStyle = "#000954";
/////////////////////////////////////////////////////////////////////////////////

    context.fillStyle = "#ffc15e";
    context.font = "1rem Kanit-Bold";
    context.fillText(
      "สร้างอัตโนมัติและโพสต์อัตโนมัติ facebook | line oa | selfbot ติดต่อสอบถามได้ที่ข้อความ",
      600,
      1150
    );

    loadImage("./img/logo.png").then((dataX) => {
      context.drawImage(dataX, 1000, 20, 100, 100);
      const imgBuffer = canvas.toBuffer("image/png");
      fs.writeFileSync("./drawn3Image.png", imgBuffer);
        const messageXS =
          "#ประกาศผลหวย รัฐบาล ประจำวันที่ "+ dxTh +
          "\n #รางวัลที่1 " + dataLotto["number"] +
          "\n #เลขหน้า3ตัว " + Rex3[0]['number1_lotto'] +" "+Rex3[0]['number2_lotto'] +
          "\n #เลขท้าย3ตัว " + Rex3[1]['number1_lotto'] +" "+Rex3[1]['number2_lotto'] +
          "\n #2ตัวล่าง " + Rex3[2]['number1_lotto'] +
          "\n #หวยหุ้น #ผลหวย #หวยวันนี้ #ผลหวยหุ้น";
        FB.api(
          "me/photos",
          "post",
          { source: fs.createReadStream("drawn3Image.png"), caption: messageXS },
          function (res) {
            if (!res || res.error) {
              if (!res || res.error) {
                console.log(!res ? "error occurred" : res.error);
                return;
              }
              console.log("Post Id: " + res.post_id);
            }
          }
        );
    });
  });
}

async function ggximg(dataLotto) {
  const width = 1000;
  const height = 1000;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  loadImage("./img/block-gold.png").then((data) => {
    context.drawImage(data, 0, 0, width, height);
    context.font = "bold 45pt Kanit-Bold";
    context.textBaseline = "top";
    context.textAlign = "center";
    const imgText = "" + dataLotto["title_th"];
    context.fillStyle = "#2e2e2e";
    context.fillText(imgText, 555, 65);
    context.fillStyle = "#2e2e2e";
    context.font = "22pt Kanit-Regular";
    context.fillText("" + dxTh, 700, 130);

    context.fillStyle = "#2e2e2e";
    context.font = "bold 20rem Kanit-Bold";
    context.fillText("" + dataLotto["THREE_UP"], 500, 150);

    context.fillStyle = "#706c6c";
    context.font = "bold 4rem Kanit-Bold";
    context.fillText("3ตัวบน", 700, 210);

    context.fillStyle = "#706c6c";
    context.font = "bold 3rem Kanit-Bold";
    context.fillText("2ตัวบน", 230, 610);

    context.fillStyle = "#706c6c";
    context.font = "bold 3rem Kanit-Bold";
    context.fillText("2ตัวล่าง", 750, 610);

    context.fillStyle = "#ff7308";
    context.font = "bold 10rem Kanit-Bold";
    context.fillText("" + dataLotto["TWO_DOWN"], 250, 650);

    context.fillStyle = "#ff7308";
    context.font = "bold 10rem Kanit-Bold";
    context.fillText("" + dataLotto["TWO_UP"], 750, 650);

    context.fillStyle = "#ffc15e";
    context.font = "1rem Kanit-Bold";
    context.fillText(
      "สร้างอัตโนมัติและโพสต์อัตโนมัติ facebook | line oa | selfbot ติดต่อสอบถามได้ที่ข้อความ",
      500,
      900
    );

    loadImage("" + dataLotto["img_fg"]).then((dataX) => {
      context.drawImage(dataX, 40, 40, 150, 150);
      const imgBuffer = canvas.toBuffer("image/png");
      fs.writeFileSync("./drawnImage.png", imgBuffer);
        const messageXS =
          "#ประกาศผลหวย " + dataLotto["title_th"] +  " วันที่ " + dxTh +
          "\n #3ตัวบน " +
          dataLotto["THREE_UP"] +
          "\n #2ตัวบน " +
          dataLotto["TWO_UP"] +
          "\n #2ตัวล่าง " +
          dataLotto["TWO_DOWN"] +
          "\n #หวยหุ้น #ผลหวย #หวยวันนี้ #ผลหวยหุ้น";
        FB.api(
          "me/photos",
          "post",
          { source: fs.createReadStream("drawnImage.png"), caption: messageXS },
          function (res) {
            if (!res || res.error) {
              if (!res || res.error) {
                console.log(!res ? "error occurred" : res.error);
                return;
              }
              console.log("Post Id: " + res.post_id);
            }
          }
        );
    });
  });
}
