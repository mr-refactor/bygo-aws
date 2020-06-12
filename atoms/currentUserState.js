import { atom } from "recoil";

export const currentUserState = atom({
  key: "currentUserState",
  default: {
    id: "246e39e9-bd5b-465e-844f-d10b94903100",
    name: "Rob",
    email: "Rob@gmail.com",
    lists: {
      items: [
        {
          id: "d7233b6a-7860-4fa7-b18a-8e4380f92ac4",
          title: "Home",
          items: {
            items: [],
          },
        },
        {
          id: "c0e1f18d-c5c6-4494-9e06-26311221a7f4",
          title: "Cinema",
          items: {
            items: [],
          },
        },
      ],
    },
  },
});
