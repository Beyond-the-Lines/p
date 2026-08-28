# Common Thread Arts

A responsive project shell for a community arts nonprofit. It includes a complete single-page site with editable sample content for programs, impact, events, and fundraising.

## Run locally

The site works by opening `index.html` directly in a browser. To serve it with Java 17 or later:

```sh
javac -d out src/main/java/org/commonthreadarts/App.java
java --add-modules jdk.httpserver -cp out org.commonthreadarts.App
```

Then open http://localhost:8080.

## Customize

- Edit the words and links in `index.html`.
- Adjust branding colors and layout in `styles.css`.
- Replace the email address in the final call-to-action with the nonprofit's real contact address.
