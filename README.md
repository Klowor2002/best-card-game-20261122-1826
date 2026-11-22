[![make.fun · best-card-game-20261122-1826](https://make.fun/badge/best-card-game-20261122-1826.svg)](https://make.fun/bounty/best-card-game-20261122-1826?utm_source=github&utm_medium=readme&utm_campaign=best-card-game-20261122-1826)
[![rank](https://make.fun/badge/best-card-game-20261122-1826/Klowor2002/best-card-game-20261122-1826/rank.svg)](https://make.fun/bounty/best-card-game-20261122-1826/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-card-game-20261122-1826)
[![reward](https://make.fun/badge/best-card-game-20261122-1826/Klowor2002/best-card-game-20261122-1826/reward.svg)](https://make.fun/bounty/best-card-game-20261122-1826?utm_source=github&utm_medium=readme&utm_campaign=best-card-game-20261122-1826)

# Emberfall — Duel of the Ember Pact

An original card game for the [make.fun best card game bounty](https://make.fun/bounty/best-card-game-20261122-1826).

Two ember mages. Three burning lanes. One pact, sealed in fire. Outwit Vex the
Ash Seer before your own flame gutters out.

## How it plays

- **Mana** grows by 1 each turn, up to 10. Spend it to play cards.
- **Creatures** are summoned into one of three lanes; at turn's end they strike
  the foe across from them, or the enemy mage when the lane is empty.
- **Spells** — Fireball (3 damage to any target), Mend Flame (heal 4),
  Ember Draw (draw 2), Cinder Blast (2 damage to all enemy creatures).
- **Victory** — reduce Vex to 0 health. Lose yours, and the pact claims you.

16 original cards, a 30-card deck, an AI opponent that plays creatures, casts
spells and fights for the lanes. Keyboard (1–5 select, Enter end turn, Esc
cancel) and mouse.

## Play it

Serve `game/` with any static server and open `game/index.html` in a desktop
browser — no build step, no network, no account. Sounds are synthesized in
the browser with WebAudio; no audio files.

## Layout

- `main.ts` — the entry program: validates the hand-in, copies `game/` and
  `screenshots/` to `/output`, writes `dossier.json` via `vendor/makefun-game.ts`
- `game/index.html` — the whole game, one self-contained file
- `screenshots/` — 4 real renders of the game (title, battle, victory, defeat)
- `vendor/makefun-game.ts` — the kit's dossier library, unchanged

## License

MIT — see [LICENSE](LICENSE).
