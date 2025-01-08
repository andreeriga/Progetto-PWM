// navbar.js
document.addEventListener("DOMContentLoaded", function () {
    const navbar = `
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand mx-2" href="index.html">
                <img src="/Utils/images/scudo.svg" height="30" width="30">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link logged" aria-current="page" href="modifica_password.html">Modifica password</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link logged" href="raccoglitore.html">Raccoglitore</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="figurine.html">Figurine</a>
                    </li>
                    <li class="nav-item dropdown ">
                        <a class="nav-link dropdown-toggle logged" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Scambi
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="aggiungi_scambio.html">Nuovo</a></li>
                            <li><a class="dropdown-item" href="scambi_disponibili.html">Disponibili</a></li>
                            <li><a class="dropdown-item" href="scambi_sospesi.html">In sospeso</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown ">
                        <a class="nav-link dropdown-toggle logged" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Acquisto
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="acquisto_crediti.html">Crediti</a></li>
                            <li><a class="dropdown-item" href="acquisto_figurine.html">Figurine</a></li>
                        </ul>
                    </li>
                </ul>
                <form class="d-flex d-none" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                <button type="button" class="btn btn-outline-warning me-2" id="credit-button" disabled>
                    <script>
                        document.write(localStorage.getItem('crediti'))
                    </script>
                </button>
                <button class="btn btn-outline-primary d-none me-2" onclick="window.location.href = '/login.html'" id="login-button">Login</button>
                <button class="btn btn-outline-danger" onclick="window.location.href = '/login.html'" id="logout-button">Logout</button>
            </div>
        </div>
    </nav>
    `;
    document.body.insertAdjacentHTML('afterbegin', navbar);
});

