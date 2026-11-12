# Metrica website

This is a dependency-free static website. `index.html` is the landing page and
BMI calculator; `privacy/index.html` is the companion privacy policy page.

Preview it by serving the `website` directory with any static file server. For
example, from the repository root:

```powershell
python -m http.server 8000 --directory website
```

The policy lists EBY BRAND VENTURE as publisher and
ebybrandventures@gmail.com as its privacy contact. Review platform and hosting
provider disclosures whenever the app's services or data practices change.
Publish the contents of this folder at the website root so the policy is
available at `/privacy/`.
