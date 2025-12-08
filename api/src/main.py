from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI()


class MessageResponse(BaseModel):
    message: str


@app.get("/", response_model=MessageResponse)
async def root() -> MessageResponse:
    return MessageResponse(message="Welcome to WR Tactics API")
