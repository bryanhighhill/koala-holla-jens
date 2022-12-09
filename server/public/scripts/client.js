console.log( 'js' );

$( document ).ready(onReady);


function onReady() {
  console.log( 'JQ' );
  // Establish Click Listeners
  $( '#addButton' ).on( 'click', setupClickListeners);
  
}; // end doc ready

function setupClickListeners() {
  console.log( 'in addButton on click' );
  // get user input and put in an object
  
  
  // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyToTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }; 


getKoalas();
//GET Koala list from server
//send to append to DOM
function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then(function(response){
    console.log('in /GET', response);
    appendToDom(response);
  });
  
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
$.ajax({
  type: 'POST',
  url: '/koalas',
  data: newKoala //req.body is everything in ajax post request
}).then(function(){
  console.log('req for newKoala');
}).catch(error);
  console.log(error);
}
