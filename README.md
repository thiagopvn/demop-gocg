# Sistema de Controle de Cautela - GOCG

Sistema de gerenciamento de materiais e equipamentos para o Grupamento Operacional do Comando Geral.

## 🚀 Início Rápido

### Pré-requisitos

- Node.js (v18 ou superior)
- NPM ou Yarn
- Conta no Firebase com projeto configurado

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/thiagopvn/demop-gocg.git
cd demop-gocg
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o Firebase:
   - Copie `.env.example` para `.env`
   - Adicione suas credenciais do Firebase (veja [INSTRUCOES_FIREBASE.md](./INSTRUCOES_FIREBASE.md))

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 📋 Funcionalidades

- **Gestão de Usuários**: Cadastro e controle de acesso
- **Controle de Materiais**: Inventário completo de equipamentos
- **Gestão de Viaturas**: Registro e controle de veículos
- **Movimentações**: Rastreamento de cautelas e devoluções
- **Categorias**: Organização de materiais por tipo
- **Relatórios**: Exportação de dados para Excel
- **Dashboard**: Visualização de estatísticas e movimentações recentes

## 🛠️ Tecnologias

- **Frontend**: React 19 + Vite
- **UI**: Material-UI (MUI)
- **Database**: Firebase Firestore
- **Autenticação**: JWT customizado
- **Gráficos**: Recharts
- **Estilos**: CSS moderno com gradientes e animações

## 📁 Estrutura do Projeto

```
src/
├── assets/          # Imagens e recursos estáticos
├── components/      # Componentes reutilizáveis
├── contexts/        # Contextos React (Theme, Menu, Auth)
├── dialogs/         # Componentes de diálogo
├── firebase/        # Configuração e utilitários Firebase
├── screens/         # Telas da aplicação
└── theme/           # Configuração de tema
```

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Compila para produção
npm run lint     # Executa o linter
npm run preview  # Visualiza build de produção
```

## 🔐 Configuração Inicial

### Primeiro Acesso

1. Se não houver usuários no banco, um botão ⚙️ aparecerá na tela de login
2. Clique para acessar `/first-access`
3. Crie o primeiro usuário administrador
4. Faça login com as credenciais criadas

### Importação de Dados

Para importar dados existentes, consulte as funções disponíveis em `src/firebase/populate.js`

## 📝 Documentação

- [Instruções Firebase](./INSTRUCOES_FIREBASE.md) - Configuração completa do Firebase
- [CLAUDE.md](./CLAUDE.md) - Documentação técnica para desenvolvimento

## 🚨 Importante

- **Nunca** commite o arquivo `.env` com credenciais reais
- Configure regras de segurança apropriadas no Firestore para produção
- Mantenha as credenciais do Firebase seguras

## 📄 Licença

Propriedade do Grupamento Operacional do Comando Geral
