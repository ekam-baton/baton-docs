import os

home_path = "src/pages/Home.jsx"
nexus_path = "src/components/RoutingNexus.jsx"

# Update Home.jsx grid spans
with open(home_path, "r", encoding="utf-8") as f:
    home_content = f.read()

home_content = home_content.replace('className="bento-card span-3"', 'className="bento-card span-6"')

with open(home_path, "w", encoding="utf-8") as f:
    f.write(home_content)

print("Home.jsx updated.")

# Update RoutingNexus.jsx sizes
with open(nexus_path, "r", encoding="utf-8") as f:
    nexus_content = f.read()

nexus_content = nexus_content.replace("const width = 600;", "const width = 500;")
nexus_content = nexus_content.replace("const height = 600;", "const height = 500;")
nexus_content = nexus_content.replace("width: '600px'", "width: '500px'")
nexus_content = nexus_content.replace("height: '600px'", "height: '500px'")
nexus_content = nexus_content.replace("width: '450px'", "width: '400px'")
nexus_content = nexus_content.replace("height: '300px'", "height: '260px'")

# Also adjust the orbital radii slightly to fit the new 500px canvas
nexus_content = nexus_content.replace("rx: 250, ry: 100", "rx: 200, ry: 80")
nexus_content = nexus_content.replace("rx: 180, ry: 200", "rx: 140, ry: 160")
nexus_content = nexus_content.replace("rx: 220, ry: 150", "rx: 180, ry: 120")


with open(nexus_path, "w", encoding="utf-8") as f:
    f.write(nexus_content)

print("RoutingNexus.jsx updated.")
