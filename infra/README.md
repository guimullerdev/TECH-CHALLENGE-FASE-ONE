# Infraestrutura (Terraform)

Provisiona, via Terraform, o cluster Kubernetes e o banco de dados usados para
rodar a `oficina-api` (itens 5 e 6 do `dev-plan.md`).

- **Cluster**: um cluster [kind](https://kind.sigs.k8s.io/) (Kubernetes-in-Docker)
  local, gerenciado pelo provider `tehcyx/kind`. Para apontar a um cluster cloud
  (ex. EKS/GKE), troque `cluster.tf` por um módulo equivalente — o restante
  (`database.tf`, providers) não muda, pois só depende dos outputs do cluster.
- **Banco de dados**: Postgres rodando dentro do cluster (namespace `oficina`),
  com `Deployment` + `Service` + `PersistentVolumeClaim`, credenciais num `Secret`.

## Pré-requisitos

- [Terraform](https://developer.hashicorp.com/terraform/install) >= 1.6
- Docker rodando localmente (o provider `kind` cria o cluster como containers Docker)

## Apply

```bash
cd infra
terraform init
terraform apply
```

Isso cria o cluster kind (`oficina-cluster` por padrão) e o Postgres dentro dele.

Para usar o cluster provisionado com `kubectl`:

```bash
export KUBECONFIG=$(terraform output -raw kubeconfig_path)
kubectl get pods -n oficina
```

Para aplicar os manifestos da aplicação (item 5, pasta `/k8s`) contra esse cluster,
lembre de atualizar `k8s/secret.yaml` com o valor de `terraform output -raw database_url`
antes do `kubectl apply -f ../k8s`.

## Variáveis

| Variável | Padrão | Descrição |
|---|---|---|
| `cluster_name` | `oficina-cluster` | Nome do cluster kind |
| `namespace` | `oficina` | Namespace do banco de dados |
| `postgres_image` | `postgres:15-alpine` | Imagem do Postgres (mesma do `docker-compose.yml`) |
| `db_user` / `db_password` / `db_name` | `oficina` / `oficina` / `oficina_db` | Credenciais do banco (sobrescreva em ambientes reais — não use os padrões em produção) |
| `db_storage_size` | `1Gi` | Tamanho do volume persistente do Postgres |

Sobrescreva com `-var` ou um arquivo `terraform.tfvars` (não versionado).

## Destroy

```bash
cd infra
terraform destroy
```

Remove o Postgres e o cluster kind por completo, incluindo o volume de dados.
