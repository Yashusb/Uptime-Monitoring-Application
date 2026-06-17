# Running the Application

## Overview

This document provides step-by-step instructions to run the Uptime Monitoring Application locally.

The application consists of:

* React Frontend
* Django REST Backend
* SQLite Database
* Docker Compose orchestration

The recommended approach is to run the entire solution using Docker Compose, which automatically starts all required services.

---

# Prerequisites

Please ensure the following software is installed on your system:

### Required

* Docker Desktop
* Docker Compose

Verify installation:

```bash
docker --version
docker compose version
```

---

# Clone Repository

```bash
git clone <repository-url>
cd uptime-monitor
```

---

# Running the Application (Recommended)

The project includes Dockerfiles for both frontend and backend services, along with a Docker Compose configuration.

From the project root directory:

```bash
docker compose up --build
```

The first build may take a few minutes because Docker needs to download base images and install dependencies.

Once the containers start successfully, Docker Compose will display logs for both services.

---

# Accessing the Application

## Frontend

Open:

```text
http://localhost:5173
```

This is the primary user interface used to register URLs and monitor uptime status.

---

## Backend API

Open:

```text
http://localhost:8000/api/status/
```

This endpoint returns the latest health-check results for all monitored URLs.

---

# Verifying Application Functionality

To verify the monitoring workflow:

### Step 1

Open the frontend:

```text
http://localhost:5173
```

---

### Step 2

Add a healthy URL:

```text
https://example.com
```

Expected result:

* Status = UP
* HTTP Status Code = 200
* Response Time displayed
* Latest Check Timestamp displayed

---

### Step 3

Add an invalid URL:

```text
https://fake-url-123456789.com
```

Expected result:

* Status = DOWN
* Status Code unavailable
* Response Time unavailable

---

### Step 4

Wait for the scheduler to execute the next monitoring cycle.

The dashboard should automatically refresh and display updated health-check information.

This validates that:

* URL registration works
* Periodic health checks are running
* Results are stored in the database
* Frontend displays live monitoring information

---

# Database Verification

The application uses SQLite for persistence.

To inspect stored records:

Navigate to:

```bash
cd backend
```

Activate virtual environment if required:

```bash
source venv/bin/activate
```

Open Django shell:

```bash
python manage.py shell
```

Example commands:

```python
from monitor_app.models import MonitoredURL
from monitor_app.models import HealthCheck

MonitoredURL.objects.all()

HealthCheck.objects.count()
```

These commands allow verification that monitored URLs and health-check results are being persisted successfully.

---

# Viewing Container Status

To verify running containers:

```bash
docker ps
```

Expected services:

```text
uptime-monitor-backend
uptime-monitor-frontend
```

Both containers should show:

```text
STATUS: Up
```

---

# Viewing Container Logs

Backend logs:

```bash
docker logs uptime-monitor-backend-1
```

Frontend logs:

```bash
docker logs uptime-monitor-frontend-1
```

These logs are useful for troubleshooting startup or runtime issues.

---

# Stopping the Application

To stop all running services:

```bash
docker compose down
```

---

# Notes

* Health-check data is stored in SQLite.
* Docker containers can be recreated using Docker Compose.
* The application was developed as an MVP assignment implementation.
* The solution demonstrates API development, periodic URL monitoring, frontend integration, containerization, and local deployment using Docker Compose.

---

# Support

If the application does not start successfully:

1. Verify Docker Desktop is running.
2. Verify ports 5173 and 8000 are available.
3. Rebuild containers:

```bash
docker compose up --build
```

4. Review container logs for additional troubleshooting information.
