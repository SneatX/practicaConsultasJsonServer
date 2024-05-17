import {
    getAllClientsFromMadridWithManagerCode11or30,
    getClientsEmploy,
    getRetardedDeliveryClients,
    getAllNameOfClientAndManager,
    getClientsWithPaymentsNameAndManagerNames,
    getAllClientsNameAndManagerNameWithoutPayments,
    getAllClientsNameManagerNameAndCityIfHavePayments,
    getAllClientsNameManagerNameAndCityIfNotHavePayments,
    getClientsNameFromSpain

} from "../modules/client.js";

import {
    getFullNameAndEmails,
    getFullNameAndEmailBoss,
    getFullNameIfNotRepresentanteVentas,
    getAllEmployNotClients
} from "../modules/employees.js";

import { 
    getAllOficceAndCodeCity,
    getAllCityAndMobileInSpain
} from "../modules/offices.js";

import { 
    getAllPaypalPaymentsIfYearIs2008,
    getAllPosiblePayments
 } from "../modules/payments.js";

getAllOficceAndCodeCity

export class Mycard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = /*html*/`
            <link rel="stylesheet" href="../css/myCard.css">  
        `
    }

    //Clientes - clients

    async getClientsNameFromSpainDesign(){
        let data = await getClientsNameFromSpain()
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div>${val}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                        </div>
                    </div>
                </div>
            `;
        });
    }

    async getClientsEmployDesign() {
        let data = await getClientsEmploy();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.client_name}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Nombre del empleado: </b>${val.name_employee}</p>
                            <p><b>Ciudad: </b>${val.city}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    async getAllClientsFromMadridWithManagerCode11or30Design() {
        let data = await getAllClientsFromMadridWithManagerCode11or30();
        data.forEach(val => {
            let money = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val.limit_credit);
            this.shadowRoot.innerHTML += /*html*/`
            
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.client_name} # ${val.client_code}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Id: </b> ${val.id}</p>
                            <p><b>Codigo del empleado: </b>${val.code_employee_sales_manager}</p>
                            <p><b>Contacto: </b>${val.phone} - ${val.fax}</p>
                            <p><b>Nombre del representante: </b>${val.contact_name} ${val.contact_lastname}</p>
                            <p><b>Dirrecion: </b>${val.address1} ${(val.address2) ? val.address2 : ""}</p>
                            <p><b>Ubicacion: </b>${val.country} ${val.region} ${val.city} ${val.postal_code}</p>
                            <p><b>Total a prestar: </b>${money}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    async getAllNameOfClientAndManagerDesign() {
        let data = await getAllNameOfClientAndManager()
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`

                <div class="report__card">
                <div class="card__title">
                    <div>${val.client_name}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Nombre empleado: </b> ${val.manager_name}</p>
                        <p><b>Apellidos empleado: </b>${val.manager_lastnames}</p>
                    </div>
                </div>
            </div>
            `
        })
    }

    async getClientsWithPaymentsNameAndManagerNamesDesign() {
        let data = await getClientsWithPaymentsNameAndManagerNames()
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`

                <div class="report__card">
                <div class="card__title">
                    <div>${val.client_name}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Nombre empleado: </b> ${val.employee_fullname}</p>
                    </div>
                </div>
            </div>
            `
        })
    }

    async getAllClientsNameAndManagerNameWithoutPaymentsDesign() {
        let data = await getAllClientsNameAndManagerNameWithoutPayments()
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`

                <div class="report__card">
                <div class="card__title">
                    <div>${val.client_name}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Nombre empleado: </b> ${val.employee_fullname}</p>
                    </div>
                </div>
            </div>
            `
        })
    }

    async getAllClientsNameManagerNameAndCityIfHavePaymentsDesign() {
        let data = await getAllClientsNameManagerNameAndCityIfHavePayments()
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`

                <div class="report__card">
                <div class="card__title">
                    <div>${val.client_name}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Nombre empleado: </b> ${val.employee_fullname}</p>
                        <p><b>Ciudad empleado: </b> ${val.employee_city}</p>
                    </div>
                </div>
            </div>
            `
        })
    }

    async getAllClientsNameManagerNameAndCityIfNotHavePaymentsDesign() {
        let data = await getAllClientsNameManagerNameAndCityIfNotHavePayments()
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`

                <div class="report__card">
                <div class="card__title">
                    <div>${val.client_name}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Nombre empleado: </b> ${val.employee_fullname}</p>
                        <p><b>Ciudad empleado: </b> ${val.employee_city}</p>
                    </div>
                </div>
            </div>
            `
        })
    }

    async getRetardedDeliveryClientsDesign(){
        let data = await getRetardedDeliveryClients()
         data.forEach(val => {
             this.shadowRoot.innerHTML += /*html*/`

                 <div class="report__card">
                 <div class="card__title">
                     <div>${val.client_name}</div>
                 </div>
                 <div class="card__body">
                     <div class="body__marck">
                         <p><b>Client code: </b> ${val.client_code}</p>
                     </div>
                 </div>
             </div>
             `
         })
    }

    //Empleados - employees

    async getFullNameAndEmailsDesign(){
        let data = await getFullNameAndEmails()
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.name} ${val.fullLastName}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Email: </b> ${val.email}</p>
                        </div>
                    </div>
                </div>
            `
        })
    }

    async getFullNameAndEmailBossDesign(){
        let data = await getFullNameAndEmailBoss()
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.name} ${val.lastname}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Position: </b> ${val.position}</p>
                            <p><b>Email: </b> ${val.email}</p>
                        </div>
                    </div>
                </div>
            `
        })
    }

    async getFullNameIfNotRepresentanteVentasDesign(){
        let data = await getFullNameIfNotRepresentanteVentas()
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.name} ${val.lastname}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Position: </b> ${val.position}</p>
                        </div>
                    </div>
                </div>
            `
        })
    }

    async getAllEmployNotClientsDesign() {
        let data = await getAllEmployNotClients();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
            
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.name} ${val.lastname1} ${val.lastname2} # ${val.employee_code}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Id: </b> ${val.id}</p>
                            <p><b>Cargo: </b>${val.position}</p>
                            <p><b>Oficina: </b>${val.code_office}</p>
                            <p><b>Jefe encargado: </b>${val.name_boss}</p>
                            <p><b>Numero de extencion: </b>${val.extension}</p>
                            <p><b>Correo electronico: </b>${val.email}</p>
                        </div>
                    </div>
                </div>
            `
        })
    }

    //Offices - Oficinas

    async getAllOficceAndCodeCityDesign(){
        let data = await getAllOficceAndCodeCity()
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.city}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Code office: </b> ${val.code_office}</p>
                        </div>
                    </div>
                </div>
            `
        })
    } 

    async getAllCityAndMobileInSpainDesign(){
        let data = await getAllCityAndMobileInSpain()
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.city}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Movil: </b> ${val.movil}</p>
                        </div>
                    </div>
                </div>
            `
        })
    } 

     //Payments - Pagos

    async getAllPaypalPaymentsIfYearIs2008Design(){
        let data = await getAllPaypalPaymentsIfYearIs2008()
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.id}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Code client: </b> ${val.code_client}</p>
                            <p><b>Date payment: </b> ${val.date_payment}</p>
                            <p><b>Method: </b> ${val.payment}</p>
                            <p><b>ID transaction: </b> ${val.id_transaction}</p>
                            <p><b>Total: </b> ${val.total}</p>
                        </div>
                    </div>
                </div>
            `
        })
    } 

    async getAllPosiblePaymentsDesign(){
        let data = await getAllPosiblePayments()
        console.log(data)
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div>${val}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">

                        </div>
                    </div>
                </div>
            `
        })
    } 

    static get observedAttributes() {
        return ["logic"];
    }
    attributeChangedCallback(name, old, now) {
        /*CLIENTS*/
        if (name == "logic" && now == "client_6") this.getClientsNameFromSpainDesign()
        if (name == "logic" && now == "client_16") this.getAllClientsFromMadridWithManagerCode11or30Design()
        if (name == "logic" && now == "client_1M") this.getAllNameOfClientAndManagerDesign()
        if (name == "logic" && now == "client_2M") this.getClientsWithPaymentsNameAndManagerNamesDesign()
        if (name == "logic" && now == "client_3M") this.getAllClientsNameAndManagerNameWithoutPaymentsDesign()
        if (name == "logic" && now == "client_4M") this.getAllClientsNameManagerNameAndCityIfHavePaymentsDesign()
        if (name == "logic" && now == "client_5M") this.getAllClientsNameManagerNameAndCityIfNotHavePaymentsDesign()
        if (name == "logic" && now == "client_7M") this.getClientsEmployDesign()
        if (name == "logic" && now == "client_10M") this.getRetardedDeliveryClientsDesign()

        /*EMPLOYEES*/
        if (name == "logic" && now == "employ_3") this.getFullNameAndEmailsDesign()
        if (name == "logic" && now == "employ_4") this.getFullNameAndEmailBossDesign()
        if (name == "logic" && now == "employ_5") this.getFullNameIfNotRepresentanteVentasDesign()
        if (name == "logic" && now == "employ_12") this.getAllEmployNotClientsDesign()
    
         /*OFFICES*/
        if (name == "logic" && now == "office_1") this.getAllOficceAndCodeCityDesign()
        if (name == "logic" && now == "office_2") this.getAllCityAndMobileInSpainDesign()
         
        /*PAYMENTS*/
        if (name == "logic" && now == "payment_13") this.getAllPaypalPaymentsIfYearIs2008Design()
        if (name == "logic" && now == "payment_14") this.getAllPosiblePaymentsDesign()
    
    }
}
