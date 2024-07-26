export type AuthModalProps = {
    isOpen: boolean;
    onClose: ;
    accountStatus: boolean;
    setAccountStatus:  (accountStatus: boolean) => void;
    email: string;
    setEmail: (email: string) => void;
    emailOrUsername: string;
    setEmailOrUsername: (emailOrUsername: string) => void;
    username: string;
    setUsername: (username: string) => void;
    password: string;
    setPassword: (password: string) => void;
    logInOnEnter: ; 
    signUpOnEnter: ;
    logIn: ;
    signUp: ;
    onEnter: ;
  }