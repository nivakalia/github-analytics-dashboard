from fastapi import APIRouter
from sqlalchemy.orm import Session
from fastapi import Depends

from rep_service import get_repository
from github_connect import get_repo
from database import get_db
from models import Repository, Commit, PullRequest, Issue, Contributor, Release
from github_connect import get_commits, get_pull_requests, get_issues, get_contributors, get_releases

router = APIRouter(prefix="/ingest",tags=["Ingestion"])
@router.post("/fetch/{owner}/{repo}")
def fetch_repository(owner: str,repo: str,db: Session = Depends(get_db)):
    data = get_repo(owner, repo)
    if "id" not in data:
        return {"error": data}
    repository = Repository(
        id=data["id"],
        name=data["name"],
        owner=data["owner"]["login"],
        description=data["description"],
        language=data["language"],
        stars=data["stargazers_count"],
        forks=data["forks_count"],
        watchers=data["watchers_count"],
        open_issues=data["open_issues_count"],
        default_branch=data["default_branch"],
        created_at=data["created_at"],
        updated_at=data["updated_at"],
        pushed_at=data["pushed_at"]
    )
    existing_repo = db.query(Repository).filter(Repository.id == data["id"]).first()
    if existing_repo:
        return {"message": "Repository already exists"}
    db.add(repository)
    db.commit()
    db.refresh(repository)
    return repository

@router.post("/fetch-commits/{owner}/{repo}")
def fetch_commits(owner: str,repo: str,db: Session = Depends(get_db)):
    commits = get_commits(owner, repo)
    count = 0
    if not isinstance(commits, list):
        return { "error": commits }    
    for item in commits:
        sha = item["sha"]
        existing = db.query(Commit).filter(Commit.sha == sha).first()
        if existing:
            continue
        repo_data = get_repository(db,owner,repo)
        if not repo_data:
            return {"message": "Repository not found in database" }
        commit = Commit(
            sha=sha,
            repository_id=repo_data.id,
            author=item["commit"]["author"].get("name","Unknown"),
            message=item["commit"]["message"],
            commit_date=item["commit"]["author"]["date"])
        db.add(commit)
        count += 1
    db.commit()
    return {"message": "Commits saved successfully","saved": count }

@router.post("/fetch-prs/{owner}/{repo}")
def fetch_prs(owner: str,repo: str,db: Session = Depends(get_db)):
    repo_data = get_repository(db,owner,repo)
    if not repo_data:
        return {"message":"Repository not found"}
    count = 0
    prs = get_pull_requests(owner, repo)
    if not isinstance(prs, list):
        return { "message": "PR data unavailable", "details": prs}
    
    for item in prs:
        pr_number = item["number"]
        existing = (db.query(PullRequest).filter(PullRequest.pr_number == pr_number,PullRequest.repository_id == repo_data.id).first())
        if existing:
            continue
        pr = PullRequest(
            pr_number=item["number"],
            repository_id=repo_data.id,
            title=item["title"],
            state=item["state"],
            author=item["user"]["login"],
            created_at=item["created_at"],
            closed_at=item["closed_at"],
            merged_at=item["merged_at"]
        )
        db.add(pr)
        count += 1
    db.commit()
    return {"message":"Pull requests saved", "saved": count }


@router.post("/fetch-issues/{owner}/{repo}")
def fetch_issues(owner: str,repo: str,db: Session = Depends(get_db)):
    repo_data = get_repository(db,owner,repo)
    if not repo_data:
        return {"message":"Repository not found"}
    issues = get_issues(owner,repo)
    count = 0
    if not isinstance(issues, list):
        return { "message": "PR data unavailable", "details": issues}
    
    for item in issues:
        if "pull_request" in item:
            continue
        existing = db.query(Issue).filter(Issue.issue_number ==item["number"],Issue.repository_id == repo_data.id).first()
        if existing:continue

        issue = Issue(
            issue_number=item["number"],
            repository_id=repo_data.id,
            title=item["title"],
            state=item["state"],
            author=item["user"]["login"],
            comments=item["comments"],
            created_at=item["created_at"],
            closed_at=item["closed_at"])
        db.add(issue)
        count += 1
    db.commit()
    return {"message":"Issues saved","saved":count}


@router.post("/fetch-contributors/{owner}/{repo}")
def fetch_contributors(owner: str,repo: str,db: Session = Depends(get_db)):
    repo_data = get_repository(db,owner,repo)
    if not repo_data:
        return {"message":"Repository not found"}
    contributors = get_contributors(owner,repo)
    count = 0
    if not isinstance(contributors, list):
        return { "message": "PR data unavailable", "details": contributors}
    
    for item in contributors:
        existing = db.query(Contributor).filter(
    Contributor.github_user_id == item["id"],
    Contributor.repository_id == repo_data.id
).first()
        if existing:
            continue
        contributor = Contributor(
        github_user_id=item["id"],
        repository_id=repo_data.id,
        login=item["login"],
        contributions=item["contributions"],
        avatar_url=item["avatar_url"],
        profile_url=item["html_url"]
    )
        db.add(contributor)
        count += 1
    db.commit()
    return {"message":"Contributors saved","saved":count}

@router.post("/fetch-releases/{owner}/{repo}")
def fetch_releases(owner: str,repo: str,db: Session = Depends(get_db)):
    repo_data = get_repository(db,owner,repo)
    if not repo_data:
        return {"message":"Repository not found"}
    releases = get_releases(owner,repo)
    count = 0
    for item in releases:
        existing = db.query(Release).filter(Release.github_release_id == item["id"],Release.repository_id == repo_data.id).first()        
        if existing:
            continue
        release = Release(
            github_release_id=item["id"],
            repository_id=repo_data.id,
            tag_name=item["tag_name"],
            release_name=item["name"],
            author=item["author"]["login"],
            published_at=item["published_at"]
        )
        db.add(release)
        count += 1
    db.commit()
    return {"message":"Releases saved","saved":count}