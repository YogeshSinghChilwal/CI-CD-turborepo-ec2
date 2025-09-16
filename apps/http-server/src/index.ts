import express from "express";
import { client } from "@repo/prisma-db/client";

const app = express();
app.use(express.json());

const port = 3002;

app.get("/", (req, res) => {
  res.send("Hello the get req is working fine!");
});

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await client.user.findFirst({ where: { username } });

    if (!user) {
      const newUser = await client.user.create({
        data: {
          username,
          password,
        },
      });

      res.status(200).json(newUser.id);
      return
    }

    res.status(300).json({ message: "User already exist" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}.`);
});
