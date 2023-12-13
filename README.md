# TransplantApp README

## Description

TransplantApp is a web application designed to streamline the organ and blood donation process. It serves as a platform
for users to register as donors, allows hospitals to manage donations, and provides admins with oversight capabilities.
The app's primary goal is to make the donation process more efficient and accessible.

## Goal

The app aims to simplify the donation process, increasing the rate of successful donations and improving the experience
for donors, hospitals, and administrators.

## Getting Started

### Prerequisites

Python (>= 3.8)
Node.js (>= 14)
npm (comes with Node.js)

### Setup

#### Clone the Repository

```bash
git clone https://github.com/PatrykAntonik/transplantApp.git
```

#### Navigate to the Repository

```bash
cd transplantApp
```

#### Install Python dependencies:

```bash
pip install -r requirements.txt
```

| Nr. | Dependency                      | Version |
|----:|---------------------------------|---------|
|   1 | Django                          | 5.0     |
|   2 | djangorestframework             | 3.14.0  |
|   3 | django-cors-headers             | 4.3.0   |
|   4 | django-rest-framework-simplejwt | 5.3.0   |
|   5 | PyJWT                           | 2.8.0   |
|   6 | django-phone-field              | 1.8.1   |
|   7 | django-phonenumber-field        | 5.0.0   |

#### Install React dependencies:

```bash
cd frontend
yarn
```

#### Run database migrations:

```bash
python manage.py migrate
```

#### Start the Django server:

```bash
python manage.py runserver
```

#### Add a superuser:

```bash
python manage.py createsuperuser
```

### Dependencies

#### React Dependencies

Refer to frontend/package.json for a complete list.

#### Django Dependencies

Refer to requirements.txt for a complete list.

### License

TransplantApp is MIT licensed. See LICENSE for details.

