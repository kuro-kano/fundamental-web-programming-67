import styles from "@/styles/About.module.css"
import Image from "next/image"
import Head from "next/head"

export default function About() {
    return [
        <>
            <Head>
                <title>Abour | GearGod</title>
            </Head>

            <div className={styles.container}>
                <h1 className={styles.title}>About Me</h1>
                <Image src="/file.svg" width={50} height={50} alt="about" />
            </div>
        </>
    ]
}