export function AnnouncementBar() {
  return (
    <div className="bg-brand-cocoa text-brand-cream/95 text-[11px] sm:text-xs font-medium py-2 px-4 text-center tracking-wide">
      <span className="hidden sm:inline">
        Minimum 2 days booking · Unlimited KMs · Hotel pickup &amp; drop · Same-day confirmation
      </span>
      <span className="sm:hidden">
        Min. 2-day booking · Unlimited KMs · Hotel pickup
      </span>
    </div>
  );
}
