console.log( 'js' );

$( document ).ready(onReady);


function onReady() {
  console.log( 'JQ' );
  // Establish Click Listeners
  $( '#addButton' ).on( 'click', setupClickListeners);
  getKoalas();
  $('#viewKoalas').on('click', '.transfer-yes', readyToTransfer);
  $('#viewKoalas').on('click', '.delete', deleteKoala);
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
    let id = array[i].id;
    let transfer = array[i].ready_to_transfer;
    console.log(`this is our current id: ${id}`);
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
      <td>
        <button class="transfer-yes" data-transfer=${transfer} data-id=${id}>Ready To Transfer</button>
      </td>
      <td>
        <button class="delete" data-id=${id}>Delete</button>
      </td>
    </tr>
  `)};
};

function readyToTransfer() {
  console.log('readyToTransfer');
  
  const id = $(this).data('id');
  const transfer = $(this).data('transfer');

  console.log(id);
  console.log(transfer);

  $.ajax({
    type: 'PUT',
    url: `/koalas/ready_to_transfer/${id}`,
    data: {ready_to_transfer: `${transfer}`}
  }).then(function() {
    getKoalas();
  }).catch(function(error) {
    console.log('error with putting', error);
  })
}

function deleteKoala(){
  const id = $(this).data('id');

  $.ajax({
    type: 'DELETE',
    url: `/koalas/${id}`
  }).then(function(){
    getKoalas();
  }).catch(function(error){
    console.log('error with deleting, ', error);
  })
}