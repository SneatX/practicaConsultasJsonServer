import {
    getEmployeeByCode
} from "./employees.js"

import {
    getOfficeByCode
} from "./offices.js"

import { getAllPaymentsForClient } from "./payments.js"

import {
    getRetardedDeliveries,
    getAllClientsWhoRequest
} from "./requests.js"


//Obtener todos los clientes
export const getAllClients = async () => {
    let res = await fetch(`http://localhost:5501/clients`);
    let data = await res.json();
    return data;
}

//Obtener cliente por codigo
export const getClientByCode = async (codigo) => {
    let res = await fetch(`http://localhost:5501/clients?client_code=${codigo}`)
    let cliente = await res.json()
    return cliente
}

//6. Devuelve un listado con el nombre de los todos los clientes españoles.
export const getClientsNameFromSpain = async () => {
    let res = await fetch("http://localhost:5501/clients?country=Spain")
    let data = await res.json()
    let dataUpdate = data.map(cliente => cliente.client_name)

    return dataUpdate
}

//16. Devuelve un listado con todos los clientes que sean de la ciudad de Madrid y cuyo representante de ventas tenga el código de empleado 11 o 30.
export const getAllClientsFromMadridWithManagerCode11or30 = async () => {
    let res = await fetch("http://localhost:5501/clients?city=Madrid")
    let data = await res.json()

    let dataUpdate = data.filter(cliente => {
        if (cliente.code_employee_sales_manager === 11 || cliente.code_employee_sales_manager === 30) {
            return cliente
        }
    })
    return dataUpdate
}

//----------Consultas multitabla (Composición interna)----------//
//1. Obtén un listado con el nombre de cada cliente y el nombre y apellido de su representante de ventas.

export const getAllNameOfClientAndManager = async () => {
    let res = await fetch("http://localhost:5501/clients")
    let dataClientes = await res.json()

    let listaClientes = dataClientes.map(async (cliente) => {
        let [dataEmployee] = await getEmployeeByCode(cliente.code_employee_sales_manager)
        let dicc = {
            client_name: cliente.client_name,
            manager_name: dataEmployee.name,
            manager_lastnames: `${dataEmployee.lastname1} ${dataEmployee.lastname2}`
        }
        return dicc
    });
    listaClientes = await Promise.all(listaClientes);
    return listaClientes
}

//2. Muestra el nombre de los clientes que hayan realizado pagos junto con el nombre de sus representantes de ventas.

