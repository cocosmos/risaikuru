import { createDemand } from "@/types/Demand";
import { createUser } from "@/types/User";
import { reactive } from "vue";

export const store = reactive({
  demands: [
    createDemand(
      ["alu", "papier"],
      [
        { id: "S", number: 3, description: "Small" },
        { id: "M", number: 2, description: "Medium" },
      ],
      "chemin de la fontaine 3, 1000 Lausanne",
      createUser("John", "Doe", "john.doe@example.com", 5),
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
      createUser("John", "Doe", "john.doe@example.com", 5),
      5,
      new Date(),
      new Date()
    ),
  ],
  users: [
    createUser("John", "Doe", "john.doe@example.com", 20),
    createUser("John", "Doe", "john.doe@example.com", 5),
  ],
});
