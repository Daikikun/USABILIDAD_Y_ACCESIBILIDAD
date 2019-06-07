var 
    lista_compra = [],
    add_compra,
    elto_compra,
    precio_compra = 0,
    previa_compra,
    list,
    n,
    total;

function add_item() {
    
    // elementos de interacción
    add_compra = document.getElementById('add_compra').value;
    
    // elemntos field
    elto_compra = document.getElementById('elto_compra').value;
    precio_compra = document.getElementById('precio_compra').value;
    previa_compra = document.getElementById('previa_compra').value;
    
    // auxiliares
    list = "";
    n = 0;
    
    // -------------------------------------------------------------------
    
    var element_tmp = {
        nombre: elto_compra,
        precio: precio_compra
    };
    
    // ------------------------------------------------------------------
    
    lista_compra.push(element_tmp);
    
    for(n = 0; n < lista_compra.length; n++)
    {   
        console.log("it " + n);
        list += "<tr>" +
                    "<td>"  +
                        lista_compra[n].nombre +
                    "</td>" +
                    "<td>"  +
                        lista_compra[n].precio + " €"
                    "</td>" +
                "</tr>";
    }

    document.getElementById('previa_compra').innerHTML = list;
    
    total_calculate();
    
}


function total_calculate() 
{
    total = lista_compra[0].precio;
    total = parseFloat(total);
    
    for(n = 1; n < lista_compra.length; n++)
    {
        total += parseFloat(lista_compra[n].precio);
    }
    
    
    total *= 1.07;
    total = Number(Math.round(total+'e2')+'e-2');
    document.getElementById('total_compra').innerHTML = total;
}