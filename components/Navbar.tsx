"use client";
import Link from "next/link";
import { useEffect } from "react";
import AuthButtons from "./AuthButtons";

export default function Navbar() {
  useEffect(() => {
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-2" dir="rtl">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-white ms-4" href="/" style={{ letterSpacing: "1px", fontSize: "1.3rem" }}>
          داشبورد متریک‌ها
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="تغییر منو"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-2" style={{ direction: "rtl" }}>
            <li className="nav-item">
              <Link className="nav-link active text-white" aria-current="page" href="/">
                خانه
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white-50" href="/about">
                درباره
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white-50" href="/contact">
                تماس
              </Link>
            </li>
          </ul>
          <div className="d-flex gap-2 me-lg-auto">
            <AuthButtons />
          </div>
        </div>
      </div>
    </nav>
  );
}
