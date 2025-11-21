resource "google_service_account" "sa_account" {
  account_id   = var.account_id
  display_name = coalesce(var.display_name, var.account_id)
  description  = var.description
}

resource "google_project_iam_member" "project_iam_roles" {
  member   = "serviceAccount:${google_service_account.sa_account.email}"
  for_each = toset(var.roles)
  role     = each.value
  project  = google_service_account.sa_account.project
}
