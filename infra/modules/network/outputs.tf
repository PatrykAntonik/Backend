output "network_id" {
  description = "Unique identifier of the VPC network"
  value       = google_compute_network.vpc.id
}

output "network_self_link" {
  description = "Self link of the VPC network"
  value       = google_compute_network.vpc.self_link
}

output "subnet_ids" {
  description = "Map of subnet names to their resource IDs"
  value       = { for name, subnet in google_compute_subnetwork.this : name => subnet.id }
}

output "subnet_self_links" {
  description = "Map of subnet names to their self links"
  value       = { for name, subnet in google_compute_subnetwork.this : name => subnet.self_link }
}
