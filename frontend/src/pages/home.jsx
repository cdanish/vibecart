import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

function home() {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct heading="Top's AirPodes" category={"airpodes"}/>
      <HorizontalCardProduct heading="Popular Watches" category={"watches"}/>
      <VerticalCardProduct heading="Popular Mobiles" category={"mobiles"} />
      <VerticalCardProduct heading="Fantastic Mouses" category={"Mouse"} />
      <VerticalCardProduct heading="Long high Quality Telivison" category={"televisions"} />
      <VerticalCardProduct heading="Quality images" category={"camera"} />
      <HorizontalCardProduct heading="Good Sound Here us" category={"earphones"}/>
      <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>
    </div>
  )
}

export default home
