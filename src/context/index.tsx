import { createContext, useCallback, useContext, useState } from "react";
import { Api } from "../services/api";

type User = {
  id: string;
  profileId: string;
  email: string;
  avatarUrl: string;
};

type AuthState = {
  token: string;
  user: User;
};

type SignInCredentials = {
  email: string;
  password: string;
};

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

type IProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<IProps> = ({ children }: IProps) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      Api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signOut = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setData({} as AuthState);
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    // const response = await api.post('sessions', {
    //   email,
    //   password,
    // });
    // const { token, user } = response.data;
    // localStorage.setItem('token', token);
    // localStorage.setItem('user', JSON.stringify(user));
    // api.defaults.headers.authorization = `Bearer ${token}`;
    // setData({ token, user });
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem("user", JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token]
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
