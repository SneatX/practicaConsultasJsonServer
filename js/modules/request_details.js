export const getAllRequestDetailsByCode = async(product_code)=>{
    let res = await fetch(`http://localhost:5502/request_details?product_code=${product_code}`);
    let data = await res.json();
    return data;
}
