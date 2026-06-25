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
                    display: "flex",
                    gap: "20px",
                    fontSize: 20
                }}
            >

            <div
                style={{
                    flex: 1,
                    padding: "20px"}}>
                <h4>Total Issues</h4>
                <p>{data.total_issues}</p>
            </div>

            <div
                style={{
                    flex: 1,
                    padding: "20px"}}>
                <h4>Open Issues</h4>
                <p>{data.open_issues}</p>
            </div>

            <div
                style={{
                    flex: 1,
                    padding: "20px"}}>
                <h4>Resolved Issues</h4>
                <p>{data.resolved_issues}</p>
            </div>

            <div
                style={{
                    flex: 1,
                    padding: "20px"}}>
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