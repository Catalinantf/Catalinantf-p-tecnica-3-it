# 📱 App de Indicadores Financieros - React Native

Aplicación móvil desarrollada con React Native (TypeScript) que permite consultar en tiempo real los indicadores económicos entregados por la CMF de Chile: **UF, Dólar, Euro, IPC y UTM**.  
Incluye visualización gráfica de tendencias, navegación intuitiva, consumo de API con Axios, tipado fuerte y componentes accesibles.

---

## ✨ Características

- ✅ Consulta en tiempo real de los valores actuales de los indicadores económicos
- 📈 Gráficos interactivos para los últimos 10 días o 12 meses (según el tipo)
- 🗓️ Visualización de los últimos 30 días o año actual por indicador
- 🔁 Navegación fluida entre pantallas con React Navigation
- 🎯 Código 100% tipado con TypeScript
- 🌐 Consumo de API oficial de la [CMF Chile](https://api.cmfchile.cl)
- 📦 Librerías modernas y escalables

---

## 🖥️ Requisitos del sistema

- Node.js >= 16.x
- npm >= 8.x o yarn >= 1.22
- Android Studio y emulador configurado
- JDK >= 11
- React Native CLI
- Cuenta en [https://api.cmfchile.cl](https://api.cmfchile.cl) con API key

---

## 🚀 Instalación y ejecución

1. **Clona este repositorio**

````bash
git clone https://github.com/tuusuario/indicadores-app.git
cd indicadores-app

### 🛠️ Instalación del proyecto

1. **Instala las dependencias**

```bash
npm install
# o
yarn install

### ⚙️ Configura tu entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
API_BASE_URL=https://api.cmfchile.cl/api-sbifv3/recursos_api
CMF_API_KEY=tu_api_key_personal

solicita tu api key acá: https://api.sbif.cl/api/contactanos.jsp
````

Inicia el Metro Bundler:

```bash
npx react-native start --reset-cache
```

Lanza la app en Android:

```bash
npx react-native run-android
```

Lanza la app en iOS:

```bash
npx react-native run-ios
```
