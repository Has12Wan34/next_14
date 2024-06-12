import { delay } from "@/utils/delay";
import Card from "@/components/card";
import CardSkeleton from "@/components/cardSkeleton";
import type { Metadata } from 'next';
import { Suspense } from "react";

type MovieProp = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

export const metadata: Metadata = {
  title: 'movie',
  description: 'movies',
};

const FetchDataSkeleton = async () => {

    const url = `https://jsonplaceholder.typicode.com/posts`;
    const data = await fetch(url);
    const res = await data.json();

    return (
        <div className="container">
            <div className="row">
                {res?.map((m:MovieProp) => (
                    <div key={m.id} className="col py-1">
                        <CardSkeleton key={m.id}/>
                    </div>
                ))}
            </div>
        </div> 
    )
}

const Users = async () => {
    const url = `https://jsonplaceholder.typicode.com/posts`;
    const data = await fetch(url);
    const res: MovieProp[] | undefined = await data?.json();
    await delay(1000);

    return (
        <div className="container">
            <div className="row">
                {res && res?.map((m) => (
                    <div key={m?.id} className="col py-1">
                        <Card key={m?.id} title={m?.title} body={m?.body} link={`/movie/${m?.id}`}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function AllUsers() {
    return (
        <Suspense fallback={FetchDataSkeleton()}>
            {Users()}
        </Suspense> 
    )
}
  
