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
            <my-details logic="client_6M" text="6M. Lista la dirección de las oficinas que tengan clientes en Fuenlabrada"></my-details>
            <my-details logic="client_7M" text="7M. Devuelve el nombre de los clientes y el nombre de sus representantes junto con la ciudad de la oficina a la que pertenece el representante"></my-details>
            <my-details logic="client_10M" text="10M. Devuelve el nombre de los clientes a los que no se les ha entregado a tiempo un pedido"></my-details>
            <my-details logic="client_11M" text="11M. Devuelve un listado de las diferentes gamas de producto que ha comprado cada cliente"></my-details>            
            <my-details logic="client_1E" text="1E. Devuelve un listado que muestre solamente los clientes que no han realizado ningún pago"></my-details>
            <my-details logic="client_2E" text="2E. Devuelve un listado que muestre solamente los clientes que no han realizado ningún pedido"></my-details>
            <my-details logic="client_3E" text="3E. Devuelve un listado que muestre los clientes que no han realizado ningún pago y los que no han realizado ningún pedido"></my-details>
            <my-details logic="client_11E" text="11E. Devuelve un listado con los clientes que han realizado algún pedido pero no han realizado ningún pago
            "></my-details>
            `
        }
        if (e.target.innerHTML == "employees") {
            report__details.innerHTML = /*html*/`
            <my-details logic="employ_3" text="3. Devuelve el nombre del puesto, nombre, apellidos y email del jefe de la empresa"></my-details>
            <my-details logic="employ_4" text="4. Devuelve un listado con el nombre, apellidos y email de los empleados cuyo jefe tiene un código de jefe igual a 7"></my-details>
            <my-details logic="employ_5" text="5. Devuelve un listado con el nombre, apellidos y puesto de aquellos empleados que no sean representantes de ventas"></my-details>
            <my-details logic="employ_8M" text="8M. Devuelve un listado con el nombre de los empleados junto con el nombre de sus jefes"></my-details>
            <my-details logic="employ_9M" text="9M. Devuelve un listado que muestre el nombre de cada empleado, el nombre de su jefe y el nombre del jefe de sus jefes"></my-details>
            <my-details logic="employ_12" text="12. Devuelve un listado con los datos de los empleados que no  tienen clientes asociados y el nombre de su jefe asociado"></my-details>
            `;
        }
        if (e.target.innerHTML == "offices"){
            report__details.innerHTML = /*html*/`
            <my-details logic="office_1" text="1. Devuelve un listado con el código de oficina y la ciudad donde hay oficinas"></my-details>
            <my-details logic="office_2" text="2. Devuelve un listado con la ciudad y el teléfono de las oficinas de España."></my-details>
            <my-details logic="office_6M" text="6M. Lista la dirección de las oficinas que tengan clientes en Fuenlabrada"></my-details>
            `;
        }
        if (e.target.innerHTML == "payments"){
            report__details.innerHTML = /*html*/`
            <my-details logic="payment_13" text="13. Devuelve un listado con todos los pagos que se realizaron en el año 2008 mediante Paypal. Ordene el resultado de mayor a menor"></my-details>
            <my-details logic="payment_14" text="14. Devuelve un listado con todas las formas de pago que aparecen en la tabla pago. Tenga en cuenta que no deben aparecer formas de pago repetidas"></my-details>
            `;
        }
        if (e.target.innerHTML == "product"){
            report__details.innerHTML = /*html*/`
            <my-details logic="product_15" text="15. Devuelve un listado con todos los productos que pertenecen a la gama Ornamentales y que tienen más de 100 unidades en stock. El listado deberá estar ordenado por su precio de venta, mostrando en primer lugar los de mayor precio."></my-details>
            <my-details logic="product_8E" text="8E. Devuelve un listado de los productos que nunca han aparecido en un pedido."></my-details>
            `;
        }
        if (e.target.innerHTML == "requests"){
            report__details.innerHTML = /*html*/`
            <my-details logic="request_7" text="7. Devuelve un listado con los distintos estados por los que puede pasar un pedido"></my-details>
            <my-details logic="request_8" text="8. Devuelve un listado con el código de cliente de aquellos clientes que realizaron algún pago en 2008. Tenga en cuenta que deberá eliminar aquellos códigos de cliente que aparezcan repetidos"></my-details>
            <my-details logic="request_9" text="9. Devuelve un listado con el código de pedido, código de cliente, fecha esperada y fecha de entrega de los pedidos cuya fecha de entrega ha sido al menos dos días antes de la fecha esperada"></my-details>
            <my-details logic="request_10" text="10. Devuelve un listado con el código de pedido, código de cliente, fecha esperada y fecha de entrega de los pedidos cuya fecha de entrega ha sido al menos dos días antes de la fecha esperada"></my-details>
            <my-details logic="request_11" text="11. Devuelve un listado de todos los pedidos que fueron rechazados en 2009"></my-details>
            <my-details logic="request_12" text="12. Devuelve un listado de todos los pedidos que han sido entregados en el mes de enero de cualquier año."></my-details>
            `;
        }

    })
})
let [clients] = report__menu
clients.click();
customElements.define("my-details", Mydetails)
customElements.define("my-card", Mycard)


