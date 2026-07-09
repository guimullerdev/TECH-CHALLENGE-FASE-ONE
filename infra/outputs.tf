output "cluster_name" {
  description = "Name of the provisioned kind cluster"
  value       = kind_cluster.this.name
}

output "kubeconfig_path" {
  description = "Path to the kubeconfig file for the provisioned cluster"
  value       = kind_cluster.this.kubeconfig_path
}

output "database_service" {
  description = "In-cluster DNS name of the Postgres service (host:port)"
  value       = "${kubernetes_service.db.metadata[0].name}.${kubernetes_namespace.oficina.metadata[0].name}.svc.cluster.local:5432"
}

output "database_url" {
  description = "Connection string for the app's DATABASE_URL, usable from inside the cluster"
  value       = "postgresql://${var.db_user}:${var.db_password}@${kubernetes_service.db.metadata[0].name}.${kubernetes_namespace.oficina.metadata[0].name}.svc.cluster.local:5432/${var.db_name}"
  sensitive   = true
}
