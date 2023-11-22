// font-bold underline
import 'tailwindcss/tailwind.css';
import './globals.css';

export default function Home() {
  return (
    <div className="bg-cupcake text-blue-500 p-4">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to UnchartedVienna Treks!
      </h1>
      <img
        src="https://images.pexels.com/photos/6150567/pexels-photo-6150567.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
        alt="Example"
        className="max-w-full mb-8"
      />
      {/* Add more content or images as needed */}
    </div>
  );
}
