import { atom } from "recoil";

export const currentUserState = atom({
  key: "currentUserState",
  default: {
    "id": "246e39e9-bd5b-465e-844f-d10b94903100",
    "name": "Rob",
    "email": "Rob@gmail.com",
    "lists": {
      "items": [
        {
          "id": "d7233b6a-7860-4fa7-b18a-8e4380f92ac4",
          "title": "Home",
          "items": {
            "items": [
              {
                "id": "85a8a63c-6676-4837-b2e9-f176745787cb",
                "name": "Charger",
                "category": "Essentials",
                "checked": false
              },
              {
                "id": "e7acb56b-3166-4a40-b7cc-59bb1b85fdf0",
                "name": "Hat",
                "category": "Clothing",
                "checked": false
              },
              {
                "id": "e6232f78-e50b-42da-ac46-b32e47d981f0",
                "name": "Keys",
                "category": "Essentials",
                "checked": false
              },
              {
                "id": "366126f2-5876-4a5d-8e7f-446802976d71",
                "name": "Phone",
                "category": "Essentials",
                "checked": false
              },
              {
                "id": "54f78788-a366-4f63-9a2e-e004314f5703",
                "name": "Shirt",
                "category": "Clothing",
                "checked": false
              },
              {
                "id": "0884180a-5197-4704-9cb3-0b27cffb82a1",
                "name": "Shorts",
                "category": "Clothing",
                "checked": false
              },
              {
                "id": "516a8de2-221f-4d62-8b5e-f16c0ed64173",
                "name": "Socks",
                "category": "Clothing",
                "checked": false
              },
              {
                "id": "bef84816-8b5d-4a2d-874d-861bd3f5f5a6",
                "name": "Underwear",
                "category": "Clothing",
                "checked": false
              },
              {
                "id": "9752859e-3ac5-480c-bd9e-673e2f920494",
                "name": "Wallet",
                "category": "Essentials",
                "checked": false
              }
            ]
          }
        },
        {
          "id": "e23c291e-ebfe-4bd5-ad78-630c2463fdc2",
          "title": "Grocery Store",
          "items": {
            "items": []
          }
        },
        {
          "id": "2b0ccfd8-1696-43cc-8778-422f606affe0",
          "title": "Mom’s Place",
          "items": {
            "items": []
          }
        },
        {
          "id": "c0e1f18d-c5c6-4494-9e06-26311221a7f4",
          "title": "Cinema",
          "items": {
            "items": []
          }
        }
      ]
    }
  }
});
