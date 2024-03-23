import { Font } from './font';
import { Level } from './level';
import { Defaults } from './defaults';

export interface Metadata {
    fonts: Font[];
    levels: Level[];
    defaults: Defaults;
}