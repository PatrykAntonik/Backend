output "email" {
  description = "Email of the service account."
  value       = google_service_account.sa_account.email
}

output "name" {
  description = "Name of the service account."
  value       = google_service_account.sa_account.name
}

output "unique_id" {
  description = "Unique ID of the service account."
  value       = google_service_account.sa_account.unique_id
}
