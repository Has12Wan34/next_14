type Props = {
    key: number;
};

export default function CardSkeleton({ key } : Props){
    return(
        <div key={key} className="card h-100" style={{ width : '18rem' }}>
            <div className="card-body">
                <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                </h5>
                <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                </p>
                <div className="btn btn-primary disabled placeholder col-6"></div>
            </div>
        </div>
    );
}