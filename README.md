# Loot Master Database (loot-master-db)

This repository contains infrastructure-as-code (IaC) using AWS Cloud Development Kit (CDK) to deploy a PostgreSQL database instance for the Loot Master application.

## Overview

The `loot-master-db` project automates the deployment of an Amazon RDS PostgreSQL instance within a Virtual Private Cloud (VPC) on AWS. This setup ensures a scalable and managed database solution for storing Loot Master application data securely.

## Features

- **AWS CDK Infrastructure**: Uses AWS CDK to define and deploy cloud infrastructure.
- **PostgreSQL Database**: Utilizes Amazon RDS to manage PostgreSQL database instances.
- **Modular Design**: Organizes CDK constructs for VPC and RDS instance for clarity and scalability.

## Prerequisites

Before deploying this project, ensure you have:

- AWS account credentials configured locally (`aws configure`).
- Node.js and npm installed on your local machine.
- AWS CDK CLI installed (`npm install -g aws-cdk`).

## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/loot-master-db.git
   cd loot-master-db
