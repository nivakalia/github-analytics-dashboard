import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function SearchPage() {

    const [owner, setOwner] = useState("");
    const [repo, setRepo] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const handleAnalyze = async () => {

        if (!owner.trim() || !repo.trim()) {
            alert("Please enter both owner and repository.");
            return;
        }

        setLoading(true);

        try {

            const response = await api.post(
                `/ingest/analyze/${owner}/${repo}`
            );

            setTimeout(() => {
                navigate(`/dashboard/${owner}/${repo}`);
            }, 800);

        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message || error.response?.data?.detail ||"Analysis failed."
            );
            setLoading(false);
        }

    };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                flexDirection: "column",
                background: "#f5f5f5"
            }}
        >

            <div
                style={{
                    width: "550px",
                    background: "#D7F1C6",
                    padding: "35px",
                    borderRadius: "15px",
                }}
            >

                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: "30px"
                    }}
                >
                    GitHub Analytics Dashboard
                </h1>

                <div
                    style={{
                        marginBottom: "20px"
                    }}
                >

                    <label
                        style={{
                            fontWeight: "bold"
                        }}
                    >
                        Repository Owner
                    </label>

                    <input
                        type="text"
                        value={owner}
                        disabled={loading}
                        onChange={(e) =>
                            setOwner(e.target.value)
                        }
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "8px",
                            borderRadius: "8px",
                        }}
                    />

                </div>

                <div
                    style={{
                        marginBottom: "25px"
                    }}
                >
                    <label
                        style={{
                            fontWeight: "bold"
                        }}
                    >
                        Repository Name
                    </label>

                    <input
                        type="text"
                        value={repo}
                        disabled={loading}
                        onChange={(e) =>setRepo(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "8px",
                            borderRadius: "8px",
                        }}
                    />

                </div>

                <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "14px",
                        border: "none",
                        borderRadius: "10px",
                        background: loading? "#9CA3AF": "#15803D",
                        color: "white",
                        fontSize: "16px",
                        cursor:loading? "not-allowed": "pointer"
                    }}
                >
                    {
                        loading ? "Analyzing Repository...": "Analyze Repository"
                    }

                </button>

            </div>

        </div>

    );

}

export default SearchPage;