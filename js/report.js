import "./components/clock.js";
import { Mycard } from "./components/myCard.js";
import { Mydetails } from "./components/myDetails.js";


let btn = document.querySelectorAll("button")
let report__menu = document.querySelectorAll(".report__menu button")
let report__details = document.querySelector(".report__details")
btn.forEach(val => {
    val.addEventListener("click", (e) => {
        for (let val of report__menu) val.classList.remove('report__active');
        e.target.classList.add("report__active")

        if (e.target.innerHTML == "clients") {
            report__details.innerHTML = /*html*/`
            <my-details logic="client_6" text="6. Devuelve un listado con el nombre de los todos los clientes españoles"></my-details>
            <my-details logic="client_16" text="16. Devuelve un listado con todos los clientes que sean de la ciudad de Madrid y cuyo representante de ventas tenga el código de empleado 11 o 30."></my-details>
            <my-details logic="client_1M" text="1M. Obtén un listado con el nombre de cada cliente y el nombre y apellido de su representante de ventas"></my-details>
            <my-details logic="client_2M" text="2M. Muestra el nombre de los clientes que hayan realizado pagos junto con el nombre de sus representantes de ventas"></my-details>
            <my-details logic="client_3M" text="3M. Muestra el nombre de los clientes que **no** hayan realizado pagos junto con el nombre de sus representantes de ventas"></my-details>
            <my-details logic="client_4M" text="4M .Devuelve el nombre de los clientes que han hecho pagos y el nombre de sus representantes junto con la ciudad de la oficina a la que pertenece el representante"></my-details>
            <my-details logic="client_5M" text="5M. Devuelve el nombre de los clientes que **no** hayan hecho pagos y el nombre de sus representantes junto con la ciudad de la oficina a la que pertenece el representante"></my-details>
            <my-details logic="client_7M" text="7M. Devuelve el nombre de los clientes y el nombre de sus representantes junto con la ciudad de la oficina a la que pertenece el representante."></my-details>
            <my-details logic="client_10M" text="10M. Devuelve el nombre de los clientes a los que no se les ha entregado a tiempo un pedido."></my-details>
            `
        }
        if (e.target.innerHTML == "employees") {
            report__details.innerHTML = /*html*/`
            <my-details logic="employ_3" text="3. Devuelve el nombre del puesto, nombre, apellidos y email del jefe de la empresa"></my-details>
            <my-details logic="employ_4" text="4. Devuelve un listado con el nombre, apellidos y email de los empleados cuyo jefe tiene un código de jefe igual a 7"></my-details>
            <my-details logic="employ_5" text="5. Devuelve un listado con el nombre, apellidos y puesto de aquellos empleados que no sean representantes de ventas"></my-details>
            <my-details logic="employ_12" text="12. Devuelve un listado con los datos de los empleados que no  tienen clientes asociados y el nombre de su jefe asociado"></my-details>
            `;
        }

    })
})
let [clients] = report__menu
clients.click();
customElements.define("my-details", Mydetails)
customElements.define("my-card", Mycard)


