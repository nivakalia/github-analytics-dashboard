function IssueBanner({ data }) {

    return (

        <div
            style={{
                background: "#D7F1C6",
                padding: "25px",
                borderRadius: "12px",
                marginBottom: "30px"
            }}
        >

        
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "20px"
                }}
            >

            <div>
                <h4>Total Issues</h4>
                <p>{data.total_issues}</p>
            </div>

            <div>
                <h4>Open Issues</h4>
                <p>{data.open_issues}</p>
            </div>

            <div>
                <h4>Resolved Issues</h4>
                <p>{data.resolved_issues}</p>
            </div>

            <div>
                <h4>Avg Resolution Time</h4>
                <p>
                    {data.average_resolution_hours}
                    {" "}hrs
                </p>
            </div>

            </div>

        </div>
    );
}

export default IssueBanner;