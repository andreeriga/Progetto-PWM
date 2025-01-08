function caricaEroe(infos) {
    el = document.getElementsByClassName('card-element')
    immagine = el[0]
    nome = el[1]
    descrizione = el[2]
    immagine.src = infos.thumbnail.path + '.' + infos.thumbnail.extension
    nome.innerHTML = infos.name
    descrizione.innerHTML = infos.description == '' ? 'No description available' : infos.description
}

function caricaFumetti(infos) {
    fumetti = infos.items
    len = infos.returned
    if (len == 0) {
        document.getElementById('card-fumetti').innerHTML = 'Non sono presenti fumetti'
        document.getElementById('card-fumetti').style.color = 'white'
        return
    }
    if (infos.returned > 5) {
        len = 5
    }
    for (i = 0; i < len; i++) {
        url = fumetti[i].resourceURI + ''
        getFromMarvelUrlCompleto(url)
            .then(result => { if (result.code == 200) { visualizzaFumetto(result.data.results[0]) } })
    }
}

function visualizzaFumetto(ar) {
    immagine = ar.thumbnail != null ? ar.thumbnail.path + '.' + ar.thumbnail.extension : 'image_not_available.jpg'
    titolo = ar.title
    if (ar.description == null) {
        ar.description = ''
    } else {
        descrizione = ar.description.length > 29 ? ar.description.substring(0, 30) + '...' : ar.description
    }
    card = document.getElementById('card-fumetti')
    card.classList.add('d-none')
    clone = card.cloneNode(true)
    element = clone.getElementsByClassName('card-element')
    element[0].src = immagine
    element[1].innerHTML = titolo
    element[2].innerHTML = descrizione
    clone.classList.remove('d-none')
    card.after(clone)
}

function caricaSerie(infos) {
    fumetti = infos.items
    len = infos.returned
    if (len == 0) {
        document.getElementById('card-serie').style.color = 'white'
        document.getElementById('card-serie').innerHTML = 'Non sono presenti serie'
        return
    }
    if (infos.returned > 5) {
        len = 5
    }
    for (i = 0; i < len; i++) {
        url = fumetti[i].resourceURI + ''
        getFromMarvelUrlCompleto(url)
            .then(result => { if (result.code == 200) { visualizzaSerie(result.data.results[0]) } })
    }
}

function visualizzaSerie(ar) {
    immagine = ar.thumbnail != null ? ar.thumbnail.path + '.' + ar.thumbnail.extension : 'image_not_available.jpg'
    titolo = ar.title
    descrizione = ar.description == null ? '' : ar.description
    card = document.getElementById('card-serie')
    card.classList.add('d-none')
    clone = card.cloneNode(true)
    element = clone.getElementsByClassName('card-element')
    element[0].src = immagine
    element[1].innerHTML = titolo
    element[2].innerHTML = descrizione.length > 30 ? descrizione.substring(0, 30) + '...' : descrizione
    clone.classList.remove('d-none')
    card.after(clone)
}

function caricaStorie(infos) {
    console.log(infos)
    fumetti = infos.items
    len = infos.returned
    if (len == 0) {
        document.getElementById('card-storie').style.color = 'white'
        document.getElementById('card-storie').innerHTML = 'Non sono presenti storie'
        return
    }
    if (infos.returned > 5) {
        len = 5
    }
    for (i = 0; i < len; i++) {
        url = fumetti[i].resourceURI + ''
        getFromMarvelUrlCompleto(url)
            .then(result => { if (result.code == 200) { visualizzaStorie(result.data.results[0]) } })
    }
}

function visualizzaStorie(ar) {
    immagine = ar.thumbnail != null ? ar.thumbnail.path + '.' + ar.thumbnail.extension : 'image_not_available.jpg'
    titolo = ar.title
    descrizione = ar.description == null ? '' : ar.description
    card = document.getElementById('card-storie')
    card.classList.add('d-none')
    clone = card.cloneNode(true)
    element = clone.getElementsByClassName('card-element')
    element[0].src = immagine
    element[1].innerHTML = titolo
    element[2].innerHTML = descrizione.length > 30 ? descrizione.substring(0, 30) + '...' : descrizione
    clone.classList.remove('d-none')
    card.after(clone)
}

function caricaEventi(infos) {
    fumetti = infos.items
    len = infos.returned
    if (len == 0) {
        document.getElementById('card-eventi').style.color = 'white'
        document.getElementById('card-eventi').innerHTML = 'Non sono presenti eventi'
        return
    }
    if (infos.returned > 5) {
        len = 5
    }
    for (i = 0; i < len; i++) {
        url = fumetti[i].resourceURI + ''
        getFromMarvelUrlCompleto(url)
            .then(result => { if (result.code == 200) { visualizzaEventi(result.data.results[0]) } })
    }
}

function visualizzaEventi(ar) {
    immagine = ar.thumbnail != null ? ar.thumbnail.path + '.' + ar.thumbnail.extension : 'image_not_available.jpg'
    titolo = ar.title
    descrizione = ar.description == null ? '' : ar.description
    card = document.getElementById('card-eventi')
    card.classList.add('d-none')
    clone = card.cloneNode(true)
    element = clone.getElementsByClassName('card-element')
    element[0].src = immagine
    element[1].innerHTML = titolo
    element[2].innerHTML = descrizione.length > 30 ? descrizione.substring(0, 30) + '...' : descrizione
    clone.classList.remove('d-none')
    card.after(clone)
}

function vediSupereroi(ar) {
    eroi = document.getElementById('eroi')
    document.getElementById('container-eroi').innerHTML = ''
    document.getElementById('container-eroi').append(eroi)
    for (i = 0; i < ar.length; i++) {
        eroe = ar[i]
        clone = eroi.cloneNode(true)
        elemento_card = clone.getElementsByClassName('card-element')
        immagine = elemento_card[0]
        titolo = elemento_card[1]
        descrizione = elemento_card[2]
        bottone = elemento_card[3]
        titolo.innerHTML = eroe.name
        immagine.src = eroe.thumbnail.path + '.' + eroe.thumbnail.extension
        descrizione.innerHTML = eroe.description == '' ? 'No description available.' : eroe.description
        bottone.href = '/hero_info.html?hero_id='+eroe.id
        clone.classList.remove('d-none')
        eroi.after(clone)
    }
}