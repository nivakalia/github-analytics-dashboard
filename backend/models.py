from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base
from sqlalchemy import ForeignKey
from datetime import datetime, timezone

Base = declarative_base()

class Repository(Base):
    __tablename__ = "repositories"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    owner = Column(String)
    description = Column(String)
    language = Column(String)
    stars = Column(Integer)
    forks = Column(Integer)
    watchers = Column(Integer)
    open_issues = Column(Integer)
    default_branch = Column(String)
    created_at = Column(String)
    updated_at = Column(String)
    pushed_at = Column(String)
    last_synced = Column(String)

class Commit(Base):
    __tablename__ = "commits"
    sha = Column(String, primary_key=True)
    repository_id = Column(Integer,ForeignKey("repositories.id"))    
    author = Column(String)
    message = Column(String)
    commit_date = Column(String)

class PullRequest(Base):
    __tablename__ = "pull_requests"
    id = Column(Integer,primary_key=True,autoincrement=True)
    pr_number = Column(Integer)
    repository_id = Column(Integer,ForeignKey("repositories.id"))
    title = Column(String)
    state = Column(String)
    author = Column(String)
    created_at = Column(String)
    closed_at = Column(String)
    merged_at = Column(String)

class Issue(Base):
    __tablename__ = "issues"
    id = Column(Integer,primary_key=True,autoincrement=True)
    issue_number = Column(Integer)
    repository_id = Column(Integer,ForeignKey("repositories.id"))
    title = Column(String)
    state = Column(String)
    author = Column(String)
    comments = Column(Integer)
    created_at = Column(String)
    closed_at = Column(String)

class Contributor(Base):
    __tablename__ = "contributors"
    id = Column(Integer,primary_key=True,autoincrement=True)
    github_user_id = Column(Integer)
    repository_id = Column(Integer,ForeignKey("repositories.id"))
    login = Column(String)
    contributions = Column(Integer)
    avatar_url = Column(String)
    profile_url = Column(String)

class Release(Base):
    __tablename__ = "releases"
    r_id = Column(Integer,primary_key=True,autoincrement=True)
    github_release_id = Column(Integer)
    repository_id = Column(Integer,ForeignKey("repositories.id"))
    tag_name = Column(String)
    release_name = Column(String)
    author = Column(String)
    published_at = Column(String)