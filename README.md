# Projeto Site NASA

Este projeto consiste em um site que consome a API da NASA para exibir a "Astronomia Foto do Dia" (APOD).

## Estrutura do Projeto

- `backend/`: API em Python (FastAPI).
- `frontend/`: Interface web (HTML/JS/CSS).

## Configuração do Backend

### 1. Ambiente Virtual

Para ativar o ambiente virtual (no Windows):

```powershell
# Navegue até a pasta do backend
cd backend

# Ative o ambiente virtual
.\venv\Scripts\activate
```

### 2. Variáveis de Ambiente

Certifique-se de que o arquivo `backend/.env` contém sua chave da API da NASA:
```env
NASA_API_KEY=sua_chave_aqui
```

### 3. Iniciar o Backend

Com o ambiente virtual ativado, execute:

```powershell
python main.py
```
O servidor estará rodando em `http://localhost:8000`.

## Configuração do Frontend

O frontend é composto por arquivos estáticos. Para visualizar:

1. Abra o arquivo `frontend/index.html` em seu navegador.
2. Ou utilize uma extensão de "Live Server" no VS Code.

## Teclado de Atalho (Opcional)

Se desejar instalar as dependências manualmente caso não existam:
```powershell
pip install fastapi uvicorn requests python-dotenv
```
