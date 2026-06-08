import Link from "next/link";
import { Home } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="min-h-[60vh] grid place-items-center bg-brand-gray-bg">
        <div className="container max-w-xl text-center py-16">
          <div className="text-[120px] md:text-[160px] leading-none font-extrabold text-brand-yellow">
            404
          </div>
          <h1 className="text-brand-black text-3xl md:text-4xl mb-4">
            Page Not Found
          </h1>
          <p className="text-neutral-700 mb-7">
            The page you&apos;re looking for took a wrong turn. Let&apos;s get
            you back on the road.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Go to Homepage
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/goa/self-drive-car-rental-goa">Browse Cars</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