export const getClientsWithPaymentsNameAndManagerNames = async () => {
    let pagos = await fetch("http://localhost:5506/payments")
    let dataPagos = await pagos.json()
    let codigosClientes = new Set()
    let clientesConPagos = []
    for (let i = 0; i < dataPagos.length; i++) {
        let pago = dataPagos[i]
        codigosClientes.add(pago.code_client)
    }

    for (let i of codigosClientes) {
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

export const getAllClientsNameAndManagerNameWithoutPayments = async () => {
    let resPagos = await fetch("http://localhost:5506/payments")
    let dataPagos = await resPagos.json()
    let codClientesConPago = new Set()
    let clientesSinPago = []

    for (let pago of dataPagos) {
        codClientesConPago.add(pago.code_client)
    }

    let dataClientes = await (await fetch("http://localhost:5501/clients")).json()

    for (let cliente of dataClientes) {
        if (!codClientesConPago.has(cliente.client_code)) {
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

export const getAllClientsNameManagerNameAndCityIfHavePayments = async () => {
    let resPagos = await (await fetch("http://localhost:5506/payments")).json()
    let codigosClientes = new Set()
    let data = []

    for (let pago of resPagos) {
        codigosClientes.add(pago.code_client)
    }

    for (let codCliente of codigosClientes) {
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

export const getAllClientsNameManagerNameAndCityIfNotHavePayments = async () => {
    let resPagos = await fetch("http://localhost:5506/payments")
    let dataPagos = await resPagos.json()
    let codClientesConPago = new Set()
    let clientesSinPago = []

    for (let pago of dataPagos) {
        codClientesConPago.add(pago.code_client)
    }

    let dataClientes = await (await fetch("http://localhost:5501/clients")).json()

    for (let cliente of dataClientes) {
        if (!codClientesConPago.has(cliente.client_code)) {
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

// 6. Lista la dirección de las oficinas que tengan clientes en `Fuenlabrada`
export const getAllClientsInFuenlabrada = async () => {
    let res = await fetch("http://localhost:5501/clients?city=Fuenlabrada")
    let data = await res.json();
    return data;
}

// 7. Devuelve el nombre de los clientes y el nombre de sus representantes junto con la ciudad de la oficina a la que pertenece el representante.
export const getClientsEmploy = async () => {
    let res = await fetch("http://localhost:5501/clients");
    let clients = await res.json();
    for (let i = 0; i < clients.length; i++) {
        let {
            client_code,
            contact_name,
            contact_lastname,
            phone,
            fax,
            address1: address1Client,
            address2: address2Client,
            city,
            region: regionClients,
            country: countryClients,
            postal_code: postal_codeClients,
            limit_credit,
            id: idClients,
            ...clientsUpdate
        } = clients[i];

        let [employ] = await getEmployeeByCode(clientsUpdate.code_employee_sales_manager)
        let {
            extension,
            email,
            code_boss,
            position,
            id: idEmploy,
            name,
            lastname1,
            lastname2,
            employee_code,
            ...employUpdate
        } = employ

        let [office] = await getOfficeByCode(employUpdate.code_office)

        let {
            country: countryOffice,
            region: regionOffice,
            postal_code: postal_codeOffice,
            movil,
            address1: address1Office,
            address2: address2Office,
            id: idOffice,
            ...officeUpdate
        } = office


        let data = { ...clientsUpdate, ...employUpdate, ...officeUpdate };
        let {
            code_employee_sales_manager,
            code_office,
            ...dataUpdate
        } = data;

        dataUpdate.name_employee = `${name} ${lastname1} ${lastname2}`
        clients[i] = dataUpdate
    }
    return clients;
}

// 10. Devuelve el nombre de los clientes a los que no se les ha entregado a tiempo un pedido.

export const getRetardedDeliveryClients = async () => {
    let res = await fetch("http://localhost:5501/clients")
    let data = await res.json();
    let res2 = await getRetardedDeliveries();
    let verificador = []
    let result = []
    res2.forEach(val => {
        data.forEach(val2 => {
            if (val.code_client == val2.client_code) {
                if (!verificador.includes(val.code_client)) {
                    verificador.push(val.code_client)
                }
            }

        })
    })

    data.forEach(val => {
        verificador.forEach(val2 => {
            if (val.client_code == val2) {
                result.push({
                    client_name: val.client_name,
                    client_code: val.client_code
                })
            }
        })
    })
    return result
}

// 11. Devuelve un listado de las diferentes gamas de producto que ha comprado cada cliente.

export const getAllProductGamaThatAClientRequest = async () => {
    let res = await fetch(`http://localhost:5501/clients`)
    let data = await res.json();
    let dataUpdate = [];
    for (let i = 0; i < data.length; i++) {
        let [requests] = await getAllClientsWhoRequest(data[i].client_code);
        let gamas = []
        if (requests != undefined) {
            let { ...requestsUpdate } = requests;
            let { ...clientUpdate } = data[i];
            data[i] = clientUpdate;
            for (let j = 0; j < requests.length; j++) {
                let [request_details] = await getAllRequestDetailsByRequestCode(requests[j].code_request);
                let { ...request_detailsUpdate } = request_details;
                for (let k = 0; k < request_details.length; k++) {
                    let [product] = await getProductsByCode(request_details[k].product_code);
                    let { ...productUpdate } = product;
                    for (let l = 0; l < product.length; l++) {
                        let exists = gamas.some(item => item.gama === product[l].gama);
                        if (!exists) {
                            gamas.push({
                                gama: product[l].gama
                            })
                        }
                    }
                }
            }

            let arrayFusionado = { ...clientUpdate, gamas };
            dataUpdate.push({
                client_name: `${arrayFusionado.client_name}`,
                gamas: arrayFusionado.gamas
            });
        }
    }
    return dataUpdate;
}

//----------Consultas multitabla (Composición externa)----------//

// 1. Devuelve un listado que muestre solamente los clientes que no han realizado ningún pago.

export const getAllClientsWhoHaventPaid = async () => {
    let res = await fetch(`http://localhost:5501/clients`)
    let data = await res.json();
    let dataClient = [];
    for (let i = 0; i < data.length; i++) {
        let [payments] = await getAllPaymentsForClient(data[i].client_code);
        if (payments === undefined) {
            dataClient.push(data[i]);
        }
    }
    return dataClient;
}

//2. Devuelve un listado que muestre solamente los clientes que no han realizado ningún pedido.

export const getAllClientsWhoHaventRequest = async () => {
    let res = await fetch(`http://localhost:5501/clients`)
    let data = await res.json();
    let dataClient = [];
    for (let i = 0; i < data.length; i++) {
        let [requests] = await getAllClientsWhoRequest(data[i].client_code);
        if (requests === undefined) {
            dataClient.push(data[i]);
        }
    }
    return dataClient;
}


// 3. Devuelve un listado que muestre los clientes que no han realizado ningún pago y los que no han realizado ningún pedido.

export const getAllClientsWhoHaventPaidAndRequest = async () => {
    let res = await fetch("http://localhost:5501/clients")
    let data = await res.json();
    let dataClient = [];
    for (let i = 0; i < data.length; i++) {
        let [requests] = await getAllClientsWhoRequest(data[i].client_code)
        let [payments] = await getAllPaymentsForClient(data[i].client_code);
        if (requests === undefined && payments === undefined) {
            dataClient.push(data[i]);
        }
    }
    return dataClient;
}

//11. Devuelve un listado con los clientes que han realizado algún pedido pero no han realizado ningún pago.

export const getAllClientsWhoHaveRequestedButHaventPaid = async () => {
    let res = await fetch(`http://localhost:5501/clients`)
    let data = await res.json();
    let dataClient = [];
    for (let i = 0; i < data.length; i++) {
        let [payments] = await getAllPaymentsForClient(data[i].client_code);
        let [requests] = await getAllClientsWhoRequest(data[i].client_code);
        if (payments === undefined && requests != 0) {
            dataClient.push(data[i]);
        }
    }
    return dataClient;
}