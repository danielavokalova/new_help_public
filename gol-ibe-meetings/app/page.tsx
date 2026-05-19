"use client";

import Link from "next/link";
import s from "./home.module.css";

export default function HelpCenterHome() {
  return (
    <div className={s.page}>
      <div className={s.topBar}>
        <span className={s.topBarBrand}>
          GOL IBE Meetings<span className={s.topBarDot} /> Help Center
        </span>
      </div>

      <div className={s.hero}>
        <h1 className={s.heroTitle}>Hi, how can we help you?</h1>
        <p className={s.heroSub}>Browse the GOL IBE Meetings knowledge base below.</p>
      </div>

      <div className={s.products}>
        <p className={s.sectionLabel}>Browse by topic</p>
        <div className={s.grid}>
          <Link href="/portal/" className={s.tile}>
            <div className={s.tileStrip} />
            <div className={s.tileBody}>
              <div className={`${s.tileIcon} ${s.tileIconActive}`}>📅</div>
              <div className={s.tileName}>Meetings Help</div>
              <div className={s.tileDesc}>Meeting setup, attendees, approvals, notifications and reporting.</div>
              <span className={s.tileCta}>Open help →</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
