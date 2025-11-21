resource "google_compute_network" "vpc" {
  name                    = var.network_name
  auto_create_subnetworks = false
  description             = "VPC network for the project"
  routing_mode            = "REGIONAL"
}

locals {
  base_prefix_length = tonumber(element(split(var.base_cidr, "/"), 1))

  computed_subnets = [
    for idx, plan in var.subnet_plans : {
      name   = coalesce(plan.name, "subnet-${idx + 1}")
      region = plan.region
      cidr = cidrsubnet(
        var.base_cidr,
        plan.prefix_length - local.base_prefix_length,
        sum([
          for prev in slice(var.subnet_plans, 0, idx) :
          pow(2, prev.prefix_length - local.base_prefix_length)
        ])
      )
    }
  ]

  subnet_map = { for subnet in local.computed_subnets : subnet.name => subnet }
}

resource "google_compute_subnetwork" "this" {
  for_each                 = local.subnet_map
  name                     = each.key
  region                   = each.value.region
  ip_cidr_range            = each.value.cidr
  network                  = google_compute_network.vpc.id
  private_ip_google_access = true
}
