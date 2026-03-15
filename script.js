let chart;

function calculateBill(){

let fan = document.getElementById("fan").value;
let tv = document.getElementById("tv").value;
let ac = document.getElementById("ac").value;
let light = document.getElementById("light").value;

let fanUnits = (75 * fan)/1000;
let tvUnits = (120 * tv)/1000;
let acUnits = (1500 * ac)/1000;
let lightUnits = (20 * light)/1000;

let totalUnits = fanUnits + tvUnits + acUnits + lightUnits;

let bill = totalUnits * 5;

document.getElementById("result").innerHTML =
"Total Units: "+totalUnits.toFixed(2)+" | Total Bill: ₹"+bill.toFixed(2);

/* save history */

let history = JSON.parse(localStorage.getItem("billHistory")) || [];
history.push("Units: "+totalUnits.toFixed(2)+" Bill: ₹"+bill.toFixed(2));
localStorage.setItem("billHistory",JSON.stringify(history));

displayHistory();

/* draw graph */

drawGraph(fanUnits,tvUnits,acUnits,lightUnits);

}

function drawGraph(fan,tv,ac,light){

let ctx = document.getElementById("usageChart");

if(chart) chart.destroy();

chart = new Chart(ctx,{
type:'bar',
data:{
labels:['Fan','TV','AC','Light'],
datasets:[{
label:'Electricity Units',
data:[fan,tv,ac,light],
backgroundColor:['#4CAF50','#2196F3','#FF5722','#FFC107']
}]
}
});

}

function displayHistory(){

let list = document.getElementById("history");
list.innerHTML="";

let history = JSON.parse(localStorage.getItem("billHistory")) || [];

history.forEach(item=>{
let li=document.createElement("li");
li.textContent=item;
list.appendChild(li);
});

}

displayHistory();