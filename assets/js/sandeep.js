function changeUrl(){
    window.location.href = "items.html";
}

function addToCart(cond){
    const c = cond.substring(0,3)
    const num = cond.substring(4)
    const price = document.getElementById("price-" + num).innerHTML;
    const name = document.getElementById("name-" + num).innerHTML;
   if(c == "inc"){
       var db = document.getElementById("d-" + num);
       const quant = document.getElementById("q-" + num);
       var quantity = parseInt(quant.value);
       quant.value = ++quantity;
       if(quantity > 0){
            db.disabled = false;
       }
   }else if(c == "dec"){
    var db = document.getElementById("d-" + num);
    const quant = document.getElementById("q-" + num);
    var quantity = parseInt(quant.value);
    quant.value = --quantity;
    if(quantity == 0){
         db.disabled = true;
         localStorage.removeItem("item-"+num);
    }
   }
   localStorage.setItem("item-"+num,name + "@"+ price+"@"+quantity);
}
function inCart(cond){
    const c = cond.substring(0,3);
    const num = cond.substring(4);
    const price = document.getElementById("price-" + num);
    const dprice = document.getElementById("dp-" + num).value;
    const name = document.getElementById("name-" + num).innerHTML;
    if(c == "inc"){
        const quant = document.getElementById("q-" + num);
        var quantity = parseInt(quant.value);
        quant.value = ++quantity;
    }else if(c == "dec"){
     const quant = document.getElementById("q-" + num);
     var quantity = parseInt(quant.value);
     quant.value = --quantity;
     if(quantity == 0){
         window.location.reload();
     }
}
localStorage.setItem("item-"+num,name + "@"+ dprice+"@"+quantity);
price.innerHTML = quantity * dprice;
total();
}

function total(){
    var sum = 0;
    const net = document.getElementById("net");
    const sgst = document.getElementById("sgst");
    const cgst = document.getElementById("cgst");
    const grand = document.getElementById("grand");

    for(var i in localStorage){
        j = parseInt(i.substring(5));
        if(j > 0){
            const key = localStorage["item-"+j].split("@");
            sum += key[1] * key[2];
        }
    }
    net.innerHTML = sum.toFixed(2);
    const gst = (2.5) * sum / 100;
    sgst.innerHTML = gst.toFixed(2);
    cgst.innerHTML = gst.toFixed(2);
    grand.innerHTML = (sum + gst + gst).toFixed(2);
}

function cart(){
    var tb = document.getElementById("tbody");
    var j;
    for(var i in localStorage){
        j = parseInt(i.substring(5));
        if(j > 0){
            const key = localStorage["item-"+j].split("@");
            if (parseInt(key[2]) != 0){
           const el = "<tr><td id=\"name-"+j+"\">"+key[0]+"</name></td><input id='dp-"+j+"' type='hidden' class='d-none' value='"+parseFloat(key[1])+"'><td id=\"price-"+j+"\">"+parseFloat(key[1])*parseFloat(key[2])+"</td><td><div class=\"d-flex d-sm-flex d-lg-flex justify-content-center justify-content-sm-center align-items-sm-center align-items-lg-center\"><button id=\"d-"+j+"\" style=\"background-color: transparent;border:none;outline: none;font-size: 25px;\" onclick=\"inCart('dec-"+j+"')\"><i class=\"la la-minus-circle c-button\"></i></button><input id=\"q-"+j+"\" class=\"form-control-plaintext d-lg-flex justify-content-center align-items-center align-content-center align-self-center justify-content-lg-center align-items-lg-center text-center mx-3\" type=\"text\" value=\""+parseInt(key[2])+"\" readonly=\"\" style=\"background: #fe3131;border-radius: 10px;height: 24px;width: 40px;outline: none;color: white;\"><button id=\"i-"+j+"\" style=\"background-color: transparent;border:none;outline: none;font-size: 25px;\" onclick=\"inCart('inc-"+j+"')\"><i class=\"la la-plus-circle c-button\"></i></button></div></td></tr>";
            tb.innerHTML = el + tb.innerHTML;
            }
        }
        
    }
}

function clean(){
    localStorage.clear();
    alert("Order Placed");
    window.location.href = "index.html";
}