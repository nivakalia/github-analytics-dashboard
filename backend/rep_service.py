from models import Repository


def get_repository(db, owner, repo):

    return (
        db.query(Repository)
        .filter(
            Repository.owner == owner,
            Repository.name == repo
        )
        .first()
    )