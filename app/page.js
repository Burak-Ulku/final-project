// font-bold underline
import 'tailwindcss/tailwind.css';
import './globals.css';
import Image from 'next/image';
import HomeImage from '../app/public/images/HomeImage.jpg';

export default function Home() {
  return (
    <div className="bg-cupcake text-blue-500 p-4">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to UnchartedVienna Treks!
      </h1>
      <Image src={HomeImage} alt="About Image" />
      {/* Add more content or images as needed */}
      <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">
        <span className="text-customOrange">UnchartedVienna Treks</span>
      </h2>
      <p className="text-gray-700">
        Welcome to "UnchartedVienna Treks" – your gateway to discovering the
        enchanting world of hiking within and around Vienna! Immerse yourself in
        the beauty of nature right at your doorstep as we unveil the most
        picturesque hiking locations in the city and its nearby surroundings.
        Explore the Vienna Woods, where lush greenery meets historic charm,
        offering a tranquil escape from the hustle and bustle of city life.
        Traverse the well-maintained paths, each leading to unique viewpoints
        and natural wonders. From panoramic vistas of the city skyline to serene
        lakes nestled in the heart of the woods, City Hiker unveils the diverse
        landscapes waiting to be explored. Discover urban trails that wind
        through Vienna's parks, providing a refreshing blend of nature and
        cityscape. Whether you seek a leisurely stroll or a more challenging
        hike, our platform offers insights into trails suitable for every
        fitness level. Unearth the stories behind each location, learn about
        local flora and fauna, and embark on a journey that combines fitness
        with cultural enrichment.
      </p>
    </div>
  );
}
