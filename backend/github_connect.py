import requests

BASE_URL = "https://api.github.com"

def get_commits(owner, repo):
    url = f"{BASE_URL}/repos/{owner}/{repo}/commits"
    response = requests.get(url)
    return response.json()

def get_repo(owner, repo):
    url = f"https://api.github.com/repos/{owner}/{repo}"
    response = requests.get(url)
    return response.json()

def get_pull_requests(owner, repo):
    url = f"{BASE_URL}/repos/{owner}/{repo}/pulls?state=all"
    response = requests.get(url)
    return response.json()

def get_issues(owner, repo):
    url = f"{BASE_URL}/repos/{owner}/{repo}/issues?state=all"
    response = requests.get(url)
    return response.json()

def get_contributors(owner, repo):
    url = (f"{BASE_URL}/repos/{owner}/{repo}/contributors")
    response = requests.get(url)
    return response.json()

def get_releases(owner, repo):
    url = (f"{BASE_URL}/repos/{owner}/{repo}/releases")
    response = requests.get(url)
    return response.json()