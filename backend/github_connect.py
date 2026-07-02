import os

import requests

BASE_URL = "https://api.github.com"

HEADERS = {"Authorization":"Bearer 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"}

def get_commits(owner, repo):
    all_commits = []
    page = 1
    while page <= 15:
        url = (f"{BASE_URL}/repos/{owner}/{repo}/commits?per_page=100&page={page}")
        response = requests.get(url,headers=HEADERS)
        data = response.json()
        
        if response.status_code != 200:
            return data
        if not isinstance(data, list):
            return data
        if len(data) == 0:
            break
        all_commits.extend(data)
        page += 1
    return all_commits

def get_repo(owner, repo):
    all_issues = []
    page = 1
    while page <= 15:
        url = f"https://api.github.com/repos/{owner}/{repo}?per_page=100&page={page}"
        response = requests.get(url,headers=HEADERS)
        data = response.json()
        
        if response.status_code != 200:
            return data
        if not isinstance(data, list):
            return data
        if len(data) == 0:
            break
        all_issues.extend(data)
        page += 1
    return all_issues



def get_pull_requests(owner, repo):
    all_prs = []
    page = 1
    while page <= 15:
        url = f"{BASE_URL}/repos/{owner}/{repo}/pulls?state=all&per_page=100&page={page}"
        response = requests.get(url,headers=HEADERS)
        data = response.json()
        if response.status_code != 200:
            return data
        if not isinstance(data, list):
            return data
        if len(data) == 0:
            break
        all_prs.extend(data)
        page += 1
    return all_prs


def get_issues(owner, repo):
    all_issues = []
    page = 1
    while page <= 15:
        url = f"{BASE_URL}/repos/{owner}/{repo}/issues?state=all&per_page=100&page={page}"
        response = requests.get(url,headers=HEADERS)
        data = response.json()
        if response.status_code != 200:
            return data
        if not isinstance(data, list):
            return data
        if len(data) == 0:
            break
        all_issues.extend(data)
        page += 1
    return all_issues


def get_contributors(owner, repo):
    all_contributors = []
    page = 1
    while page <= 15:
        url = (
    f"{BASE_URL}/repos/{owner}/{repo}/contributors"
    f"?per_page=100&page={page}"
)
        response = requests.get(url,headers=HEADERS)
        data = response.json()
        if response.status_code != 200:
            return data
        if not isinstance(data, list):
            return data
        if len(data) == 0:
            break
        all_contributors.extend(data)
        page += 1
    return all_contributors

def get_releases(owner, repo):
    all_releases = []
    page = 1
    while page <= 15:
        url = (f"{BASE_URL}/repos/{owner}/{repo}/releases?per_page=100&page={page}")
        response = requests.get(url,headers=HEADERS)
        data = response.json()
        if response.status_code != 200:
            return data
        if not isinstance(data, list):
            return data
        if len(data) == 0:
            break
        all_releases.extend(data)
        page += 1
    return all_releases
    
  
    