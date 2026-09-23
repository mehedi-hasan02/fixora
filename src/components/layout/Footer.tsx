"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wrench, Phone, Mail, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

const services = [
  "Plumbing",
  "Electrical",
  "AC Repair",
  "Fan Repair",
  "Painting",
  "Appliance Repair",
];

const socialIcons = [FaFacebook, FaInstagram, FaYoutube, FaLinkedin];

const Footer = () => {
  const pathname = usePathname();

  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin")
  ) {
    return null;
  }

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                <Wrench className="h-4.5 w-4.5" />
              </div>
              <span className="text-xl font-bold text-primary">Fixora</span>
            </Link>
            <p className="mt-3 text-sm text-muted">
              Better Homes, Happier Lives
            </p>

            <div className="mt-5 flex gap-3">
              {socialIcons.map((Icon, i) => (
                <div
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-muted"
                >
                  <Icon className="h-4 w-4" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-text">Quick Links</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/services/requests" className="hover:text-primary">
                  Request a Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-text">Services</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {services.map((service) => (
                <li key={service}>
                  <Link href="/services" className="hover:text-primary">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-text">Contact Us</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                +880 1712 345678
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                support@fixora.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Fixora. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
