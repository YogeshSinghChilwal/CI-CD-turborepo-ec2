import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import {client} from '@repo/prisma-db/client'



export default async function Home() {

  const user = await client.user.findFirst()

  return (
    <div className={styles.page}>
      <h1>Hello {user?.username}</h1>
    </div>
  );
}
