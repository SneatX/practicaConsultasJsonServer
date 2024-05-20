import { getAllClients } from "./client.js"


//Obtener Todos los empleados
export const getAllEmploy = async() =>{
    let res = await fetch(`http://localhost:5503/employee`);
    let data = await res.json();
    return data;
}

//Obtener empleado por codigo
export const getEmployeeByCode =  async(codigo) =>{
    let res = await fetch(`http://localhost:5503/employee?employee_code=${codigo}`)
    let cliente = await res.json()

    return cliente
}

// Obtener toda la informacion del empleado por nombre
export const getEmployeesByName = async(code)=>{
    let res= await fetch(`http://localhost:5503/employee?employee_name=${code}`)
    let data = await res.json()
    return data;
}

//3. Devuelve un listado con el nombre, apellidos y email de los empleados cuyo jefe tiene un código de jefe igual a 7.
export const getFullNameAndEmails = async ()=>{
    let res = await fetch("http://localhost:5503/employee?code_boss=7")
    let data = await res.json()
    let dataUpdate = data.map(item => {
        return{
            name : item.name,
            fullLastName : `${item.lastname1} ${item.lastname2}`,
            email: item.email.match(/(?<=\[)[^\[\]]+@[^@\[\]]+(?=\])/)[0]
        }
    })

    return dataUpdate
}

//4. Devuelve el nombre del puesto, nombre, apellidos y email del jefe de la empresa.
export const getFullNameAndEmailBoss = async (e) =>{
    let res = await fetch("http://localhost:5503/employee")
    let data = await res.json()
    let dataUpdate = []
    data.forEach(empleado => {
        if(empleado.code_boss === null){
            dataUpdate.push({
                position: empleado.position,
                name: empleado.name,
                lastname: `${empleado.lastname1} ${empleado.lastname2}`,
                email: empleado.email.match(/(?<=\[)[^\[\]]+@[^@\[\]]+(?=\])/)[0]
            })
        }
    });

    return dataUpdate
}

//5.Devuelve un listado con el nombre, apellidos y puesto de aquellos empleados que no sean representantes de ventas.

export const getFullNameIfNotRepresentanteVentas = async (e) =>{
    let res = await fetch("http://localhost:5503/employee?position_ne=Representante Ventas")
    let data = await res.json()
    let dataUpdate = []
    data.forEach(empleado =>{
        dataUpdate.push({
            name: empleado.name,
            lastname: `${empleado.lastname1} ${empleado.lastname2}`,
            position: empleado.position
        })
    })

    return dataUpdate
} 

// Consultas multitabla (Composición externa)

// 8. Devuelve un listado con el nombre de los empleados junto con el nombre de sus jefes.

export const getEmployeesandBossesnames = async () => {
    let res = await fetch("http://localhost:5503/employee");

    let employee = await res.json();
    for (let i = 0; i < employee.length; i++) {
        let { ...clientUpdate } = employee[i];

        let employeeData = await getEmployeesByName(clientUpdate.code_employee_sales_manager);

        let employeeUpdate = employeeData[0];
        let data = { ...clientUpdate, ...employeeUpdate };
        employee[i] = {
            "client_name": data.client_name,
            "sales_manager_complete_name": `${data.name} ${data.lastname1} ${data.lastname2}`
        };
    }
    return employee;
};

// 9. Devuelve un listado que muestre el nombre de cada empleado, el nombre de su jefe y el nombre del jefe de sus jefes.

export const getAllEmployeesWithBossNameAndTheBossesNames = async()=>{
    let res=await fetch("http://localhost:5503/employee")
    let dataEmployees =await res.json();
    for (let i = 0; i < dataEmployees.length; i++) {
        let {code_boss} = dataEmployees[i];
        let listBoss = [];
        if(!code_boss) continue 
        do{
            let searchedBoss = async() => await getEmployeeByCode(code_boss)
            let [boos] = await searchedBoss()
            code_boss = boos.code_boss
            listBoss.push(boos)
        }while(code_boss)
        dataEmployees[i].code_boss = listBoss;
    }
    return dataEmployees;
}


// 12. Devuelve un listado con los datos de los empleados que no 
// tienen clientes asociados y el nombre de su jefe asociado

export const getAllEmployNotClients = async()=>{
    let dataClients = await getAllClients();
    let dataEmployees = await getAllEmploy();
    let code_employee_sales_manager = [...new Set(dataClients.map(val => val.code_employee_sales_manager))]
    let employee_code = dataEmployees.map(val => val.employee_code)
    let codes = [
        code_employee_sales_manager,
        employee_code
    ]
    let code = codes.reduce((resultado, array) => resultado.filter(elemento => !array.includes(elemento)).concat(array.filter(elemento => !resultado.includes(elemento))))
    let employees = []
    for (let i = 0; i < code.length; i++) {
        let searchingEmployees = async() => await getEmployeeByCode(code[i])
        let [employee] = await searchingEmployees()
        if(!employee.code_boss) {
            let {
                code_boss,
                ...employeeUpdate
            } = employee
            employeeUpdate.name_boss = employee.name;
            employees.push(employeeUpdate)
            continue
        }
        let searchedBoss = async() => await getEmployeeByCode(employee.code_boss)
        let [boos] = await searchedBoss()
        let {
            code_boss,
            ...employeeUpdate
        } = employee
        employeeUpdate.name_boss = boos.name;
        employees.push(employeeUpdate)
    }
    return employees
}