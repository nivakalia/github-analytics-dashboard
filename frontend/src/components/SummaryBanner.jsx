function SummaryBanner({
    health,
    commits,
    contributors,
    openIssues
}) {

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
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(180px,1fr))",
                    gap: "20px"
                }}
            >

                <div>
                    <h4>Health Score</h4>
                    <p>{health}</p>
                </div>

                <div>
                    <h4>Total Commits</h4>
                    <p>{commits}</p>
                </div>

                <div>
                    <h4>Contributors</h4>
                    <p>{contributors}</p>
                </div>

                <div>
                    <h4>Open Issues</h4>
                    <p>{openIssues}</p>
                </div>

            </div>

        </div>
    );
}

export default SummaryBanner;
