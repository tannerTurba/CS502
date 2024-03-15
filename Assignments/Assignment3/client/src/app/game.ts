import { Defaults } from "./defaults";
import { Colors } from "./colors";
import { Font } from "./font";
import { Level } from "./level";
import { Metadata } from "./metadata";

export interface Game {
    userId: string;
    colors: Colors;
    font: Font;
    guesses: string;
    _id: string;
    level: Level;
    remaining: number;
    status: string;
    target: string;
    timestamp: number;
    timeToComplete: number;
    view: string;
}
