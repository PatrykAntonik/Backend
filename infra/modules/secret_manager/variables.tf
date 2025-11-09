variable "secret_id" {
  description = "ID of the secret"
  type        = string
}

variable "labels" {
  description = "Labels to apply to the secret"
  type        = map(string)
  default     = {}
}
