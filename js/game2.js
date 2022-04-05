const gameState = {
  eat : 0,
  bite: 0,
  count : 0,
  resetState : function(){
    this.eat = 0;
    this.bite = 0;
  }
};

const arrays = {
  ansArray : [],
  resArray : [],
  //resArrayのリセット
  resetResArray : function(){
    this.resArray = [];
  },
  // resArrayを受け取り，形式をチェック
  getResArray : function(){
    const res = document.getElementById("res").value;
    if(isNaN(res)){
      return alert("数値を入力してください");
    }
    this.resetResArray();
    for (let index = 0; index < res.length; index++) {
      this.resArray.push(res[index]);
    }
    if(this.resArray.length > 4 || this.resArray.length <= 3){
      return alert("４桁の数字を入力してください");
    }
  },
  // ansArrayとresArrayを比較してeatとbiteを求める 
  compareArrays : function(){
    for (let i = 0; i < this.ansArray.length; i++) {
      if(this.ansArray[i] == this.resArray[i]){
        gameState.eat++;
        continue;
      }else{
        for (let j = 0; j < this.ansArray.length; j++) {
          if(this.resArray[i] == this.ansArray[j] && i != j){
            gameState.bite++;
            break;
          }
        }
      }
    }
  },
};

// 値の範囲がminNunからmaxNumで長さがgenerateLengthの重複しない配列を返す
function generateRandomArray(minNum, maxNum, generateLength){
  let numArray = [];
  let randomArray = [];
  let generatedRandomArray = [];
  for (let index = minNum; index <= maxNum; index++) {
    numArray.push(index);
  }
  for (let j = 0, len = numArray.length; j < numArray.length; j++,len--) {
    let randomNumber = Math.floor(Math.random()*len);
    randomArray.push(numArray[randomNumber]);
    numArray[randomNumber] = numArray[len-1];
  }
  for (let i = 0; i < generateLength; i++) {
    generatedRandomArray.push(randomArray[i]);
    console.log(randomArray[i]);
  }
  return generatedRandomArray;
};

// 表に記述
function tableWrite(){
  let table = document.getElementById('table');
  let newRow = table.insertRow();

  let newCell = newRow.insertCell();
  let newText = document.createTextNode(gameState.count);
  newCell.appendChild(newText);

  newCell = newRow.insertCell();
  newText = document.createTextNode(document.getElementById('res').value);
  newCell.appendChild(newText);

  newCell = newRow.insertCell();
  newText = document.createTextNode("EAT"+gameState.eat+"/BITE"+gameState.bite);
  newCell.appendChild(newText);
}

// ジャッジシステム
function numeron(){
  gameState.resetState();
  gameState.count++;
  if (gameState.count === 1){
    // 正解値を作成
    console.log("answer");
    arrays.ansArray = generateRandomArray(1,9,4);
  }
  arrays.getResArray();
  arrays.compareArrays();
  tableWrite();
  if(gameState.eat == 4){
    alert("Congratulations!!");
  }
}

//イベント
const button = document.getElementById("send");
button.addEventListener("click", numeron);
