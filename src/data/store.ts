import { createDemand } from "@/types/Demand";
import { createUser } from "@/types/User";
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

  currentUser: createUser(
    "Jean",
    "Dupont",
    "jean.dupont@example.com",

    25
  ),
  update() {
    this.currentUser.iban = "CH12 3456 7890 1234 5678 9";
    this.currentUser.adress = "chemin de la fontaine 3, 1000 Lausanne";
  },
});
