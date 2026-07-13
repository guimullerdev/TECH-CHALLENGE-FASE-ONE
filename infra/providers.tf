provider "kind" {}

provider "kubernetes" {
  host                   = kind_cluster.this.endpoint
  client_certificate     = kind_cluster.this.client_certificate
  client_key             = kind_cluster.this.client_key
  cluster_ca_certificate = kind_cluster.this.cluster_ca_certificate
}

# Mesmo padrão do provider kubernetes: configurado direto dos outputs do
# kind_cluster (sem arquivo kubeconfig). Usado para aplicar os manifestos YAML
# do app (k8s/) e o metrics-server via kubectl_manifest.
provider "kubectl" {
  host                   = kind_cluster.this.endpoint
  client_certificate     = kind_cluster.this.client_certificate
  client_key             = kind_cluster.this.client_key
  cluster_ca_certificate = kind_cluster.this.cluster_ca_certificate
  load_config_file       = false
}
