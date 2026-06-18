import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import CommitChart from "../charts/CommitChart";
import ContributorTable from "../components/ContributorTable";
import IssueBanner from "../components/IssueBanner";
import SummaryBanner from "../components/SummaryBanner";
import PRBanner from "../components/PRBanner";

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
                    healthRes,
                    prRes,
                    activityRes,
                    issueRes,
                    contributorRes

                ] = await Promise.all([

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

                setHealth(
                    healthRes.data
                );

                setRepoActivity(
                    activityRes.data
                );

                setIssueInsights(
                    issueRes.data
                );

                setContributors(
                    contributorRes.data
                );

                setPR(
                    prRes.data
                );

            } catch (error) {

                console.error(error);

                setError(
                    "Failed to load dashboard"
                );

            } finally {

                setLoading(false);
            }
        };

        fetchDashboard();

    }, [owner, repo]);

    if (loading) {

        return <h1>Loading...</h1>;
    }

    if (error) {

        return <h1>{error}</h1>;
    }
    const commitTrendData =
    repoActivity
    ?
    Object.entries(
        repoActivity.monthly_commit_trend
    ).map(

        ([month, commits]) => ({

            month,

            commits

        })

    )
    :
    [];

    return (

        <div
            style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "30px"
            }}
        >

            <h1>
                {owner}/{repo}
            </h1>

            <h2>
                Dashboard
            </h2>
            <SummaryBanner

                health={
                    health?.health_score
                }

                commits={
                    repoActivity?.total_commits
                }

                contributors={
                    contributors?.total_contributors
                }

                openIssues={
                    issueInsights?.open_issues
                }

            />
            


                <h2>
                    Commit Trend
                </h2>
                <div
                    style={{
                        width: "90%",
                        height: "350px"
                    }}
                >
                    <CommitChart
                        data={commitTrendData}
                    />

                </div>

                <h2>
                Top Contributors
                </h2>

                {
                contributors?.top_contributors && (

                <ContributorTable
                    contributors={
                        contributors.top_contributors
                    }
                />

                )}
                    <h2>    
                    </h2>
                    <div
            style={{
                margin: "0 auto",
                padding: "30px"
            }}
        >
                    <h2>
                    Issue Analytics
                    </h2>
                    
                    <IssueBanner
                        data={issueInsights}
                    />

                    <h2>
                    PR Analytics
                    </h2>
                    
                    <PRBanner
                        data={prInsights}
                    />

                    </div>

            

        </div>
    );
}

export default DashboardPage;
