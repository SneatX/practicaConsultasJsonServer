//Obtener empleado por codigo
export const getEmployeeByCode =  async(codigo) =>{
    let res = await fetch(`http://localhost:5503/employee?employee_code=${codigo}`)
    let cliente = await res.json()

    return cliente
}

//3. Devuelve un listado con el nombre, apellidos y email de los empleados cuyo jefe tiene un código de jefe igual a 7.
export const getFullNameAndEmails = async ()=>{
    let res = await fetch("http://localhost:5503/employee?code_boss=7")
    let data = await res.json()
    let dataUpdate = data.map(item => {
        return{
            name : item.name,
            fullLastName : `${item.lastname1} ${item.lastname2}`,
            email: item.email.match(/(?<=\[)[^\[\]]+@[^@\[\]]+(?=\])/)[0]
        }
    })

    return dataUpdate
}

//4. Devuelve el nombre del puesto, nombre, apellidos y email del jefe de la empresa.
export const getFullNameAndEmailBoss = async (e) =>{
    let res = await fetch("http://localhost:5503/employee")
    let data = await res.json()
    let dataUpdate = []
    data.forEach(empleado => {
        if(empleado.code_boss === null){
            dataUpdate.push({
                position: empleado.position,
                name: empleado.name,
                lastname: `${empleado.lastname1} ${empleado.lastname2}`,
                email: empleado.email.match(/(?<=\[)[^\[\]]+@[^@\[\]]+(?=\])/)[0]
            })
        }
    });


    return dataUpdate
}

//5.Devuelve un listado con el nombre, apellidos y puesto de aquellos empleados que no sean representantes de ventas.

export const getFullNameIfNotRepresentanteVentas = async (e) =>{
    let res = await fetch("http://localhost:5503/employee?position_ne=Representante Ventas")
    let data = await res.json()
    let dataUpdate = []
    data.forEach(empleado =>{
        dataUpdate.push({
            name: empleado.name,
            lastname: `${empleado.lastname1} ${empleado.lastname2}`,
            position: empleado.position
        })
    })

    return dataUpdate
} 