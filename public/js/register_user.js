var
    auth = firebase.auth(),
    db = firebase.database(),
    ref_usu = db.ref('usuarios');
    
var string_reg = '',
    flag_reg = true,
    flag_duplo = true;
    

    

$('#warning-errors').hide();
$('#register_btn').removeClass("modal-close");  

// ------------------------------------------------------------

$(document).ready(function() {
    
    $('#register_btn').click(err => {
        var making_register = true;
        // TOMA DE VALORES -----------------------------------------------------------
        var usu_item = {
            'user':  $('#name').val(),
            'email': $('#email').val(),
            'url': '/img/profile.icon.jpg',
            'pass':  $('#pass').val()
        },   pass2 = $('#pass2').val();
        
        
        // COMPROBACIÓN DE ERRORES ---------------------------------------------------
        // comprobación de contraseñas
        if(usu_item.pass != pass2)
        {
            flag_reg = false;
            
            string_reg += "<li>Las contraseñas no coinciden</li>";
            $('#pass').addClass("invalid");
            $('#pass2').addClass("invalid");
        }
        
        // comprobación de campos vacíos
        for(var x in usu_item)
        {
            if(usu_item[x] == '')
            {
                flag_reg = false; 
                string_reg += '<li>' + x + ' está vacío.</li>';
            }
        }
        
        // fb con errores
        auth.createUserWithEmailAndPassword(usu_item.email, usu_item.pass).catch(error => {
            // Handle Errors here.
            var error_code = error.code;
            var error_msg = error.message;
            
            flag_reg = false; 
            
            alert('mensaje de firebase:\n\n' + error_code + ': ' + error_msg);
            string_reg += '<li>' + error_code + ': ' + error_msg + '</li>';
            $('#email').addClass("invalid");
            $('#pass').addClass("invalid");
            $('#pass2').addClass("invalid");
                
        });
        
        
        
        // comprobación de usuario existente
        ref_usu.on('value', snap => {
            var data = snap.val();
            for(var key in data)
            {
                if(usu_item.user == key)
                {
                    flag_reg = false; 
                    
                    $('#name').addClass("invalid");
                    if(flag_duplo) string_reg += '<li>Ese usuario no está disponible.</li>';
                    flag_duplo = false;
                }
            }
        });
        
        
        // INICIO DE SESION ---------------------------------------------------------------------------------------
        if(flag_reg)
        {
            if(flag_reg) $('#warning-errors').hide();
            if(flag_reg) ref_usu.child(usu_item.user).set(usu_item);
            if(flag_reg) alert('usuario creado con éxito');
            if(flag_reg) $('#register_form').trigger("reset");
    		if(flag_reg) $('#register_btn').addClass("modal-close");
            
        } else {
        
            // hubo errores
            $('#register_btn').removeClass("modal-close");
            $('#warning-errors').show();
            $('#register_form').focus();
            $('#warning-errors').html(string_reg);
            string_reg = '';
            flag_reg = true;
        }
    });
});
    