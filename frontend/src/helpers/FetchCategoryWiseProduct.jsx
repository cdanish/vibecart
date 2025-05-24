import SummaryApI  from "../common/";

const FetchCategroyWiseProduct  = async(category) =>{
    const response = await fetch(SummaryApI.categoryWiseProduct.url,{
        method:SummaryApI.categoryWiseProduct.method,
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            category :category
        })
    })

    const dataResponse = await response.json();

    return dataResponse;
}

export default FetchCategroyWiseProduct