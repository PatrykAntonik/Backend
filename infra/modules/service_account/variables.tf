variable "account_id" {
  description = "ID of the service account (without domain)"
  type        = string
}

variable "display_name" {
  description = "Display name of the service account"
  type        = string
  default     = null
}

variable "description" {
  description = "Description of the service account"
  type        = string
  default     = null
}

variable "roles" {
  description = "List of IAM roles to assign to the service account"
  type        = list(string)
  default     = []
}
