"use client";

import CategoryForm from "../../../../components/category/CategoryForm";
import { useParams } from "next/navigation";
import withAuth from "@/components/other/withAuth";

function NewCategoryPage() {
  const params = useParams();

  return (
    <>
      <h1 className="page-title">Создать новую категорию</h1>
      <CategoryForm />
    </>
  );
}

export default withAuth(NewCategoryPage);
