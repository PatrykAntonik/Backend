variable "project_id" {
  type        = string
  description = "GCP project that hosts prod resources"
}

variable "region" {
  type        = string
  description = "Default region for Cloud Run and other regional services"
}

variable "service_account_id" {
  type        = string
  description = "Short ID for the shared Cloud Run service account"
}

variable "service_account_display_name" {
  type        = string
  description = "Display name for the shared Cloud Run service account"
}

variable "service_account_description" {
  type        = string
  description = "Description for the shared Cloud Run service account"
}

variable "service_account_roles" {
  type        = list(string)
  description = "IAM roles granted to the shared Cloud Run service account"
}

variable "api_service_name" {
  type        = string
  description = "Cloud Run service name for the API"
}

variable "api_allow_unauthenticated" {
  type        = bool
  description = "Expose the API Cloud Run service publicly"
}

variable "api_service_description" {
  type        = string
  description = "Human readable description for the API Cloud Run service"
}

variable "web_service_name" {
  type        = string
  description = "Cloud Run service name for the frontend"
}

variable "web_allow_unauthenticated" {
  type        = bool
  description = "Expose the frontend Cloud Run service publicly"
}

variable "web_service_description" {
  type        = string
  description = "Human readable description for the frontend Cloud Run service"
}
