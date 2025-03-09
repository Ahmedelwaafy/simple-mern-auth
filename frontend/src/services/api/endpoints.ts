import { EndpointConfig } from "@/types";
import {
  ADD_SUBJECT,
  GET_PROFILE,
  GET_SUBJECTS_LIST,
  SIGNIN,
  SIGNOUT,
  SIGNUP,
} from "./queries";

const auth: Record<string, EndpointConfig> = {
  [SIGNIN]: {
    url: "/auth/sign-in",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [SIGNUP]: {
    url: "/auth/sign-up",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [SIGNOUT]: {
    url: "/auth/sign-out",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
};
const profile: Record<string, EndpointConfig> = {
  [GET_PROFILE]: {
    url: "/user/profile",
    config: {
      method: "GET",
    },
  },
};
const subjects: Record<string, EndpointConfig> = {
  [ADD_SUBJECT]: {
    url: "/subject",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [GET_SUBJECTS_LIST]: {
    url: "/subject",
    config: {
      method: "GET",
    },
  },
};

const endpoints: Record<string, EndpointConfig> = {
  ...auth,
  ...profile,
  ...subjects,
};
export default endpoints;
