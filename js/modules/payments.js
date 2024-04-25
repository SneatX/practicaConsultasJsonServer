//13. Devuelve un listado con todos los pagos que se realizaron en el año 2008 mediante Paypal. Ordene el resultado de mayor a menor.

export const getAllPaypalPaymentsIfYearIs2008 = async() =>{
    let res = await fetch("http://localhost:5506/payments?payment=PayPal")
    let data = await res.json()

    let pagos = data.filter(pago =>{
        let [año] = pago.date_payment.split("-")
        if(año === "2008"){
            return pago
        }
    })

    for(let i = 0; i < pagos.length; i++){
        for(let j = 0; j < pagos.length - i - 1; j++){
            if(new Date(pagos[j].date_payment) < new Date(pagos[j+1].date_payment)){
                let temp = pagos[j]
                pagos[j] = pagos[j+1]
                pagos[j+1] = temp
            }
        }
    }
    
    return pagos
}

