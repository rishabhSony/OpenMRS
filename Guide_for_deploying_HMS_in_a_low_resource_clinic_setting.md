# Low-Cost Clinic Deployment Guide

This guide describes how to configure the Hospital Management System (HMS) for a small clinic in India with minimal costs.

## Recommended Architecture: Local Network Server
For a minimal cost setup, we avoid cloud hosting fees by turning one computer in the clinic into a **Local Server**. All other devices (doctor's laptop, receptionist's tablet) connect to it via the clinic's Wi-Fi router.

**Benefits:**
*   **Zero Recurring Hosting Costs**: You own the hardware.
*   **Works Offline**: No internet connection required for day-to-day operations.
*   **Fast**: Data stays within the local Wi-Fi network.

### 1. Hardware Requirements
You need **one** reliable computer to act as the server.
*   **Processor**: Intel i5 or equivalent (Quad-core).
*   **RAM**: 8GB minimum (16GB recommended).
*   **Storage**: 256GB SSD (SSD is crucial for speed).
*   **Operating System**: Ubuntu Linux (Free, stable) or Windows 10/11 Pro.
*   **Network**: A standard Wi-Fi Router.

### 2. Software Setup (The Server)
We will use **Docker** to run the OpenMRS backend and our Frontend easily.

#### Step A: Install Docker
*   **Windows**: Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop).
*   **Linux**: Run `sudo apt-get install docker.io docker-compose`.

#### Step B: Run OpenMRS Backend
Create a folder `hms-server` and add a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  # The Database
  db:
    image: mysql:5.7
    command: --character-set-server=utf8 --collation-server=utf8_general_ci
    environment:
      MYSQL_DATABASE: openmrs
      MYSQL_USER: openmrs
      MYSQL_PASSWORD: openmrs_password
      MYSQL_ROOT_PASSWORD: root_password
    volumes:
      - db_data:/var/lib/mysql

  # The OpenMRS Backend
  backend:
    image: openmrs/openmrs-core:nightly
    depends_on:
      - db
    ports:
      - "8080:8080"
    environment:
      OMRS_DB_URL: jdbc:mysql://db:3306/openmrs?autoReconnect=true&useSSL=false
      OMRS_DB_USER: openmrs
      OMRS_DB_PASSWORD: openmrs_password

volumes:
  db_data:
```

Run `docker-compose up -d` to start the backend. It will be available at `http://localhost:8080/openmrs`.

#### Step C: Host the Frontend
1.  Build the frontend on your development machine: `npm run build`.
2.  Copy the `dist` folder to the Server.
3.  Serve it using a simple web server (like `serve` or Nginx).
    *   Install serve: `npm install -g serve`
    *   Run: `serve -s dist -l 3000`

### 3. Connecting Other Devices
1.  Find the **Local IP Address** of the Server (e.g., `192.168.1.100`).
    *   Windows: Run `ipconfig` in terminal.
    *   Linux: Run `ip addr`.
2.  On the Doctor's Laptop or Tablet, open the browser and go to:
    *   `http://192.168.1.100:3000`

### 4. Backup Strategy (Critical)
Since data is local, if the server crashes, you lose data.
*   **External Hard Drive**: Buy a cheap 1TB external drive.
*   **Automated Script**: Write a script to copy the `db_data` folder or dump the MySQL database to the external drive every night.

## Summary of Costs
| Item | Estimated Cost (INR) | Notes |
| :--- | :--- | :--- |
| **Server PC** | ₹0 - ₹30,000 | Use an existing good PC if available. |
| **Wi-Fi Router** | ₹1,500 | Standard home router is fine. |
| **Software** | ₹0 | OpenMRS, Linux, Docker are free. |
| **Backup Drive** | ₹4,000 | Essential for data safety. |
| **Total** | **~₹5,500 - ₹35,500** | One-time cost. No monthly fees. |
