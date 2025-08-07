# Instruções para Configurar o Firebase

## 1. Obter as Credenciais do Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Selecione seu projeto ou crie um novo
3. Clique no ícone de engrenagem ⚙️ e selecione "Configurações do projeto"
4. Na aba "Geral", role até "Seus aplicativos"
5. Se não houver um app web, clique em "Adicionar app" e escolha Web (</>) 
6. Copie as configurações do Firebase

## 2. Criar o arquivo .env

1. Na raiz do projeto, crie um arquivo chamado `.env` (não `.env.example`)
2. Cole as seguintes variáveis com os valores do seu projeto Firebase:

```env
VITE_FIREBASE_API_KEY=sua-api-key-aqui
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto-id
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 3. Configurar o Firestore

1. No Firebase Console, vá para "Firestore Database"
2. Se ainda não estiver criado, clique em "Criar banco de dados"
3. Escolha o modo de produção ou teste
4. Selecione a localização mais próxima

## 4. Configurar as Regras de Segurança (Temporário para Desenvolvimento)

No Firestore, vá em "Regras" e temporariamente use:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      // Permite leitura e escrita para desenvolvimento
      // IMPORTANTE: Mude isso em produção!
      allow read, write: if true;
    }
  }
}
```

## 5. Importar Dados Existentes (Se houver)

Se você tem dados de outro projeto Firebase:

1. Exporte os dados do projeto antigo usando Firebase Admin SDK ou ferramentas de export
2. Importe para o novo projeto

Ou use o script de população incluído no projeto:
```javascript
// Em src/firebase/populate.js existem funções para popular dados
```

## 6. Reiniciar o Servidor de Desenvolvimento

Após criar o arquivo .env:

```bash
# Pare o servidor (Ctrl+C) e reinicie
npm run dev
```

## 7. Criar o Primeiro Usuário Admin

Como não há usuários no banco:

1. O botão de configuração (⚙️) aparecerá no canto inferior esquerdo da tela de login
2. Clique nele para acessar `/first-access`
3. Crie o primeiro usuário administrador
4. Após isso, você poderá fazer login normalmente

## Troubleshooting

### Erro 400 (Bad Request)
- Verifique se as credenciais no `.env` estão corretas
- Confirme que o Firestore está ativado no Firebase Console
- Verifique se o domínio localhost está autorizado em Authentication > Settings

### "Usuário não encontrado"
- O banco está vazio, use o botão ⚙️ para criar o primeiro usuário
- Ou importe dados de um backup existente

### Permissões negadas
- Verifique as regras do Firestore
- Para desenvolvimento, use regras permissivas (veja item 4)

## Segurança

⚠️ **IMPORTANTE**: 
- Nunca commite o arquivo `.env` com credenciais reais
- O arquivo já está no `.gitignore` para proteção
- Em produção, use regras de segurança apropriadas no Firestore
- Configure autenticação adequada para produção