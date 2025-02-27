# Flik.io Frontend
![image](https://github.com/user-attachments/assets/975cefb9-dbff-4ff0-b885-6639d00a0e97)
![image](https://github.com/user-attachments/assets/8bca2ab0-877b-4c88-b12c-c829ef58043d)

A React-based URL shortening service with a sleek, red-themed UI.

## Features

- Register, login, and logout with JWT authentication.
- Shorten URLs.
- Delete URLs.
- Built with React, Tailwind CSS, and Vite.

## Setup

Clone the repo:
```bash
git clone <repository-url>
cd flik-io-frontend
```

Install dependencies:
```bash
npm install
```

Set backend URL in `src/constants.js`:
```javascript
export const API_URL = 'http://<backend-url>';
```

Run:
```bash
npm run dev
```

Visit http://localhost:5173.

## Usage

- **Register/Login**: Create an account or sign in
- **Shorten**: At `/home`, enter a URL to generate a short link
- **View/Delete**: See all shortened URLs and delete with the X button

## Dependencies

- react-router-dom
- axios
- jwt-decode

## Notes

- Requires a Spring Boot backend at http://<your-backend>
- Uses Tailwind CSS for styling

## License

MIT License
