import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import CommitChart from "../charts/CommitChart";
import ContributorTable from "../components/ContributorTable";
import IssueBanner from "../components/IssueBanner";
import SummaryBanner from "../components/SummaryBanner";
import IssueChart from "../charts/IssueChart";
import IssuePieChart from "../charts/IssuePieChart";
import PRpieChart from "../charts/PRpieChart";
import ContributorPieChart from "../charts/ContributorPieChart";
import HealthBar from "../components/HealthBar";
import StatCard from "../components/StatCard";
import StatCardg from "../components/StatCardg";
import HealthSection from "../components/HealthSection";

function DashboardPage() {
    const { owner, repo } = useParams();
    const [health, setHealth] = useState(null);
    const [repoActivity, setRepoActivity] = useState(null);
    const [issueInsights, setIssueInsights] = useState(null);
    const [contributors, setContributors] = useState(null);
    const [prInsights, setPR] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const [
                    healthRes,prRes,activityRes,issueRes,contributorRes] = await Promise.all([
                    api.get(
                        `/analytics/health/${owner}/${repo}`
                    ),
                    api.get(
                        `/analytics/pr-insights/${owner}/${repo}`
                    ),
                    api.get(
                        `/analytics/repository-activity/${owner}/${repo}`
                    ),
                    api.get(
                        `/analytics/issues/${owner}/${repo}`
                    ),
                    api.get(
                        `/analytics/contributors/${owner}/${repo}`
                    )
                ]);
                setHealth(healthRes.data);
                setRepoActivity(activityRes.data);
                setIssueInsights(issueRes.data);
                setContributors(contributorRes.data);
                setPR(prRes.data);

            } catch (error) {
                console.error(error);
                setError("Failed to load dashboard");
            } finally {setLoading(false);}
        };
        fetchDashboard();
    }, [owner, repo]);

    if (loading) {
        return <h1>Loading...</h1>;}
    if (error) {
        return <h1>{error}</h1>;}

    const commitTrendData =repoActivity?Object.entries(repoActivity.monthly_commit_trend).map(
        ([month, commits]) => ({month,commits})):[];
    const IssueTrendData =repoActivity?Object.entries(issueInsights.monthly_issue_trend).map(
        ([month, issues]) => ({month,issues})):[];

    return (
        <div
            style={{
                maxWidth: "1400px",
                margin: "0 auto",
                padding: "30px"
            }}>
            <h1>{owner}/{repo}</h1>
            <h2>Dashboard</h2>
            <div
                style={{
                    display: "grid",
                    placeItems: "center",
                    background: "#f5f5f5",
                    borderRadius: "12px"}}
            >
                <h3>Owner: {owner}</h3>      
            </div>
            <h2></h2>
            <div
                style={{
                    display: "grid",
                    placeItems: "center",
                    background: "#f5f5f5",
                    borderRadius: "12px"}}
            >
                <h3>Description: {repoActivity?.description}</h3>      
            </div>
            <h2></h2>
            <SummaryBanner
                commits={repoActivity?.total_commits}
                stars={repoActivity?.stars}
                forks={repoActivity?.forks}
                watchers={repoActivity?.watchers}
            />

            <h2>Contributor Insights</h2>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "0px"
                }}>

                <ContributorPieChart
                    data={contributors.top_contributors}
                />
                <ContributorTable
                    contributors={contributors.top_contributors}
                />
            
            </div>
                <h2>Commit Trend</h2>
                <div
                    style={{width: "100%", height: "350px"}}
                >
                    <CommitChart data={commitTrendData}/>
                </div>
                <div
                    style={{
                        background:"#f8f9fa",
                        padding:"20px",
                        borderRadius:"12px",
                        marginTop:"20px"
                    }}
                >
                    <h3>Overall Development Summary</h3>
                    <p>{repoActivity?.development_summary}</p>
                </div>

                <h2>PR Analytics</h2>
                <div
                    style={{
                        display: "flex",
                        alignItems: "stretch",
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            padding: "20px"
                        }}
                    >
                        <PRpieChart data={prInsights} />
                    </div>
                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                        }}
                    >
                        <StatCardg
                            title="Closed PRs"
                            value={`${prInsights.closed_prs} `}
                        />
                        <StatCard
                            title="Open PRs"
                            value={`${prInsights.open_prs} `}
                        />
                    </div>
                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                        }}
                    >
                        <StatCard
                            title="Average Merge Time"
                            value={`${prInsights.average_merge_time_hours} hours`}
                        />
                        <StatCardg
                            title="Average Close Time"
                            value={`${prInsights.average_close_time_hours} hours`}
                        />    
                    </div>
                    <div
                        style={{
                            flex: 2,
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                        }}
                    >
                        <StatCardg
                            title="Total PRs"
                            value={`${prInsights.total_prs} `}
                        />
                        <StatCard
                            title="Merged PRs"
                            value={`${prInsights.merged_prs} `}
                        />
                    </div>
                </div>
                <h2>Issue Analytics</h2>
                <IssueBanner data={issueInsights}/>
                <div
                    style={{
                        display: "flex",
                        alignItems: "stretch",
                    }}
                >
                    <div
                        style={{
                            flex: 2,
                            padding: "20px"}}
                    >
                        <IssueChart data={IssueTrendData}/>
                    </div>
                    <div
                        style={{
                            flex: 1,
                            padding: "20px"
                        }}
                    >
                        <IssuePieChart data={issueInsights}/>
                    </div>
                </div>
                <h2> Health analytics</h2>
                <HealthBar score={health?.health_score || 0}/>
                <HealthSection health={health}/>       
        </div>        
    );
}

export default DashboardPage;
