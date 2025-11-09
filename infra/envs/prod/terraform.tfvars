project_id                   = "transplant-app-477411"
region                       = "europe-central2"
service_account_id           = "transplant-app-service-account"
service_account_display_name = "Transplant App Service Account"
service_account_description  = "Service account for Cloud Run instances"
service_account_roles = [
  "roles/run.admin",
  "roles/iam.serviceAccountUser",
  "roles/secretmanager.secretAccessor",
  "roles/secretmanager.secretVersionAdder"
]
database_url_secret_id      = "database-url"
django_secret_key_secret_id = "django-secret"
api_service_name            = "transplant-api"
api_allow_unauthenticated   = true
api_service_description     = "Transplant App API Service"
web_service_name            = "transplant-web"
web_allow_unauthenticated   = true
web_service_description     = "Transplant App Frontend Service"
