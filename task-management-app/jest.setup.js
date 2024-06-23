//This file will contain the setup code to mock import.meta.env.
//installed the babel-plugin-transform-vite-meta-env plugin to transform import.meta.env for Jest.
//Common issue using Vite with Jest: Jest doesn't support import.meta.env out of the box.

globalThis.import = {
  meta: {
    env: {
      VITE_USER_0_NAME: "Owner 0",
      VITE_USER_0_ROLE: "Owner",
      VITE_USER_0_EMAIL: "owner0@example.com",
      VITE_USER_0_PASSWORD: "OwnerPass1!",
      VITE_USER_0_AVATAR: "/src/assets/images/owner0.jpg",

      VITE_USER_1_NAME: "Owner 1",
      VITE_USER_1_ROLE: "Owner",
      VITE_USER_1_EMAIL: "owner1@example.com",
      VITE_USER_1_PASSWORD: "OwnerPass1!",
      VITE_USER_1_AVATAR: "/src/assets/images/owner1.jpg",

      VITE_USER_2_NAME: "Owner 2",
      VITE_USER_2_ROLE: "Owner",
      VITE_USER_2_EMAIL: "owner2@example.com",
      VITE_USER_2_PASSWORD: "OwnerPass2!",
      VITE_USER_2_AVATAR: "/src/assets/images/owner2.jpg",

      VITE_USER_3_NAME: "Owner 3",
      VITE_USER_3_ROLE: "Owner",
      VITE_USER_3_EMAIL: "owner3@example.com",
      VITE_USER_3_PASSWORD: "OwnerPass3!",
      VITE_USER_3_AVATAR: "/src/assets/images/owner3.jpg",

      VITE_USER_4_NAME: "Admin User",
      VITE_USER_4_ROLE: "Admin",
      VITE_USER_4_EMAIL: "admin@example.com",
      VITE_USER_4_PASSWORD: "AdminPass1234&",
      VITE_USER_4_AVATAR: "/src/assets/images/admin.jpg",
    },
  },
};
