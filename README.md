# API de Monitoramento Fotovoltaico

Esta API, construída com NestJS e TypeORM, ingere, valida, armazena e agrega métricas de usinas fotovoltaicas (potência e temperatura) por meio de uma interface REST.

---

## 📋 Pré‑requisitos

- **Node.js** v18+ e **npm**
- **Git**
- **SQLite3** (incluso pela dependência `sqlite3`)

(Opcional para Docker):

- Docker e Docker Compose

---

## ⚙️ Instalação

Clone o repositório e instale as dependências:

### Bash (Linux/macOS/Git Bash no Windows)

```bash
git clone https://github.com/seu-usuario/desafio-backend.git
cd desafio-backend
bash scripts/install-deps.sh
```

### PowerShell (Windows)

```powershell
git clone https://github.com/seu-usuario/desafio-backend.git
cd desafio-backend
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/install-deps.ps1
```

---

## 🗄️ Configuração do Banco de Dados

### Migrations (recomendado)

```bash
# Gerar nova migration após alterações nas entidades
npm run migration:generate -- InitialSchema

# Executar migrations pendentes
npm run migration:run
```

### Auto‑sync (apenas desenvolvimento)

Em `src/database/database.module.ts`, ajuste:

```ts
synchronize: true,
dropSchema: true, // somente em modo teste
```

E reinicie o servidor para criar as tabelas automaticamente.

---

## 🚀 Executando a Aplicação

```bash
npm run start:dev
```

- API disponível em: `http://localhost:3000`
- Documentação Swagger em: `http://localhost:3000/docs`

---

## 🌱 Seed de Dados

### Criar Usinas e Inversores

```bash
npm run seed:inverters
```

- Usina 1: inversores 1–4
- Usina 2: inversores 5–8

### Importar métricas do JSON

```bash
npm run import:metrics
```

Lê `metrics.json`, ignora registros nulos (alertando linha aproximada) e exibe progresso.

---

## 🧪 Testes

- **Testes unitários**:

  ```bash
  npm run test
  ```

- **Testes de consulta**:

  ```bash
  npm run curl:tests
  ```

---

## 📦 Scripts disponíveis

| Script               | Descrição                                     |
| -------------------- | --------------------------------------------- |
| `install-deps:sh`    | Instala dependências (Bash)                   |
| `install-deps:ps1`   | Instala dependências (PowerShell)             |
| `build`              | Compila TypeScript                            |
| `start:dev`          | Inicia servidor em modo dev (watch + Swagger) |
| `start:prod`         | Inicia aplicação compilada                    |
| `docs`               | Alias para `start:dev` (acessa Swagger UI)    |
| `seed:inverters`     | Cria usinas e inversores                      |
| `npm run curl:tests` | Teste para usinas, inversores e métricas      |
| `import:metrics`     | Importa `metrics.json` para o banco           |
| `migration:generate` | Gera uma nova migration                       |
| `migration:run`      | Executa migrations pendentes                  |
| `lint`               | Executa ESLint e corrige problemas            |
| `format`             | Formata código com Prettier                   |

---

© 2025 Jonatas Dias — API de Monitoramento Fotovoltaico
