
function parseData( data ){

    return JSON.parse( data ).map( item => item.name ).sort();
}

function buildList( arr ){

    var ul = document.createElement('ul');
    document.documentElement.append(ul);

    arr.forEach(function(item){
        if( item ){
            var li = document.createElement('li');
            var text = document.createTextNode( item );

            li.appendChild(text);
            ul.appendChild(li);
        }
    });

    return
}

function inputHandler( event ){
    var self = event.target;
    var ul = document.querySelector('ul');
    var newArr = cities.map( item => {

        if( item.toLowerCase().indexOf(self.value.toLowerCase()) == 0 )
            return item;

    } );
    ul.remove();
    buildList( newArr );

}

var cities = [];
var xhrPromise = function( resolve, reject ){

    return new Promise(function( resolve, reject ){
        var xhr = new XMLHttpRequest();
        var resp, citiesArr;
        xhr.open( 'GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true );

        xhr.addEventListener( 'load', function(){
            
            if( xhr.status == 200 ){
                resp = xhr.response;
                resolve( resp );
            }else{
               reject(); 
            }
            
        });
        xhr.addEventListener('error', function(){
            reject();
        });
        xhr.send();
    });
}

xhrPromise().then(function( resp ){
    cities = parseData( resp );
    buildList( cities );
    document.getElementById('input').addEventListener('input', inputHandler);

}, function(){
    console.log('Error');
});

