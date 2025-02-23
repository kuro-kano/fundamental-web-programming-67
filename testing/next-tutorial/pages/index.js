import styles from "@/styles/Home.module.css"
import Image from "next/image"
import Link from "next/link"
import Head from "next/head"

export default function Home(){
    return (
        <>
            <Head>
                <title>Home | GearGod</title>
            </Head>

            <div className={styles.container}>
                <h1 className={styles.title}>Home page</h1>
                <Image src="globe.svg" width={50} height={50} alt="picture" />
                <p>Welcome to GearGod</p>
                <Link href="/products" className={styles.btn}>See all products</Link>
            </div>
        </>
    )
}