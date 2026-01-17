

BSSRMD Client is a frontend web application built as part of the **Blockchain-Based Secure Sharing of Research and Medical Data (BSSRMD)** project. The application provides a modern, responsive user interface for interacting with the BSSRMD platform.

* **Frontend Framework:** JavaScript (Vite-based)
* **Styling:** Tailwind CSS
* **Build Tool:** Node.js
* **Web Server:** Nginx
* **Containerization:** Docker
* **CI/CD:** GitHub Actions
* **Container Registry:** Docker Hub

**Dockerized Architecture**
This project uses a **multi-stage Docker build**:

1. **Build Stage**

   * Uses Node.js to install dependencies and generate a production-ready static build.
2. **Production Stage**

   * Uses Nginx to serve the compiled static files efficiently.

This approach ensures a **small, optimized production image**.

---

**Continuous Integration (CI)**

The project is configured with **GitHub Actions** for Continuous Integration:

* Automatically builds the Docker image on every push to the `main` branch
* Validates the Dockerfile and application build process
* Pushes the built Docker image to **Docker Hub** for reuse and deployment demonstrating a **real-world CI pipeline** for containerized frontend applications.

## 🚀 Running the Application Locally

### Using Docker

```bash
docker run -d -p 8080:80 <dockerhub-username>/bsspd:latest
```

Then open:

```
http://localhost:8080
```

---

## 📌 Project Highlights

* Multi-stage Docker build for optimized images
* Automated CI pipeline using GitHub Actions
* Docker image publishing to Docker Hub
* Production-ready Nginx deployment
* Clean and scalable frontend setup

