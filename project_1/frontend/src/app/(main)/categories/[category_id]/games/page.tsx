"use client";

import GamesPage from "../../../../../components/GamePage";
import withAuth from "@/components/other/withAuth";

function HomePage() {
  return <GamesPage />;
}

export default withAuth(HomePage);
