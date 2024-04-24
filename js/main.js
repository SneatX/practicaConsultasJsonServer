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
    getClientsNameFromSpain
} from "./modules/client.js"

import {
    getAllPosibleRequestsStatus,
    getClientCodeIfPayInYear,
    getOrderCodeClientCodeDateOfDelayedOrders
} from "./modules/requests.js"

//console.log(await getAllOficceAndCodeCity())

//console.log(await getAllCityAndMobileInSpain())

//console.log(await getFullNameAndEmails())

//console.log(await getFullNameAndEmailBoss())

//console.log(await getFullNameIfNotRepresentanteVentas())

//console.log(await getClientsNameFromSpain())

//console.log(await getAllPosibleRequestsStatus())

//console.log(await getClientCodeIfPayInYear(2008))

console.log(await getOrderCodeClientCodeDateOfDelayedOrders())


