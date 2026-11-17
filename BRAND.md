# Ayush Patel — brand

Portfolio of a full-stack lead who builds ERP, CRM and commerce systems for Indian businesses.
Readers: business owners looking to hire, and engineers/recruiters checking his work.
Personality: **calm, exact, a developer at heart. Not: flashy, not corporate.**

Idea — **Terminal.** The whole site reads like a shell session. Every section opens with a prompt
(`ayush@portfolio:~$ ls ~/work`), "Ayush" is drawn as a GitHub contribution graph (the h1 still
reads "Ayush Patel" for screen readers and search), a neofetch readout sits beside it, the lead project
is a terminal window, the career is a `git log`, skills are a `package.json`. Dark terminal is the
default; a light terminal is the alternative. No palace art and no photos (the illustrated avatar
lives in the header and narrates each section).

## Type
One family: **JetBrains Mono** 400 / 500 / 700 / 800 (Google Fonts, OFL), body at 15px.
Headings 700–800 with −0.03 to −0.04em tracking, `text-wrap: balance`. Body max 64ch.
No all-caps labels; the only label above a heading is its shell prompt.

## Colour (dark default / light)
| token | dark | light | use |
|---|---|---|---|
| --background | #0D1117 | #FFFFFF | page |
| --surface | #161B22 | #F6F8FA | panels, inputs |
| --foreground | #E6EDF3 | #1F2328 | text — 16.0:1 / 15.8:1 |
| --ink-2 | #C9D1D9 | #31373E | body — 12.3:1 / 12.0:1 |
| --muted | #8B949E | #59636E | secondary — 6.2:1 / 6.1:1 |
| --accent | #3FB950 | #1A7F37 | buttons, focus (GitHub green) — 7.5:1 / 5.1:1 |
| --link | #58A6FF | #0969DA | prompt path, links — 7.5:1 / 5.2:1 |
| --ok | #3FB950 | #1A7F37 | prompt user, "open to freelance" — 7.5:1 / 5.1:1 |
| --line / --field-border | #30363D / #6E7681 | #D1D9E0 / #818B98 | borders (fields ≥ 3:1) |

Name graph levels (GitHub greens) — dark: #0E4429 #006D32 #26A641 #39D353 on #161B22; light: #9BE9A8 #40C463 #30A14E #216E39 on #EBEDF0.
No gradients, no glows, no glass.

## Shape · spacing
Radius 4 / 8. Hairline borders. Sections 96px apart (64 mobile). Rows over card grids; terminal
windows only for the lead project and the skills file.

## Motion
One hero moment: the contribution graph fills in column by column; the pointer pushes cells aside.
The header is a floating bar that collapses into the avatar's circle when you scroll down and
expands from it when you scroll up (or click it / tab into it). The avatar says one line per section. A block cursor blinks a few times at the
end of the hero session. Everything else: state changes only. `prefers-reduced-motion` and the footer
"Pause animations" switch stop all of it.

## Voice
- Plain and specific: "Cloud ERP for Indian manufacturers", not "Revolutionizing manufacturing".
- Shell jokes stay small and true (`whoami`, `cat now.txt`, `git log`), never instead of real information.
- Errors say what happened and what to do next.

## Do / don't
Do: real logos · one primary action per view · visible focus · terminal details that carry data.
Don't: purple gradients · italic accent words · stat banners · identical card grids · fade-in on every section ·
copying other portfolios' signature patterns.
