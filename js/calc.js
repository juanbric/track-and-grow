
function showResult(){
    var initial = document.getElementById('initial').value;
    var final = document.getElementById('final').value;
    var increase = document.getElementById('increase').value;
    var difference = document.getElementById('difference').value;
    var showDifference = document.getElementById('showDifference');
    var showIncrease = document.getElementById('showIncrease');
    var showFinal = document.getElementById('showFinal');
    var showInitial = document.getElementById('showInitial');


    increase = 100 * ((final - initial)/Math.abs(initial));
    difference = final - initial;
    
    showInitial.innerHTML = initial;
    showFinal.innerHTML = final;
    showIncrease.innerHTML = Math.round(increase);
    showDifference.innerHTML = difference;
 };
