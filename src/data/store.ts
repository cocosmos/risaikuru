import { createDemand } from "@/types/Demand";
import { Conversation } from "@/types/Message";
import { createUser, UserType } from "@/types/User";
import { Session, User } from "@supabase/supabase-js";
import { reactive } from "vue";
const userTest = createUser("Jack", "Doe", "");
const userTest2 = createUser("Jack", "Doe", "");
const demandTest = createDemand(
  ["alu", "papier"],
  [
    { id: "S", number: 3, description: "Small" },
    { id: "M", number: 2, description: "Medium" },
  ],
  {
    name: "chemin de la fontaine 3, 1000 Lausanne",
    lat: 46.519653,
    long: 6.632273,
  },
  userTest,
  5,
  new Date(),
  new Date()
);

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
    demandTest,
    /*createDemand(
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
        ),*/
  ],
  user: {} as UserType,
  session: {} as Session | null,

  currentUser: {} as User,

  signOut: () => {
    store.session = null;
    store.currentUser = {} as User;
  },

  conversations: [
    {
      id: "1",
      sender: userTest,
      demand: demandTest,
      receiver: userTest2,
    },
    {
      id: "2",
      sender: userTest,
      demand: demandTest,
      receiver: userTest2,
      messages: [
        {
          id: "1",
          isSender: true,
          user: userTest,
          content: "Hello",
          createdAt: new Date(),
          isRead: false,
        },
        {
          id: "2",
          isSender: false,
          user: userTest,
          content: "Hi",
          createdAt: new Date(),
          isRead: false,
        },
        {
          id: "3",
          isSender: false,
          user: userTest,
          content:
            "Bonjour, je peux venir vers 15h pour chercher vos déchets, pouvez vous les mettre devant votre porte ?",
          createdAt: new Date(99999999),
          isRead: false,
        },
      ],
    },
    {
      id: "3",
      sender: userTest2,
      demand: demandTest,
      receiver: userTest,
      messages: [
        {
          id: "1",
          isSender: true,
          user: userTest,
          content: "Hello",
          createdAt: new Date(),
          isRead: false,
        },
        {
          id: "2",
          isSender: false,
          user: userTest,
          content: "Hi",
          createdAt: new Date(),
          isRead: false,
        },
        {
          id: "3",
          isSender: false,
          user: userTest,
          content:
            "Bonjour, je peux venir vers 15h pour chercher vos déchets, pouvez vous les mettre devant votre porte ?",
          createdAt: new Date(99999999),
          isRead: false,
        },
      ],
    },
    {
      id: "4",
      sender: userTest,
      demand: demandTest,
      receiver: userTest2,
      messages: [
        {
          id: "1",
          isSender: true,
          user: userTest,
          content: "Hello",
          createdAt: new Date(),
          isRead: false,
        },
        {
          id: "2",
          isSender: false,
          user: userTest,
          content: "Hi",
          createdAt: new Date(),
          isRead: false,
        },
        {
          id: "3",
          isSender: false,
          user: userTest,
          content:
            "Bonjour, je peux venir vers 15h pour chercher vos déchets, pouvez vous les mettre devant votre porte ?",
          createdAt: new Date(99999999),
          isRead: false,
        },
      ],
    },
    {
      id: "5",
      sender: userTest2,
      demand: demandTest,
      receiver: userTest,
      messages: [
        {
          id: "1",
          isSender: true,
          user: userTest,
          content: "Hello",
          createdAt: new Date(),
          isRead: false,
        },
        {
          id: "2",
          isSender: false,
          user: userTest,
          content: "Hi",
          createdAt: new Date(),
          isRead: false,
        },
        {
          id: "3",
          isSender: false,
          user: userTest,
          content:
            "Bonjour, je peux venir vers 15h pour chercher vos déchets, pouvez vous les mettre devant votre porte ?",
          createdAt: new Date(99999999),
          isRead: false,
        },
      ],
    },
    {
      id: "6",
      sender: userTest,
      demand: demandTest,
      receiver: userTest2,
      messages: [
        {
          id: "1",
          isSender: true,
          user: userTest,
          content: "Hello",
          createdAt: new Date(),
          isRead: false,
        },
        {
          id: "2",
          isSender: false,
          user: userTest,
          content: "Hi",
          createdAt: new Date(),
          isRead: false,
        },
        {
          id: "3",
          isSender: false,
          user: userTest,
          content:
            "Bonjour, je peux venir vers 15h pour chercher vos déchets, pouvez vous les mettre devant votre porte ?",
          createdAt: new Date(99999999),
          isRead: false,
        },
      ],
    },
    {
      id: "7",
      sender: userTest2,
      demand: demandTest,
      receiver: userTest,
      messages: [
        {
          id: "1",
          isSender: true,
          user: userTest,
          content: "Hello",
          createdAt: new Date(),
          isRead: false,
        },
        {
          id: "2",
          isSender: false,
          user: userTest,
          content: "Hi",
          createdAt: new Date(),
          isRead: false,
        },
        {
          id: "3",
          isSender: false,
          user: userTest,
          content:
            "Bonjour, je peux venir vers 15h pour chercher vos déchets, pouvez vous les mettre devant votre porte ?",
          createdAt: new Date(99999999),
          isRead: false,
        },
      ],
    },
  ] as Conversation[],
});
