\"use client\";

import * as React from \"react\";
import LeadModal from \"@/components/LeadModal\";

type Props = {
  whatsUrl: string;
  projectName?: string;
  projectSlug?: string;
};

/**
 * Botão flutuante do WhatsApp:
 * - Sempre abre o modal de lead ANTES de liberar o WhatsApp.
 * - O redirecionamento ocorre após o envio do formulário.
 */
export default function WhatsAppFloatingButton({ whatsUrl, projectName, projectSlug }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        aria-label=\"WhatsApp\"
        className=\"fixed bottom-5 right-5 z-[900] inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg hover:bg-green-600 focus:outline-none\"
        onClick={() => setOpen(true)}
      >
        {/* ícone WhatsApp (SVG inline) */}
        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" className=\"h-7 w-7 fill-white\">
          <path d=\"M19.11 17.37c-.28-.14-1.62-.8-1.87-.9-.25-.09-.43-.14-.62.14-.18.27-.72.9-.89 1.09-.16.18-.33.2-.61.07-.28-.14-1.18-.43-2.25-1.36-.83-.71-1.39-1.58-1.55-1.85-.16-.27-.02-.42.12-.56.13-.13.28-.33.42-.5.14-.18.18-.27.28-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.49-.85-2.04-.22-.53-.45-.46-.62-.47l-.53-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3 0 1.36.99 2.68 1.13 2.86.14.18 1.95 2.98 4.72 4.17.66.28 1.17.45 1.57.57.66.21 1.26.18 1.73.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.53-.32z\"/>
          <path d=\"M26.88 5.12A13.91 13.91 0 0 0 16 1C8.28 1 2 7.28 2 15c0 2.46.65 4.76 1.78 6.76L2 31l9.43-1.76A13.88 13.88 0 0 0 16 29c7.72 0 14-6.28 14-14 0-3.72-1.46-7.19-3.12-9.88zM16 27.5c-2.36 0-4.54-.72-6.36-1.95l-.46-.3-5.6 1.05 1.07-5.46-.3-.47A11.47 11.47 0 0 1 4.5 15C4.5 8.9 9.9 3.5 16 3.5S27.5 8.9 27.5 15 22.1 27.5 16 27.5z\"/>
        </svg>
      </button>

      <LeadModal
        open={open}
        onOpenChange={setOpen}
        whatsUrl={whatsUrl}
        projectName={projectName}
        projectSlug={projectSlug}
      />
    </>
  );
}
