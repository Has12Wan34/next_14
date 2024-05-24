import Link from "next/link";

type Props = {
    key: string;
    title: string;
    body: string;
    link: string;
};

export default function Card({ key, title, body, link } : Props){
    return(
        <div key={key} className="card h-100" style={{ width : '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{body}</p>
                <Link href={link} className="btn btn-primary">detail</Link>
            </div>
        </div>
    );
}