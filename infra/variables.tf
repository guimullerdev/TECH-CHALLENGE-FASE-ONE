variable "cluster_name" {
  description = "Name of the local kind Kubernetes cluster"
  type        = string
  default     = "oficina-cluster"
}

variable "namespace" {
  description = "Kubernetes namespace where the database is provisioned"
  type        = string
  default     = "oficina"
}

variable "postgres_image" {
  description = "Postgres image, matching docker-compose.yml"
  type        = string
  default     = "postgres:15-alpine"
}

variable "db_user" {
  description = "Postgres user"
  type        = string
  default     = "oficina"
}

variable "db_password" {
  description = "Postgres password"
  type        = string
  default     = "oficina"
  sensitive   = true
}

variable "db_name" {
  description = "Postgres database name"
  type        = string
  default     = "oficina_db"
}

variable "db_storage_size" {
  description = "Size of the PersistentVolumeClaim for Postgres data"
  type        = string
  default     = "1Gi"
}
