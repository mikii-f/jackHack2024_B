// 例: headerファイルをimportするコード

fetch("../header.html")
    .then((response) => response.text())
    .then((data) => document.querySelector("#header").innerHTML = data);
 

// リザルトの表示 1300 * (score/maxscore) / 100
function WriteResult(time) {
    const resultTime = 24 - time * 3;
    let resultStr = "";
    if(resultTime >= 1 || resultTime <= -1) {
        resultStr = "<span class=\"result_time\">" + toString(Math.floor(resultTime)) + "</span> 時間 <span class=\"result_time\">" + toString(Math.floor((resultTime%1) * 60)) + "<span> 分 "
    } else {
        resultStr = "<span class=\"result_time\">" + toString(Math.floor((resultTime%1) * 60)) + "</span> 分"
    }
    console.log(resultStr);
    document.getElementById('result').innerHTML = `<p id=\"result_text\">あなたの終末時間は ${resultTime}です。</p>`;
}

window.onload = function(){
    const url = new URL(window.location.href);
    const params = url.searchParams;
    WriteResult(params.get('result'));
}


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
