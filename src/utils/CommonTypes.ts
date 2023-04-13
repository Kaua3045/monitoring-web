export type ErrorType = {
  response: {
    data: {
      message: string;
      errors: [
        {
          message: string;
        }
      ];
    };
  };
};

export type UrlType = {
  id: number;
  title: string | undefined;
  url: string | undefined;
  executeDate: string | undefined;
  linkExecution: string | undefined;
};
