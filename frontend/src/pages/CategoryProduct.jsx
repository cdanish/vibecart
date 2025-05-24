import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ProductCategory from '../helpers/ProductCategrory';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

function CategoryProduct() {
  const params = useParams();
  const navigate = useNavigate()
  //console.log(params.categoryName);
  //{params.categoryName}


  const [data, setData] = useState([]);
  

  const [loading, setLoading] = useState(false);



  const location = useLocation();

  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListInArray = urlSearch.getAll("category");
  const urlCategoryListObject = {}

  // console.log(urlCategoryListObject);
  urlCategoryListInArray.forEach(el => {
    urlCategoryListObject[el] = true
  });

  const [selectCategroy, setSelectCategory] = useState(urlCategoryListObject);

  const [filterCategroyList, setFilterCategoryList] = useState([]);

  //console.log(urlCategoryListObject);

  const [sortBy, setSortBy] = useState("");

  //console.log(sortBy,"sorby")


  const fetchData = async () => {

    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategroyList
      })
    })

    const dataResponse = await response.json();
    setData(dataResponse?.data || []);

    //console.log(dataResponse);

  }

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;


    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked
      }
    })

  }

  // console.log(selectCategroy)

  useEffect(() => {
    fetchData();
  }, [filterCategroyList]);

  useEffect(() => {

    const arrayOfCategory = Object.keys(selectCategroy).map(categoryKeyName => {

      // console.log(categoryName)

      if (selectCategroy[categoryKeyName]) {
        return categoryKeyName
      }

      return null

    }).filter(el => el);

    setFilterCategoryList(arrayOfCategory);

    //format for url change when check on check box
    const urlformat = arrayOfCategory.map((el,index) =>{
      if((arrayOfCategory.length -1) === index){
        return `category=${el}`
      }

    

      return  `category=${el}&&`
    });

    //console.log(urlformat.join(""),"urlformat");
    navigate(`/product-categroy?${urlformat.join("")}`)


    //console.log(arrayOfCategory);


    ///product-categroy?category=Mouse&category=airpodes

    


  }, [selectCategroy]);


  const handleOnChangeSortBy = (e) =>{
    const {value} = e.target;

    setSortBy(value)

    if(value ==="asc"){
      setData(prev=> prev.sort((a,b)=>a.sellingPrice - b.sellingPrice))
    }
    if(value ==="dsc"){
      setData(prev=> prev.sort((a,b)=>b.sellingPrice - a.sellingPrice))
    }
  }

  useEffect(()=>{

  },[sortBy]);



  return (
    <div className='container mx-auto p-4'>
      {/* desktop version */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        {/* left side */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-auto'>
          {/* sory by */}
          <div className=' '>
            <h3 className='text-lg uppercase font-medium text-slate-500 border-b border-slate-30 pb-1'>Sort By </h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type="radio" name='sortBy' value={"asc"} onChange={handleOnChangeSortBy} checked={sortBy ==='asc'}/>
                <label>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type="radio" name='sortBy' value={"dsc"} onChange={handleOnChangeSortBy} checked={sortBy ==='dsc'}/>
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* filter by */}
          <div className=' '>
            <h3 className='text-lg uppercase font-medium text-slate-500 border-b border-slate-30 pb-1'>Categroy</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>

              {
                ProductCategory.map((categoryName, index) => {
                  return (
                    <div key={index} className='flex items-center gap-3 '>
                      <input id={categoryName?.value} type="checkbox" checked={!!selectCategroy[categoryName?.value]} value={categoryName?.value} onChange={handleSelectCategory} name={"category"} />
                      <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                    </div>

                  )
                })
              }

            </form>
          </div>
        </div>
        {/* rightside product */}

        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>



          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
            {
              data.length !== 0 && !loading && (
                <VerticalCard data={data} loading={loading} />
              )
            }
          </div>




        </div>
      </div>
    </div>
  )
}

export default CategoryProduct
