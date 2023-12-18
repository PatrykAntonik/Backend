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
|   1 | Django                          | ^5.0    |
|   2 | djangorestframework             | ^3.14.0 |
|   3 | django-cors-headers             | ^4.3.0  |
|   4 | django-rest-framework-simplejwt | ^5.3.0  |
|   5 | PyJWT                           | ^2.8.0  |
|   6 | django-phone-field              | ^1.8.1  |
|   7 | django-phonenumber-field        | ^5.0.0  |

#### Install React dependencies:

```bash
cd frontend
yarn
```

| Nr. | Dependency                        | Version  |
|----:|-----------------------------------|----------|
|   1 | @fontsource/roboto                | ^5.0.8   |
|   2 | @mui/icons-material               | ^5.14.16 |
|   3 | @mui/material                     | ^5.14.17 |
|   4 | @mui/x-data-grid                  | ^6.18.4  |
|   5 | axios                             | ^1.6.1   |
|   6 | react                             | ^18.2.0  |
|   7 | react-dom                         | ^18.2.0  |
|   8 | react-redux                       | ^8.1.3   |
|   9 | react-router-dom                  | ^6.17.0  |
|  10 | redux                             | ^4.2.1   |
|  11 | redux-devtools-extension          | ^2.13.9  |
|  12 | redux-thunk                       | ^2.4.2   |


#### Run database migrations:

```bash
python manage.py migrate
```

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

### User examples
#### Donor:
- email: przyklad@user.pl
- password: 123456

#### Hospital:
- email: szpital@hospital.com.pl
- password: 123456

### License

TransplantApp is MIT licensed. See LICENSE for details.

