terraform {
  backend "gcs" {
    bucket = "transplant-app-terraform-state"
    prefix = "environments/prod"
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "7.10.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

module "service_account" {
  source       = "../../modules/service_account"
  account_id   = var.service_account_id
  display_name = var.service_account_display_name
  description  = var.service_account_description
  roles        = var.service_account_roles
}

module "database_url_secret" {
  source    = "../../modules/secret_manager"
  secret_id = var.database_url_secret_id
}

module "django_secret_key" {
  source    = "../../modules/secret_manager"
  secret_id = var.django_secret_key_secret_id
}

module "transplant_api" {
  source                = "../../modules/cloud_run"
  service_name          = var.api_service_name
  location              = var.region
  description           = var.api_service_description
  service_account_email = module.service_account.email
  allow_unauthenticated = var.api_allow_unauthenticated
}

module "transplant_web" {
  source                = "../../modules/cloud_run"
  service_name          = var.web_service_name
  location              = var.region
  description           = var.web_service_description
  service_account_email = module.service_account.email
  allow_unauthenticated = var.web_allow_unauthenticated
}
