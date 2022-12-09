console.log( 'js' );

$( document ).ready(onReady);


function onReady() {
  console.log( 'JQ' );
  // Establish Click Listeners
  $( '#addButton' ).on( 'click', setupClickListeners);
  getKoalas();
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
      readyToTransfer: $('#readyToTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }; 


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
  getKoalas();
// }).catch(error);
//   console.log(error);
})
}

function appendToDom(array){
  $('#viewKoalas').empty();
  // for (let koala of array){
  for (let i=0; i < array.length; i++) {
    $('#viewKoalas').append(`
    <tr>
      <td>
        ${array[i].name}      
      </td>
      <td>
        ${array[i].age}      
      </td>
      <td>
        ${array[i].gender}      
      </td>
      <td>
        ${array[i].ready_to_transfer}      
      </td>
      <td>
        ${array[i].notes}      
      </td>
    </tr>
  `)};
};