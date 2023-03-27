import { useKeycloak } from "@react-keycloak/web";
import { createContext, useCallback, useEffect, useState } from "react";
import Api from "../../utils/api";

type IProps = {
  children: JSX.Element;
};

type IUserRetrieveOrCreate = {
  userId: string | undefined;
  username: string | undefined;
  email: string | undefined;
  avatarUrl: string | null;
};

type IUser = {
  profileId: string;
  userId: string;
  username: string;
  email: string;
  avatarUrl: string | null;
};

interface AuthContextData {
  user: IUser;
  retrieveOrCreate(userR: IUserRetrieveOrCreate): Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

const AuthProvider: React.FC<IProps> = ({ children }: IProps) => {
  const { keycloak, initialized } = useKeycloak();
  Api.interceptors.request.use((config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${keycloak.token}`;
    return config;
  });

  const [user, setUser] = useState<IUser>({} as IUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (keycloak.authenticated && initialized) {
        const result = await Api.get(`/profile/${keycloak.tokenParsed?.sub}`);

        setUser(result.data);
      }

      setIsLoading(false);
    };

    loadUser();
  }, [keycloak, initialized]);

  // const [user, setUser] = useState<IUser>(() => {
  //   const userLocal = localStorage.getItem("user");

  //   if (userLocal) {
  //     return JSON.parse(userLocal);
  //   }

  //   return {};
  // });

  async function retrieveOrCreate(userR: IUserRetrieveOrCreate) {
    await Api.get(`/profile/${userR.userId}`)
      .then((response) => {
        const payload = {
          profileId: response.data.profileId,
          userId: response.data.userId,
          username: response.data.username,
          email: response.data.email,
          avatarUrl: response.data.avatarUrl,
        };

        setUser(payload);
      })
      .catch(async (err) => {
        if (err.response.status === 404) {
          const result = await Api.post("/profile", {
            user_id: userR.userId,
            username: userR.username,
            email: userR.email,
            avatar_url: userR.avatarUrl,
          });

          const payload = {
            profileId: result.data.profileId,
            userId: result.data.userId,
            username: result.data.username,
            email: result.data.email,
            avatarUrl: result.data.avatarUrl,
          };

          setUser(payload);
        }
      });
  }
  return (
    <AuthContext.Provider value={{ user, retrieveOrCreate, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
