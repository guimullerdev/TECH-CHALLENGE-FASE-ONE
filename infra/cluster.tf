# Provisions a local Kubernetes cluster via kind (Kubernetes-in-Docker).
# Swap this resource for a cloud module (e.g. AWS EKS) to target a real cluster —
# everything downstream (provider "kubernetes", database.tf) only depends on the
# outputs below, not on kind itself.
resource "kind_cluster" "this" {
  name           = var.cluster_name
  wait_for_ready = true
}
