//Obtener cliente por codigo
export const getClientByCode =  async(codigo) =>{
    let res = await fetch(`http://localhost:5501/clients?client_code=${codigo}`)
    let cliente = await res.json()
    return cliente
}

//Obtener cliente por codigo
export const getEmployeeByCode =  async(codigo) =>{
    let res = await fetch(`http://localhost:5503/employee?employee_code=${codigo}`)
    let cliente = await res.json()

    return cliente
}

//6. Devuelve un listado con el nombre de los todos los clientes españoles.
export const getClientsNameFromSpain = async()=>{
    let res = await fetch("http://localhost:5501/clients?country=Spain")
    let data = await res.json()
    let dataUpdate = data.map(cliente => cliente.client_name)

    return dataUpdate
}

//16. Devuelve un listado con todos los clientes que sean de la ciudad de Madrid y cuyo representante de ventas tenga el código de empleado 11 o 30.
export const getAllClientsFromMadridWithManagerCode11or30 = async()=>{
    let res = await fetch("http://localhost:5501/clients?city=Madrid")
    let data = await res.json()

    let dataUpdate = data.filter(cliente =>{
        if(cliente.code_employee_sales_manager === 11 || cliente.code_employee_sales_manager === 30){
            return cliente
        }
    })
    return dataUpdate
}

//----------Consultas multitabla (Composición interna)----------//
//1. Obtén un listado con el nombre de cada cliente y el nombre y apellido de su representante de ventas.

export const getAllNameOfClientAndManager = async() =>{
    let res = await fetch("http://localhost:5501/clients")
    let dataClientes = await res.json()

    let listaClientes = dataClientes.map(async (cliente) => {
        let [dataEmployee] = await getEmployeeByCode(cliente.code_employee_sales_manager)
        console.log(dataEmployee)
        let dicc = {
            client_name:cliente.client_name,
            manager_name: dataEmployee.name,
            manager_lastnames: `${dataEmployee.lastname1} ${dataEmployee.lastname2}`
        }
        return dicc
    });
    listaClientes = await Promise.all(listaClientes);
    return listaClientes
}