#!usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("node:readline");
var events_1 = require("events");
var chalk = require("chalk");
var figlet = require("figlet");
var answer = Math.floor(Math.random() * 10), guess = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
}), response = new events_1.EventEmitter(), questionnaire = new events_1.EventEmitter();
var counter = 0;
process.stdout.write("------Guess game------\n");
process.stdout.write("Guess a number between 1 - 10\n");
questionnaire.once("start", function () { return questionnaire.emit("query question"); });
questionnaire.on("query question", function () {
    counter += 1;
    guess.question("Guess ".concat(counter, ": "), function (guess) {
        var number = Number.parseInt(guess);
        if (isNaN(number) && counter < 3)
            response.emit("NaN", guess);
        else if (number == answer)
            response.emit("Win", number);
        else {
            if (counter >= 3)
                response.emit("Lose", answer);
            else
                response.emit("wrong guess", number);
        }
    });
});
response.on("NaN", function (guess) {
    process.stdout.write(chalk.red("".concat(guess, " is not a number\n")));
    questionnaire.emit("query question");
});
response.on("Win", function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _b = (_a = process.stdout).write;
                _d = (_c = chalk).green;
                return [4 /*yield*/, figlet.text("Correct")];
            case 1:
                _b.apply(_a, [_d.apply(_c, [_e.sent()]) + "\n"]);
                setTimeout(process.exit(0), 1000);
                return [2 /*return*/];
        }
    });
}); });
response.on("wrong guess", function (guess) {
    process.stdout.write(chalk.red("Incorrect guess try again," +
        chalk.bold(guess > answer ? "Too big" : "Too small") +
        "\n"));
    questionnaire.emit("query question");
});
response.on("Lose", function (correct) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _b = (_a = process.stdout).write;
                _d = (_c = chalk).red;
                return [4 /*yield*/, figlet.text("X")];
            case 1:
                _b.apply(_a, [_d.apply(_c, [_e.sent()]) + "\n"]);
                process.stdout.write(chalk.blue("Correct guess was", correct) + "\n");
                setTimeout(process.exit(0), 1000);
                return [2 /*return*/];
        }
    });
}); });
questionnaire.emit("start");
process.on("exit", function () {
    process.stdout.write("Program exiting now");
});
