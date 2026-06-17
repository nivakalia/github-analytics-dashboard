from fastapi import APIRouter
from github_connect import get_repo

router = APIRouter()

@router.get("/repo/{owner}/{repo}")
def repo(owner: str, repo: str):

    return get_repo(owner, repo)