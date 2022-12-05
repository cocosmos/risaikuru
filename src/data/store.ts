import { createDemand } from "@/types/Demand";
import { createUser, UserType } from "@/types/User";
import { Session, User } from "@supabase/supabase-js";
import { reactive } from "vue";

export const store = reactive({
  users: [
    createUser(
      "Jack",
      "Doe",
      "jack.doe@example.com",

      18
    ),
    createUser(
      "John",
      "Doe",
      "john.doe@example.com",

      5
    ),
  ],
  demands: [
    createDemand(
      ["alu", "papier"],
      [
        { id: "S", number: 3, description: "Small" },
        { id: "M", number: 2, description: "Medium" },
      ],
      "chemin de la fontaine 3, 1000 Lausanne",
      createUser(
        "Jack",
        "Doe",
        "jack.doe@example.com",

        18
      ),
      5,
      new Date(),
      new Date()
    ),
    createDemand(
      ["alu", "papier"],
      [
        { id: "S", number: 3, description: "Small" },
        { id: "M", number: 2, description: "Medium" },
      ],
      "chemin de la fontaine 3, 1000 Lausanne",
      createUser(
        "John",
        "Doe",
        "john.doe@example.com",

        5
      ),
      5,
      new Date(),
      new Date()
    ),
  ],
  user: {} as UserType,
  session: {} as Session | null,

  currentUser: {} as User,
});
