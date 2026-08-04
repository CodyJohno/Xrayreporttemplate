# Client Coaching Questionnaire

A single-page online questionnaire clients fill in before you build their program.
Submissions land in Netlify Forms and get emailed to you.

- `index.html` — the questionnaire (sections 1–10)
- `thanks.html` — confirmation page shown after submitting
- `../netlify.toml` — tells Netlify to publish this folder (no build step)

## Deploying it (about 5 minutes)

1. Push this branch to GitHub (already done if you're reading this in the repo).
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project** → GitHub → pick `Xrayreporttemplate`.
3. Netlify reads `netlify.toml`, so leave the build settings alone:
   - Build command: *(empty)*
   - Publish directory: `coaching-form`
   - Branch to deploy: whichever branch this is merged into (`main` once merged)
4. Click **Deploy**. You'll get a URL like `random-name-123.netlify.app`.
5. **Site configuration → General → Site details → Change site name** to something you'd happily text a client, e.g. `jtj-coaching-intake` → `https://jtj-coaching-intake.netlify.app`.

## Turning on the email notifications

1. In Netlify: **Site configuration → Forms → Form notifications → Add notification → Email notification**.
2. Event: *New form submission*. Form: `client-coaching-questionnaire`.
3. Email to notify: your address. Save.

Every submission then arrives in your inbox with all answers listed, and is also stored
under **Forms** in the Netlify dashboard where you can export the lot as CSV.

Set the "reply-to" to the client's email if you want to reply straight from the notification:
in the same notification settings there's an option to pick the email field for reply-to —
choose `Email`.

## Free tier limits

Netlify's free plan includes **100 form submissions per month** and 100 MB of form storage.
Well clear of what a coaching roster needs. Spam submissions count toward it, which is why
the form has a honeypot field built in (the hidden "Leave this field empty" box) — bots fill
it, real people never see it, and Netlify silently bins those.

## Sending it to clients

Just send the link. It works on phones, nothing to install, no login. Clients can't
half-save and come back later though — mention that it takes about 10 minutes in one sitting.

## Testing that forms actually work

Netlify detects the form by parsing the deployed HTML, so it only registers **after a deploy**.
Submit the form yourself once from the live URL, then check **Forms** in the dashboard —
you should see one submission and get the email. If nothing shows up:

- Make sure you submitted from the `.netlify.app` URL, not a local file — Netlify Forms only
  works on deployed Netlify sites.
- Check the form appears under **Forms → Active forms**. If it's missing, redeploy.
- The hidden `<input type="hidden" name="form-name" ...>` must stay in the HTML — that's what
  tells Netlify which form a POST belongs to.

## Changing questions later

Edit `index.html` and push — Netlify redeploys automatically. Two rules:

- Each answer is keyed by its `name="..."` attribute, and that's the label that shows in your
  email. Renaming one starts a new column in the export, so keep names stable once clients
  have started submitting.
- New checkbox/radio groups: give every option in the group the **same** `name` and a distinct
  `value`.
