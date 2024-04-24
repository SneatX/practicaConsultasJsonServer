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

//console.log(await getAllOficceAndCodeCity())

//console.log(await getAllCityAndMobileInSpain())

//console.log(await getFullNameAndEmails())

//console.log(await getFullNameAndEmailBoss())

//console.log(await getFullNameIfNotRepresentanteVentas())

console.log(await getClientsNameFromSpain())


