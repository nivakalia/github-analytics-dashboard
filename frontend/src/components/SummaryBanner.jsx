import { Cell } from "recharts";

function SummaryBanner({
    commits,
    stars,
    forks,
    watchers
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
                            padding: "20px"}}>
                    <h4>Total Commits</h4>
                    <p>{commits}</p>
                </div>

                <div
                        style={{
                            flex: 1,
                            padding: "20px"}}>
                    <h4>Stargazers</h4>
                    <p>{stars}</p>
                </div>

                <div
                        style={{
                            flex: 1,
                            padding: "20px"}}>
                    <h4>Forks</h4>
                    <p>{forks}</p>
                </div>

                <div
                        style={{
                            flex: 1,
                            padding: "20px"}}>
                    <h4>Watchers</h4>
                    <p>{watchers}</p>
                </div>

            </div>

        </div>
    );
}

export default SummaryBanner;
