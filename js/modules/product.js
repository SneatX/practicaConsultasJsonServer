// 15. Devuelve un listado con todos los productos que pertenecen a la gama Ornamentales y que tienen más de 100 unidades en stock. El listado deberá estar ordenado por su precio de venta, mostrando en primer lugar los de mayor precio.
export const getAllOrnamentalesProductsWithMoreOf100Units = async()=>{
    let res = await fetch("http://localhost:5508/products?gama=Ornamentales&stock_gt=100")
    let data = await res.json()

    for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data.length - i - 1; j++){
            if( data[j].price_sale < data[j+1].price_sale){
                let temp = data[j]
                data[j] = data[j+1]
                data[j+1] = temp
            }
        }
    }

    return data

}