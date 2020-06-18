import { atom } from "recoil";

export const currentUserState = atom({
  key: "currentUserState",
  default:
  // {
  //   "id": "48b95e8b-d2a2-4754-aea9-59576f5fe201",
  //   "email": "jaydoe@yahoo.com",
  //   "name": "Jason Doe",
  //   "password": "12345",
  //   "lists": {
  //     "items": []
  //   }
  // }
  {
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
                "checked": true
              },
              {
                "id": "e7acb56b-3166-4a40-b7cc-59bb1b85fdf0",
                "name": "Hat",
                "category": "Clothing",
                "checked": true
              },
              {
                "id": "e6232f78-e50b-42da-ac46-b32e47d981f0",
                "name": "Keys",
                "category": "Essentials",
                "checked": true
              }
            ]
          }
        },
        {
          "id": "e23c291e-ebfe-4bd5-ad78-630c2463fdc2",
          "title": "Grocery Store",
          "items": {
            "items": [
              {
                "id": "12326a94-d093-4a38-a0be-30b8d2344bd4",
                "name": "Cantelope",
                "category": "Other",
                "checked": true
              },
              {
                "id": "9c9c6d67-ae69-4141-8a40-95b80d53093c",
                "name": "Carrots",
                "category": "Other",
                "checked": true
              },
              {
                "id": "5973c492-6deb-4ef6-baf5-059ce6680097",
                "name": "Jackfruit",
                "category": "Other",
                "checked": true
              },
              {
                "id": "3aa8ebf1-e310-4505-bd90-f50c8d2e6d8f",
                "name": "Keys",
                "category": "Other",
                "checked": true
              },
              {
                "id": "f473f57e-9843-4857-a58a-4fec7f7cbf8b",
                "name": "Oranges",
                "category": "Other",
                "checked": true
              },
              {
                "id": "3fb1a1b5-1ceb-411f-bfe9-93aad80349e6",
                "name": "Phone",
                "category": "Other",
                "checked": true
              },
              {
                "id": "7c7e10f2-e417-4a51-9726-a092360cdbd4",
                "name": "Wallet",
                "category": "Other",
                "checked": true
              },
              {
                "id": "56d27af6-bc97-4317-9caf-d59c561f8e0d",
                "name": "Watermelon",
                "category": "Other",
                "checked": true
              }
            ]
          }
        },
        {
          "id": "82041253-6453-4e5a-bcc9-56fefd37a2ae",
          "title": "Movie Theater",
          "items": {
            "items": []
          }
        },
        {
          "id": "43c87781-550b-4301-a82e-838396efef5b",
          "title": "Dogg Park",
          "items": {
            "items": [
              {
                "id": "bce8479f-54fb-4d74-9ef5-eec152db3280",
                "name": "Dog",
                "category": "Other",
                "checked": false
              },
              {
                "id": "3b2a78be-c291-44ec-acf8-232d0316e44c",
                "name": "Frisbee",
                "category": "Other",
                "checked": true
              },
              {
                "id": "5027d64a-f3ae-4b02-9be1-c8985d15e177",
                "name": "Leash",
                "category": "Other",
                "checked": false
              },
              {
                "id": "bb1e77a3-691f-4be6-a7e2-137ee6eec957",
                "name": "Poop Bag",
                "category": "Other",
                "checked": false
              },
              {
                "id": "19b7879c-ce11-43a3-a5cd-4aa7391f4707",
                "name": "Shorts",
                "category": "Other",
                "checked": true
              }
            ]
          }
        },
        {
          "id": "55494c8c-479e-4c9e-9f40-103048f52b82",
          "title": "Bri’s Place",
          "items": {
            "items": [
              {
                "id": "67d0a8e8-1fdf-4d28-8257-dad3cd162e7f",
                "name": "Computer",
                "category": "Other",
                "checked": false
              },
              {
                "id": "2b7ebdb9-e767-4e5a-b91b-64bdd1945ded",
                "name": "Hat",
                "category": "Other",
                "checked": false
              },
              {
                "id": "35df5f3d-645a-440e-9fc3-48ab70e18cc7",
                "name": "Keys",
                "category": "Other",
                "checked": false
              },
              {
                "id": "52f572f0-9909-4b9f-ad54-a45e33d1642d",
                "name": "Phone",
                "category": "Other",
                "checked": false
              },
              {
                "id": "53447f80-0df4-4bb2-a985-19153c805f40",
                "name": "Wallet",
                "category": "Other",
                "checked": false
              }
            ]
          }
        }
      ]
    }
  }
});
