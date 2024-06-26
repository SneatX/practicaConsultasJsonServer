import { 
    getAllOficceAndCodeCity,
    getAllCityAndMobileInSpain
} from "./modules/offices.js"

import{
    getFullNameAndEmails,
    getFullNameAndEmailBoss,
    getFullNameIfNotRepresentanteVentas
} from "./modules/employees.js"

import{
    getClientsNameFromSpain,
    getAllClientsFromMadridWithManagerCode11or30,
    getAllNameOfClientAndManager,
    getClientsWithPaymentsNameAndManagerNames,
    getAllClientsNameAndManagerNameWithoutPayments,
    getAllClientsNameManagerNameAndCityIfHavePayments,
    getAllClientsNameManagerNameAndCityIfNotHavePayments
} from "./modules/client.js"

import {
    getAllPosibleRequestsStatus,
    getClientCodeIfPayInYear,
    getOrderCodeClientCodeDateOfDelayedOrders,
    getOrderCodeClientCodeDateOf2DaysBeforeDeploy,
    getAllRequestsIfDeclinedIn2009,
    getAllRequestIfDeliveyInJanuary
} from "./modules/requests.js"

import {
    getAllPaypalPaymentsIfYearIs2008,
    getAllPosiblePayments
} from "./modules/payments.js"

import {
    getAllOrnamentalesProductsWithMoreOf100Units
} from "./modules/product.js"

//console.log(await getAllOficceAndCodeCity())

//console.log(await getAllCityAndMobileInSpain())

//console.log(await getFullNameAndEmails())

//console.log(await getFullNameAndEmailBoss())

//console.log(await getFullNameIfNotRepresentanteVentas())

//console.log(await getClientsNameFromSpain())

//console.log(await getAllPosibleRequestsStatus())

//console.log(await getClientCodeIfPayInYear(2008))

//console.log(await getOrderCodeClientCodeDateOfDelayedOrders())

//console.log(await getOrderCodeClientCodeDateOf2DaysBeforeDeploy())

//console.log(await getAllRequestsIfDeclinedIn2009())

//console.log(await getAllRequestIfDeliveyInJanuary())

//console.log(await getAllPaypalPaymentsIfYearIs2008())

//console.log(await getAllPosiblePayments())

//console.log(await getAllOrnamentalesProductsWithMoreOf100Units())

//console.log(await getAllClientsFromMadridWithManagerCode11or30())

//----------Consultas multitabla----------//

//console.log(await getAllNameOfClientAndManager())

//console.log(await getClientsWithPaymentsNameAndManagerNames())

//console.log(await getAllClientsNameAndManagerNameWithoutPayments())

//console.log(await getAllClientsNameManagerNameAndCityIfHavePayments())

console.log(await getAllClientsNameManagerNameAndCityIfNotHavePayments())






// ### Consultas multitabla (Composición interna)

// 1. Obtén un listado con el nombre de cada cliente y el nombre y apellido de su representante de ventas.
// 2. Muestra el nombre de los clientes que hayan realizado pagos junto con el nombre de sus representantes de ventas.
// 3. Muestra el nombre de los clientes que **no** hayan realizado pagos junto con el nombre de sus representantes de ventas.
// 4. Devuelve el nombre de los clientes que han hecho pagos y el nombre de sus representantes junto con la ciudad de la oficina a la que pertenece el representante.
// 5. Devuelve el nombre de los clientes que **no** hayan hecho pagos y el nombre de sus representantes junto con la ciudad de la oficina a la que pertenece el representante.
// 6. Lista la dirección de las oficinas que tengan clientes en `Fuenlabrada`.
// 7. Devuelve el nombre de los clientes y el nombre de sus representantes junto con la ciudad de la oficina a la que pertenece el representante.
// 8. Devuelve un listado con el nombre de los empleados junto con el nombre de sus jefes.
// 9. Devuelve un listado que muestre el nombre de cada empleados, el nombre de su jefe y el nombre del jefe de sus jefe.
// 10. Devuelve el nombre de los clientes a los que no se les ha entregado a tiempo un pedido.
// 11. Devuelve un listado de las diferentes gamas de producto que ha comprado cada cliente.



