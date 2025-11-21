output "service_name" {
  description = "Name of the Cloud Run service"
  value       = google_cloud_run_v2_service.cloud_run_service.name
}

output "service_id" {
  description = "ID of the Cloud Run service"
  value       = google_cloud_run_v2_service.cloud_run_service.id
}

output "service_uri" {
  description = "Public HTTPS endpoint for the Cloud Run service"
  value       = google_cloud_run_v2_service.cloud_run_service.uri
}
