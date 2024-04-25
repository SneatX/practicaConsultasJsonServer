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

//9. Devuelve un listado con el código de pedido, código de cliente, fecha esperada y fecha de entrega de los pedidos cuya fecha de entrega ha sido al menos dos días antes de la fecha esperada.
export const getOrderCodeClientCodeDateOfDelayedOrders = async() =>{
    let res = await fetch("http://localhost:5507/requests")
    let data = await res.json()

    let dataUpdate = data.filter(pedido =>{

        if(pedido.date_delivery != null){
            let fechaEsperada = pedido.date_wait
            fechaEsperada = fechaEsperada.split("-")
            fechaEsperada = new Date(fechaEsperada[0], fechaEsperada[1]-1, fechaEsperada[2])

            let fechaEntrega = pedido.date_delivery
            fechaEntrega = fechaEntrega.split("-")
            fechaEntrega = new Date(fechaEntrega[0], fechaEntrega[1]-1, fechaEntrega[2])

            if(fechaEntrega > fechaEsperada){
                return{
                    code_request: pedido.code_request,
                    code_client: pedido.code_client,
                    date_wait: pedido.date_wait,
                    date_delivery: pedido.date_delivery
                }
            }
        }
    })

    return dataUpdate
}

//10. Devuelve un listado con el código de pedido, código de cliente, fecha esperada y fecha de entrega de los pedidos cuya fecha de entrega ha sido al menos dos días antes de la fecha esperada.
export const getOrderCodeClientCodeDateOf2DaysBeforeDeploy = async() =>{
    let res = await fetch("http://localhost:5507/requests")
    let data = await res.json()

    let dataUpdate = data.filter(pedido =>{
        if(pedido.date_delivery != null){
            let [añoEsperado, mesEsperado, diaEsperado] = pedido.date_wait.split('-')
            let [añoLlegada, mesLlegada, diaLlegada]  = pedido.date_delivery.split('-')
            let fechaEsperada = new Date(añoEsperado, mesEsperado-1, diaEsperado)
            let fechaEntrega = new Date(añoLlegada, mesLlegada-1, diaLlegada)

            let diferencia = fechaEntrega-fechaEsperada
            diferencia = diferencia/(1000*3600*24)
            if(diferencia <= -2){
                return{
                    code_request: pedido.code_request,
                    code_client: pedido.code_client,
                    date_wait: pedido.date_wait,
                    date_delivery: pedido.date_delivery
                }
            }
        }
    })
    return dataUpdate
}

