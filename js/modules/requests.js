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