window.onload = () => {

}


function getlims() {
    inf = parseInt(document.getElementById("liminf").value);
    sup = parseInt(document.getElementById("limsup").value);
}

function mostrarimg() {
    getlims();
    if (inf > sup) {
        alert("El limite inferior debe ser menor que el limite superior");
    }
    else {
        valswitch();
    }

}

function valswitch() {
    const checkbox = document.getElementById('switch');
    if (checkbox.checked) {
        solouna();
    } else {
        todas();
    }
}



function solouna() {
    getlims();
    const url = `http://jsonplaceholder.typicode.com/photos/${inf}`;
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.')
        })
        .then(data => {
            console.log(data);
            const imagen = data;
            
            let htmlText = 
                                `<div class="foto">
                                    <img src="${imagen.url}">            
                                 </div>`;
            document.getElementById('flexrow').innerHTML = htmlText;
        })


}

function todas() {
    getlims();
    const imagenes = [];

    for (let i = inf; i <= sup; i++) {
        const url = `http://jsonplaceholder.typicode.com/photos/${i}`;
        imagenes.push(fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.')
            })
            .then(data => {
                return data.url;
            })
        );
    }

    Promise.all(imagenes)
        .then(urls => {
            let htmlText = '';
            urls.forEach(url => {
                htmlText += `<div class="foto"><img src="${url}"></div>`;
            });
            document.getElementById('flexrow').innerHTML = htmlText;
        });
}


