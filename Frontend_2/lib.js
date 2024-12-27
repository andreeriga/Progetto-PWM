const base_address = "file:///C:/Users/randr/Desktop/PWM/Progetto-PWM/Frontend"
// const base_address = 'http://localhost:3000'
const publicApiKey = '8525e9ec8bcb62a34e6ed8ff14a55936'
const privateApiKey = '8a458cd9cd99475730a9b98f5f15a216f88a9161'

occhio_aperto = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye"viewBox="0 0 16 16"> <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" /><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" /></svg>'
occhio_chiuso = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16"><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/><path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/></svg>'
function vedi_password(testo, bottone) {
    if (testo.type == 'password') {
        bottone.innerHTML = occhio_chiuso
        testo.type = 'text'
    }
    else if (testo.type == 'text') {
        bottone.innerHTML = occhio_aperto
        testo.type = 'password'
    }

}

function getFromMarvel(url, query = "") {
    var MD5 = function (d) { var r = M(V(Y(X(d), 8 * d.length))); return r.toLowerCase() }; function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f } function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ } function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ } function Y(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) { var h = m, t = f, g = r, e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e) } return Array(m, f, r, i) } function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) } function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) } function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) } function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) } function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) } function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m } function bit_rol(d, _) { return d << _ | d >>> 32 - _ }
    var timestamp = Date.now();
    var parameters = `ts=${timestamp}&apikey=${publicApiKey}&hash=${MD5(timestamp + privateApiKey + publicApiKey)}&`

    return fetch(`http://gateway.marvel.com/v1/${url}?${parameters}${query}`)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}

function getFromMarvelUrlCompleto(url, query = "") {
    var MD5 = function (d) { var r = M(V(Y(X(d), 8 * d.length))); return r.toLowerCase() }; function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f } function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ } function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ } function Y(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) { var h = m, t = f, g = r, e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e) } return Array(m, f, r, i) } function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) } function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) } function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) } function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) } function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) } function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m } function bit_rol(d, _) { return d << _ | d >>> 32 - _ }
    var timestamp = Date.now();
    var parameters = `ts=${timestamp}&apikey=${publicApiKey}&hash=${MD5(timestamp + privateApiKey + publicApiKey)}&`

    return fetch(`${url}?${parameters}${query}`)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}

function controllaPassword(psw) {
    /// manca il controllo della correttezza della password
}

function heroesPreferiti(heroes) {
    list = document.getElementById('select-hero')
    node = document.getElementsByClassName('list-group-item')[0]
    list.innerHTML = ''
    list.append(node)
    for (i = 0; i < heroes.length; i++) {
        clone = node.cloneNode(true)
        var nome = heroes[i].name
        clone.innerHTML = nome
        clone.classList.remove('d-none')
        node.after(clone)
    }
}

function rendiAttivo(questo, altro1, vedi) {
    questo.classList.add('active')
    altro1.classList.remove('active')
    desc = ''
    id_preferito = localStorage.getItem('preferito_id')
    getFromMarvel('/public/characters/' + id_preferito)
        .then(results => { desc = results.data.results[0].description })
    div_immagine = document.getElementById('immagine_storia_o_serie')
    if (vedi) {
        document.getElementById('testo-descrizione').classList.add('d-none')
        document.getElementById('bottone-informazioni').classList.remove('d-none')
        div_immagine.classList.remove('d-none')
        immagine = div_immagine.getElementsByClassName('immagine')
        getFromMarvel('/public/characters/' + id_preferito + '/series', query = 'limit=3')
            .then(result => {
                // thumbnail = result.data.results[0].thumbnail
                // immagine.src = thumbnail.path +'.'+ thumbnail.extension
                for (j = 0; j < 3; j++) {
                    thumbnail = result.data.results[j].thumbnail
                    immagine[j].src = thumbnail.path + '.' + thumbnail.extension
                }
            })
    } else {
        if (desc != '') {
            document.getElementById('testo-descrizione').innerHTML = desc
        } else {
            document.getElementById('testo-descrizione').innerHTML = 'Questo personaggio non ha una descrizione'
        }
        document.getElementById('bottone-informazioni').classList.add('d-none')
        document.getElementById('testo-descrizione').classList.remove('d-none')
        div_immagine.classList.add('d-none')
    }
}

function display(result, serie) {
    console.log(result)
    where = document.getElementsByClassName('carousel-caption')[0]
    if (serie) {
        series = result.series
        displayImagesAndTextDescription(series)
    } else {
        stories = result.stories
        displayImagesAndTextDescription(stories)
    }

}

function updateInfos(preferito, nome, cognome) {
    image = document.getElementById('card-preferito')
    document.getElementById('benvenuto').innerHTML += " " + nome + ' ' + cognome
    getFromMarvel('/public/characters/' + preferito)
        .then(result => {
            datas = result.data.results[0]
            path = datas.thumbnail.path
            ext = datas.thumbnail.extension
            image.src = path + '.' + ext
        })
}

function getInfos() {
    fetch('http://localhost:3000/users/' + localStorage.getItem('id'))
        .then(response => response.json())
        .then(response => updateInfos(response.infos.preferito, response.infos.nome, response.infos.cognome))
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
    descrizione = ar.description.length > 29 ? ar.description.substring(0, 30) + '...' : ar.description
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

function setFigurineId() {
    limite = 100
    offset = 0
    getFromMarvel('/public/characters', query = 'limit=1')
        .then(response => {
            var totale = response.data.total
            var eroi = []
            while (offset + limite <= totale) {
                getFromMarvel('/public/characters', query = 'limit=100&offset=' + offset)
                    .then(response => {
                        for (i = 0; i < response.data.results.length; i++) {
                            eroi.push(response.data.results[i].id)
                        }
                        localStorage.setItem('tutti_eroi', JSON.stringify(eroi))
                    })
                offset += 100
            }
        })
    }

function estraiFigurine(numero_figurine) {
    eroi = JSON.parse(localStorage.getItem("tutti_eroi"))
    numero_eroi = eroi.length
    var estratti = []
    for (i = 0 ; i<numero_figurine ; i++) {
        estratti.push(eroi[Math.floor(Math.random()*numero_eroi)])
    }
    return estratti
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
        bottone.href = base_address + '/info_eroe.html?heroe='+eroe.id
        clone.classList.remove('d-none')
        eroi.after(clone)
    }
}