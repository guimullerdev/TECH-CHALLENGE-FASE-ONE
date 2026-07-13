# Carrega a imagem da API (buildada por um passo anterior do pipeline / localmente)
# para dentro do cluster kind, que não tem acesso a um registry externo privado.
# Usamos `docker save | ctr import` em vez de `kind load docker-image` porque este
# último falha com "failed to detect containerd snapshotter" em clusters criados
# pelo provider tehcyx/kind.
resource "null_resource" "load_image" {
  depends_on = [kind_cluster.this]

  triggers = {
    image = var.app_image
  }

  provisioner "local-exec" {
    command     = "docker save ${var.app_image} | docker exec -i ${var.cluster_name}-control-plane ctr -n k8s.io images import -"
    interpreter = ["bash", "-c"]
  }
}

# metrics-server: necessário para o HPA obter métricas de CPU em kind.
data "kubectl_file_documents" "metrics_server" {
  content = file("${path.module}/metrics-server.yaml")
}

resource "kubectl_manifest" "metrics_server" {
  for_each   = data.kubectl_file_documents.metrics_server.manifests
  yaml_body  = each.value
  depends_on = [kind_cluster.this]
}

# Aplica os manifestos YAML do app (ConfigMap, Secret, Deployment, Service, HPA)
# a partir de /k8s — Terraform como mecanismo de deploy, não `kubectl apply` avulso.
# Depende do namespace/banco (database.tf), do metrics-server e da imagem carregada.
resource "kubectl_manifest" "app" {
  for_each  = fileset("${path.module}/../k8s", "*.yaml")
  yaml_body = file("${path.module}/../k8s/${each.value}")

  depends_on = [
    kubernetes_namespace.oficina,
    kubernetes_service.db,
    kubectl_manifest.metrics_server,
    null_resource.load_image,
  ]
}
