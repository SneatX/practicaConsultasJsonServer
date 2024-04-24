//7. Devuelve un listado con los distintos estados por los que puede pasar un pedido.
export const getAllPosibleRequestsStatus = async() =>{
    let res = await fetch("http://localhost:5507/requests")
    let data = await res.json()

    let posiblesPedidos = []

    data.forEach(pedido => {
        if(!posiblesPedidos.includes(pedido.status)){
            posiblesPedidos.push(pedido.status)
        }
    });
    return posiblesPedidos
}

//8. Devuelve un listado con el código de cliente de aquellos clientes que realizaron algún pago en 2008. Tenga en cuenta que deberá eliminar aquellos códigos de cliente que aparezcan repetidos. Resuelva la consulta:
export const getClientCodeIfPayInYear = async(year) =>{
    let res = await fetch("http://localhost:5507/requests")
    let data = await res.json()

    let clientsCode = []

    data.forEach(pedido => {
        let fecha = pedido.date_request
        fecha = fecha.split("-")
        let [año] = fecha
        if(año === "2008"){
            !clientsCode.includes(pedido.code_client) ? clientsCode.push(pedido.code_client): clientsCode
        }
    });

    return clientsCode
}