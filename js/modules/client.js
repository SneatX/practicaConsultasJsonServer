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
