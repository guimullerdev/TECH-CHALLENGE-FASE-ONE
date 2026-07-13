terraform {
  required_version = ">= 1.6.0"

  required_providers {
    kind = {
      source  = "tehcyx/kind"
      version = "~> 0.9"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.31"
    }
    kubectl = {
      source  = "alekc/kubectl"
      version = "~> 2.0"
    }
    null = {
      source  = "hashicorp/null"
      version = "~> 3.2"
    }
  }
}
