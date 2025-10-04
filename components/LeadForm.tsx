\"use client\";

import * as React from \"react\";

type Props = {
  projectName?: string;
  projectSlug?: string;
  onSubmitted?: () => void;
};

export default function LeadForm({ projectName, projectSlug, onSubmitted }: Props) {
  const [fgts, setFgts] = React.useState<\"sim\" | \"nao\" | \"\">(\"\");
  const [consent, setConsent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    console.log(\"LEAD_FORM_SUBMIT\", {
      ...payload,
      projectName,
      projectSlug,
      consent,
      ts: new Date().toISOString(),
    });
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onSubmitted?.();
      try {
        (e.currentTarget as HTMLFormElement).reset();
      } catch {}
      setFgts(\"\"); setConsent(false);
    }, 400);
  }

  return (
    <form onSubmit={handleSubmit} className=\"space-y-4\">
      <div className=\"grid gap-1.5\">
        <label htmlFor=\"lead-name\" className=\"text-sm font-medium text-slate-700\">Nome completo</label>
        <input id=\"lead-name\" name=\"name\" type=\"text\" autoComplete=\"name\" required className=\"w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-400\" placeholder=\"Seu nome\" />
      </div>

      <div className=\"grid gap-1.5\">
        <label htmlFor=\"lead-email\" className=\"text-sm font-medium text-slate-700\">E-mail</label>
        <input id=\"lead-email\" name=\"email\" type=\"email\" autoComplete=\"email\" required className=\"w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-400\" placeholder=\"seuemail@exemplo.com\" />
      </div>

      <div className=\"grid gap-1.5\">
        <label htmlFor=\"lead-phone\" className=\"text-sm font-medium text-slate-700\">Telefone / WhatsApp</label>
        <input id=\"lead-phone\" name=\"phone\" type=\"tel\" autoComplete=\"tel\" inputMode=\"tel\" required className=\"w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-400\" placeholder=\"(31) 9 9999-9999\" />
      </div>

      <div className=\"grid gap-1.5\">
        <label htmlFor=\"lead-downpayment\" className=\"text-sm font-medium text-slate-700\">Valor de entrada disponível (R$)</label>
        <input id=\"lead-downpayment\" name=\"downPayment\" type=\"text\" inputMode=\"numeric\" pattern=\"[0-9.,]*\" className=\"w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-400\" placeholder=\"ex.: 50.000\" />
      </div>

      <div className=\"grid gap-1.5\">
        <span className=\"text-sm font-medium text-slate-700\">Vai usar FGTS?</span>
        <div className=\"flex gap-3\">
          <label className=\"inline-flex items-center gap-2 text-sm text-slate-700\">
            <input type=\"radio\" name=\"fgts\" value=\"sim\" checked={fgts === \"sim\"} onChange={() => setFgts(\"sim\")} /> Sim
          </label>
          <label className=\"inline-flex items-center gap-2 text-sm text-slate-700\">
            <input type=\"radio\" name=\"fgts\" value=\"nao\" checked={fgts === \"nao\"} onChange={() => setFgts(\"nao\")} /> Não
          </label>
        </div>
      </div>

      {fgts === \"sim\" && (
        <div className=\"grid gap-1.5\">
          <label htmlFor=\"lead-fgts-amount\" className=\"text-sm font-medium text-slate-700\">Valor do FGTS (R$)</label>
          <input id=\"lead-fgts-amount\" name=\"fgtsAmount\" type=\"text\" inputMode=\"numeric\" pattern=\"[0-9.,]*\" className=\"w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-400\" placeholder=\"ex.: 20.000\" />
        </div>
      )}

      <div className=\"grid gap-1.5\">
        <label htmlFor=\"lead-notes\" className=\"text-sm font-medium text-slate-700\">Observações (opcional)</label>
        <textarea id=\"lead-notes\" name=\"notes\" rows={3} className=\"w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-400\" placeholder=\"Financiamento aprovado? Bairro de interesse? etc.\" />
      </div>

      <label className=\"mt-2 inline-flex items-start gap-2 text-sm text-slate-700\">
        <input type=\"checkbox\" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
        <span>Autorizo o contato por WhatsApp/E-mail/telefone e o tratamento dos meus dados para fins de atendimento e proposta.</span>
      </label>

      <button type=\"submit\" disabled={submitting} className=\"mt-2 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60\">
        {submitting ? \"Enviando...\" : \"Quero ser atendido\"}
      </button>

      <input type=\"hidden\" name=\"projectName\" value={projectName ?? \"\"} />
      <input type=\"hidden\" name=\"projectSlug\" value={projectSlug ?? \"\"} />
      <input type=\"hidden\" name=\"utm_source\" value={(globalThis as any)?.utm_source ?? \"\"} />
    </form>
  );
}
