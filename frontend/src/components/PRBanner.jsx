function PRBanner({ data }) {

    return (

        <div
            style={{
                background: "#f5f5f5",
                padding: "25px",
                borderRadius: "12px",
                marginBottom: "30px"
            }}
        >

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: "20px"
                }}
            >

            <div>
                <h4>Total PRs</h4>
                <p>{data.total_prs}</p>
            </div>

            <div>
                <h4>Open PRs</h4>
                <p>{data.open_prs}</p>
            </div>

            <div>
                <h4>Closed PRs</h4>
                <p>{data.closed_prs}</p>
            </div>

            <div>
                <h4>Merged PRs</h4>
                <p>{data.merged_prs}</p>
            </div>

            <div>
                <h4>Avg Merge Time</h4>
                <p>
                    {data.average_merge_time_hours}
                    {" "}hrs
                </p>
            </div>

        </div>

    </div>

    );
}

export default PRBanner;