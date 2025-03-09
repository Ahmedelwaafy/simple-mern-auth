export default function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="container text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} My Application. All rights reserved.
      </div>
    </footer>
  );
}
