resource "kubernetes_namespace" "oficina" {
  metadata {
    name = var.namespace
  }
}

resource "kubernetes_secret" "db_credentials" {
  metadata {
    name      = "oficina-db-credentials"
    namespace = kubernetes_namespace.oficina.metadata[0].name
  }

  data = {
    POSTGRES_USER     = var.db_user
    POSTGRES_PASSWORD = var.db_password
    POSTGRES_DB       = var.db_name
  }
}

resource "kubernetes_persistent_volume_claim" "db_data" {
  metadata {
    name      = "oficina-db-data"
    namespace = kubernetes_namespace.oficina.metadata[0].name
  }

  spec {
    access_modes = ["ReadWriteOnce"]
    resources {
      requests = {
        storage = var.db_storage_size
      }
    }
  }

  wait_until_bound = false
}

resource "kubernetes_deployment" "db" {
  metadata {
    name      = "oficina-db"
    namespace = kubernetes_namespace.oficina.metadata[0].name
    labels    = { app = "oficina-db" }
  }

  spec {
    replicas = 1

    selector {
      match_labels = { app = "oficina-db" }
    }

    template {
      metadata {
        labels = { app = "oficina-db" }
      }

      spec {
        container {
          name  = "postgres"
          image = var.postgres_image

          port {
            container_port = 5432
          }

          env_from {
            secret_ref {
              name = kubernetes_secret.db_credentials.metadata[0].name
            }
          }

          volume_mount {
            name       = "data"
            mount_path = "/var/lib/postgresql/data"
            sub_path   = "postgres"
          }

          readiness_probe {
            exec {
              command = ["pg_isready", "-U", var.db_user]
            }
            initial_delay_seconds = 5
            period_seconds        = 5
          }
        }

        volume {
          name = "data"
          persistent_volume_claim {
            claim_name = kubernetes_persistent_volume_claim.db_data.metadata[0].name
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "db" {
  metadata {
    name      = "oficina-db"
    namespace = kubernetes_namespace.oficina.metadata[0].name
  }

  spec {
    selector = { app = "oficina-db" }

    port {
      port        = 5432
      target_port = 5432
    }
  }
}
