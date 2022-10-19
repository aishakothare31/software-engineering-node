/**
 * @file Represents Tuit to Topic.
 */
import Tuit from "./Tuit";
/**
 * @typedef Tuit2Topic represents the relation between tuit and topics.
 * @property {string} topic: the base topic of tuit.
 * @property {Tuit} tuit: the original tuit posted.
 */
export default class Tuit2Topic {
    private topic: string = '';
    private tuit: Tuit = new Tuit();
 }