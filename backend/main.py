from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.repository import router as repository_router
from routers.ingestion import router as ingestion_router
from routers.analytics import router as analytics_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)

app.include_router(repository_router)

app.include_router(ingestion_router)

app.include_router(analytics_router)