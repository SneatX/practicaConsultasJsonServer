//1. Devuelve un listado con el código de oficina y la ciudad donde hay oficinas.
export const getAllOficceAndCodeCity = async () => {
    let res = await fetch("http://localhost:5505/offices")
    let data = await res.json()
    return data.map(item => {
        return {
            city: item.city,
            code_office: item.code_office
        }
    })
}

//2. Devuelve un listado con la ciudad y el teléfono de las oficinas de España.
export const getAllCityAndMobileInSpain = async () =>{
    let res = await fetch("http://localhost:5505/offices?country=España")
    let data = await res.json()
    let dataUpdate = data.map(item =>{
        return{
            city: item.city,
            movil: item.movil
        }
    })
    return dataUpdate
}