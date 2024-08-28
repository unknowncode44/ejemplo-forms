
const url = "../assets/docs/students.json"
const overlay = document.querySelector('.overlay')
const input = document.getElementById('input')

let studentsNames = []

async function getStudents() {
    let studentsArrayObj = []
    overlay.classList.add('active')
    try {
        const response = await fetch(url)
        studentsArrayObj = await response.json()
        return studentsArrayObj
    } catch (error) {
        console.error(error)
    }
}


getStudents()
.then((objArray) => {
    // recorro el array de objetos y extraigo el nombre
    for (let i = 0; i < objArray.length; i++) {
        const e = objArray[i];
        //  y lo agrego al array de nombres
        studentsNames.push(e.nombre)
    }
})
.then(() => {
    // ordeno el array de nombres
    let sortedNames = studentsNames.sort()

    input.addEventListener("keyup", (e) => {

        removeNames()

        for(i of sortedNames) {

            if((i.toLowerCase().startsWith(input.value.toLowerCase())) && input.value != "") {
                let listItem = document.createElement("li")
                listItem.classList.add("list-item")
                listItem.style.cursor = "pointer"
                listItem.setAttribute("onclick", "displayNames('" + i + "')")
    
                let word = "<b>" + i.substr(0, input.value.length) + "</b>";
                word += i.substr(input.value.length)
    
                listItem.innerHTML = word
    
                document.querySelector(".list").appendChild(listItem)
            } 
        }

    })

    setTimeout(() => {
        overlay.classList.remove('active')
    },500)
})

function displayNames(value) {
    input.value = value
    removeNames()
}


function removeNames() {
    let items = document.querySelectorAll(".list-item")

    items.forEach((item) => {
        item.remove()
    })
}

