import { toast } from "react-toastify";

export const urlMessages = {
  errors: {
    titleMessage: {
      english: "'title' should not be null or empty",
      translated: "O título não pode ser vazio!",
    },
    urlMessage: {
      english: "'url' you must provide a valid url",
      translated: "A url deve ser válida!",
    },
    executeDateMessage: {
      english: "'executeDate' should not be empty",
      translated: "A data de verificação não pode ser vazia!",
    },
    executeDatePassedMessage: {
      english: "'executeDate' cannot be a date that has already passed",
      translated: "A data de verificação não pode ser no passado!",
    },
    linkExecutionMessage: {
      english: "'linkExecution' should not be null",
      translated: "O tipo não pode ser vazio!",
    },
  },
  success: {
    created: "Link criado com sucesso!",
    updated: "Link atualizado com sucesso!",
    deleted: "Link deletado com sucesso!",
  },
};

export const profileMessages = {
  errors: {
    avatarTypeMessage: {
      english: "Image type is not valid",
      translated: "Esse tipo de imagem não é aceito!",
    },
    avatarSizeMessage: {
      english: "Image size is not valid",
      translated: "Essa imagem é grande de mais!",
    },
    profileNotFoundMessage: {
      english: "Profile with ID %s was not found",
      translated: "Uusário não encontrado!",
    },
    usernameMessage: {
      english: "'username' should not be null or empty",
      translated: "O username não pode ser vazio!",
    },
    emailMessage: {
      english: "'email' should not be null or empty",
      translated: "O email não pode ser vazio!",
    },
    emailExistsMessage: {
      english: "Email already exists",
      translated: "O email já existe!",
    },
    passwordMessage: {
      english: "'password' should not be null or empty",
      translated: "A senha não pode ser vazia!",
    },
    passwordLengthInvalidMessage: {
      english: "'password' must be at least 8 characters",
      translated: "A senha deve ter no mínimo 8 caracteres!",
    },
  },
  success: {
    updated: "Perfil atualizado com sucesso!",
  },
};

export const commonMessages = {
  serverError: "Erro interno, contate o suporte!",
};

export const showUrlErrorMessages = (message: string): string => {
  switch (message) {
    case urlMessages.errors.titleMessage.english:
      return urlMessages.errors.titleMessage.translated;
    case urlMessages.errors.urlMessage.english:
      return urlMessages.errors.urlMessage.translated;
    case urlMessages.errors.executeDateMessage.english:
      return urlMessages.errors.executeDateMessage.translated;
    case urlMessages.errors.executeDatePassedMessage.english:
      return urlMessages.errors.executeDatePassedMessage.translated;
    case urlMessages.errors.linkExecutionMessage.english:
      return urlMessages.errors.linkExecutionMessage.translated;
    default:
      toast.error(commonMessages.serverError);
  }

  return commonMessages.serverError;
};

export const showProfileErrorMessages = (message: string): string => {
  switch (message) {
    case profileMessages.errors.avatarTypeMessage.english:
      return profileMessages.errors.avatarTypeMessage.translated;
    case profileMessages.errors.avatarSizeMessage.english:
      return profileMessages.errors.avatarSizeMessage.translated;
    case profileMessages.errors.usernameMessage.english:
      return profileMessages.errors.usernameMessage.translated;
    case profileMessages.errors.emailMessage.english:
      return profileMessages.errors.emailMessage.translated;
    case profileMessages.errors.emailExistsMessage.english:
      return profileMessages.errors.emailExistsMessage.translated;
    case profileMessages.errors.passwordMessage.english:
      return profileMessages.errors.passwordMessage.translated;
    case profileMessages.errors.passwordLengthInvalidMessage.english:
      return profileMessages.errors.passwordLengthInvalidMessage.translated;
    default:
      toast.error(commonMessages.serverError);
  }

  return commonMessages.serverError;
};
