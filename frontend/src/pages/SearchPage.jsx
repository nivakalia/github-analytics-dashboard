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
        <div>

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

            <button onClick={handleAnalyze}>
                Analyze Repository
            </button>

        </div>
    );
}

export default SearchPage;
