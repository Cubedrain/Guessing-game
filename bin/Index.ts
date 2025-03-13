#!usr/bin/env node
import * as readline from "node:readline";
import { EventEmitter } from "events";
import * as chalk from "chalk";
import * as figlet from "figlet";

const answer: number = Math.floor(Math.random() * 10),
  guess: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  }),
  response: EventEmitter = new EventEmitter(),
  questionnaire: EventEmitter = new EventEmitter();

let counter: number = 0;

process.stdout.write("------Guess game------\n");
process.stdout.write("Guess a number between 1 - 10\n");

questionnaire.once("start", () => questionnaire.emit("query question"));
questionnaire.on("query question", () => {
  counter += 1;
  guess.question(`Guess ${counter}: `, (guess) => {
    let number: number = Number.parseInt(guess);

    if (isNaN(number) && counter < 3) response.emit("NaN", guess);
    else if (number == answer) response.emit("Win", number);
    else {
      if (counter >= 3) response.emit("Lose", answer);
      else response.emit("wrong guess", number);
    }
  });
});

response.on("NaN", (guess) => {
  process.stdout.write(chalk.red(`${guess} is not a number\n`));
  questionnaire.emit("query question");
});
response.on("Win", async () => {
  process.stdout.write(chalk.green(await figlet.text("Correct")) + "\n");
  setTimeout(process.exit(0), 1000);
});
response.on("wrong guess", (guess) => {
  process.stdout.write(
    chalk.red(
      "Incorrect guess try again," +
        chalk.bold(guess > answer ? "Too big" : "Too small") +
        "\n"
    )
  );
  questionnaire.emit("query question");
});
response.on("Lose", async (correct) => {
  process.stdout.write(chalk.red(await figlet.text("X")) + "\n");
  process.stdout.write(chalk.blue("Correct guess was", correct) + "\n");
  setTimeout(process.exit(0), 1000);
});

questionnaire.emit("start");

process.on("exit", () => {
  process.stdout.write("Program exiting now");
});
