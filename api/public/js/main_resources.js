(() => {

    const rootMain = window.location.pathname.split("/").splice(-1)[0]

    sidebar.innerHTML = /* html */`
        <nav class="navbar bg-light navbar-light">
            <a href="/" class="navbar-brand mx-4 mb-3">
                <h3 class="text-primary"><i class="fa fa-hashtag me-2"></i>ALAS</h3>
            </a>
            <div class="d-flex align-items-center ms-4 mb-4">
                <div class="position-relative">
                    <img class="rounded-circle" src="img/user.jpg" alt="" style="width: 40px; height: 40px;">
                    <div
                        class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1">
                    </div>
                </div>
                <div class="ms-3">
                    <h6 class="mb-0">Jhon Doe</h6>
                    <span>Admin</span>
                </div>
            </div>
            <div class="navbar-nav w-100">
                <a href="/" class="nav-item nav-link ${rootMain == "" ? "active" : ""}">
                    <i class="fa fa-tachometer-alt me-2"></i>
                    Panel de Control
                </a>
                <a href="/proccess" class="nav-item nav-link ${rootMain == "proccess" ? "active" : ""}"><i class="fa fa-th me-2"></i>Esquema</a>
                <a href="form.html" class="nav-item nav-link"><i class="fa fa-keyboard me-2"></i>Forms</a>
                <a href="table.html" class="nav-item nav-link"><i class="fa fa-table me-2"></i>Tables</a>
                <a href="chart.html" class="nav-item nav-link"><i class="fa fa-chart-bar me-2"></i>Charts</a>
            </div>
        </nav>`;
})()