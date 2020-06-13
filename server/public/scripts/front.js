function toggle(){
    var toggle = document.getElementById("toggle");
    var gold = document.getElementById("gold");
    var platinum = document.getElementById("platinum");
    
    
    if(toggle.checked == true){
      gold.innerHTML = '$9.99 <small>/mo</small>';
      platinum.innerHTML = '$19.99 <small>/mo</small>';
    } else if (toggle.checked == false){
      gold.innerHTML = '$99.99 <small>/yr</small>';
      platinum.innerHTML = '$199.99 <small>/yr</small>';
    } else {
      gold.innerHTML = '$9.99 <small>/mo</small>';
      platinum.innerHTML = '$19.99 <small>/mo</small>';
    }
}
