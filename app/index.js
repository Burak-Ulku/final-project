import Head from 'next/head';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js Navbar Tutorial</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar
        link1="About Us"
        link1To="/about"
        link2="Contact Us"
        link2To="/contact"
        link3="Subscribe"
        link3To="/subscribe"
      />

      <main className={styles.main}>
        <h1 className={styles.title}>
          This is where the rest of your landing page content will go!
        </h1>
      </main>
    </div>
  );
}
