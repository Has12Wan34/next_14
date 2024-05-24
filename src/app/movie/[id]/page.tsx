import React from "react";
import { delay } from "@/utils/delay";

interface Params {
    params: any;
}

interface User {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export default async function MovieDetail({ params } : Params) {

    const url = `https://jsonplaceholder.typicode.com/posts/${params.id}`;
    const data = await fetch(url);
    const res: User = await data.json();
    await delay(1000);

    return (
        <div className="card h-100 w-50">
            <div className="card-body">
                <h5 className="card-title">{res.title}</h5>
                <p className="card-text">{res.body}</p>
            </div>
        </div>
  );
}