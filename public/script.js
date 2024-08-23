const url = "../assets/docs/students.json"
const overlay = document.querySelector('.overlay')
const input = document.getElementById('input')

let studentsArrayObj = []
let studentsNames = []

async function getStudents() {
    overlay.classList.add('active')
    try {
        const response = await fetch(url)
        studentsArrayObj = await response.json()
        
    } catch (error) {
        console.error(error)
    }
}


getStudents()
.then(() => {
    console.log(studentsArrayObj)
    // recorro el array de objetos y extraigo el nombre
    for (let i = 0; i < studentsArrayObj.length; i++) {
        const e = studentsArrayObj[i];
        //  y lo agrego al array de nombres
        studentsNames.push(e.nombre)
    }

})
.then(() => {
    // ordeno el array de nombres
    let sortedNames = studentsNames.sort()



    setTimeout(() => {
        overlay.classList.remove('active')
    },500)
})