// 例: headerファイルをimportするコード

fetch("./components/header.html")
    .then((response) => response.text())
    .then((data) => document.querySelector("#header").innerHTML = data);

fetch("./components/inputmodal.html")
    .then((response) => response.text())
    .then((data) => document.querySelector("#inputmodal").innerHTML = data);


const buttonOpen = document.getElementById('modalOpen');
const modal = document.getElementById('easyModal');
const buttonClose = document.getElementsByClassName('modalClose')[0];
const sendResult = document.getElementById('sendResult');

// 結果を見る、が押されたとき
function calculate() {
    const urlSearchParams = new URLSearchParams(location.search);

    const sleeptime = document.getElementById("sleeptime").value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const drink = document.getElementById("drink").value;
    const smoke = document.getElementById("smoke").value;
    const self_evaluation = document.getElementById("self-evaluation").value;
    
    console.log(sleeptime)
    const result = 100; //TODO: 本来であれば、上記の値を参照して計算を行う。それはお任せします。
    urlSearchParams.set("result", result);
    history.replaceState("", "", `?${urlSearchParams.toString()}`)
}
sendResult.addEventListener('click', calculate);

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

