(() => {


    const getUser = async () => {
        const data = await fetch('/user')
        const dataJson = await data.json()

        dataJson.forEach(element => {
            contenRowUser.innerHTML += /*html*/`<tr>
                <td><input class="form-check-input" type="checkbox"></td>
                <td>${element.name}</td>
                <td>${element.email}</td>
                <td>${element.boss}</td>
                <td>${element.appointment}</td>
                <td>Active</td>
                <td><a class="btn btn-sm btn-primary" href="">Delete</a></td>
            </tr>`
        })
    }

    createUser.addEventListener("click", async (e) => {
        e.preventDefault()

        const data = await fetch('/createUser', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: inputNombre.value,
                email: inputEmail.value,
                password: inputPassword.value,
                type: false,
            }),
        })
    })

    const myChart7 = new Chart(userCreateChart, {
        type: "line",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [{
                label: "Central",
                data: [15, 30, 55, 65, 60, 80, 95],
                backgroundColor: "rgba(230, 66, 53, .7)",
                fill: true
            },
            {
                label: "Coban",
                data: [8, 35, 40, 60, 70, 55, 75],
                backgroundColor: "rgba(230, 66, 53, .5)",
                fill: true
            },
            {
                label: "Quetzaltenango",
                data: [12, 25, 45, 55, 65, 70, 60],
                backgroundColor: "rgba(230, 66, 53, .3)",
                fill: true
            },
            {
                label: "Suchitepequez",
                data: [12, 25, 45, 55, 65, 70, 60],
                backgroundColor: "rgba(230, 66, 53, .3)",
                fill: true
            },
            {
                label: "Peten",
                data: [12, 25, 45, 55, 65, 70, 60],
                backgroundColor: "rgba(230, 66, 53, .3)",
                fill: true
            }
            ]
        },
        options: {
            responsive: true
        }
    })

    const contentEsquema = document.querySelector(".containerGlobalEsquema")

    buttomStartProcess.addEventListener("click", () => {
        contentEsquema.innerHTML = /* html */ `
            <div style="width: 100%; height: auto; background-color: antiquewhite; padding: 60px;">
                <div style="width: 100%; height: 50px; background-color: chartreuse;">
                    <button class="buttonMoreCompetences" >Mas Competencias</button>
                </div>
                <div class="contentItemEsquema" style="display: flex; flex-wrap: wrap; width: 100%; height: auto; background-color: yellow;">
                    
                </div>
            </div>
            <div style="width: 100%; height: 300px; background-color: burlywood;">
                <button class="moreValues">Mas Valores</button>
                <div class="contentmoreValues">
                </div>
                <button class="buttonSubmitArray">Enviar Esquemas</button>
            </div>
        `
    })

    contentEsquema.addEventListener("click", async (e) => {
        if (e.target.className == "buttonMoreCompetences") {
            const contentMoreEsquema = document.querySelector(".contentItemEsquema")
            contentMoreEsquema.insertAdjacentHTML("beforeend", `
                <div class="rootEsquema" style="width: 50%; height: 300px; background-color: aquamarine;">
                    <input type="text" placeholder="Nombre Competencia">
                    <button class="buttonMoreAnswer">Mas Preguntas</button>
                    <div style="width: 100%; height: 50px;">
                    </div>
                </div>
            `)
        }

        if (e.target.className == "buttonMoreAnswer") {
            e.target.parentElement.children[2].insertAdjacentHTML("beforeend", `<input type="text">`)
        }

        if (e.target.className == "moreValues") {
            const contentItemValues = document.querySelector(".contentmoreValues")
            contentItemValues.insertAdjacentHTML("beforeend", `<input class="valueitemScale" type="text">`)
        }

        if (e.target.className == "buttonSubmitArray") {

            const rootItemEsquema = document.querySelectorAll(".rootEsquema")
            const valuesScale = document.querySelectorAll(".valueitemScale")
            let listCompetences = []
            let listAnswer = []
            let listScaleValues = []

            rootItemEsquema.forEach((element) => {
                listCompetences = [...listCompetences, element.children[0].value]
                const valueAnswer = element.children[2].children
                let partialAnswer = []

                for (let index = 0; index < valueAnswer.length; index++) {
                    partialAnswer = [...partialAnswer, valueAnswer[index].value]
                }
                listAnswer = [...listAnswer, partialAnswer]
            })


            valuesScale.forEach((element) => {
                listScaleValues = [...listScaleValues, element.value]
            })



            const dataProccess = await fetch('/proccesCreateSchema', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "nameProccess": "Processo 2025",
                    "yearProccess": 2025,
                    "competencess": listCompetences,
                    "answers": listAnswer,
                    "scaleValues": listScaleValues
                }),
            })


        }
    })

    buttonStartConnection.addEventListener("click", () => {
        containerInputConnection.innerHTML = /* html */`
            <div style="width: 50%; height: 200px; background-color: steelblue;">
                <input type="text" class="connectionCorreo" placeholder="correo de usuario 1">
                <input type="text" class="connectionPuesto" placeholder="Puesto Actual">
                <input type="text" class="connectionJefe" placeholder="Jefe Inmediato">
            </div>
            <div style="width: 50%; height: 200px; background-color: palegreen;">
                <button id="addUserValuate" class="addUserValuateid">Agregar Relacion</button>
                <div id="containerNameRelacion" style="width: 100%; height: 100px; background-color: tomato;">
                </div>
            </div>
        `
        const addUserValuateId = document.querySelector(".addUserValuateid")

        addUserValuateId.addEventListener("click", () => {
            const containerNameRelacionid = document.querySelector("#containerNameRelacion")
            containerNameRelacionid.insertAdjacentHTML("beforeend", /* html */`
            <input class="inputCalificator" type="text" placeholder="Nombre de Calificador">
            `)
        })


    })

    buttonSaveConnection.addEventListener("click", async () => {

        const userCalificate = document.querySelectorAll(".inputCalificator")
        let listUserCalificated = []

        const connectionCorreo = document.querySelector(".connectionCorreo")
        const connectionPuesto = document.querySelector(".connectionPuesto")
        const connectionJefe = document.querySelector(".connectionJefe")


        for (let index = 0; index < userCalificate.length; index++) {
            listUserCalificated = [...listUserCalificated, userCalificate[index].value]
        }

        const listMapUser = listUserCalificated.map((element) => {
            return {
                status: false,
                name: element
            }
        })


        const dataProccess = await fetch('/connectionSchema', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "nameUser": connectionCorreo.value,
                "bossUser": connectionJefe.value,
                "appointmentUser": connectionPuesto.value,
                "nameProccess": "Processo 2025",
                "yearProccess": 2025,
                "relations": listMapUser,
                "data": [],
                "accion": []
            }),
        })

    })

    const getSchema = async () => {
        const dataProccess = await fetch('/proccesFindOneSchema', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "nameProccess": "Processo 2025",
                "yearProccess": 2025,
            }),
        })

        localStorage.setItem("myschema", JSON.stringify(await dataProccess.json()))

        console.log(JSON.parse(localStorage.getItem("myschema")))

    }








    window.addEventListener("load", (e) => {
        // getSchema()
        // getUser()
    })

})()