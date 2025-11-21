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
npm (comes with Node.js),
yarn (>= 1.22.5)

### Setup

#### Clone the Repository

```bash
git clone https://github.com/PatrykAntonik/Backend.git
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
|   1 | Django                          | ^5.0    |
|   2 | djangorestframework             | ^3.14.0 |
|   3 | django-cors-headers             | ^4.3.0  |
|   4 | django-rest-framework-simplejwt | ^5.3.0  |
|   5 | PyJWT                           | ^2.8.0  |
|   6 | django-phone-field              | ^1.8.1  |
|   7 | django-phonenumber-field        | ^5.0.0  |

#### Configure frontend environment file

Copy the provided example before running any services (it is ignored by git):

```bash
cp frontend/.env.example frontend/.env
```

#### Install React dependencies:

```bash
cd frontend
yarn
```

| Nr. | Dependency               | Version  |
|----:|--------------------------|----------|
|   1 | @mui/icons-material      | ^5.14.16 |
|   2 | @mui/material            | ^5.14.17 |
|   3 | @mui/x-data-grid         | ^6.18.4  |
|   4 | axios                    | ^1.6.1   |
|   5 | react                    | ^18.2.0  |
|   6 | react-dom                | ^18.2.0  |
|   7 | react-redux              | ^8.1.3   |
|   8 | react-router-dom         | ^6.17.0  |
|   9 | redux                    | ^4.2.1   |
|  10 | redux-devtools-extension | ^2.13.9  |
|  11 | redux-thunk              | ^2.4.2   |
|  12 | validator                | ^13.11.0 |



#### Start the Django server:

```bash
python manage.py runserver
```

#### Start the React server:

```bash
cd frontend
npm start
```

#### Add a superuser:

```bash
python manage.py createsuperuser
```
#### Run database migrations:

```bash
python manage.py migrate
```

### Open app:
http://localhost:3000/

### Open admin panel:
http://localhost:8000/admin/

### User examples

#### Donor:

- email: jan@kowalski.pl
- password: Hasło123

#### Hospital:

- email: szpital@bielsko.pl
- password: Hasło123

#### Admin:
- username: admin
- password: 123

### License

TransplantApp is MIT licensed. See LICENSE for details.
