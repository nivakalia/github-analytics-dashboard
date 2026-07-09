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
            const response = await api.post(`/ingest/analyze/${owner}/${repo}`);
            setTimeout(() => {navigate(`/dashboard/${owner}/${repo}`);}, 800);
        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message || error.response?.data?.detail || "Analysis failed. Check Owner and Repo name. "
            );
            setLoading(false);
        }
    };

    const nodejs = async () => {navigate(`/dashboard/nodejs/node`);};
    const typsecript = async () => {navigate(`/dashboard/microsoft/TypeScript`);};
    const pytorch = async () => {navigate(`/dashboard/pytorch/pytorch`);};
    const react = async () => {navigate(`/dashboard/react/react`);};
    const openai = async () => {navigate(`/dashboard/openai/openai-python`);};
    const langchain = async () => {navigate(`/dashboard/langchain-ai/langchain`);};
    const psf = async () => {navigate(`/dashboard/psf/requests`);};
    const tensorflow = async () => {navigate(`/dashboard/tensorflow/tensorflow`);};
    const fastapi = async () => {navigate(`/dashboard/fastapi/full-stack-fastapi-template`);};
    const octocat = async () => {navigate(`/dashboard/octocat/Hello-World`);};
    const flask = async () => {navigate(`/dashboard/pallets/flask`);};
    const vscode = async () => {navigate(`/dashboard/microsoft/vscode`);};
   

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                flexDirection: "column",
                gap: "20px"
            }}
        >
            <div
                style={{
                    flex:1,
                    width: "550px",
                    background: "#D7F1C6",
                    padding: "35px",
                    borderRadius: "15px",
                }}
            >
                <h1 style={{textAlign: "center"}}> GitHub Analytics Dashboard</h1>
            </div>
            <div
                style={{
                    flex:1,
                    width: "550px",
                    background: "#D7F1C6",
                    padding: "35px",
                    borderRadius: "15px",
                }}
            >
                <h2 style={{textAlign: "center"}}>search new repository: </h2>
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
                            borderRadius: "8px",
                        }}/>

                </div>

                <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "10px",
                        background: loading? "#9CA3AF": "#15803D",
                        color: "white",
                        fontSize: "16px",
                        cursor:loading? "not-allowed": "pointer"
                    }}>
                    {loading ? "Analyzing Repository...": "Analyze Repository"}
                </button>
            </div>

            <div
                style={{
                    flex:1,
                    width: "550px",
                    background: "#D7F1C6",
                    padding: "35px",
                    borderRadius: "15px",
                    gap: "20px"
                }}>
                <h2 style={{textAlign:"center"}}> or choose from existing repos: </h2>
                <button
                    onClick={nodejs}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "10px",
                        background:"#15803D",
                        color: "white",
                        fontSize: "16px",
                        cursor:"pointer"
                    }} >
                    {"nodejs/node"}
                </button>

                <button
                    onClick={typsecript}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "10px",
                        background:"#15803D",
                        color: "white",
                        fontSize: "16px",
                        cursor:"pointer"
                    }}>
                    {"microsoft/TypeScript"}
                </button>

                <button
                    onClick={pytorch}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "10px",
                        background:"#15803D",
                        color: "white",
                        fontSize: "16px",
                        cursor:"pointer"
                    }}>
                    {"pytorch/pytorch"}
                </button>

                <button
                    onClick={react}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "10px",
                        background:"#15803D",
                        color: "white",
                        fontSize: "16px",
                        cursor:"pointer"
                    }}
                >
                    {"facebook/react"}
                </button>

                <button
                    onClick={openai}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "10px",
                        background:"#15803D",
                        color: "white",
                        fontSize: "16px",
                        cursor:"pointer"
                    }}
                >
                    {"openai/openai-python"}
                </button>

                <button
                    onClick={langchain}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "10px",
                        background:"#15803D",
                        color: "white",
                        fontSize: "16px",
                        cursor:"pointer"
                    }}
                >
                    {"langchain-ai/langchain"}
                </button>

                <button
                    onClick={psf}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "10px",
                        background:"#15803D",
                        color: "white",
                        fontSize: "16px",
                        cursor:"pointer"
                    }}
                >
                    {"psf/requests"}
                </button>

                <button
                    onClick={tensorflow}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "10px",
                        background:"#15803D",
                        color: "white",
                        fontSize: "16px",
                        cursor:"pointer"
                    }}
                >
                    {"tensorflow/tensorflow"}
                </button>

                <button
                    onClick={vscode}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "10px",
                        background:"#15803D",
                        color: "white",
                        fontSize: "16px",
                        cursor:"pointer"
                    }}
                >
                    {"microsoft/vscode"}
                </button>

                <button
                    onClick={flask}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "10px",
                        background:"#15803D",
                        color: "white",
                        fontSize: "16px",
                        cursor:"pointer"
                    }}
                >
                    {"pallets/flask"}
                </button>

                <button
                    onClick={octocat}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "10px",
                        background:"#15803D",
                        color: "white",
                        fontSize: "16px",
                        cursor:"pointer"
                    }}
                >
                    {"octocat/Hello-World"}
                </button>

                <button
                    onClick={fastapi}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "10px",
                        background:"#15803D",
                        color: "white",
                        fontSize: "16px",
                        cursor:"pointer"
                    }}
                >
                    {"fastapi/full-stack-fastapi-tempplate"}
                </button>

            </div>
        </div>
    );
}
export default SearchPage;