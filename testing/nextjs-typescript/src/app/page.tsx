"use client"
import { useState, useEffect} from 'react';
// * import Image from "next/image";
import Header from '../../components/header';

interface Data {
  id: number;
  title: string;
  body: string;
}

export default function Home() {

  const [data, setData] = useState<Data[]>([]);
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");

  const myPlusFunction = (num1: number, num2: number) => {
    return num1 + num2;
  }

  const result = myPlusFunction(5, 102);

  const myFunc = (name: string) => {
    return name;
  }

  const user = myFunc("kaano");

  console.log(data);

  useEffect(() => {

    const fetchData = async () => {
      try {

        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const jsonData = await response.json();
        setData(jsonData);

      } catch(error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchData();

  })

  return (
  <main>
    <Header title="nextjs + typescript" />
    <p>My result: {result} <br /> name: {user}</p>
    <ul>
      {data.map((item) => (
        <li key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.body}</p> <br /> <br />
        </li>
      ))}
    </ul>
  </main>);
}
