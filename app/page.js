// font-bold underline
import 'tailwindcss/tailwind.css';
import './globals.css';
import Image from 'next/image';
import HomeImage from '../public/images/HomeImage.jpg';

export default function Home() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          'url(https://images.pexels.com/photos/5986115/pexels-photo-5986115.jpeg?auto=compress&cs=tinysrgb&w=1600)',
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Welcome to UnchartedVienna Treks
          </h1>
          <p className="mb-5">
            UnchartedVienna Treks Welcome to "UnchartedVienna Treks" – your
            gateway to discovering the enchanting world of hiking within and
            around Vienna! Immerse yourself in the beauty of nature right at
            your doorstep as we unveil the most picturesque hiking locations in
            the city and its nearby surroundings.
          </p>
          {/* <button className="btn btn-primary">Get Started</button> */}
        </div>
      </div>
    </div>
  );
}
// https://images.pexels.com/photos/5986115/pexels-photo-5986115.jpeg?auto=compress&cs=tinysrgb&w=1600
