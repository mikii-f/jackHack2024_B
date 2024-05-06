// 例: headerファイルをimportするコード

fetch("./header.html")
    .then((response) => response.text())
    .then((data) => document.querySelector("#header").innerHTML = data);
 
const max_score = 39;


function WriteResult(resultTime) {
    let resultStr = "";
    if(resultTime >= 1 || resultTime <= -1) {
        resultStr = "<span class=\"result_time\">" + String(Math.floor(resultTime)) + "</span> 時間 <span class=\"result_time\">" + String(Math.round((resultTime%1) * 60)) + "</span> 分 "
    } else {
        resultStr = "<span class=\"result_time\">" + String(Math.round((resultTime%1) * 60)) + "</span> 分"
    }
    document.getElementById('result').innerHTML = `<p id=\"result_text\">あなたの体内終末まで ${resultStr}です。</p>`;
}

window.onload = function(){
    const url = new URL(window.location.href);
    const params = url.searchParams;
    Calc_Stop(params.get('result'));
}


//以下時計関係
const base = document.getElementById('base'); //背景
const short = document.getElementById('short'); // 短針
const long = document.getElementById('long'); // 長針

//アニメーション格納用
var short_move = short.animate(
  [
    { transform: `rotate(0deg)` },
    { transform: `rotate(0deg)` }
  ], 
  {
    duration: 1,
    iterations: Infinity,
  },
);
var long_move = long.animate(
  [
    { transform: `rotate(0deg)` },
    { transform: `rotate(0deg)` }
  ], 
  {
    duration: 1,
    iterations: Infinity,
  },
);

//針の位置をリセット
function Reset(){
  short_move = short.animate(
    [
      { transform: `rotate(0deg)` },
      { transform: `rotate(0deg)` }
    ], 
    {
      duration: 1,
      iterations: Infinity,
    },
  );
  long_move = long.animate(
    [
      { transform: `rotate(0deg)` },
      { transform: `rotate(0deg)` }
    ], 
    {
      duration: 1,
      iterations: Infinity,
    },
  );
}

//位置を保持してストップ
function Stop(){
  short_move.pause();
  long_move.pause();
}

//任意位置でストップ
function Stop_SelectPoint(short_angle, long_angle){
  short_move = short.animate(
    [
      { transform: `rotate(${short_angle}deg)` },
      { transform: `rotate(${short_angle}deg)` }
    ], 
    {
      duration: 1,
      iterations: Infinity,
    },
  );
  long_move = long.animate(
    [
      { transform: `rotate(${long_angle}deg)` },
      { transform: `rotate(${long_angle}deg)` }
    ], 
    {
      duration: 1,
      iterations: Infinity,
    },
  );
}

//低速回転
function LowSpeed(){
  short_move = short.animate(
    // アニメーションの初めと終わりを表す配列
    [
      { transform: `rotate(${getImageRotationAngle(short)}deg)` }, // 開始時の状態
      { transform: `rotate(${getImageRotationAngle(short)+360}deg)` } // 終了時の状態（1回転）
    ], 
    // タイミングに関する設定
    {
      duration: 60000, // 再生時間（60秒）
      iterations: Infinity,  // アニメーションの繰り返し回数（ずっと繰り返す）
    },
  );
  long_move = long.animate(
    // アニメーションの初めと終わりを表す配列
    [
      { transform: `rotate(${getImageRotationAngle(long)}deg)` }, // 開始時の状態
      { transform: `rotate(${getImageRotationAngle(long)+360}deg)` } // 終了時の状態（1回転）
    ], 
    // タイミングに関する設定
    {
      duration: 5000, // 再生時間（5秒）
      iterations: Infinity,  // アニメーションの繰り返し回数（ずっと繰り返す）
    },
  );
}

