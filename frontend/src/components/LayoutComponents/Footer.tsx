import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("Layout");

  return (
    <footer className="border-t py-6">
      <div className="container text-center text-sm text-muted-foreground">
        {t("Footer_text", { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
}
