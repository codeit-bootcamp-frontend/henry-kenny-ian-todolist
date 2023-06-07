import dynamic from "next/dynamic";
import "../styles/globals.css";
import "../styles/reset.css";
import Header from "./components/Header/Header";

import AuthProvider from "./recoil/AuthProvider";
const ThemeProvider = dynamic(() => import("./Contexts/ThemeProvider.jsx"), {
  ssr: false,
});
import RootProvider from "./recoil/RootProvider";

export const metadata = {
  title: "Todolist Bunny",
  description: "Your Favorite Task Manager App",
};

export const checkLoginStatus = async () => {
  return isLoggedIn;
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <RootProvider>
          <AuthProvider>
            <ThemeProvider>
              <Header></Header>
              {children}
              <div id="modal-portal"></div>
              <div id="toast-portal"></div>
            </ThemeProvider>
          </AuthProvider>
        </RootProvider>
      </body>
    </html>
  );
}
