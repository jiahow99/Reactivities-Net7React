'use client'

import { User } from "@/models/User";
import { useSession } from "next-auth/react";

export const getSessionData = () => {
  const { data, status } = useSession();
  const user = data?.user as User;

  return { user, status };
};