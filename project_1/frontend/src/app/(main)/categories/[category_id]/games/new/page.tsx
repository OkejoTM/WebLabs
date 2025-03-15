"use client";

import GameForm from "../../../../../../components/GameForm";
import { useParams } from "next/navigation";
import withAuth from "@/components/other/withAuth";

function NewGamePage() {
  const params = useParams();
  const categoryId = Number(params.category_id);

  return (
    <>
      <h1 className="page-title">Создать новую игру</h1>
      <GameForm categoryId={categoryId} />
    </>
  );
}

export default withAuth(NewGamePage);
