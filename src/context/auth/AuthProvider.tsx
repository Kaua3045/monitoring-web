/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";
import Api from "../../utils/api";

type IProps = {
  children: JSX.Element;
};

type IUserCreate = {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
  avatarUrl: string | null;
};

type IUser = {
  profileId: string;
  username: string;
  email: string;
  avatarUrl: string | null;
};

type IUserAuth = {
  email: string | undefined;
  password: string | undefined;
};

interface AuthContextData {
  user: IUser;
  create(userR: IUserCreate): void;
  authenticate(userR: IUserAuth): void;
  logout(): void;
  token: string | null;
  isFetching: boolean;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

const AuthProvider: React.FC<IProps> = ({ children }: IProps) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const token = localStorage.getItem("user_auth");

  const loadUser = async (token: string | null) => {
    const response = await Api.get(`/profile/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  };

  const { isFetching } = useQuery({
    queryKey: ["user", token],
    queryFn: () => {
      if (token !== null) {
        return loadUser(token);
      }
      return {} as IUser;
    },
    onError(error: any) {
      if (error.response.data.message === "Token expired!") {
        setUser({} as IUser);
        localStorage.clear();
      }
    },
    onSuccess(data) {
      setUser(data);
    },
    retry: false,
  });

  async function create(userR: IUserCreate) {
    const result = await Api.post(`/profile`, {
      username: userR.username,
      email: userR.email,
      password: userR.password,
      avatarUrl: userR.avatarUrl,
    });

    if (result.status === 201) {
      const payload = {
        profileId: result.data.profileId,
        username: result.data.username,
        email: result.data.email,
        avatarUrl: result.data.avatarUrl,
      };

      setUser(payload);
      localStorage.setItem("user_auth", result.data.token);

      window.location.reload();
    }
  }

  async function authenticate(userAuth: IUserAuth) {
    const result = await Api.post(`/auth`, {
      email: userAuth.email,
      password: userAuth.password,
    });

    if (result.status === 200) {
      localStorage.setItem("user_auth", result.data.token);
      window.location.reload();
    }
  }

  async function logout() {
    setUser({} as IUser);
    localStorage.clear();
    window.location.reload();
  }

  return (
    <AuthContext.Provider
      value={{ user, create, authenticate, logout, token, isFetching }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
