import os

home_path = "src/pages/Home.jsx"
with open(home_path, "r", encoding="utf-8") as f:
    content = f.read()

# The hero section has inline styles causing it to sit too low.
# Current: style={{ position: 'relative', zIndex: 1, minHeight: '100vh', paddingTop: '80px', flexWrap: 'wrap', alignItems: 'center' }}
# We will remove the redundant paddingTop and reduce minHeight to 80vh to bring it up.
# Also change alignItems to flex-start and add some padding to push it down just a bit from the very top.

old_style = "style={{ position: 'relative', zIndex: 1, minHeight: '100vh', paddingTop: '80px', flexWrap: 'wrap', alignItems: 'center' }}"
new_style = "style={{ position: 'relative', zIndex: 1, minHeight: '80vh', paddingTop: '2rem', flexWrap: 'wrap', alignItems: 'center' }}"

content = content.replace(old_style, new_style)

# Also check if there's any other large padding that needs reduction
content = content.replace("paddingTop: '3rem'", "paddingTop: '1rem'")

with open(home_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Home.jsx shifted up.")
