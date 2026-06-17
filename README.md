# 🚀 Uptime Monitoring Application

A containerized full-stack uptime monitoring application that allows users to register URLs, periodically monitor their availability, and visualize the latest health status in real time.

---

## Overview

This solution was developed as a lightweight uptime monitoring platform capable of:

- Registering URLs for monitoring
- Periodically checking URL health
- Measuring response times
- Capturing HTTP status codes
- Storing monitoring history
- Displaying the latest status through a web dashboard

The application follows a separated frontend/backend architecture to improve maintainability, scalability, and alignment with common production design patterns.

---

## Architecture


┌─────────────────┐
│  React Frontend │
└────────┬────────┘
         │ REST API Calls
         ▼
┌─────────────────┐
│ Django REST API │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ APScheduler     │
│ Health Checker  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ SQLite Database │
└─────────────────┘

---

## Technology Stack

### Frontend

- React
- Axios
- CSS

### Backend

- Python
- Django
- Django REST Framework
- APScheduler

### Database

- SQLite

### Containerization

- Docker
- Docker Compose

---

## Project Structure

uptime-monitor/
│
├── backend/
│   ├── monitor_app/
│   ├── monitor_project/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── manage.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
│
├── README.md
├── AI_LOG.md
└── RUNNING_APPLICATION.md

---

## Design Decisions

### Separate Frontend and Backend

The assignment explicitly requested both a backend API and a frontend UI.

To keep responsibilities isolated:

- React handles presentation and user interaction.
- Django REST Framework handles business logic and persistence.

This separation allows independent scaling and deployment of each component.

---

### APScheduler for Periodic Monitoring

APScheduler was selected to perform recurring health checks.

Every minute:

1. All registered URLs are retrieved.
2. Each URL is pinged using an HTTP request.
3. Response time is measured.
4. Status code is captured.
5. Results are stored in the database.

This approach satisfies the requirement for automated periodic monitoring without introducing additional infrastructure.

---

### SQLite Database

SQLite was chosen because:

- No external database setup is required.
- Lightweight and easy to evaluate.
- Appropriate for assignment scope.

For production workloads, PostgreSQL would be recommended.

---

### Docker-Based Deployment

Docker was used to ensure:

- Consistent runtime environments
- Simplified setup process
- Reproducible deployments

Docker Compose orchestrates both frontend and backend services through a single command.

---

## Features

### URL Registration

Users can add URLs through the web interface.

Example:

https://google.com
https://aws.amazon.com
https://www.netflix.com

---

### Health Monitoring

Each URL is periodically checked and monitored.

Metrics collected:

- HTTP Status Code
- Response Time
- Availability Status
- Timestamp of Last Check

---

### Dashboard

The frontend dashboard displays:

- Total URLs monitored
- Number of URLs UP
- Number of URLs DOWN
- Latest response times
- Last checked timestamp

---

### Infrastructure Provisioning

Terraform would be used to provision:

- VPC
- Public Subnet
- EC2 Instance (or ECS Service)
- Security Groups
- Application Load Balancer
- PostgreSQL Database (RDS)

### Example Terraform Snippet

hcl:

provider "aws" {
  region = "ap-south-1"
}

resource "aws_instance" "uptime_monitor" {
  ami           = "ami-xxxxxxxx"
  instance_type = "t3.micro"

  tags = {
    Name = "uptime-monitor"
  }
}


### Deployment Flow

1. Terraform provisions cloud infrastructure.
2. Docker images are built and pushed to a container registry.
3. Frontend and backend containers are deployed to the target environment.
4. The backend performs scheduled health checks.
5. Monitoring results are stored in the database and displayed through the frontend dashboard.

---

## Running the Application

### Using Docker (Recommended)

Build and start all services:

bash:

docker compose up --build

## Frontend:

http://localhost:5173

## Backend:

http://localhost:8000/api/status/

## Stop services:

docker compose down

---

## Data Persistence

Monitoring data is stored in SQLite.

All registered URLs and health check records are persisted locally within the application database.

---

## Assumptions

- URLs are publicly accessible.
- Health checks are executed every minute.
- SQLite is sufficient for evaluation purposes.
- Single-node deployment is acceptable for assignment scope.

---

## Future Improvements

Potential production-grade enhancements include:

- PostgreSQL database
- Historical charts and trend analysis
- Authentication and authorization
- Alerting via Email or Slack
- Prometheus and Grafana integration
- Kubernetes deployment
- High availability architecture

---

## Limitations

- SQLite is not intended for high-concurrency production workloads.
- APScheduler runs inside the application process.
- No authentication layer is implemented.
- Historical analytics are not currently displayed.

---

## Conclusion

This solution satisfies the assignment requirements by providing:

- A REST-based backend API
- A responsive frontend dashboard
- Automated URL health monitoring
- Persistent storage of monitoring results
- Containerized deployment using Docker

The implementation focuses on simplicity, maintainability, and ease of evaluation while following common full-stack development practices.
