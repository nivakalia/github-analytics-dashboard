from sqlalchemy.orm import Session
from fastapi import Depends
from rep_service import get_repository
from database import get_db
from models import Commit, PullRequest, Issue, Contributor
from datetime import datetime, timedelta, timezone

def get_repository_activity(owner: str,repo: str,db: Session = Depends(get_db)):
    repo_data = get_repository(db,owner,repo)
    if not repo_data: return {"message":"Repository not found"}
    commits = db.query(Commit).filter(Commit.repository_id ==repo_data.id).all()
    total_commits = len(commits)
    active_contributors = len(set(commit.author for commit in commits))
    last_30_days = datetime.now(timezone.utc) - timedelta(days=30)
    recent_commits = 0
    monthly_trend = {}
    for commit in commits:
        commit_date = datetime.fromisoformat(commit.commit_date.replace("Z","+00:00"))
        month = commit_date.strftime("%Y-%m")
        monthly_trend[month] = (monthly_trend.get(month, 0)+ 1)
        if commit_date >= last_30_days:
            recent_commits += 1
    return {
        "repository": repo,
        "total_commits": total_commits,
        "active_contributors":active_contributors,
        "commits_last_30_days":recent_commits,
        "monthly_commit_trend":monthly_trend
    }

def get_pr_insights(owner: str,repo: str,db: Session = Depends(get_db)):
    repo_data = get_repository(db,owner,repo)
    if not repo_data:return {"message":"Repository not found"}
    prs = db.query(PullRequest).filter(PullRequest.repository_id ==repo_data.id).all()
    total_prs = len(prs)
    open_prs = 0
    closed_prs = 0
    merged_prs = 0
    total_merge_time = 0
    merged_count = 0
    total_closed_time=0
    for pr in prs:
        created = datetime.fromisoformat(pr.created_at.replace("Z","+00:00"))
        if pr.state == "open":
            open_prs += 1
        else:
            closed=datetime.fromisoformat(pr.closed_at.replace("Z","+00:00"))
            close_time = (closed - created).total_seconds()
            total_closed_time+=close_time
            closed_prs += 1
        if pr.merged_at:
            merged_prs += 1
            merged = datetime.fromisoformat(pr.merged_at.replace("Z","+00:00"))
            merge_time = (merged - created).total_seconds()
            total_merge_time += merge_time
            merged_count += 1
    average_merge_time = 0
    average_close_time=0
    if closed_prs>0:
        average_close_time = (total_closed_time /closed_prs /3600)
    if merged_count > 0:
        average_merge_time = (total_merge_time /merged_count /3600)
    return {
        "repository": repo,
        "total_prs": total_prs,
        "open_prs": open_prs,
        "closed_prs": closed_prs,
        "merged_prs": merged_prs,
        "average_merge_time_hours":round(average_merge_time,2),
        "average_close_time_hours":round(average_close_time, 2)
    }

def get_issue_insights(owner: str,repo: str,db: Session = Depends(get_db)):
    repo_data = get_repository(db,owner,repo)
    if not repo_data:return {"message":"Repository not found"}
    issues = db.query(Issue).filter(Issue.repository_id ==repo_data.id).all()
    total_issues = len(issues)
    open_issues = 0
    resolved_issues = 0
    total_resolution_time = 0
    resolved_count = 0
    monthly_trend = {}
    for issue in issues:
        created = datetime.fromisoformat(issue.created_at.replace("Z","+00:00"))
        month = created.strftime("%Y-%m")
        monthly_trend[month] = (monthly_trend.get(month, 0)+ 1)
        if issue.state == "open":
            open_issues += 1
        else:
            resolved_issues += 1
            if issue.closed_at:
                closed = datetime.fromisoformat(issue.closed_at.replace("Z","+00:00"))
                resolution_time = (closed - created).total_seconds()
                total_resolution_time += (resolution_time)
                resolved_count += 1
    average_resolution_hours = 0
    if resolved_count > 0:
        average_resolution_hours = (total_resolution_time/resolved_count/3600)
    return {
        "repository": repo,
        "total_issues":total_issues,
        "open_issues":open_issues,
        "resolved_issues":resolved_issues,
        "average_resolution_hours":round(average_resolution_hours,2),
        "monthly_issue_trend":monthly_trend
    }

def get_contributor_insights(owner: str,repo: str,db: Session = Depends(get_db)):
    repo_data = get_repository(db,owner,repo)
    if not repo_data:return {"message":"Repository not found"}
    contributors = db.query(Contributor).filter(Contributor.repository_id ==repo_data.id).all()
    total_contributors = len(contributors)
    total_contributions = sum(
        contributor.contributions
        for contributor in contributors
    )
    top_contributors = []
    for contributor in sorted(contributors,key=lambda x: x.contributions,reverse=True)[:5]:
        percentage = 0
        if total_contributions > 0:
            percentage = (contributor.contributions/total_contributions) * 100
        top_contributors.append({
            "login":contributor.login,
            "contributions":contributor.contributions,
            "percentage":round(percentage,2)
        })
    return {
        "repository": repo,
        "total_contributors":total_contributors,
        "total_contributions":total_contributions,
        "top_contributors":top_contributors
    }

def get_repository_health(owner: str,repo: str,db: Session = Depends(get_db)):
    repo_data = get_repository(db,owner,repo)
    if not repo_data:
        return {"message":"Repository not found"}
    commits = db.query(Commit).filter(Commit.repository_id ==repo_data.id).all()
    prs = db.query(PullRequest).filter(PullRequest.repository_id ==repo_data.id).all()
    issues = db.query(Issue).filter(Issue.repository_id ==repo_data.id).all()
    contributors = db.query(Contributor).filter(Contributor.repository_id ==repo_data.id).all()
    last_30_days = datetime.now(timezone.utc)- timedelta(days=30)
    recent_commits = 0
    for commit in commits:
        commit_date = datetime.fromisoformat(commit.commit_date.replace("Z","+00:00"))
        if commit_date >= last_30_days:
            recent_commits += 1
    commit_score = min(recent_commits,100)
    merged_prs = 0
    total_prs = len(prs)
    for pr in prs:
        if pr.merged_at:
            merged_prs += 1
    pr_score = 0
    if total_prs > 0:
        pr_score = (merged_prs /total_prs) * 100
    resolved_issues = 0
    total_issues = len(issues)
    for issue in issues:
        if issue.state == "closed":
            resolved_issues += 1
    issue_score = 0
    if total_issues > 0:
        issue_score = (resolved_issues /total_issues) * 100
    total_contributors = len(contributors)
    contributor_score = min(total_contributors * 5,100)
    health_score = (commit_score * 0.30 +pr_score * 0.25 +issue_score * 0.25 +contributor_score * 0.20)
    if health_score >= 80: status = "Excellent"
    elif health_score >= 60: status = "Good"
    elif health_score >= 40: status = "Fair"
    else: status = "Needs Attention"
    return {
        "repository": repo,
        "health_score":round(health_score,2),
        "status":status,
        "metrics": {
            "commit_score":round(commit_score, 2),
            "pr_score":round(pr_score, 2),
            "issue_score":round(issue_score, 2),
            "contributor_score":round(contributor_score, 2)
        }
    }
