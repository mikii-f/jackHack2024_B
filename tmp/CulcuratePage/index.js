document.getElementById("culcurate").onclick = function() {
    const urlSearchParams = new URLSearchParams(location.search);
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    
    var result = Number(height) + Number(weight);
    urlSearchParams.set("result", result);
    history.replaceState("", "", `?${urlSearchParams.toString()}`)
};