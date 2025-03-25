# 📌 Sistema de Reserva de Salas - UniEVANGÉLICA

## 📖 Sobre o Projeto
Este sistema foi desenvolvido para facilitar o gerenciamento e a reserva de salas acadêmicas na **UniEVANGÉLICA**. Coordenadores podem visualizar, reservar e cancelar reservas de forma eficiente, garantindo melhor organização dos espaços disponíveis.

## 🚀 Tecnologias Utilizadas
O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **React** com **TypeScript**
- **SCSS** para estilização
- **React Router** para navegação entre páginas
- **Axios** para consumo da API
- **React Query** para gerenciamento de estado assíncrono
- **Chart.js** para gráficos interativos

## ⚙️ Funcionalidades
### 🔹 **Funcionalidades Principais**
- Login com autenticação via API
- Listagem de blocos e salas disponíveis
- Filtros por bloco, capacidade e recursos
- Indicação visual das salas livres e ocupadas
- Reserva e cancelamento de salas
- Notificações sobre reservas futuras e conflitos

### 🔹 **Funcionalidades Bônus**
- Autenticação via JWT
- Proteção de rotas para usuários autenticados
- Gráficos sobre a utilização das salas
- Testes automatizados com Jest e Cypress

## 🛠️ Como Rodar o Projeto
### 1️⃣ **Pré-requisitos**
Certifique-se de ter instalado:
- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**
- **Git**

### 2️⃣ **Clonar o Repositório**
```bash
  git clone https://github.com/seu-usuario/nome-do-repositorio.git
  cd nome-do-repositorio
```

### 3️⃣ **Instalar Dependências**
```bash
  npm install  # ou yarn install
```

### 4️⃣ **Configurar as Variáveis de Ambiente**
Crie um arquivo **.env** na raiz do projeto e adicione:
```
REACT_APP_API_URL=https://api.unievangelica.com/reservas
```

### 5️⃣ **Rodar o Projeto**
```bash
  npm run dev  # ou yarn dev
```

O projeto estará rodando em: **http://localhost:3000**

## 📌 Estrutura do Projeto
```
/src
 ├── /components   # Componentes reutilizáveis
 ├── /pages        # Páginas do sistema
 ├── /services     # Comunicação com API
 ├── /hooks        # Hooks personalizados
 ├── /context      # Contexto global (autenticação, estado)
 ├── /styles       # Estilização global (SCSS)
 ├── App.tsx       # Configuração principal
 ├── routes.tsx    # Definição das rotas
 ├── index.tsx     # Entrada da aplicação
```

## 🛠️ Testes
### 🔹 Testes Unitários
Para rodar os testes unitários com Jest:
```bash
  npm test  # ou yarn test
```

### 🔹 Testes End-to-End (E2E)
Para rodar testes E2E com Cypress:
```bash
  npx cypress open
```

## 📌 Contato
Caso tenha dúvidas ou sugestões, entre em contato:
- **Nome:** Vitor Martins Melo
- **Email:** seuemail@email.com
- **LinkedIn:** [Seu Perfil](https://www.linkedin.com/in/seu-perfil)

---
Feito com ❤️ por Vitor Martins Melo 🚀

