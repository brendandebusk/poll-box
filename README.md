# Poll box module

A simple poll box that you can use on your website, developed using React. Inspired by IGN's poll box design.

[Live demo](https://poll-box.brendan-debusk.workers.dev/)

## Coming Soon

* Prevention of multiple submission from same user

## Installation

To add poll box to your component:

```javascript
import PollContainer from "./PollContainer.js";
```

In your component's return:

```javascript
<PollContainer 
pollID={num}
```

Where `num` is the poll identification number (more on that below).

To customize targets for talking to your poll database, please look at `/hooks/getData` and `/hooks/putData`

## Database Structure

You will need to setup two tables: Pollquestions and Polloptions.

Pollquestions:
* poll_id: unique ID assigned to the poll question
* poll_question: string denoting poll question (e.g. "What does the fox say?")

Polloptions:
* option_id: unique ID assigned to each option
* option_name: the string denoting the option (e.g. "Wa-pa-pa-pa-pa-pa-pow!")
* option_votes: total number of votes
* poll_id: links the option to a poll question
