from apscheduler.schedulers.background import BackgroundScheduler
from database import SessionLocal
from models import Repository
from routers.ingestion import fetch_commits,fetch_prs,fetch_issues,fetch_contributors,fetch_releases
from datetime import datetime, timezone
scheduler = BackgroundScheduler()

def update_all_repositories():
    db = SessionLocal()
    repositories = db.query(Repository).all()
    for repo in repositories:
        print(
            f"Updating {repo.owner}/{repo.name}"
        )
        fetch_commits(repo.owner,repo.name,db)
        fetch_prs(repo.owner,repo.name,db)
        fetch_issues(repo.owner,repo.name,db)
        fetch_contributors(repo.owner,repo.name,db)
        fetch_releases(repo.owner,repo.name,db)

        repo.last_synced = datetime.now(timezone.utc).isoformat()
    db.commit()
    db.close()

scheduler.add_job(
    update_all_repositories,
    trigger="cron",
    minute=0,
    hour=0
)
scheduler.start()
