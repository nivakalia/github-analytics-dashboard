import { Cell } from "recharts";

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
                padding: "2px",
                borderRadius: "12px",
                marginBottom: "3px"
            }}
        >

        
            <div
                style={{
                    display: "flex",
                    padding: "12px",
                    gridTemplateColumns:"repeat(4,1fr)",
                    fontSize: 20,
                    
                }}
            >
                <div
                        style={{
                            flex: 1,
                            padding: "20px"}}
                    >
                    <h4>Health Score</h4>
                    <p>{health}</p>
                </div>

                <div
                        style={{
                            flex: 1,
                            padding: "20px"}}>
                    <h4>Total Commits</h4>
                    <p>{commits}</p>
                </div>

                <div
                        style={{
                            flex: 1,
                            padding: "20px"}}>
                    <h4>Contributors</h4>
                    <p>{contributors}</p>
                </div>

                <div
                        style={{
                            flex: 1,
                            padding: "20px"}}>
                    <h4>Open Issues</h4>
                    <p>{openIssues}</p>
                </div>

            </div>

        </div>
    );
}

export default SummaryBanner;
