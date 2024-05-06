// 例: headerファイルをimportするコード

fetch("../header.html")
    .then((response) => response.text())
    .then((data) => document.querySelector("#header").innerHTML = data);
 

//以下時計関係

const base = document.getElementById('base'); //背景
const short = document.getElementById('short'); // 短針
const long = document.getElementById('long'); // 長針

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
        duration: 24000, // 再生時間（24秒）
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
        duration: 2000, // 再生時間（2秒）
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
        duration: 3600, // 再生時間（6秒）
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
        duration: 300, // 再生時間（0.5秒）
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
    const angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    // 角度を返す
    return angle;
}

//色を黒に変更
function Black(){
    base.src = './img/clock_base_b.jpg';
    short.src = './img/clock_short_b.jpg';
    long.src = './img/clock_long_b.jpg';
}

//色を白に変更
function White(){
    base.src = './img/clock_base.jpg';
    short.src = './img/clock_short.jpg';
    long.src = './img/clock_long.jpg';
}


function calculateTime(time){
    // const slow_time = (2880 - time*120)/1880
    const fast_time_h = (20/17)*time - (100/34)
    const fast_time = fast_time_h * 300
    return fast_time
}

function rotateTimer(){
    const hours = 12; //TODO: 本来はクエリパラメータから取得する
    const fast_time = calculateTime(hours);
    console.log(fast_time)
    HighSpeed();
    setTimeout(() => {
    LowSpeed()
    }, fast_time);
    setTimeout(() => {
    Stop()
    }, 5000);
}



// 以下モーダル関係

//fetch("./components/inputmodal.html")
  //  .then((response) => response.text())
    //.then((data) => document.querySelector("#inputmodal").innerHTML = data);


const buttonOpen = document.getElementById('modalOpen');
const modal = document.getElementById('easyModal');
const buttonClose = document.getElementsByClassName('modalClose')[0];
const sendResult = document.getElementById('sendResult');

function calculate() {
    const urlSearchParams = new URLSearchParams(location.search);

    const sleeptime = document.getElementById("sleeptime").value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const drink = document.getElementById("drink").value;
    const smoke = document.getElementById("smoke").value;
    const self_evaluation = document.getElementById("self-evaluation").value;
    const BMI_value = BMI(height, weight);

    console.log(Number(sleeptime), Number(drink), Number(smoke), Number(self_evaluation), Number(BMI_value));
    console.log(Number(weight), Number(height));

    const result = Number(sleeptime) + Number(drink) + Number(smoke) + Number(self_evaluation) + Number(BMI_value);
    console.log(result);
    urlSearchParams.set("result", result);
    history.replaceState("", "", `?${urlSearchParams.toString()}`)
    //計算中画面表示用
    const black_in_calc = document.getElementsByClassName('black_in_calc')[0]; //背景を暗くするやつ
    const virtual_popup = document.getElementsByClassName('virtual_popup')[0]; //文字とバーを表示する部分
    const calc_text = document.getElementById('calc_text'); //計算中テキスト
    black_in_calc.style.display = 'block';
    virtual_popup.style.display = 'block';
    calc_text.style.display = 'block';
    setTimeout(function(){
        if (result < 18) {
            window.location.href = './title.html';
        } else {
            window.location.href = './title_yabai.html';
        }
    }, 3000); //CSSのアニメーション時間に合わせる
}
sendResult.addEventListener('click', calculate);

// BMIを計算する関数
function BMI(height, weight) {
    const bmi = weight / (height * height);
    const roundedBMI = Math.round(bmi); // BMIを整数に丸める
    console.log(roundedBMI);
    switch(true) { // 条件部分を修正し、真偽値で比較する
        case roundedBMI < 18.5:
            return 3;
        case (18.5 <= roundedBMI && roundedBMI < 25):
            return 0;
        case (25 <= roundedBMI && roundedBMI < 30):
            return 3;
        case (30 <= roundedBMI && roundedBMI < 35):
            return 4;
        case (35 <= roundedBMI && roundedBMI < 40):
            return 5;
        case (40 <= roundedBMI):
            return 6;
    }
}


// ボタンがクリックされた時
buttonOpen.addEventListener('click', modalOpen);
function modalOpen() {
    modal.style.display = 'block';
}

// バツ印がクリックされた時
buttonClose.addEventListener('click', modalClose);
function modalClose() {
    modal.style.display = 'none';
}

// モーダルコンテンツ以外がクリックされた時
addEventListener('click', outsideClose);
function outsideClose(e) {
    if (e.target == modal) {
    modal.style.display = 'none';
    }
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
