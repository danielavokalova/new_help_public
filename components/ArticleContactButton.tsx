"use client";

import { usePortal } from "@/app/portal/layout";
import s from "@/app/portal/portal-layout.module.css";

export function ArticleContactButton() {
  const { openContact } = usePortal();
  return (
    <button className={s.articleFooterBtnPrimary} onClick={openContact}>
      Contact Help
    </button>
  );
}
