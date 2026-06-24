
import StatCardg from "./StatCardg";
function HealthSection({ health }) {

    return (
        

        <div
            style={{
                //padding: "25px",
                //marginBottom: "30px"
                marginTop: "30px",
            }}
        >

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:"repeat(2,1fr)",
                    gap: "20px",
                    placeItems: "center",
                    background: "#f5f5f5",
                    borderRadius: "12px"

                }}
            >
                
                <h2>Status : {health.status}</h2>
                  
                <h2> Release Frequency: {health.release_frequency}</h2>
                   
            </div>

            <div
                style={{
                    marginTop: "25px"
                }}
            >
                <div
                    style={{
                        display:"grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "40px",
                        placeItems: "fill"

                    }}>
                <StatCardg
                    title={"Commit Score"}
                    value={health.metrics.commit_score}/>
                <StatCardg
                    title={"PR Score"}
                    value={health.metrics.pr_score}/>
                <StatCardg
                    title={"Issue Score"}
                    value={health.metrics.issue_score}/>
                <StatCardg
                    title={"Contributor Score"}
                    value={health.metrics.contributor_score}/>
                
                
                </div>

            </div>

        </div>

    );

}

export default HealthSection;