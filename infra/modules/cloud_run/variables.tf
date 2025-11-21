variable "service_name" {
  description = "Name of the Cloud Run service"
  type        = string
}

variable "location" {
  description = "Location (region) where the Cloud Run service will be deployed"
  type        = string
}

variable "description" {
  description = "Description of the Cloud Run service"
  type        = string
  default     = ""
}

variable "labels" {
  description = "Map of labels to apply to the Cloud Run service"
  type        = map(string)
  default     = {}
}

variable "ingress" {
  description = "Ingress settings for the Cloud Run service"
  type        = string
  default     = "INGRESS_TRAFFIC_ALL"
}

variable "min_instance_count" {
  description = "Minimum number of instances for the Cloud Run service"
  type        = number
  default     = 0
}

variable "max_instance_count" {
  description = "Maximum number of instances for the Cloud Run service"
  type        = number
  default     = 1
}

variable "cpu" {
  description = "CPU limit for the Cloud Run service"
  type        = string
  default     = "1"
}

variable "memory" {
  description = "Memory limit for the Cloud Run service"
  type        = string
  default     = "128Mi"
}

variable "allow_unauthenticated" {
  description = "Grant roles/run.invoker to allUsers when true"
  type        = bool
  default     = false
}

variable "service_account_email" {
  description = "Service account email used to run the Cloud Run service"
  type        = string
}
