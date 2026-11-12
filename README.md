# Metrica website

This is a dependency-free static website. `index.html` is the landing page and
BMI calculator; `privacy/index.html` is the companion privacy policy page.

Preview it by serving the `website` directory with any static file server. For
example, from the repository root:

```powershell
python -m http.server 8000 --directory website
```

Before publishing, complete the draft policy with the publisher's legal name,
privacy contact email, jurisdiction, effective date, and verified disclosures
for analytics, advertising, hosting, platform services, and third-party SDKs.
Publish the contents of this folder at the website root so the policy is
available at `/privacy/`.
