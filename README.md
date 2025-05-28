# Resilientx-task

A modern Vue 3 + Vite application for exploring and searching GitHub repositories, featuring responsive design, pagination, internationalization, and theme switching.

## Features

- 🔍 **Search GitHub repositories** by stars, forks, language, or custom queries
- ⭐ **Quick search** tags for popular queries
- 📄 **Repository details**: name, description, owner, stars, forks, language
- 🌓 **Light/Dark theme** toggle with persistence
- 🌍 **Internationalization** (English & Italian)
- 📦 **Pagination** for large result sets
- ⚡ **Fast, responsive UI** with skeleton loaders
- 🦾 **Vuex** for state management
- 🛠️ **Bulma CSS** for styling
- 🎨 **FontAwesome** icons

## Screenshots

<!-- Optionally add screenshots here -->

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (or adapt scripts for npm/yarn)
- Node.js 18+

### Project Setup

```sh
bun install
```

### Compile and Hot-Reload for Development

```sh
bun start
```

### Compile and Minify for Production

```sh
bun run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
bun lint
```

## Configuration

- **GitHub API Token (optional):**  
  To increase rate limits, create a `.env` file and add:
  ```
  VITE_GITHUB_TOKEN=your_github_token
  ```
- **API Base URL:**  
  Override with `VITE_API_BASE_URL` in `.env` if needed.

## Directory Structure

See the [project structure](#) for details.

## Technologies Used

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [Vue I18n](https://kazupon.github.io/vue-i18n/)
- [Bulma](https://bulma.io/)
- [FontAwesome](https://fontawesome.com/)
- [Axios](https://axios-http.com/)

## License

[MIT](LICENSE)

---

Created by [@imblackline](https://github.com/imblackline)
