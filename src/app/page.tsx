import dynamic from "next/dynamic";
import img1 from '../assets/banner-4.jpeg'
import img2 from '../assets/blog-img-1.jpeg'
import img3 from '../assets/blog-img-2.jpeg'
import FeaturedProducts from "./_component/FeaturedProducts/FeaturedProducts";
import FeaturesStrip from "./_component/FeaturesStrip/FeaturesStrip";
import FullBleed from "./_component/FullBleed/FullBleed";
import HeroBanner from "./_component/HeroBanner/HeroBanner";
import PromoBanners from "./_component/PromoBanners/PromoBanners";

const ShopCategory=  dynamic(() => import('./_component/ShopCategory/ShopCategory') , {
  loading:()=> <div className="py-10 text-center text-gray-500">Loading...</div>
});

const slides = [
  { image: img1, title: 'Fresh Products Delivered to your Door', text: 'Get 20% off your first order' },
  { image: img2, title: 'Eat Fresh, Live Better', text: 'Hand-picked ingredients, delivered daily' },
  { image: img3, title: 'Premium Quality, Best Prices', text: 'Discover our latest arrivals and weekly deals' },
]

export default function Home() {
  return (
  <>
    <FullBleed>
      <HeroBanner slides={slides} />
    </FullBleed>

    <FullBleed className="bg-gray-50">
      <FeaturesStrip />
    </FullBleed>

    <div className="px-4">
      {/* shop catg */}
      <ShopCategory/>

      <PromoBanners />

      <FeaturedProducts/>
    </div>
  </>
  );
}
