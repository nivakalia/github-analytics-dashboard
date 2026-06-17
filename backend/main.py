from fastapi import FastAPI

from routers.repository import router as repository_router
from routers.ingestion import router as ingestion_router
from routers.analytics import router as analytics_router

app = FastAPI()

app.include_router(repository_router)

app.include_router(ingestion_router)

app.include_router(analytics_router)