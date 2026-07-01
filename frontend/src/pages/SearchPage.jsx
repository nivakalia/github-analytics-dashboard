import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
function SearchPage() {

    const [owner, setOwner] = useState("");
    const [repo, setRepo] = useState("");
    const navigate = useNavigate();
    const handleAnalyze = async () => {
        console.log("BUTTON CLICKED");
        
        try {
    
            await api.post(
                `/ingest/fetch/${owner}/${repo}`
            );
    
            await api.post(
                `/ingest/fetch-commits/${owner}/${repo}`
            );
    
            await api.post(
                `/ingest/fetch-prs/${owner}/${repo}`
            );
    
            await api.post(
                `/ingest/fetch-issues/${owner}/${repo}`
            );
    
            await api.post(
                `/ingest/fetch-contributors/${owner}/${repo}`
            );
    
            await api.post(
                `/ingest/fetch-releases/${owner}/${repo}`
            );
    
            navigate(
                `/dashboard/${owner}/${repo}`
              );
    
        } catch(error) {

            console.error(error);
        
            console.log(error.response);
        
            console.log(error.response?.data);
        
            alert("Analysis failed");
        }
    };

    return (
        <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            flexDirection: "column"
          }}
        >
            <div
            style={{
                background: "#D7F1C6",
                display: "flex",
                height:"300px",
                width:"500px",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "30px",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}
        >
            <h1>GitHub Analytics Dashboard</h1>

            <div>

                <label>Owner</label>

                <input
                    type="text"
                    value={owner}
                    onChange={(e) =>
                        setOwner(e.target.value)
                    }
                />

            </div>
                    <h2></h2>
            <div>

                <label>Repository</label>

                <input
                    type="text"
                    value={repo}
                    onChange={(e) =>
                        setRepo(e.target.value)
                    }
                />

            </div>
            <h2></h2>
            <button onClick={handleAnalyze}>
                Analyze Repository
            </button>
        </div>
        </div>
    );
}

export default SearchPage;
