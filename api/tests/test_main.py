import pytest
from fastapi.testclient import TestClient
from httpx import Response

from src.main import app


client = TestClient(app)


@pytest.fixture
def root_response() -> Response:
    return client.get("/")


def test_read_root(root_response: Response) -> None:
    assert root_response.status_code == 200
    assert root_response.json() == {"message": "Welcome to WR Tactics API"}


def test_root_response_structure(root_response: Response) -> None:
    data = root_response.json()

    assert "message" in data
    assert isinstance(data["message"], str)


def test_root_content_type(root_response: Response) -> None:
    assert root_response.headers["content-type"] == "application/json"
