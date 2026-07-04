import os

# 1. Update Home.jsx (Replace Google Play Button with Text)
home_path = "src/pages/Home.jsx"
with open(home_path, "r", encoding="utf-8") as f:
    home_content = f.read()

old_badge_html = """          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a href="#" className="store-badge">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" style={{ height: '48px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }} />
            </a>
          </div>"""

new_badge_html = """          <div style={{ marginTop: '1rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500, borderLeft: '3px solid var(--accent-blue)', paddingLeft: '1rem' }}>
              Available on Play Store and Coming soon to Apple Store.
            </p>
          </div>"""

if old_badge_html in home_content:
    home_content = home_content.replace(old_badge_html, new_badge_html)
else:
    # Fallback if whitespace differs
    import re
    home_content = re.sub(
        r"<div.*?className=\"store-badge\".*?</div>\s*</div>", 
        new_badge_html, 
        home_content, 
        flags=re.DOTALL
    )

with open(home_path, "w", encoding="utf-8") as f:
    f.write(home_content)


# 2. Update Footer.jsx (Remove Baton Logo image)
footer_path = "src/components/Footer.jsx"
with open(footer_path, "r", encoding="utf-8") as f:
    footer_content = f.read()

old_footer_logo = """<img src="/baton-logo.svg" alt="BATON Logo" className="logo-img" />"""
if old_footer_logo in footer_content:
    footer_content = footer_content.replace(old_footer_logo, "")

with open(footer_path, "w", encoding="utf-8") as f:
    f.write(footer_content)


# 3. Update index.css (Pack everything tightly)
css_path = "src/index.css"
with open(css_path, "r", encoding="utf-8") as f:
    css_content = f.read()

# Replace padding and margins for a tighter layout
css_content = css_content.replace("padding: 4rem 2rem;", "padding: 2rem 1.5rem;")
css_content = css_content.replace("margin-bottom: 5rem;", "margin-bottom: 2rem;")
css_content = css_content.replace("margin-bottom: 4rem;", "margin-bottom: 2rem;")
css_content = css_content.replace("gap: 1.5rem;", "gap: 1rem;")
css_content = css_content.replace("padding: 2.5rem;", "padding: 1.5rem;")
css_content = css_content.replace("gap: 3rem;\n  margin-bottom: 6rem;\n  align-items: center;\n  padding: 3rem;", "gap: 2rem;\n  margin-bottom: 2.5rem;\n  align-items: center;\n  padding: 1.5rem;")
css_content = css_content.replace("padding: 4rem 2rem 2rem;", "padding: 2rem 1.5rem 1rem;")
css_content = css_content.replace("margin-bottom: 2.5rem;", "margin-bottom: 1.5rem;")
css_content = css_content.replace("padding-top: 8rem;", "padding-top: 3rem;")
css_content = css_content.replace("padding: 4rem 2rem;", "padding: 2rem 1.5rem;")

with open(css_path, "w", encoding="utf-8") as f:
    f.write(css_content)

print("Updates applied successfully.")
