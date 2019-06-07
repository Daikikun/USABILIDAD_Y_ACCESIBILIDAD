
var auth = firebase.auth();
var database = firebase.database();
var ref_users = database.ref('usuarios');
var ref_libros = database.ref('libros');
var ref_circles = database.ref('circulos');

var flg_login_index = false;
var user = '';

var user_final = '';
// -------------------------------------------------------------------------
flg_login_index
$(document).ready(function() {
    var flg_login_index = false;
    $('#login_input').click(err => {
        var making_register = false;
        var data_log = {
          'user': $('#user_input').val(),
          'pass': $('#pass_input').val()
        };

        ref_users.on('value', snap => {
            var datos = snap.val();
            for(key in datos)
            {
                if((data_log.user == datos[key].user) && (data_log.pass == datos[key].pass))
                {
                    flg_login_index = true;
                    auth.signInWithEmailAndPassword(datos[key].email, data_log.pass).then((result) => {
                        user = result.user;
            		    window.location.href = "./home";
            		    //alert("Bienvenid@, " + datos[key].user);
            		});
                    break;
                }
            }
            if(!flg_login_index && !making_register) alert("Usuario o contraseña incorrectos");
        });
    });

    $('#logout').click(err => {
        auth.signOut();
        window.location.href = "./";
     });

	auth.onAuthStateChanged((fb_user) => {
	    if(fb_user)
	    {
	        ref_users.on('value', snap => {
                var data = snap.val();
                for(key in data)
                {
                    /* DATOS DE USUARIO ACTUAL */
                    if(data[key].email == fb_user.email)
                    {
                        user_final = data[key].user;
                        $("#username").html(user_final);
	                    $("#username2").html(user_final);
	                    $("#username_profilepage").html(user_final);
	                    $("#profile_img").css({'background-image': 'url('+ data[key].url +')'});
	                    $("#avatar_in_navbar").css({'background-image': 'url('+ data[key].url +')'});
	                    
	                    // si se decide cambiar el avatar
	                    $("#submit_avatar").click(() => {
                            var new_avatar = $("#avatar").val();
                            ref_users.child(user_final).child('url').set(new_avatar);
                        });
	                    
                    }
                }
                
                /* FILL CIRCLES */
                
                ref_circles.on('value', snap_c => {
                    var data_c = snap_c.val();
                    var string_c = '';
                    var count_c = 0;
                    for(key_c in data_c)
                    {
                        ref_circles.child(key_c).child('code').set('cir'+count_c);
                        if(count_c%2 == 0)
                        {
                            string_c +=     '<div class="row">';
                            string_c +=         '<div class="col s12 l6">';
                            string_c +=             '<table><tr>';
                            // HEAD_BEGIN
                            string_c +=                     '<td  class="celd1"><div class="pic-circle" id="'+key_c+'"></div></td>';
                            string_c +=                     '<td  class="celd2"><strong><div id="name'+key_c+'"></div></strong>';
                            string_c +=                     '<i><div id="namecreator'+key_c+'"></div></i></td>';
                            
                            
                            var ref_actual = ref_circles.child(key_c).child(user_final);
                            ref_actual.on('value', snap => {
                                if(snap.val() == user_final || data_c[key_c].Creador == user_final) 
                                {
                                    string_c +=   '<td class="celd3"><div class="quit-circle" id="quit'+key_c+'" alt="'+key_c+'">Abandonar</div></td>';
                                }
                                else
                                {
                                    string_c +=   '<td class="celd3"><div class="join-circle" id="join'+key_c+'" alt="'+key_c+'">Unirse</div></td>';
                                }
                            });
                            
                            // HEAD_END
                            string_c += '</tr></table></div>';
                            count_c++;
                        } else {
                            string_c +=         '<div class="col s12 l6">';
                            string_c +=             '<table><tr>';
                            // HEAD_BEGIN
                            string_c +=                     '<td  class="celd1"><div class="pic-circle" id="'+key_c+'"></div></td>';
                            string_c +=                     '<td  class="celd2"><strong><div id="name'+key_c+'"></div></strong>';
                            string_c +=                     '<i><div id="namecreator'+key_c+'"></div></i></td>';
                            
                            
                            var ref_actual = ref_circles.child(key_c).child(user_final);
                            ref_actual.on('value', snap => {
                                if(snap.val() == user_final || data_c[key_c].Creador == user_final) 
                                {
                                    string_c +=   '<td class="celd3"><div class="quit-circle" id="quit'+key_c+'" alt="'+key_c+'">Abandonar</div></td>';
                                }
                                else
                                {
                                    string_c +=   '<td class="celd3"><div class="join-circle" id="join'+key_c+'" alt="'+key_c+'">Unirse</div></td>';
                                }
                            });
                            
                            // HEAD_END
                            string_c += '</tr></table></div></div>';
                            count_c++;
                            
                        }
                    
                        
                    }
                    $('#inner_circle').html(string_c);
                    count_c = 0;
                    for(key_c in data_c)
                    {
                        $('#cir'+count_c).css('background-image', 'url('+data_c[key_c].url+')');
                        $('#namecir'+count_c).html(data_c[key_c].nom);
                        $('#namecreatorcir'+count_c).html('  por '+data_c[key_c].Creador);
                        
                        count_c++;
                    }
                    
                    $('.quit-circle').attr('tabindex', '0');
                    $('.join-circle').attr('tabindex', '0');
                    
                    /* CLICKS IN CIRCLE */
                    $('.quit-circle').click(() => {
                        var selected_cir = $(':focus').attr('alt');
                        if(data_c[selected_cir].Creador == user_final) alert('No puede abandonar el círculo porque es el creador');
                        ref_circles.child(selected_cir).child(user_final).remove();
                    });
                    
                    $('.join-circle').click(() => {
                        var selected_cir = $(':focus').attr('alt');
                        ref_circles.child(selected_cir).child(user_final).set(user_final);
                    });
                    
                    /* CREACIÓN DE CIRCULOS */
                    $('#submit_circle').click(() => {
                        var obj_circle = {
                            'url': $('#circle_avatar').val(),
                            'nom': $('#circle_name').val(),
                            'Creador': user_final
                        };  
                        ref_circles.child('cir'+count_c).set(obj_circle);
                    });
                    
                    /* BOTONES LIBROS */
                    ref_users.child(user_final).child('pend').child('dummy').set('dummy');
                    ref_users.child(user_final).child('fav').child('dummy').set('dummy');
                    ref_users.child(user_final).child('leidos').child('dummy').set('dummy');
                    ref_users.child(user_final).child('amigos').child('dummy').set('dummy');
                    
                    ref_users.child(user_final).child('leidos').on('value', snap => {
                        var data_bk = snap.val();
                        for(key in data_bk) $('#leido_'+key).removeClass('unselected_bk').addClass('selected_bk');
                    });
                    
                    ref_users.child(user_final).child('fav').on('value', snap => {
                        var data_bk = snap.val();
                        for(key in data_bk)    $('#fav_'+key).removeClass('unselected_bk').addClass('selected_bk');
                    });
                    
                    ref_users.child(user_final).child('pend').on('value', snap => {
                        var data_bk = snap.val();
                        for(key in data_bk)   $('#pend_'+key).removeClass('unselected_bk').addClass('selected_bk');
                    });
                    
                    
                    $('.unselected_bk.leido_bk').click(() => {
                        var selected_tab = $(':focus').attr('alt');
                        $(':focus').addClass('selected_bk');
                        $(':focus').removeClass('unselected_bk');
                        ref_users.child(user_final).child('leidos').child(selected_tab).set(selected_tab);   
                    });    
                    
                    $('.unselected_bk.pend_bk').click(() => {
                       var selected_tab = $(':focus').attr('alt');
                       $(':focus').addClass('selected_bk');
                        $(':focus').removeClass('unselected_bk');
                        ref_users.child(user_final).child('pend').child(selected_tab).set(selected_tab);   
                    });    
                    
                    $('.unselected_bk.fav_bk').click(() => {
                       var selected_tab = $(':focus').attr('alt');
                       $(':focus').addClass('selected_bk');
                        $(':focus').removeClass('unselected_bk');
                        ref_users.child(user_final).child('fav').child(selected_tab).set(selected_tab);   
                    });  
                    
                    /* BOTONES LIBROS UNSELECTED */
                    
                    $('.selected_bk.leido_bk').click(() => {
                        var selected_tab = $(':focus').attr('alt');
                        $(':focus').addClass('unselected_bk');
                        $(':focus').removeClass('selected_bk');
                        ref_users.child(user_final).child('leidos').child(selected_tab).remove();   
                    }); 
                    
                    $('.selected_bk.pend_bk').click(() => {
                        var selected_tab = $(':focus').attr('alt');
                        $(':focus').addClass('unselected_bk');
                        $(':focus').removeClass('selected_bk');
                        ref_users.child(user_final).child('pend').child(selected_tab).remove();   
                    }); 
                    
                    $('.selected_bk.fav_bk').click(() => {
                        var selected_tab = $(':focus').attr('alt');
                        $(':focus').addClass('unselected_bk');
                        $(':focus').removeClass('selected_bk');
                        ref_users.child(user_final).child('fav').child(selected_tab).remove();   
                    }); 
                });
                
                /* PROFILEPAGE */
                /* LEIDOS */
                ref_users.child(user_final).on('value', snap => {
                    var data_bkpf = snap.val();
                    var count_bkpf = 0;
                    var string_bkpf = '';
                    var v_bkpf = [];
                    for(key in data_bkpf['leidos'])
                    {
                        if(count_bkpf != 0)
                        {
                            string_bkpf += '<div class="portada_libro" id="perfleid'+key+'"></div>';
                            ref_libros.child(key).on('value', snap => {
                                v_bkpf.push({'a': snap.val().url, 'b': key});
                            });
                        }
                            
                            
                        count_bkpf++;
                    }
                    $('#leidos_perfil').html(string_bkpf);
                    for(n in v_bkpf) $('#perfleid'+v_bkpf[n].b).css({'background-image': 'url('+v_bkpf[n].a+')'});
                    
                   /* FAV */
                   var count_bkpf = 0;
                   var string_bkpf = '';
                   var v_bkpf = [];
                   for(key in data_bkpf['fav'])
                    {
                        if(count_bkpf != 0)
                        {
                            string_bkpf += '<div class="portada_libro" id="perffav'+key+'"></div>';
                            ref_libros.child(key).on('value', snap => {
                                v_bkpf.push({'a': snap.val().url, 'b': key});
                            });
                        }
                            
                            
                        count_bkpf++;
                    }
                    $('#fav_perfil').html(string_bkpf);
                    for(n in v_bkpf) $('#perffav'+v_bkpf[n].b).css({'background-image': 'url('+v_bkpf[n].a+')'});
                   
                   /* PEND */
                   var count_bkpf = 0;
                   var string_bkpf = '';
                   var v_bkpf = [];
                   for(key in data_bkpf['pend'])
                    {
                        if(count_bkpf != 0)
                        {
                            string_bkpf += '<div class="portada_libro" id="perfpend'+key+'"></div>';
                            ref_libros.child(key).on('value', snap => {
                                v_bkpf.push({'a': snap.val().url, 'b': key});
                            });
                        }
                        count_bkpf++;
                    }
                    $('#pend_perfil').html(string_bkpf);
                    for(n in v_bkpf) $('#perfpend'+v_bkpf[n].b).css({'background-image': 'url('+v_bkpf[n].a+')'});
                });
            
	            
	            
	            /* FILL CIRCLES IN HOME */
                ref_circles.on('value', snap => {
                    var string_circles = '';
                    var dat_chom = snap.val();
                    
                    
                    for(j in dat_chom)
                    {
                       for(k in dat_chom[j])
                       {
                           if(dat_chom[j][k] == user_final)
                           {
                               string_circles += '<img src="'+dat_chom[j].url+'" class="circles">';
                           }
                       }
                    }
                    
                    $('#list-circles').html(string_circles);
                });
                
                /* ADD FRIENDS  */
                ref_users.on('value', snap => {
                    var data_alu = snap.val();
                    var string_all_users = '';
                    
                    string_all_users += '<table>';
                    for(key in data_alu)
                    {
                        if(key != user_final)
                        {
                            string_all_users += '<tr>';
                            string_all_users += '<td>'+key+'</td>';
                            ref_users.child(user_final).child('amigos').on('value', snap2 => {
                            var amigos_user = snap2.val();
                            
                            var nonexist = amigos_user['sdfa324sfasf35aads342aes34523cadasjflaj'];
                            
                            if(amigos_user[key] != nonexist)
                            {
                               string_all_users += '<td><i id="rm'+key+'" alt="'+key+'" class="material-icons button-friend friend-rm" tabindex="0">close</i></td>';
                            } else {
                               string_all_users += '<td><i id="add'+key+'" alt="'+key+'" class="material-icons button-friend friend-add" tabindex="0">person_add</i></td>';
                            }
                        });
                        string_all_users += '</tr>';
                        }
                        
                        
                    }
                    string_all_users += '</table>';
                    
                    $('#all_users').html(string_all_users);
                    
                    $('.friend-add').click(() => {
                        var sel_friend = $(':focus').attr('alt');
                        ref_users.child(user_final).child('amigos').child(sel_friend).set(sel_friend);
                        ref_users.child(sel_friend).child('amigos').child(user_final).set(user_final);
                    });
                    $('.friend-rm').click(() => {
                        var sel_friend = $(':focus').attr('alt');
                        ref_users.child(user_final).child('amigos').child(sel_friend).remove();
                        ref_users.child(sel_friend).child('amigos').child(user_final).remove();
                    });
                });
                
                /* SHOW FRIENDS IN HOME */
                ref_users.child(user_final).child('amigos').on('value', snap_friend => {
                   var amigos = snap_friend.val();
                   var string_list_friends = '';
                   
                   for(key in amigos)
                   {
                       if(key != 'dummy')
                       {
                           ref_users.child(key).on('value', snap2 => {
                              var amigo_it = snap2.val(); 
                              string_list_friends += '<img alt="'+amigo_it.user+'" src="'+amigo_it.url+'" class="icon" tabindex="0">';
                           });
                       }
                   }
                   $("#list-friends").html(string_list_friends);
                });
	            

	        });
            
            $('#send_contacta_id').click(() => {
                $('#contacta')[0].reset();
                alert('El mensaje se ha enviado con éxito. Un encargado te responderá lo antes posible.')
            });
 
	 
          //if(window.location.href == "https://curso-3-dkuroi.c9users.io/") window.location.href = "/home";
          
        // SI NO SE ESTÁ LOGEADO
	    } else if(window.location.href != "https://curso-3-dkuroi.c9users.io/") {
	        //window.location.href = "./";
	    }
	});

    /*
    auth.onAuth((data) => {
         $("#username").html(user);
     });*/
});
