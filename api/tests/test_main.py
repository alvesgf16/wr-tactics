from fastapi.testclient import TestClient

from src.main import app


client = TestClient(app)


def test_read_root() -> None:
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to WR Tactics API"}


def test_root_response_structure() -> None:
    response = client.get("/")
    data = response.json()
    assert "message" in data
    assert isinstance(data["message"], str)


def test_root_content_type() -> None:
    response = client.get("/")
    assert response.headers["content-type"] == "application/json"
