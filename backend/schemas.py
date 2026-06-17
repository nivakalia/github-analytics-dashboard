from pydantic import BaseModel


class RepositoryActivityResponse(BaseModel):

    repository: str
    total_commits: int
    active_contributors: int
    commits_last_30_days: int