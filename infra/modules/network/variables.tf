variable "network_name" {
  description = "Name assigned to the VPC network"
  type        = string
}

variable "base_cidr" {
  description = "Base CIDR block for the VPC network"
  type        = string
}

variable "subnet_plans" {
  description = "List of subnet plans defining; module will compute subnet CIDRs and names based on these plans"
  type = list(object({
    name          = optional(string)
    region        = string
    prefix_length = number
  }))
  default = []
}
