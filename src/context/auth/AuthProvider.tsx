/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
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
  create(userR: IUserCreate): Promise<SuccessType | ErrorType>;
  authenticate(userR: IUserAuth): Promise<SuccessType | ErrorType>;
  loadUser(): Promise<void>;
  logout(): void;
  token: string | null;
  isLoading: boolean;
}

type ErrorType = {
  status: number;
  message?: string;
  errors: string[];
};

type SuccessType = {
  status: number;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

const AuthProvider: React.FC<IProps> = ({ children }: IProps) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const token = localStorage.getItem("user_auth");
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = async () => {
    if (token !== null || token !== undefined) {
      Api.get(`/profile/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => setUser(response.data))
        .catch((err) => setUser({} as IUser));
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, [token]);

  async function create(userR: IUserCreate): Promise<SuccessType | ErrorType> {
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

      return {
        status: result.status,
      };
    }

    if (result.status === 400) {
      return {
        status: result.status,
        message: result.data.message,
        errors: result.data.errors,
      };
    }

    return {
      status: result.status,
      message: result.data.message,
      errors: result.data.errors,
    };
  }

  async function authenticate(
    userAuth: IUserAuth
  ): Promise<SuccessType | ErrorType> {
    const result = await Api.post(`/auth`, {
      email: userAuth.email,
      password: userAuth.password,
    });

    if (result.status === 200) {
      localStorage.setItem("user_auth", result.data.token);
      window.location.reload();

      return {
        status: result.status,
      };
    }

    if (result.status === 404) {
      return {
        status: result.status,
        message: result.data.message,
        errors: result.data.errors,
      };
    }

    return {
      status: result.status,
      message: result.data.message,
      errors: result.data.errors,
    };
  }

  async function logout() {
    setUser({} as IUser);
    localStorage.clear();
    window.location.reload();
  }

  return (
    <AuthContext.Provider
      value={{ user, create, authenticate, loadUser, logout, token, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
