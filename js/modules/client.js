import {
    getEmployeeByCode
} from "./employees.js"

import {
    getOfficeByCode
} from "./offices.js"

//Obtener cliente por codigo
export const getClientByCode =  async(codigo) =>{
    let res = await fetch(`http://localhost:5501/clients?client_code=${codigo}`)
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

//2. Muestra el nombre de los clientes que hayan realizado pagos junto con el nombre de sus representantes de ventas.

export const getClientsWithPaymentsNameAndManagerNames = async() =>{
    let pagos = await fetch("http://localhost:5506/payments")
    let dataPagos = await pagos.json()
    let codigosClientes = new Set()
    let clientesConPagos = []
    for(let i = 0; i < dataPagos.length; i++){
        let pago = dataPagos[i]
        codigosClientes.add(pago.code_client)
    }

    for(let i of codigosClientes){
        let [cliente] = await getClientByCode(i)
        let [empledo] = await getEmployeeByCode(cliente.code_employee_sales_manager)
        clientesConPagos.push({
            client_name: cliente.client_name,
            employee_fullname: `${empledo.name} ${empledo.lastname1} ${empledo.lastname2}`
        })
    }

    return clientesConPagos
}

// 3. Muestra el nombre de los clientes que **no** hayan realizado pagos junto con el nombre de sus representantes de ventas.

export const getAllClientsNameAndManagerNameWithoutPayments = async() =>{
    let resPagos = await fetch("http://localhost:5506/payments")
    let dataPagos = await resPagos.json()
    let codClientesConPago = new Set()
    let clientesSinPago = []

    for(let pago of dataPagos){
        codClientesConPago.add(pago.code_client)
    }

    let dataClientes = await(await fetch("http://localhost:5501/clients")).json()

    for(let cliente of dataClientes){
        if(!codClientesConPago.has(cliente.client_code)){
            let [empledo] = await getEmployeeByCode(cliente.code_employee_sales_manager)
            clientesSinPago.push({
                client_name: cliente.client_name,
                employee_fullname: `${empledo.name} ${empledo.lastname1} ${empledo.lastname2}`
            })
        }
    }

    return clientesSinPago
}

// 4. Devuelve el nombre de los clientes que han hecho pagos y el nombre de sus representantes junto con la ciudad de la oficina a la que pertenece el representante.

export const getAllClientsNameManagerNameAndCityIfHavePayments = async () =>{
    let resPagos = await(await fetch("http://localhost:5506/payments")).json()
    let codigosClientes = new Set()
    let data = []

    for(let pago of resPagos){
        codigosClientes.add(pago.code_client)
    }

    for(let codCliente of codigosClientes){
        let [cliente] = await getClientByCode(codCliente)
        let [manager] = await getEmployeeByCode(cliente.code_employee_sales_manager)
        let [oficina] = await getOfficeByCode(manager.code_office)
        data.push({
            client_name: cliente.client_name,
            employee_fullname: `${manager.name} ${manager.lastname1} ${manager.lastname2}`,
            employee_city: oficina.city
        })
    }
    return data
}

// 5. Devuelve el nombre de los clientes que **no** hayan hecho pagos y el nombre de sus representantes junto con la ciudad de la oficina a la que pertenece el representante.

export const getAllClientsNameManagerNameAndCityIfNotHavePayments = async () =>{
    let resPagos = await fetch("http://localhost:5506/payments")
    let dataPagos = await resPagos.json()
    let codClientesConPago = new Set()
    let clientesSinPago = []

    for(let pago of dataPagos){
        codClientesConPago.add(pago.code_client)
    }

    let dataClientes = await(await fetch("http://localhost:5501/clients")).json()

    for(let cliente of dataClientes){
        if(!codClientesConPago.has(cliente.client_code)){
            let [empledo] = await getEmployeeByCode(cliente.code_employee_sales_manager)
            let [oficina] = await getOfficeByCode(empledo.code_office)
            clientesSinPago.push({
                client_name: cliente.client_name,
                employee_fullname: `${empledo.name} ${empledo.lastname1} ${empledo.lastname2}`,
                employee_city: oficina.city
            })
        }
    }

    return clientesSinPago
}