# 🚀 Native Auth with Firebase

Este é um projeto **starter** simples criado com **React Native + Expo**, utilizando **Firebase Authentication** e **TypeScript**. Ele conta com uma estrutura inicial de autenticação com **Sign In**, **Sign Up** e uma tela **Home** protegida. Ideal para servir como base para novos projetos em React Native.

🔗 [Acesse o repositório no GitHub](https://github.com/JeanLiima/native-auth_with_firebase)

---

## ✨ Funcionalidades

- Tela de **Acesso (Sign In)**
- Tela de **Cadastro (Sign Up)**
- Tela **Inicio** protegida (acessível somente para usuários autenticados)
- **Autenticação com Firebase** (Email e Senha)
- **Navegação estruturada**:
  - `Native Stack` para rotas públicas (SignIn, SignUp)
  - `Drawer Navigator` para rotas privadas (Home)

---

## 🧰 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase Authentication](https://firebase.google.com/)
- [React Navigation](https://reactnavigation.org/)
  - `@react-navigation/native`
  - `@react-navigation/native-stack`
  - `@react-navigation/drawer`

---

## 📁 Estrutura de Pastas (sugestão)
```
src/
├── components/
│   ├── navigation-drawer/      ⇠ Drawer customizado que é exibido nas rotas privadas
│   │   ├── index.tsx
├── constants/
│   ├── routes.ts               ⇠ Arquivo para organização de rotas
├── contexts/
│   ├── auth/                   ⇠ Contexto que mantém todas as funcionalidades de authentication
│   │   ├── index.tsx
├── hooks/
│   ├── auth/                   ⇠ Custom hook para consumir o contexto de auth
│   │   ├── index.tsx 
├── pages/
│   ├── home/
│   │   ├── index.tsx           ⇠ Página de Home, exibe os dados logados
│   ├── sign-in/
│   │   ├── index.tsx           ⇠ Página de signIn
│   └── sign-up/
│   │   ├── index.tsx           ⇠ Página de signUp
├── routes/
│   ├── public.routes.tsx       ⇠ Arquivo responsável por exibir as rotas publicas (Utiliza stack navigation)
│   └── private.routes.tsx      ⇠ Arquivo responsável por exibir as rotas privadas (Utiliza drawer navigation)
│   └── index.tsx               ⇠ Arquivo responsável validar se está logado e renderizar as rotas publicas ou rotas privadas
├── services/
│   └── firebase-connection.ts  ⇠ Responsável pela connexão com firebase
App.tsx
```

---

## ▶️ Como rodar o projeto

### 1. **Clone o repositório:**

```bash
git clone https://github.com/JeanLiima/native-auth_with_firebase.git
cd native-auth_with_firebase
```

### 2. **Instale as dependências:**

`npm run install`

### 3. **Configure o Firebase:**

- Acesse o Firebase Console
- Crie um projeto e ative o método de autenticação por email/senha
- Copie as credenciais do Firebase Web SDK
- Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

`.env`
```
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
FIREBASE_MEASUREMENT_ID=
```

### 4. **Inicie o Expo:**

`npm run start`

### 5. **Execute o app:**

- Se estiver com o emulador Android rodando, pressione "a" no terminal.
- Se estiver com o app Expo Go no celular:
  - Escaneie o QR Code gerado no terminal.

## 💡 Observações

- Este projeto é um template inicial, focado em facilitar o início de novos apps com autenticação.
- Você pode expandir facilmente para utilizar Firestore, Realtime Database, Storage, etc.
- A parte de cadastro e acesso estão validando erros vindos do auth do Firebase.
- O código está escrito em TypeScript com boas práticas de organização de navegação e estrutura de pastas.
- Foi criado um workspace.code para que alinhe as configurações utilizadas no seu vscode.

## 📷 Screenshots

<img src="https://github.com/user-attachments/assets/263afa78-9e46-4780-b9c8-fbd3b57ae70c" alt="preview" width="250" height="auto"/>

## 📄 Licença

Este projeto está sob a licença MIT.