//高速回転
function HighSpeed(){
  short_move = short.animate(
    // アニメーションの初めと終わりを表す配列
    [
      { transform: `rotate(${getImageRotationAngle(short)}deg)` }, // 開始時の状態
      { transform: `rotate(${getImageRotationAngle(short)+360}deg)` } // 終了時の状態（1回転）
    ], 
    // タイミングに関する設定
    {
      duration: 6000, // 再生時間（6秒）
      iterations: Infinity,  // アニメーションの繰り返し回数（ずっと繰り返す）
    },
  );
  long_move = long.animate(
    // アニメーションの初めと終わりを表す配列
    [
      { transform: `rotate(${getImageRotationAngle(long)}deg)` }, // 開始時の状態
      { transform: `rotate(${getImageRotationAngle(long)+360}deg)` } // 終了時の状態（1回転）
    ], 
    // タイミングに関する設定
    {
      duration: 500, // 再生時間（0.5秒）
      iterations: Infinity,  // アニメーションの繰り返し回数（ずっと繰り返す）
    },
  );
}

// 画像の回転角度を取得する関数
function getImageRotationAngle(img) {
  // 画像のスタイルを取得
  const style = window.getComputedStyle(img);
  // transformプロパティを取得
  const transform = style.getPropertyValue('transform');
  // transformプロパティから回転角度を解析
  const values = transform.split('(')[1].split(')')[0].split(',');
  const a = values[0];
  const b = values[1];
  const angle = Math.round(Math.atan2(b, a) * (180/Math.PI) * 100) / 100;   //小数第2位まで求める
  // 角度を返す
  return angle;
}

//色を黒に変更
function Black(){
  base.src = 'clock_base2.jpg';
  short.src = 'clock_short2.jpg';
  long.src = 'clock_long2.jpg';
}

//色を白に変更
function White(){
  base.src = 'clock_base.jpg';
  short.src = 'clock_short.jpg';
  long.src = 'clock_long.jpg';
}

//計算中画面の削除&時計回転開始
function Result(){
  Reset();
  Calc_Stop();
  black_in_calc.style.display = 'none';
  virtual_popup.style.display = 'none';
  calc_text.style.display = 'none';
}


//点数に応じた場所に止まる処理
function Calc_Stop(score){
  const destination = Math.round(1300 * (score/max_score)) / 100; //最大で13.00時間進む
  const minute = destination % 1; //分の取得
  if (destination > 1){   //1時間以上進むなら高速から
    HighSpeed();
    const high = setInterval(function(){
      var temp = getImageRotationAngle(short);
      if (temp < 0) temp = 360 + temp;       //180~360度がマイナスで表されているため補正
      if (destination < 12){                 //12時間以内で止まるなら 
        if (temp >= (destination-0.5) * 30){ //0.5時間前で減速
          LowSpeed();
          clearInterval(high);
        }
      }
      else{                                  //12時間以上進むなら
        if (temp >= 11.5 * 30){              //11時半で減速
          LowSpeed();
          clearInterval(high);
        }
      }
    }, 10)  //チェックの間隔を任意に変更
  }
  else{
    LowSpeed();
  }
  const low = setInterval(function(){
    var temp = getImageRotationAngle(short);
    if (temp < 0) temp = 360 + temp;          //180~360度がマイナスで表されているため補正
    if (destination < 12){                    //12時間以内で止まるなら
      if (temp >= destination * 30){        //ぴったりで止まる
        Stop_SelectPoint(destination * 30, minute * 360); //ぴったりの位置に止める
        clearInterval(low);
        WriteResult(destination);
      }
    }
    else{                             //マイナスに突入するなら
      if (temp >= 359.5
      ){               //一旦12時で止まる(精度を上げようとしすぎるとバグの元)
        Stop_SelectPoint(0, 0);
        clearInterval(low);
        setTimeout(function(){        //1秒後に動き出す
          LowSpeed();
          const low2 = setInterval(function(){
            if (getImageRotationAngle(short) > (destination * 30) % 360){
              Stop_SelectPoint((destination * 30) % 360, minute * 360);
              clearInterval(low2);
              WriteResult(12 - destination);
            }
          }, 5);  //チェックの間隔を任意に変更
        },1000);
      }
    }
  }, 5)  //チェックの間隔を任意に変更
}



// When the browser is ready...
$(function() {
    // validate
    $("#contact").validate({
        // Set the validation rules
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            },
            message: "required",
        },
        // Specify the validation error messages
        messages: {
            name: "Please enter your name",
            email: "Please enter a valid email address",
            message: "Please enter a message",
        },
        // submit handler
        submitHandler: function(form) {
          //form.submit();
           $(".message").show();
           $(".message").fadeOut(4500);
        }
    });
});
