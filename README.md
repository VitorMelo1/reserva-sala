# 📌 Sistema de Reserva de Salas - UniEVANGÉLICA

## 📖 Sobre o Projeto
Este sistema foi criado para otimizar o gerenciamento e a reserva de salas acadêmicas na **UniEVANGÉLICA**. Ele permite que coordenadores visualizem, filtrem, reservem e cancelem reservas de forma ágil, promovendo uma melhor organização dos espaços institucionais.

## 🚀 Tecnologias Utilizadas
As principais tecnologias e ferramentas utilizadas neste projeto incluem:

- **React 19** com **TypeScript**
- **SCSS** para estilização modular
- **React Router Dom v7** para navegação entre páginas
- **Axios** para consumo da API REST
- **Chart.js + react-chartjs-2** para gráficos interativos
- **React Hook Form** para gerenciamento de formulários

## ⚙️ Funcionalidades
### 🔹 Funcionalidades Principais
- Autenticação com token JWT
- Login e logout com proteção de rotas
- Listagem de salas por bloco e capacidade
- Filtro por nome, capacidade mínima e bloco
- Indicadores visuais de salas **livres** e **ocupadas**
- Reserva de sala com validação de horário e capacidade
- Cancelamento de reserva com justificativa obrigatória
- Visualização gráfica do uso das salas (por data, horário e sala)

### 🔸 Funcionalidades Adicionais
- Sugestão inteligente de sala com base na capacidade e disponibilidade
- Exibição em tempo real de reservas filtradas por data
- Modo responsivo para mobile e tablets
- Cards estilizados com status e efeitos visuais

## 🛠️ Como Rodar o Projeto
### 1️⃣ Pré-requisitos
Antes de começar, instale:
- [Node.js](https://nodejs.org) (v16 ou superior)
- **npm** ou **yarn**
- **Git**

### 2️⃣ Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/reserva-sala.git
cd reserva-sala
```

### 3️⃣ Instalar as Dependências
```bash
npm install # ou yarn install
```

### 4️⃣ Configurar as Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com:
```env
REACT_APP_API_URL=https://api.unievangelica.com/reservas
```

### 5️⃣ Rodar o Projeto
```bash
npm run dev # ou yarn dev
```
O sistema será iniciado em: [http://localhost:3000](http://localhost:3000)

## 🧭 Estrutura do Projeto
```bash
/src
 ├── components/     # Componentes reutilizáveis
 ├── pages/          # Páginas principais (login, dashboard, relatórios...)
 ├── services/       # Comunicação com a API
 ├── hooks/          # Hooks personalizados
 ├── context/        # Contexto global (autenticação, tema...)
 ├── styles/         # Estilos globais e variáveis SCSS
 ├── App.tsx         # Arquivo principal da aplicação
 ├── routes.tsx      # Definição das rotas protegidas
 └── main.tsx        # Entrada da aplicação (ReactDOM)
```

## 🧪 Testes
### ✅ Testes Unitários (Jest)
```bash
npm test # ou yarn test
```

### ✅ Testes End-to-End (Cypress)
```bash
npx cypress open
```

## 👨‍💻 Autor
- **Nome:** Vitor Martins Melo
- **Email:** vitormmelo04@gmail.com
- **LinkedIn:** [linkedin.com/in/vitor-martins-melo-6272a6326](https://www.linkedin.com/in/vitor-martins-melo-6272a6326)

---
Feito com 💙 e dedicação por Vitor Martins Melo 🚀
