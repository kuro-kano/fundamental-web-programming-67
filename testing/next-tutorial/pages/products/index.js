import Head from "next/head"
import Image from "next/image";
import styles from "@/styles/Product.module.css"

export async function getStaticProps(){
    const res = await fetch("https://dummyjson.com/products?limit=12");
    const data = await res.json();
    console.log(data);

    return {
        props: { products: data.products }
    };
}

export default function Index({products}){
    return (
        <>
            <Head>
                <title>Product | GearGod</title>
            </Head>

            <div className={styles.container}>
                {products.map(item => (
                    <div key={item.id}>
                        <h2 className={styles.title}>{item.title}</h2>
                    <Image className={styles.image} src={item.thumbnail} width={300} height={300} alt="image" />
                    </div>
                ))}
            </div>
        </>
    )
}