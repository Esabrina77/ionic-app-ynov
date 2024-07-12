import { atomWithStorage } from "jotai/utils";
import { YAPI_TOKEN } from "./constants/tokens.constant";
import { UserType } from "./interfaces/user-type";
import { YapiToken } from "./interfaces/yapi-token.interface";
// ATOMS
export const yapiTokenAtom = atomWithStorage<YapiToken>(YAPI_TOKEN, {
  token: "debug",
  type: UserType.Student,
  data: {
    Nom: "RODRIGUE",
    Prenom: "Damien",
    _id: "generic-test-student",
    uid: "fake",
  },
  disabledFeatures: [],
});

export const UserService: React.FC = () => {
  return <></>;
};
