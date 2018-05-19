# High Fidelity: Scripter

This is a point and click script editor for [High Fidelity](https://highfidelity.com).

## Installation

To install, go to Edit > Running Scripts... > From URL and enter this address:

```
https://jjv360.s3.amazonaws.com/hifi/hf-scripter/hf-scripter-client.js
```

## Usage

- First select the entity you want to attach a script to in the Create menu
- Click the Scripter button in the toolbar

> NOTE: Using Scripter will override any other script present on the selected entity.

## Features

- [x] Client entity scripts
- [ ] Server entity scripts
- [x] Visual editor
  - [x] Create/edit/delete scripts
  - [x] Select trigger and actions
  - [x] Text input fields
  - [ ] Entity ID input field
- [x] Triggers
  - [x] On entity load
  - [x] On user enters entity
  - [x] On user leaves entity
  - [x] On user clicks entity
  - [ ] Interaction key ("press E to use" type thing, for making first-person games)
- [x] Actions
  - [x] Alert
  - [x] Announcement message
  - [x] Confirmation prompt (cancels script if user says No)
  - [x] Delay
  - [x] Display subtitle text
  - [x] Log to console
  - [x] Overlay message (useful for zone titles etc)
  - [ ] Change entity properties
