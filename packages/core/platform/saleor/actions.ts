"use server"

import { getServerAuthClient } from "./config"

export async function logout() {
  "use server"
  getServerAuthClient().signOut()
}
