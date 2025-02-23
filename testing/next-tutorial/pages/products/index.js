import Head from "next/head"
// https://dummyjson.com/products?limit=12

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

            <h1>Product</h1>
        </>
    )
}