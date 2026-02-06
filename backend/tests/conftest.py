import asyncio
import pytest
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from app.main import app
from app.database import get_db
from app.models import Base

# Test database URL (utiliser une DB de test ou SQLite en mémoire avec aiosqlite pour tests)
TEST_DATABASE_URL = "sqlite+aiosqlite:///./test.db"

engine = create_async_engine(
    TEST_DATABASE_URL,
    echo=False,
)
AsyncTestSession = async_sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False, autocommit=False, autoflush=False
)


async def override_get_db():
    async with AsyncTestSession() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture
def app_client():
    app.dependency_overrides[get_db] = override_get_db
    return app


@pytest.fixture
async def client(app_client):
    async with AsyncClient(
        transport=ASGITransport(app=app_client),
        base_url="http://test",
    ) as ac:
        yield ac
    app_client.dependency_overrides.clear()
