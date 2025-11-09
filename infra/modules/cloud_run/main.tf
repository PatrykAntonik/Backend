resource "google_cloud_run_v2_service" "cloud_run_service" {
  name                = var.service_name
  location            = var.location
  description         = var.description
  labels              = var.labels
  ingress             = var.ingress
  deletion_protection = false
  scaling {
    min_instance_count = var.min_instance_count
    max_instance_count = var.max_instance_count
  }
  invoker_iam_disabled = false
  lifecycle {
    ignore_changes = [template[0].containers[0].image]
  }
  template {
    containers {
      image = "gcr.io/cloudrun/hello"
      resources {
        limits = {
          cpu    = var.cpu
          memory = var.memory
        }
        cpu_idle = true
      }
    }
    service_account = var.service_account_email
  }
}

resource "google_cloud_run_service_iam_member" "public_invoker" {
  count    = var.allow_unauthenticated ? 1 : 0
  project  = google_cloud_run_v2_service.cloud_run_service.project
  location = google_cloud_run_v2_service.cloud_run_service.location
  service  = google_cloud_run_v2_service.cloud_run_service.name

  role   = "roles/run.invoker"
  member = "allUsers"
}
