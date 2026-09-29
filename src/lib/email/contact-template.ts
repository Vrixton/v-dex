/**
 * Plantilla del correo que llega al recibir un mensaje del formulario.
 *
 * Estilos en línea y tablas a propósito: el correo HTML no admite hojas de
 * estilo externas ni flexbox con garantías, y cada cliente interpreta el
 * CSS a su manera. Lo que aquí parece anticuado es lo único que se ve igual
 * en Gmail, Outlook y Apple Mail.
 *
 * Se envía junto a una versión en texto plano, para los clientes que no
 * muestran HTML y para los filtros de spam, que desconfían del HTML solo.
 */

type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

/** Evita que el contenido del mensaje se interprete como HTML. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function contactEmailHtml({ name, email, message }: ContactMessage): string {
  return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:24px;font-family:'Courier New', Courier, monospace;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;margin:0 auto;background:#0a1a24;border-radius:10px;">
    <tr>
      <td style="padding:16px 20px;">
        <span style="color:#fff;font-size:13px;">INCOMING_TRANSMISSION</span>
        <span style="color:#7a8a91;font-size:11px;float:right;">[STATUS]: RECEIVED</span>
      </td>
    </tr>
    <tr>
      <td style="padding:20px;padding-bottom:5px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:13px;">
          <tr>
            <td style="color:#00f0ff;padding:4px 0;width:80px;">[FROM]:</td>
            <td style="color:#ffffff;padding:4px 0;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="color:#00f0ff;padding:4px 0;">[EMAIL]:</td>
            <td style="padding:4px 0;">
              <a href="mailto:${escapeHtml(email)}" style="color:#ffffff;">${escapeHtml(email)}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td style="padding:0 20px 20px;">
        <div style="color:#00f0ff;font-size:12px;padding-bottom:8px;">[MESSAGE]:</div>
        <div style="background:#031016;border-radius:10px;padding:16px;color:#ffffff;font-size:13px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</div>
      </td>
    </tr>
    <tr>
      <td style="background:#040a1b;padding:12px 20px;color:#7a8a91;font-size:11px;text-align:center;border-radius:0 0 10px 10px;">
        from V-DEX
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Versión en texto plano, para clientes sin HTML. */
export function contactEmailText({ name, email, message }: ContactMessage): string {
  return [`From: ${name} <${email}>`, "", message, "", "— from V-DEX"].join("\n");
}
