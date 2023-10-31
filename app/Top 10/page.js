import Image from 'next/image';
import Link from 'next/link';

// import { getProducts } from '../../database/products';

export const metadata = {
  title: 'Products Page',
  description: 'Generated by create next app',
};

export default function Top10Page() {
  const top10s = getTop10s();
  return (
    <div>
      <h1>Top 10 Hiking places in Vienna</h1>

      {top10s.map((top10) => {
        return (
          <div key={`top10-div-${top10.id}`}>
            <Link href={`/top10-div/${top10.id}`}>{top10.photo}</Link>
            <Image
              src={`/images/${top10.toyName}.jpg`}
              alt={top10.toyName}
              width={500}
              height={400}
            />
          </div>
        );
      })}
    </div>
  );
}
