# Project Title

Simple overview of use/purpose.

## Description

An in-depth paragraph about your project and overview of use.

## What I want to do:

What game do I want to make?:

Point & Click, like a way simpler Osu

How do I want to approach it:

Menu =>

Board:
~ Initialize board as browser is loaded

Title of Game:
~ I don't really know, maybe a h1 or something & display at the top of the board

Objective:
~ List the objective for players with p

Start game:
~ Button to call startGame() => Starts round

Difficulty setting => Set internal timers of targets in accordance to difficulty selected
~ List of Buttons to select difficulty (Easy, Medium, Hard, Pro?)

- Drop-down list & select one or have all buttons displayed then highlight the one selected
- Difficulty should have preset at Easy, but can reselect in menu

Game Timer to track round:
~ Timer probably set at 60 seconds
~ Round ends at 0 and display scoreboard
~ Time will probably be displayed outside scoreboard

Actual game =>

~ Have board set up > Add scoreboard

    ~ Set a timer before game starts & countdown > Game starts > Target spawns > Click target to score
    - TODO: How to register clicks on targets

    ~ Target spawns at a random location in intervals, Target size will vary per spawn
    - Case 1: Watch for potential targets spawning outside the board/under items

    ~ If missed target or internal object timer ends => Update missed score & respawn target

    ~ Game ends on timer & displays scores

Scoreboard for tracking score => What you hit or missed, total score
~ scoreHit() => +1
~ missedHit() => -1
~ totalHits() => 0 (Changes based on scoreHit() & missedHit())
~ Scoreboard will overlap game_container to show during round

- Store highest score if doing consecutive rounds
- Display final totals after round ends

Reset => Clear board of everything
~ Button to show 2 buttons for either resetting or exit to menu

- resetGame() => Exits to menu
- resetRound() => Restarts current round with same settings

- At end of round, have button options for reset/exit

Optionals => (Unlikely to make, but will consider)
General Settings
Change mouse cursor
Loading bar/screen
Variety of targets (Like bomb icon that reduces score)
HP system (Miss one, lose a heart)
PR
Statistics
Infinity Mode

TODO:

1. Target Spawn/Despawn Mechanic (Most important part of the game)
2. Timer working upon round start only & mini timer before round starts
3. End of Round Window with Reset Button
4. Add stats to EoR Window
5. Start Menu to initiate round & after round ends: Goes back to start
6. Difficulty Mechanic
