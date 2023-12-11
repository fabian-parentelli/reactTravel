*** Obtener Productos *** 
Para obtener productos utilizamos la funcíon getProducts();
    
    - Obtener productos de forma ordenada paginados con límite de diez pasara por parametro un objeto vacío {};
        ejemplo const productos = getProducts({});

    - Obtener Productos de forma random paginados con límite de diez pasar por parámetro un objeto {random:1}
        ejemplo const productos = getProducts({random: 1});

    - Para poder cambiár de página se hace el llamado de la siguiente manera 
        {numero de página, random: 2} es importante que para que no repita los productos que el random sea el numero 2.
        ejemplo suponiendo que estamos en la pagina 3
            - avanzar pagina const productos = getProducts({ 4, random: 2 });
            - retroceder pagina const productos = getProducts({ 2, random: 2 });
    
        Todas estas peticiones devuelven siempre esta documentación.
            productos = {
                docs, // es un array con los 10 productos
                hasNextPage: true/false // devuelve un booleano diciendote si hay una siguiente pagina.
                hasPrevPage: true/false // devuelve un booleano diciendote si hay una anterior pagina.
                limit // es el limite que te está devolviendo.
                nextLink // dice cual es la pagina siguiente ejemplo si estamos en la pagina 3 el nextLik es el 4     
                nextPage // dice cual es la pagina siguiente ejemplo si estamos en la pagina 3 el nextLik es el 4
                page // te dice en que pagina te encuentras
                prevLink // dice cual es la pagina anterior ejemplo si estamos en la pagina 3 el prevLink es el 2      
                prevPage // dice cual es la pagina anterior ejemplo si estamos en la pagina 3 el prevPage es el 2  
                totalDocs // te dice al cantidad total que hay de productos.
                totalPages / te dice el total de páginas.    
            }
            
    - Para obtener los productos por categorias 
        ejemplo const productos = getProducts({query: familia});

*** Prestaciones ***
Las prestaciones getBenefit() devuelve el nombre de da la prestación el texto y una url con un icono.
    ejemplo const icon = getBenefit()
    console.log(icon) 
        name: "wifi",
        text: "Wifi gratis",
        url: "https://img.icons8.com/metro/26/wifi.png"