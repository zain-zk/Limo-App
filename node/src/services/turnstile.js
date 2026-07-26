/**
 * Cloudflare Turnstile verification.
 * Set TURNSTILE_SECRET_KEY in .env (optional — skipped when unset).
 */

export async function verifyTurnstile(token, remoteip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return { success: true, skipped: true };
  }

  if (!token) {
    return { success: false, error: 'CAPTCHA token required' };
  }

  const params = new URLSearchParams({
    secret,
    response: token,
  });
  if (remoteip) params.set('remoteip', remoteip);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  const data = await response.json();
  return { success: Boolean(data.success), error: data['error-codes']?.join(', ') };
}
