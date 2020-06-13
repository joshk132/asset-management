function typePicker(){
 var sel = document.getElementById("type");
 var manufacturer = document.getElementById("manufacturer");
 var model = document.getElementById("model");
 var aps = document.getElementById("aps"); 
 var cables = document.getElementById("cables"); 
 var deskPhones = document.getElementById("deskPhones"); 
 var desktops = document.getElementById("desktops"); 
 var laptops = document.getElementById("laptops");
 var mobilePhones = document.getElementById("mobilePhones");
 var monitors = document.getElementById("monitors");
 var printers = document.getElementById("printers");
 var projectors = document.getElementById("projectors");
 var routers = document.getElementById("routers");
 var servers = document.getElementById("servers");
 var switches = document.getElementById("switches");
 var tablets = document.getElementById("tablets");
 var other = document.getElementById("other");
 var warningType=document.getElementById("warningType");

if(sel.value=="aps"){
  aps.style.display = 'block';
}else{
  aps.style.display = 'none';
}

if(sel.value=="cables"){
  manufacturer.style.display = 'none';
  model.style.display = 'none';
  cables.style.display = 'block';
}else{
  manufacturer.style.display = 'block';
  model.style.display = 'block';
  cables.style.display = 'none';
}

if(sel.value=="deskPhones"){
  deskPhones.style.display = 'block';
}else{
  deskPhones.style.display = 'none';
}

if(sel.value=="desktops"){
  desktops.style.display = 'block';
}else{
  desktops.style.display = 'none';
}

if(sel.value=="laptops"){
  laptops.style.display = 'block';
}else{
  laptops.style.display = 'none';
}

if(sel.value=="mobilePhones"){
 mobilePhones.style.display = 'block';
}else{
  mobilePhones.style.display = 'none';
}

if(sel.value=="monitors"){
 monitors.style.display = 'block';
}else{
  monitors.style.display = 'none';
}

if(sel.value=="printers"){
 printers.style.display = 'block';
}else{
  printers.style.display = 'none';
}

if(sel.value=="projectors"){
 projectors.style.display = 'block';
}else{
  projectors.style.display = 'none';
}

if(sel.value=="routers"){
 routers.style.display = 'block';
}else{
  routers.style.display = 'none';
}

if(sel.value=="servers"){
 servers.style.display = 'block';
}else{
  servers.style.display = 'none';
}

if(sel.value=="switches"){
 switches.style.display = 'block';
}else{
  switches.style.display = 'none';
}

if(sel.value=="tablets"){
 tablets.style.display = 'block';
}else{
  tablets.style.display = 'none';
}

if(sel.value=="other"){
 other.style.display = 'block';
 warningType.style.display = 'block';
}else{
  other.style.display = 'none';
  warningType.style.display = 'none';
}
} // end typePicker

function deployPicker(){
 var sel2 = document.getElementById("status");
 var statusOutput = document.getElementById("statusOutput"); 

 if(sel2.value=="Ready"){
  statusOutput.style.display = 'block';
 }else{
  statusOutput.style.display = 'none';
 }
} // end deployPicker

$(function() {
  $(".selectpicker").selectpicker();
});

$(function () {
  $("#example1").DataTable();
  $("#example2").DataTable({
   "paging"      : true,
   "lengthChange": false,
   "searching"   : false,
   "ordering"    : true,
   "info"        : true,
   "autoWidth"   : false
  });
});

var warningType=document.getElementById("warningType");
var otherMessage = '<div class="alert alert-warning" role="alert">Limit of 5 custom fields for your plan!</div>';
var sel=document.getElementById("type");
var limit = 5;
var counter = 1;
$(document).on("click",".add",function(){
 
 if(counter < limit){
  if(sel.value !="other"){
   counter = 1;
   
  }
  counter ++;
  if(counter == limit){
   var add = document.getElementById("add");
   add.style.display = 'none';
   warningType.innerHTML=otherMessage;
  }
  
  var n = $(this).prev(".form-group" ).length+1;
 var temp = $(this).prev(".form-group" ).clone();
 $('input:first',temp).attr('placeholder','Custom Field').val("");
 $(this).prev( ".form-group" ).after(temp);
 }
});

$(document).on("click",".addURL",function(){
 var b = $(this).prev(".form-group" ).length+1;
 var temp = $(this).prev(".form-group" ).clone();
 $('input:first',temp).attr('placeholder','Support URL').val("");
 $(this).prev( ".form-group" ).after(temp);
});



getSelected = function(){
  var perpage = document.getElementById("perpage").innerHTML;
  var widthvar = document.getElementById("width").innerHTML;
  var lengthvar = document.getElementById("length").innerHTML;
  var fontvar = document.getElementById("font").innerHTML;
  var codeType = document.getElementById("codeType").innerHTML;
  var textname = document.getElementById("textname").innerHTML;
  var perpagenum = Number(perpage);
  var widthnum = Number(widthvar);
  var lengthnum = Number(lengthvar);
  var fontnum = Number(fontvar);
  var array = [];
  $('.my_table tbody tr').each(function(index, object){
    if($(this).find('input[type="checkbox"]').prop("checked"))
      array.push($(this).find('.id').attr("name"));
  });
 console.log(textname);
  for (i = 0; i < array.length; i++) { 
      if(i > perpagenum) return;
      var value = array[i];
      $('.target').append('<img id="barcode'+i+'"/>')
      $('#barcode'+i+'').JsBarcode(value, {format: codeType, width: widthnum, height: lengthnum, fontSize: fontnum, text: textname});
  }
  
};

printReportAssigned = function(){
    var company = document.getElementById("Company");
    var assigned = document.getElementById("Assigned");
    company.classList.add('hidden-print');
    assigned.classList.add('visible-print');
    assigned.classList.add('reportAssigned');
    assigned.classList.remove('hidden-print');
    window.print();
};

printReportAssets = function(){
    var assigned = document.getElementById("Assigned");
    var company = document.getElementById("Company");
    assigned.classList.add('hidden-print');
    company.classList.add('visible-print');
    company.classList.add('reportAsset');
    company.classList.remove('hidden-print');
    window.print();
};
