const base = document.getElementById('base'); //背景
const short = document.getElementById('short'); // 短針
const long = document.getElementById('long'); // 長針
const black_in_calc = document.getElementsByClassName('black_in_calc')[0]; //背景を暗くするやつ
const virtual_popup = document.getElementsByClassName('virtual_popup')[0];
const calc_text = document.getElementById('calc_text');
const prog_bar = document.getElementsByClassName('prog-bar')[0];
const bar = document.getElementsByClassName('bar')[0];



//針の位置をリセット
function Reset(){
  const options = {
    duration: 10,
    iterations: Infinity,
  }
  const keyframes = [
    {transform: 'rotate(0deg)'},
    {transform: 'rotate(0deg)'}
  ]
  short.animate(keyframes, options);
  long.animate(keyframes, options);
}

//位置を保持してストップ
function Stop(){
  const rotate_short = getImageRotationAngle(short);
  const rotate_long = getImageRotationAngle(long);
  const options = {
    duration: 10,
    iterations: Infinity,
  }
  const keyframes1 = [
    {transform: `rotate(${rotate_short}deg)`},
    {transform: `rotate(${rotate_short}deg)`}
  ]
  const keyframes2 = [
    {transform: `rotate(${rotate_long}deg)`},
    {transform: `rotate(${rotate_long}deg)`}
  ]
  short.animate(keyframes1, options);
  long.animate(keyframes2, options);
}

//低速回転
function LowSpeed(){
  const rotate_short = getImageRotationAngle(short);
  const rotate_long = getImageRotationAngle(long);
  // 画像を時計回りに1回転させる
  short.animate(
    // アニメーションの初めと終わりを表す配列
    [
      { transform: `rotate(${rotate_short}deg)` }, // 開始時の状態
      { transform: `rotate(${rotate_short+360}deg)` } // 終了時の状態（1回転）
    ], 
    // タイミングに関する設定
    {
      duration: 60000, // 再生時間（60秒）
      iterations: Infinity,  // アニメーションの繰り返し回数（ずっと繰り返す）
    },
  );

  // 画像を時計回りに1回転させる
  long.animate(
    // アニメーションの初めと終わりを表す配列
    [
      { transform: `rotate(${rotate_long}deg)` }, // 開始時の状態
      { transform: `rotate(${rotate_long+360}deg)` } // 終了時の状態（1回転）
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
  const rotate_short = getImageRotationAngle(short);
  const rotate_long = getImageRotationAngle(long);
  // 画像を時計回りに1回転させる
  short.animate(
    // アニメーションの初めと終わりを表す配列
    [
      { transform: `rotate(${rotate_short}deg)` }, // 開始時の状態
      { transform: `rotate(${rotate_short+360}deg)` } // 終了時の状態（1回転）
    ], 
    // タイミングに関する設定
    {
      duration: 6000, // 再生時間（6秒）
      iterations: Infinity,  // アニメーションの繰り返し回数（ずっと繰り返す）
    },
  );

  // 画像を時計回りに1回転させる
  long.animate(
    // アニメーションの初めと終わりを表す配列
    [
      { transform: `rotate(${rotate_long}deg)` }, // 開始時の状態
      { transform: `rotate(${rotate_long+360}deg)` } // 終了時の状態（1回転）
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

//計算中の見た目
function Calculation(){
  black_in_calc.style.display = 'block';
  virtual_popup.style.display = 'block';
  calc_text.style.display = 'block';
  setTimeout(Result, 3000); //CSSのアニメーションに合わせる
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
function Calc_Stop(){
  const max_score = 30;
  const score = 30;
  const destination = Math.round(1300 * (score/max_score)) / 100; //最大で13.00時間進む
  const minute = destination - Math.round(13 * (score/max_score)); //分の取得
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
        Stop();
        clearInterval(low);
        if (score >= 25){
          document.body.style.background = '#1e1e1e';   //ここで背景などをヤバい方に切り替える処理
        }
      }
    }
    else{                             //マイナスに突入するなら
      if (temp >= 359.5
      ){               //一旦12時で止まる(精度を上げようとしすぎるとバグの元)
        Stop();
        clearInterval(low);
        setTimeout(function(){        //1秒後に動き出す
          LowSpeed();
          const low2 = setInterval(function(){
            if (getImageRotationAngle(short) > (destination * 30) % 360){
              Stop();
              clearInterval(low2);
              document.body.style.background = '#1e1e1e';   //ここで背景などをヤバい方に切り替える処理
            }
          }, 5);  //チェックの間隔を任意に変更
        },1000);
      }
    }
  }, 5)  //チェックの間隔を任意に変更
}