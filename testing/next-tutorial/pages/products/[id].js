import Head from "next/head";
import styles from "@/styles/Detail.module.css";
import Image from "next/image";

export async function getStaticPaths() {
  const res = await fetch("https://dummyjson.com/products?limit=12");
  const data = await res.json();

  const paths = data.products.map((item) => ({
    params: { id: String(item.id) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();
  return { props: { product: data } };
}

export default function ProductDetail({ product }) {
  return (
    <>
      <Head>
        <title>{product.title} | GearGod</title>
      </Head>
      <div className={styles.container}>
        <h2 className={styles.title}>Product No. {product.id}</h2>
        <p className={styles.p}>Name: {product.title}</p>
        <p className={styles.p}>Brand: {product.brand}</p>
        <p className={styles.p}>Description: {product.description}</p>
        <p className={styles.p}>Rating: {product.rating} / 5</p>
        <p className={styles.p}>Price: ${product.price}</p>
        <Image
          className={styles.image}
          width={300}
          height={300}
          src={product.thumbnail}
          alt={product.title}
        />
      </div>
    </>
  );
}
