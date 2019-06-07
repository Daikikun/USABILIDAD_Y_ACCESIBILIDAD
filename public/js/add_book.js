var database = firebase.database();
var ref = database.ref('libros');
var cont_put_lib;
var flag_put_book = true;
var string_errors = '';
var string_table_book = '';
var string_img_book = '';
var cont_bk = 0;
var cont_jp = 0;
// ------------------------------------------------------------------------------ //

$('#warning-errors').hide();

// get el valor del contador actual
ref.child('count').on('value', snap => {
    cont_put_lib = snap.val();
});

// caundo la página esté cargada
$(document).ready(function() {
    $('#modal').show(); //muestro el modal
    $('#register').click(() => {
        //cont_jp = 0;
        // Crear el objeto libro
        var obj = {
            'nombre':    $('#name').val(),
            'editorial': $('#editorial').val(),
            'autor':     $('#autor').val(),
            'url':       $('#url_bk').val(),
            'genero':    $('#genero').val()
        };
        
        // Detectar campos vacíos
        for(x in obj)
        {
            if(obj[x] == '') 
            {
                flag_put_book = false; 
                string_errors += '<li>' + x + ' está vacío.</li>';
            }
        }
        
        // Si hubo errores 
        if(flag_put_book == false)
        {   
            $('#warning-errors').show();
            $('#mi_formulario input').focus();
            $('#warning-errors').html('Existen errores que debe corregir: ' + string_errors);
            
            flag_put_book = true; 
            string_errors = '';
        }
        else // si no hubo errores
        {
            $('#warning-errors').hide();
            ref.child('lib' + cont_put_lib).set(obj); cont_put_lib++;
            ref.child('count').set(cont_put_lib);
            $('#mi_formulario').trigger("reset");
        }
    });
    
         // ------------------------------------------------------------------//
      ref.on('value', snap2 => {
        //if(cont_jp != 1)
        //{
            cont_bk = 0;
            var data = snap2.val();
            string_table_book = '';
            string_img_book = '';
        
            //alert('hola');
            for(var key in data)
            {
              if(cont_bk == 1)
              {
                string_table_book += '<tr>';
                string_table_book += '<td>' + data[key].nombre + '</td>';
                string_table_book += '<td>' + data[key].autor + '</td>';
                string_table_book += '<td>' + data[key].editorial + '</td>';
                string_table_book += '<td>' + data[key].genero + '</td>';
                string_table_book += '</tr>';
              }
              
              if(cont_bk == 1)
              {
                string_img_book += '<div class="portada_libro" id="'+key+'">';
                string_img_book += '<div class="shade_libro" tabindex="0">';
                string_img_book += '<div id="leido_'+key+'" alt="'+key+'" class="leido_bk unselected_bk" tabindex="0"><i class="material-icons">remove_red_eye</i></div>';
                string_img_book += '<div id="fav_'+key+'" alt="'+key+'" class="fav_bk unselected_bk" tabindex="0"><i class="material-icons">favorite</i></div>';
                string_img_book += '<div id="pend_'+key+'" alt="'+key+'" class="pend_bk unselected_bk" tabindex="0"><i class="material-icons">bookmark</i></div>';
                string_img_book += '</div></div>';
              }
              
              cont_bk = 1;
            }
        
            $('#inner_bibli').html(string_table_book);
            $('#book_listed').html(string_img_book);
                
            for(var key in data)
            {
                $('#'+key).css({'background-image': 'url('+data[key].url+')'});
            }
               
        //}
            
        
      });
      // ------------------------------------------------------------------//
});

