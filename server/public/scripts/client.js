console.log( 'js' );

$( document ).ready(onReady);


function onReady() {
  console.log( 'JQ' );
  // Establish Click Listeners
  $( '#addButton' ).on( 'click', setupClickListeners);
  getKoalas();
  $('#viewKoalas').on('click', '.transfer-yes', readyToTransfer);
  $('#viewKoalas').on('click', '.delete', deleteKoala);
  $('#viewKoalas').on('click', '.update', updateData);
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
  }
  
  
  
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
    if (isInvalid()) {
      return;
    }
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

        let optionValue = $('#koalaColumns option:selected').text();
        
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
        <td>
          <label for="koalas">What section do you want to update?</label>

          <select name="koala" id="koalaColumns">
            <option value="name">Name</option>
            <option value="age">Age</option>
            <option value="gender">Gender</option>
            <option value="notes">Notes</option>
          </select>
        </td>
        <td>
          <input class="inputs" type="text" id="${id}" value="" placeholder="new content">
        </td>
        <td>
          <button data-option="${optionValue}" class="update" data-id=${id}>Submit</button>
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

      function updateData() {
      const id = $(this).data('id');
      const value = $(this).data('option');
      console.log(`in updateData function with ${value} and id: ${id}`);

     
      }

      


      
      function deleteKoala(){
        const id = $(this).data('id');
        
        swal({
          title: 'Are you sure you want to delete this koala?',
          icon: 'warning',
          buttons: true,
          dangerMode: true
        })
        .then((willDelete) =>{
          if (willDelete) {
            $.ajax({
              type: 'DELETE',
              url: `/koalas/${id}`
            }).then(function(){
              getKoalas();
            }).catch(function(error){
              console.log('error with deleting, ', error);
            })
          } else {
            return;
          }
        })
      }

      function isInvalid() {
        console.log('in check validity function');

        let koalaName = $('#nameIn').val();
        let koalaAge = $('#ageIn').val();
        let koalaGender = $('#genderIn').val();
        let readyToTransfer = $('#readyToTransferIn').val();
        let notes = $('#notesIn').val();
    
        if (koalaName == '') {
          alert ('name cannot be blank');
          return true;
        }
        if (koalaAge =='') {
          alert ('age cannot be blank');
          return true;
        } 
        if (/[a-zA-Z]/.test(koalaAge)) {
          alert('age must be a number');
          return true;
        }
        if (koalaGender == '') {
          alert ('gender cannot be blank');
          return true;
        }
        if (readyToTransfer == '') {
          alert ('readyToTransfer cannot be blank');
          return true;
        }
        if (readyToTransfer != 'Y' && readyToTransfer != 'N') {
          alert ('Ready To Transfer must have a value of Y or N');
          return true;
        }
        if (notes == '') {
          alert ('notes cannot be blank');
          return true;
        }
        return false;    
    }