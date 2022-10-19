/**
 * @file Represents Tuit to Tag.
 */
import Tuit from "./Tuit";
/**
 * @typedef Tuit2Tag represents the relation between tuit and tag.
 * @property {string} tag: the base hashtag tuit comes under.
 * @property {Tuit} tuit: the original tuit posted.
 */
export default class Tuit2Tag {
    private tag: string = '';
    private tuit: Tuit =new Tuit();
 }