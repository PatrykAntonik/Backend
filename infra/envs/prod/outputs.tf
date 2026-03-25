output "service_account_email" {
  description = "Email of the service account used by Cloud Run services"
  value       = module.service_account.email
}

output "transplant_api_url" {
  description = "URL of the Transplant API Cloud Run service"
  value       = module.transplant_api.service_uri
}

output "transplant_web_url" {
  description = "URL of the Transplant Web Cloud Run service"
  value       = module.transplant_web.service_uri
}
