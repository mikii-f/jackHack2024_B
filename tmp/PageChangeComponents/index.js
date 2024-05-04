function buttonClick(){

    // location.hrefにURLを代入することで画面遷移する
    location.href = "http://127.0.0.1:5500/tmp/PageChangeComponents/index1.html";
  }
  
  let button = document.getElementById('btn');
  button.onclick = buttonClick;